import React from 'react'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from 'docx';
import moment from 'moment'

import instance from '../../utils/axios/instance';

import WhiteButton from '../UI/WhiteButton/WhiteButton'

function OrderDocument({order}) {
    const getOrderDetails = async () => {
        const auth_token = localStorage.getItem('auth_token')

        try {
            const res = await instance.get('api/v1/orderdetaillist/', {
                params: {
                    orderId: order.id
                },
                headers: {
                    Authorization: `Token ${auth_token}`
                }
            })

            return res.data
        }
        catch (error) {
            
        }
    }

    const orderInfo = [
        {label: `Номер`, content: `${order.id}`},
        {label: `Дата приема`, content: moment(order.receipt_date).format('DD.MM.YYYY')},
        {label: `Дата планового выполнения`, content: moment(order.target_date).format('DD.MM.YYYY')},
        {label: `Сотрудник`, content: `${order.staff.last_name} ${order.staff.first_name[0]}. ${order.staff.patronymic && order.staff.patronymic[0] + '.'}`},
        {label: `Заказчик`, content: `${order.client.first_name} ${order.client.last_name[0]}. ${order.client.patronymic && order.client.patronymic[0] + '.'}`},
    ]

    const orderDetailInfoTableHeader = ['№', 'Услуга', 'Количество', 'Цена', 'Сумма']

    const orderDetailInfo = (orderDetail, index) => [
        `${index+1}`,
        `${orderDetail.service.title}`,
        `${orderDetail.amount}`,
        orderDetail.service_cost ? `${orderDetail.service_cost}` : '-',
        orderDetail.service_cost ? `${orderDetail.service_cost * orderDetail.amount}`  : '-'
    ];

    const documentFooter = [
        ['Получил', `${order.client.first_name} ${order.client.last_name[0]}. ${order.client.patronymic && order.client.patronymic[0] + '.'}`, `Подпись`, `____________________`],
        ['Выполнил', `${order.staff.last_name} ${order.staff.first_name[0]}. ${order.staff.patronymic && order.staff.patronymic[0] + '.'}`, `Подпись`, `____________________`],
        ['Стоимость', `${order.total_order_cost}`, `Дата`, `${moment().format('DD.MM.YYYY')}`],
    ]

    const tableCellWidths = [15, 50, 15, 20];

    const generateDocx = async () => {
        const orderDetailList = await getOrderDetails()

        const doc = new Document({
            sections: [
              {
                properties: {},
                children: [
                  // Договор
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Договор",
                        bold: true,
                        size: 36, // Устанавливаем размер шрифта: 24 пункта
                      }),
                    ],
                  }),
                  new Paragraph(''),
                  // Данные заказа
                  new Table({
                    rows: orderInfo.map(({label, content}) => {
                            return new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: label
                                                    })
                                                ]
                                            })
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: content
                                                    })
                                                ]
                                            })
                                        ],
                                    }),
                                ],
                            })

                        }),
                    width: {
                        size: 100,
                        type: 'pct'
                    }
                  }),
                  new Paragraph(''),
                  // Детали заказа
                  new Table({
                    rows: [
                        new TableRow({
                            children: orderDetailInfoTableHeader.map((value) => {
                                        return new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: value,
                                                            bold: true
                                                        })
                                                    ],
                                                    alignment: 'center'
                                                })
                                            ],
                                        })
                                    })
                        }),
                        ...orderDetailList.map((orderDetail, index) => {
                            return new TableRow({
                                children: orderDetailInfo(orderDetail, index).map((value) => {
                                            return new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: value,
                                                                
                                                            })
                                                        ],
                                                        alignment: 'center'
                                                    })
                                                ],
                                            })
                                        })
                            })
                        })
                    ],
                    width: {
                        size: 100,
                        type: 'pct'
                    }
                  }),
                  new Paragraph(''),
                  new Table({
                    rows: documentFooter.map((row) => {
                            return new TableRow({
                                children: row.map((cellContent, index) => {
                                        return new TableCell({
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: cellContent
                                                        })
                                                    ]
                                                })
                                            ],
                                            borders: { // Установите границы ячейки
                                                top: { style: 'nil', size: 0, color: 'FFFFFF' },
                                                bottom: { style: 'nil', size: 0, color: 'FFFFFF' },
                                                left: { style: 'nil', size: 0, color: 'FFFFFF' },
                                                right: { style: 'nil', size: 0, color: 'FFFFFF' },
                                            },
                                            width: {
                                                size: tableCellWidths[index],
                                                type: 'pct'
                                            }
                                        })
                                }),
                                height: { value: `1cm`, rule: 'atLeast' },
                            })
                        }),
                    width: {
                        size: 100,
                        type: 'pct'
                    }
                  }),
                ],
              },
            ],
          });
     
        const blob = await Packer.toBlob(doc);

        // Создаём URL для Blob
        const url = URL.createObjectURL(blob);

        // Создаём временный элемент <a> для скачивания файла
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";

        // Устанавливаем href на созданный URL и даем имя скачиваемому файлу
        a.href = url;
        a.download = "document.docx";

        // Инициируем клик по ссылке, что приведёт к скачиванию файла
        a.click();

        // Освобождаем URL после скачивания
        window.URL.revokeObjectURL(url);

        // Удаляем временный элемент <a>
        document.body.removeChild(a);
      };
    
      return (
        <WhiteButton onClick={generateDocx}>Создать документ</WhiteButton>
      )
}

export default OrderDocument