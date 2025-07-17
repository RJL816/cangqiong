const mockData = {
  pageStatus: "edit",
  data: [
    {
      topGroupName: "能力", // 一级能力素质维度名称
      topGroupNumber: "group_0001", // 一级能力素质维度编码
      topGroupId: "1777704778189674496", // 一级能力素质维度ID
      fieldList: [
        // 分录表列名，行为描述和等级描述有差异
        {
          name: "能力素质维度",
          code: "itemGroupLongName",
          width: 100,
          align: "center",
        },
        {
          name: "能力素质项",
          code: "itemName",
          width: 100,
          align: "center",
        },
        {
          name: "目标等级",
          code: "applyLevel",
          width: 100,
          align: "center",
        },
        {
          name: "目标等级定义",
          code: "defination",
          width: 160,
          align: "center",
        },
        {
          name: "员工自评",
          code: "selfAssess",
          features: {
            showExtendIcon: true,
          },
          width: 300,
          align: "center",
          children: [
            {
              name: "员工自评结果",
              code: "selfAssRes",
              width: 100,
              align: "center",
            },
            {
              name: "个人总结",
              code: "selfAssSum",
              width: 100,
              align: "center",
            },
            {
              name: "补充资料",
              code: "fileNum",
              width: 100,
              align: "center",
            },
          ],
        },
        {
          name: "评价结果",
          code: "reviewType",
          width: 100,
          align: "center",
        },
      ],
      capItems: [
        // 能力素质维度下的能力素质项
        {
          itemName: "任务完成度", // 能力素质项名称
          itemNumber: "item_0001", // 能力素质项编码
          itemId: "1777704778189674496", // 能力素质项ID
          itemGroupLongName: "通用技能/工作能力", // 拼接的能力素质维度，不包括一级维度；如果素质项在一级素质维度则显示“-”
          applyLevel: "3", // 目标等级，只有能力素质项为等级描述才会有值，行为描述是没有这个字段的
          defination: "定义定义定义定义定义定义定义定义定义定义",
          selfAssRes: "优秀", // 自评结果单选显示标签；输入计分显示分数；打星显示标签
          selfAssSum: "个人总结个人总结个人总结个人总结", // 自评个人总结
          fileNum: "1", // 自评文件数量
          starNum: "1", // 选择的星星数量
          reviewType: {
            reviewType: "10", // 10单选 20输入计分 30打星
            decimal: "1", // 小数位数，只有在输入计分下才会有该字段；枚举值0 1 2
            scoreLow: "20", // 输入计分的最低值
            scoreHigh: "200", // 输入计分的最高值
            optionTags: [
              {
                name: "优秀",
                value: "1777704778189111a1674496",
              },
              {
                name: "良好",
                value: "17777047781891212s674496",
              },
            ],
            starTags: [
              {
                name: "优秀",
                value: "1", // 星星数量
              },
              {
                name: "良好",
                value: "2", // 星星数量
              },
            ],
            currentValue: "优秀/2.4/优秀", // 当前值，查看态使用；单选显示标签；输入计分显示分数；打星显示标签
          },
        },
        {
          itemName: "任务完成度", // 能力素质项名称
          itemNumber: "item_0001", // 能力素质项编码
          itemId: "1777704778189674496", // 能力素质项ID
          itemGroupLongName: "通用技能/工作能力", // 拼接的能力素质维度，不包括一级维度；如果素质项在一级素质维度则显示“-”
          applyLevel: "3", // 目标等级，只有能力素质项为等级描述才会有值，行为描述是没有这个字段的
          defination: "定义定义定义定义定义定义定义定义定义定义",
          selfAssRes: "优秀", // 自评结果单选显示标签；输入计分显示分数；打星显示标签
          selfAssSum: "个人总结个人总结个人总结个人总结", // 自评个人总结
          fileNum: "2", // 自评文件数量
          starNum: "2", // 选择的星星数量
          reviewType: {
            reviewType: "30", // 10单选 20输入计分 30打星
            decimal: "1", // 小数位数，只有在输入计分下才会有该字段；枚举值0 1 2
            scoreLow: "20", // 输入计分的最低值
            scoreHigh: "200", // 输入计分的最高值
            optionTags: [
              {
                name: "优秀",
                value: "17777041896dx74496",
              },
              {
                name: "良好",
                value: "17777aaada04189674496",
              },
            ],
            starTags: [
              {
                name: "优秀",
                value: "1", // 星星数量
              },
              {
                name: "良好",
                value: "2", // 星星数量
              },
            ],
            currentValue: 5, // 当前值，查看态使用；单选显示标签；输入计分显示分数；打星显示标签
          },
        },
        {
          itemName: "任务完成度", // 能力素质项名称
          itemNumber: "item_0001", // 能力素质项编码
          itemId: "1777704778189674496", // 能力素质项ID
          itemGroupLongName: "通用技能/工作能力", // 拼接的能力素质维度，不包括一级维度；如果素质项在一级素质维度则显示“-”
          applyLevel: "3", // 目标等级，只有能力素质项为等级描述才会有值，行为描述是没有这个字段的
          defination: "定义定义定义定义定义定义定义定义定义定义",
          selfAssRes: "优秀", // 自评结果单选显示标签；输入计分显示分数；打星显示标签
          selfAssSum: "个人总结个人总结个人总结个人总结", // 自评个人总结
          fileNum: "3", // 自评文件数量
          starNum: "3", // 选择的星星数量
          reviewType: {
            reviewType: "20", // 10单选 20输入计分 30打星
            decimal: "1", // 小数位数，只有在输入计分下才会有该字段；枚举值0 1 2
            scoreLow: "20", // 输入计分的最低值
            scoreHigh: "200", // 输入计分的最高值
            optionTags: [
              {
                name: "优秀",
                value: "17777047xada774496",
              },
              {
                name: "良好",
                value: "177770477819674496",
              },
            ],
            starTags: [
              {
                name: "优秀",
                value: "1", // 星星数量
              },
              {
                name: "良好",
                value: "2", // 星星数量
              },
            ],
            currentValue: 40, // 当前值，查看态使用；单选显示标签；输入计分显示分数；打星显示标签
          },
        },
        {
          itemName: "任务完成度", // 能力素质项名称
          itemNumber: "item_0001", // 能力素质项编码
          itemId: "1777704778189674496", // 能力素质项ID
          itemGroupLongName: "通用技能/工作能力", // 拼接的能力素质维度，不包括一级维度；如果素质项在一级素质维度则显示“-”
          applyLevel: "4", // 目标等级，只有能力素质项为等级描述才会有值，行为描述是没有这个字段的
          defination: "定义定义定义定义定义定义定义定义定义定义",
          selfAssRes: "优秀", // 自评结果单选显示标签；输入计分显示分数；打星显示标签
          selfAssSum: "个人总结个人总结个人总结个人总结", // 自评个人总结
          fileNum: "4", // 自评文件数量
          starNum: "4", // 选择的星星数量
          reviewType: {
            reviewType: "10", // 10单选 20输入计分 30打星
            decimal: "1", // 小数位数，只有在输入计分下才会有该字段；枚举值0 1 2
            scoreLow: "20", // 输入计分的最低值
            scoreHigh: "200", // 输入计分的最高值
            optionTags: [
              {
                name: "优秀",
                value: "17777047aaa78189674496",
              },
              {
                name: "良好",
                value: "177770477818aaa74496",
              },
            ],
            starTags: [
              {
                name: "优秀",
                value: "1", // 星星数量
              },
              {
                name: "良好",
                value: "2", // 星星数量
              },
            ],
            currentValue: "17777047781aaa89674496", // 当前值，查看态使用；单选显示标签；输入计分显示分数；打星显示标签
          },
        },
      ],
    },
  ],
};

export { mockData };
