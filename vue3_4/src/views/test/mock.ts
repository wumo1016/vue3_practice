/*
 * @Description:
 * @Author: wyb
 * @LastEditors: wyb
 * @LastEditTime: 2022-04-09 16:59:51
 */

export const mockData = [
  {
    Oid: 'e5ec136e-0a01-4c17-b3aa-6bae81235a29',
    Name: 'OP-注塑',
    Type: null,
    Children: [
      {
        Oid: '8f0ec0df-8a41-4539-8bb9-66105074fe1f',
        Name: 'FU-注塑成型',
        Type: null,
        Children: [
          {
            Oid: 'b61ad9ec-f899-4fae-afbb-a58285927774',
            Name: 'R/C-壁厚',
            Type: null,
            Children: [
              {
                Oid: '6f65f0ad-82c2-4798-a000-db316fb7defd',
                Name: 'FM-壁厚尺寸过大',
                Type: null,
                Children: [
                  {
                    Oid: 'c36713de-c112-418d-924c-f8844b211739',
                    Name: 'DC-互检',
                    Type: null
                  }
                ]
              }
            ]
          },
          {
            Oid: 'c1b6ffb5-f243-4b03-8f52-9ac2c98c3050',
            Name: 'R/C-外观',
            Type: null,
            Children: [
              {
                Oid: 'dcae2610-1a88-487b-add1-f2ca06b39a87',
                Name: 'FM-有流痕',
                Type: null,
                Children: [
                  {
                    Oid: '24da09a7-26e6-4a4c-8f15-e35b97ce9318',
                    Name: 'DC-巡检',
                    Type: null
                  },
                  {
                    Oid: '50045942-d0ba-434d-abce-3aa0b4a291ff',
                    Name: 'DC-首件',
                    Type: null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        Oid: '8e3dbb5e-772b-471f-bb95-1d37bfbabf44',
        Name: '技术员',
        Type: null,
        Children: [
          {
            Oid: '968cce20-50e3-4531-815f-59958ccf873e',
            Name: 'FU-设置参数',
            Type: null,
            Children: [
              {
                Oid: '2c08c989-dcb6-4d88-b683-ebb7298d81aa',
                Name: 'R/C-参数设置正确',
                Type: null,
                Children: [
                  {
                    Oid: '7a671688-c0d5-49d3-befc-98d05a78eb37',
                    Name: 'FC-参数设置错误',
                    Type: null,
                    Children: [
                      {
                        Oid: 'ac36c082-736a-4d9d-a9f3-489187820fc4',
                        Name: 'DC-首件',
                        Type: null
                      },
                      {
                        Oid: '11ca3a99-a488-4f20-904e-a81ed8755f85',
                        Name: 'PC-作业倒数',
                        Type: null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            Oid: '6fa4907a-36d4-4cf9-acb6-560ce9018c39',
            Name: 'FU-安装模具',
            Type: null,
            Children: [
              {
                Oid: '2fc81280-db4c-46ef-be3c-36b8dca85902',
                Name: 'R/C-安装紧固',
                Type: null,
                Children: [
                  {
                    Oid: 'd045c7b4-8e1e-4bfa-9f40-82ccc0aa394f',
                    Name: 'FC-未安装紧固',
                    Type: null
                  }
                ]
              },
              {
                Oid: '8417f2fc-f632-4427-a620-422d06570d0c',
                Name: 'R/C-正确的模具',
                Type: null,
                Children: [
                  {
                    Oid: 'c65cb134-f127-481a-a742-7942abf9b877',
                    Name: 'FC-用错模具',
                    Type: null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        Oid: 'c1f50cd5-4eb1-4c62-b6ab-87ec77f54f9e',
        Name: '作业员',
        Type: null,
        Children: [
          {
            Oid: 'eacadbac-fb79-4025-bc71-8d769bd85b75',
            Name: 'FU-加料',
            Type: null,
            Children: [
              {
                Oid: 'dddfc077-ad00-441c-bde5-08ec7edc96f8',
                Name: 'R/C-正确的物料',
                Type: null,
                Children: [
                  {
                    Oid: '8c8fd218-e7ca-483e-89fa-a3717d6b1a0c',
                    Name: 'FC-使用错误物料',
                    Type: null,
                    Children: [
                      {
                        Oid: '0867328f-a59b-4e7c-ab6f-06eab39d3dfd',
                        Name: 'DC-首件',
                        Type: null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            Oid: 'ca57a183-ce8f-45f7-bf84-7c7e42f6b97b',
            Name: 'FU-设置参数',
            Type: null,
            Children: [
              {
                Oid: '22c727de-4743-4b74-ac90-2139e40978bc',
                Name: 'R/C-设置正确',
                Type: null,
                Children: [
                  {
                    Oid: '3a98d4f2-5375-45e8-b8c2-4875ad3cd6c5',
                    Name: 'FC-参数设置不正确',
                    Type: null,
                    Children: [
                      {
                        Oid: 'eb26bc82-ae06-434a-81b9-715909e9496b',
                        Name: 'DC-人工全检',
                        Type: null
                      },
                      {
                        Oid: '75d64837-a9c9-42be-b60e-c6135bdf49a4',
                        Name: 'DC-巡检',
                        Type: null
                      },
                      {
                        Oid: '0475bb97-a5e7-43ef-ac79-f51637f8cd4e',
                        Name: 'PC-X-R控制图',
                        Type: null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        Oid: 'f94cbb93-2b8d-47fc-a0f9-203006684d33',
        Name: '注塑机',
        Type: null,
        Children: [
          {
            Oid: '34e165f7-780a-48cd-b600-09520adc4585',
            Name: 'FU-加热塑化',
            Type: null,
            Children: [
              {
                Oid: 'dbd56bfc-e522-4aa0-89a1-40721d29c48f',
                Name: 'R/C-加热温度',
                Type: null,
                Children: [
                  {
                    Oid: '7247283f-091c-4105-bfc3-7e5dd8a20dad',
                    Name: 'FC-加热温度不正确',
                    Type: null,
                    Children: [
                      {
                        Oid: '7fd6d815-40df-4836-9e75-5e0384fd587a',
                        Name: 'DC-巡检',
                        Type: null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        Oid: '62717e7c-39de-4899-89b7-c8f698afae46',
        Name: '注塑模具',
        Type: null,
        Children: [
          {
            Oid: '2e1f3ea5-1855-4ce7-9cea-61821d5084b4',
            Name: 'FU-模具材质',
            Type: null,
            Children: [
              {
                Oid: '47dc7d0b-34d5-4dae-b6d1-11ec258068f5',
                Name: 'R/C-模具硬度',
                Type: null,
                Children: [
                  {
                    Oid: '8118af5e-e372-4070-82e8-0507c13ec8e8',
                    Name: 'FC-硬度不够',
                    Type: null
                  }
                ]
              },
              {
                Oid: 'e7133e79-5e1b-4cb9-9b55-7928a7c577c7',
                Name: 'R/C-硬度',
                Type: null
              }
            ]
          }
        ]
      }
    ]
  }
]
