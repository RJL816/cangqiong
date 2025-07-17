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
				"type" : "isc_metadata_schema",
				"title" : "集成对象",
				"help_text" : "集成对象",
				"icon" : "isc_metadata_schema.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_data_source",
				"title" : "数据源",
				"help_text" : "数据源",
				"icon" : "isc_data_source.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_data_copy_trigger",
				"title" : "启动方案",
				"help_text" : "启动方案",
				"icon" : "isc_data_copy_trigger.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_service_flow",
				"title" : "服务流程",
				"help_text" : "服务流程",
				"icon" : "isc_service_flow.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_call_api_by_evt",
				"title" : "API调度（事件）",
				"help_text" : "API调度（事件）",
				"icon" : "isc_call_api_by_evt.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_script",
				"title" : "自定义API",
				"help_text" : "自定义API",
				"icon" : "isc_apic_script.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_by_meta_schema",
				"title" : "集成对象API",
				"help_text" : "集成对象API",
				"icon" : "isc_apic_by_meta_schema.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_by_dc_trigger",
				"title" : "启动方案API",
				"help_text" : "启动方案API",
				"icon" : "isc_apic_by_dc_trigger.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_by_dc_schema",
				"title" : "集成方案API",
				"help_text" : "集成方案API",
				"icon" : "isc_apic_by_dc_schema.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_data_copy",
				"title" : "集成方案",
				"help_text" : "集成方案",
				"icon" : "isc_data_copy.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_by_sf",
				"title" : "服务流程API",
				"help_text" : "服务流程API",
				"icon" : "isc_apic_by_sf.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_custom_function",
				"title" : "自定义函数",
				"help_text" : "自定义函数",
				"icon" : "isc_custom_function.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_for_external_api",
				"title" : "外部注册API",
				"help_text" : "外部注册API",
				"icon" : "isc_apic_for_external_api.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_mservice",
				"title" : "苍穹微服务",
				"help_text" : "苍穹微服务",
				"icon" : "isc_apic_mservice.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_mq_bill_data_pub",
				"title" : "单据消息发布",
				"help_text" : "单据消息发布",
				"icon" : "isc_mq_bill_data_pub.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_value_conver_rule",
				"title" : "值转换规则",
				"help_text" : "值转换规则",
				"icon" : "isc_value_conver_rule.svg",
				"group" : 1
			},{
				"category" : "node",
				"type" : "isc_apic_by_vc",
				"title" : "值转换规则API",
				"help_text" : "值转换规则API",
				"icon" : "isc_apic_by_vc.svg",
				"group" : 1
			}
			 ]
};