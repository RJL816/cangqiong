var RES = {
	"life.sys.label.delete" : "删除",
	"life.sys.warn.delete_node" : "确定删除选定的节点吗？",
	"life.sys.label.ok" : "确定",
	"life.sys.label.cancel" : "取消",
	"life.sys.warn.delete_link" : "确定删除选定的连接吗？",
	"life.sys.tips.could_not_be_deleted" : "不能删除选定节点！",
	"life.sys.tips.add_node" : "复制",
	"life.sys.tips.delete_node" : "删除"
};

var meta = {
	elements : [
			{
				"category" : "link",
				"type" : "NormalTransition",
				"title" : "普通转移",
				"help_text" : null,
				"icon" : "NormalTransition.svg",
				"group" : 0
			},
			{
				"category" : "link",
				"type" : "ErrorTransition",
				"title" : "错误转移",
				"help_text" : "前置节点执行失败时的错误处理分支",
				"icon" : "ErrorTransition.svg",
				"group" : 0,
			},
			{
				"category" : "link",
				"type" : "CompensationTransition",
				"title" : "补偿转移",
				"help_text" : "撤销流程时，对成功执行的前置节点进行补偿，抵消前置节点带来的业务影响",
				"icon" : "CompensationTransition.svg",
				"group" : 0,
			},
			{
				"category" : "node",
				"type" : "ManualStarter",
				"title" : "人工启动",
				"help_text" : "作为开始节点表示当前流程由人工或系统启动执行",
				"icon" : "ManualStarter.svg",
				"group" : 5
			},
			{
				"category" : "node",
				"type" : "SubFlowStarter",
				"title" : "开始",
				"help_text" : "表示子流程开始",
				"icon" : "SubFlowStarter.svg",
				"group" : 5,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "TimerStarter",
				"title" : "定时启动",
				"help_text" : "作为开始节点定时触发服务流程的执行",
				"icon" : "SubFlowStarter.svg",
				"group" : 5
			},
			{
				"category" : "node",
				"type" : "EventStarter",
				"title" : "事件启动",
				"help_text" : "监听单据事件触发服务流程的执行（作为开始节点）",
				"icon" : "EventStarter.svg",
				"group" : 5
			},
			{
				"category" : "node",
				"type" : "MessageStarter",
				"title" : "消息启动",
				"help_text" : "消费消息触发服务流程的执行（作为开始节点）",
				"icon" : "MessageStarter.svg",
				"group" : 5,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "DataCopySchema",
				"title" : "集成方案",
				"help_text" : "同步执行数据集成方案，并输出源单ID和目标单ID到流程变量",
				"icon" : "DataCopySchema.svg",
				"group" : 10,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "DataCopyTrigger",
				"title" : "启动方案",
				"help_text" : "异步执行数据集成方案，适用于大批量数据的集成",
				"icon" : "DataCopyTrigger.svg",
				"group" : 10,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "DataCopy",
				"title" : "数据集成",
				"help_text" : "执行数据集成方案/启动方案，将数据从源系统同步到目标系统",
				"icon" : "DataCopy.svg",
				"group" : 1
			},
			{
				"category" : "node",
				"type" : "DataRetriever",
				"title" : "数据获取",
				"help_text" : "调用集成对象（实体、数据表、视图、查询类API）取数，暂存到流程变量中",
				"icon" : "DataRetriever.svg",
				"group" : 1
			},
			{
				"category" : "node",
				"type" : "FieldMapping",
				"title" : "字段映射",
				"help_text" : "将源数据转换为目标数据",
				"icon" : "FieldMapping.svg",
				"group" : 1
			},
			{
				"category" : "node",
				"type" : "DataLoader",
				"title" : "数据加载",
				"help_text" : "调用集成对象（实体、数据表、服务类API）完成目标系统数据的保存或删除",
				"icon" : "DataLoader.svg",
				"group" : 1
			},
			{
				"category" : "node",
				"type" : "DataComp",
				"title" : "数据对比",
				"help_text" : "调用数据对比方案治理数据",
				"icon" : "DataComp.svg",
				"group" : 1
			},
			{
				"category" : "node",
				"type" : "DataConversion",
				"title" : "数据转换",
				"help_text" : "调用数据集成方案完成来源数据到目标数据的转换",
				"icon" : "DataConversion.svg",
				"group" : 1,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "ValueConversion",
				"title" : "简单值转换",
				"help_text" : "调用值转换规则将取自源系统的值转换为目标系统等价业务语义的值",
				"icon" : "ValueConversion.svg",
				"group" : 1,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "MessagePublisher",
				"title" : "MQ发布",
				"help_text" : "向指定的MQ消息队列发送消息",
				"icon" : "MessagePublisher.svg",
				"group" : 3
			},
			{
				"category" : "node",
				"type" : "ApiInvoker",
				"title" : "API调用",
				"help_text" : "调用登记的API",
				"icon" : "ApiInvoker.svg",
				"group" : 3
			},
			{
				"category" : "node",
				"type" : "WebApiInvoker",
				"title" : "WebAPI调用",
				"help_text" : "WebAPI登记的API",
				"icon" : "WebApiInvoker.svg",
				"group" : 3,
				hidden : true
			},{
				"category" : "node",
				"type" : "WebApiInvokerNew",
				"title" : "WebAPI调用",
				"help_text" : "WebAPI登记的API",
				"icon" : "WebApiInvokerNew.svg",
				"group" : 3
			},
			{
				"category" : "node",
				"type" : "Function",
				"title" : "函数",
				"help_text" : "调用自定义函数、通用RPC、自定义API、本地微服务、WebAPI、Web服务",
				"icon" : "Function.svg",
				"group" : 3,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "Block",
				"title" : "节点块",
				"help_text" : "组装节点放在一起，使得业务区分更加清晰",
				"icon" : "Block.svg",
				"group" : 3
			}, {
				"category" : "node",
				"type" : "LoopBlock",
				"title" : "循环块",
				"help_text" : "组装节点放在一起，循环执行",
				"icon" : "LoopBlock.svg",
				"group" : 3
			}, {
				"category" : "node",
				"type" : "SubFlow",
				"title" : "子流程",
				"help_text" : "调用子流程，方便分解复杂流程或重用业务处理过程",
				"icon" : "SubFlow.svg",
				"group" : 3
			}, {
				"category" : "node",
				"type" : "DataFlowInvoke",
				"title" : "数据流调用",
				"help_text" : "调用数据流",
				"icon" : "DataFlowInvoke.svg",
				"group" : 3
			},
			{
				"category" : "node",
				"type" : "Script",
				"title" : "脚本",
				"help_text" : "执行自定义脚本",
				"icon" : "Script.svg",
				"group" : 3
			},{
				"category" : "node",
				"type" : "BillSplitting",
				"title" : "分单",
				"help_text" : "根据分录相同值的字段将一单拆成多单",
				"icon" : "BillSplitting.svg",
				"group" : 3
			},{
				"category" : "node",
				"type" : "RPA",
				"title" : "RPA流程",
				"help_text" : "通过调用选择的RPA流程触发操作",
				"icon" : "RPA.svg",
				"group" : 4,
				hidden : false
			},{
				"category" : "node",
				"type" : "EventRaiser",
				"title" : "事件触发",
				"help_text" : "通过调用单据操作在目标系统触发单据事件信号",
				"icon" : "EventRaiser.svg",
				"group" : 2,
				hidden : true
			},
			{
				"category" : "node",
				"type" : "NoticeSender",
				"title" : "通知发送",
				"help_text" : "向指定系统的用户发送通知（注意：并非仅能给苍穹当前账套用户发送通知）",
				"icon" : "NoticeSender.svg",
				"group" : 2
			},
			{
				"category" : "node",
				"type" : "ExternalWorkflow",
				"title" : "外部工作流",
				"help_text" : "启动外部系统的工作流（注意：本节点不等待外部流程结束，如需依赖外部流程的处理结果，请使用“时间等待”、“事件等待”或“消息等待”节点实现）",
				"icon" : "ExternalWorkflow.svg",
				"group" : 2,
				hidden : true
			}, {
				"category" : "node",
				"type" : "TimerWaiting",
				"title" : "时间等待",
				"help_text" : "暂停流程执行等待指定的超时",
				"icon" : "TimerWaiting.svg",
				"group" : 2
			}, {
				"category" : "node",
				"type" : "EventWaiting",
				"title" : "事件等待",
				"help_text" : "暂停流程执行等待指定的事件，通过过滤条件来匹配事件数据与等待中的服务流程实例",
				"icon" : "EventWaiting.svg",
				"group" : 2
			}, {
				"category" : "node",
				"type" : "MessageWaiting",
				"title" : "消息等待",
				"help_text" : "暂停流程执行等待指定的消息（必须设置=或in过滤条件）",
				"icon" : "MessageWaiting.svg",
				"group" : 2,
				hidden : true
			},  {
				"category" : "group",
				"type" : "Lane",
				"title" : "泳道",
				"help_text" : "用于流程图的逻辑划分，通常以参与方为划分维度",
				"icon" : "Lane.svg",
				"group" : 2,
				hidden : true
			}, {
				"category" : "node",
				"type" : "EndTermination",
				"title" : "流程终止",
				"help_text" : "该节点为终止节点，无需后续节点",
				"icon" : "EndTermination.svg",
				"group" : 12
			},{
				"category" : "node",
				"type" : "End",
				"title" : "结束",
				"help_text" : "该节点为结束节点，无需后续节点",
				"icon" : "End.svg",
				"group" : 12
			} ]
};