/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.swc.hcdm{
            interface SdkHcdmModule_S {
            }
            type SdkHcdmModule_ST = $.kd.sdk.module.Module & SdkHcdmModule_S;
            interface SdkHcdmModule_C extends SdkHcdmModule_ST {
                new():SdkHcdmModule;
            }
            interface SdkHcdmModule$ {
            }
            type SdkHcdmModule_T = $.kd.sdk.module.Module & SdkHcdmModule_S & SdkHcdmModule$;
            interface SdkHcdmModule extends SdkHcdmModule_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.adjapprbill{
            interface ExtensionCfg_S {
            }
            interface ExtensionCfg_C extends ExtensionCfg_S {
                new():ExtensionCfg;
            }
            interface ExtensionCfg$ {
                getExtFieldSetOfAdjType():$.java.util.Set;
                getExtFieldSetOfDecType():$.java.util.Set;
                setExtFieldSetOfAdjType(extFieldSetOfAdjType:$.java.util.Set):void;
                setExtFieldSetOfDecType(extFieldSetOfDecType:$.java.util.Set):void;
            }
            type ExtensionCfg_T = ExtensionCfg_S & ExtensionCfg$;
            interface ExtensionCfg extends ExtensionCfg_T {
            }
            interface IDecAdjApprSyncAdjFileExtPlugin_S {
            }
            interface IDecAdjApprSyncAdjFileExtPlugin$ {
                beforeSynDecRecord?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.BeforeSynDecRecordEvent):void;
            }
            type IDecAdjApprSyncAdjFileExtPlugin_T = IDecAdjApprSyncAdjFileExtPlugin_S & IDecAdjApprSyncAdjFileExtPlugin$;
            interface IDecAdjApprSyncAdjFileExtPlugin extends IDecAdjApprSyncAdjFileExtPlugin_T {
            }
            interface IAdjConfirmPrintExtPlugin_S {
            }
            interface IAdjConfirmPrintExtPlugin$ {
                /**
                 * �޸ĵ�нȷ��ģ�����ش�ӡ������Ϣ
                 * @param event ��нȷ�ϴ�ӡ�¼�
                 *
                 * <pre><code>
                 * import kd.bos.orm.util.CollectionUtils;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.IAdjConfirmPrintExtPlugin;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent;
                 * import kd.swc.hsbp.common.constants.SWCBaseConstants;
                 * import java.util.HashMap;
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class AdjConfirmPrintExtPluginDemoImpl implements IAdjConfirmPrintExtPlugin {
                 *
                 *     public void modifyDataRowValue(AdjConfirmPrintEvent arg) {
                 *         Map<String, Object> parameterMap = arg.getParameterMap();
                 *         if (CollectionUtils.isEmpty(parameterMap)) {
                 *             return;
                 *         }
                 *
                 *         Map<Long, Map<String, String>> dataRowMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         Map<String, String> personDataRowMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         // Map<Long, List<Long>> ��нȷ��ģ���Ӧ��нȷ����Ա��Ϣ
                 *         Object adjConfirmTplAndPersonMapObj = parameterMap.get("adjConfirmPersonIds");
                 *         if (adjConfirmTplAndPersonMapObj != null) {
                 *             List<Long> adjConfirmPersonIds = (List<Long>)adjConfirmTplAndPersonMapObj;
                 *             personDataRowMap.put("personname", "zhangsan");
                 *             personDataRowMap.put("personnumber", "zhangsan_001");
                 *             personDataRowMap.put("company", "company_001");
                 *             personDataRowMap.put("depempadminorg", "dept_001");
                 *             personDataRowMap.put("phone", "12345678999");
                 *             for (Long adjConfirmPersonId : adjConfirmPersonIds) {
                 *                 dataRowMap.put(adjConfirmPersonId, personDataRowMap);
                 *             }
                 *             arg.setDataRowMap(dataRowMap);
                 *         }
                 *     }
                 *
                 * }
                 * </code></pre>
                 */
                modifyDataRowValue(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent):void;
            }
            type IAdjConfirmPrintExtPlugin_T = IAdjConfirmPrintExtPlugin_S & IAdjConfirmPrintExtPlugin$;
            interface IAdjConfirmPrintExtPlugin extends IAdjConfirmPrintExtPlugin_T {
            }
            interface IAdjConfirmPrintExtService_S {
            }
            interface IAdjConfirmPrintExtService$ {
                /**
                 * �޸ĵ�нȷ��ģ�����ش�ӡ��н����
                 * @param event ��нȷ�ϴ�ӡ�¼�
                 *
                 * <pre><code>
                 * import java.util.HashMap;
                 * import java.util.Map;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.IAdjConfirmPrintExtService;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent;
                 * import kd.swc.hsbp.common.constants.SWCBaseConstants;
                 *
                 * public class AdjConfirmPrintExtServiceDemoImpl implements IAdjConfirmPrintExtService {
                 *
                 *     public void getLastPrintContent(AdjConfirmPrintEvent event) {
                 *         // ��нȷ��ģ��洢���ı����� ��{}��������ݽ����滻����
                 *         //{person.name}��{person.number}����ã���л���Թ�˾�����ڸ��������ε�н����ѳ�¯����ǰ[{standarditem.name}н��Ϊ{currentsalary}�����ε�н����Ϊ{actualrange}%����н���Ϊ{actualamount}������н��Ϊ{finalamount}]���뼰ʱ����ȷ�ϣ�
                 *         String message = ResManager.loadKDString("zhangsan��zhangsan_001����ã���л���Թ�˾�����ڸ��������ε�н����ѳ�¯����ǰ[��������н��Ϊ5000�����ε�н����Ϊ10%����н���Ϊ500������н��Ϊ5500]���뼰ʱ����ȷ�ϣ�","AdjConfirmPrintExtServiceDemoImpl_1", "swc-hsba-formplugin");
                 *         Map<Long, String> textContentMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         // event�������и��ߵ�ǰ������Աid
                 *         textContentMap.put(1682625424628175872L,message);
                 *         // ���ý����Ϣ
                 *         event.setTextContentMap(textContentMap);
                 *     }
                 *
                 * }
                 * </code></pre>
                 */
                getLastPrintContent?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent):void;
                /**
                 * �޸ĵ�нȷ��ģ�����ش�ӡ�ļ���
                 * @param event ��нȷ�ϴ�ӡ�¼�
                 *
                 * <pre><code>
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.IAdjConfirmPrintExtService;
                 * import kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent;
                 *
                 * public class AdjConfirmPrintExtServiceDemoImpl implements IAdjConfirmPrintExtService {
                 *
                 *     public void setDownLoadFileName(AdjConfirmPrintEvent arg) {
                 *         String fileName = ResManager.loadKDString("��нȷ�ϵ���������ͨ���������.pdf", "AdjConfirmPrintExtServiceDemoImpl_4", "swc-hsba-formplugin");
                 *         // ���ý����Ϣ
                 *         arg.setFileName(fileName);
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 */
                setDownLoadFileName?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AdjConfirmPrintEvent):void;
            }
            type IAdjConfirmPrintExtService_T = IAdjConfirmPrintExtService_S & IAdjConfirmPrintExtService$;
            interface IAdjConfirmPrintExtService extends IAdjConfirmPrintExtService_T {
            }
            interface IDecAdjApprExtPlugin_S {
            }
            interface IDecAdjApprExtPlugin$ {
                /**
                 * �����Ŀ�������¼�
                 */
                disablePropertyChange?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.DecAdjPropertyChangeEvent):void;
                /**
                 * �����Ա��������ϸ�¼�
                 * @param event
                 */
                onAfterF7PersonSelect?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AfterF7PersonSelectEvent):void;
                /**
                 * ��ȡ��нȷ�ϴ߰�ʱ�ɷ��Ͷ��ŵ��ܴ���
                 * @param event
                 */
                onGetAdjConfirmSmsSendNum?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.OnGetAdjConfirmSmsSendNumEvent):void;
                /**
                 * ��ȡ������չ����
                 * @param event
                 */
                onGetExtensionCfg?(event:OnGetExtensionCfgEvent):void;
                /**
                 * ����ʱ�ֶ�У���¼�
                 * @param event
                 */
                onImportValidate?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.ImportValidateEvent):void;
                /**
                 * ����ʱд����ϸ�¼�
                 * @param event
                 */
                onImportWriteEntry?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.ImportWriteEntryEvent):void;
                /**
                 * �������¼�
                 */
                setColumnHiddenStatus?(event:kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event.AfterBuildEntryGridEvent):void;
            }
            type IDecAdjApprExtPlugin_T = IDecAdjApprExtPlugin_S & IDecAdjApprExtPlugin$;
            interface IDecAdjApprExtPlugin extends IDecAdjApprExtPlugin_T {
            }
            interface OnGetExtensionCfgEvent_S {
            }
            type OnGetExtensionCfgEvent_ST = $.java.util.EventObject & OnGetExtensionCfgEvent_S;
            interface OnGetExtensionCfgEvent_C extends OnGetExtensionCfgEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetExtensionCfgEvent;
            }
            interface OnGetExtensionCfgEvent$ {
                getCfg():ExtensionCfg;
                setCfg(cfg:ExtensionCfg):void;
            }
            type OnGetExtensionCfgEvent_T = $.java.util.EventObject & OnGetExtensionCfgEvent_S & OnGetExtensionCfgEvent$;
            interface OnGetExtensionCfgEvent extends OnGetExtensionCfgEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.adjapprbill.event{
            interface BeforeSynDecRecordEvent_S {
            }
            type BeforeSynDecRecordEvent_ST = $.java.io.Serializable & BeforeSynDecRecordEvent_S;
            interface BeforeSynDecRecordEvent_C extends BeforeSynDecRecordEvent_ST {
                new(adjApprPersonList:$.java.util.List,decAdjSalaryEntityList:$.java.util.List):BeforeSynDecRecordEvent;
            }
            interface BeforeSynDecRecordEvent$ {
                getAdjApprPersonList():$.java.util.List;
                getDecAdjSalaryEntityList():$.java.util.List;
                setAdjApprPersonList(adjApprPersonList:$.java.util.List):void;
                setDecAdjSalaryEntityList(decAdjSalaryEntityList:$.java.util.List):void;
            }
            type BeforeSynDecRecordEvent_T = $.java.io.Serializable & BeforeSynDecRecordEvent_S & BeforeSynDecRecordEvent$;
            interface BeforeSynDecRecordEvent extends BeforeSynDecRecordEvent_T {
            }
            interface AfterF7PersonSelectEvent_S {
            }
            type AfterF7PersonSelectEvent_ST = $.java.util.EventObject & AfterF7PersonSelectEvent_S;
            interface AfterF7PersonSelectEvent_C extends AfterF7PersonSelectEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):AfterF7PersonSelectEvent;
            }
            interface AfterF7PersonSelectEvent$ {
                getAdjAttributionType():string;
                getAdjPersonDyObjList():$.java.util.List;
                setAdjAttributionType(adjAttributionType:string):void;
                setAdjPersonDyObjList(adjPersonDyObjList:$.java.util.List):void;
            }
            type AfterF7PersonSelectEvent_T = $.java.util.EventObject & AfterF7PersonSelectEvent_S & AfterF7PersonSelectEvent$;
            interface AfterF7PersonSelectEvent extends AfterF7PersonSelectEvent_T {
            }
            interface OnGetAdjConfirmSmsSendNumEvent_S {
            }
            type OnGetAdjConfirmSmsSendNumEvent_ST = $.java.util.EventObject & OnGetAdjConfirmSmsSendNumEvent_S;
            interface OnGetAdjConfirmSmsSendNumEvent_C extends OnGetAdjConfirmSmsSendNumEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetAdjConfirmSmsSendNumEvent;
            }
            interface OnGetAdjConfirmSmsSendNumEvent$ {
                getSmsSendNum():number;
                setSmsSendNum(smsSendNum:number):void;
            }
            type OnGetAdjConfirmSmsSendNumEvent_T = $.java.util.EventObject & OnGetAdjConfirmSmsSendNumEvent_S & OnGetAdjConfirmSmsSendNumEvent$;
            interface OnGetAdjConfirmSmsSendNumEvent extends OnGetAdjConfirmSmsSendNumEvent_T {
            }
            interface ImportWriteEntryEvent_S {
            }
            type ImportWriteEntryEvent_ST = $.java.util.EventObject & ImportWriteEntryEvent_S;
            interface ImportWriteEntryEvent_C extends ImportWriteEntryEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):ImportWriteEntryEvent;
            }
            interface ImportWriteEntryEvent$ {
                getAdjAttributionType():string;
                getApprPersonEntityType():$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType;
                getDataList():$.java.util.List;
                getMatchResult():$.java.util.Map;
                getRows():number[];
                getView():$.kd.bos.form.IFormView;
                isRowUpdate():boolean;
                setAdjAttributionType(adjAttributionType:string):void;
                setApprPersonEntityType(apprPersonEntityType:$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType):void;
                setDataList(dataList:$.java.util.List):void;
                setMatchResult(matchResult:$.java.util.Map):void;
                setRowUpdate(rowUpdate:boolean):void;
                setRows(rows:number[]):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type ImportWriteEntryEvent_T = $.java.util.EventObject & ImportWriteEntryEvent_S & ImportWriteEntryEvent$;
            interface ImportWriteEntryEvent extends ImportWriteEntryEvent_T {
            }
            interface AdjConfirmPrintEvent_S {
            }
            type AdjConfirmPrintEvent_ST = $.java.util.EventObject & AdjConfirmPrintEvent_S;
            interface AdjConfirmPrintEvent_C extends AdjConfirmPrintEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):AdjConfirmPrintEvent;
            }
            interface AdjConfirmPrintEvent$ {
                /**
                 * ��ȡ����Դ��Ϣ Map<��нȷ����Աid,Map<���Ա�ʶ,value>>
                 */
                getDataRowMap():$.java.util.Map;
                /**
                 * ��ȡ�ļ���
                 */
                getFileName():string;
                /**
                 * ��ȡ������Ϣ
                 */
                getParameterMap():$.java.util.Map;
                /**
                 * ��ȡ��нȷ��ģ���ӡ���ı�������
                 */
                getTextContentMap():$.java.util.Map;
                /**
                 * ��������Դ��Ϣ
                 *
                 * @param dataRowMap ������Ϣ Map<��нȷ����Աid,Map<����,value>> ���԰���personname��������personnumber�����ţ� company:��˾��
                 *        depempadminorg���ҿ�������֯��job��ְλ��phone���绰��peremail�����˵������䣬joblevel��ְ����jobgrade��ְ��,feedbackstatus:���õ�н����״̬,
                 *        confirmtext:��нȷ��ģ���������������õ�нȷ������
                 */
                setDataRowMap(dataRowMap:$.java.util.Map):void;
                /**
                 * �������ص�нȷ���ļ���
                 *
                 * @param fileName ��нȷ���ļ���
                 */
                setFileName(fileName:string):void;
                /**
                 * ���ò�����Ϣ
                 *
                 * @param parameterMap ������Ϣ map<����key,��������> ����key1: "queryResultParam" ,value: Map<Long, Map<String, String>>
                 *        dataRowMap����AdjConfirmPrintEvent#dataRowMap����Դ������Ϣ ����key2: "adjConfirmPersonIds" ,value: List<Long>
                 *        ��ǰ�����нȷ����Աid����
                 */
                setParameterMap(parameterMap:$.java.util.Map):void;
                /**
                 * ���õ�нȷ��ģ���ӡ���ı�������
                 *
                 * @param textContentMap ��н��Աid��Ӧģ���нȷ��ģ���ӡ���ı����� map<��нȷ����Աid,��нȷ��ģ���ӡ���ı�������>
                 */
                setTextContentMap(textContentMap:$.java.util.Map):void;
            }
            type AdjConfirmPrintEvent_T = $.java.util.EventObject & AdjConfirmPrintEvent_S & AdjConfirmPrintEvent$;
            interface AdjConfirmPrintEvent extends AdjConfirmPrintEvent_T {
            }
            interface AfterBuildEntryGridEvent_S {
            }
            type AfterBuildEntryGridEvent_ST = $.java.io.Serializable & AfterBuildEntryGridEvent_S;
            interface AfterBuildEntryGridEvent_C extends AfterBuildEntryGridEvent_ST {
                new():AfterBuildEntryGridEvent;
            }
            interface AfterBuildEntryGridEvent$ {
                getParamMap():$.java.util.Map;
                setParamMap(paramMap:$.java.util.Map):void;
            }
            type AfterBuildEntryGridEvent_T = $.java.io.Serializable & AfterBuildEntryGridEvent_S & AfterBuildEntryGridEvent$;
            interface AfterBuildEntryGridEvent extends AfterBuildEntryGridEvent_T {
            }
            interface ImportValidateEvent_S {
            }
            type ImportValidateEvent_ST = $.java.util.EventObject & ImportValidateEvent_S;
            interface ImportValidateEvent_C extends ImportValidateEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):ImportValidateEvent;
            }
            interface ImportValidateEvent$ {
                getAdjAttributionType():string;
                getBaseDataMap():$.java.util.Map;
                getColIdMap():$.java.util.Map;
                getDataRows():$.java.util.List;
                getErrorMsg():$.java.util.Map;
                getGradeRankMap():$.java.util.Map;
                getMatchResult():$.java.util.Map;
                getView():$.kd.bos.form.IFormView;
                setAdjAttributionType(adjAttributionType:string):void;
                setBaseDataMap(baseDataMap:$.java.util.Map):void;
                setColIdMap(colIdMap:$.java.util.Map):void;
                setDataRows(dataRows:$.java.util.List):void;
                setErrorMsg(errorMsg:$.java.util.Map):void;
                setGradeRankMap(gradeRankMap:$.java.util.Map):void;
                setMatchResult(matchResult:$.java.util.Map):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type ImportValidateEvent_T = $.java.util.EventObject & ImportValidateEvent_S & ImportValidateEvent$;
            interface ImportValidateEvent extends ImportValidateEvent_T {
            }
            interface DecAdjPropertyChangeEvent_S {
            }
            type DecAdjPropertyChangeEvent_ST = $.java.util.EventObject & DecAdjPropertyChangeEvent_S;
            interface DecAdjPropertyChangeEvent_C extends DecAdjPropertyChangeEvent_ST {
                new(source:any):DecAdjPropertyChangeEvent;
            }
            interface DecAdjPropertyChangeEvent$ {
                getDisableColumns():$.java.util.Set;
                setDisableColumns(disableColumns:$.java.util.Set):void;
            }
            type DecAdjPropertyChangeEvent_T = $.java.util.EventObject & DecAdjPropertyChangeEvent_S & DecAdjPropertyChangeEvent$;
            interface DecAdjPropertyChangeEvent extends DecAdjPropertyChangeEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.adjsalsyn{
            interface IAdjSalSynRecordExtService_S {
            }
            interface IAdjSalSynRecordExtService$ {
                /**
                 * �Զ���нͬ����¼�ڴ����������ǿ
                 *
                 * @param event ����нͬ����¼�¼�
                 */
                extDealAfterCreate?(event:kd.sdk.swc.hcdm.business.extpoint.adjsalsyn.event.AdjSalSynRecordEvent):void;
            }
            type IAdjSalSynRecordExtService_T = IAdjSalSynRecordExtService_S & IAdjSalSynRecordExtService$;
            interface IAdjSalSynRecordExtService extends IAdjSalSynRecordExtService_T {
            }
            interface IAdjSalSynExtService_S {
            }
            interface IAdjSalSynExtService$ {
                /**
                 * ����нͬ������ɾ��ǰ������չ�ӿ�
                 * @param event
                 */
                beforeSalaryAdjSyncDelete?(event:kd.sdk.swc.hcdm.business.extpoint.adjsalsyn.event.BeforeSalaryAdjSyncDeleteEvent):void;
                /**
                 * ����нͬ�����ݸ���ͬ����¼����
                 * @param event
                 */
                beforeUpdateSyncDetailStatus?(event:kd.sdk.swc.hcdm.business.extpoint.adjsalsyn.event.BeforeUpdateSyncDetailStatusEvent):void;
            }
            type IAdjSalSynExtService_T = IAdjSalSynExtService_S & IAdjSalSynExtService$;
            interface IAdjSalSynExtService extends IAdjSalSynExtService_T {
            }
            interface IAdjSalSynTmplSetExtService_S {
            }
            interface IAdjSalSynTmplSetExtService$ {
                getF7BizItemFilter(event:kd.sdk.swc.hcdm.business.extpoint.adjsalsyn.event.AdjSalSynTmplSetEvent):void;
            }
            type IAdjSalSynTmplSetExtService_T = IAdjSalSynTmplSetExtService_S & IAdjSalSynTmplSetExtService$;
            interface IAdjSalSynTmplSetExtService extends IAdjSalSynTmplSetExtService_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.adjsalsyn.event{
            interface BeforeSalaryAdjSyncDeleteEvent_S {
            }
            interface BeforeSalaryAdjSyncDeleteEvent_C extends BeforeSalaryAdjSyncDeleteEvent_S {
                new():BeforeSalaryAdjSyncDeleteEvent;
            }
            interface BeforeSalaryAdjSyncDeleteEvent$ {
                getParams():$.java.util.Map;
                getSyncDetails():$.kd.bos.dataentity.entity.DynamicObject[];
                getSyncRecord():$.kd.bos.dataentity.entity.DynamicObject;
                setParams(params:$.java.util.Map):void;
                setSyncDetails(syncDetails:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setSyncRecord(syncRecord:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type BeforeSalaryAdjSyncDeleteEvent_T = BeforeSalaryAdjSyncDeleteEvent_S & BeforeSalaryAdjSyncDeleteEvent$;
            interface BeforeSalaryAdjSyncDeleteEvent extends BeforeSalaryAdjSyncDeleteEvent_T {
            }
            interface BeforeUpdateSyncDetailStatusEvent_S {
            }
            interface BeforeUpdateSyncDetailStatusEvent_C extends BeforeUpdateSyncDetailStatusEvent_S {
                new():BeforeUpdateSyncDetailStatusEvent;
            }
            interface BeforeUpdateSyncDetailStatusEvent$ {
                getDetails():$.java.util.List;
                getSyncRecord():$.kd.bos.dataentity.entity.DynamicObject;
                setDetails(details:$.java.util.List):void;
                setSyncRecord(syncRecord:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type BeforeUpdateSyncDetailStatusEvent_T = BeforeUpdateSyncDetailStatusEvent_S & BeforeUpdateSyncDetailStatusEvent$;
            interface BeforeUpdateSyncDetailStatusEvent extends BeforeUpdateSyncDetailStatusEvent_T {
            }
            interface AdjSalSynTmplSetEvent_S {
            }
            type AdjSalSynTmplSetEvent_ST = $.java.util.EventObject & AdjSalSynTmplSetEvent_S;
            interface AdjSalSynTmplSetEvent_C extends AdjSalSynTmplSetEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):AdjSalSynTmplSetEvent;
            }
            interface AdjSalSynTmplSetEvent$ {
                getAdjSalSynTmplSetDy():$.kd.bos.dataentity.entity.DynamicObject;
                getRowIndex():number;
                getqFilters():$.java.util.List;
                setAdjSalSynTmplSetDy(adjSalSynTmplSetDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                setRowIndex(rowIndex:number):void;
                setqFilters(qFilters:$.java.util.List):void;
            }
            type AdjSalSynTmplSetEvent_T = $.java.util.EventObject & AdjSalSynTmplSetEvent_S & AdjSalSynTmplSetEvent$;
            interface AdjSalSynTmplSetEvent extends AdjSalSynTmplSetEvent_T {
            }
            interface AdjSalSynRecordEvent_S {
            }
            type AdjSalSynRecordEvent_ST = $.java.util.EventObject & AdjSalSynRecordEvent_S;
            interface AdjSalSynRecordEvent_C extends AdjSalSynRecordEvent_ST {
                new(adjSyncRecord:$.kd.bos.dataentity.entity.DynamicObject):AdjSalSynRecordEvent;
            }
            interface AdjSalSynRecordEvent$ {
                getAdjSyncRecord():$.kd.bos.dataentity.entity.DynamicObject;
                isNewCreated():boolean;
                setNewCreated(newCreated:boolean):void;
            }
            type AdjSalSynRecordEvent_T = $.java.util.EventObject & AdjSalSynRecordEvent_S & AdjSalSynRecordEvent$;
            interface AdjSalSynRecordEvent extends AdjSalSynRecordEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.candsetsalapply{
            interface ICandSetSalApplySyncFileExtPlugin_S {
            }
            interface ICandSetSalApplySyncFileExtPlugin$ {
                /**
                 * ��ѡ�˶�н���뵥���Ƶ��������ֶ�
                 *
                 * @Param: event ���������ֶ��¼�
                 * @Return:  void
                 */
                addSyncFields?(event:kd.sdk.swc.hcdm.business.extpoint.candsetsalapply.event.AddSyncFieldsEvent):void;
            }
            type ICandSetSalApplySyncFileExtPlugin_T = ICandSetSalApplySyncFileExtPlugin_S & ICandSetSalApplySyncFileExtPlugin$;
            interface ICandSetSalApplySyncFileExtPlugin extends ICandSetSalApplySyncFileExtPlugin_T {
            }
            interface IHcdmCandidateSetSalApplExtPlugin_S {
            }
            interface IHcdmCandidateSetSalApplExtPlugin$ {
                /**
                 * ��Ӻ�ѡ�˶�н���뵥�߼��ֶκ������ֶ�ӳ��
                 * @param map key���߼��ֶΣ�value�������ֶ�
                 */
                addFields?(map:$.java.util.Map):void;
            }
            type IHcdmCandidateSetSalApplExtPlugin_T = IHcdmCandidateSetSalApplExtPlugin_S & IHcdmCandidateSetSalApplExtPlugin$;
            interface IHcdmCandidateSetSalApplExtPlugin extends IHcdmCandidateSetSalApplExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.candsetsalapply.event{
            interface AddSyncFieldsEvent_S {
            }
            interface AddSyncFieldsEvent_C extends AddSyncFieldsEvent_S {
                new(paraMap:$.java.util.Map,applyDyn:$.kd.bos.dataentity.entity.DynamicObject,personDyn:$.kd.bos.dataentity.entity.DynamicObject):AddSyncFieldsEvent;
            }
            interface AddSyncFieldsEvent$ {
                getApplyDyn():$.kd.bos.dataentity.entity.DynamicObject;
                getParaMap():$.java.util.Map;
                getPersonDyn():$.kd.bos.dataentity.entity.DynamicObject;
                setParaMap(paraMap:$.java.util.Map):void;
            }
            type AddSyncFieldsEvent_T = AddSyncFieldsEvent_S & AddSyncFieldsEvent$;
            interface AddSyncFieldsEvent extends AddSyncFieldsEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.person{
            interface IHCDMPersonExtService_S {
            }
            interface IHCDMPersonExtService$ {
                /**
                 * ��н��Ա�޸Ĺ��ŷ���
                 *
                 * <pre><code>
                 *
                 * public class HCDMPersonExtDemoService implements IHCDMPersonExtService {
                 *
                 *     public void modifyPersonNumber(Map<String, Object> param) {
                 *         List<Map<String, Object>> datas = (List<Map<String, Object>>) param.get("data");
                 *         //�ɹ��ż���-����
                 *         Set<String> oriNumbers = new HashSet<>(SWCBaseConstants.INITCAPACITY_HSAHSET);
                 *         //KEY:�ɹ���,VALUE=�¹���
                 *         Map<String, String> numberMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *
                 *         for (Map<String, Object> data : datas) {
                 *             String oriNumber = String.valueOf(data.get("oriNumber"));
                 *             String newNumber = String.valueOf(data.get("newNumber"));
                 *
                 *             oriNumbers.add(oriNumber);
                 *
                 *             numberMap.put(oriNumber, newNumber);
                 *         }
                 *
                 *         //�����޸�н�������չ�������ԵĹ���
                 *         dealModifyPersonNumberForEntityRel(param, oriNumbers, numberMap, "kdtest_hcdm_extdemotest", "number", "number");
                 *
                 *         //�޷���ֵ������ʧ��ֱ�����쳣
                 *         if (param.containsKey("testerrorhcdm")) {
                 *             throw new RuntimeException("This deal fail hcdm!!!");
                 *         }
                 *     }
                 *
                 *     private DynamicObject[] dealModifyPersonNumberForEntityRel(Map<String, Object> param, Set<String> oriNumbers, Map<String, String> numberMap, String entityNumber, String propertyName, String relPropertyName) {
                 *         QFilter qFilter = new QFilter(relPropertyName, QFilter.in, oriNumbers);
                 *
                 *         SWCDataServiceHelper empHelper = new SWCDataServiceHelper(entityNumber);
                 *         DynamicObject[] dataDys = empHelper.query(SWCHisBaseDataHelper.getSelectProperties(entityNumber), new QFilter[]{qFilter});
                 *         for (DynamicObject empDy : dataDys) {
                 *             //�����µ��ֶ�ֵ
                 *             String propertyVal = empDy.getString(propertyName);
                 *             //ԭ����
                 *             String oriNumber = empDy.getString(relPropertyName);
                 *             //�¹���
                 *             String newNumber = numberMap.get(oriNumber);
                 *             //�ɹ����ַ����滻Ϊ���ַ���, �˴���Ϊԭ�����Ǿ�ȷ��
                 *             empDy.set(propertyName, propertyVal.replace(oriNumber, newNumber));
                 *         }
                 *         empHelper.update(dataDys);
                 *
                 *         Map<String, Object> resultMap = (Map<String, Object>) param.get("dealInfo");
                 *         resultMap.put(entityNumber + "#" + propertyName, dataDys.length);
                 *         return dataDys;
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param param ���޸ĵĹ�����Ϣ��{"data": [{"oriNumber":"1234567-R", "newNumber":"1234567"}]}
                 * @return �޷���ֵ������ʧ��ֱ�����쳣
                 */
                modifyPersonNumber?(param:$.java.util.Map):void;
            }
            type IHCDMPersonExtService_T = IHCDMPersonExtService_S & IHCDMPersonExtService$;
            interface IHCDMPersonExtService extends IHCDMPersonExtService_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.report{
            interface IAdjDetailRptExtService_S {
            }
            interface IAdjDetailRptExtService$ {
                addExtFilter?(args:kd.sdk.swc.hcdm.business.extpoint.report.event.AdjDetailQueryParamEvent):void;
            }
            type IAdjDetailRptExtService_T = IAdjDetailRptExtService_S & IAdjDetailRptExtService$;
            interface IAdjDetailRptExtService extends IAdjDetailRptExtService_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.report.event{
            interface AdjDetailQueryParamEvent_S {
            }
            interface AdjDetailQueryParamEvent_C extends AdjDetailQueryParamEvent_S {
                new(queryParam:$.kd.bos.entity.report.ReportQueryParam,filters:$.java.util.List):AdjDetailQueryParamEvent;
            }
            interface AdjDetailQueryParamEvent$ {
                addFilter(filter:$.kd.bos.orm.query.QFilter):void;
                getFilters():$.java.util.List;
                getQueryParam():$.kd.bos.entity.report.ReportQueryParam;
            }
            type AdjDetailQueryParamEvent_T = AdjDetailQueryParamEvent_S & AdjDetailQueryParamEvent$;
            interface AdjDetailQueryParamEvent extends AdjDetailQueryParamEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.salarystd{
            interface IHcdmContrastPropForCandExtPlugin_S {
            }
            interface IHcdmContrastPropForCandExtPlugin$ {
                /**
                 * ���ض�������ֵ
                 * @param candContrastPropLoadEvent
                 */
                loadContrastPropValueForCand?(candContrastPropLoadEvent:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.CandContrastPropLoadEvent):void;
            }
            type IHcdmContrastPropForCandExtPlugin_T = IHcdmContrastPropForCandExtPlugin_S & IHcdmContrastPropForCandExtPlugin$;
            interface IHcdmContrastPropForCandExtPlugin extends IHcdmContrastPropForCandExtPlugin_T {
            }
            interface IStdTableExtPlugin_S {
            }
            interface IStdTableExtPlugin$ {
                /**
                 *  <h5>��׼�����֮��Ĵ����߼�</h5>
                 *  ִ��������߼��󣬻ᴥ�����ø÷�����������ڶ���ļ��㣬����ʵ�ָ÷���
                 *  1����׼�����֮��ִ�еĺ����߼�����ִ����doCalculate��ᴥ���÷�����ִ�У��÷�������ҪĿ�ķ�������Щ���ñ�Ʒ������һЩ��չ�����ҵ��
                 *  ��ʵ�ָ÷���������չ������߼��������߼����currentData#stdDataEntities���������������������������������������
                 *  <b>ʵ�ְ�����</b>
                 *  <pre><code>
                 *      public void afterCalculate(StdTableCalculateEvent evt) {
                 *      SalaryStandardEntryData currentData = evt.getCurrentData();
                 *      List<SalaryStdDataEntity> calcResultAdd = Lists.newArrayList();
                 *      for (SalaryStdItemEntity itemEntity : currentData.getItemEntities()) {
                 *          //�������ָ���ı�����Ԥ������Ŀ��ָ����Ŀ�����еȡ��������ü�����
                 *          if(itemEntity.getItemIdentity() == 10000000001L){
                 *              for (SalaryGradeEntity gradeEntity : currentData.getGradeEntities()) {
                 *                  for (SalaryRankEntity rankEntity : currentData.getRankEntities()) {
                 *                      SalaryStdDataEntity data = new SalaryStdDataEntity();
                 *                      data.setItemIdentity(itemEntity.getItemIdentity());
                 *                      data.setGradeIdentity(gradeEntity.getGradeIdentity());
                 *                      data.setRankIdentity(rankEntity.getRankIdentity());
                 *                      //�������Ŀ������н�㣬�����������н��ֵ���õ�������
                 *                      data.setSalaryCount(BigDecimal.valueOf(20));
                 *                      //����������ĵ�ֵ���õ�min�����У�ע middle��max������Ԥ�����������ͱ�׼����ֶ�
                 *                      data.setMin(BigDecimal.valueOf(10000));
                 *                      calcResultAdd.add(data);
                 *                  }
                 *              }
                 *          }
                 *      }
                 *      //�����������õ����ݼ��У����Ա����ü��ϣ�������ǰ������Ŀ����ֵ�Ƴ���
                 *      currentData.getStdDataEntities().addAll(calcResultAdd);
                 * </code></pre>
                 *  @param evt ��Ҫ����ı�׼����Ϣ
                 */
                afterCalculate?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.StdTableCalculateEvent):void;
                /**
                 *  <h5>���ݱ�׼������������ݣ�ִ�м����߼��õ��������ֶε�ֵ</h5>
                 *  ��Ҫʵ�ִ˷�������滻��Ʒ�߼������Ҫ���ñ�Ʒ�����߼�������Ҫʵ�ָ÷���
                 *  1������׼�����������ʱ����ִ�и÷�������Ʒ�ṩ��Ĭ��ʵ�֣������Ҫ��չ�����߼�����Ҫ��д�÷�������д���Ʒ��Ĭ�ϼ����߼�����ִ�У�ֻ��ִ����չ�ķ�����
                 *  2����λὫ��׼�����弰��¼�ֶ�����ʵ����ΪPO���õ�SalaryStandardEntryData�У������߼���Ҫ��currentData#stdDataEntities ���Է��������������Զ��������ݴ�������Ⱦ�������
                 *  <b>ʵ�ְ�����</b> �����������λֵ��������
                 *  <pre><code>
                 *  public void doCalculate(StdTableCalculateEvent evt) {
                 *       SalaryStandardEntryData stdData = calcContext.getCurrentData();
                 *       List<SalaryStdDataEntity> stdDataEntities = stdData.getStdDataEntities();
                 *       // 1�������ݰ���н�ȡ���Ŀ����
                 *       	Map<Long, Map<Long, List<SalaryStdDataEntity>>> dataMap = groupByGradeItem(stdDataEntities);
                 *       // 2���������
                 *       for (Map.Entry<Long, Map<Long, List<SalaryStdDataEntity>>> item : dataMap.entrySet()) {
                 *           Long gradeId = item.getKey();
                 *           int gradeIndex = gradeMap.get(gradeId).getGradeIndex();
                 *           SalaryGradeEntity downGrade = getGradeByIndex(gradeIndex - 1, gradeList);
                 *           for (Map.Entry<Long, List<SalaryStdDataEntity>> entry : item.getValue().entrySet()) {
                 *               Long itemId = entry.getKey();
                 *               List<SalaryStdDataEntity> dataList = entry.getValue();
                 *                // ������λֵ�������������
                 *               SalaryStdDataEntity midEntity = dataList.stream().filter(entity -> 1000000000001L == entity.getRankIdentity()).findFirst().orElse(null);
                 *               SalaryStdDataEntity gearDiffEntity = dataList.stream().filter(entity -> 1000000000004L == entity.getRankIdentity()).findFirst().orElse(null);
                 *               // ��Сֵ�����ֵΪnullʱ����λֵΪnull
                 *               if (null == minEntity.getMin() || null == maxEntity.getMin()){
                 *                   midEntity.setMin(null);
                 *                   gearDiffEntity.setMin(null);
                 *               }else {
                 *                   midEntity.setMin(5000); // ��λֵ��
                 *                   gearDiffEntity.setMin(2000);// ����
                 *               }
                 *           }
                 *       }
                 *  }
                 * </code></pre>
                 *  @param evt ��Ҫ����ı�׼����Ϣ
                 */
                doCalculate?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.StdTableCalculateEvent):void;
                /**
                 *  <h5>��׼�����ʾ��ʽ�����������Ĭ����ʾ��ʽ</h5>
                 *  ��׼��ڶ�����ʾ��ʽ��
                 *       н��н�꣺ ��н�㣨����н��ʱ����ʾ��Ĭ�ϲ���ѡ������нռ�ȣ�Ĭ�Ϲ�ѡ������н�ϼƣ�Ĭ�Ϲ�ѡ�����ϼƣ�Ĭ�Ϲ�ѡ��
                 *       ���н�꣺ ����ϵ����Ĭ�Ϲ�ѡ��������Ĭ�Ϲ�ѡ�������Ĭ�Ϲ�ѡ�����ص��ȣ�Ĭ�Ϲ�ѡ�����ȲĬ�Ϲ�ѡ������нռ�ȡ���н�ϼơ��ϼƣ�Ĭ�Ϲ�ѡ��
                 * ��׼����Ĳ���ʾ��ʽ��
                 *       н��н�꣺ ��нռ�ȣ�Ĭ�Ϲ�ѡ������н�ϼƣ�Ĭ�Ϲ�ѡ�����ϼƣ�Ĭ�Ϲ�ѡ��
                 *       ���н�꣺ ��нռ�ȣ�Ĭ�Ϲ�ѡ������н�ϼƣ�Ĭ�Ϲ�ѡ�����ϼƣ�Ĭ�Ϲ�ѡ��
                 *  �����Ҫ�޸ı�Ʒ��ʾ��ʽ��Ĭ����ʾ�߼���������ʽ������ʵ�ָ÷���
                 *  <b>ʵ�ְ�����</b>
                 *  <pre><code>
                 *      @Override
                 *      public void onGetDisplayParam(OnGetDefaultDisplayParamEvent evt) {
                 *          log.info("go demo StdTableExtPluginExtImpl onGetDisplayParam");
                 *          SalaryStandardBaseEntity standardBaseEntity = evt.getStandardBaseEntity();
                 *          SalaryStandardTypeEnum type = standardBaseEntity.getType();
                 *          DisplayParamNew param = evt.getDisplayParam();
                 *          // �����н��н��
                 *          if (SalaryStandardTypeEnum.SALARYCOUNT == type) {
                 *              // ���磺н��н�������ù�нռ��Ĭ�ϲ���ѡ����н�ϼƲ��ɼ����ϼ�ʹ�ñ�ƷĬ��
                 *              param.setItemLevelValueById(1000000000001L, 2);
                 *              param.setItemLevelValueById(1000000000002L, -1);
                 *          }else if (SalaryStandardTypeEnum.BROADBAND == type) {
                 *              // ����ǿ��н��
                 *              // ���磺���н�������÷���Ĭ�ϲ���ѡ������ϵ�����ɼ�������ʹ�ñ�ƷĬ��
                 *              param.setRankLevelValueById(1000000000003L, 2);
                 *              param.setRankLevelValueById(1000000000002L, -1);
                 *              // ���磺���н�������ù�нռ��Ĭ�Ϲ�ѡ����н�ϼƲ��ɼ����ϼ�ʹ�ñ�ƷĬ��
                 *              param.setItemLevelValueById(1000000000001L, 1);
                 *              param.setItemLevelValueById(1000000000002L, -1);
                 *          }
                 *          // ����ֵ����
                 *          evt.setDisplayParam(param);
                 *      }
                 *  </code></pre>
                 *  @param evt Ԥ����ʽ��ز���
                 */
                onGetDisplayParam?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetDefaultDisplayParamEvent):void;
                /**
                 * <h5>���ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢����ʵ������������ȡ�ֶεĿ������չʾ��Ŀ��</h5>
                 * 1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ�������������ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢����ʵ������������ȡ�ֶεĿ�ȣ�
                 * ���ֶ�����Ŀ����������н������������������������ʱ���ֶε�Ĭ�Ͽ��Ӧ�û��������𣬸ýӿ�֧�ֶ���չ��Ԥ�⼰��������Ŀ��
                 * ����н�����ӵ����ֶ��ṩ������á�
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetFieldColumnWidth(OnGetFieldParamEvent evt) {
                 *     if(evt.getItemEntity().getItemIdentity() == 200000001L){
                 * 	//�������н������
                 *  	evt.setFieldWidth(��150��);//�����������ֶζ���150px��
                 *        }
                 * }
                 * </code></pre>
                 * @param evt �ֶο�Ȼ�ȡ�¼�
                 */
                onGetFieldColumnWidth?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetFieldParamEvent):void;
                /**
                 * <h5>������Ŀʵ�塢н��ʵ�塢�����ֶΡ����㷽ʽ�������ͼģʽ�����������ȡ�ײ��ֶ�Ĭ�ϵ�����̬</h5>
                 * ����չʾ��Ŀ�£�Ĭ������̬���ֶλᱻ������������ҳ�����롣������̬���ֶ�֧��ҳ�����룬��ͬʱ�����ɵ�����ģ����
                 * 1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ����������������Ŀʵ�塢н��ʵ�塢�����ֶΡ����㷽ʽ�������ͼģʽ�����������ȡ�ײ��ֶ�Ĭ�ϵ�����̬��
                 * ����չʾ��Ŀ�£�Ĭ������̬���ֶλᱻ������������ҳ�����롣������̬���ֶ�֧��ҳ�����룬��ͬʱ�����ɵ�����ģ���С�Ĭ�ϻ����Ԥ������Ŀ����Ϊ����̬��
                 * �Ա�������Ŀ����Ϊ������̬
                 * 2�����Я���˱�׼�������Ϣ����Ŀʵ�塢н��ʵ�塢������ţ�����Я��ҳ���õ��ļ��㷽ʽ��CalculationMethodEnum �ܹ����֣������ģʽ��
                 * ���ܱ�׼��ڶ���Ŀǰֻ����SalaryStdGridDisplayTypeEnum#GROUPITEMSģʽ�����������ܻ�֧������ģʽ��ģʽ�ı仯�������ֶ�ά�ȵĵ�����
                 * �����ʵ�ֲ�����Ҫ�ۺ���Щ���ظ����ֶε�Ĭ������̬
                 * 3�������������ж�����Ϊ �� ��׼������Ϊн��ʱ and ��Ŀ�ǹ�н�ϼ� and н������ ������ȷ���ײ��ֶ���Ҫ����
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetFieldLockStatus(OnGetFieldLockStatusEvent evt) {
                 *     if(evt.getGridType().equals(SalaryStdGridDisplayTypeEnum.TABULAR)){
                 *         //�б�ʽ�������ֶ�����
                 *         evt.setLockStatus(Boolean.TRUE);
                 *     }
                 *     if(evt.getGridType().equals(SalaryStdGridDisplayTypeEnum.GROUPITEMS)){
                 *         If(evt.getItemEntity().getItemIdentity() == 10000000002L){
                 * 		        //����ǹ�нռ�ȣ����ֶοɱ༭
                 * 		        evt.setLockStatus(Boolean.FALSE);
                 *        }
                 *     }
                 * }
                 * </code></pre>
                 * @param evt �ֶ�����̬��ȡ�¼�
                 */
                onGetFieldLockStatus?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetFieldLockStatusEvent):void;
                /**
                 * <h5>���ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢�����ֶ���ŵ����������ȡ�ۺ���Ŀģʽ�µײ��ֶε��ֶ�����</h5>
                 * ����չʾ�ۺ���Ŀ���ֶΣ��ۺ���Ŀģʽ��ʾ ��Ŀ-н��Ϊ���ӵĲ㼶�ṹ
                 * 1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ�������������ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢�����ֶ���ŵ����������ȡ�ײ��ֶε��ֶ����ͣ�����չʾ�ۺ���Ŀ���ֶΣ������ֶ���С�����͡�������ͣ�������ͻ�󶨱�׼��ұ�
                 * 2���ۺ���Ŀ���ģʽ��������� ��Ŀ-н��-������Ϊ���ӵĲ㼶�ṹ��������һ��ģʽ���б���ģʽ���������н��������һ��&��Ŀ-������Ϊ���ӵĲ㼶�ṹ�����Ϳɲ鿴SalaryStdGridDisplayTypeEnum��
                 * 3���ۺ���Ŀ���ģʽ��ȷ��һ���ֶ���Ҫ����ά�Ȱ�����Ŀ��н���������ֶΡ������������Ŀ��Ĭ�Ϲ���͵����ֶ�����Ϊ��ֵ���͡�Ԥ������Ŀ�������ֶ�Ĭ��Ϊ������͡���
                 * ʵ������Ҫ�ο�����е����л򲿷���Ϣ���������ײ��ֶε��ֶ�����
                 * 4�������Я���Ĳ�����������׼�����͡���Ŀ��н���������ֶ���ţ������⼸����������õ��ֶ����͡��ֶο�ȣ���ֵ���õ�fieldType��fieldWidth������
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetFieldTypeForGroupItem(OnGetFieldParamEvent evt) {
                 *     If(evt.getItemEntity().getItemIdentity() == 10000000002L){
                 * 		    //����ǹ�нռ�ȣ���ʹ����ֵ����
                 * 		    evt.setFieldType(��decimalfield��)
                 *     }
                 * }
                 * </code></pre>
                 * @param evt �ֶ�����ȡֵ��ΧΪ�� decimalfield��amountfield
                 */
                onGetFieldTypeForGroupItem?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetFieldParamEvent):void;
                /**
                 * <h5>���ݱ�׼�����͡���Ŀʵ�塢�����ֶ���ŵ����������ȡ�б�ʽģʽ�µײ��ֶε��ֶ�����</h5>
                 * ����չʾ�б�ʽ���ֶΣ��б�ʽģʽ��ʾ ��Ŀ-�����ֶ�Ϊ���ӵĲ㼶�ṹ
                 * 1��ͬonGetFieldTypeForGroupItem����������ڸ÷��������б�ʽģʽ�»��Ʊ������
                 * 2���б�ʽ���ģʽ�£������е�rankEntityΪ��
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetFieldTypeForTabular(OnGetFieldParamEvent evt) {
                 *     If(evt.getItemEntity().getItemIdentity() == 10000000002L){
                 * 		    //����ǹ�нռ�ȣ���ʹ����ֵ����
                 * 		    evt.setFieldType(��decimalfield��)
                 *      }
                 * }
                 * </code></pre>
                 * @param evt �ֶ�����ȡֵ��ΧΪ�� decimalfield��amountfield
                 */
                onGetFieldTypeForTabular?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetFieldParamEvent):void;
                /**
                 *  <h5>���ݱ�׼�����͡���Ŀʵ�塢н����ʾ���͵����������ȡ���������б�</h5>
                 *  1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ�������������ݱ�׼�����͡���Ŀʵ�塢н����ʾ���͵����������ȡ���������б��������Թ��ĸ���
                 *  ��Ӧ����׼�����ݷ�¼�ṹ�е�н�㡢��Сֵ����λֵ�����ֵ���ֶοɸ��ݲ�ͬ���͵ı�׼������ͬ��Ŀ�Ĳ�ͬн��չʾ��ͬ�������С�
                 *  2���������Թ��ĸ�����Ӧ����׼�����ݷ�¼�ṹ�е�н�㡢��Сֵ����λֵ�����ֵ���ֶΣ��ɸ��ݲ�ͬ���͵ı�׼������ͬ��Ŀ�Ĳ�ͬн��չʾ��ͬ��������
                 *  ��Ҫע����ǣ�
                 *  (1)н��ֵ�ֶ�ֻ�е���׼��Ϊн������ʱ�Ż��õ���
                 *  (2)�����׼����һ����ֻ����һ��ֵ������ֻ���õ���Сֵ�ֶΡ�
                 *  (3)��λֵ�����ֵ�ֶ��ǵ��������ͱ�׼��ʱ���Ż��õ���
                 *  <b>ʵ�ְ�����</b>
                 *  <pre><code>
                 *  public void onGetIntervalProp(OnGetIntervalPropEvent evt) {
                 *       originalPropList = evt.getOriginalIntervalPropList;
                 *       If(evt.getStdBaseEntity().getType() == SalaryStandardTypeEnum.SALARYCOUNT){
                 *       	If(evt.getItemEntity().getItemIdentity() == 10000000002L){
                 *       		//����ǹ�нռ�ȣ�������չʾн�㡢ֵ��
                 *               //����н�������С�����
                 *       	    IntervalPropEntity salaryCount =new IntervalPropEntity(0L, "н��","н��",0);
                 *       	    IntervalPropEntity min =new IntervalPropEntity(0L, "ֵ","ֵ",1);
                 *       evt.getIntervalPropList.add(salaryCount);
                 *       evt.getIntervalPropList.add(min);
                 *       }
                 * }
                 *  </code></pre>
                 *  @param evt �������Ի�ȡ�¼�
                 */
                onGetIntervalProp?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetIntervalPropEvent):void;
                /**
                 * <h5>���ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢����ʵ������������ȡ�ֶε����ݷ�Χ�����ȡ�С��λҪ��</h5>
                 * 1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ�������������ݱ�׼�����͡���Ŀʵ�塢н��ʵ�塢����ʵ������������ȡ�ֶε����ݷ�Χ��
                 * ���ȡ�С��λҪ��ͬǰ�����ӿ�һ����ǰ�ĸ����Ծ���һ���ֶΣ���ȷ�����ض���ҵ���塣�ýӿڵĵ��ý�������������ֶοؼ������ԣ�
                 * ��֤������¼�롢����չʾ�ϡ���������У��ĳ����н��п��ơ�dataScope����ȡֵ��ʽ�Ͳ����ֵ�ؼ���dataScope����ȡֵ��ʽҪ�󱣳�һ��
                 * 2������ н����¡���нռ����Ŀ�¡���һ���¡���Сֵ�� ������¼�����һ����ֵ���ͰٷֱȺ������Ϣ�����ֶε�Լ����Χ��0~100���ֶεľ���Ϊ19.6
                 * 3�����Я���˼��������ֶκ���Ĺؼ���Ϣ��ʵ������Ҫ�����ֶε�ҵ���彫�ֶε���ֵ��Χ����ֵ���ȡ�С��λ�����ṩ���أ�Ŀǰ�ֶ�����ֻ֧����ֵ��
                 * ������ͣ�dataScope��precision��scale��Ҫ���ظ����ÿ����ɱ�����
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetNumberConstraint(OnGetNumberConstraintEvent evt) {
                 * 	if(evt.getItemEntity().getItemIdentity() == 1000000000001L){
                 * 	//����ǹ�нռ�ȣ�����Χ[0,100],С��λ 2λ���ܳ���15
                 *  	evt.setDataScope(��[0,100]��);
                 *         evt.setPrecision(15);
                 *         evt.setScale(2);
                 *        }
                 * }
                 * </code></pre>
                 * @param evt �ֶ�Լ����ȡ�¼�
                 */
                onGetNumberConstraint?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetNumberConstraintEvent):void;
                /**
                 * <h5>��׼��Ľ�н��չʾĬ��ֵ���������ֵ</h5>
                 * ��н���׼������Ϊ н��н��ʱ ����н�������׼�����õĽ�н��Ĭ����ʾ���Ҳ���ѡ
                 * �����Ҫ�޸Ľ�н���Ĭ����ʾ�߼�������ʵ�ָķ������ý�н���Ĭ����ʾ��ʽ
                 * ������Ҫ���� ��׼������� ��  �Ƿ���н������ֵ
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetOnlySalaryCount(OnGetOnlySalaryCountEvent evt) {
                 *         SalaryStandardTypeEnum type = evt.getType();
                 *         // ���н���׼������Ϊ��н��н��ʱĬ�ϲ���ʾ
                 *         if (null == type || !SalaryStandardTypeEnum.SALARYCOUNT.equals(type)) {
                 *             evt.setDisplayOnlySalaryCount(-1);
                 *             return;
                 *         }
                 *         // ������н��ʱн��Ĭ����ʾ�Ҳ���ѡ
                 *         // 1 ����ʾн��; 2 ��ʾн���ֵ ;-1 ѡ�����(����ʾ)
                 *         if (evt.getIsUseSalaryCount() > 0) {
                 *             evt.setDisplayOnlySalaryCount(1);
                 *         } else {
                 *             evt.setDisplayOnlySalaryCount(-1);
                 *         }
                 *     }
                 * </code></pre>
                 * @param evt ��н����ʾ��ز���
                 */
                onGetOnlySalaryCount?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetOnlySalaryCountEvent):void;
                /**
                 * <h5>��׼���Ԥ����ʽ�����������Ĭ����ʽ������������ʽ</h5>
                 * ��׼��������͵��Ĳ�ҳ���Ԥ����ʽ��Ĭ����ʾ��ʽ1��������������ʽ
                 * �����Ҫ�޸ı�ƷԤ����ʽ��Ĭ����ʾ�߼�������������ʽ������ʵ�ָ÷���
                 * ע�⣺Ĭ��չʾ����ʽ���ܹ����ó�Ϊ����
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetPreviewStyle(OnGetPreviewStyleEvent evt) {
                 *         String index = evt.getIndex();
                 *         if (SWCBaseConstants.STR_THREE.equals(index)){
                 *             //���õ�������Ԥ����ʽ
                 *             evt.setDefaultPrivewStyle(PreviewStyleEnum.LIST);// ��ƷĬ��չʾ��ʽ1
                 *             evt.setNeedHiddenPrivewStyleSet(Sets.newHashSet());//������ʽ
                 *         }
                 *         if (SWCBaseConstants.STR_FOUR.equals(index)){
                 *             //���õ��Ĳ���Ԥ����ʽ
                 *             evt.setDefaultPrivewStyle(PreviewStyleEnum.LIST);// ��ƷĬ��չʾ��ʽ1
                 *             evt.setNeedHiddenPrivewStyleSet(Sets.newHashSet());//��������ʽ
                 *         }
                 *     }
                 * </code></pre>
                 * @param evt Ԥ����ʽ��ز���
                 */
                onGetPreviewStyle?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetPreviewStyleEvent):void;
                /**
                 * <h5>��ȡ��Ŀ��Ҫ�õ���н���б�</h5>
                 * ��Ⱦ������׼��ʱ����ʵ���ڲ�ͬ����Ŀ��ʹ�ò�ͬ��н������
                 * �ɸ��ݲ�ͬ��׼�����͡���ͬ��Ŀ����׼��Ŀ��������Ԥ������Ŀ���ṩ��ͬн����
                 * 1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ������������ȡ��Ŀ��Ҫ�õ���н���б�������Ⱦ����㳡��ʱ�����Ը���ͬ��Ŀ�ṩ��ͬ��н�����������Ⱦ������
                 * �ṩ��н������Ϊ�ֶι�����Ŀ�¡�����Ǽ��㳡�����Ὣ�ṩ��н����д��Ӧ�ı��������ɼ��㡣
                 * 2����λ�Я����׼��������Ҫ�ֶ���Ϣ��н��ȫ����¼��Ϣ����׼��+���⵵������Ŀʵ�塢ʹ�����ͣ�1 ���ڱ��չʾ 2 ���ڼ��㣩
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetRankListOfItem(OnGetItemRankEvent evt) {
                 *     if(StringUtils.equals(evt.getUseType() , "1")){//���ʹ�ó�����������ʾ
                 *         //����������Ŀ��Ҫ��ʾ��н��
                 * 	        SalaryItemLabelEnum itemLabel = item.getItemLabel();
                 * 	        if(itemLabel.equals(SalaryItemLabelEnum.SPECIAL)){
                 * 	        If(item.getItemIdentity() == 1000000000002L ){
                 * 	                //����н�ϼ�ֻ��һ����
                 * 	                evt.getReturnDisplayRankList.addAll(standardRankList.get(0));
                 *           }
                 *      }
                 *      if(StringUtils.equals(evt.getUseType() , "2")){//���ʹ�ó��������ڼ���
                 *             If(item.getItemIdentity() == 1000000000002L ){
                 *  	                //����н�ϼ�ֻ�����е�
                 *  	                evt.getReturnDisplayRankList.addAll(standardRankList);
                 *            }
                 * }
                 * </code></pre>
                 * @param evt н����ȡ���¼�
                 */
                onGetRankListOfItem?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetItemRankEvent):void;
                /**
                 *  <h5>��ȡ��׼����Ŀ�ڱ����չʾ��tip����</h5>
                 *  ���ĳ�ֶ���Ҫ�ṩ����˵��������ʵ�ָ÷��������ض���Ŀ���ֶ�����tips
                 *  1����׼����Ⱦ���ʱ��������Ĭ��ʵ��ִ������������ȡ��׼����Ŀ�ڱ����չʾ��tip���ݣ�������Ŀ����Ϊ�ֶα���ʱ������ͨ���ýӿڸ��ֶ��ṩ����˵����
                 *  ��ܻ�ͨ���÷�������Ϣ���õ��ֶοؼ���tips�С�
                 *  <b>ʵ�ְ�����</b>
                 *  <pre><code>
                 *  public void onGetSalaryStdItemTips(OnGetItemTipsEvent evt) {
                 *      if(evt.getItemEntity().getItemIdentity() == 1000000000001L){
                 *          evt.setTips(ResManager.loadKDString("���ݡ���н�ϼ�/��нռ�ȡ��ó��ĺϼ�ֵ","SalaryStdGridTips_0","swc-hcdm-common"));
                 *       }
                 * }
                 *  </code></pre>
                 *  @param evt ��ʾ��Ϣ��ȡ�¼�
                 */
                onGetSalaryStdItemTips?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetItemTipsEvent):void;
                /**
                 * <h5>��ȡ���ݱ�׼��ʵ���ȡ����н���б�</h5>
                 * ��׼��ڶ�����ʼ��ʱ���ã���Ĭ��ʵ��ִ������������ȡ��������н����������Ⱦ����ֶΡ������Լ���Ⱦ��ʾ��ʽ��ҳ�����ͨ����ʾ��ʽ
                 * ���ؿ�������н���е�չʾ�����ء�ʵ���߿��Ը��ݱ�׼��������Լ�ʹ�ó��� ������������Щ����н�����ϣ���Ҫע����ǣ�
                 * (1)����н����˳��������ֶ���Ⱦ��˳��Ҳ��������ʾ��ʽ������˳��
                 * (2)н�������ƾ������ֶε����ƺ���ʾ��ʽ�е����ƣ���˿��Ե���н���������ڲ�ͬ�ı�׼��ʹ�ó�����չʾ��ͬ
                 * (3)����н��������Ĭ����Դ��ʵ��hcdm_specialrank�е�Ԥ����������ˡ����õ����ݣ�
                 * ʵ���߿�ͨ������Ԥ����������չ�������������д�÷���ִ�������߼����ɣ��÷�������ִ�б�Ʒ��Ĭ��ʵ�֣���ִ����չʵ�֣���˲����л�Я��Ĭ�ϵ����⵵��
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetSpecialRankList(OnGetSpecialRankEvent evt) {
                 *      DynamicObject[] result = queryAllSpecialRank();
                 *     //�����н�㣬��û������н��
                 *      if(type.equals(SalaryStandardTypeEnum.SALARYCOUNT)){
                 *          return new DynamicObject[0];
                 *      }
                 *      //����ǿ���������ʹ�����ͷ���
                 *      if(type.equals(SalaryStandardTypeEnum.BROADBAND)){
                 *          if(useScene == 2){
                 *              //������������ֶ����ݣ�������ϵ������׷�ӣ�%������ʾ���ֶα�����
                 *              for (DynamicObject object : result) {
                 *                  long id = object.getLong(SWCBaseConstants.ID);
                 *                  if(id == 1000000000002L){
                 *                      object.set("name",new LocaleString("name" + "(%)"));
                 *                  }
                 *              }
                 *              return result;
                 *          }
                 *          if(useScene == 1){
                 *              //���������ʾ������������λֵ�Ƴ�
                 *              result = Arrays.stream(result).filter(o -> o.getLong(SWCBaseConstants.ID) != 1000000000001L).collect(Collectors.toList()).toArray(new DynamicObject[0]);
                 *              return result;
                 *          }
                 *      }
                 *          evt.setSpecialRankList(result);
                 * }
                 * </code></pre>
                 * @param evt ����н����ȡ�¼�
                 */
                onGetSpecialRankList?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetSpecialRankEvent):void;
                /**
                 * <h5>��ȡ���ݱ�׼��ʵ���ȡ֧����Ŀ�б�</h5>
                 * 1����׼��ڶ�����ʼ��ʱ���ã���Ĭ��ʵ��ִ������������ȡ������Ԥ������Ŀ��ȡ������Ŀ��������Ⱦ����ֶ��Լ���Ⱦ��ʾ��ʽ��
                 * һ�������Ԥ������Ŀ��ͨ����ʾ��ʽ������չʾ��������Ŀ��ʵ���߿��Ը��ݱ�׼��������Լ�ʹ�ó��� ������������Щ��Ŀ���ϣ���Ҫע����ǣ�
                 * (1)��Ŀ��˳��������ֶ���Ⱦ��˳��Ҳ��������ʾ��ʽ����Ŀ��չʾ˳��
                 * (2)��Ŀ�����ƾ������ֶε����ƺ���ʾ��ʽ�е����ƣ���˿��Ե�����Ŀ�������ڲ�ͬ��ʹ�ó�����չʾ��ͬ
                 * (3)��Ŀ������Ĭ����Դ��ʵ��hcdm_varpredictitem�е�Ԥ����������ˡ����õ�����
                 * 2��ʵ���߿�ͨ������Ԥ����������չ�������������д�÷���ִ�������߼����ɣ��÷�������ִ�б�Ʒ��Ĭ��ʵ�֣���ִ����չʵ�֣���˲����л�Я��Ĭ�ϵ���Ŀ��
                 * 3��ʵ������Ҫ��ʹ�õ�Ԥ�⼰������Ŀ���õ�varPredictItemList ������
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * ʵ�ְ�����
                 * public void onGetVarPredictItemList(OnGetVarPredictItemEvent evt) {
                 *     DynamicObject[] result = queryAllVarPredictItem();
                 *      if(useScene == "2"){ //��������������ݣ����ֶα���Ҫ����һ��
                 *      //����нռ����Ŀ����׷�ӣ�%��
                 *          for (DynamicObject object : result) {
                 *              if(object.getLong(SWCBaseConstants.ID) == 1000000000001L){
                 *                  object.set("name",new LocaleString(object.getString("name")+("(%)")));
                 *              }
                 *          }
                 *      }
                 *     evt.setVarPredictItemList(result);
                 * }
                 * </code></pre>
                 * @param evt Ԥ�⼰��������Ŀ��ȡ�¼�
                 */
                onGetVarPredictItemList?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetVarPredictItemEvent):void;
            }
            type IStdTableExtPlugin_T = IStdTableExtPlugin_S & IStdTableExtPlugin$;
            interface IStdTableExtPlugin extends IStdTableExtPlugin_T {
            }
            interface IHcdmContrastPropExtPlugin_S {
            }
            interface IHcdmContrastPropExtPlugin$ {
                /**
                 * <h5>���ض�������ֵ</h5>
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void loadContrastPropValue(ContrastPropLoadEvent event) {
                 *         List<ContrastPropConfigEntity> propCfg = event.getPropCfgList()��
                 *         List<Long> fileIds = event.getAdjFileIdList()��
                 *         boolean isVersion = event.isVersion()��
                 *         Map<Long, Map<Long,Object>> propValues = event.getPropValues();
                 *         for (ContrastPropConfigEntity cfg : propCfg) {
                 *             switch (cfg.getNumber()){
                 *                 case "1000_S"://	ְλ��ϵ����
                 *                     for (Long fileId : fileIds) {
                 *                         DynamicObject job = fileIdToJobMap.get(fileId);
                 *                         if(job != null && job.getLong("jobscm.id") > 0){
                 *                             propValues.get(fileId).putIfAbsent(cfg.getId(),job.getLong("jobscm.id"));
                 *                         }
                 *                     }
                 *                     break;
                 *                 case "1010_S"://	ְλ����
                 *                     for (Long fileId : fileIds) {
                 *                         DynamicObject job = fileIdToJobMap.get(fileId);
                 *                         if(job != null && job.getLong("jobseq.id") > 0){
                 *                             propValues.get(fileId).putIfAbsent(cfg.getId(),job.getLong("jobseq.id"));
                 *                         }
                 *                     }
                 *                     break;
                 *             }
                 *       }
                 * }
                 * </code></pre>
                 * @param contrastPropLoadEvent
                 */
                loadContrastPropValue?(contrastPropLoadEvent:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.ContrastPropLoadEvent):void;
                /**
                 * <h5>���ݱ�׼����Ϣ����ÿ���������Է����Զ����������</h5>
                 * ����֧�ֶ���������f7�򿪻�����ģ�������Լ����չ�ϵ����У��ʱ�����Զ�ʵ�����״̬��Ȩ�޵����ݷ�Χ������
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 * public void onGetCustomerQFilter(OnGetCustomerQFilterEvent event) {
                 *         String scene = event.getScene();
                 *         switch (scene){
                 *             case "beforeF7Select":
                 *                 prepareQFilterForBeforeF7(event);
                 *                 break;
                 *             case "downloadTemplate":
                 *                 prepareQFilterForBeforeDownloadTplxxx(event);
                 *                 break;
                 *             case "importValidate":
                 *                 prepareQFilterForBeforeImportValidatexxx(event);
                 *                 break;
                 *             default:break;
                 *         }
                 *     }
                 *
                 *     private void prepareQFilterForBeforeF7(OnGetCustomerQFilterEvent event) {
                 *         for (ContrastPropConfigEntity configEntity : event.getPropCfgList()) {
                 *             ArrayList<QFilter> qFilters = Lists.newArrayList();
                 *
                 *             if(configEntity.getId().equals(1050L)){//	ְ��
                 *                 //��ѯְ������������
                 *                 QFilter enableQfilter = new QFilter("enable", QFilter.equals, "1");
                 *                 QFilter statusQfilter = new QFilter("status", QFilter.equals, "C");
                 *                 QFilter curQfilter = new QFilter("iscurrentversion", QFilter.equals, "1");
                 *                 DynamicObject[] objects = BusinessDataServiceHelper.load(""hbjm_joblevelscmhr","id", new QFilter[]{enableQfilter, statusQfilter, curQfilter});
                 *                 Set<Long> scmIds = Arrays.stream(objects).map(o -> o.getLong("id")).collect(Collectors.toSet());
                 *                 qFilters.add(new QFilter("joblevelscm", QFilter.in, scmIds));
                 *             }
                 *             if(!qFilters.isEmpty()){
                 *                 event.getCustomerQFilter().put(configEntity.getId(),qFilters);
                 *             }
                 *         }
                 *     }
                 * </code></pre>
                 * @param evt
                 */
                onGetCustomerQFilter?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetCustomerQFilterEvent):void;
                /**
                 * <h5>��ȡ��׼��Ԥ��ʱ��ÿ���������Է��ص��Զ������</h5>
                 * ��ȡ��׼��Ԥ��ʱ��ÿ���������Է��ص��Զ�����ˣ������ڱ�׼��Ԥ��ʱ�����˳�ָ����Χ�Ķ�����
                 *
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 *    public void onGetCustomerQFilterForStdPreview(OnGetCustomerQFilterEvent evt) {
                 *         Set<Long> propValueIds;
                 *         evt.getCustomerQFilter().put(1010L,Lists.newArrayList(new QFilter("id",QFilter.in,propValueIds)));
                 *     }
                 * </code></pre>
                 * @param evt ��ʾ��Ϣ��ȡ�¼�
                 */
                onGetCustomerQFilterForStdPreview?(evt:kd.sdk.swc.hcdm.business.extpoint.salarystd.event.OnGetCustomerQFilterEvent):void;
            }
            type IHcdmContrastPropExtPlugin_T = IHcdmContrastPropExtPlugin_S & IHcdmContrastPropExtPlugin$;
            interface IHcdmContrastPropExtPlugin extends IHcdmContrastPropExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.extpoint.salarystd.event{
            interface ContrastPropLoadEvent_S {
            }
            type ContrastPropLoadEvent_ST = $.java.util.EventObject & ContrastPropLoadEvent_S;
            interface ContrastPropLoadEvent_C extends ContrastPropLoadEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):ContrastPropLoadEvent;
            }
            interface ContrastPropLoadEvent$ {
                getAdjFileIdList():$.java.util.List;
                getPersonQueryParams():$.java.util.List;
                getPropCfgList():$.java.util.List;
                getPropValues():$.java.util.Map;
                isVersion():boolean;
                setAdjFileIdList(adjFileIdList:$.java.util.List):void;
                setPersonQueryParams(personQueryParams:$.java.util.List):void;
                setPropCfgList(propCfgList:$.java.util.List):void;
                setPropValues(propValues:$.java.util.Map):void;
                setVersion(version:boolean):void;
            }
            type ContrastPropLoadEvent_T = $.java.util.EventObject & ContrastPropLoadEvent_S & ContrastPropLoadEvent$;
            interface ContrastPropLoadEvent extends ContrastPropLoadEvent_T {
            }
            interface OnGetIntervalPropEvent_S {
            }
            type OnGetIntervalPropEvent_ST = $.java.util.EventObject & OnGetIntervalPropEvent_S;
            interface OnGetIntervalPropEvent_C extends OnGetIntervalPropEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetIntervalPropEvent;
            }
            interface OnGetIntervalPropEvent$ {
                getDisplayOnlySalaryCount():number;
                getIntervalPropList():$.java.util.List;
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getOriginalIntervalPropList():$.java.util.List;
                getSpecialRank():kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                setDisplayOnlySalaryCount(displayOnlySalaryCount:number):void;
                setIntervalPropList(intervalPropList:$.java.util.List):void;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setOriginalIntervalPropList(originalIntervalPropList:$.java.util.List):void;
                setSpecialRank(specialRank:kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
            }
            type OnGetIntervalPropEvent_T = $.java.util.EventObject & OnGetIntervalPropEvent_S & OnGetIntervalPropEvent$;
            interface OnGetIntervalPropEvent extends OnGetIntervalPropEvent_T {
            }
            interface OnGetFieldParamEvent_S {
            }
            type OnGetFieldParamEvent_ST = $.java.util.EventObject & OnGetFieldParamEvent_S;
            interface OnGetFieldParamEvent_C extends OnGetFieldParamEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetFieldParamEvent;
            }
            interface OnGetFieldParamEvent$ {
                getFieldType():string;
                getFieldWidth():string;
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getRankEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity;
                getSeq():number;
                getType():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum;
                setFieldType(fieldType:string):void;
                setFieldWidth(fieldWidth:string):void;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setRankEntity(rankEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity):void;
                setSeq(seq:number):void;
                setType(type_arg:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum):void;
            }
            type OnGetFieldParamEvent_T = $.java.util.EventObject & OnGetFieldParamEvent_S & OnGetFieldParamEvent$;
            interface OnGetFieldParamEvent extends OnGetFieldParamEvent_T {
            }
            interface OnGetItemRankEvent_S {
            }
            type OnGetItemRankEvent_ST = $.java.util.EventObject & OnGetItemRankEvent_S;
            interface OnGetItemRankEvent_C extends OnGetItemRankEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetItemRankEvent;
            }
            interface OnGetItemRankEvent$ {
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getRankEntities():$.java.util.List;
                getReturnDisplayRankList():$.java.util.List;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                getUseType():string;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setRankEntities(rankEntities:$.java.util.List):void;
                setReturnDisplayRankList(returnDisplayRankList:$.java.util.List):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
                setUseType(useType:string):void;
            }
            type OnGetItemRankEvent_T = $.java.util.EventObject & OnGetItemRankEvent_S & OnGetItemRankEvent$;
            interface OnGetItemRankEvent extends OnGetItemRankEvent_T {
            }
            interface OnGetDefaultDisplayParamEvent_S {
            }
            type OnGetDefaultDisplayParamEvent_ST = $.java.util.EventObject & OnGetDefaultDisplayParamEvent_S;
            interface OnGetDefaultDisplayParamEvent_C extends OnGetDefaultDisplayParamEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetDefaultDisplayParamEvent;
            }
            interface OnGetDefaultDisplayParamEvent$ {
                getDisplayParam():kd.sdk.swc.hcdm.common.stdtab.DisplayParamNew;
                getStandardBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                setDisplayParam(displayParam:kd.sdk.swc.hcdm.common.stdtab.DisplayParamNew):void;
                setStandardBaseEntity(standardBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
            }
            type OnGetDefaultDisplayParamEvent_T = $.java.util.EventObject & OnGetDefaultDisplayParamEvent_S & OnGetDefaultDisplayParamEvent$;
            interface OnGetDefaultDisplayParamEvent extends OnGetDefaultDisplayParamEvent_T {
            }
            interface StdTableCalculateEvent_S {
            }
            type StdTableCalculateEvent_ST = $.java.util.EventObject & StdTableCalculateEvent_S;
            interface StdTableCalculateEvent_C extends StdTableCalculateEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):StdTableCalculateEvent;
            }
            interface StdTableCalculateEvent$ {
                getCurrentData():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardEntryData;
                getLastData():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardEntryData;
                setCurrentData(currentData:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardEntryData):void;
                setLastData(lastData:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardEntryData):void;
            }
            type StdTableCalculateEvent_T = $.java.util.EventObject & StdTableCalculateEvent_S & StdTableCalculateEvent$;
            interface StdTableCalculateEvent extends StdTableCalculateEvent_T {
            }
            interface OnGetFieldLockStatusEvent_S {
            }
            type OnGetFieldLockStatusEvent_ST = $.java.util.EventObject & OnGetFieldLockStatusEvent_S;
            interface OnGetFieldLockStatusEvent_C extends OnGetFieldLockStatusEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetFieldLockStatusEvent;
            }
            interface OnGetFieldLockStatusEvent$ {
                getCalculationMethod():kd.sdk.swc.hcdm.common.stdtab.CalculationMethodEnum;
                getGridType():kd.sdk.swc.hcdm.common.stdtab.SalaryStdGridDisplayTypeEnum;
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getLockStatus():boolean;
                getRankEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity;
                getSeq():number;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                setCalculationMethod(calculationMethod:kd.sdk.swc.hcdm.common.stdtab.CalculationMethodEnum):void;
                setGridType(gridType:kd.sdk.swc.hcdm.common.stdtab.SalaryStdGridDisplayTypeEnum):void;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setLockStatus(lockStatus:boolean):void;
                setRankEntity(rankEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity):void;
                setSeq(seq:number):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
            }
            type OnGetFieldLockStatusEvent_T = $.java.util.EventObject & OnGetFieldLockStatusEvent_S & OnGetFieldLockStatusEvent$;
            interface OnGetFieldLockStatusEvent extends OnGetFieldLockStatusEvent_T {
            }
            interface OnGetCustomerQFilterEvent_S {
            }
            type OnGetCustomerQFilterEvent_ST = $.java.util.EventObject & OnGetCustomerQFilterEvent_S;
            interface OnGetCustomerQFilterEvent_C extends OnGetCustomerQFilterEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetCustomerQFilterEvent;
            }
            interface OnGetCustomerQFilterEvent$ {
                getCustomerQFilter():$.java.util.Map;
                getPropCfgList():$.java.util.List;
                getScene():string;
                setCustomerQFilter(customerQFilter:$.java.util.Map):void;
                setPropCfgList(propCfgList:$.java.util.List):void;
                setScene(scene:string):void;
            }
            type OnGetCustomerQFilterEvent_T = $.java.util.EventObject & OnGetCustomerQFilterEvent_S & OnGetCustomerQFilterEvent$;
            interface OnGetCustomerQFilterEvent extends OnGetCustomerQFilterEvent_T {
            }
            interface CandContrastPropLoadEvent_S {
                getSerialVersionUID():long;
            }
            type CandContrastPropLoadEvent_ST = $.java.util.EventObject & CandContrastPropLoadEvent_S;
            interface CandContrastPropLoadEvent_C extends CandContrastPropLoadEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):CandContrastPropLoadEvent;
            }
            interface CandContrastPropLoadEvent$ {
                getCandidateToDysMap():$.java.util.Map;
                getPropCfg():$.java.util.List;
                getPropValues():$.java.util.Map;
                isVersion():boolean;
                setCandidateToDysMap(candidateToDysMap:$.java.util.Map):void;
                setPropCfg(propCfg:$.java.util.List):void;
                setPropValues(propValues:$.java.util.Map):void;
                setVersion(version:boolean):void;
            }
            type CandContrastPropLoadEvent_T = $.java.util.EventObject & CandContrastPropLoadEvent_S & CandContrastPropLoadEvent$;
            interface CandContrastPropLoadEvent extends CandContrastPropLoadEvent_T {
            }
            interface OnGetSpecialRankEvent_S {
            }
            type OnGetSpecialRankEvent_ST = $.java.util.EventObject & OnGetSpecialRankEvent_S;
            interface OnGetSpecialRankEvent_C extends OnGetSpecialRankEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetSpecialRankEvent;
            }
            interface OnGetSpecialRankEvent$ {
                getOriginalSpecialRankList():$.kd.bos.dataentity.entity.DynamicObject[];
                getSpecialRankList():$.kd.bos.dataentity.entity.DynamicObject[];
                getType():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum;
                getUseScene():number;
                setOriginalSpecialRankList(originalSpecialRankList:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setSpecialRankList(specialRankList:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setType(type_arg:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum):void;
                setUseScene(useScene:number):void;
            }
            type OnGetSpecialRankEvent_T = $.java.util.EventObject & OnGetSpecialRankEvent_S & OnGetSpecialRankEvent$;
            interface OnGetSpecialRankEvent extends OnGetSpecialRankEvent_T {
            }
            interface OnGetNumberConstraintEvent_S {
            }
            type OnGetNumberConstraintEvent_ST = $.java.util.EventObject & OnGetNumberConstraintEvent_S;
            interface OnGetNumberConstraintEvent_C extends OnGetNumberConstraintEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetNumberConstraintEvent;
            }
            interface OnGetNumberConstraintEvent$ {
                getDataScope():string;
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getPrecision():number;
                getRankEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity;
                getScale():number;
                getSeq():number;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                setDataScope(dataScope:string):void;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setPrecision(precision:number):void;
                setRankEntity(rankEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity):void;
                setScale(scale:number):void;
                setSeq(seq:number):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
            }
            type OnGetNumberConstraintEvent_T = $.java.util.EventObject & OnGetNumberConstraintEvent_S & OnGetNumberConstraintEvent$;
            interface OnGetNumberConstraintEvent extends OnGetNumberConstraintEvent_T {
            }
            interface OnGetPreviewStyleEvent_S {
            }
            type OnGetPreviewStyleEvent_ST = $.java.util.EventObject & OnGetPreviewStyleEvent_S;
            interface OnGetPreviewStyleEvent_C extends OnGetPreviewStyleEvent_ST {
                new(source:any):OnGetPreviewStyleEvent;
            }
            interface OnGetPreviewStyleEvent$ {
                getDefaultPrivewStyle():kd.sdk.swc.hcdm.common.stdtab.PreviewStyleEnum;
                getIndex():string;
                getNeedHiddenPrivewStyleSet():$.java.util.Set;
                setDefaultPrivewStyle(defaultPrivewStyle:kd.sdk.swc.hcdm.common.stdtab.PreviewStyleEnum):void;
                setIndex(index:string):void;
                setNeedHiddenPrivewStyleSet(needHiddenPrivewStyleSet:$.java.util.Set):void;
            }
            type OnGetPreviewStyleEvent_T = $.java.util.EventObject & OnGetPreviewStyleEvent_S & OnGetPreviewStyleEvent$;
            interface OnGetPreviewStyleEvent extends OnGetPreviewStyleEvent_T {
            }
            interface OnGetVarPredictItemEvent_S {
            }
            type OnGetVarPredictItemEvent_ST = $.java.util.EventObject & OnGetVarPredictItemEvent_S;
            interface OnGetVarPredictItemEvent_C extends OnGetVarPredictItemEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetVarPredictItemEvent;
            }
            interface OnGetVarPredictItemEvent$ {
                getType():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum;
                getUseScene():number;
                getVarPredictItemList():$.kd.bos.dataentity.entity.DynamicObject[];
                setType(type_arg:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum):void;
                setUseScene(useScene:number):void;
                setVarPredictItemList(varPredictItemList:$.kd.bos.dataentity.entity.DynamicObject[]):void;
            }
            type OnGetVarPredictItemEvent_T = $.java.util.EventObject & OnGetVarPredictItemEvent_S & OnGetVarPredictItemEvent$;
            interface OnGetVarPredictItemEvent extends OnGetVarPredictItemEvent_T {
            }
            interface OnGetItemTipsEvent_S {
            }
            type OnGetItemTipsEvent_ST = $.java.util.EventObject & OnGetItemTipsEvent_S;
            interface OnGetItemTipsEvent_C extends OnGetItemTipsEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetItemTipsEvent;
            }
            interface OnGetItemTipsEvent$ {
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                getTips():string;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
                setTips(tips:string):void;
            }
            type OnGetItemTipsEvent_T = $.java.util.EventObject & OnGetItemTipsEvent_S & OnGetItemTipsEvent$;
            interface OnGetItemTipsEvent extends OnGetItemTipsEvent_T {
            }
            interface OnGetOnlySalaryCountEvent_S {
            }
            type OnGetOnlySalaryCountEvent_ST = $.java.util.EventObject & OnGetOnlySalaryCountEvent_S;
            interface OnGetOnlySalaryCountEvent_C extends OnGetOnlySalaryCountEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetOnlySalaryCountEvent;
            }
            interface OnGetOnlySalaryCountEvent$ {
                getDisplayOnlySalaryCount():number;
                getIsUseSalaryCount():number;
                getType():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum;
                setDisplayOnlySalaryCount(displayOnlySalaryCount:number):void;
                setIsUseSalaryCount(isUseSalaryCount:number):void;
                setType(type_arg:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardTypeEnum):void;
            }
            type OnGetOnlySalaryCountEvent_T = $.java.util.EventObject & OnGetOnlySalaryCountEvent_S & OnGetOnlySalaryCountEvent$;
            interface OnGetOnlySalaryCountEvent extends OnGetOnlySalaryCountEvent_T {
            }
            interface OnGetFieldColumnWidthEvent_S {
            }
            type OnGetFieldColumnWidthEvent_ST = $.java.util.EventObject & OnGetFieldColumnWidthEvent_S;
            interface OnGetFieldColumnWidthEvent_C extends OnGetFieldColumnWidthEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):OnGetFieldColumnWidthEvent;
            }
            interface OnGetFieldColumnWidthEvent$ {
                getCalculationMethod():kd.sdk.swc.hcdm.common.stdtab.CalculationMethodEnum;
                getItemEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity;
                getRankEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity;
                getSeq():number;
                getStdBaseEntity():kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity;
                getWidthPx():number;
                setCalculationMethod(calculationMethod:kd.sdk.swc.hcdm.common.stdtab.CalculationMethodEnum):void;
                setItemEntity(itemEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStdItemEntity):void;
                setRankEntity(rankEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryRankEntity):void;
                setSeq(seq:number):void;
                setStdBaseEntity(stdBaseEntity:kd.sdk.swc.hcdm.common.stdtab.SalaryStandardBaseEntity):void;
                setWidthPx(widthPx:number):void;
            }
            type OnGetFieldColumnWidthEvent_T = $.java.util.EventObject & OnGetFieldColumnWidthEvent_S & OnGetFieldColumnWidthEvent$;
            interface OnGetFieldColumnWidthEvent extends OnGetFieldColumnWidthEvent_T {
            }
        }
        namespace kd.sdk.swc.hcdm.business.mservice.helper{
            interface AdjConfirmBillServiceHelper_S {
                /**
                 * ���ص�нȷ�ϵ�
                 *
                 * @param parameterMap<String, Object> ��������,parameterMap��Key�����б�����:
                 *        <p>
                 *        �������� ���� �������� �Ƿ�ش�
                 *        <p>
                 *        ��ӡģ��id printTemplateId String ��
                 *        <p>
                 *        �Ƿ���Ҫ������� isFillDataFlag boolean ��
                 *        <p>
                 *        ��нȷ����Ա��Ӧ��ʵ����Ϣ dataRowMainMap Map<��нȷ����Աid-String����, Map<���Ա�ʶ-String����, ֵ>> ��
                 *        <p>
                 *        ��нȷ����Ա��Ӧ��Ŀ��Ϣ dataRowItemMap Map <��нȷ����Աid-String����, List< Map<���Ա�ʶ-String����, ֵ>>> ��
                 *        <p>
                 *        ��нȷ��ģ���Ӧ��нȷ����Ա��Ϣ adjConfirmTplAndPersonMap Map<��нȷ����Աid-String����, List<��нȷ����Աid-Long����>> ��
                 *        <p>
                 * @return Map<String, Object> {success=true, message=���سɹ���, url=http:XXX}
                 */
                downloadAdjConfirmBill(parameterMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ӡ��нȷ�ϵ�
                 *
                 * @param parameterMap<String, Object> ��������,parameterMap��Key�����б�����:
                 *        <p>
                 *        �������� ���� �������� �Ƿ�ش�
                 *        <p>
                 *        ��ӡ��id printerId String ��
                 *        <p>
                 *        ��ӡģ��id printTemplateId String ��
                 *        <p>
                 *        �Ƿ���Ҫ������� isFillDataFlag boolean ��
                 *        <p>
                 *        ��нȷ����Ա��Ӧ��ʵ����Ϣ dataRowMainMap Map<��нȷ����Աid-String����, Map<���Ա�ʶ-String����, ֵ>> ��
                 *        <p>
                 *        ��нȷ����Ա��Ӧ��Ŀ��Ϣ dataRowItemMap Map <��нȷ����Աid-String����, List< Map<���Ա�ʶ-String����, ֵ>>> ��
                 *        <p>
                 *        ��нȷ��ģ���Ӧ��нȷ����Ա��Ϣ adjConfirmTplAndPersonMap Map<��нȷ����Աid-String����, List<��нȷ����Աid-Long����>> ��
                 *        <p>
                 * @return Map<String, Object> {success=true, message=��ӡ�ɹ�����ȥ��ӡ���鿴��, url=""}
                 */
                printAdjConfirmBill(parameterMap:$.java.util.Map):$.java.util.Map;
            }
            interface AdjConfirmBillServiceHelper_C extends AdjConfirmBillServiceHelper_S {
                new():AdjConfirmBillServiceHelper;
            }
            interface AdjConfirmBillServiceHelper$ {
            }
            type AdjConfirmBillServiceHelper_T = AdjConfirmBillServiceHelper_S & AdjConfirmBillServiceHelper$;
            interface AdjConfirmBillServiceHelper extends AdjConfirmBillServiceHelper_T {
            }
            interface SalaryStdServiceHelper_S {
                /**
                 * ���ݱ�׼��id��ȡ��������(����Ӧ�÷�Χ)
                 * @param stdTableIdList ��׼��id����
                 * @return key:��׼��id,value: ��������ʵ��
                 */
                getContrastProp(stdTableIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ���ݱ�׼��Ͷ������Լ����ƥ��н��н����Χ
                 * @param params
                 * @return key:uniqueCode,value:��׼��ƥ��н��н�����ʵ��
                 */
                matchTableRange(params:$.java.util.List):$.java.util.Map;
            }
            interface SalaryStdServiceHelper_C extends SalaryStdServiceHelper_S {
                new():SalaryStdServiceHelper;
            }
            interface SalaryStdServiceHelper$ {
            }
            type SalaryStdServiceHelper_T = SalaryStdServiceHelper_S & SalaryStdServiceHelper$;
            interface SalaryStdServiceHelper extends SalaryStdServiceHelper_T {
            }
            interface AdjFileInfoServiceHelper_S {
                /**
                 * @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 * @param endOperate �Ƿ����ȫ������
                 * @param paramsList Map�������һ��Ҫ�����Ķ���н��������
                 * @return
                 */
                abandonAdjFile(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡ��Ӧ��������Ŀ���������
                 * ��н���뵥����ʱ��Ҫ������һ����Ŀ�Ŀ��ð汾�������Ч����
                 * ҵ��ʹ�ó�������֤��Ŀ�İ汾�и������и
                 *
                 * @param fileItemIdMap
                 * @return
                 */
                getMaxDateByFileAndItemId(fileItemIdMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��н����ʱ�����ݵ���id��ȡ�õ�������������
                 * �ж��߼���1. �õ�������û�ж���н��Ϣ�ҵ���������Ϣû�з������ù�ʱ���򷵻�ϵͳ������Ч����
                 * 2.�������ж���н��Ϣ��������Ч�а汾֮ǰ���������ð汾���򷵻ص���ʧЧ����+1 �Ͷ���н��Ϣ�е������ð汾��Ч���ڵ����ֵ
                 * ҵ��ʹ�ó�������֤��Ŀ�İ汾�и������и�磺������н���͵Ķ�н���뵥ʱ����Ŀ����Ч����Ҫ���ڸõ����µ������Ч����
                 *
                 * @param fileBOIds ����BOID����
                 * @return
                 */
                getMaxDateByFileBOId(fileBOIds:$.java.util.Set):$.java.util.Map;
                /**
                 * ���ɻ���¶���н��������������н��Ϣ��������н������Ϣͬ����
                 *
                 * @param paramsList ����н������Ϣ����
                 * @return {data:[{������Ϣ}],"success"��true/false��"message":��Ϣ��ʾ}
                 */
                saveAdjFile(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * �������ָ���и������ж���н��Ϣ���ݵİ汾�и���Ϊ��Ŀά��
                 * �˽ӿ������ڵ��������µĴ�������Ҫ�鵵����н��Ϣ
                 * @param uuid    ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 * @param endOperate  �Ƿ����ȫ������
                 * @param paramsList ����н��Ŀ����
                 * @return
                 */
                saveBatchDecAdjData(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ����н��¼ԭ�ӻ��ӿڣ��������Ŀ���а汾�����汾�жϲ����������ڴ����ݳ����µķ�������
                 *
                 *  @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 *  @param endOperate �Ƿ����ȫ�����䣬�ǣ������¼���������н���ݽ���������н��������ͬ�����Σ�δ������н
                 *  @param paramsList Map���������Ŀά�����
                 *  @return
                 */
                saveBatchDecAdjRecord(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * �������ָ���и������ж���н��Ϣ���ݵİ汾�и���Ϊ��Ŀά��
                 *
                 * @param paramsList ��Ŀά����μ���
                 * @return {data:[{��Ŀ��Ϣ}],"success"��true/false��"message":��Ϣ��ʾ}
                 */
                saveDecAdjData(paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ����н��¼ԭ�ӻ��ӿڣ��������Ŀ���а汾�����汾�жϲ���
                 *
                 * @param paramsList ��Ŀ���ݼ�
                 * @return
                 */
                saveDecAdjRecord(paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 * @param endOperate �Ƿ����ȫ������
                 * @param paramsList Map�������һ��ҪʧЧ�Ķ���н��������
                 * @return
                 */
                unableAdjFile(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
            }
            interface AdjFileInfoServiceHelper_C extends AdjFileInfoServiceHelper_S {
                new():AdjFileInfoServiceHelper;
            }
            interface AdjFileInfoServiceHelper$ {
            }
            type AdjFileInfoServiceHelper_T = AdjFileInfoServiceHelper_S & AdjFileInfoServiceHelper$;
            interface AdjFileInfoServiceHelper extends AdjFileInfoServiceHelper_T {
            }
            interface AdjConfirmTplServiceHelper_S {
                /**
                 * ��ѯ��нȷ��ģ�������Ϣ����
                 *
                 * @param adjConfirmTplQueryFields ��нȷ��ģ���ֶ����Լ���
                 * @param qFilters ������
                 * @param orderBys ����
                 * @return ��нȷ��ģ�弯��
                 */
                getAdjConfirmTplInfos(adjConfirmTplQueryFields:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string):$.java.util.List;
            }
            interface AdjConfirmTplServiceHelper_C extends AdjConfirmTplServiceHelper_S {
                new():AdjConfirmTplServiceHelper;
            }
            interface AdjConfirmTplServiceHelper$ {
            }
            type AdjConfirmTplServiceHelper_T = AdjConfirmTplServiceHelper_S & AdjConfirmTplServiceHelper$;
            interface AdjConfirmTplServiceHelper extends AdjConfirmTplServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.hcdm.common.stdtab{
            enum VarPredictItemType {
                predict,
                variable
            }
            enum SalaryStdGridDisplayTypeEnum {
                GROUPITEMS,
                GROUPRANK,
                TABULAR
            }
            interface StdTableDataQueryParam_S {
            }
            type StdTableDataQueryParam_ST = $.java.io.Serializable & StdTableDataQueryParam_S;
            interface StdTableDataQueryParam_C extends StdTableDataQueryParam_ST {
                new():StdTableDataQueryParam;
            }
            interface StdTableDataQueryParam$ {
                getGradeId():long;
                getGradeNextOffset():number;
                getGradePreOffset():number;
                getItemId():long;
                getNeedRankType():string;
                getStdTabId():long;
                getUnionId():string;
                getVarPredictItemId():long;
                setGradeId(gradeId:long):void;
                setGradeNextOffset(gradeNextOffset:number):void;
                setGradePreOffset(gradePreOffset:number):void;
                setItemId(itemId:long):void;
                setNeedRankType(needRankType:string):void;
                setStdTabId(stdTabId:long):void;
                setUnionId(unionId:string):void;
                setVarPredictItemId(varPredictItemId:long):void;
            }
            type StdTableDataQueryParam_T = $.java.io.Serializable & StdTableDataQueryParam_S & StdTableDataQueryParam$;
            interface StdTableDataQueryParam extends StdTableDataQueryParam_T {
            }
            interface SalaryStdItemEntity_S {
            }
            type SalaryStdItemEntity_ST = $.java.io.Serializable & SalaryStdItemEntity_S;
            interface SalaryStdItemEntity_C extends SalaryStdItemEntity_ST {
                new():SalaryStdItemEntity;
                new(salaryStandardId:long,itemIdentity:long,itemIndex:number,salaryItemId:long,itemType:SalaryStandardTypeEnum,itemIsUseSalaryRank:number,itemIsUseSalaryCount:number):SalaryStdItemEntity;
            }
            interface SalaryStdItemEntity$ {
                getEntryid():long;
                getIsFixedItem():number;
                getItemIdentity():long;
                getItemIndex():number;
                getItemIsUseSalaryCount():number;
                getItemIsUseSalaryRank():number;
                getItemLabel():SalaryItemLabelEnum;
                getItemName():string;
                getItemType():SalaryStandardTypeEnum;
                getSalaryItemId():long;
                getSalaryStandardId():long;
                getVarPredictItemType():VarPredictItemType;
                setEntryid(entryid:long):void;
                setIsFixedItem(isFixedItem:number):void;
                setItemIdentity(itemIdentity:long):void;
                setItemIndex(itemIndex:number):void;
                setItemIsUseSalaryCount(itemIsUseSalaryCount:number):void;
                setItemIsUseSalaryRank(itemIsUseSalaryRank:number):void;
                setItemLabel(itemLabel:SalaryItemLabelEnum):void;
                setItemName(itemName:string):void;
                setItemType(itemType:SalaryStandardTypeEnum):void;
                setSalaryItemId(salaryItemId:long):void;
                setSalaryStandardId(salaryStandardId:long):void;
                setVarPredictItemType(varPredictItemType:VarPredictItemType):void;
            }
            type SalaryStdItemEntity_T = $.java.io.Serializable & SalaryStdItemEntity_S & SalaryStdItemEntity$;
            interface SalaryStdItemEntity extends SalaryStdItemEntity_T {
            }
            interface ViewControlParam_S {
            }
            interface ViewControlParam_C extends ViewControlParam_S {
                new():ViewControlParam;
            }
            interface ViewControlParam$ {
                getCanEdit():number;
                setCanEdit(canEdit:number):void;
            }
            type ViewControlParam_T = ViewControlParam_S & ViewControlParam$;
            interface ViewControlParam extends ViewControlParam_T {
            }
            interface SimpleStdRangeMatchResult_S {
            }
            interface SimpleStdRangeMatchResult_C extends SimpleStdRangeMatchResult_S {
                new():SimpleStdRangeMatchResult;
            }
            interface SimpleStdRangeMatchResult$ {
                getNoMatchProp():$.java.util.Map;
                getRangeData():$.java.util.Map;
                getStdTableVid():long;
                getUnionId():string;
                setNoMatchProp(noMatchProp:$.java.util.Map):void;
                setRangeData(rangeData:$.java.util.Map):void;
                setStdTableVid(stdTableVid:long):void;
                setUnionId(unionId:string):void;
            }
            type SimpleStdRangeMatchResult_T = SimpleStdRangeMatchResult_S & SimpleStdRangeMatchResult$;
            interface SimpleStdRangeMatchResult extends SimpleStdRangeMatchResult_T {
            }
            enum SalaryStandardTypeEnum {
                SALARYCOUNT,
                INTERVAL,
                BROADBAND
            }
            enum SalaryItemLabelEnum {
                STANDARD,
                FIXEDSALARYSCALE,
                SPECIAL,
                FIXEDSALARYTOTAL,
                TOTAL,
                UNFIXEDSALARYTOTAL
            }
            enum SalaryRankLabelEnum {
                STANDARD,
                SPECIAL,
                MEDIANVALUE,
                INCREASINGCOEFFICIENT,
                WIDTH,
                GEARDIFFERENCE,
                OVERLAP,
                ISOMETRIC
            }
            interface SalaryStandardEntryData_S {
                instance():SalaryStandardEntryData;
            }
            type SalaryStandardEntryData_ST = $.java.io.Serializable & SalaryStandardEntryData_S;
            interface SalaryStandardEntryData_C extends SalaryStandardEntryData_ST {
                new():SalaryStandardEntryData;
            }
            interface SalaryStandardEntryData$ {
                buildAppliedRange(appliedRangeEntities:$.java.util.List):this;
                buildBase(stdBaseEntity:SalaryStandardBaseEntity):this;
                buildContrastProp(contrastPropEntities:$.java.util.List):this;
                buildContrastRowData(contrastRowEntities:$.java.util.List):this;
                buildDisplayParamNew(displayParam:DisplayParamNew):this;
                buildDisplayParamProp(displayParamPropEntities:$.java.util.List):this;
                buildGrade(gradeEntities:$.java.util.List):this;
                buildIntervalProp(propEntities:$.java.util.List):this;
                buildItem(itemEntities:$.java.util.List):this;
                buildRank(rankEntities:$.java.util.List):this;
                buildStdData(stdDataEntities:$.java.util.List):this;
                buildStdDataStrs(stdDataStrs:$.java.util.Map):this;
                buildViewControlParam(param:ViewControlParam):this;
                getAppliedRangeEntities():$.java.util.List;
                getContrastPropEntities():$.java.util.List;
                getContrastRowEntities():$.java.util.List;
                getDisplayParam():DisplayParamNew;
                getDisplayParamPropEntities():$.java.util.List;
                getGradeEntities():$.java.util.List;
                getItemEntities():$.java.util.List;
                getPropEntities():$.java.util.List;
                getRankEntities():$.java.util.List;
                getStdBaseEntity():SalaryStandardBaseEntity;
                getStdDataEntities():$.java.util.List;
                getStdDataStrs():$.java.util.Map;
                getViewControlParam():ViewControlParam;
            }
            type SalaryStandardEntryData_T = $.java.io.Serializable & SalaryStandardEntryData_S & SalaryStandardEntryData$;
            interface SalaryStandardEntryData extends SalaryStandardEntryData_T {
            }
            interface SalaryRankEntity_S {
            }
            type SalaryRankEntity_ST = $.java.io.Serializable & SalaryRankEntity_S;
            interface SalaryRankEntity_C extends SalaryRankEntity_ST {
                new():SalaryRankEntity;
                new(rankIdentity:long,rankName:string,rankIsUserSet:number,id:long):SalaryRankEntity;
                new(salaryStandardId:long,rankIdentity:long,rankIndex:number,rankName:string,rankLabel:SalaryRankLabelEnum,rankIsUserSet:number,rankIsSysPreSet:number):SalaryRankEntity;
            }
            interface SalaryRankEntity$ {
                getId():long;
                getRankIdentity():long;
                getRankIndex():number;
                getRankIsSysPreSet():number;
                getRankIsUserSet():number;
                getRankLabel():SalaryRankLabelEnum;
                getRankName():string;
                getRankNumber():string;
                getSalaryStandardId():long;
                setId(id:long):void;
                setRankIdentity(rankIdentity:long):void;
                setRankIndex(rankIndex:number):void;
                setRankIsSysPreSet(rankIsSysPreSet:number):void;
                setRankIsUserSet(rankIsUserSet:number):void;
                setRankLabel(rankLabel:SalaryRankLabelEnum):void;
                setRankName(rankName:string):void;
                setRankNumber(rankNumber:string):void;
                setSalaryStandardId(salaryStandardId:long):void;
            }
            type SalaryRankEntity_T = $.java.io.Serializable & SalaryRankEntity_S & SalaryRankEntity$;
            interface SalaryRankEntity extends SalaryRankEntity_T {
            }
            interface SalaryStandardBaseEntity_S {
                getSerialversionuid():long;
            }
            type SalaryStandardBaseEntity_ST = $.java.io.Serializable & SalaryStandardBaseEntity_S;
            interface SalaryStandardBaseEntity_C extends SalaryStandardBaseEntity_ST {
                new():SalaryStandardBaseEntity;
            }
            interface SalaryStandardBaseEntity$ {
                getCalcMethod():CalculationMethodEnum;
                getCountryId():long;
                getCurrencyEntity():CurrencyEntity;
                getCurrencyId():long;
                getFrequencyId():long;
                getGradeRankSeqMapEntity():GradeRankSeqMapEntity;
                getId():long;
                getIsUseSalaryCount():number;
                getIsUseSalaryRank():number;
                getJobScmId():long;
                getMonetaryUnit():string;
                getSalaryCountAmount():$.java.math.BigDecimal;
                getType():SalaryStandardTypeEnum;
                isUseSalaryCount():boolean;
                isUseSalaryRank():boolean;
                setCalcMethod(calcMethod:CalculationMethodEnum):void;
                setCountryId(countryId:long):void;
                setCurrencyEntity(currencyEntity:CurrencyEntity):void;
                setCurrencyId(currencyId:long):void;
                setFrequencyId(frequencyId:long):void;
                setGradeRankSeqMapEntity(gradeRankSeqMapEntity:GradeRankSeqMapEntity):void;
                setId(id:long):void;
                setIsUseSalaryCount(isUseSalaryCount:number):void;
                setIsUseSalaryRank(isUseSalaryRank:number):void;
                setJobScmId(jobScmId:long):void;
                setMonetaryUnit(monetaryUnit:string):void;
                setSalaryCountAmount(salaryCountAmount:$.java.math.BigDecimal):void;
                setType(type_arg:SalaryStandardTypeEnum):void;
            }
            type SalaryStandardBaseEntity_T = $.java.io.Serializable & SalaryStandardBaseEntity_S & SalaryStandardBaseEntity$;
            interface SalaryStandardBaseEntity extends SalaryStandardBaseEntity_T {
            }
            interface StdRangeNameFormatParam_S {
            }
            type StdRangeNameFormatParam_ST = $.java.io.Serializable & StdRangeNameFormatParam_S;
            interface StdRangeNameFormatParam_C extends StdRangeNameFormatParam_ST {
                new():StdRangeNameFormatParam;
            }
            interface StdRangeNameFormatParam$ {
                getRangeData():$.java.util.Map;
                getStdTableId():long;
                getUnionId():string;
                isSplitWithGradeName():boolean;
                isUseRank():boolean;
                setRangeData(rangeData:$.java.util.Map):void;
                setSplitWithGradeName(splitWithGradeName:boolean):void;
                setStdTableId(stdTableId:long):void;
                setUnionId(unionId:string):void;
                setUseRank(useRank:boolean):void;
            }
            type StdRangeNameFormatParam_T = $.java.io.Serializable & StdRangeNameFormatParam_S & StdRangeNameFormatParam$;
            interface StdRangeNameFormatParam extends StdRangeNameFormatParam_T {
            }
            enum CalculationMethodEnum {
                GRADE_RANK,
                MEDIAN_WIDTH,
                MEDIAN_GEAR
            }
            enum PreviewStyleEnum {
                LIST,
                PREVIEW,
                LISTSECOND
            }
            interface DisplayParamNew_S {
            }
            type DisplayParamNew_ST = $.java.io.Serializable & DisplayParamNew_S;
            interface DisplayParamNew_C extends DisplayParamNew_ST {
                new():DisplayParamNew;
            }
            interface DisplayParamNew$ {
                getDisplayGradeStyle():number;
                getDisplayOnlySalaryCount():number;
                getDisplaySalaryGradeSort():number;
                getDisplaySalaryRankSort():number;
                getItemLevelParam():$.java.util.LinkedHashMap;
                /**
                 * ����id��ȡItem����value
                 *
                 * @param id
                 * @return
                 */
                getItemLevelValueById(id:long):number;
                getRankLevelParam():$.java.util.LinkedHashMap;
                /**
                 * ����id��ȡRank����value
                 *
                 * @param id
                 * @return
                 */
                getRankLevelValueById(id:long):number;
                getSalaryStandardEntryData():SalaryStandardEntryData;
                setDisplayGradeStyle(displayGradeStyle:number):void;
                setDisplayOnlySalaryCount(displayOnlySalaryCount:number):void;
                setDisplaySalaryGradeSort(displaySalaryGradeSort:number):void;
                setDisplaySalaryRankSort(displaySalaryRankSort:number):void;
                setItemLevelParam(itemLevelParam:$.java.util.LinkedHashMap):void;
                /**
                 * ����id����Item����value
                 *
                 * @param id
                 * @return
                 */
                setItemLevelValueById(id:long,value:number):void;
                setRankLevelParam(rankLevelParam:$.java.util.LinkedHashMap):void;
                /**
                 * ����id����Rank����value
                 *
                 * @param id
                 * @return
                 */
                setRankLevelValueById(id:long,value:number):void;
                setSalaryStandardEntryData(salaryStandardEntryData:SalaryStandardEntryData):void;
            }
            type DisplayParamNew_T = $.java.io.Serializable & DisplayParamNew_S & DisplayParamNew$;
            interface DisplayParamNew extends DisplayParamNew_T {
            }
            interface SimpleStdRangeMatchParam_S {
            }
            type SimpleStdRangeMatchParam_ST = $.java.io.Serializable & SimpleStdRangeMatchParam_S;
            interface SimpleStdRangeMatchParam_C extends SimpleStdRangeMatchParam_ST {
                new():SimpleStdRangeMatchParam;
            }
            interface SimpleStdRangeMatchParam$ {
                getBsed():Date;
                getPropInfo():$.java.util.Map;
                getStdTableId():long;
                getUnionId():string;
                setBsed(bsed:Date):void;
                setPropInfo(propInfo:$.java.util.Map):void;
                setStdTableId(stdTableId:long):void;
                setUnionId(unionId:string):void;
            }
            type SimpleStdRangeMatchParam_T = $.java.io.Serializable & SimpleStdRangeMatchParam_S & SimpleStdRangeMatchParam$;
            interface SimpleStdRangeMatchParam extends SimpleStdRangeMatchParam_T {
            }
            interface CurrencyEntity_S {
            }
            interface CurrencyEntity_C extends CurrencyEntity_S {
                new():CurrencyEntity;
                new(id:long,number_arg:string,name:string):CurrencyEntity;
                new(id:long,number_arg:string,name:string,sign:string):CurrencyEntity;
            }
            interface CurrencyEntity$ {
                getAmtPrecision():number;
                getId():long;
                getName():string;
                getNumber():string;
                getSign():string;
                setAmtPrecision(amtPrecision:number):void;
                setId(id:long):void;
                setName(name:string):void;
                setNumber(number_arg:string):void;
                setSign(sign:string):void;
            }
            type CurrencyEntity_T = CurrencyEntity_S & CurrencyEntity$;
            interface CurrencyEntity extends CurrencyEntity_T {
            }
            interface GradeRankSeqMapEntity_S {
            }
            type GradeRankSeqMapEntity_ST = $.java.io.Serializable & GradeRankSeqMapEntity_S;
            interface GradeRankSeqMapEntity_C extends GradeRankSeqMapEntity_ST {
                new():GradeRankSeqMapEntity;
            }
            interface GradeRankSeqMapEntity$ {
                getDbValue():string;
                getGradeSeqMap():$.java.util.Map;
                getRankSeqMap():$.java.util.Map;
                setDbValue(dbValue:string):void;
                setGradeSeqMap(gradeSeqMap:$.java.util.Map):void;
                setRankSeqMap(rankSeqMap:$.java.util.Map):void;
            }
            type GradeRankSeqMapEntity_T = $.java.io.Serializable & GradeRankSeqMapEntity_S & GradeRankSeqMapEntity$;
            interface GradeRankSeqMapEntity extends GradeRankSeqMapEntity_T {
            }
        }
        namespace kd.sdk.swc.hcdm.service.spi{
            interface AdjFileInfoService_S {
                get():AdjFileInfoService;
            }
            interface AdjFileInfoService$ {
                /**
                 * @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 * @param endOperate �Ƿ����ȫ������
                 * @param paramsList Map�������һ��Ҫ�����Ķ���н��������
                 * @return
                 */
                abandonAdjFile?(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ��������ѯ����н��¼�����Ϣ����
                 *
                 * @param selectProperties ��ѯ���ԣ����ڲ�ѯ����hcdm_salaryadjrecordquery
                 * @param qFilters        ��ѯ�������������ڲ�ѯ����hcdm_salaryadjrecordquery��������ز�ѯ����
                 * @param orderBys        �������������ڲ�ѯ����hcdm_salaryadjrecordquery��������������ֶ�
                 * @param start           ��ҳ��������ʼ����
                 * @param limit           ��ҳ������ÿҳ����������-1ʱ����ҳ
                 * @return DynamicObjectCollection
                 */
                getDecAdjInfos?(selectProperties:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ���ɻ���¶���н��������������н��Ϣ��
                 *
                 * @param paramsList ����н������Ϣ����
                 * @return {data:[{������Ϣ}],"success"��true/false��"message":��Ϣ��ʾ}
                 */
                saveAdjFile?(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ����н��¼ԭ�ӻ��ӿڣ��������Ŀ���а汾�����汾�жϲ����������ڴ����ݳ����µķ�������
                 *
                 *  @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 *  @param endOperate �Ƿ����ȫ�����䣬�ǣ������¼���������н���ݽ���������н��������ͬ�����Σ�δ������н
                 *  @param paramsList Map���������Ŀά�����
                 *  @return
                 */
                saveBatchDecAdjRecord?(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * ����н��¼ԭ�ӻ��ӿڣ��������Ŀ���а汾�����汾�жϲ���
                 *
                 * @param paramsList ��Ŀ���ݼ�
                 * @return
                 */
                saveDecAdjRecord?(paramsList:$.java.util.List):$.java.util.Map;
                /**
                 * @param uuid       ��������˷������ã���ͬ���ε�����uuidά��һ�¡�
                 * @param endOperate �Ƿ����ȫ������
                 * @param paramsList Map�������һ��ҪʧЧ�Ķ���н��������
                 * @return
                 */
                unableAdjFile?(uuid:string,endOperate:boolean,paramsList:$.java.util.List):$.java.util.Map;
            }
            type AdjFileInfoService_T = AdjFileInfoService_S & AdjFileInfoService$;
            interface AdjFileInfoService extends AdjFileInfoService_T {
            }
            interface SalaryStdQueryService_S {
                get():SalaryStdQueryService;
            }
            interface SalaryStdQueryService$ {
                /**
                 * ���ݱ�׼��+��������ֵƥ��н��н����Χ����н����ϵ��н��ṹ��
                 *  @param params
                 *  @return
                 */
                batchMatchStdTableWithDepEmp?(params:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��׼���µĶ������Ժ�ֵ
                 * @param stdTableIdList ��׼��id����
                 * @return key:��׼��id,value: ��������ʵ��
                 */
                getContrastProp?(stdTableIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡ��׼���н����Ϣ�����ơ�id��˳��ţ�
                 * ��ȡ��׼���н����Ϣ�����ر�׼����н�ȵ�id�����ơ�н�����ݱ�ʶ��˳�����Ϣ����˳��ŵ���
                 * @param stdTableIds ��׼��id
                 * @return н����Ϣ�б� key��stdTableId��value��н����Ϣ������id�����ơ�gradeIdentity����ţ�
                 */
                getGradeInfo?(stdTableIds:$.java.util.Collection):$.java.util.Map;
                /**
                 * ��ȡ��׼���н����Ϣ�����ơ�id��˳��ţ�
                 * ��ȡ��׼���н����Ϣ�����ر�׼����н����id�����ơ�н�����ݱ�ʶ��˳�����Ϣ����˳��ŵ���
                 * @param stdTableIds ��׼��id
                 * @return н����Ϣ�б� key��stdTableId��value��н����Ϣ������id�����ơ�rankIdentity����ţ�
                 */
                getRankInfo?(stdTableIds:$.java.util.Collection):$.java.util.Map;
                /**
                 * ���ݱ�׼��+����н��Ŀ��ȡ�Ƿ�����н��
                 * ��ȡ��׼����ÿ����Ŀ�Ƿ�������н��,��н����У���Բ�����Ŀ����н�������ֲ�����н�����������������Ŀ��������н���ġ�
                 * ҵ���ϻ���ݴ����ÿ���ǰ�˽����Ƿ�չʾн�����ýӿڷ���ÿ����Ŀ�Ƿ�����н���ı�ʶ
                 * @param stdItemMap key:��׼��id��value������н��Ŀid����
                 * @return ���ñ�ʶ�� key����׼��id��subKey������н��Ŀid��subValue���Ƿ����ã�False����δ���ã�
                 */
                getSalaryItemUseRankFlag?(stdItemMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ����н��н����ΧID��ȡн��н����Χ����
                 * ��ȡ��׼���н��н����Χ�ĸ�ʽ�����ƣ��� 1A~2B �������ı�����,�ڱ�׼ƥ��ӿ����õ���н��н����Χ�������Ҫ���и�ʽ����ʾ���ƣ���Ҫ���øýӿ�
                 * @param params
                 * @return key��unionId��value��н��н����Χ���ƣ�����1A~2B��
                 */
                getStdRangeNameByRangeId?(params:$.java.util.List):$.java.util.Map;
                /**
                 * ���ݱ�׼��+н�Ȳ��н����
                 * ��ȡ��׼��ĵڶ��������ָ����Ŀ�еı�����ݣ�����ҵ�������в�ѯ�����ѯн��н��λ�õĳ��������ǵ�����ڴ����������⣬���õ�offset���ư��践����Ҫ�ı������
                 * @param tableDataQueryParams ������ѯ����
                 * @return ��׼�����õı������ key��unionId��subKey��н��id��subValue����ǰн�������е������ݣ���н��˳��ӵ͵��ߣ�δ����н��ʱֻ��һ�����ݣ����ĳ����û�������ݣ���size��С��н������
                 */
                getStdTableData?(tableDataQueryParams:$.java.util.List):$.java.util.Map;
                /**
                 * ���ݱ�׼��+��������ֵƥ��н��н����Χ����н����ϵ��н��ṹ��
                 * ���ڱ�׼��������Ķ��չ�ϵ���ã��ô���Ķ�������ֵ����ƥ�䣬��ƥ���е�н��н����Χ�ϲ��󷵻�
                 * @param matchParams ����ƥ�����
                 * @return ƥ���� key��unionId ��value��ƥ����
                 */
                matchRangeWithStdTableId?(matchParams:$.java.util.List):$.java.util.Map;
                /**
                 * ���ݱ�׼��Ͷ������Լ����ƥ��н��н����Χ
                 * @param params
                 * @return key:uniqueCode,value:��׼��ƥ��н��н�����ʵ��
                 */
                matchTableRange?(params:$.java.util.List):$.java.util.Map;
                /**
                 * ͨ��н����߽���ѯ���ڱ�׼���н��н��λ��
                 * @param params
                 * @return
                 */
                matchTableRangeBySalaryCountOrAmount?(params:$.java.util.List):$.java.util.List;
                /**
                 * ����н��+н����ѯ��Ӧ�ڱ�׼���еĽ�н����
                 * @param params
                 * @return
                 */
                queryAmountAndSalaryCount?(params:$.java.util.List):$.java.util.List;
            }
            type SalaryStdQueryService_T = SalaryStdQueryService_S & SalaryStdQueryService$;
            interface SalaryStdQueryService extends SalaryStdQueryService_T {
            }
        }
        namespace kd.sdk.swc.hpdi{
            interface SdkHpdiModule_S {
            }
            type SdkHpdiModule_ST = $.kd.sdk.module.Module & SdkHpdiModule_S;
            interface SdkHpdiModule_C extends SdkHpdiModule_ST {
                new():SdkHpdiModule;
            }
            interface SdkHpdiModule$ {
            }
            type SdkHpdiModule_T = $.kd.sdk.module.Module & SdkHpdiModule_S & SdkHpdiModule$;
            interface SdkHpdiModule extends SdkHpdiModule_T {
            }
        }
        namespace kd.sdk.swc.hpdi.business.extpoint.bizdatabill{
            interface IBizDataBillEntryExtService_S {
            }
            interface IBizDataBillEntryExtService$ {
                /**
                 *  �ڷ�¼�����������֮�󣬿��ڴ������Զ�����չ��¼��
                 *
                 *  <pre><code>
                 *
                 *  public class BizDataBillEntryDemoExtService implements IBizDataBillEntryExtService {
                 *
                 *      //container����-�ֶα�ʶ
                 *      private static final String  PARAM_KEY = "key";
                 *
                 *      //container����-�ֶ���
                 *      private static final String  PARAM_NAME = "name";
                 *
                 *      //container����-�Ƿ�����
                 *      private static final String  PARAM_LOCK = "lock";
                 *
                 *      //container����-���
                 *      private static final String  PARAM_WIDTH = "width";
                 *
                 *      //container����-���뷽ʽ
                 *      private static final String  PARAM_TEXTALIGN = "textAlign";
                 *
                 *      //container����-�Ƿ����
                 *      private static final String  PARAM_MUSTINPUT = "mustInput";
                 *
                 *      //container����-��������չʾ����
                 *      private static final String  PARAM_VIEWDETAIL = "viewDetail";
                 *
                 *      //container����-С��λ����
                 *      private static final String  PARAM_SCALELIMIT = "scaleLimit";
                 *
                 *      //container����-��С����
                 *      private static final String  PARAM_MINDATE = "minDate";
                 *
                 *      //container����-�������
                 *      private static final String  PARAM_MAXDATE = "maxDate";
                 *
                 *      //container����-�������ϱ�ʶ
                 *      private static final String  PARAM_BASEENTITYID = "baseEntityId";
                 *
                 *      //container����-��������-��ʾ����
                 *      private static final String  PARAM_DISPLAYPROP = "displayProp";
                 *
                 *      //container����-�����б���
                 *      private static final String  PARAM_PAIRS = "pairs";
                 *
                 *      //container����-��������
                 *      private static final String  PARAM_DATATYPE = "datatype";
                 *
                 *      //ֵ���ͣ�����
                 *      private static final String  KEY_FIELDNUM = "1010_S";
                 *
                 *      //ֵ���ͣ����
                 *      private static final String  KEY_FIELDAMOUNT = "1020_S";
                 *
                 *      //ֵ���ͣ��ı�
                 *      private static final String  KEY_FIELDTEXT = "1030_S";
                 *
                 *      //ֵ���ͣ�����
                 *      private static final String  KEY_FIELDDATE = "1050_S";
                 *
                 *      //���ͣ���������
                 *      private static final String  KEY_FIELDBASEDATA = "BASEDATA";
                 *
                 *      //���ͣ������б�
                 *      private static final String  KEY_FIELDCOMBO = "COMBO";
                 *
                 *      public void afterAddFieldContainer(AfterAddFieldContainerEvent args) {
                 *
                 *          //"ywjextdemo1"
                 *          String oneColKey = "ywjextdemo1";
                 *          //"ywjextdemo2"
                 *          String twoColKey = "ywjextdemo2";
                 *
                 *         //�����Ǹ���ģ�����ƶ�̬�����չ�е�ʵ�֡�
                 *          //  �����չ���ǹ̶��ģ���ֱ�Ӱ���������ü��ɣ��Ͳ�����ô���ж��ˡ���Ҫ������FieldParamMaps��SelectProps��FieldRelationMap
                 *
                 *          Map<String, Object> customParams = args.getCustomParams();
                 *          Long bizItemGroupId = (Long) customParams.get("bizItemGroupId");
                 *
                 *          SWCDataServiceHelper bigHelper = new SWCDataServiceHelper("hsbs_bizitemgroup");
                 *          // ҵ������ģ���������
                 *          DynamicObject bizItemGroup = bigHelper.queryOne(bizItemGroupId);
                 *
                 *          if(bizItemGroup == null){
                 *              //���Ϊ�գ�����2�����ã���ʱ��Ϊ�˲�ѯ���ݡ���������ʹ�ã�ʹ�õ���selectProps��fieldRelationMap
                 *              // �Ҵ�ʱ�漰�Ĳ�������һ�����ݣ����Խ����е��ֶζ�����
                 *
                 *              //���Ӳ�ѯ�ֶΣ�����ҵ�����ݷ�¼�������ϱ�����ֶοɲ�д����Ʒ���Զ����ء�
                 *              args.getSelectProps().add(oneColKey);
                 *              args.getSelectProps().add(twoColKey);
                 *
                 *              return;
                 *          }
                 *
                 *          String name = bizItemGroup.getString("name");
                 *
                 *          if(name.contains(oneColKey)){
                 *              Map<String , Object> itemMap = new HashMap<>();
                 *
                 *              itemMap.put(PARAM_KEY, oneColKey);//Сд
                 *              itemMap.put(PARAM_NAME, oneColKey + "-name"); //����
                 *              itemMap.put(PARAM_LOCK, "view,submit,audit");//������
                 *              itemMap.put(PARAM_MUSTINPUT, Boolean.TRUE);//�Ƿ����
                 *              itemMap.put(PARAM_SCALELIMIT, 2);//С��λ
                 *              itemMap.put(PARAM_WIDTH, "150"); //���
                 *              itemMap.put(PARAM_DATATYPE, KEY_FIELDTEXT); //��������-�ı�
                 *              itemMap.put(PARAM_MINDATE, SWCDateTimeUtils.format(new Date())); //��С���ں������������ʽ��Ϊ yyyy-MM-dd HH:mm:ss
                 *              itemMap.put(PARAM_MAXDATE, SWCDateTimeUtils.format(SWCDateTimeUtils.getDateWithoutTime(2023, 12, 31))); //��������
                 *
                 *              args.getFieldParamMaps().add(itemMap);
                 *
                 *              //���Ӳ�ѯ�ֶΣ�����ҵ�����ݷ�¼�������ϱ�����ֶοɲ�д����Ʒ���Զ����ء�
                 *              args.getSelectProps().add(oneColKey);
                 *
                 *              //����ӳ���ֶΣ����ó�һ�����ɣ�key:ҵ�������ᱨ�ķ�¼�ֶα�ʶ��value:��¼�������ϵ��ֶα�ʶ��key->from
                 *              args.getFieldRelationMap().put(oneColKey, oneColKey);
                 *          }
                 *
                 *          if(name.contains(twoColKey)){
                 *              Map<String , Object> itemMap2 = new HashMap<>();
                 *
                 *              itemMap2.put(PARAM_KEY, twoColKey);//Сд
                 *              itemMap2.put(PARAM_NAME, twoColKey + "-name"); //����
                 *              itemMap2.put(PARAM_LOCK, "view,submit,audit");//������
                 *              itemMap2.put(PARAM_MUSTINPUT, Boolean.FALSE);//�Ƿ����
                 *              itemMap2.put(PARAM_SCALELIMIT, 2);//С��λ
                 *              itemMap2.put(PARAM_WIDTH, "150"); //���
                 *              itemMap2.put(PARAM_DATATYPE, KEY_FIELDAMOUNT); //��������-���
                 *
                 *              args.getFieldParamMaps().add(itemMap2);
                 *
                 *              args.getSelectProps().add(twoColKey);
                 *
                 *              args.getFieldRelationMap().put(twoColKey, twoColKey);
                 *          }
                 *
                 *      }
                 *
                 *  }
                 *
                 * </code></pre>
                 *
                 *  @param args ҵ�����ݷ�¼����в���; ������Ϣ�����õ�����з��ء�
                 */
                afterAddFieldContainer?(args:kd.sdk.swc.hpdi.common.events.bizdatabill.AfterAddFieldContainerEvent):void;
                /**
                 * �����ᱨ-����¼����
                 */
                setAddEntryFieldValue?(args:kd.sdk.swc.hpdi.common.events.bizdatabill.BizDataAddEntryFieldArgs):void;
            }
            type IBizDataBillEntryExtService_T = IBizDataBillEntryExtService_S & IBizDataBillEntryExtService$;
            interface IBizDataBillEntryExtService extends IBizDataBillEntryExtService_T {
            }
        }
        namespace kd.sdk.swc.hpdi.business.extpoint.collarule{
            interface ICollaRuleExtService_S {
            }
            interface ICollaRuleExtService$ {
                /**
                 * Э�������Զ���������ʵ����չ�¼�,���ڴ��¼�������֧�������Զ�������ʵ�����
                 *
                 * ��չ����ʾ����
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param event Э�������Զ���������ʵ����չ�¼�,���ڴ��¼�������֧�������Զ�������ʵ�����
                 */
                afterGetCustomResult?(event:kd.sdk.swc.hpdi.common.events.collarule.AfterGetCustomResultEvent):void;
            }
            type ICollaRuleExtService_T = ICollaRuleExtService_S & ICollaRuleExtService$;
            interface ICollaRuleExtService extends ICollaRuleExtService_T {
            }
        }
        namespace kd.sdk.swc.hpdi.business.extpoint.msgreceive{
            interface ICollaReviseMsgExtService_S {
            }
            interface ICollaReviseMsgExtService$ {
                /**
                 *  н��ҵ���¼���־�½����ô�����չ�㣬��Ϊҵ���¼���־�������Ի��ƣ����Դ���չ��������չ������Ҫ�Լ���֤ʵ�ֵ��ݵ��ԣ���������쳣���ݡ�
                 *  ��չ����ʾ����
                 *  <pre><code>
                 * public class CollaMsgReceiveExtServiceImpl implements ICollaMsgReceiveExtServiceImpl {
                 *
                 *     public void afterReviseMsg(AfterReviseMsgEvent event) {
                 *         String entityNumber = event.getEntityNumber();
                 *         Map<String, Object> param = event.getParam();
                 *     }
                 * }
                 *  </code></pre>
                 *
                 *  @param event ��Ա��Ϣ�޶�������չ�¼�
                 */
                afterReviseMsg?(event:kd.sdk.swc.hpdi.common.events.msgreceive.AfterReviseMsgEvent):void;
            }
            type ICollaReviseMsgExtService_T = ICollaReviseMsgExtService_S & ICollaReviseMsgExtService$;
            interface ICollaReviseMsgExtService extends ICollaReviseMsgExtService_T {
            }
        }
        namespace kd.sdk.swc.hpdi.business.mservice.helper{
            interface BizDataServiceHelper_S {
                /**
                 * �޸�ҵ�����ݡ�������н��֯�ˡ�
                 *
                 * @param param �޸�������н��֯�˲�����ҵ������ʶ��ţ���ҵ��id��������н��֯��id
                 * @return ���������Ϣ����������֧�ֲ��ֳɹ���
                 */
                changeDepemp(param:$.java.util.Map):$.java.util.Map;
                /**
                 * ����ҵ������
                 *
                 * @param param ҵ�����ݸ�������Ϣ
                 * @return ���������Ϣ����������֧�ֲ��ֳɹ���
                 */
                saveBizData(param:$.java.util.Map):$.java.util.Map;
            }
            interface BizDataServiceHelper_C extends BizDataServiceHelper_S {
                new():BizDataServiceHelper;
            }
            interface BizDataServiceHelper$ {
            }
            type BizDataServiceHelper_T = BizDataServiceHelper_S & BizDataServiceHelper$;
            interface BizDataServiceHelper extends BizDataServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.hpdi.business.msgreceive{
            interface ICollaMsgReceiveExtService_S {
            }
            interface ICollaMsgReceiveExtService$ {
                /**
                 * ҵ���¼�������Ϣ���ݽ������ô����¼�������������¼��д�����������Ϣ����
                 *
                 * @param event ��Ϣ���ݽ��������¼�����
                 */
                afterParseMsgContent?(event:kd.sdk.swc.hpdi.common.events.msgreceive.AfterParseMsgContentEvent):void;
                /**
                 *  н��ҵ���¼���־�½����ô�����չ�㣬��Ϊҵ���¼���־�������Ի��ƣ����Դ���չ��������չ������Ҫ�Լ���֤ʵ�ֵ��ݵ��ԣ���������쳣���ݡ�
                 *  ��չ����ʾ����
                 *  <pre><code>
                 * public class CollaMsgReceiveExtServiceDemoTrueImpl implements ICollaMsgReceiveExtService {
                 *
                 *     public void afterSaveReceiveMsg(AfterSaveReceiveMsgEvent event) {
                 *         Long msgReceiveId = event.getMsgReceiveId();
                 *         DynamicObject msgReceiveObject = BusinessDataServiceHelper.loadSingle(msgReceiveId, "hpdi_msgreceive",
                 *             "id,name,number,msgcontent,taskcreatestatus,errormsg");
                 *         try {
                 *             // ������Ϣ���Զ�����չ�߼�
                 *             DynamicObject object = BusinessDataServiceHelper.newDynamicObject("kdtest_msgreceive_ext");
                 *             object.set("number", msgReceiveObject.getString("number"));
                 *             object.set("name", msgReceiveObject.getString("name"));
                 *             object.set("kdtest_msgreceive", msgReceiveObject);
                 *             object.set("enable", "1");
                 *             object.set("status", "C");
                 *             SaveServiceHelper.save(new DynamicObject[] {object});
                 *             // ����ҵ���¼���־״̬ΪЭ���ɹ�
                 *             msgReceiveObject.set("taskcreatestatus", "B");
                 *         } catch (Exception ex) {
                 *             // ������ʧ�ܲ��д������Ϣ
                 *             msgReceiveObject.set("taskcreatestatus", "C");
                 *             msgReceiveObject.set("errormsg", ex.getMessage());
                 *         }
                 *         // ����ҵ���¼���־״̬
                 *         SaveServiceHelper.save(new DynamicObject[] {msgReceiveObject});
                 *         // ���÷���ֵ
                 *         event.setResult(true);
                 *     }
                 * }
                 *  </code></pre>
                 *
                 *  @param event ҵ���¼���־������չ�¼���result Ϊ��չ����¼����������Ƿ����ִ�б�Ʒ�߼���true-����ִ�б�Ʒ�߼���false-������ִ�б�Ʒ�߼���
                 */
                afterSaveReceiveMsg?(event:kd.sdk.swc.hpdi.common.events.msgreceive.AfterSaveReceiveMsgEvent):void;
            }
            type ICollaMsgReceiveExtService_T = ICollaMsgReceiveExtService_S & ICollaMsgReceiveExtService$;
            interface ICollaMsgReceiveExtService extends ICollaMsgReceiveExtService_T {
            }
        }
        namespace kd.sdk.swc.hpdi.common.events.bizdata{
            interface BizDataTransSalaryArgs_S {
            }
            interface BizDataTransSalaryArgs_C extends BizDataTransSalaryArgs_S {
                new():BizDataTransSalaryArgs;
            }
            interface BizDataTransSalaryArgs$ {
                getBizDataList():$.java.util.List;
                getErrorMap():$.java.util.Map;
                getReturnBizDataList():$.java.util.List;
                setBizDataList(bizDataList:$.java.util.List):void;
                setErrorMap(errorMap:$.java.util.Map):void;
                setReturnBizDataList(returnBizDataList:$.java.util.List):void;
            }
            type BizDataTransSalaryArgs_T = BizDataTransSalaryArgs_S & BizDataTransSalaryArgs$;
            interface BizDataTransSalaryArgs extends BizDataTransSalaryArgs_T {
            }
            interface BizDataMatchSalaryFileArgs_S {
            }
            interface BizDataMatchSalaryFileArgs_C extends BizDataMatchSalaryFileArgs_S {
                new():BizDataMatchSalaryFileArgs;
            }
            interface BizDataMatchSalaryFileArgs$ {
                getBizDataList():$.java.util.List;
                getErrorMap():$.java.util.Map;
                setBizDataList(bizDataList:$.java.util.List):void;
                setErrorMap(errorMap:$.java.util.Map):void;
            }
            type BizDataMatchSalaryFileArgs_T = BizDataMatchSalaryFileArgs_S & BizDataMatchSalaryFileArgs$;
            interface BizDataMatchSalaryFileArgs extends BizDataMatchSalaryFileArgs_T {
            }
            interface BizDataBillEntryImportArgs_S {
            }
            interface BizDataBillEntryImportArgs_C extends BizDataBillEntryImportArgs_S {
                new():BizDataBillEntryImportArgs;
            }
            interface BizDataBillEntryImportArgs$ {
                getBizDataBill():$.kd.bos.dataentity.entity.DynamicObject;
                getColKeyIndexMap():$.java.util.Map;
                getDataRow():$.java.util.List;
                getEmpCol():$.kd.bos.dataentity.entity.DynamicObjectCollection;
                getEmpFilter():$.kd.bos.orm.query.QFilter;
                getErrorMap():$.java.util.Map;
                setBizDataBill(bizDataBill:$.kd.bos.dataentity.entity.DynamicObject):void;
                setColKeyIndexMap(colKeyIndexMap:$.java.util.Map):void;
                setDataRow(dataRow:$.java.util.List):void;
                setEmpCol(empCol:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                setEmpFilter(empFilter:$.kd.bos.orm.query.QFilter):void;
                setErrorMap(errorMap:$.java.util.Map):void;
            }
            type BizDataBillEntryImportArgs_T = BizDataBillEntryImportArgs_S & BizDataBillEntryImportArgs$;
            interface BizDataBillEntryImportArgs extends BizDataBillEntryImportArgs_T {
            }
            interface BizDataHyperLinkClickArgs_S {
            }
            interface BizDataHyperLinkClickArgs_C extends BizDataHyperLinkClickArgs_S {
                new():BizDataHyperLinkClickArgs;
            }
            interface BizDataHyperLinkClickArgs$ {
                getArgs():$.kd.bos.form.events.HyperLinkClickArgs;
                getView():$.kd.bos.form.IFormView;
                setArgs(args:$.kd.bos.form.events.HyperLinkClickArgs):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type BizDataHyperLinkClickArgs_T = BizDataHyperLinkClickArgs_S & BizDataHyperLinkClickArgs$;
            interface BizDataHyperLinkClickArgs extends BizDataHyperLinkClickArgs_T {
            }
        }
        namespace kd.sdk.swc.hpdi.common.events.bizdatabill{
            interface BizDataAddEntryFieldArgs_S {
            }
            interface BizDataAddEntryFieldArgs_C extends BizDataAddEntryFieldArgs_S {
                new():BizDataAddEntryFieldArgs;
            }
            interface BizDataAddEntryFieldArgs$ {
                getBizDataBill():$.kd.bos.dataentity.entity.DynamicObject;
                getDataList():$.java.util.List;
                getDepempMappingList():$.java.util.List;
                setBizDataBill(bizDataBill:$.kd.bos.dataentity.entity.DynamicObject):void;
                setDataList(dataList:$.java.util.List):void;
                setDepempMappingList(depempMappingList:$.java.util.List):void;
            }
            type BizDataAddEntryFieldArgs_T = BizDataAddEntryFieldArgs_S & BizDataAddEntryFieldArgs$;
            interface BizDataAddEntryFieldArgs extends BizDataAddEntryFieldArgs_T {
            }
            interface AfterAddFieldContainerEvent_S {
            }
            interface AfterAddFieldContainerEvent_C extends AfterAddFieldContainerEvent_S {
                new():AfterAddFieldContainerEvent;
            }
            interface AfterAddFieldContainerEvent$ {
                getCustomParams():$.java.util.Map;
                getFieldAnnotation():$.java.util.Map;
                getFieldParamMaps():$.java.util.List;
                getFieldRelationMap():$.java.util.Map;
                getHideFields():$.java.util.List;
                getSelectProps():$.java.util.List;
                getStdFieldParamMaps():$.java.util.List;
                getTemplateWarningInfo():string;
                setCustomParams(customParams:$.java.util.Map):void;
                setFieldAnnotation(fieldAnnotation:$.java.util.Map):void;
                setFieldParamMaps(fieldParamMaps:$.java.util.List):void;
                setFieldRelationMap(fieldRelationMap:$.java.util.Map):void;
                setHideFields(hideFields:$.java.util.List):void;
                setSelectProps(selectProps:$.java.util.List):void;
                setStdFieldParamMaps(stdFieldParamMaps:$.java.util.List):void;
                setTemplateWarningInfo(templateWarningInfo:string):void;
            }
            type AfterAddFieldContainerEvent_T = AfterAddFieldContainerEvent_S & AfterAddFieldContainerEvent$;
            interface AfterAddFieldContainerEvent extends AfterAddFieldContainerEvent_T {
            }
        }
        namespace kd.sdk.swc.hpdi.common.events.collarule{
            interface AfterGetCustomResultEvent_S {
            }
            interface AfterGetCustomResultEvent_C extends AfterGetCustomResultEvent_S {
                new():AfterGetCustomResultEvent;
            }
            interface AfterGetCustomResultEvent$ {
                getEntitySet():$.java.util.Set;
                setEntitySet(entitySet:$.java.util.Set):void;
            }
            type AfterGetCustomResultEvent_T = AfterGetCustomResultEvent_S & AfterGetCustomResultEvent$;
            interface AfterGetCustomResultEvent extends AfterGetCustomResultEvent_T {
            }
        }
        namespace kd.sdk.swc.hpdi.common.events.msgreceive{
            interface AfterParseMsgContentEvent_S {
            }
            interface AfterParseMsgContentEvent_C extends AfterParseMsgContentEvent_S {
                new():AfterParseMsgContentEvent;
            }
            interface AfterParseMsgContentEvent$ {
                /**
                 * ��ȡ�¼��е�ҵ���¼���־�����������
                 *
                 * @return ҵ���¼���־�����������
                 */
                getMsgContentList():$.java.util.List;
                /**
                 * ��ȡ��չ�㴦����
                 *
                 * @return ��չ��Ĵ�����
                 */
                getResult():$.java.util.List;
                /**
                 * ����ҵ���¼���־�����������
                 *
                 * @param msgContentList ҵ���¼���־�����������
                 */
                setMsgContentList(msgContentList:$.java.util.List):void;
                /**
                 * ������չ��Ĵ�����
                 *
                 * @param result ���ش�����
                 */
                setResult(result:$.java.util.List):void;
            }
            type AfterParseMsgContentEvent_T = AfterParseMsgContentEvent_S & AfterParseMsgContentEvent$;
            interface AfterParseMsgContentEvent extends AfterParseMsgContentEvent_T {
            }
            interface AfterSaveReceiveMsgEvent_S {
            }
            interface AfterSaveReceiveMsgEvent_C extends AfterSaveReceiveMsgEvent_S {
                new():AfterSaveReceiveMsgEvent;
            }
            interface AfterSaveReceiveMsgEvent$ {
                /**
                 * ��ȡ ҵ���¼���־ID
                 *
                 * @return ҵ���¼���־ID
                 */
                getMsgReceiveId():long;
                /**
                 * ��ȡ�������
                 *
                 * @return �������
                 */
                getResult():boolean;
                /**
                 * ����ҵ���¼���־ID
                 *
                 * @param msgReceiveId ҵ���¼���־ID
                 */
                setMsgReceiveId(msgReceiveId:long):void;
                /**
                 * ���ý������
                 *
                 * @param result �������
                 */
                setResult(result:boolean):void;
            }
            type AfterSaveReceiveMsgEvent_T = AfterSaveReceiveMsgEvent_S & AfterSaveReceiveMsgEvent$;
            interface AfterSaveReceiveMsgEvent extends AfterSaveReceiveMsgEvent_T {
            }
            interface AfterReviseMsgEvent_S {
            }
            interface AfterReviseMsgEvent_C extends AfterReviseMsgEvent_S {
                new():AfterReviseMsgEvent;
            }
            interface AfterReviseMsgEvent$ {
                getEntityNumber():string;
                getParam():$.java.util.Map;
                setEntityNumber(entityNumber:string):void;
                setParam(param:$.java.util.Map):void;
            }
            type AfterReviseMsgEvent_T = AfterReviseMsgEvent_S & AfterReviseMsgEvent$;
            interface AfterReviseMsgEvent extends AfterReviseMsgEvent_T {
            }
        }
        namespace kd.sdk.swc.hpdi.formplugin.extpoint.bizdata{
            interface IBizDataBillEntryImportExtPlugin_S {
            }
            interface IBizDataBillEntryImportExtPlugin$ {
                /**
                 * ��ȡ��ְ����ǰ��ӹ�������
                 *
                 * @param args ҵ�������ᱨ��¼���������empFilter��
                 */
                addFilterBeforeGetEmp?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataBillEntryImportArgs):void;
                /**
                 * ��ȡexcel���ݺ���
                 *
                 * @param args ҵ�������ᱨ��¼�������
                 */
                afterReadData?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataBillEntryImportArgs):void;
                /**
                 * ������������ģ����ֶ�Ĭ��ֵ
                 *
                 * @param args ҵ�������ᱨ��¼���������empCol��
                 */
                setFieldDefaultValue?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataBillEntryImportArgs):void;
            }
            type IBizDataBillEntryImportExtPlugin_T = IBizDataBillEntryImportExtPlugin_S & IBizDataBillEntryImportExtPlugin$;
            interface IBizDataBillEntryImportExtPlugin extends IBizDataBillEntryImportExtPlugin_T {
            }
            interface IBizDataTransSalaryExtPlugin_S {
            }
            interface IBizDataTransSalaryExtPlugin$ {
                /**
                 * ҵ������������нǰ�����ڴ˸��¡�������н��֯�ˡ������������Զ���У�����ء�
                 *
                 * <pre><code>
                 *
                 * public class BizDataTransSalaryExtDemoPlugin implements IBizDataTransSalaryExtPlugin {
                 *
                 *     //�ɹ���ture��ʧ�ܣ�false
                 *     private static final String KEY_SUCCESS = "success";
                 *
                 *     //������Ϣ
                 *     private static final String KEY_MESSAGE = "message";
                 *
                 *     //���κ�
                 *     private static final String KEY_BATCHNUM = "batchnum";
                 *
                 *     //����
                 *     private static final String KEY_DATA = "data";
                 *
                 *     //ҵ������ʶ���
                 *     private static final String KEY_BIZDATACODE = "bizdatacode";
                 *
                 *     //��ҵ��
                 *     private static final String KEY_EMPLOYEEID = "employeeid";
                 *
                 *     //��֯��
                 *     private static final String KEY_DEPEMPID = "depempid";
                 *
                 *     //ҵ������������нǰ���¡�������н��֯�ˡ�
                 *     public void beforeAddTransSalary(BizDataTransSalaryArgs args) {
                 *         List<DynamicObject> bizDatas = args.getBizDataList();
                 *         if (CollectionUtils.isEmpty(bizDatas)) {
                 *             return;
                 *         }
                 *
                 *         Map<String, Object> param = assembleParam(bizDatas);
                 *         List<Map<String, Object>> paramData = (List<Map<String, Object>>) param.get(KEY_DATA);
                 *         if (CollectionUtils.isEmpty(paramData)) {
                 *             return;
                 *         }
                 *         // ���ø����㷢н������֯�˽ӿ�
                 *         Map<String, Object> result = BizDataServiceHelper.changeDepemp(param);
                 *
                 *         //�ӿڵ���ʧ��
                 *         if (!MapUtils.getBoolean(result, KEY_SUCCESS)) {
                 *             Map<Long, String> errorMap = new HashMap<>(bizDatas.size());
                 *             for (DynamicObject bizData : bizDatas) {
                 *                 errorMap.put(bizData.getLong(SWCBaseConstants.ID), MapUtils.getString(result, KEY_MESSAGE));
                 *             }
                 *             // errorMap��������ҵ������Ϊ��������нʧ�ܡ�״̬����Ŀ�ϰ�ʵ����������Ƿ���Ҫ����
                 *             args.setErrorMap(errorMap);
                 *             // returnBizDataList��������ִ��ת��н
                 *             // �����ʾУ��ʧ��ʱ�������ִ��ת��н����
                 *             args.setReturnBizDataList(null);
                 *             return;
                 *         }
                 *
                 *         // ����ҵ������
                 *         List<Map<String, Object>> returnData = (List<Map<String, Object>>) ((Map<String, Object>) result.get(KEY_DATA)).get(KEY_DATA);
                 *         // ���¡�������н��֯�ˡ�ʧ�ܵ�ҵ������map
                 *         // key��bizdatacode  value��ʧ����Ϣ
                 *         Map<String, String> failMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         // ���¡�������н��֯�ˡ�ʧ�ܵ�ҵ������ʶ��ż���
                 *         Set<String> changeFailBizDataCodes = new HashSet<>(SWCBaseConstants.INITCAPACITY_HSAHSET);
                 *         for (Map<String, Object> rMap : returnData) {
                 *             if (!((Boolean) rMap.getOrDefault(KEY_SUCCESS, Boolean.TRUE))) {
                 *                 changeFailBizDataCodes.add(MapUtils.getString(rMap, KEY_BIZDATACODE));
                 *                 failMap.put(MapUtils.getString(rMap, KEY_BIZDATACODE), MapUtils.getString(rMap, KEY_MESSAGE));
                 *             }
                 *         }
                 *
                 *         //ȫ�����³ɹ�
                 *         if (CollectionUtils.isEmpty(changeFailBizDataCodes)) {
                 *             // �����޸�ҵ������Ϊ��������нʧ�ܡ�
                 *             args.setErrorMap(null);
                 *             // �������ݼ���ִ��������н
                 *             args.setReturnBizDataList(bizDatas);
                 *             return;
                 *         }
                 *
                 *         //���ָ��³ɹ�
                 *         // ����ҵ������
                 *         List<DynamicObject> returnBizDataList = new ArrayList<>(SWCBaseConstants.INITCAPACITY_ARRAYLIST);
                 *         // ������Ϣmap�� key��ҵ������id��value��������Ϣ
                 *         Map<Long, String> errorMap = new HashMap<>(bizDatas.size());
                 *         for (DynamicObject bizData : bizDatas) {
                 *             // ����ʧ�ܼ�¼������Ϣ
                 *             if (changeFailBizDataCodes.contains(bizData.getString(KEY_BIZDATACODE))) {
                 *                 errorMap.put(bizData.getLong(SWCBaseConstants.ID), failMap.get(bizData.getString(KEY_BIZDATACODE)));
                 *                 continue;
                 *             }
                 *
                 *             // ���³ɹ�
                 *             returnBizDataList.add(bizData);
                 *         }
                 *         args.setErrorMap(errorMap);
                 *         args.setReturnBizDataList(returnBizDataList);
                 *     }
                 *
                 *     //��װ����ҵ������������н��֯�˽ӿ����
                 *     private Map<String, Object> assembleParam(List<DynamicObject> bizDatas) {
                 *         Map<String, Object> param = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         param.put(KEY_BATCHNUM, "1111111111");  // ���κţ�Ψһ
                 *
                 *         String key = ResManager.loadKDString("�ط�", "", "");
                 *         List<Map<String, Object>> data = new ArrayList<>(bizDatas.size());
                 *         for (DynamicObject bizData : bizDatas) {
                 *             String personName = bizData.getString("depemp.person.name");
                 *             // ������н��֯�����ְ������ط������������֯��Ϊ���ط�ʮ�š�
                 *             if (SWCStringUtils.isNotEmpty(personName) && !personName.contains(key)) {
                 *                 continue;
                 *             }
                 *             Map<String, Object> rec = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *             rec.put(KEY_BIZDATACODE, bizData.getString("bizdatacode"));
                 *             rec.put(KEY_EMPLOYEEID, bizData.getLong("depemp.employee.id"));
                 *             rec.put(KEY_DEPEMPID, 1399272555331728384L);  // ������н��֯��id���Զ���ȡֵ��Դ�������Ĭ��ֵ �ط�ʮ�ţ�1399272555331728384
                 *             data.add(rec);
                 *         }
                 *         param.put(KEY_DATA, data);
                 *
                 *         return param;
                 *     }
                 * }
                 *
                 * </code></pre>
                 *
                 * @param args ҵ������������н����
                 */
                beforeAddTransSalary?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataTransSalaryArgs):void;
            }
            type IBizDataTransSalaryExtPlugin_T = IBizDataTransSalaryExtPlugin_S & IBizDataTransSalaryExtPlugin$;
            interface IBizDataTransSalaryExtPlugin extends IBizDataTransSalaryExtPlugin_T {
            }
            interface IBizDataMatchSalaryFileExtPlugin_S {
            }
            interface IBizDataMatchSalaryFileExtPlugin$ {
                /**
                 * ƥ�䲢����ҵ�����ݵ�н�ʵ���
                 *
                 * @param args ҵ������ƥ��н�ʵ�������
                 */
                matchAndSetSalaryFile?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataMatchSalaryFileArgs):void;
            }
            type IBizDataMatchSalaryFileExtPlugin_T = IBizDataMatchSalaryFileExtPlugin_S & IBizDataMatchSalaryFileExtPlugin$;
            interface IBizDataMatchSalaryFileExtPlugin extends IBizDataMatchSalaryFileExtPlugin_T {
            }
            interface IBizDataListExtPlugin_S {
            }
            interface IBizDataListExtPlugin$ {
                /**
                 *  �б�ĳ����ӣ�����д����ָ����ҳ����߲��򿪡�
                 *
                 *  ����ͨ���ӿ�����ҵ�����ݣ���ҵ�������б�չʾ��ʱ�򣬵��ݱ����һ�У���Ʒ�ṩ�˳����ӵ��ᱨ���ݣ�
                 *  �����ڽӿ��������޶�Ӧ�ĵ��ݣ���ʱ��Ҫ�����Լ��ƶ��򿪷�����
                 *
                 *  <pre><code>
                 *
                 *  public class BizDataListExtDemoPlugin implements IBizDataListExtPlugin {
                 *
                 *      public void billListHyperLinkClick(BizDataHyperLinkClickArgs args){
                 *
                 *          //�������ж�������д��չ���룬������ܵ���������Ԫ��ĳ�����Ҳ�����ǡ�
                 *          // ���ǵ��ݱ���ֶ�
                 *          if (SWCStringUtils.equals(BizDataConstants.KEY_APPLY_NO, args.getArgs().getHyperLinkClickEvent().getFieldName())) {
                 *
                 *              IListView listView = (IListView) args.getView();
                 *              Long id = (Long) listView.getFocusRowPkId();
                 *
                 *              DynamicObject bizData = HPDIDataServiceHelper.HPDI_BIZDATA_HELPER.queryOne("submission", id);
                 *              if (SWCObjectUtils.isEmpty(bizData)) {
                 *                  args.getView().showErrorNotification(ResManager.loadKDString("�������ݲ�����", "BizDataList_0", "swc-hpdi-formplugin"));
                 *                  return;
                 *              }
                 *
                 *              //�������ݼ��ɵ�����
                 *              if("1".equals(bizData.getString("submission"))){
                 *                  return;
                 *              }
                 *
                 *              //�����Զ����������ȡ����Ʒ�����ӣ��ٴ��Լ�������
                 *              args.getArgs().setCancel(true);
                 *
                 *              BaseShowParameter parameter = new BaseShowParameter();
                 *              parameter.setFormId(SWCEntityConstants.HPDI_BIZDATA);
                 *              parameter.setPkId(id);
                 *              parameter.getOpenStyle().setShowType(ShowType.Modal);
                 *              parameter.setStatus(OperationStatus.VIEW);
                 *              args.getView().showForm(parameter);
                 *          }
                 *
                 *      }
                 *  }
                 *
                 * </code></pre>
                 *
                 *  @param args ҵ�������б����Ӳ�����
                 *  @return �޳��Σ���Ϣ�����õ�����з��ء�
                 */
                billListHyperLinkClick?(args:kd.sdk.swc.hpdi.common.events.bizdata.BizDataHyperLinkClickArgs):void;
            }
            type IBizDataListExtPlugin_T = IBizDataListExtPlugin_S & IBizDataListExtPlugin$;
            interface IBizDataListExtPlugin extends IBizDataListExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas{
            interface SdkHsasModule_S {
            }
            type SdkHsasModule_ST = $.kd.sdk.module.Module & SdkHsasModule_S;
            interface SdkHsasModule_C extends SdkHsasModule_ST {
                new():SdkHsasModule;
            }
            interface SdkHsasModule$ {
            }
            type SdkHsasModule_T = $.kd.sdk.module.Module & SdkHsasModule_S & SdkHsasModule$;
            interface SdkHsasModule extends SdkHsasModule_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.approve{
            interface IApproveBillExtService_S {
            }
            interface IApproveBillExtService$ {
                /**
                 *  @param event BankOfferExportSplitEvent
                 *
                 * <pre><code>
                 * public class CreateApproveBillSetValueTest implements IApproveBillExtService {
                 *      @Override
                 *      public void afterSetApproveBillData(CreateApproveBillSetValueEvent event) {
                 *          // ����������������������id����
                 *          List<Long> calTaskIdList = event.getCalTaskIdList();
                 *          // ������ʵ��
                 *          DynamicObject approveBillDy = event.getApproveBillDy();
                 *          // ���Ը�ֵ
                 *          approveBillDy.set("billname",approveBillDy.getString("billname")+"_test");
                 *          approveBillDy.set("testvalue","test");
                 *      }
                 *  }
                 *  </code></pre>
                 */
                afterSetApproveBillData?(event:kd.sdk.swc.hsas.common.events.approve.CreateApproveBillSetValueEvent):void;
            }
            type IApproveBillExtService_T = IApproveBillExtService_S & IApproveBillExtService$;
            interface IApproveBillExtService extends IApproveBillExtService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.attinteg{
            interface IAttIntegrateExtPlugin_S {
            }
            interface IAttIntegrateExtPlugin$ {
                /**
                 * <h5>������ҵ�����ݺ�ִ�У�������չ��Ԥҵ�����ݵ����ɻ���</h5>
                 * �˴���Ե���������Ŀ�������� ��  ҵ������ ת������չʱ��Ҫע�ⲻҪִ�����ݿ����IO����
                 * <b>ʵ�ְ�����</b>
                 * <pre><code>
                 *  public void afterCreateBizData(AfterCreateBizDataEvent evt){
                 *             DynamicObject originalBizData = evt.getBizData();
                 *             Map<String, Object> itemData = evt.getItemData();
                 *             //����������Ч����
                 *             Date startDate = new Date( Long.parseLong((String)itemData.get("startdate")));
                 *             originalBizData.set("bsed",startDate);
                 *         }
                 * </code></pre>
                 * @param evt ������ҵ�����ݺ����¼�
                 */
                afterCreateBizData?(evt:kd.sdk.swc.hsas.common.events.attinteg.AfterCreateBizDataEvent):void;
            }
            type IAttIntegrateExtPlugin_T = IAttIntegrateExtPlugin_S & IAttIntegrateExtPlugin$;
            interface IAttIntegrateExtPlugin extends IAttIntegrateExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.bizdata{
            interface IBizDataSynExtService_S {
            }
            interface IBizDataSynExtService$ {
                /**
                 *  ǰ��ҵ������ͬ�����ݷ�������ҵ��������չ�޸ĳ���
                 *
                 *  <pre><code>
                 *  public class RecurBizDataPropDemoExtService implements IBizDataSynExtService {
                 *
                 *      public void afterBizDataList(AfterBizDataListEvent event){
                 *           List<DynamicObject> bizDataList = event.getBizDataList();
                 *           if(bizDataList == null || bizDataList.size() == 0) {
                 *               return;
                 *           }
                 *
                 *          // ��ȡѭ����ҵ�����ݵ�ҵ����Ŀid
                 *           List<Long> recurBizItemIdList = new ArrayList<Long>(bizDataList.size());
                 *           for (DynamicObject bizDataObj : bizDataList) {
                 *               String entityName = bizDataObj.getDynamicObjectType().getName();
                 *               if(SWCStringUtils.equals(entityName, SWCEntityConstants.HSAS_RECURBIZDATA)) {
                 *                   // ֻ����ѭ����ҵ������
                 *                   recurBizItemIdList.add(bizDataObj.getLong("bizitem"));
                 *               }
                 *          }
                 *
                 *          if(recurBizItemIdList.size() == 0) {
                 *              return;
                 *          }
                 *
                 *          // ͨ��ѭ����ҵ�����ݵ�ҵ����Ŀid����ѯҵ����Ŀ��ֵ������Ϣ
                 *          Map<Long, List<Map<String, Object>>> bizItemPropInfo = BizItemServiceHelper.getBizItemPropInfo(recurBizItemIdList);
                 *          if(bizItemPropInfo == null || bizItemPropInfo.size() == 0) {
                 *              return;
                 *          }
                 *
                 *          // ����ҵ�����ݣ���װҵ����Ŀ��ֵ��������
                 *          for (DynamicObject bizDataObj : bizDataList) {
                 *              String entityName = bizDataObj.getDynamicObjectType().getName();
                 *              if(!SWCStringUtils.equals(entityName, SWCEntityConstants.HSAS_RECURBIZDATA)) {
                 *                  // ֻ����ѭ����ҵ������
                 *                  continue;
                 *              }
                 *
                 *              Long bizItemId = bizDataObj.getLong("bizitem");
                 *              // ��ȡҵ����Ŀ�¶�ֵҵ����Ŀ������Ϣ
                 *              List<Map<String, Object>> bizItemPropList = bizItemPropInfo.get(bizItemId);
                 *              if(bizItemPropList == null || bizItemPropList.size() == 0) {
                 *                  continue;
                 *              }
                 *
                 *              // ���ѭ����ҵ�������д���ҵ����Ŀ����ֵ������Ҫд��ֵ���Ӿ���ҵ�����
                 *              DynamicObjectCollection propColl = bizDataObj.getDynamicObjectCollection("recurbizpropentry");
                 *              if(propColl != null && propColl.size() > 0) {
                 *                  continue;
                 *              }
                 *
                 *              // ���ɿյķ�¼
                 *              SWCDataServiceHelper helper = new SWCDataServiceHelper(entityName);
                 *              DynamicObjectCollection propValEntry = helper.generateEmptyEntryCollection(bizDataObj, "recurbizpropentry");
                 *              // ��װ����ֵ
                 *              StringBuilder propSb = new StringBuilder();
                 *              // ���ݻ�ȡ��������ֵ��д������ֵ����
                 *              int size = bizItemPropList.size();
                 *              for(int i = 0; i < size; i++) {
                 *                  Map<String, Object> bizItemPropMap = bizItemPropList.get(i);
                 *                  DynamicObject propValObj = new DynamicObject(propValEntry.getDynamicObjectType());
                 *                  Long bizItemPropId = (Long)bizItemPropMap.get("bizItemPropId");
                 *                  String propDataType = (String)bizItemPropMap.get("dataType");
                 *                  String propVal = "";
                 *                  if(SWCStringUtils.equals(propDataType, "text")) {
                 *                      // �ı�
                 *                      propValObj.set("bizitemprop", bizItemPropId);
                 *                      propVal = "text test";
                 *                      propValObj.set("propdatavalue", propVal);
                 *                  } else if(SWCStringUtils.equals(propDataType, "decimal")) {
                 *                      // ��ֵ
                 *                      propValObj.set("bizitemprop", bizItemPropId);
                 *                      propVal = "1.01";
                 *                      propValObj.set("propdatavalue", propVal);
                 *                  } else if(SWCStringUtils.equals(propDataType, "date")) {
                 *                      // ����
                 *                      propValObj.set("bizitemprop", bizItemPropId);
                 *                      propVal = "2023-05-31";
                 *                      propValObj.set("propdatavalue", propVal);
                 *                  }
                 *                  propValEntry.add(propValObj);
                 *
                 *                  propSb.append(bizItemPropMap.get("bizItemPropName")).append('��').append(propVal);
                 *                  if(i != (size - 1)) {
                 *                      propSb.append('��') ;
                 *                  }
                 *              }
                 *
                 *              if(propValEntry.size() > 0) {
                 *                  bizDataObj.set("recurbizpropentry", propValEntry);
                 *                  bizDataObj.set("propval", propSb.toString());
                 *              }
                 *          }
                 *      }
                 *  }
                 * </code></pre>
                 *
                 *  @param args ǰ��ҵ������ͬ�����ݷ�������ҵ��������չ�޸ĳ�����
                 */
                afterBizDataList?(event:kd.sdk.swc.hsas.common.events.bizdata.AfterBizDataListEvent):void;
            }
            type IBizDataSynExtService_T = IBizDataSynExtService_S & IBizDataSynExtService$;
            interface IBizDataSynExtService extends IBizDataSynExtService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.insurancedata{
            interface ISaveInsuranceDataSynExtService_S {
            }
            interface ISaveInsuranceDataSynExtService$ {
                beforeSaveInsuranceDataList?(event:kd.sdk.swc.hsas.common.events.insurancedata.BeforeSaveInsuranceDataListEvent):void;
            }
            type ISaveInsuranceDataSynExtService_T = ISaveInsuranceDataSynExtService_S & ISaveInsuranceDataSynExtService$;
            interface ISaveInsuranceDataSynExtService extends ISaveInsuranceDataSynExtService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.paydetail{
            interface IBankOfferExtService_S {
            }
            interface IBankOfferExtService$ {
                /**
                 *  @param event BankOfferExportSplitEvent
                 *
                 * <pre><code>
                 * public class BankOfferSplitTest implements IBankOfferExtService {
                 *      @Override
                 *      public void beforeBankOfferSplit(BankOfferExportSplitEvent event) {
                 *          // ��ȡ��ѡ�����б��̷�����ϸlist
                 *          List<Long> payDetailIds = event.getPayDetailIds();
                 *          QFilter filter = new QFilter("id", QFilter.in, payDetailIds);
                 *          // ��ѯ��Ӧ��ϸ��Ϣ
                 *          SWCDataServiceHelper helper = new SWCDataServiceHelper("hsas_paydetail");
                 *          DynamicObject[] payDetailArray = helper.query("id,paysubjecthis.number", filter.toArray());
                 *          // ��ȡ���µ����б���ģ��
                 *          helper = new SWCDataServiceHelper("hsas_bankoffertpl");
                 *          QFilter enableFilter = new QFilter(SWCBaseConstants.ENABLE, QFilter.equals, SWCBaseConstants.ENABLED);
                 *          QFilter auditFilter = new QFilter(SWCBaseConstants.STATUS, QFilter.equals, SWCBaseConstants.STATUS_AUDIT);
                 *          QFilter hisCurrFilter = new QFilter("iscurrentversion", QFilter.equals, Boolean.TRUE);
                 *          DynamicObject[] tplDataArray = helper.query("id", new QFilter[]{enableFilter, auditFilter, hisCurrFilter}, "createtime desc");
                 *          // ����֧������������
                 *          Map<String, List<Long>> payDetailSplitMap = new HashMap<>(payDetailArray.length);
                 *          for (DynamicObject payDetail : payDetailArray) {
                 *              String paySubjectNumber = payDetail.getString("paysubjecthis.number");
                 *              List<Long> splitIdList = payDetailSplitMap.getOrDefault(paySubjectNumber, new ArrayList<>(10));
                 *              splitIdList.add(payDetail.getLong("id"));
                 *              payDetailSplitMap.put(paySubjectNumber, splitIdList);
                 *          }
                 *          int index = 0;
                 *          List<BankOfferExportSplitResult> splitResultList = new ArrayList<>(payDetailSplitMap.size());
                 *          Map<Long, String> payDetailErrorMap = new HashMap<>(16);
                 *
                 *          for (Map.Entry<String, List<Long>> entry : payDetailSplitMap.entrySet()) {
                 *              List<Long> ids = entry.getValue();
                 *              //����2����ϸ��ȡ���һ����Ϊ�쳣��ϸ
                 *              if (ids.size() > 2) {
                 *                  Long id = ids.get(ids.size() - 1);
                 *                  ids.remove(ids.size() - 1);
                 *                  payDetailErrorMap.put(id, "this is last error id : " + id);
                 *              }
                 *              //�������б��̷�������
                 *              BankOfferExportSplitResult splitResult = new BankOfferExportSplitResult();
                 *              //���б���ģ��
                 *              splitResult.setBankOfferTplId(tplDataArray[index].getLong("id"));
                 *              splitResult.setSplitPayDetailIdList(ids);
                 *              splitResult.setBankOfferDesc("test desc");
                 *              //�������� ����ɲ���
                 *              splitResult.setBankCgSettingId(0L);
                 *              splitResultList.add(splitResult);
                 *
                 *              index = tplDataArray.length < ++index ? 0 : index;
                 *          }
                 *          // �����Ƿ�ɹ���ʶ
                 *          event.setSuccessSplit(Boolean.TRUE);
                 *          event.setExportSplitResultList(splitResultList);
                 *          event.setPayDetailErrorMap(payDetailErrorMap);
                 *
                 *      }
                 *  }
                 *  </code></pre>
                 */
                beforeBankOfferSplit?(event:kd.sdk.swc.hsas.common.events.paydetail.BankOfferExportSplitEvent):void;
            }
            type IBankOfferExtService_T = IBankOfferExtService_S & IBankOfferExtService$;
            interface IBankOfferExtService extends IBankOfferExtService_T {
            }
            interface IBankAccountService_S {
            }
            interface IBankAccountService$ {
                /**
                 *  @param event BankAccountModifyFilterEvent
                 *
                 * <pre><code>
                 * public class BankAccountModifyFilterTest implements IBankAccountService {
                 *      @Override
                 *      public void beforeBankAccountModifyFilter(BankAccountModifyFilterEvent event) {
                 *          // ��Ӹ���״̬Ϊ����ʧ�����ݵĹ�������
                 *          QFilter payStateFilter = new QFilter("paystate", QFilter.in, Arrays.asList("1","4"));
                 *          // ��ӵ������¼���
                 *          event.addFieldFilter(payStateFilter);
                 *          // ������б���״̬Ϊ����λ���ݵĹ�������
                 *          QFilter bankOfferFilter = new QFilter("bankofferstatus", QFilter.in, Arrays.asList("1","4","5"));
                 *          // ��ӵ������¼���
                 *          event.addFieldFilter(bankOfferFilter);
                 *          // ��Ӵ�����״̬Ϊ����λ���ݵĹ�������
                 *          QFilter agencyPayFilter = new QFilter("agencypaystate", QFilter.in, Arrays.asList("0","2"));
                 *          // ��ӵ������¼���
                 *          event.addFieldFilter(agencyPayFilter);
                 *          // ���ͣ����״̬Ϊ����λ���ݵĹ�������
                 *          QFilter onHoldFilter = new QFilter("onholdstatus", QFilter.in, Arrays.asList(" ","1","5"));
                 *          // ��ӵ������¼���
                 *          event.addFieldFilter(onHoldFilter);
                 *      }
                 *  }
                 *  </code></pre>
                 */
                beforeBankAccountModifyFilter?(event:kd.sdk.swc.hsas.common.events.paydetail.BankAccountModifyFilterEvent):void;
            }
            type IBankAccountService_T = IBankAccountService_S & IBankAccountService$;
            interface IBankAccountService extends IBankAccountService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.person{
            interface IPersonExtService_S {
            }
            interface IPersonExtService$ {
                /**
                 * ��н��Ա�޸Ĺ��ŷ���
                 *
                 * <pre><code>
                 *
                 * public class PersonExtService implements IPersonExtService {
                 *
                 *     public void modifyPersonNumber(Map<String, Object> param) {
                 *         List<Map<String, Object>> datas = (List<Map<String, Object>>) param.get("data");
                 *         //�ɹ��ż���-����
                 *         Set<String> oriNumbers = new HashSet<>(SWCBaseConstants.INITCAPACITY_HSAHSET);
                 *         //KEY:�ɹ���,VALUE=�¹���
                 *         Map<String, String> numberMap = new HashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *
                 *         for (Map<String, Object> data : datas) {
                 *             String oriNumber = String.valueOf(data.get("oriNumber"));
                 *             String newNumber = String.valueOf(data.get("newNumber"));
                 *
                 *             oriNumbers.add(oriNumber);
                 *
                 *             numberMap.put(oriNumber, newNumber);
                 *         }
                 *
                 *         //�����޸ļ����˲ŵĹ���
                 *         dealModifyPersonNumberForEntityRel(param, oriNumbers, numberMap, "kdtest_hrpi_jinengrencai", "number", "number");
                 *
                 *         //�޷���ֵ������ʧ��ֱ�����쳣
                 *         if(param.containsKey("testerror")){
                 *             throw new RuntimeException("This deal fail!!!");
                 *         }
                 *
                 *     }
                 *
                 *     private DynamicObject[] dealModifyPersonNumberForEntityRel(Map<String, Object> param, Set<String> oriNumbers, Map<String, String> numberMap, String entityNumber, String propertyName, String relPropertyName) {
                 *         QFilter qFilter = new QFilter(relPropertyName, QFilter.in, oriNumbers);
                 *
                 *         SWCDataServiceHelper empHelper = new SWCDataServiceHelper(entityNumber);
                 *         DynamicObject[] dataDys = empHelper.query(SWCHisBaseDataHelper.getSelectProperties(entityNumber), new QFilter[]{qFilter});
                 *         for (DynamicObject empDy : dataDys) {
                 *             //�����µ��ֶ�ֵ
                 *             String propertyVal = empDy.getString(propertyName);
                 *             //ԭ����
                 *             String oriNumber = empDy.getString(relPropertyName);
                 *             //�¹���
                 *             String newNumber = numberMap.get(oriNumber);
                 *             //�ɹ����ַ����滻Ϊ���ַ���, �˴���Ϊԭ�����Ǿ�ȷ��
                 *             empDy.set(propertyName, propertyVal.replace(oriNumber, newNumber));
                 *         }
                 *         empHelper.update(dataDys);
                 *
                 *         Map<String, Object> resultMap = (Map<String, Object>) param.get("dealInfo");
                 *         resultMap.put(entityNumber + "#" + propertyName, dataDys.length);
                 *         return dataDys;
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param param ���޸ĵĹ�����Ϣ��{"data": [{"oriNumber":"1234567-R", "newNumber":"1234567"}]}
                 * @return �޷���ֵ������ʧ��ֱ�����쳣
                 */
                modifyPersonNumber?(param:$.java.util.Map):void;
            }
            type IPersonExtService_T = IPersonExtService_S & IPersonExtService$;
            interface IPersonExtService extends IPersonExtService_T {
            }
            interface ISyncPersonExtService_S {
            }
            interface ISyncPersonExtService$ {
                /**
                 * ��н��Աͬ���������ݺ�δ���ǰ����������destDyList�����������������ܶ����������Զ����ֶΣ������ֶβ��ǴӺ�������ͬ������
                 *
                 * <pre><code>
                 *
                 * public class SyncPersonExtDemoService implements ISyncPersonExtService {
                 *
                 *     public void afterSyncPersonCopy(AfterSyncPersonCopyEvent afterSyncPersonCopyEvent) {
                 *         String destEntity = afterSyncPersonCopyEvent.getDestEntity();
                 *         //��Ҫ���ж�ʵ�壬����ʵ�嶼���������ӿ�
                 *         if ("hsas_personhr".equals(destEntity)) {
                 *             //��ȡ�������������ݣ����Լ��������¼��ɡ�
                 *             List<DynamicObject> destDyList = afterSyncPersonCopyEvent.getDestDyList();
                 *             for (DynamicObject destDy : destDyList) {
                 *                 destDy.set("name", destDy.getString("name") + "_ext");
                 *             }
                 *         }
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param afterSyncPersonCopyEvent ������н��ʵ�����ݼ���
                 * @return �޸��������
                 */
                afterSyncPersonCopy?(afterSyncPersonCopyEvent:kd.sdk.swc.hsas.common.events.person.AfterSyncPersonCopyEvent):void;
                /**
                 * ��н��Աͬ����ʼ������֧�ֿͻ�����ͬ��ʵ�塣
                 *
                 * <pre><code>
                 *
                 * public class SyncPersonExtDemoService implements ISyncPersonExtService {
                 *
                 *     public void initSyncPerson(InitSyncPersonEvent initSyncPersonEvent) {
                 *         //������ͬ����չ�ļ����˲���Ϣ
                 *         initSyncPersonEvent.getFormIdMap().put("kdtest_hrpi_jinengrencai", "kdtest_hsas_jinengrencai");
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param initSyncPersonEvent ��ͬ����ʵ��ӳ���ϵ��key=��̨��Աʵ�壬value=��Ӧ��н��ʵ��
                 * @return ���õ�����е�formIdMap���أ� ��ͬ����ʵ��ӳ���ϵ��key=��̨��Աʵ�壬value=��Ӧ��н��ʵ��
                 */
                initSyncPerson?(initSyncPersonEvent:kd.sdk.swc.hsas.common.events.person.InitSyncPersonEvent):void;
            }
            type ISyncPersonExtService_T = ISyncPersonExtService_S & ISyncPersonExtService$;
            interface ISyncPersonExtService extends ISyncPersonExtService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.extpoint.salaryfile{
            interface ISalaryFileBeforeValidateDepEmpDateService_S {
            }
            interface ISalaryFileBeforeValidateDepEmpDateService$ {
                /**
                 * �ж��Ƿ����У��
                 *
                 * @param event �¼�
                 */
                isValidate(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileBeforeValidateDepEmpDateEvent):void;
            }
            type ISalaryFileBeforeValidateDepEmpDateService_T = ISalaryFileBeforeValidateDepEmpDateService_S & ISalaryFileBeforeValidateDepEmpDateService$;
            interface ISalaryFileBeforeValidateDepEmpDateService extends ISalaryFileBeforeValidateDepEmpDateService_T {
            }
            interface ISalaryFileExportExtService_S {
            }
            interface ISalaryFileExportExtService$ {
                /**
                 * ��ȡ��н���˰����ʵ���ϵ��ͬʱ������н���˰
                 *
                 * <pre><code>
                 *
                 * public class SalaryFileExportDemoExtService implements ISalaryFileExportExtService {
                 *
                 *     //������չ���ֶ����Ա�ʶ ע�⣺����ǻ��������ֶ�,��Ҫ�ں������.number��.name,kdtest_textfield.number
                 *     private String EXT_FIELD = "kdtest_textfield";
                 *
                 *     //��ȡн�ʵ�������ʵ����Ϣ����������н
                 *     public void afterBuildSalaryFileExportEntityRel(SalaryFileExportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //��ȡ��н���˰����ʵ���ϵ��ͬʱ������н���˰
                 *     public void afterBuildSalaryAndTaxExportEntityRel(SalaryFileExportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //���1����ʵ����չ�ֶ�
                 *     private void addExtField(SalaryFileExportEvent event, String extField) {
                 *         //�ֶα�ʶ��������
                 *         String[] fieldKeyOld = event.getImportEntityRel().getMainEntity().getFieldKey();
                 *         //��Ӷ������ֶε�ģ���У����޸��ֶ����飬�����Ǽ�1���ֶε����һ����������Ҫ�����м䣬���������˳�򼴿�
                 *         String[] fieldKeyNew = Arrays.copyOf(fieldKeyOld, fieldKeyOld.length + 1);
                 *         fieldKeyNew[fieldKeyOld.length] = extField;
                 *         //�����ø���
                 *         event.getImportEntityRel().getMainEntity().setFieldKey(fieldKeyNew);
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildSalaryAndTaxExportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileExportEvent):void;
                /**
                 * ��ȡн�ʵ�������ʵ����Ϣ����������н
                 *
                 * <pre><code>
                 *
                 * public class SalaryFileExportDemoExtService implements ISalaryFileExportExtService {
                 *
                 *     //������չ���ֶ����Ա�ʶ ע�⣺����ǻ��������ֶ�,��Ҫ�ں������.number��.name,kdtest_textfield.number
                 *     private String EXT_FIELD = "kdtest_textfield";
                 *
                 *     //��ȡн�ʵ�������ʵ����Ϣ����������н
                 *     public void afterBuildSalaryFileExportEntityRel(SalaryFileExportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //��ȡ��н���˰����ʵ���ϵ��ͬʱ������н���˰
                 *     public void afterBuildSalaryAndTaxExportEntityRel(SalaryFileExportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //���1����ʵ����չ�ֶ�
                 *     private void addExtField(SalaryFileExportEvent event, String extField) {
                 *         //�ֶα�ʶ��������
                 *         String[] fieldKeyOld = event.getImportEntityRel().getMainEntity().getFieldKey();
                 *         //��Ӷ������ֶε�ģ���У����޸��ֶ����飬�����Ǽ�1���ֶε����һ����������Ҫ�����м䣬���������˳�򼴿�
                 *         String[] fieldKeyNew = Arrays.copyOf(fieldKeyOld, fieldKeyOld.length + 1);
                 *         fieldKeyNew[fieldKeyOld.length] = extField;
                 *         //�����ø���
                 *         event.getImportEntityRel().getMainEntity().setFieldKey(fieldKeyNew);
                 *     }
                 *
                 * }
                 *
                 * </code></pre>
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildSalaryFileExportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileExportEvent):void;
                /**
                 * ��ȡ��н���˰��ʱ������ʵ����Ϣ���������˰
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildTaxTempExportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileExportEvent):void;
            }
            type ISalaryFileExportExtService_T = ISalaryFileExportExtService_S & ISalaryFileExportExtService$;
            interface ISalaryFileExportExtService extends ISalaryFileExportExtService_T {
            }
            interface ISalaryFileImportExtService_S {
            }
            interface ISalaryFileImportExtService$ {
                /**
                 * ��ȡ��н���˰��ʱ������ʵ���ϵ��ͬʱ���뷢н���˰
                 *
                 * <pre><code>
                 *
                 * public class SalaryFileImportDemoExtService implements ISalaryFileImportExtService {
                 *
                 *     //������չ���ֶ����Ա�ʶ ע�⣺����ǻ��������ֶ�,��Ҫ�ں������.number��.name,kdtest_textfield.number
                 *     private String EXT_FIELD = "kdtest_textfield";
                 *
                 *     //��ȡ��н����ʵ���ϵ:�����뷢н
                 *     public void afterBuildSalaryFileImportEntityRel(SalaryFileImportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //��ȡ��н���˰��ʱ������ʵ���ϵ��ͬʱ���뷢н���˰
                 *     public void afterBuildSalaryAndTaxTempImportEntityRel(SalaryFileImportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //���1����ʵ����չ�ֶ�
                 *     private void addExtField(SalaryFileImportEvent event, String extField) {
                 *         //�ֶα�ʶ��������
                 *         String[] fieldKeyOld = event.getImportEntityRel().getMainEntity().getFieldKey();
                 *         //��Ӷ������ֶε�ģ���У����޸��ֶ����飬�����Ǽ�1���ֶε����һ����������Ҫ�����м䣬���������˳�򼴿�
                 *         String[] fieldKeyNew = Arrays.copyOf(fieldKeyOld, fieldKeyOld.length + 1);
                 *         fieldKeyNew[fieldKeyOld.length] = extField;
                 *         //�����ø���
                 *         event.getImportEntityRel().getMainEntity().setFieldKey(fieldKeyNew);
                 *     }
                 * }
                 *
                 * </code></pre>
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildSalaryAndTaxTempImportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileImportEvent):void;
                /**
                 * ��ȡ��н����ʵ���ϵ:�����뷢н
                 *
                 * <pre><code>
                 *
                 * public class SalaryFileImportDemoExtService implements ISalaryFileImportExtService {
                 *
                 *     //������չ���ֶ����Ա�ʶ ע�⣺����ǻ��������ֶ�,��Ҫ�ں������.number��.name,kdtest_textfield.number
                 *     private String EXT_FIELD = "kdtest_textfield";
                 *
                 *     //��ȡ��н����ʵ���ϵ:�����뷢н
                 *     public void afterBuildSalaryFileImportEntityRel(SalaryFileImportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //��ȡ��н���˰��ʱ������ʵ���ϵ��ͬʱ���뷢н���˰
                 *     public void afterBuildSalaryAndTaxTempImportEntityRel(SalaryFileImportEvent event){
                 *         //���1����ʵ����չ�ֶ�
                 *         addExtField(event, EXT_FIELD);
                 *     }
                 *
                 *     //���1����ʵ����չ�ֶ�
                 *     private void addExtField(SalaryFileImportEvent event, String extField) {
                 *         //�ֶα�ʶ��������
                 *         String[] fieldKeyOld = event.getImportEntityRel().getMainEntity().getFieldKey();
                 *         //��Ӷ������ֶε�ģ���У����޸��ֶ����飬�����Ǽ�1���ֶε����һ����������Ҫ�����м䣬���������˳�򼴿�
                 *         String[] fieldKeyNew = Arrays.copyOf(fieldKeyOld, fieldKeyOld.length + 1);
                 *         fieldKeyNew[fieldKeyOld.length] = extField;
                 *         //�����ø���
                 *         event.getImportEntityRel().getMainEntity().setFieldKey(fieldKeyNew);
                 *     }
                 * }
                 *
                 * </code></pre>
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildSalaryFileImportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileImportEvent):void;
                /**
                 * ��ȡ��˰��ʱ������ʵ����Ϣ���������˰
                 * ʹ�÷����ο���н,��˰�ֶδ���� event.getImportEntityRel().getOtherEntities()
                 *
                 * @param event н�ʵ��������¼�,�����������ֶ�
                 */
                afterBuildTaxTempImportEntityRel?(event:kd.sdk.swc.hsas.common.events.salaryfile.SalaryFileImportEvent):void;
            }
            type ISalaryFileImportExtService_T = ISalaryFileImportExtService_S & ISalaryFileImportExtService$;
            interface ISalaryFileImportExtService extends ISalaryFileImportExtService_T {
            }
            interface ISalaryFileMatchExtService_S {
            }
            interface ISalaryFileMatchExtService$ {
                /**
                 * ��Աн�ʵ���ƥ�������չ
                 *
                 * <pre><code>
                 *
                 * public class SalaryFileMatchDemoExtService implements ISalaryFileMatchExtService {
                 *   public void afterMatchSalaryFile(List<Map<String, Object>> params) {
                 *       for (Map<String, Object> param : params) {
                 *           boolean success = (boolean) param.get("success");
                 *           if(!success){
                 *               continue;
                 *           }
                 *
                 *           int queryRowCount = (int) param.get("queryRowCount");
                 *           List<Long> matchSalaryFileIds = (List) param.get("matchSalaryFileIds");
                 *           List<DynamicObject> matchSalaryFileVers = (List) param.get("matchSalaryFileVers");
                 *           if(queryRowCount >= 2){
                 *               //ֻȡ��һ��
                 *               param.put("sdkExtModify", "true");
                 *
                 *               param.put("queryRowCount", 1);
                 *               param.put("matchSalaryFileId", matchSalaryFileIds.get(0));
                 *               param.put("matchSalaryFileIds", matchSalaryFileIds.subList(0, 1));
                 *               param.put("matchSalaryFileVers", matchSalaryFileVers.subList(0, 1));
                 *
                 *           }
                 *       }
                 *   }
                 * }
                 *
                 * </code></pre>
                 *
                 * @param params н�ʵ���ƥ������Ϣ��Map��Ϊ��Σ���������˵����
                 *               success false��ʧ�ܣ�������֯�˱���У�飬ʧ����������ĸ�ֵ�Ͳ�����ֵ��
                 *               queryRowCount ƥ�䵽�ĵ�������
                 *               matchSalaryFileId ƥ�䵽1������ʱ��ŵ���boid
                 *               matchSalaryFileIds ƥ�䵽1�����������Ǵ�ŵ�����boid����
                 *               matchSalaryFileVers ƥ�䵽1�����������Ǵ�ŵ����ĵ�ǰ��̬���󼯺�
                 */
                afterMatchSalaryFile?(params:$.java.util.List):void;
            }
            type ISalaryFileMatchExtService_T = ISalaryFileMatchExtService_S & ISalaryFileMatchExtService$;
            interface ISalaryFileMatchExtService extends ISalaryFileMatchExtService_T {
            }
        }
        namespace kd.sdk.swc.hsas.business.mservice.helper{
            interface CalPayrollTaskServiceHelper_S {
                /**
                 * ���ָ����Ա
                 * @param params
                 * @return
                 */
                addPerson(params:$.java.util.List):$.java.util.Map;
                /**
                 * �������������Զ��������
                 * @param params
                 * @return
                 */
                createAndAutoAddPerson(params:$.java.util.List):$.java.util.Map;
                /**
                 * �������������Զ����ָ������������������
                 * @param params
                 * @return
                 */
                createTask(params:$.java.util.List):$.java.util.Map;
            }
            interface CalPayrollTaskServiceHelper_C extends CalPayrollTaskServiceHelper_S {
                new():CalPayrollTaskServiceHelper;
            }
            interface CalPayrollTaskServiceHelper$ {
            }
            type CalPayrollTaskServiceHelper_T = CalPayrollTaskServiceHelper_S & CalPayrollTaskServiceHelper$;
            interface CalPayrollTaskServiceHelper extends CalPayrollTaskServiceHelper_T {
            }
            interface PayDetailServiceHelper_S {
                /**
                 * ���ݷ�����ϸ�������Ϣ������п�
                 *
                 * @param param
                 * @return ������Ϣ
                 */
                modifyPayDetailBankCard(param:$.java.util.List):$.java.util.Map;
            }
            interface PayDetailServiceHelper_C extends PayDetailServiceHelper_S {
                new():PayDetailServiceHelper;
            }
            interface PayDetailServiceHelper$ {
            }
            type PayDetailServiceHelper_T = PayDetailServiceHelper_S & PayDetailServiceHelper$;
            interface PayDetailServiceHelper extends PayDetailServiceHelper_T {
            }
            interface SalaryCalculationServiceHelper_S {
                /**
                 * н�ʼ��㣨ͬ����
                 * @param param
                 * @return
                 */
                salaryCalForSync(param:$.java.util.Map):$.java.util.Map;
            }
            interface SalaryCalculationServiceHelper_C extends SalaryCalculationServiceHelper_S {
                new():SalaryCalculationServiceHelper;
            }
            interface SalaryCalculationServiceHelper$ {
            }
            type SalaryCalculationServiceHelper_T = SalaryCalculationServiceHelper_S & SalaryCalculationServiceHelper$;
            interface SalaryCalculationServiceHelper extends SalaryCalculationServiceHelper_T {
            }
            interface PaySettingServiceHelper_S {
                /**
                 * ������Ա���·�������
                 *
                 * @param param
                 * @return ������Ϣ
                 */
                updatePaySetting(param:$.java.util.Map):$.java.util.Map;
            }
            interface PaySettingServiceHelper_C extends PaySettingServiceHelper_S {
                new():PaySettingServiceHelper;
            }
            interface PaySettingServiceHelper$ {
            }
            type PaySettingServiceHelper_T = PaySettingServiceHelper_S & PaySettingServiceHelper$;
            interface PaySettingServiceHelper extends PaySettingServiceHelper_T {
            }
            interface PersonServiceHelper_S {
                /**
                 * ͬ�����ݣ��ɸ��ݹ��Ž���ͬ������
                 *
                 * @param param {"empnumbers": ["DTX0406134-R","DTX0406134"]}
                 * @return ������Ϣ {"success": true, "message": "", "data": ���param}
                 */
                syncData(param:$.java.util.Map):$.java.util.Map;
            }
            interface PersonServiceHelper_C extends PersonServiceHelper_S {
                new():PersonServiceHelper;
            }
            interface PersonServiceHelper$ {
            }
            type PersonServiceHelper_T = PersonServiceHelper_S & PersonServiceHelper$;
            interface PersonServiceHelper extends PersonServiceHelper_T {
            }
            interface OnHoldServiceHelper_S {
                /**
                 * ͨ���ӿڴ���ͣ��������
                 * @param params
                 * @return
                 */
                addOnHoldData(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ͨ���ӿڽ�нͣ��������
                 * @param params
                 * @return
                 */
                releaseOnHoldData(params:$.java.util.Map):$.java.util.Map;
            }
            interface OnHoldServiceHelper_C extends OnHoldServiceHelper_S {
                new():OnHoldServiceHelper;
            }
            interface OnHoldServiceHelper$ {
            }
            type OnHoldServiceHelper_T = OnHoldServiceHelper_S & OnHoldServiceHelper$;
            interface OnHoldServiceHelper extends OnHoldServiceHelper_T {
            }
            interface BizDataServiceHelper_S {
                /**
                 * ǰ��ҵ������ɾ��/����
                 * @param params
                 * @return
                 */
                delBizData(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ������-����ҵ������Ψһʶ����
                 * @param params
                 * @return
                 */
                getBizDataCodes(codePrefix:string,count:number):$.java.util.List;
                /**
                 * ǰ��ҵ������-ҵ������ģ���ѯ
                 * @param params
                 * @return
                 */
                getBizItemGroupData(params:$.java.util.List):$.java.util.Map;
                /**
                 * ǰ��ҵ������-ҵ����Ŀ���Բ�ѯ
                 * @param params
                 * @return
                 */
                getBizItemPropInfo(params:$.java.util.List):$.java.util.Map;
                /**
                 * ������Ȼ��+н����ƥ�䵵��
                 * @param params
                 * @return
                 */
                getSalaryFileIdByPayRollGrpId(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ������-��֯��ƥ��н�ʵ���
                 * @param params
                 * @return
                 */
                matchSalaryFile(params:$.java.util.List):$.java.util.List;
                /**
                 * ǰ��ҵ������ʹ�ô�����ѯ
                 * @param params
                 * @return
                 */
                queryUsageCount(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ������ʹ���ڼ��ѯ
                 * @param params
                 * @return
                 */
                queryUsagePeriod(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ�����ݳ���
                 * @param params
                 * @return
                 */
                rollBackBizData(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ����������by��֯��
                 * @param params
                 * @return
                 */
                synBizData(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ����������byн�ʵ���
                 * @param params
                 * @return
                 */
                synBizDataBySalaryFile(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ������ѭ�������ʧЧ����
                 * @param params
                 * @return
                 */
                updateBlsed(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ǰ��ҵ������ֵУ��
                 * @param params
                 * @return
                 */
                validateDataValue(params:$.java.util.List):$.java.util.Map;
            }
            interface BizDataServiceHelper_C extends BizDataServiceHelper_S {
                new():BizDataServiceHelper;
            }
            interface BizDataServiceHelper$ {
            }
            type BizDataServiceHelper_T = BizDataServiceHelper_S & BizDataServiceHelper$;
            interface BizDataServiceHelper extends BizDataServiceHelper_T {
            }
            interface SalaryFileServiceHelper_S {
                /**
                 * ������ҵ�˲�ѯ��Աн�ʵ���
                 *
                 * @param param ��ѯ����
                 *              ��ҵ��Ա	employees	List<Long>		��	�������ϣ������id�������Ͷ���ش�һ��
                 *              ��ѯ����	selectProperties	String	500	��	�������ѯ�����ֶΣ�������ֶ�
                 *              ״̬	status	List<String>		��	Ĭ��ֻ��ѯ�����
                 * @return ������Ϣ
                 * ����ж�    success		Boolean	��	success - �ɹ�, false - ʧ��
                 * ������Ϣ	message		String	��	���������쳣����ֵ
                 * ��Ϣ��ϸ����	data		List<Map<String, Object>>
                 * 	��
                 * ��ҵ��Ա		employee_id	Long	��	��������id
                 * �㷢н��֯		org_name	String	��	������������
                 * н�ʺ�����		payrollgroup_name	String	��
                 * �޸���		modifier_name	String	��	����administrator���򷵻��޸���
                 */
                querySalaryFileBoByEmp(param:$.java.util.Map):$.java.util.Map;
                /**
                 * ������߸���н�ʵ���&��Ա��˰����������ϵ
                 *
                 * @param params ���� {data: [{ salaryFileId: ��Աн�ʵ���ID long taxFileId: ��Ա��˰����ID long oldRelId: �ɵĹ�����ϵID������ʱΪ�ա� long
                 *        }]}
                 *
                 * @return ������ { success: �Ƿ�ɹ� status: ״̬�� message: ��Ϣ data: [{success: �Ƿ�ɹ�, salaryFileId: н�ʵ���ID, taxFileId:
                 *         ��˰����ID, newRelId: �µĹ�����ϵID}] }
                 *
                 * @author Quinn
                 * @since 2021-01-20
                 */
                relateSalaryWithTaxFile(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ���浵������������������ɵ������޸ĵ��������������
                 *
                 * @param params н�ʵ��� �����Ե�ֵ��ֵ��key�ͻ������ϵ�ֵ����һ�¡�
                 * @return ������Σ���֤����һ�£����Ӳ��ַ������ԣ�success��true/false��message:������Ϣ
                 */
                saveSalaryFile(params:$.java.util.List):$.java.util.Map;
            }
            interface SalaryFileServiceHelper_C extends SalaryFileServiceHelper_S {
                new():SalaryFileServiceHelper;
            }
            interface SalaryFileServiceHelper$ {
            }
            type SalaryFileServiceHelper_T = SalaryFileServiceHelper_S & SalaryFileServiceHelper$;
            interface SalaryFileServiceHelper extends SalaryFileServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.dto.salaryfile{
            interface InitPageDataDTO_S {
            }
            interface InitPageDataDTO_C extends InitPageDataDTO_S {
                new():InitPageDataDTO;
            }
            interface InitPageDataDTO$ {
                getHidePages():$.java.util.List;
                setHidePages(hidePages:$.java.util.List):void;
            }
            type InitPageDataDTO_T = InitPageDataDTO_S & InitPageDataDTO$;
            interface InitPageDataDTO extends InitPageDataDTO_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.entity{
            interface ImportEntityRel_S {
            }
            interface ImportEntityRel_C extends ImportEntityRel_S {
                new(mainEntity:ImportEntity):ImportEntityRel;
                new(mainEntity:ImportEntity,isReverseRef:boolean):ImportEntityRel;
                new(mainEntity:ImportEntity,otherEntities:$.java.util.List):ImportEntityRel;
                new(mainEntity:ImportEntity,otherEntities:$.java.util.List,isReverseRef:boolean):ImportEntityRel;
            }
            interface ImportEntityRel$ {
                /**
                 * ��ʵ����ƽ ���ڲ��������
                 *
                 * @return
                 */
                getAllEntity():$.java.util.Map;
                /**
                 * ��ȡʵ�����Ͷ�Ӧ��op
                 *
                 * @return
                 */
                getEntityOpRel():$.java.util.Map;
                /**
                 * ��ȡ����ʵ����ֶα�ʶ����
                 *
                 * @param entityId
                 * @return
                 */
                getImportEntityFieldIds(entityId:string):string[];
                getMainEntity():ImportEntity;
                /**
                 * ��ʵ����DyobjType��ƽ ���ڲ��������
                 *
                 * @return
                 */
                getMultiEntityDyobjType():$.java.util.Map;
                /**
                 * ��ȡ����ʵ���ID
                 *
                 * @return
                 */
                getMultiEntityIds():$.java.util.List;
                /**
                 * ��ȡʵ�����Ͷ�Ӧ�ĸ�ʵ�忪���ֶ�
                 *
                 * @return
                 */
                getOnOffMaps():$.java.util.Map;
                getOtherEntities():$.java.util.List;
                /**
                 * ��ȡʵ�����Ͷ�Ӧ�ĸ�ʵ����
                 *
                 * @return
                 */
                getParentEntityIdRel():$.java.util.Map;
                /**
                 * ��ȡʵ�����Ͷ�Ӧ�ĸ�ʵ�����õ��ֶ�
                 *
                 * @return
                 */
                getParentFieldIdRel():$.java.util.Map;
                isReverseRef():boolean;
                setMainEntity(mainEntity:ImportEntity):void;
                setOtherEntities(otherEntities:$.java.util.List):void;
                setReverseRef(isReverseRef:boolean):void;
            }
            type ImportEntityRel_T = ImportEntityRel_S & ImportEntityRel$;
            interface ImportEntityRel extends ImportEntityRel_T {
            }
            interface ImportEntity_S {
            }
            interface ImportEntity_C extends ImportEntity_S {
                new(entityId:string,appId:string,fieldKey:string[]):ImportEntity;
                new(entityId:string,appId:string,fieldKey:string[],entityOp:string):ImportEntity;
                new(entityId:string,appId:string,fieldKey:string[],parentEntityId:string,parentFieldId:string):ImportEntity;
                new(entityId:string,appId:string,fieldKey:string[],parentEntityId:string,parentFieldId:string,entityOp:string):ImportEntity;
                new(entityId:string,appId:string,fieldKey:string[],parentEntityId:string,parentFieldId:string,parentOnOffField:string,entityOp:string):ImportEntity;
            }
            interface ImportEntity$ {
                getAppId():string;
                getEntityId():string;
                getEntityOp():string;
                getFieldKey():string[];
                getParentEntityId():string;
                getParentFieldId():string;
                getParentOnOffField():string;
                setAppId(appId:string):void;
                setEntityId(entityId:string):void;
                setEntityOp(entityOp:string):void;
                setFieldKey(fieldKey:string[]):void;
                setParentEntityId(parentEntityId:string):void;
                setParentFieldId(parentFieldId:string):void;
                setParentOnOffField(parentOnOffField:string):void;
                /**
                 * ʵ��ת��Ϊmap
                 *
                 * @return
                 */
                toMap():$.java.util.Map;
            }
            type ImportEntity_T = ImportEntity_S & ImportEntity$;
            interface ImportEntity extends ImportEntity_T {
            }
            interface ItemTreeNode_S {
            }
            type ItemTreeNode_ST = $.java.io.Serializable & ItemTreeNode_S;
            interface ItemTreeNode_C extends ItemTreeNode_ST {
                new():ItemTreeNode;
                new(itemId:long,itemName:string,itemNumber:string):ItemTreeNode;
            }
            interface ItemTreeNode$ {
                getItemId():long;
                getItemName():string;
                getItemNumber():string;
                getParentName():string;
                getParentNumber():string;
                setParentName(parentName:string):void;
                setParentNumber(parentNumber:string):void;
            }
            type ItemTreeNode_T = $.java.io.Serializable & ItemTreeNode_S & ItemTreeNode$;
            interface ItemTreeNode extends ItemTreeNode_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.approve{
            interface ApproveInvokeReportFormEvent_S {
            }
            type ApproveInvokeReportFormEvent_ST = $.java.io.Serializable & ApproveInvokeReportFormEvent_S;
            interface ApproveInvokeReportFormEvent_C extends ApproveInvokeReportFormEvent_ST {
                new(approveBillDynamicObject:$.kd.bos.dataentity.entity.DynamicObject,calPersonIds:$.java.util.List,payDetailIds:$.java.util.List,pageType:string,reportType:string):ApproveInvokeReportFormEvent;
            }
            interface ApproveInvokeReportFormEvent$ {
                getApproveBillDynamicObject():$.kd.bos.dataentity.entity.DynamicObject;
                getCalPersonIds():$.java.util.List;
                getPageType():string;
                getPayDetailIds():$.java.util.List;
                getReportType():string;
                setApproveBillDynamicObject(approveBillDynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                setCalPersonIds(calPersonIds:$.java.util.List):void;
                setPageType(pageType:string):void;
                setPayDetailIds(payDetailIds:$.java.util.List):void;
                setReportType(reportType:string):void;
            }
            type ApproveInvokeReportFormEvent_T = $.java.io.Serializable & ApproveInvokeReportFormEvent_S & ApproveInvokeReportFormEvent$;
            interface ApproveInvokeReportFormEvent extends ApproveInvokeReportFormEvent_T {
            }
            interface ApproveReferReportDownEvent_S {
            }
            interface ApproveReferReportDownEvent_C extends ApproveReferReportDownEvent_S {
                new(approveBillDynamicObject:$.kd.bos.dataentity.entity.DynamicObject,parentView:$.kd.bos.form.IFormView,referReport:string,downView:$.kd.bos.form.IFormView):ApproveReferReportDownEvent;
            }
            interface ApproveReferReportDownEvent$ {
                getApproveBillDynamicObject():$.kd.bos.dataentity.entity.DynamicObject;
                getDownView():$.kd.bos.form.IFormView;
                getParentView():$.kd.bos.form.IFormView;
                getReferReport():string;
            }
            type ApproveReferReportDownEvent_T = ApproveReferReportDownEvent_S & ApproveReferReportDownEvent$;
            interface ApproveReferReportDownEvent extends ApproveReferReportDownEvent_T {
            }
            interface ApproveReferReportDealEvent_S {
            }
            interface ApproveReferReportDealEvent_C extends ApproveReferReportDealEvent_S {
                new(approveBillDynamicObject:$.kd.bos.dataentity.entity.DynamicObject,calPersonIdList:$.java.util.List,schemeDy:$.kd.bos.dataentity.entity.DynamicObject):ApproveReferReportDealEvent;
            }
            interface ApproveReferReportDealEvent$ {
                getApproveBillDynamicObject():$.kd.bos.dataentity.entity.DynamicObject;
                getCalPersonIdList():$.java.util.List;
                getSchemeDy():$.kd.bos.dataentity.entity.DynamicObject;
                getShowParameter():$.kd.bos.form.FormShowParameter;
                setShowParameter(showParameter:$.kd.bos.form.FormShowParameter):void;
            }
            type ApproveReferReportDealEvent_T = ApproveReferReportDealEvent_S & ApproveReferReportDealEvent$;
            interface ApproveReferReportDealEvent extends ApproveReferReportDealEvent_T {
            }
            interface AfterVerifySpecialRuleEvent_S {
            }
            interface AfterVerifySpecialRuleEvent_C extends AfterVerifySpecialRuleEvent_S {
                new(approve:$.kd.bos.dataentity.entity.DynamicObject,isConformRule:boolean):AfterVerifySpecialRuleEvent;
            }
            interface AfterVerifySpecialRuleEvent$ {
                getApprove():$.kd.bos.dataentity.entity.DynamicObject;
                getConformRule():boolean;
                getSpecialDy():$.kd.bos.dataentity.entity.DynamicObject;
                setApprove(approve:$.kd.bos.dataentity.entity.DynamicObject):void;
                setConformRule(conformRule:boolean):void;
                setSpecialDy(specialDy:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type AfterVerifySpecialRuleEvent_T = AfterVerifySpecialRuleEvent_S & AfterVerifySpecialRuleEvent$;
            interface AfterVerifySpecialRuleEvent extends AfterVerifySpecialRuleEvent_T {
            }
            interface CreateApproveBillCalPersonDealEvent_S {
            }
            interface CreateApproveBillCalPersonDealEvent_C extends CreateApproveBillCalPersonDealEvent_S {
                new():CreateApproveBillCalPersonDealEvent;
            }
            interface CreateApproveBillCalPersonDealEvent$ {
                getCalPersonSet():$.java.util.Set;
                getErrorCustomMsg():string;
                getView():$.kd.bos.form.IFormView;
                setCalPersonSet(calPersonSet:$.java.util.Set):void;
                setErrorCustomMsg(errorCustomMsg:string):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type CreateApproveBillCalPersonDealEvent_T = CreateApproveBillCalPersonDealEvent_S & CreateApproveBillCalPersonDealEvent$;
            interface CreateApproveBillCalPersonDealEvent extends CreateApproveBillCalPersonDealEvent_T {
            }
            interface CreateApproveBillSetValueEvent_S {
            }
            interface CreateApproveBillSetValueEvent_C extends CreateApproveBillSetValueEvent_S {
                new():CreateApproveBillSetValueEvent;
            }
            interface CreateApproveBillSetValueEvent$ {
                getApproveBillDy():$.kd.bos.dataentity.entity.DynamicObject;
                getCalTaskIdList():$.java.util.List;
                setApproveBillDy(approveBillDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                setCalTaskIdList(calTaskIdList:$.java.util.List):void;
            }
            type CreateApproveBillSetValueEvent_T = CreateApproveBillSetValueEvent_S & CreateApproveBillSetValueEvent$;
            interface CreateApproveBillSetValueEvent extends CreateApproveBillSetValueEvent_T {
            }
            interface ApproveOverViewDealEvent_S {
            }
            type ApproveOverViewDealEvent_ST = $.java.io.Serializable & ApproveOverViewDealEvent_S;
            interface ApproveOverViewDealEvent_C extends ApproveOverViewDealEvent_ST {
                /**
                 * ������
                 *
                 * @param type
                 * @param calPersonIds
                 * @param value
                 * @param overViewEntry
                 */
                new(type_arg:string,calPersonIds:$.java.util.List,value:string,overViewEntry:$.java.util.Map):ApproveOverViewDealEvent;
            }
            interface ApproveOverViewDealEvent$ {
                getCalPersonIds():$.java.util.List;
                getOverViewEntry():$.java.util.Map;
                getType():string;
                getValue():string;
                setCalPersonIds(calPersonIds:$.java.util.List):void;
                setOverViewEntry(overViewEntry:$.java.util.Map):void;
                setType(type_arg:string):void;
                setValue(value:string):void;
            }
            type ApproveOverViewDealEvent_T = $.java.io.Serializable & ApproveOverViewDealEvent_S & ApproveOverViewDealEvent$;
            interface ApproveOverViewDealEvent extends ApproveOverViewDealEvent_T {
            }
            interface CreateApproveBillValidateEvent_S {
            }
            interface CreateApproveBillValidateEvent_C extends CreateApproveBillValidateEvent_S {
                new(calPayRollTasks:$.java.util.List):CreateApproveBillValidateEvent;
            }
            interface CreateApproveBillValidateEvent$ {
                getCalPayRollTasks():$.java.util.List;
                getErrorMessage():string;
                getValidateResult():$.java.util.Map;
                isCancel():boolean;
                setCalPayRollTasks(calPayRollTasks:$.java.util.List):void;
                setCancel(cancel:boolean):void;
                setErrorMessage(errorMessage:string):void;
                setValidateResult(validateResult:$.java.util.Map):void;
            }
            type CreateApproveBillValidateEvent_T = CreateApproveBillValidateEvent_S & CreateApproveBillValidateEvent$;
            interface CreateApproveBillValidateEvent extends CreateApproveBillValidateEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.attinteg{
            interface AfterCreateBizDataEvent_S {
            }
            type AfterCreateBizDataEvent_ST = $.java.util.EventObject & AfterCreateBizDataEvent_S;
            interface AfterCreateBizDataEvent_C extends AfterCreateBizDataEvent_ST {
                /**
                 * Constructs a prototypical Event.
                 *
                 * @param source The object on which the Event initially occurred.
                 * @throws IllegalArgumentException if source is null.
                 */
                new(source:any):AfterCreateBizDataEvent;
            }
            interface AfterCreateBizDataEvent$ {
                getBizData():$.kd.bos.dataentity.entity.DynamicObject;
                getBizItemId():long;
                getItemData():$.java.util.Map;
                getPeriodObj():$.kd.bos.dataentity.entity.DynamicObject;
                getPeriodTypeObj():$.kd.bos.dataentity.entity.DynamicObject;
                getSalaryFileId():long;
                setBizData(bizData:$.kd.bos.dataentity.entity.DynamicObject):void;
                setBizItemId(bizItemId:long):void;
                setItemData(itemData:$.java.util.Map):void;
                setPeriodObj(periodObj:$.kd.bos.dataentity.entity.DynamicObject):void;
                setPeriodTypeObj(periodTypeObj:$.kd.bos.dataentity.entity.DynamicObject):void;
                setSalaryFileId(salaryFileId:long):void;
            }
            type AfterCreateBizDataEvent_T = $.java.util.EventObject & AfterCreateBizDataEvent_S & AfterCreateBizDataEvent$;
            interface AfterCreateBizDataEvent extends AfterCreateBizDataEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.bizdata{
            interface AfterBizDataListEvent_S {
            }
            interface AfterBizDataListEvent_C extends AfterBizDataListEvent_S {
                new(bizDataList:$.java.util.List,bizDataRecordList:$.java.util.List):AfterBizDataListEvent;
            }
            interface AfterBizDataListEvent$ {
                getBizDataList():$.java.util.List;
                getBizDataRecordList():$.java.util.List;
                setBizDataList(bizDataList:$.java.util.List):void;
                setBizDataRecordList(bizDataRecordList:$.java.util.List):void;
            }
            type AfterBizDataListEvent_T = AfterBizDataListEvent_S & AfterBizDataListEvent$;
            interface AfterBizDataListEvent extends AfterBizDataListEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.calperson{
            interface CalResultCoverSalaryItemEvent_S {
            }
            interface CalResultCoverSalaryItemEvent_C extends CalResultCoverSalaryItemEvent_S {
                new():CalResultCoverSalaryItemEvent;
            }
            interface CalResultCoverSalaryItemEvent$ {
                getCalTaskId():long;
                getExcludeItemIdList():$.java.util.List;
                setCalTaskId(calTaskId:long):void;
                setExcludeItemIdList(excludeItemIdList:$.java.util.List):void;
            }
            type CalResultCoverSalaryItemEvent_T = CalResultCoverSalaryItemEvent_S & CalResultCoverSalaryItemEvent$;
            interface CalResultCoverSalaryItemEvent extends CalResultCoverSalaryItemEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.formula{
            interface BeforeBuildItemTreeEvent_S {
            }
            interface BeforeBuildItemTreeEvent_C extends BeforeBuildItemTreeEvent_S {
                new(itemTreeNodeList:$.java.util.List):BeforeBuildItemTreeEvent;
            }
            interface BeforeBuildItemTreeEvent$ {
                getItemTreeNodeList():$.java.util.List;
            }
            type BeforeBuildItemTreeEvent_T = BeforeBuildItemTreeEvent_S & BeforeBuildItemTreeEvent$;
            interface BeforeBuildItemTreeEvent extends BeforeBuildItemTreeEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.insurancedata{
            interface BeforeSaveInsuranceDataListEvent_S {
            }
            interface BeforeSaveInsuranceDataListEvent_C extends BeforeSaveInsuranceDataListEvent_S {
                new(saveInsuranceDataList:$.java.util.List,queryResultList:$.java.util.List):BeforeSaveInsuranceDataListEvent;
            }
            interface BeforeSaveInsuranceDataListEvent$ {
                getQueryResultList():$.java.util.List;
                getSaveInsuranceDataList():$.java.util.List;
                setQueryResultList(queryResultList:$.java.util.List):void;
                setSaveInsuranceDataList(saveInsuranceDataList:$.java.util.List):void;
            }
            type BeforeSaveInsuranceDataListEvent_T = BeforeSaveInsuranceDataListEvent_S & BeforeSaveInsuranceDataListEvent$;
            interface BeforeSaveInsuranceDataListEvent extends BeforeSaveInsuranceDataListEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.paydetail{
            interface BankOfferFilterEvent_S {
            }
            interface BankOfferFilterEvent_C extends BankOfferFilterEvent_S {
                new(fieldFilterMap:$.java.util.Map):BankOfferFilterEvent;
            }
            interface BankOfferFilterEvent$ {
                /**
                 * �ֶ����/�޸����������
                 * @param filter
                 */
                addFieldFilter(filter:$.kd.bos.orm.query.QFilter):void;
                getFieldFilterMap():$.java.util.Map;
                isPayFailEffect():boolean;
                setPayFailEffect(payFailEffect:boolean):void;
            }
            type BankOfferFilterEvent_T = BankOfferFilterEvent_S & BankOfferFilterEvent$;
            interface BankOfferFilterEvent extends BankOfferFilterEvent_T {
            }
            interface BankOfferExportSplitEvent_S {
            }
            interface BankOfferExportSplitEvent_C extends BankOfferExportSplitEvent_S {
                new(payDetailIds:$.java.util.List):BankOfferExportSplitEvent;
            }
            interface BankOfferExportSplitEvent$ {
                getExportSplitResultList():$.java.util.List;
                getPayDetailErrorMap():$.java.util.Map;
                getPayDetailIds():$.java.util.List;
                getSuccessSplit():boolean;
                setExportSplitResultList(exportSplitResultList:$.java.util.List):void;
                setPayDetailErrorMap(payDetailErrorMap:$.java.util.Map):void;
                setSuccessSplit(successSplit:boolean):void;
            }
            type BankOfferExportSplitEvent_T = BankOfferExportSplitEvent_S & BankOfferExportSplitEvent$;
            interface BankOfferExportSplitEvent extends BankOfferExportSplitEvent_T {
            }
            interface BankAccountModifyFilterEvent_S {
            }
            interface BankAccountModifyFilterEvent_C extends BankAccountModifyFilterEvent_S {
                new(fieldFilterMap:$.java.util.Map):BankAccountModifyFilterEvent;
            }
            interface BankAccountModifyFilterEvent$ {
                /**
                 * �ֶ����/�޸����������
                 * @param filter
                 */
                addFieldFilter(filter:$.kd.bos.orm.query.QFilter):void;
                getFieldFilterMap():$.java.util.Map;
                getInvalidMessage():string;
                isPayFailEffect():boolean;
                setInvalidMessage(invalidMessage:string):void;
                setPayFailEffect(payFailEffect:boolean):void;
            }
            type BankAccountModifyFilterEvent_T = BankAccountModifyFilterEvent_S & BankAccountModifyFilterEvent$;
            interface BankAccountModifyFilterEvent extends BankAccountModifyFilterEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.person{
            interface InitSyncPersonEvent_S {
            }
            interface InitSyncPersonEvent_C extends InitSyncPersonEvent_S {
                new():InitSyncPersonEvent;
            }
            interface InitSyncPersonEvent$ {
                getFormIdMap():$.java.util.Map;
                getParams():$.java.util.Map;
                setFormIdMap(formIdMap:$.java.util.Map):void;
                setParams(params:$.java.util.Map):void;
            }
            type InitSyncPersonEvent_T = InitSyncPersonEvent_S & InitSyncPersonEvent$;
            interface InitSyncPersonEvent extends InitSyncPersonEvent_T {
            }
            interface AfterSyncPersonCopyEvent_S {
            }
            interface AfterSyncPersonCopyEvent_C extends AfterSyncPersonCopyEvent_S {
                new():AfterSyncPersonCopyEvent;
            }
            interface AfterSyncPersonCopyEvent$ {
                getDestDyList():$.java.util.List;
                getDestEntity():string;
                getParams():$.java.util.Map;
                setDestDyList(destDyList:$.java.util.List):void;
                setDestEntity(destEntity:string):void;
                setParams(params:$.java.util.Map):void;
            }
            type AfterSyncPersonCopyEvent_T = AfterSyncPersonCopyEvent_S & AfterSyncPersonCopyEvent$;
            interface AfterSyncPersonCopyEvent extends AfterSyncPersonCopyEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.salarydetailresultexport{
            interface AfterBuildHeadEvent_S {
            }
            interface AfterBuildHeadEvent_C extends AfterBuildHeadEvent_S {
                new(sheet:any,taskInfo:$.kd.bos.dataentity.entity.DynamicObject,gridItemInfo:$.java.util.Map,headers:$.java.util.Map,currRowIndex:number):AfterBuildHeadEvent;
            }
            interface AfterBuildHeadEvent$ {
                /**
                 * ��ȡ��ǰ��������
                 * @return ��ǰ��������
                 */
                getCurrRowIndex():number;
                /**
                 * ��ȡ��Ŀ��Ϣ��
                 * @return ��Ŀ��Ϣ��(һ��keyΪ��Ŀ��Ψһ���룻����keyΪ�ֶ���Ϣ��������number��name��uniquecode��dataLength��dataType��scale��seq)
                 */
                getGridItemInfo():$.java.util.Map;
                /**
                 * ��ȡ��ͷ��Ϣ
                 * @return ��ͷ��Ϣ��ֵ��, key:��ͷ���������������������ֶκ���Ŀ��Ψһ���룻value����ͷ��ʾֵ
                 */
                getHeaders():$.java.util.Map;
                /**
                 * ��ȡSheetҳǩ
                 * @return Sheetҳǩ
                 */
                getSheet():any;
                /**
                 * ��ȡ����������Ϣ
                 * @return ����������Ϣ
                 */
                getTaskInfo():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���õ�ǰ��������
                 * @param currRowIndex ��ǰ��������
                 */
                setCurrRowIndex(currRowIndex:number):void;
                /**
                 * ������Ŀ��Ϣ��
                 * @param gridItemInfo ��Ŀ��Ϣ��(һ��keyΪ��Ŀ��Ψһ���룻����keyΪ�ֶ���Ϣ��������number��name��uniquecode��dataLength��dataType��scale��seq)
                 */
                setGridItemInfo(gridItemInfo:$.java.util.Map):void;
                /**
                 * ���ñ�ͷ��Ϣ
                 * @param headers ��ͷ��Ϣ��ֵ��, key:��ͷ���������������������ֶκ���Ŀ��Ψһ���룻value����ͷ��ʾֵ
                 */
                setHeaders(headers:$.java.util.Map):void;
                /**
                 * ����Sheetҳǩ
                 * @param sheet Sheetҳǩ
                 */
                setSheet(sheet:any):void;
                /**
                 * ���ú���������Ϣ
                 * @param taskInfo ����������Ϣ
                 */
                setTaskInfo(taskInfo:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type AfterBuildHeadEvent_T = AfterBuildHeadEvent_S & AfterBuildHeadEvent$;
            interface AfterBuildHeadEvent extends AfterBuildHeadEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.common.events.salaryfile{
            interface SalaryFileImportEvent_S {
            }
            interface SalaryFileImportEvent_C extends SalaryFileImportEvent_S {
                new(importEntityRel:kd.sdk.swc.hsas.common.entity.ImportEntityRel):SalaryFileImportEvent;
            }
            interface SalaryFileImportEvent$ {
                getImportEntityRel():kd.sdk.swc.hsas.common.entity.ImportEntityRel;
                setImportEntityRel(importEntityRel:kd.sdk.swc.hsas.common.entity.ImportEntityRel):void;
            }
            type SalaryFileImportEvent_T = SalaryFileImportEvent_S & SalaryFileImportEvent$;
            interface SalaryFileImportEvent extends SalaryFileImportEvent_T {
            }
            interface InitEmbedChildPageEvent_S {
            }
            interface InitEmbedChildPageEvent_C extends InitEmbedChildPageEvent_S {
                new(salaryFileBoId:long,customParams:$.java.util.Map,pageList:$.java.util.List,initPageDataDTO:kd.sdk.swc.hsas.common.dto.salaryfile.InitPageDataDTO):InitEmbedChildPageEvent;
            }
            interface InitEmbedChildPageEvent$ {
                getCustomParams():$.java.util.Map;
                getInitPageDataDTO():kd.sdk.swc.hsas.common.dto.salaryfile.InitPageDataDTO;
                getPageList():$.java.util.List;
                getSalaryFileBoId():long;
                setCustomParams(customParams:$.java.util.Map):void;
                setInitPageDataDTO(initPageDataDTO:kd.sdk.swc.hsas.common.dto.salaryfile.InitPageDataDTO):void;
                setPageList(pageList:$.java.util.List):void;
                setSalaryFileBoId(salaryFileBoId:long):void;
            }
            type InitEmbedChildPageEvent_T = InitEmbedChildPageEvent_S & InitEmbedChildPageEvent$;
            interface InitEmbedChildPageEvent extends InitEmbedChildPageEvent_T {
            }
            interface SalaryFileBeforeValidateDepEmpDateEvent_S {
            }
            interface SalaryFileBeforeValidateDepEmpDateEvent_C extends SalaryFileBeforeValidateDepEmpDateEvent_S {
                new():SalaryFileBeforeValidateDepEmpDateEvent;
            }
            interface SalaryFileBeforeValidateDepEmpDateEvent$ {
                getValidate():boolean;
                setValidate(validate:boolean):void;
            }
            type SalaryFileBeforeValidateDepEmpDateEvent_T = SalaryFileBeforeValidateDepEmpDateEvent_S & SalaryFileBeforeValidateDepEmpDateEvent$;
            interface SalaryFileBeforeValidateDepEmpDateEvent extends SalaryFileBeforeValidateDepEmpDateEvent_T {
            }
            interface AfterEmbedChildPageEvent_S {
            }
            interface AfterEmbedChildPageEvent_C extends AfterEmbedChildPageEvent_S {
                new(view:$.kd.bos.form.IFormView,salaryFileBoId:long,customParams:$.java.util.Map,pageIds:$.java.util.Map):AfterEmbedChildPageEvent;
            }
            interface AfterEmbedChildPageEvent$ {
                getCustomParams():$.java.util.Map;
                getPageIds():$.java.util.Map;
                getSalaryFileBoId():long;
                getView():$.kd.bos.form.IFormView;
                setCustomParams(customParams:$.java.util.Map):void;
                setPageIds(pageIds:$.java.util.Map):void;
                setSalaryFileBoId(salaryFileBoId:long):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type AfterEmbedChildPageEvent_T = AfterEmbedChildPageEvent_S & AfterEmbedChildPageEvent$;
            interface AfterEmbedChildPageEvent extends AfterEmbedChildPageEvent_T {
            }
            interface SalaryFileExportEvent_S {
            }
            interface SalaryFileExportEvent_C extends SalaryFileExportEvent_S {
                new(importEntityRel:kd.sdk.swc.hsas.common.entity.ImportEntityRel):SalaryFileExportEvent;
            }
            interface SalaryFileExportEvent$ {
                getImportEntityRel():kd.sdk.swc.hsas.common.entity.ImportEntityRel;
                setImportEntityRel(importEntityRel:kd.sdk.swc.hsas.common.entity.ImportEntityRel):void;
            }
            type SalaryFileExportEvent_T = SalaryFileExportEvent_S & SalaryFileExportEvent$;
            interface SalaryFileExportEvent extends SalaryFileExportEvent_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.calperson{
            interface ICalPersonListAutoSumPlugin_S {
            }
            interface ICalPersonListAutoSumPlugin$ {
                /**
                 * ��ȡн����ϸ����Ƿ��Զ��ϼ�
                 *
                 *  <pre><code>
                 *   @Override
                 *   public boolean isAutoSum() {
                 *       //true Ϊ�Զ��ϼ�
                 *       return true;
                 *   }
                 *  </code></pre>
                 */
                isAutoSum?():boolean;
                isShowSum?():boolean;
            }
            type ICalPersonListAutoSumPlugin_T = ICalPersonListAutoSumPlugin_S & ICalPersonListAutoSumPlugin$;
            interface ICalPersonListAutoSumPlugin extends ICalPersonListAutoSumPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.approve{
            interface ICreateApproveBillExtService_S {
            }
            interface ICreateApproveBillExtService$ {
                /**
                 *  @param createApproveBillValidateEvent
                 *  <pre><code>
                 * @Override
                 *      public void doValidate(CreateApproveBillValidateEvent createApproveBillValidateEvent) {
                 *          List<DynamicObject> calPayRollTasks = createApproveBillValidateEvent.getCalPayRollTasks();
                 *          //����У��������ʾ����Է�Ϊ�����������
                 *          //1��ȫ��ʧ�ܣ�ȡ����ǰ����������ͳһ��ʾ��
                 *          createApproveBillValidateEvent.setCancel(true);
                 *          createApproveBillValidateEvent.setErrorMessage("ȫ��ʧ�ܣ�ȡ����ǰ����������ͳһ��ʾ��");
                 *          //2��ȫ��ʧ�ܣ�ȡ����ǰ������δ����ͳһ��ʾ��Ǿ���Ҫÿһ����Ҫ������ʾ��
                 *          createApproveBillValidateEvent.setCancel(true);
                 *          Map<Long, String> validateResult = createApproveBillValidateEvent.getValidateResult();
                 *          for (DynamicObject calPayRollTask : calPayRollTasks) {
                 *              validateResult.put(calPayRollTask.getLong("id"), "����ԭ��");
                 *          }
                 *          //3������ʧ���Ҽ�������
                 *          for (int i = 0; i < calPayRollTasks.size(); i++) {
                 *              if (i / 2 == 0) {//ģ�ⲿ��ʧ��
                 *                  DynamicObject calPayRollTask = calPayRollTasks.get(i);
                 *                  validateResult.put(calPayRollTask.getLong("id"), "����ԭ��");
                 *              }
                 *          }
                 *          //4��ȫ��ʧ�ܲ���Ҫ����ȡ����ǰ����
                 *          for (DynamicObject calPayRollTask : calPayRollTasks) {
                 *              validateResult.put(calPayRollTask.getLong("id"), "����ԭ��");
                 *          }
                 *      }
                 *  </code></pre>
                 */
                doPreValidate(createApproveBillValidateEvent:kd.sdk.swc.hsas.common.events.approve.CreateApproveBillValidateEvent):void;
                /**
                 *  @param approveBillCalPersonDealEvent CreateApproveBillCalPersonDealEvent
                 *
                 *  <pre><code>
                 * public class CreateApproveBillExtPluginDemoImpl implements ICreateApproveBillExtService {
                 *      @Override
                 *      public void setCalPersonSet(CreateApproveBillCalPersonDealEvent approveBillCalPersonDealEvent) {
                 *          IFormView view = approveBillCalPersonDealEvent.getView();
                 *          // ��ȡ��ǰ���������ĺ�����������
                 *          Set<Long> calPersonSet = approveBillCalPersonDealEvent.getCalPersonSet();
                 *          // ���Ӷ��ι���У��
                 *          DynamicObjectCollection salaryfile = view.getModel().getDataEntity().getDynamicObjectCollection("salaryfile");
                 *          if(!CollectionUtils.isEmpty(salaryfile)){
                 *              Set<Long> fileSet = salaryfile.stream().map(data -> data.getLong("fbasedataid_id")).collect(Collectors.toSet());
                 *              SWCDataServiceHelper helper = new SWCDataServiceHelper("hsas_calperson");
                 *              QFilter filter = new QFilter("id",QFilter.in,calPersonSet);
                 *              filter.and(new QFilter("salaryfile",QFilter.in,fileSet));
                 *              DynamicObjectCollection collection = helper.queryOriginalCollection("id", new QFilter[]{filter});
                 *              calPersonSet = collection.stream().map(data -> data.getLong("id")).collect(Collectors.toSet());
                 *              //���ö��ι��˵ĺ�����������
                 *              approveBillCalPersonDealEvent.setCalPersonSet(calPersonSet);
                 *              if(!RequestContext.get().getUserName().contains("test")){
                 *                  // ���ô�����ʾ
                 *                  approveBillCalPersonDealEvent.setErrorCustomMsg("error is test");
                 *              }
                 *          }
                 *      }
                 *  }
                 *  </code></pre>
                 */
                setCalPersonSet(approveBillCalPersonDealEvent:kd.sdk.swc.hsas.common.events.approve.CreateApproveBillCalPersonDealEvent):void;
            }
            type ICreateApproveBillExtService_T = ICreateApproveBillExtService_S & ICreateApproveBillExtService$;
            interface ICreateApproveBillExtService extends ICreateApproveBillExtService_T {
            }
            interface IApproveOverViewDealExtService_S {
            }
            interface IApproveOverViewDealExtService$ {
                /**
                 * ������������������
                 *
                 * @param approveOverViewDealEvent
                 * <pre><code>
                 * @Override
                 *     public void dealOverViewValue(ApproveOverViewDealEvent approveOverViewDealEvent) {
                 *         String type = approveOverViewDealEvent.getType();
                 *         if (SWCStringUtils.equals(type, "preview")) {
                 *             //������ģ��Ԥ������Ĭ��ֵ����
                 *             approveOverViewDealEvent.setValue("88.88%");
                 *         } else if (SWCStringUtils.equals(type, "hsas_approvebill")) {
                 *             //������ҳ��
                 *             List<Long> calPersonIds = approveOverViewDealEvent.getCalPersonIds();
                 *             //������ģ���е�����
                 *             Map<String, Object> overViewEntry = approveOverViewDealEvent.getOverViewEntry();
                 *             //����������ģ���е����ý������ݲ�ѯ����װ
                 *             approveOverViewDealEvent.setValue("88.88%");
                 *         }
                 *
                 *     }
                 *  </code></pre>
                 */
                dealOverViewValue(approveOverViewDealEvent:kd.sdk.swc.hsas.common.events.approve.ApproveOverViewDealEvent):void;
            }
            type IApproveOverViewDealExtService_T = IApproveOverViewDealExtService_S & IApproveOverViewDealExtService$;
            interface IApproveOverViewDealExtService extends IApproveOverViewDealExtService_T {
            }
            interface IApproveInvokeReportFormExtService_S {
            }
            interface IApproveInvokeReportFormExtService$ {
                /**
                 *  @param approveInvokeReportFormEvent
                 *  <pre><code>
                 * @Override
                 *      public void filter(ApproveInvokeReportFormEvent approveInvokeReportFormEvent) {
                 *          //ʾ������ʾ�˹��˵�һ��ĺ��������򷢷���ϸ
                 *          DynamicObject approveBillDynamicObject = approveInvokeReportFormEvent.getApproveBillDynamicObject();
                 *          //�ɴ�н���������ϻ�ȡн���������е����ԣ����磬������ģ�壬������ģ��汾��������֯��н�ʺ�����
                 *          //��ȡ������ģ��汾����
                 *          DynamicObject approveBillTplv = approveBillDynamicObject.getDynamicObject("approvebilltplv");
                 *          //��ȡн�ʺ��������
                 *          DynamicObject payrollGroup = approveBillDynamicObject.getDynamicObject("payrollgroup");
                 *          String reportType = approveInvokeReportFormEvent.getReportType();
                 *          if ("3".equals(reportType)) {
                 *              //������ϸ��
                 *              String pageType = approveInvokeReportFormEvent.getPageType();
                 *              if (SWCStringUtils.equals(HSAS_APPROVEBILLPREVIEW, pageType)) {
                 *                  List<Long> calPersonIds = approveInvokeReportFormEvent.getCalPersonIds();
                 *                  if (calPersonIds != null && calPersonIds.size() > 1) {
                 *                      List<List<Long>> partition = Lists.partition(calPersonIds, calPersonIds.size() / 2);
                 *                      approveInvokeReportFormEvent.setCalPersonIds(partition.get(1));
                 *                  }
                 *                  //���������й���
                 *              } else {
                 *                  List<Long> payDetailIds = approveInvokeReportFormEvent.getPayDetailIds();
                 *                  //�Է�����ϸ���й���
                 *                  if (payDetailIds != null && payDetailIds.size() > 1) {
                 *                      List<List<Long>> partition = Lists.partition(payDetailIds, payDetailIds.size() / 2);
                 *                      approveInvokeReportFormEvent.setCalPersonIds(partition.get(1));
                 *                  }
                 *              }
                 *          } else {
                 *              //н����ϸ�� н�ʻ��ܱ�
                 *              List<Long> calPersonIds = approveInvokeReportFormEvent.getCalPersonIds();
                 *              //���������й���
                 *              if (calPersonIds != null && calPersonIds.size() > 1) {
                 *                  List<List<Long>> partition = Lists.partition(calPersonIds, calPersonIds.size() / 2);
                 *                  approveInvokeReportFormEvent.setCalPersonIds(partition.get(1));
                 *              }
                 *  // ���ջ���� approveInvokeReportFormEvent �е�calPersonIds ����н�����ݵĹ���
                 *          }
                 *      }
                 *  </code></pre>
                 */
                filter?(approveInvokeReportFormEvent:kd.sdk.swc.hsas.common.events.approve.ApproveInvokeReportFormEvent):void;
                /**
                 * @param dealEvent
                 * <code><pre>
                 *     @Override
                 *     public void referReportDeal(ApproveReferReportDealEvent dealEvent) {
                 *         // ��ȡ������ģ��������ͼ����
                 *         DynamicObject schemeDy = dealEvent.getSchemeDy();
                 *         // ��ȡ����Դ
                 *         String referReport = schemeDy.getString("referreport");
                 *         if("4".equals(referReport)) {
                 *             //���б�ҳ��
                 *             ListShowParameter listShowParameter = new ListShowParameter();
                 *             listShowParameter.setHasRight(true);
                 *             listShowParameter.setBillFormId("hsas_paydetail");
                 *             ListFilterParameter listFilterParameter = new ListFilterParameter();
                 *             //�������ݹ�������
                 *             listFilterParameter.setFilter(new QFilter("calpersonid", QFilter.in, dealEvent.getCalPersonIdList()));
                 *             listShowParameter.setListFilterParameter(listFilterParameter);
                 *             dealEvent.setShowParameter(listShowParameter);
                 *         }else {
                 *             //�򿪱���ҳ��
                 *             ReportShowParameter showParameter = new ReportShowParameter();
                 *             // С��
                 *             String sumtype = schemeDy.getString("sumtype");
                 *             // �Ƿ���ʾ�ܼ�
                 *             boolean isdisplaytotal = schemeDy.getBoolean("isdisplaytotal");
                 *             String schemename = schemeDy.getString("schemename");
                 *             // ����򿪷�ʽ��1=ԭҳ�棬2=����
                 *             showParameter.setCustomParam("openway", "2");
                 *             QFilter filter = new QFilter("id",QFilter.in, dealEvent.getCalPersonIdList());
                 *             String idList = SerializationUtils.toJsonString(filter);
                 *             // ������
                 *             showParameter.setCustomParam("filter", idList);
                 *             showParameter.setFormId("hsas_salarydetailrpt_inh");
                 *             // С������ 0����ʾС�� ��1����ʾ��ϸ ��2��ʾ��ϸ��С��
                 *             showParameter.setCustomParam("sumtypesign", sumtype);
                 *             SWCDataServiceHelper reportschemeHelper =
                 *                     new SWCDataServiceHelper(SWCEntityConstants.HSAS_SALARYRPTDISPLAYSCHM);
                 *             QFilter filterScheme = new QFilter("1",QFilter.equals,1);
                 *             DynamicObject reportScheme = reportschemeHelper.queryOne("id", filterScheme.toArray(), "createtime desc");
                 *             // ��ʾ����
                 *             showParameter.setCustomParam("displayscheme", reportScheme.getLong("id"));
                 *             // ��ʾ�ܼ���
                 *             showParameter.setCustomParam("isshowtotal", isdisplaytotal);
                 *             showParameter.setCustomParam("isExportByParentMethod", Boolean.TRUE);
                 *             showParameter.setCustomParam("schemename", schemename);
                 *             // �޸�Caption = �޸������ļ�����
                 *             FormConfig formConfig = FormMetadataCache.getFormConfig(showParameter.getFormId());
                 *             formConfig.setCaption(new LocaleString(schemename));
                 *             showParameter.setFormConfig(formConfig);
                 *
                 *             SWCDataServiceHelper serviceHelper = new SWCDataServiceHelper("bd_currency");
                 *             QFilter currencyFilter = new QFilter(ID, QFilter.equals, SWCBaseConstants.INT_ONE);
                 *             DynamicObject currencyDy =
                 *                     serviceHelper.queryOne("id,name,amtprecision,priceprecision,sign", new QFilter[]{currencyFilter});
                 *             showParameter.setCustomParam("calcurrency", SerializationUtils.serializeToBase64(currencyDy));
                 *
                 *             dealEvent.setShowParameter(showParameter);
                 *
                 *         }
                 *     }
                 * </pre></code>
                 */
                referReportDeal?(dealEvent:kd.sdk.swc.hsas.common.events.approve.ApproveReferReportDealEvent):void;
                /**
                 * @param downEvent
                 * <code><pre>
                 *      @Override
                 *     public void referReportDown(ApproveReferReportDownEvent downEvent) {
                 *         //����������ҳ��
                 *         IFormView parentView = downEvent.getParentView();
                 *         //��ǰ��������ҳ��
                 *         IFormView downView = downEvent.getDownView();
                 *         //����Դ
                 *         String referReport = downEvent.getReferReport();
                 *         if ("4".equals(referReport)) {
                 *             //�б�����
                 *             OperateOption option = OperateOption.create();
                 *             option.setVariableValue(OperateOptionConst.ISHASRIGHT, "true");
                 *             downView.invokeOperation("exportlist", option);
                 *             parentView.sendFormAction(downView);
                 *         } else {
                 *             //��������
                 *             ReportList reportList = downView.getControl("reportlistap");
                 *             if (null != reportList) {
                 *                 AbstractReportListModel model = (AbstractReportListModel) reportList.getReportModel();
                 *                 ReportTaskResult result = model.getReportTaskResult();
                 *                 if (result == null) {
                 *                     // �����ˢ�£��ᵼ�µ�ǰ�б�����ʱȡ���������Ϊ�ձ���
                 *                     ((ReportView) downView).refresh();
                 *                 }
                 *                 String url = reportList.exportExcel();
                 *                 // ƽ̨�¼�Ȩ�޲������������б���Ȩ�޲��������⣬ֱ���滻��Ӱ������
                 *                 if (url.contains("attachId=")) {
                 *                     url = url.replace("attachId=", "noattachId=");
                 *                 }
                 *                 parentView.download(url);
                 *                 parentView.sendFormAction(downView);
                 *             }
                 *         }
                 *     }
                 * </pre></code>
                 */
                referReportDown?(downEvent:kd.sdk.swc.hsas.common.events.approve.ApproveReferReportDownEvent):void;
            }
            type IApproveInvokeReportFormExtService_T = IApproveInvokeReportFormExtService_S & IApproveInvokeReportFormExtService$;
            interface IApproveInvokeReportFormExtService extends IApproveInvokeReportFormExtService_T {
            }
            interface IApproveSpecialRuleVerifyExtPlugin_S {
            }
            interface IApproveSpecialRuleVerifyExtPlugin$ {
                /**
                 *  @param event AfterSalaryCalEvent
                 *
                 *  <pre><code>
                 * public class ApproveSpecialRuleVerifyExtPluginDemoImpl implements IApproveSpecialRuleVerifyExtPlugin {
                 *
                 *      @Override
                 *      public void afterVerifySpecialRule(AfterVerifySpecialRuleEvent event) {
                 *          //��ǰ��������̬ʵ��
                 *          DynamicObject approve = event.getApprove();
                 *          //��ǰ������ʹ��������ģ����������¼��
                 *          DynamicObject specialDy = event.getSpecialDy();
                 *          //�Ƿ�ƥ�䵱ǰ���� true - ƥ�� false - ��ƥ��
                 *          Boolean conformRule = event.getConformRule();
                 *          event.setConformRule(Boolean.TRUE);
                 *      }
                 *  }
                 *  </code></pre>
                 */
                afterVerifySpecialRule?(event:kd.sdk.swc.hsas.common.events.approve.AfterVerifySpecialRuleEvent):void;
            }
            type IApproveSpecialRuleVerifyExtPlugin_T = IApproveSpecialRuleVerifyExtPlugin_S & IApproveSpecialRuleVerifyExtPlugin$;
            interface IApproveSpecialRuleVerifyExtPlugin extends IApproveSpecialRuleVerifyExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.formula{
            interface IFormulaItemTreeExtPlugin_S {
            }
            interface IFormulaItemTreeExtPlugin$ {
                /**
                 * ����н����Ŀ���ڵ�
                 * @param event
                 */
                resetSalaryItemParentNode?(event:kd.sdk.swc.hsas.common.events.formula.BeforeBuildItemTreeEvent):void;
            }
            type IFormulaItemTreeExtPlugin_T = IFormulaItemTreeExtPlugin_S & IFormulaItemTreeExtPlugin$;
            interface IFormulaItemTreeExtPlugin extends IFormulaItemTreeExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.paydetail{
            interface IBankOfferExtPlugin_S {
            }
            interface IBankOfferExtPlugin$ {
                /**
                 *  @param event BankOfferFilterEvent
                 *
                 * <pre><code>
                 * public class BankOfferFilterTest implements IBankOfferExtPlugin {
                 *
                 *      @Override
                 *      public void beforeBankOfferFilter(BankOfferFilterEvent event) {
                 *          // ��Ӹ���״̬Ϊ�ݴ����ݵĹ�������
                 *          QFilter payStateFilter = new QFilter("paystate", QFilter.equals, "0");
                 *          // ��ӵ������¼���
                 *          event.addFieldFilter(payStateFilter);
                 *      }
                 *  }
                 *  </code></pre>
                 */
                beforeBankOfferFilter?(event:kd.sdk.swc.hsas.common.events.paydetail.BankOfferFilterEvent):void;
            }
            type IBankOfferExtPlugin_T = IBankOfferExtPlugin_S & IBankOfferExtPlugin$;
            interface IBankOfferExtPlugin extends IBankOfferExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.resultcover{
            interface ICalResultCoverSalaryItemExtPlugin_S {
            }
            interface ICalResultCoverSalaryItemExtPlugin$ {
                /**
                 * @param event
                 *
                 * <pre><code>
                 * public class CalResultCoverSalaryItemExtPlugin implements ICalResultCoverSalaryItemExtPlugin {
                 *
                 *     private static final Log log = LogFactory.getLog(CalResultCoverSalaryItemExtPlugin.class);
                 *
                 *     @Override
                 *     public void fillExtSalaryItem(CalResultCoverSalaryItemEvent event) {
                 *         log.info("�������������н����Ŀ��չ���");
                 *         List<Long> salaryItemList = new ArrayList<>(1);
                 *         salaryItemList.add(1389815057520536576L);
                 *         event.setExcludeItemIdList(salaryItemList);
                 *         event.setCalTaskId(1924753424348462080L);
                 *     }
                 * }
                 * </code></pre>
                 */
                fillExtSalaryItem?(event:kd.sdk.swc.hsas.common.events.calperson.CalResultCoverSalaryItemEvent):void;
            }
            type ICalResultCoverSalaryItemExtPlugin_T = ICalResultCoverSalaryItemExtPlugin_S & ICalResultCoverSalaryItemExtPlugin$;
            interface ICalResultCoverSalaryItemExtPlugin extends ICalResultCoverSalaryItemExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.salarydetailresult{
            interface ISalaryDetailResultExportExtPlugin_S {
            }
            interface ISalaryDetailResultExportExtPlugin$ {
                /**
                 * @param args
                 *
                 * <pre><code>
                 * import kd.sdk.swc.hsas.formplugin.extpoint.salarydetailresult.ISalaryDetailResultExportPlugin;
                 * import kd.sdk.swc.hsas.common.events.salarydetailresultexport.AfterBuildHeadEvent;
                 *
                 * public class SalaryDetailResultExportExtPlugin_demo implements ISalaryDetailResultExportPlugin {
                 *
                 *     public void afterBuildHead(AfterBuildHeadEvent arg) {
                 *         // ����һ������
                 *         arg.getSheet().createRow(arg.getCurrRowIndex());
                 *
                 *         //�����н��д�����ϲ���Ԫ��� TODO
                 *
                 *         //����excel���������ʼ��
                 *         arg.setCurrRowIndex(arg.getCurrRowIndex()+1);
                 *     }
                 * }
                 * </code></pre>
                 */
                afterBuildHead?(args:kd.sdk.swc.hsas.common.events.salarydetailresultexport.AfterBuildHeadEvent):void;
            }
            type ISalaryDetailResultExportExtPlugin_T = ISalaryDetailResultExportExtPlugin_S & ISalaryDetailResultExportExtPlugin$;
            interface ISalaryDetailResultExportExtPlugin extends ISalaryDetailResultExportExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.salaryfile{
            interface ISalaryFileEditExtPlugin_S {
            }
            interface ISalaryFileEditExtPlugin$ {
                /**
                 * ��ʼ����ҳ��������������ϸ���ҳ��
                 *
                 * <pre><code>
                 *
                 * public class JnrcEditDemoExtPlugin implements ISalaryFileEditExtPlugin {
                 *
                 *     public void initEmbedChildPage(InitEmbedChildPageEvent args) {
                 *         args.getInitPageDataDTO().getHidePages().add(SalaryFileConstants.PAGE_HSAS_ITEMGRPCFG);
                 *     }
                 *
                 *     //��������չ��״̬����ҳ��ʱչ����Ƕ��ҵ��ҳ���ʱ��չ��
                 *     private static void setParentAdvCollapsible(IFormView formView, String flexKey, Boolean collapsible) {
                 *         Map<String, Object> map = new HashMap<>(1);
                 *         map.put(ClientProperties.Collapsible, collapsible);
                 *         formView.updateControlMetadata(flexKey, map);
                 *     }
                 *
                 *     public void afterEmbedChildPage(AfterEmbedChildPageEvent args) {
                 *         String pageNumber = "kdtest_hsas_jinengrencai"; //ҳ��Ԫ���ݱ�ʶ
                 *         String flexNumber = "kdtest_jl_flex_jineng"; //���������Ƕ���flex��Ϣ��ؼ���ʶ
                 *
                 *         Map<String, String> pageIds = args.getPageIds();
                 *         Map<String, Object> customParams = args.getCustomParams();
                 *         //salaryfileid -> 1677432333910672384
                 *         Long salaryfileid = Long.parseLong(String.valueOf(customParams.get("salaryfileid")));
                 *
                 *         Long relatedPkId = 0L;//�����˲�����id,û�����ݴ�0
                 *
                 *         SWCDataServiceHelper helper = new SWCDataServiceHelper(pageNumber);
                 *         QFilter fileIdFilter = new QFilter(getFileProp(pageNumber), QFilter.equals, salaryfileid);
                 *         QFilter hisCurrFilter = BaseDataHisHelper.getHisCurrFilter();
                 *         //��������ݣ�Ӧ��ֻ��1��
                 *         DynamicObject[] datas = helper.query("id", new QFilter[]{fileIdFilter, hisCurrFilter});
                 *         if (datas != null && datas.length >= 1) {
                 *             relatedPkId = datas[0].getLong("id");
                 *         }
                 *
                 *         String showMessage = ResManager.loadKDString("���޼����˲Ŷ�����������", "JnrcEditExtPlugin_90", "swc-hsas-business");
                 *         customParams.put(SalaryFileConstants.EMPTY_PAGE_SHOW_MSG, showMessage);
                 *
                 *         // ��Ȩ
                 *         boolean hasPerm = checkPermission(SWCPermissionConstants.PERMISSION_QUERY, pageNumber);
                 *         if (hasPerm) {
                 *             if (null == relatedPkId || relatedPkId.compareTo(0L) == 0) {
                 *                 // ����������
                 *                 showDefaultEmptyPage(args.getView(), customParams, pageNumber, flexNumber);
                 *             } else {
                 *                 // ����������
                 *                 String pageId = asyncEmbedPage(args.getView(), flexNumber, pageNumber, relatedPkId, customParams);
                 *                 pageIds.put(pageNumber, pageId);
                 *             }
                 *
                 *         } else {
                 *             //û��Ȩ�������ش���Ϣ��
                 *             args.getView().setVisible(Boolean.FALSE, flexNumber);
                 *         }
                 *     }
                 *
                 *     //��ȡ�������ԣ�Ĭ��Ӧ��salaryfile�����������Լ����壬���û�е����ֶξͲ��ù�����
                 *     private String getFileProp(String pageName) {
                 *         String fileProp = null;
                 *
                 *         Map<String, IDataEntityProperty> mainEntityType = EntityMetadataCache.getDataEntityType(pageName).getFields();
                 *         for(Map.Entry<String, IDataEntityProperty> entry: mainEntityType.entrySet()){
                 *             if(entry.getValue() instanceof BasedataProp){
                 *                 BasedataProp prop = ((BasedataProp) entry.getValue());
                 *                 if (SWCEntityConstants.HSAS_SALARYFILE.equals(prop.getBaseEntityId())) {
                 *                     fileProp = entry.getKey();
                 *                     break;
                 *                 }
                 *             }
                 *         }
                 *
                 *         return fileProp;
                 *     }
                 *
                 *     //�첽Ƕ��ҳ��
                 *     private String asyncEmbedPage(IFormView view, String targetKey, String pageNumber, Long pkId, Map<String, Object> customParams) {
                 *         //��������չ��״̬
                 *         setParentAdvCollapsible(view, targetKey, Boolean.FALSE);
                 *
                 *         BaseShowParameter showParameter = new BaseShowParameter();
                 *         showParameter.getOpenStyle().setShowType(ShowType.InContainer);
                 *         showParameter.getOpenStyle().setTargetKey(targetKey);
                 *         showParameter.setFormId(pageNumber);
                 *         showParameter.setCustomParams(customParams);
                 *         showParameter.setSendToClient(true);
                 *         if (null != pkId && !pkId.equals(0L)) {
                 *             showParameter.setPkId(pkId);
                 *             showParameter.setStatus(OperationStatus.VIEW);
                 *         }
                 *
                 *         view.showForm(showParameter);
                 *         return showParameter.getPageId();
                 *     }
                 *
                 *     //��֤Ȩ��
                 *     private boolean checkPermission(String permItemId, String entityName) {
                 *         Long userId = RequestContext.get().getCurrUserId();
                 *         boolean hasPerm = SWCPermissionServiceHelper.hasPerm(userId, "/UHMBBGZQ65X", entityName, permItemId);
                 *         return hasPerm;
                 *     }
                 *
                 *     //��ʾ��ҳ��
                 *     private void showDefaultEmptyPage(IFormView view, Map<String, Object> customParams, String pageNumber, String targetFlex) {
                 *         //��ҳ��ʱչ��
                 *         setParentAdvCollapsible(view, targetFlex, Boolean.TRUE);
                 *
                 *         String status = (String) customParams.get(SWCBaseConstants.STATUS);
                 *         String isOnlyView = (String) customParams.get("isOnlyView");
                 *
                 *         // ����״̬Ϊ�ѷ��������ύʱ�����ɱ༭
                 *         DefaultEmptyPageEnum pageType = DefaultEmptyPageEnum.NEW_DATA_PAGE_TYPE;
                 *         if (SWCBaseConstants.STATUS_ABANDONED.equals(status) || SWCBaseConstants.STATUS_SUBMIT.equals(status) || "true".equals(isOnlyView)) {
                 *             pageType = DefaultEmptyPageEnum.VIEW_DATA_PAGE_TYPE;
                 *         }
                 *
                 *         DefaultEmptyPage defaultEmptyPage = new DefaultEmptyPage(pageType, targetFlex, ShowType.InContainer);
                 *         Map<String, Object> params = defaultEmptyPage.getCustomParams();
                 *         params.put(SalaryFileConstants.PAGE_NUMBER, pageNumber);
                 *         params.put(SalaryFileConstants.TARGET_FLEX, targetFlex);
                 *         params.putAll(customParams);
                 *
                 *         defaultEmptyPage.setShowMessage(String.valueOf(customParams.get(SalaryFileConstants.EMPTY_PAGE_SHOW_MSG)));
                 *
                 *         view.showForm(defaultEmptyPage.getFormShowParameter());
                 *     }
                 * }
                 *
                 * </code></pre>
                 *
                 * @param args Ƕ����ҳ��֮����¼�����������id��ҳ����ͼ����Ϣ
                 */
                afterEmbedChildPage?(args:kd.sdk.swc.hsas.common.events.salaryfile.AfterEmbedChildPageEvent):void;
                /**
                 * ��ʼ����ҳ��ʱ�����ر�Ʒ�ĸ���ҳ��
                 *
                 * <pre><code>
                 *
                 *     public void initEmbedChildPage(InitEmbedChildPageEvent args) {
                 *         //�������ر�Ʒ����Ŀ�ʸ������ø��� SalaryFileConstants.PAGE_HSAS_ITEMGRPCFG
                 *         args.getInitPageDataDTO().getHidePages().add(SalaryFileConstants.PAGE_HSAS_ITEMGRPCFG);
                 *     }
                 *
                 * </code></pre>
                 *
                 * @param args ��ʼ�������¼�����������id��ҳ���������Ϣ
                 */
                initEmbedChildPage?(args:kd.sdk.swc.hsas.common.events.salaryfile.InitEmbedChildPageEvent):void;
            }
            type ISalaryFileEditExtPlugin_T = ISalaryFileEditExtPlugin_S & ISalaryFileEditExtPlugin$;
            interface ISalaryFileEditExtPlugin extends ISalaryFileEditExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.formplugin.extpoint.salaryrpt{
            interface ISalaryDisplaySchemeExtPlugin_S {
            }
            interface ISalaryDisplaySchemeExtPlugin$ {
                /**
                 * �Ƿ��Զ����н����Ŀ�Ķ�����ͷ��Ϊtrueֵʱ����ʾ�������н����Ŀʱ���Զ���н����Ŀ�����������Ϊ������ͷ
                 * @return
                 */
                isAutoAddSalaryItemType?():boolean;
            }
            type ISalaryDisplaySchemeExtPlugin_T = ISalaryDisplaySchemeExtPlugin_S & ISalaryDisplaySchemeExtPlugin$;
            interface ISalaryDisplaySchemeExtPlugin extends ISalaryDisplaySchemeExtPlugin_T {
            }
        }
        namespace kd.sdk.swc.hsas.service.spi{
            interface CalResultQueryService_S {
                /**
                 * ��ȡCalPersonQueryServiceʵ������
                 *
                 * @return
                 */
                get():CalResultQueryService;
            }
            interface CalResultQueryService$ {
                /**
                 * ��ȡָ����Ŀ����Ŀ��Ϣ����н����ĿITEMSL��ȡ����ĿITEMFT��ҵ����ĿITEMBS��֧����ĿITEMSP���ֱ��ȡ��
                 *
                 * @param itemType   ��Ŀ���ͣ�kd.sdk.swc.hsas.common.enums.SalaryItemTypeEnum.XXX.getCode()
                 * @param itemIdList ָ��������ĿID����
                 * @return Map<��ĿID �� Map < ���� �� ֵ>>
                 * ��Ŀ���԰���number����Ŀ���룬name����Ŀ���ƣ�
                 * storageType:�洢���ͣ��ı�text����ֵnum������date�����amount����
                 * showType����ʾ���ͣ��ı�text,С��num,����int,���amount,����date,��ѡ��bool����
                 * uniqueCode����ĿΨһ����
                 * --��������ҵ����Ŀ������
                 * scale:���ݾ���
                 * dataround:��λ��ʽ��1010���������룬1020�������������֣���λ����1030�������������֣���λ����
                 * datalength:���ݳ���
                 */
                getCalItemMap?(itemType:string,itemIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ��������ѯ��������ID����
                 *
                 * @param qFilters ��ѯ�������������ڲ�ѯ����hsas_salarycalresultquery��������ز�ѯ����
                 * @param orderBys �������������ڲ�ѯ����hsas_salarycalresultquery��������ز�ѯ����
                 * @param start    ��ҳ��������ʼ����
                 * @param limit    ��ҳ������ÿҳ����������-1ʱ����ҳ
                 * @return List<Long>
                 */
                getCalPersonIds?(qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.java.util.List;
                /**
                 * ָ����������ID����,��ѯ�������������Ϣ����
                 *
                 * @param calPersonFields ��ѯ���ԣ����ڲ�ѯ����hsas_salarycalresultquery
                 * @param pkList          ��������ID����
                 * @param orderBys        �������������ڲ�ѯ����hsas_salarycalresultquery��������������ֶ�
                 * @return DynamicObjectCollection
                 */
                getCalPersonInfos(calPersonFields:$.java.util.List,pkList:$.java.util.List,orderBys:string,start:number,limit:number):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ��������ѯ�������������Ϣ����
                 *
                 * @param calPersonFields ��ѯ���ԣ����ڲ�ѯ����hsas_salarycalresultquery
                 * @param qFilters        ��ѯ�������������ڲ�ѯ����hsas_salarycalresultquery��������ز�ѯ����
                 * @param orderBys        �������������ڲ�ѯ����hsas_salarycalresultquery��������������ֶ�
                 * @param start           ��ҳ��������ʼ����
                 * @param limit           ��ҳ������ÿҳ����������-1ʱ����ҳ
                 * @return DynamicObjectCollection
                 */
                getCalPersonInfos(calPersonFields:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ��ȡָ����Ŀн����ϸ�����н����ĿITEMSL��ȡ����ĿITEMFT��ҵ����ĿITEMBS��֧����ĿITEMSP���ֱ��ȡ��
                 *
                 * @param calPersonIdList ��������ID����
                 * @param itemType        ��Ŀ���ͣ���kd.sdk.swc.hsas.common.enums.SalaryItemTypeEnum.ITEMSL.getCode()
                 * @param itemIdList      ָ��������ĿID����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getCalResult(calPersonIdList:$.java.util.List,itemType:string,itemIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡָ����Ŀн����ϸ�����н����ĿITEMSL��ȡ����ĿITEMFT��ҵ����ĿITEMBS��֧����ĿITEMSP���ֱ��ȡ��
                 *
                 * @param calPersonIdList ��������ID����
                 * @param itemType        ��Ŀ���ͣ���kd.sdk.swc.hsas.common.enums.SalaryItemTypeEnum.ITEMSL.getCode()
                 * @param itemInfoMap      ָ��������Ŀ����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getCalResult(calPersonIdList:$.java.util.List,itemType:string,itemInfoMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ȡָ����Ŀн����ϸ�����н����ĿITEMSL��ȡ����ĿITEMFT��ҵ����ĿITEMBS��֧����ĿITEMSP���ֱ��ȡ��
                 *
                 * @param calTableIdList �����б�ID����
                 * @param itemType       ��Ŀ���ͣ���kd.sdk.swc.hsas.common.enums.SalaryItemTypeEnum.ITEMSL.getCode()
                 * @param itemInfoMap     ָ��������Ŀ����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getCalResultByCalTableId(calTableIdList:$.java.util.List,itemType:string,itemInfoMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ȡָ����Ŀн����ϸ�����н����ĿITEMSL��ȡ����ĿITEMFT��ҵ����ĿITEMBS��֧����ĿITEMSP���ֱ��ȡ��
                 *
                 * @param calTableIdList �����б�ID����
                 * @param itemType       ��Ŀ���ͣ���kd.sdk.swc.hsas.common.enums.SalaryItemTypeEnum.ITEMSL.getCode()
                 * @param itemIdList     ָ��������ĿID����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getCalResultByCalTableId(calTableIdList:$.java.util.List,itemType:string,itemIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡн����Ŀ��ʽ��ʵ��ʹ�õ�ҵ����Ŀ��Ӧ��ҵ������
                 * @param requestMap
                 * @return
                 */
                getSalaryItemRelBizItemResult?(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ȡн����Ŀн����ϸ�����н����Ŀ��
                 *
                 * @param calPersonIdList  ��������ID����
                 * @param salaryItemIdList н����ĿID����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getSalaryResult(calPersonIdList:$.java.util.List,salaryItemIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡн����Ŀн����ϸ�����н����Ŀ��
                 *
                 * @param calPersonIdList  ��������ID����
                 * @param salaryItemInfoMap н����Ŀ����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getSalaryResult(calPersonIdList:$.java.util.List,salaryItemInfoMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ȡн����Ŀн����ϸ�����н����Ŀ��
                 *
                 * @param calTableIdList   �����б�ID����
                 * @param salaryItemInfoMap н����Ŀ����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getSalaryResultByCalTableId(calTableIdList:$.java.util.List,salaryItemInfoMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ȡн����Ŀн����ϸ�����н����Ŀ��
                 *
                 * @param calTableIdList   �����б�ID����
                 * @param salaryItemIdList н����ĿID����
                 * @return Map<��������ID �� Map < ��ĿID �� ֵ>>
                 */
                getSalaryResultByCalTableId(calTableIdList:$.java.util.List,salaryItemIdList:$.java.util.List):$.java.util.Map;
            }
            type CalResultQueryService_T = CalResultQueryService_S & CalResultQueryService$;
            interface CalResultQueryService extends CalResultQueryService_T {
            }
            interface CalPersonListService_S {
                /**
                 * ��ȡCalPersonListServiceʵ������
                 *
                 * @return
                 */
                get():CalPersonListService;
            }
            interface CalPersonListService$ {
                /**
                 * ��ȡ��������ɸ��µ���Ϣ
                 *
                 * @param id �������������id
                 * @return ������Ϣ {"addFileHisIds": [111], "updateFileIds": [11111], "delFileIds": [11001]}
                 * addFileHisIds-����ӵĵ����汾id����
                 * updateFileIds-�����µĵ���boid����
                 * delFileIds-��ɾ���ĵ���boid����
                 */
                getUpdateInfoByTaskId?(id:long):$.java.util.Map;
            }
            type CalPersonListService_T = CalPersonListService_S & CalPersonListService$;
            interface CalPersonListService extends CalPersonListService_T {
            }
        }
        namespace kd.sdk.swc.hsbp{
            interface SdkHsbpModule_S {
            }
            type SdkHsbpModule_ST = $.kd.sdk.module.Module & SdkHsbpModule_S;
            interface SdkHsbpModule_C extends SdkHsbpModule_ST {
                new():SdkHsbpModule;
            }
            interface SdkHsbpModule$ {
            }
            type SdkHsbpModule_T = $.kd.sdk.module.Module & SdkHsbpModule_S & SdkHsbpModule$;
            interface SdkHsbpModule extends SdkHsbpModule_T {
            }
        }
        namespace kd.sdk.swc.hsbp.business.spi{
            interface SWCFilterCalSalaryFile_S {
                /**
                 * ��ȡSWCFilterCalSalaryFileʵ������
                 *
                 * @return
                 */
                get():SWCFilterCalSalaryFile;
            }
            interface SWCFilterCalSalaryFile$ {
                /**
                 * ���ݺ�������Id, ����������������������ĵ���BoID���ߺ��������еĵ���BoId�������ˣ����˳�������ǰ��ҵ���������ĵ���BoId
                 *
                 * @param taskId ��������Id
                 * @param currUserId ��ǰ�û�Id, ������գ��򲻶Ե���������Ȩ�޹���
                 * @param salaryFileIdList ��������������������ĵ���BoID���ߺ��������еĵ���BoId
                 * @return ���˳�������ǰ��ҵ���������ĵ���BoId
                 */
                filterSalaryFileBoIdsOnlyInBizData?(taskId:long,currUserId:long,salaryFileIdList:$.java.util.List):$.java.util.List;
            }
            type SWCFilterCalSalaryFile_T = SWCFilterCalSalaryFile_S & SWCFilterCalSalaryFile$;
            interface SWCFilterCalSalaryFile extends SWCFilterCalSalaryFile_T {
            }
            interface SWCSalaryParameterService_S {
                /**
                 * ��ȡSWCSalaryParameterServiceʵ������
                 *
                 * @return
                 */
                get():SWCSalaryParameterService;
            }
            interface SWCSalaryParameterService$ {
                /**
                 * ͨ�����������ȡн���������
                 *
                 * @param paramCfgNmber
                 * @return
                 */
                getSalaryParam(paramCfgNmber:string):$.java.util.Map;
                /**
                 * ͨ�����������ȡн�����������ָ��ֵ
                 *
                 * @param paramCfgNmber
                 * @param paramKey
                 * @return
                 */
                getSalaryParam(paramCfgNmber:string,paramKey:string):any;
            }
            type SWCSalaryParameterService_T = SWCSalaryParameterService_S & SWCSalaryParameterService$;
            interface SWCSalaryParameterService extends SWCSalaryParameterService_T {
            }
        }
        namespace kd.sdk.swc.hsbs{
            interface SdkHsbsModule_S {
            }
            type SdkHsbsModule_ST = $.kd.sdk.module.Module & SdkHsbsModule_S;
            interface SdkHsbsModule_C extends SdkHsbsModule_ST {
                new():SdkHsbsModule;
            }
            interface SdkHsbsModule$ {
            }
            type SdkHsbsModule_T = $.kd.sdk.module.Module & SdkHsbsModule_S & SdkHsbsModule$;
            interface SdkHsbsModule extends SdkHsbsModule_T {
            }
        }
        namespace kd.sdk.swc.hsbs.business.mservice.helper{
            interface BizItemServiceHelper_S {
                /**
                 * ������ȡҵ����Ŀ��ҵ����Ŀ������Ϣ
                 *
                 * @param paramList ҵ����Ŀid List
                 * @return
                 */
                getBizItemPropInfo(paramList:$.java.util.List):$.java.util.Map;
            }
            interface BizItemServiceHelper_C extends BizItemServiceHelper_S {
                new():BizItemServiceHelper;
            }
            interface BizItemServiceHelper$ {
            }
            type BizItemServiceHelper_T = BizItemServiceHelper_S & BizItemServiceHelper$;
            interface BizItemServiceHelper extends BizItemServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.hscs{
            interface SdkHscsModule_S {
            }
            type SdkHscsModule_ST = $.kd.sdk.module.Module & SdkHscsModule_S;
            interface SdkHscsModule_C extends SdkHscsModule_ST {
                new():SdkHscsModule;
            }
            interface SdkHscsModule$ {
            }
            type SdkHscsModule_T = $.kd.sdk.module.Module & SdkHscsModule_S & SdkHscsModule$;
            interface SdkHscsModule extends SdkHscsModule_T {
            }
        }
        namespace kd.sdk.swc.hscs.business.extpoint{
            interface ISalaryCalExtService_S {
            }
            interface ISalaryCalExtService$ {
                /**
                 *  @param event AfterSalaryCalEvent
                 *
                 *  <pre><code>
                 * public class SalaryCalExtService_demo implements ISalaryCalExtService {
                 *      private static Log log = LogFactory.getLog(SalaryCalExtServiceDemoImpl.class);
                 *
                 *      public void afterSalaryCal(AfterSalaryCalEvent event) {
                 *  	 //@param event н�ʼ�����ɺ��¼����������԰�����
                 *          //       Long taskId ��������ID�����ڻ�ȡ����������Ϣ
                 *          //       Long recordId ����ỰID
                 *          //       Long batchId ��������ID
                 *          //       String calType  �������ͣ�"onlyPreTaxCal"��������˰ǰ�� "preTaxCal":����˰ǰ��"afterTaxCal"������˰�󣩼��㱣������ڷֶμ���ʱ��������Σ�����˰ǰ�ͼ���˰�󣬿���ͨ���������ͽ����ж��Ƿ���Ҫ����ҵ����
                 *          //       List<Long> calPersonIdList  ��ǰ���κ�������Id���ϣ����ڻ�ȡ��Ҫ�������ϸ�����Ϣ
                 *          //       boolean isFinished �Ƿ������ɣ��жϵ�ǰ�μ����Ƿ����
                 *          //       String traceId ��־����ID����������־��ӡ
                 *          log.info("SalaryCalExtServiceDemoImpl start,params:"+event.toString());
                 *      }
                 *  }
                 *  </code></pre>
                 */
                afterSalaryCal?(event:kd.sdk.swc.hscs.common.events.AfterSalaryCalEvent):void;
            }
            type ISalaryCalExtService_T = ISalaryCalExtService_S & ISalaryCalExtService$;
            interface ISalaryCalExtService extends ISalaryCalExtService_T {
            }
            interface IHisDataCheckExtService_S {
            }
            interface IHisDataCheckExtService$ {
                /**
                 *  ����У��
                 *  @param evt
                 *  <pre><code>
                 * public class HisDataCheckExtServiceImpl implements IHisDataCheckExtService {
                 *
                 *     @Override
                 *     public void dataCheck(HisDataTaskCheckEvent evt) {
                 *          Map<Long, DynamicObject> dataMap = evt.getDataMap();
                 *          Map<Long, DataCheckFailDTO> checkFailDTOMap = new HashMap<>();
                 *          // �ж����������Ƿ�Ϊ��ʷ�����������ͣ�������ǣ��򷵻أ���Ϊֻ����ʷ�����������ͣ�����ģ�����н�ʺ��㳡���͹ҿ�������֯
                 *          if (!"1".equals(evt.getWriteTaskType())) {
                 *              return;
                 *          }
                 *          DynamicObject dataObj = null;
                 *          for (Map.Entry<Long, DynamicObject> entry : dataMap.entrySet()) {
                 *               dataObj = entry.getValue();
                 *              // У��н�ʺ��㳡���Ƿ���д
                 *              DynamicObject payrollsceneObj = dataObj.getDynamicObject("payrollscene");
                 *              if (payrollsceneObj == null) {
                 *                  DataCheckFailDTO failDTO = new DataCheckFailDTO();
                 *                  failDTO.setFailType("0"); // ������У��ʧ������
                 *                  failDTO.setFailMsgValue("kd001"); // н�ʺ��㳡��Ϊ��
                 *                  failDTO.setErrorElement(ResManager.loadKDString("н�ʺ��㳡��", "HisDataCheckExtServiceImpl_0", "swc-hsba-business"));
                 *                  checkFailDTOMap.put(entry.getKey(), failDTO);
                 *                  continue;
                 *              }
                 *              //У��ҿ�������֯�Ƿ���д
                 *              String adminOrgName = dataObj.getString("adminorgname");
                 *              if (adminOrgName == null || adminOrgName.trim().length() == 0) {
                 *                    DataCheckFailDTO failDTO = new DataCheckFailDTO();
                 *                    failDTO.setFailType("0"); // ������У��ʧ������
                 *                    failDTO.setFailMsgValue("kd002"); // �ҿ�������֯Ϊ��
                 *                    failDTO.setErrorElement(ResManager.loadKDString("��Աн�ʵ���", "HisDataCheckExtServiceImpl_0", "swc-hsba-business"));
                 *                    checkFailDTOMap.put(entry.getKey(), failDTO);
                 *                }
                 *           }
                 *           evt.setCheckFailMap(checkFailDTOMap);
                 *     }
                 *
                 * }
                 *  </pre></code>
                 */
                dataCheck?(evt:kd.sdk.swc.hscs.common.events.HisDataTaskCheckEvent):void;
            }
            type IHisDataCheckExtService_T = IHisDataCheckExtService_S & IHisDataCheckExtService$;
            interface IHisDataCheckExtService extends IHisDataCheckExtService_T {
            }
            interface ICalRollBackExtService_S {
            }
            interface ICalRollBackExtService$ {
                /**
                 * @param event CalRollBackEvent
                 *
                 * <pre><code>
                 *  public class CalRollBackExtServiceDemoImpl implements ICalRollBackExtService {
                 *     private static Log log = LogFactory.getLog(CalRollBackExtServiceDemoImpl.class);
                 *
                 *     @Override
                 *     public void calRollBack(CalRollBackEvent event) {
                 *         log.info("CalRollBackExtServiceDemoImpl_calrollback_begin");
                 *         // ��ȡ��ǰ�ع�������id
                 *         Long calTaskId = event.getCalTaskId();
                 *         // ��ȡ��ǰ�ع�������id����
                 *         List<Long> calPersonIdList = event.getCalPersonIdList();
                 *
                 *         // ��������������������Զ���ҵ���߼�
                 *
                 *     }
                 * }
                 *
                 * </code></pre>
                 */
                calRollBack?(event:kd.sdk.swc.hscs.common.events.CalRollBackEvent):void;
            }
            type ICalRollBackExtService_T = ICalRollBackExtService_S & ICalRollBackExtService$;
            interface ICalRollBackExtService extends ICalRollBackExtService_T {
            }
            interface IFetchResultCoverDataExtService_S {
            }
            interface IFetchResultCoverDataExtService$ {
                /**
                 *  ��ȡ�����������
                 *  @param event
                 *  <pre><code>
                 * public class FetchResultCoverDataExtServiceDemo implements IFetchResultCoverDataExtService{
                 *
                 *      private static final Log LOGGER = LogFactory.getLog(FetchResultCoverDataExtServiceDemo.class);
                 *
                 *      @Override
                 *      public void fetchCalResultCoverData(FetchResultCoverEvent event) {
                 *          // ��ȡ��ǰ����ĺ�������id����
                 *          List<Long> calPersonIdList = event.getCalPersonIdList();
                 *          // ��ȡ���������ǵ�н����Ŀid����
                 *          List<Long> salaryItemIdList = event.getSalaryItemIdList();
                 *          // ��ȡ�������н����Ŀ���ܽ��ֵ���϶���
                 *          // key:��������id, value:[key:н����ĿΨһ���룬value:���ֵ]
                 *          Map<Long, Map<String, Object>> slItemResultMap = event.getSlItemResultMap();
                 *          // ��ȡ�ֶν������н����Ŀ���ֶ�������ֵ����
                 *          // key:����������value:[key:н����ĿΨһ���룬value:<key:��������,value:���ֵ>] ,����������ɣ���ʼ���ڣ�yyyy-MM-dd��+"@"+��������(yyyy-MM-dd)���磺"2023-01-01@2023-01-15"
                 *          Map<Long,Map<String, Map<String, Object>>> slItemSectionResultMap = event.getSlItemSectionResultMap();
                 *
                 *          // ͨ���Զ���ҵ���߼���������װ����������ݵ��������������
                 *
                 *          event.setSlItemResultMap(slItemResultMap);
                 *          event.setSlItemSectionResultMap(slItemSectionResultMap);
                 *      }
                 *  }
                 *  </code></pre>
                 */
                fetchCalResultCoverData?(event:kd.sdk.swc.hscs.common.events.FetchResultCoverEvent):void;
            }
            type IFetchResultCoverDataExtService_T = IFetchResultCoverDataExtService_S & IFetchResultCoverDataExtService$;
            interface IFetchResultCoverDataExtService extends IFetchResultCoverDataExtService_T {
            }
            interface IQueryInsuranceDataExtService_S {
            }
            interface IQueryInsuranceDataExtService$ {
                setFilter?(evt:kd.sdk.swc.hscs.common.events.QueryInsuranceDataEvent):void;
            }
            type IQueryInsuranceDataExtService_T = IQueryInsuranceDataExtService_S & IQueryInsuranceDataExtService$;
            interface IQueryInsuranceDataExtService extends IQueryInsuranceDataExtService_T {
            }
        }
        namespace kd.sdk.swc.hscs.business.mservice.helper{
            interface HSCSCostAllotDetailServiceHelper_S {
                /**
                 * ���ɷ�̯��ϸ
                 *
                 * @param param ���
                 * @return ���ؽ����֧�ֲ��ֳɹ�
                 */
                generateAllotDetails(param:$.java.util.Map):$.java.util.Map;
            }
            interface HSCSCostAllotDetailServiceHelper_C extends HSCSCostAllotDetailServiceHelper_S {
                new():HSCSCostAllotDetailServiceHelper;
            }
            interface HSCSCostAllotDetailServiceHelper$ {
            }
            type HSCSCostAllotDetailServiceHelper_T = HSCSCostAllotDetailServiceHelper_S & HSCSCostAllotDetailServiceHelper$;
            interface HSCSCostAllotDetailServiceHelper extends HSCSCostAllotDetailServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.hscs.common.events{
            interface QueryInsuranceDataEvent_S {
            }
            interface QueryInsuranceDataEvent_C extends QueryInsuranceDataEvent_S {
                new(calTaskId:long):QueryInsuranceDataEvent;
            }
            interface QueryInsuranceDataEvent$ {
                addFilter(filter:$.kd.bos.orm.query.QFilter):void;
                getCalTaskId():long;
                getFilters():$.java.util.List;
                setCalTaskId(calTaskId:long):void;
                setFilters(filters:$.java.util.List):void;
            }
            type QueryInsuranceDataEvent_T = QueryInsuranceDataEvent_S & QueryInsuranceDataEvent$;
            interface QueryInsuranceDataEvent extends QueryInsuranceDataEvent_T {
            }
            interface FetchResultCoverEvent_S {
            }
            interface FetchResultCoverEvent_C extends FetchResultCoverEvent_S {
                new(calTaskId:long,calPersonIdList:$.java.util.List,salaryItemIdList:$.java.util.List,slItemResultMap:$.java.util.Map,slItemSectionResultMap:$.java.util.Map):FetchResultCoverEvent;
            }
            interface FetchResultCoverEvent$ {
                /**
                 * ��ȡ��������id����
                 * @return
                 */
                getCalPersonIdList():$.java.util.List;
                /**
                 * ��ȡ��������id
                 * @return
                 */
                getCalTaskId():long;
                /**
                 * ��ȡ����������������������ǵ�н����Ŀid����
                 * @return
                 */
                getSalaryItemIdList():$.java.util.List;
                /**
                 * ��ȡ�������н����Ŀ���ܽ��ֵ����
                 * @return
                 */
                getSlItemResultMap():$.java.util.Map;
                /**
                 * ��ȡ�ֶν������н����Ŀ���ֶ�������ֵ����
                 * @return
                 */
                getSlItemSectionResultMap():$.java.util.Map;
                /**
                 * ���ú�������id����
                 * @param calPersonIdList
                 */
                setCalPersonIdList(calPersonIdList:$.java.util.List):void;
                /**
                 * ���ú�������id
                 * @param calTaskId
                 */
                setCalTaskId(calTaskId:long):void;
                /**
                 * ���ü���������������������ǵ�н����Ŀid����
                 * @param salaryItemIdList
                 */
                setSalaryItemIdList(salaryItemIdList:$.java.util.List):void;
                /**
                 * ���ý������н����Ŀ���ܽ��ֵ����
                 * @param slItemResultMap
                 */
                setSlItemResultMap(slItemResultMap:$.java.util.Map):void;
                /**
                 * ���÷ֶν������н����Ŀ���ֶ�������ֵ����
                 * @param slItemSectionResultMap
                 */
                setSlItemSectionResultMap(slItemSectionResultMap:$.java.util.Map):void;
            }
            type FetchResultCoverEvent_T = FetchResultCoverEvent_S & FetchResultCoverEvent$;
            interface FetchResultCoverEvent extends FetchResultCoverEvent_T {
            }
            interface HisDataTaskCheckEvent_S {
            }
            interface HisDataTaskCheckEvent_C extends HisDataTaskCheckEvent_S {
                new(dataMap:$.java.util.Map,checkFailMap:$.java.util.Map,writeTaskType:string):HisDataTaskCheckEvent;
            }
            interface HisDataTaskCheckEvent$ {
                getCheckFailMap():$.java.util.Map;
                getDataMap():$.java.util.Map;
                getWriteTaskType():string;
                setCheckFailMap(checkFailMap:$.java.util.Map):void;
            }
            type HisDataTaskCheckEvent_T = HisDataTaskCheckEvent_S & HisDataTaskCheckEvent$;
            interface HisDataTaskCheckEvent extends HisDataTaskCheckEvent_T {
            }
            interface CalRollBackEvent_S {
            }
            interface CalRollBackEvent_C extends CalRollBackEvent_S {
                new(calTaskId:long,calPersonIdList:$.java.util.List,calRecordId:long,cancelType:string):CalRollBackEvent;
            }
            interface CalRollBackEvent$ {
                getCalPersonIdList():$.java.util.List;
                getCalRecordId():long;
                getCalTaskId():long;
                getCancelType():string;
                setCalPersonIdList(calPersonIdList:$.java.util.List):void;
                setCalRecordId(calRecordId:long):void;
                setCalTaskId(calTaskId:long):void;
                setCancelType(cancelType:string):void;
            }
            type CalRollBackEvent_T = CalRollBackEvent_S & CalRollBackEvent$;
            interface CalRollBackEvent extends CalRollBackEvent_T {
            }
            interface AfterSalaryCalEvent_S {
            }
            interface AfterSalaryCalEvent_C extends AfterSalaryCalEvent_S {
                new(taskId:long,recordId:long,batchId:long,calType:string,calPersonIdList:$.java.util.List,isFinished:boolean,traceId:string):AfterSalaryCalEvent;
            }
            interface AfterSalaryCalEvent$ {
                /**
                 * ��ȡ��������ID
                 * @return ��������ID
                 */
                getBatchId():long;
                /**
                 * ��ȡ��ǰ���κ�������Id����
                 * @return ��ǰ���κ�������Id���ϣ����ڻ�ȡ��Ҫ�������ϸ�����Ϣ
                 */
                getCalPersonIdList():$.java.util.List;
                /**
                 * ��ȡ��������
                 * @return �������ͣ�"onlyPreTaxCal"��������˰ǰ�� "preTaxCal":����˰ǰ��"afterTaxCal"������˰��
                 *      ���㱣������ڷֶμ���ʱ��������Σ�����˰ǰ�ͼ���˰�󣬿���ͨ���������ͽ����ж��Ƿ���Ҫ����ҵ����
                 */
                getCalType():string;
                /**
                 * ��ȡ����ỰID
                 * @return ����ỰID
                 */
                getRecordId():long;
                /**
                 * ��ȡ��������ID
                 * @return ��������ID�����ڻ�ȡ����������Ϣ
                 */
                getTaskId():long;
                /**
                 * ��־����ID
                 * @return ��־����ID����������־��ӡ
                 */
                getTraceId():string;
                /**
                 * �Ƿ�������
                 * @return �Ƿ������ɣ��жϵ�ǰ�μ����Ƿ����
                 */
                isFinished():boolean;
                /**
                 * ���ú�������ID
                 * @param batchId ��������ID
                 */
                setBatchId(batchId:long):void;
                /**
                 * ���õ�ǰ���κ�������Id����
                 * @param calPersonIdList ��ǰ���κ�������Id���ϣ����ڻ�ȡ��Ҫ�������ϸ�����Ϣ
                 */
                setCalPersonIdList(calPersonIdList:$.java.util.List):void;
                /**
                 * ���ü�������
                 * @param calType �������ͣ�"onlyPreTaxCal"��������˰ǰ�� "preTaxCal":����˰ǰ��"afterTaxCal"������˰��
                 *      ���㱣������ڷֶμ���ʱ��������Σ�����˰ǰ�ͼ���˰�󣬿���ͨ���������ͽ����ж��Ƿ���Ҫ����ҵ����
                 */
                setCalType(calType:string):void;
                /**
                 * �Ƿ�������
                 * @param finished �Ƿ������ɣ��жϵ�ǰ�μ����Ƿ����
                 */
                setFinished(finished:boolean):void;
                /**
                 * ���ü���ỰID
                 * @param recordId ����ỰID
                 */
                setRecordId(recordId:long):void;
                /**
                 * ���ú�������ID
                 * @param taskId ��������ID�����ڻ�ȡ����������Ϣ
                 */
                setTaskId(taskId:long):void;
                /**
                 * ��־����ID
                 * @param traceId ��־����ID����������־��ӡ
                 */
                setTraceId(traceId:string):void;
            }
            type AfterSalaryCalEvent_T = AfterSalaryCalEvent_S & AfterSalaryCalEvent$;
            interface AfterSalaryCalEvent extends AfterSalaryCalEvent_T {
            }
            interface CostAllotDetailArgs_S {
            }
            interface CostAllotDetailArgs_C extends CostAllotDetailArgs_S {
                new(saveAllotDetailColl:$.kd.bos.dataentity.entity.DynamicObjectCollection):CostAllotDetailArgs;
            }
            interface CostAllotDetailArgs$ {
                getSaveAllotDetailColl():$.kd.bos.dataentity.entity.DynamicObjectCollection;
                setSaveAllotDetailColl(saveAllotDetailColl:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type CostAllotDetailArgs_T = CostAllotDetailArgs_S & CostAllotDetailArgs$;
            interface CostAllotDetailArgs extends CostAllotDetailArgs_T {
            }
            interface CostCfgTypeDeptArgs_S {
            }
            interface CostCfgTypeDeptArgs_C extends CostCfgTypeDeptArgs_S {
                new():CostCfgTypeDeptArgs;
            }
            interface CostCfgTypeDeptArgs$ {
                getCheckPass():boolean;
                getCostCfgDeptMap():$.java.util.Map;
                getCostCfgIdList():$.java.util.List;
                getSelectedId():long;
                setCheckPass(checkPass:boolean):void;
                setCostCfgDeptMap(costCfgDeptMap:$.java.util.Map):void;
                setCostCfgIdList(costCfgIdList:$.java.util.List):void;
                setSelectedId(selectedId:long):void;
            }
            type CostCfgTypeDeptArgs_T = CostCfgTypeDeptArgs_S & CostCfgTypeDeptArgs$;
            interface CostCfgTypeDeptArgs extends CostCfgTypeDeptArgs_T {
            }
        }
        namespace kd.sdk.swc.hscs.common.hisdatacheck{
            interface DataCheckFailDTO_S {
            }
            interface DataCheckFailDTO_C extends DataCheckFailDTO_S {
                new():DataCheckFailDTO;
            }
            interface DataCheckFailDTO$ {
                getErrorElement():string;
                getFailMsgValue():string;
                getFailType():string;
                setErrorElement(errorElement:string):void;
                setFailMsgValue(failMsgValue:string):void;
                setFailType(failType:string):void;
            }
            type DataCheckFailDTO_T = DataCheckFailDTO_S & DataCheckFailDTO$;
            interface DataCheckFailDTO extends DataCheckFailDTO_T {
            }
        }
        namespace kd.sdk.swc.hscs.service.api{
            interface ICostAllotDetailService_S {
            }
            interface ICostAllotDetailService$ {
                /**
                 * ���óɱ���̯��ϸ�ֶ�ֵ
                 *
                 * @param args
                 */
                setCostAllotDetailFields?(args:kd.sdk.swc.hscs.common.events.CostAllotDetailArgs):void;
            }
            type ICostAllotDetailService_T = ICostAllotDetailService_S & ICostAllotDetailService$;
            interface ICostAllotDetailService extends ICostAllotDetailService_T {
            }
            interface ICustFetchService_S {
            }
            interface ICustFetchService$ {
                /**
                 * �������ȡ��ά�ȵ�ȡ������
                 *
                 * @param calPersonIdList ��������id����
                 * @param paramsMap ��Ա����ȡ����Ŀ���ݼ���
                 *                  key:��������id,value:[key:����ֶΣ�value:���ֵ]
                 * @return key:��������id, value:[key:�����ֶΣ�value:����ֵ]
                 */
                fetchDataCalPerson(calPersonIdList:$.java.util.List,paramsMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��������ȡ��ά�ȵ�ȡ������
                 *
                 * @param calTaskId ���������id
                 * @param paramsMap       ���񼶱�ȡ����Ŀ���ݼ���
                 *                  key:����ֶΣ�value:����ֶ�ֵ
                 * @return key:�����ֶΣ�value:����ֵ
                 */
                fetchDataCalTask(calTaskId:long,paramsMap:$.java.util.Map):$.java.util.Map;
            }
            type ICustFetchService_T = ICustFetchService_S & ICustFetchService$;
            interface ICustFetchService extends ICustFetchService_T {
            }
            interface ICostSetUpService_S {
            }
            interface ICostSetUpService$ {
                /**
                 * У����֯н��ɱ�����
                 * <p>��������ѭ����ִ�У���ֹ�ڱ������������ݿ�</p>
                 *
                 * @param args
                 */
                checkCostTypeDept?(args:kd.sdk.swc.hscs.common.events.CostCfgTypeDeptArgs):void;
                /**
                 * ��ȡ��֯н��ɱ�������Ϣ
                 *
                 * @param args
                 */
                setCostTypeDeptInfo?(args:kd.sdk.swc.hscs.common.events.CostCfgTypeDeptArgs):void;
            }
            type ICostSetUpService_T = ICostSetUpService_S & ICostSetUpService$;
            interface ICostSetUpService extends ICostSetUpService_T {
            }
        }
        namespace kd.sdk.swc.hspp{
            interface SdkHsppModule_S {
            }
            type SdkHsppModule_ST = $.kd.sdk.module.Module & SdkHsppModule_S;
            interface SdkHsppModule_C extends SdkHsppModule_ST {
                new():SdkHsppModule;
            }
            interface SdkHsppModule$ {
            }
            type SdkHsppModule_T = $.kd.sdk.module.Module & SdkHsppModule_S & SdkHsppModule$;
            interface SdkHsppModule extends SdkHsppModule_T {
            }
        }
        namespace kd.sdk.swc.hspp.business.extpoint.salaryslip{
            interface ISalarySlipQueryExtService_S {
            }
            interface ISalarySlipQueryExtService$ {
                /**
                 * @param verifyEvent
                 * <pre><code>
                 *     public class SalarySlipQueryExtServiceImpl implements ISalarySlipQueryExtService {
                 *
                 *     @Override
                 *     public void salarySlipQueryPersonVerify(SalarySlipPersonVerifyEvent verifyEvent) {
                 *         // ��ȡ����ѯ��Աid
                 *         Long queriedPersonId = verifyEvent.getQueriedPersonId();
                 *         // ��ȡ��ǰ��ѯ��Աid
                 *         Long currentPersonId = verifyEvent.getCurrentPersonId();
                 *         // �ж��Ƿ���Ȩ�޲�ѯ
                 *         String userName = RequestContext.get().getUserName();
                 *         verifyEvent.setHavePerm(!"gff".contains(userName));
                 *         // ��Ȩ��ʾ��
                 *         verifyEvent.setErrorMessage("test error");
                 *
                 *     }
                 * }
                 * </code></pre>
                 */
                salarySlipQueryPersonVerify?(verifyEvent:kd.sdk.swc.hspp.common.events.SalarySlipPersonVerifyEvent):void;
            }
            type ISalarySlipQueryExtService_T = ISalarySlipQueryExtService_S & ISalarySlipQueryExtService$;
            interface ISalarySlipQueryExtService extends ISalarySlipQueryExtService_T {
            }
        }
        namespace kd.sdk.swc.hspp.common.events{
            interface SalarySlipPersonVerifyEvent_S {
            }
            interface SalarySlipPersonVerifyEvent_C extends SalarySlipPersonVerifyEvent_S {
                new():SalarySlipPersonVerifyEvent;
            }
            interface SalarySlipPersonVerifyEvent$ {
                getCurrentPersonId():long;
                getErrorMessage():string;
                getHavePerm():boolean;
                getQueriedPersonId():long;
                setCurrentPersonId(currentPersonId:long):void;
                setErrorMessage(errorMessage:string):void;
                setHavePerm(havePerm:boolean):void;
                setQueriedPersonId(queriedPersonId:long):void;
            }
            type SalarySlipPersonVerifyEvent_T = SalarySlipPersonVerifyEvent_S & SalarySlipPersonVerifyEvent$;
            interface SalarySlipPersonVerifyEvent extends SalarySlipPersonVerifyEvent_T {
            }
        }
        namespace kd.sdk.swc.hspp.common.events.mobile{
            interface SalaryLabelApEvent_S {
            }
            interface SalaryLabelApEvent_C extends SalaryLabelApEvent_S {
                new():SalaryLabelApEvent;
            }
            interface SalaryLabelApEvent$ {
                getLabelAps():$.java.util.List;
                getType():string;
                setAllLabelAps(labelAps:$.java.util.List):void;
                setLabelAps(labelAps:$.java.util.List):void;
                setType(type_arg:string):void;
            }
            type SalaryLabelApEvent_T = SalaryLabelApEvent_S & SalaryLabelApEvent$;
            interface SalaryLabelApEvent extends SalaryLabelApEvent_T {
            }
        }
        namespace kd.sdk.swc.hspp.formplugin.mobile{
            interface ISalaryBaseExtService_S {
            }
            interface ISalaryBaseExtService$ {
                /**
                 * @param salaryLabelApEvent
                 * <pre><code>
                 *         @Override
                 *     public void redrawSalaryLabelAp(SalaryLabelApEvent salaryLabelApEvent) {
                 *         List<ControlAp<?>> labelAps = salaryLabelApEvent.getLabelAps();
                 *         for (ControlAp<?> labelAp : labelAps) {
                 *             String key = labelAp.getKey();
                 *             String currencyId = key.substring(key.lastIndexOf('-') + 1);
                 *             //�ɸ��ݱұ����ò�ͬ����ʽ
                 *             labelAp.setFontSize(10);
                 *             labelAp.setForeColor("#77c404");
                 *         }
                 *     }
                 * </code></pre>
                 */
                redrawSalaryLabelAp(salaryLabelApEvent:kd.sdk.swc.hspp.common.events.mobile.SalaryLabelApEvent):void;
            }
            type ISalaryBaseExtService_T = ISalaryBaseExtService_S & ISalaryBaseExtService$;
            interface ISalaryBaseExtService extends ISalaryBaseExtService_T {
            }
        }
        namespace kd.sdk.swc.hspp.mservice.helper{
            interface SalarySlipServiceHelper_S {
                /**
                 * ��ǰ��Աʹ�������¼
                 *
                 * @param paramMap ��¼map
                 * @return ���ֵ
                 */
                authenticatePassword(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ѯ��ǰ��Ա�Ƿ�����������
                 *
                 * @param personId ��Աid
                 * @return ���ֵ
                 */
                isHavePassWordByPersonId(personId:long):$.java.util.Map;
                /**
                 * ������̨��Ա��ѯĳһʱ�䷶Χ�Ĺ�������Ϣ
                 *
                 * @param paramMap ��ѯmap
                 * @return ���ֵ
                 */
                querySalarySlipDetail(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ������̨��Ա�������ʾ������ѯĳһʱ�䷶Χ�Ĺ�����������Ϣ
                 *
                 * @param paramMap
                 * @return
                 */
                querySalarySlipSumDetail(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ������̨��Ա��ѯ���õĹ�����������ʾ����
                 *
                 * @param paramMap
                 * @return
                 */
                querySalarySlipSumView(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ǰ��Ա������߸�������
                 *
                 * @param paramMap ����map
                 * @return ���ֵ
                 */
                saveOrUpdatePassword(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ǰ��Ա�����ֻ���֤��
                 *
                 * @param paramMap ��֤��map
                 * @return ���ֵ
                 */
                sendCodeMessage(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * У�鵱ǰ��Ա��֤���Ƿ���ȷ
                 *
                 * @param paramMap ��֤��map
                 * @return ���ֵ
                 */
                validPhoneCode(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * У�������Ƿ���Ϲ淶
                 *
                 * @param paramMap ����map
                 * @return ���ֵ
                 */
                verifyPassword(paramMap:$.java.util.Map):$.java.util.Map;
            }
            interface SalarySlipServiceHelper_C extends SalarySlipServiceHelper_S {
                new():SalarySlipServiceHelper;
            }
            interface SalarySlipServiceHelper$ {
            }
            type SalarySlipServiceHelper_T = SalarySlipServiceHelper_S & SalarySlipServiceHelper$;
            interface SalarySlipServiceHelper extends SalarySlipServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.pcs{
            interface SdkPcsModule_S {
            }
            type SdkPcsModule_ST = $.kd.sdk.module.Module & SdkPcsModule_S;
            interface SdkPcsModule_C extends SdkPcsModule_ST {
                new():SdkPcsModule;
            }
            interface SdkPcsModule$ {
            }
            type SdkPcsModule_T = $.kd.sdk.module.Module & SdkPcsModule_S & SdkPcsModule$;
            interface SdkPcsModule extends SdkPcsModule_T {
            }
        }
        namespace kd.sdk.swc.pcs.business.extpoint.costcfg{
            interface ICostCfgExportExtService_S {
            }
            interface ICostCfgExportExtService$ {
                /**
                 *  �ɱ��������������¼�,�����������ֶΣ�������ֵ
                 *
                 *  <pre>
                 *  <code>
                 *      public class CosCfgExportServiceDemo implements ICostCfgExportExtService {
                 *
                 *      Override
                 *      public void setCostCfgExportFieldAndValue(CostCfgEvent args) {
                 *          String billFormId = args.getBillFormId();
                 *          List<DynamicObject> costCfgDyList = args.getCostCfgColl();
                 *          Map<String, String> costCfgHeaders = args.getCostCfgHeaders();
                 *          if (SWCStringUtils.isEmpty(billFormId) || CollectionUtils.isEmpty(costCfgDyList) || costCfgHeaders == null) {
                 *              // ҳ���ʶΪ�ա�����Ϊ�ա���ͷΪ�գ��˳�
                 *              return;
                 *          }
                 *
                 *          SWCDataServiceHelper helper = new SWCDataServiceHelper(billFormId);
                 *          DynamicObject costCfgDy = helper.generateEmptyDynamicObject();
                 *          // ȡ�ɱ���������
                 *          DataEntityPropertyCollection properties = costCfgDy.getDynamicObjectType().getProperties();
                 *          // ��ʵ�������ֶ�
                 *          boolean enableContainsKey = properties.containsKey("enable");
                 *          // ��ʵ�������ӻ��������ֶΣ���lcs_costcenter�ɱ�����Ϊ��
                 *          boolean baseDataContainsKey = properties.containsKey("testaddbasedata");
                 *          // ��ʵ���������ı��ֶ�
                 *          boolean textContainsKey = properties.containsKey("testaddtext");
                 *          boolean baseDataEntContainsKey = false;
                 *          boolean textEntContainsKey = false;
                 *          boolean entryContainsKey = properties.containsKey("costcfgentryentity");
                 *          if (entryContainsKey) {
                 *              DynamicObject entryDy = helper.generateEmptyEntryDynamicObject("costcfgentryentity");
                 *              if (entryDy != null) {
                 *                  DataEntityPropertyCollection entryProperties = entryDy.getDataEntityType().getProperties();
                 *                  // ��ͨ�ɱ����÷�¼������ӵĻ��������ֶ�
                 *                  baseDataEntContainsKey = entryProperties.containsKey("testaddentbasedata");
                 *                  // ��ͨ�ɱ����÷�¼������ӵ��ı��ֶ�
                 *                  textEntContainsKey = entryProperties.containsKey("testaddenttext");
                 *              }
                 *          }
                 *
                 *          boolean baseDataEntTypeContainsKey = false;
                 *          boolean textEntTypeContainsKey = false;
                 *          boolean entryTypeContainsKey = properties.containsKey("costcfgtypeentryentity");
                 *          if (entryTypeContainsKey) {
                 *              DynamicObject entryTypeDy = helper.generateEmptyEntryDynamicObject("costcfgtypeentryentity");
                 *              if (entryTypeDy != null) {
                 *                  DataEntityPropertyCollection entryProperties = entryTypeDy.getDataEntityType().getProperties();
                 *                  // ���׳ɱ����÷�¼������ӵĻ��������ֶ�
                 *                  baseDataEntTypeContainsKey = entryProperties.containsKey("testaddenttypebasedata");
                 *                  // ���׳ɱ����÷�¼������ӵ��ı��ֶ�
                 *                  textEntTypeContainsKey = entryProperties.containsKey("testaddenttypetext");
                 *              }
                 *          }
                 *
                 *          LinkedHashMap<String, String> costCfgLinkHeaders = new LinkedHashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *          Iterator<Map.Entry<String, String>> iterator = costCfgHeaders.entrySet().iterator();
                 *          while (iterator.hasNext()) {
                 *              Map.Entry<String, String> next = iterator.next();
                 *              String key = next.getKey();
                 *              String value = next.getValue();
                 *              costCfgLinkHeaders.put(key, value);
                 *              // �������Ч���ں���
                 *              if ("bsed".equals(key)) {
                 *                  if (enableContainsKey) {
                 *                      costCfgLinkHeaders.put("enable", "testenable");
                 *                  }
                 *                  if (baseDataContainsKey) {
                 *                      costCfgLinkHeaders.put("testaddbasedata", "testbasedata");
                 *                  }
                 *                  if (textContainsKey) {
                 *                      costCfgLinkHeaders.put("testaddtext", "testtext");
                 *                  }
                 *              }
                 *          }
                 *          if (baseDataEntContainsKey) {
                 *              costCfgLinkHeaders.put("testaddentbasedata", "testentbasedata");
                 *          }
                 *          if (textEntContainsKey) {
                 *              costCfgLinkHeaders.put("testaddenttext", "testenttext");
                 *          }
                 *          if (baseDataEntTypeContainsKey) {
                 *              costCfgLinkHeaders.put("testaddenttypebasedata", "testenttypebasedata");
                 *          }
                 *          if (textEntTypeContainsKey) {
                 *              costCfgLinkHeaders.put("testaddenttypetext", "testenttypetext");
                 *          }
                 *          args.setCostCfgHeaders(costCfgLinkHeaders);
                 *
                 *          // �����Ļ��������ֶ����������ͣ�1���룬2���ƣ�Ĭ����ʾ����
                 *          Map<String, String> baseDataExportType = args.getBaseDataExportType();
                 *          if (baseDataExportType == null) {
                 *              baseDataExportType = new HashMap<>();
                 *          }
                 *          baseDataExportType.put("testaddbasedata", SWCBaseConstants.STR_ONE);
                 *          baseDataExportType.put("testaddentbasedata", SWCBaseConstants.STR_TWO);
                 *          baseDataExportType.put("testaddenttypebasedata", SWCBaseConstants.STR_ONE);
                 *          baseDataExportType.put("testaddenttypetext", SWCBaseConstants.STR_TWO);
                 *          args.setBaseDataExportType(baseDataExportType);
                 *
                 *          DynamicObject costCenterD1y =
                 *              BusinessDataServiceHelper.loadSingleFromCache(785232921668617216L, "lcs_costcenter");
                 *          DynamicObject costCenter2Dy =
                 *              BusinessDataServiceHelper.loadSingleFromCache(785232921668617216L, "lcs_costcenter");
                 *
                 *          for (DynamicObject allotBill : costCfgDyList) {
                 *              // ���ö�����ʵ���ֶε�ֵ
                 *              if (enableContainsKey) {
                 *                  allotBill.set("enable", SWCBaseConstants.ENABLE_ENABLE);
                 *              }
                 *              if (baseDataContainsKey) {
                 *                  allotBill.set("testaddbasedata", costCenterD1y);
                 *              }
                 *              if (textContainsKey) {
                 *                  allotBill.set("testaddtext", "text value");
                 *              }
                 *              // ���ö����ɱ����÷�¼�ֶε�ֵ
                 *              if (entryContainsKey) {
                 *                  DynamicObjectCollection costCfgEntryColl = allotBill.getDynamicObjectCollection("costcfgentryentity");
                 *                  for (DynamicObject costCfgEntryDy : costCfgEntryColl) {
                 *                      if (baseDataEntContainsKey) {
                 *                          costCfgEntryDy.set("testaddentbasedata", costCenter2Dy);
                 *                      }
                 *                      if (textEntContainsKey) {
                 *                          costCfgEntryDy.set("testaddenttext", "enttext value");
                 *                      }
                 *                  }
                 *              }
                 *
                 *              // ���ö������׷�¼�ֶε�ֵ
                 *              if (entryTypeContainsKey) {
                 *                  DynamicObjectCollection costCfgEntryTypeColl =
                 *                      allotBill.getDynamicObjectCollection("costcfgtypeentryentity");
                 *                  for (DynamicObject costCfgEntryTypeDy : costCfgEntryTypeColl) {
                 *                      if (baseDataEntTypeContainsKey) {
                 *                          costCfgEntryTypeDy.set("testaddenttypebasedata", costCenter2Dy);
                 *                      }
                 *                      if (textEntTypeContainsKey) {
                 *                          costCfgEntryTypeDy.set("testaddenttypetext", "enttypetext value");
                 *                      }
                 *                  }
                 *              }
                 *          }
                 *      }
                 *  }
                 *
                 * </code>
                 *  </pre>
                 *
                 *  @param event �ɱ��������������¼�
                 */
                setCostCfgExportFieldAndValue?(event:kd.sdk.swc.pcs.common.events.CostCfgEvent):void;
            }
            type ICostCfgExportExtService_T = ICostCfgExportExtService_S & ICostCfgExportExtService$;
            interface ICostCfgExportExtService extends ICostCfgExportExtService_T {
            }
            interface ICostCfgImportExtService_S {
            }
            interface ICostCfgImportExtService$ {
                /**
                 * �ɱ��������������¼�,�����������ֶ�
                 *
                 * <pre>
                 * <code>
                 * public class CosCfgImportServiceDemo implements ICostCfgImportExtService {
                 *
                 *     &#64;Override
                 *     public void setCostCfgImportField(CostCfgEvent args) {
                 *         String billFormId = args.getBillFormId();
                 *         Map<String, String> costCfgHeaders = args.getCostCfgHeaders();
                 *         if (SWCStringUtils.isEmpty(billFormId) || costCfgHeaders == null) {
                 *             // ҳ���ʶΪ�ա���ͷΪ�գ��˳�
                 *             return;
                 *         }
                 *
                 *         SWCDataServiceHelper helper = new SWCDataServiceHelper(billFormId);
                 *         DynamicObject costCfgDy = helper.generateEmptyDynamicObject();
                 *         // ȡ�ɱ���������
                 *         DataEntityPropertyCollection properties = costCfgDy.getDynamicObjectType().getProperties();
                 *         // ��ʵ�������ֶ�
                 *         boolean enableContainsKey = properties.containsKey("enable");
                 *         // ��ʵ�������ӻ��������ֶΣ���lcs_costcenter�ɱ�����Ϊ��
                 *         boolean baseDataContainsKey = properties.containsKey("testaddbasedata");
                 *         // ��ʵ���������ı��ֶ�
                 *         boolean textContainsKey = properties.containsKey("testaddtext");
                 *         boolean baseDataEntContainsKey = false;
                 *         boolean textEntContainsKey = false;
                 *         boolean entryContainsKey = properties.containsKey("costcfgentryentity");
                 *         if (entryContainsKey) {
                 *             DynamicObject entryDy = helper.generateEmptyEntryDynamicObject("costcfgentryentity");
                 *             if (entryDy != null) {
                 *                 DataEntityPropertyCollection entryProperties = entryDy.getDataEntityType().getProperties();
                 *                 // ��ͨ�ɱ����÷�¼������ӵĻ��������ֶ�
                 *                 baseDataEntContainsKey = entryProperties.containsKey("testaddentbasedata");
                 *                 // ��ͨ�ɱ����÷�¼������ӵ��ı��ֶ�
                 *                 textEntContainsKey = entryProperties.containsKey("testaddenttext");
                 *             }
                 *         }
                 *
                 *         boolean baseDataEntTypeContainsKey = false;
                 *         boolean textEntTypeContainsKey = false;
                 *         boolean entryTypeContainsKey = properties.containsKey("costcfgtypeentryentity");
                 *         if (entryTypeContainsKey) {
                 *             DynamicObject entryTypeDy = helper.generateEmptyEntryDynamicObject("costcfgtypeentryentity");
                 *             if (entryTypeDy != null) {
                 *                 DataEntityPropertyCollection entryProperties = entryTypeDy.getDataEntityType().getProperties();
                 *                 // ���׳ɱ����÷�¼������ӵĻ��������ֶ�
                 *                 baseDataEntTypeContainsKey = entryProperties.containsKey("testaddenttypebasedata");
                 *                 // ���׳ɱ����÷�¼������ӵ��ı��ֶ�
                 *                 textEntTypeContainsKey = entryProperties.containsKey("testaddenttypetext");
                 *             }
                 *         }
                 *
                 *         LinkedHashMap<String, String> costCfgLinkHeaders = new LinkedHashMap<>(SWCBaseConstants.INITCAPACITY_HASHMAP);
                 *         Iterator<Map.Entry<String, String>> iterator = costCfgHeaders.entrySet().iterator();
                 *         while (iterator.hasNext()) {
                 *             Map.Entry<String, String> next = iterator.next();
                 *             String key = next.getKey();
                 *             String value = next.getValue();
                 *             costCfgLinkHeaders.put(key, value);
                 *             // �������Ч���ں���
                 *             if ("bsed".equals(key)) {
                 *                 if (enableContainsKey) {
                 *                     costCfgLinkHeaders.put("enable", "testenable");
                 *                 }
                 *                 if (baseDataContainsKey) {
                 *                     costCfgLinkHeaders.put("testaddbasedata", "testbasedata");
                 *                 }
                 *                 if (textContainsKey) {
                 *                     costCfgLinkHeaders.put("testaddtext", "testtext");
                 *                 }
                 *             }
                 *         }
                 *         if (baseDataEntContainsKey) {
                 *             costCfgLinkHeaders.put("testaddentbasedata", "testentbasedata");
                 *         }
                 *         if (textEntContainsKey) {
                 *             costCfgLinkHeaders.put("testaddenttext", "testenttext");
                 *         }
                 *         if (baseDataEntTypeContainsKey) {
                 *             costCfgLinkHeaders.put("testaddenttypebasedata", "testenttypebasedata");
                 *         }
                 *         if (textEntTypeContainsKey) {
                 *             costCfgLinkHeaders.put("testaddenttypetext", "testenttypetext");
                 *         }
                 *         args.setCostCfgHeaders(costCfgLinkHeaders);
                 *     }
                 * }
                 * </code>
                 * </pre>
                 *
                 * @param event �ɱ��������������¼�
                 */
                setCostCfgImportField?(event:kd.sdk.swc.pcs.common.events.CostCfgEvent):void;
                /**
                 * �ɱ��������������¼�,�����������ֶ�ֵ
                 *
                 * <pre>
                 * <code>
                 * public class CosCfgImportServiceDemo implements ICostCfgImportExtService {
                 *
                 *     &#64;Override
                 *     public void setCostCfgImportValue(CostCfgEvent args) {
                 *         List<DynamicObject> costCfgDyList = args.getCostCfgColl();
                 *         if (CollectionUtils.isEmpty(costCfgDyList)) {
                 *             // ����Ϊ��Ϊ�գ��˳�
                 *             return;
                 *         }
                 *
                 *         // ȡ�ɱ���������
                 *         DynamicObject dynamicObject = costCfgDyList.get(0);
                 *         String billFormId = dynamicObject.getDataEntityType().getName();
                 *         SWCDataServiceHelper helper = new SWCDataServiceHelper(billFormId);
                 *         DynamicObject costCfgDy = helper.generateEmptyDynamicObject();
                 *         DataEntityPropertyCollection properties = costCfgDy.getDynamicObjectType().getProperties();
                 *         boolean enableContainsKey = properties.containsKey("enable");
                 *         boolean baseDataContainsKey = properties.containsKey("testaddbasedata");
                 *         boolean textContainsKey = properties.containsKey("testaddtext");
                 *         boolean baseDataEntContainsKey = false;
                 *         boolean textEntContainsKey = false;
                 *         boolean entryContainsKey = properties.containsKey("costcfgentryentity");
                 *         if (entryContainsKey) {
                 *             DynamicObject entryDy = helper.generateEmptyEntryDynamicObject("costcfgentryentity");
                 *             if (entryDy != null) {
                 *                 DataEntityPropertyCollection entryProperties = entryDy.getDataEntityType().getProperties();
                 *                 baseDataEntContainsKey = entryProperties.containsKey("testaddentbasedata");
                 *                 textEntContainsKey = entryProperties.containsKey("testaddenttext");
                 *             }
                 *         }
                 *
                 *         boolean baseDataEntTypeContainsKey = false;
                 *         boolean textEntTypeContainsKey = false;
                 *         boolean entryTypeContainsKey = properties.containsKey("costcfgtypeentryentity");
                 *         if (entryTypeContainsKey) {
                 *             DynamicObject entryTypeDy = helper.generateEmptyEntryDynamicObject("costcfgtypeentryentity");
                 *             if (entryTypeDy != null) {
                 *                 DataEntityPropertyCollection entryProperties = entryTypeDy.getDataEntityType().getProperties();
                 *                 baseDataEntTypeContainsKey = entryProperties.containsKey("testaddenttypebasedata");
                 *                 textEntTypeContainsKey = entryProperties.containsKey("testaddenttypetext");
                 *             }
                 *         }
                 *
                 *         DynamicObject costCenterD1y =
                 *             BusinessDataServiceHelper.loadSingleFromCache(785232921668617216L, "lcs_costcenter");
                 *         DynamicObject costCenter2Dy =
                 *             BusinessDataServiceHelper.loadSingleFromCache(785232921668617216L, "lcs_costcenter");
                 *
                 *         for (DynamicObject allotBill : costCfgDyList) {
                 *             // ���ö�����ʵ���ֶε�ֵ
                 *             if (enableContainsKey) {
                 *                 allotBill.set("enable", SWCBaseConstants.ENABLE_ENABLE);
                 *             }
                 *             if (baseDataContainsKey) {
                 *                 allotBill.set("testaddbasedata", costCenterD1y);
                 *             }
                 *             if (textContainsKey) {
                 *                 allotBill.set("testaddtext", "text value");
                 *             }
                 *             // ���ö����ɱ����÷�¼�ֶε�ֵ
                 *             if (entryContainsKey) {
                 *                 DynamicObjectCollection costCfgEntryColl = allotBill.getDynamicObjectCollection("costcfgentryentity");
                 *                 for (DynamicObject costCfgEntryDy : costCfgEntryColl) {
                 *                     if (baseDataEntContainsKey) {
                 *                         costCfgEntryDy.set("testaddentbasedata", costCenter2Dy);
                 *                     }
                 *                     if (textEntContainsKey) {
                 *                         costCfgEntryDy.set("testaddenttext", "enttext value");
                 *                     }
                 *                 }
                 *             }
                 *
                 *             // ���ö������׷�¼�ֶε�ֵ
                 *             if (entryTypeContainsKey) {
                 *                 DynamicObjectCollection costCfgEntryTypeColl =
                 *                     allotBill.getDynamicObjectCollection("costcfgtypeentryentity");
                 *                 for (DynamicObject costCfgEntryTypeDy : costCfgEntryTypeColl) {
                 *                     if (baseDataEntTypeContainsKey) {
                 *                         costCfgEntryTypeDy.set("testaddenttypebasedata", costCenter2Dy);
                 *                     }
                 *                     if (textEntTypeContainsKey) {
                 *                         costCfgEntryTypeDy.set("testaddenttypetext", "enttypetext value");
                 *                     }
                 *                 }
                 *             }
                 *         }
                 *     }
                 *
                 * }
                 * </code>
                 * </pre>
                 *
                 * @param event �ɱ��������������¼�
                 */
                setCostCfgImportValue?(event:kd.sdk.swc.pcs.common.events.CostCfgEvent):void;
            }
            type ICostCfgImportExtService_T = ICostCfgImportExtService_S & ICostCfgImportExtService$;
            interface ICostCfgImportExtService extends ICostCfgImportExtService_T {
            }
        }
        namespace kd.sdk.swc.pcs.business.mservice.helper{
            interface PCSCostCfgServiceHelper_S {
                /**
                 * ����/�޸ĳɱ�����
                 *
                 * @param param ���������1w��
                 * @return ������Σ���֤����һ�£����Ӳ��ַ������ԣ�success��true/false��message:������Ϣ
                 */
                saveCostCfg(param:$.java.util.Map):$.java.util.Map;
            }
            interface PCSCostCfgServiceHelper_C extends PCSCostCfgServiceHelper_S {
                new():PCSCostCfgServiceHelper;
            }
            interface PCSCostCfgServiceHelper$ {
            }
            type PCSCostCfgServiceHelper_T = PCSCostCfgServiceHelper_S & PCSCostCfgServiceHelper$;
            interface PCSCostCfgServiceHelper extends PCSCostCfgServiceHelper_T {
            }
            interface PCSCostAllotBillServiceHelper_S {
                /**
                 * ���ɳɱ����䵥
                 *
                 * @param param ���
                 * @return ���ؽ����֧�ֲ��ֳɹ�
                 */
                generateAllotBills(param:$.java.util.Map):$.java.util.Map;
            }
            interface PCSCostAllotBillServiceHelper_C extends PCSCostAllotBillServiceHelper_S {
                new():PCSCostAllotBillServiceHelper;
            }
            interface PCSCostAllotBillServiceHelper$ {
            }
            type PCSCostAllotBillServiceHelper_T = PCSCostAllotBillServiceHelper_S & PCSCostAllotBillServiceHelper$;
            interface PCSCostAllotBillServiceHelper extends PCSCostAllotBillServiceHelper_T {
            }
        }
        namespace kd.sdk.swc.pcs.common.events{
            interface CostAllotBillArgs_S {
            }
            interface CostAllotBillArgs_C extends CostAllotBillArgs_S {
                new(costAllotBillColl:$.java.util.List):CostAllotBillArgs;
            }
            interface CostAllotBillArgs$ {
                getCostAllotBillColl():$.java.util.List;
                setCostAllotBillColl(costAllotBillColl:$.java.util.List):void;
            }
            type CostAllotBillArgs_T = CostAllotBillArgs_S & CostAllotBillArgs$;
            interface CostAllotBillArgs extends CostAllotBillArgs_T {
            }
            interface CostCfgEvent_S {
            }
            interface CostCfgEvent_C extends CostCfgEvent_S {
                new():CostCfgEvent;
                new(costCfgColl:$.java.util.List):CostCfgEvent;
                new(billFormId:string,costCfgHeaders:$.java.util.LinkedHashMap):CostCfgEvent;
                new(billFormId:string,costCfgColl:$.java.util.List,costCfgHeaders:$.java.util.LinkedHashMap):CostCfgEvent;
            }
            interface CostCfgEvent$ {
                getBaseDataExportType():$.java.util.Map;
                getBillFormId():string;
                getCostCfgColl():$.java.util.List;
                getCostCfgHeaders():$.java.util.LinkedHashMap;
                setBaseDataExportType(baseDataExportType:$.java.util.Map):void;
                setBillFormId(billFormId:string):void;
                setCostCfgColl(costCfgColl:$.java.util.List):void;
                setCostCfgHeaders(costCfgHeaders:$.java.util.LinkedHashMap):void;
            }
            type CostCfgEvent_T = CostCfgEvent_S & CostCfgEvent$;
            interface CostCfgEvent extends CostCfgEvent_T {
            }
        }
        namespace kd.sdk.swc.pcs.service.api{
            interface ICostAllotBillService_S {
            }
            interface ICostAllotBillService$ {
                /**
                 * ���óɱ����䵥���ֶ�ֵ
                 *
                 * @param args
                 */
                setCostAllotBillFields?(args:kd.sdk.swc.pcs.common.events.CostAllotBillArgs):void;
            }
            type ICostAllotBillService_T = ICostAllotBillService_S & ICostAllotBillService$;
            interface ICostAllotBillService extends ICostAllotBillService_T {
            }
        }
    }
}
export {};