/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.mpscmm.msbd{
            interface SdkMsbdModule_S {
            }
            type SdkMsbdModule_ST = $.kd.sdk.module.Module & SdkMsbdModule_S;
            interface SdkMsbdModule_C extends SdkMsbdModule_ST {
                new():SdkMsbdModule;
            }
            interface SdkMsbdModule$ {
            }
            type SdkMsbdModule_T = $.kd.sdk.module.Module & SdkMsbdModule_S & SdkMsbdModule$;
            interface SdkMsbdModule extends SdkMsbdModule_T {
            }
        }
        namespace kd.sdk.mpscmm.msbd.algorithm.service{
            interface AlgorithmService_S {
                get():AlgorithmService;
            }
            interface AlgorithmService$ {
                /**
                 * ���¼����
                 */
                batchEntryCalculate(dataEntity:string,entries:$.java.util.List,changeProp:string):$.java.util.List;
                /**
                 * ��¼����
                 */
                entryCalculate(dataEntity:string,entry:$.kd.bos.dataentity.entity.DynamicObject,changeProp:string):$.java.util.Map;
            }
            type AlgorithmService_T = AlgorithmService_S & AlgorithmService$;
            interface AlgorithmService extends AlgorithmService_T {
            }
        }
        namespace kd.sdk.mpscmm.msbd.expoint{
            interface MsbdExpandCaseCodes_S {
                readonly MPSCMM_MSBD_DATACONTROL:string;
                readonly MPSCMM_MSBD_QUOTE:string;
                readonly MPSCMM_MSBD_WORKBENCH:string;
            }
            interface MsbdExpandCaseCodes_C extends MsbdExpandCaseCodes_S {
                new():MsbdExpandCaseCodes;
            }
            interface MsbdExpandCaseCodes$ {
            }
            type MsbdExpandCaseCodes_T = MsbdExpandCaseCodes_S & MsbdExpandCaseCodes$;
            interface MsbdExpandCaseCodes extends MsbdExpandCaseCodes_T {
            }
        }
        namespace kd.sdk.mpscmm.msbd.expoint.datacontrol{
            interface IDataCtrlCasePlugin_S {
            }
            interface IDataCtrlCasePlugin$ {
                /**
                 * ����ǰ�������ݿ��Ʒ���ȡֵ����ͷ���ֵ�ֶβ�һ�µ�����¶����ݼ�����ת��
                 * @param schemeNum ���ݿ��Ʒ���
                 * @param resultMap ȡֵ����ֶζ�Ӧ��ֵ
                 * @return
                 */
                beforeCalculate?(schemeNum:string,resultMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ���ҿ�������ǰ�������ݿ��Ʒ����е�����Դ�����������
                 * @param schemeNum ���ݿ��Ʒ���
                 * @param conditionMap ȡֵ�����ֶζ�Ӧ��ֵ
                 * @return
                 */
                beforeQuery?(schemeNum:string,conditionMap:$.java.util.Map):$.java.util.Map;
            }
            type IDataCtrlCasePlugin_T = IDataCtrlCasePlugin_S & IDataCtrlCasePlugin$;
            interface IDataCtrlCasePlugin extends IDataCtrlCasePlugin_T {
            }
        }
        namespace kd.sdk.mpscmm.msbd.expoint.quote{
            interface QuoteDoParam_S {
            }
            interface QuoteDoParam_C extends QuoteDoParam_S {
                /**
                 * ���ݼ��������췽��
                 *
                 * @param quoteDataSet  ȡ�۵������ݼ�
                 */
                new(quoteDataSet:$.kd.bos.algo.DataSet,quoteScheme:$.kd.bos.dataentity.entity.DynamicObject):QuoteDoParam;
            }
            interface QuoteDoParam$ {
                getPriceSourceFields():$.java.util.List;
                getQuoteDataSet():$.kd.bos.algo.DataSet;
                getQuoteScheme():$.kd.bos.dataentity.entity.DynamicObject;
                getResultSet():$.kd.bos.algo.DataSet;
                getRowKeyFields():$.java.util.List;
                getTerminateField():string;
                setPriceSourceFields(priceSourceFields:$.java.util.List):void;
                setQuoteDataSet(quoteDataSet:$.kd.bos.algo.DataSet):void;
                setQuoteScheme(quoteScheme:$.kd.bos.dataentity.entity.DynamicObject):void;
                setResultSet(resultSet:$.kd.bos.algo.DataSet):void;
                setRowKeyFields(rowKeyFields:$.java.util.List):void;
                setTerminateField(terminateField:string):void;
            }
            type QuoteDoParam_T = QuoteDoParam_S & QuoteDoParam$;
            interface QuoteDoParam extends QuoteDoParam_T {
            }
            interface QuoteFilterParam_S {
            }
            interface QuoteFilterParam_C extends QuoteFilterParam_S {
                /**
                 * @param quotePreFilter ȡ��ǰ������
                 * @param sourceFilter �۸���Դ����
                 * @param quoteScheme ȡ�۷���
                 * @param calcStratege �������
                 */
                new(quotePreFilter:$.kd.bos.orm.query.QFilter,sourceFilter:$.kd.bos.orm.query.QFilter,quoteScheme:$.kd.bos.dataentity.entity.DynamicObject,calcStratege:$.kd.bos.dataentity.entity.DynamicObject):QuoteFilterParam;
            }
            interface QuoteFilterParam$ {
                getCalcStratege():$.kd.bos.dataentity.entity.DynamicObject;
                getQuotePreFilter():$.kd.bos.orm.query.QFilter;
                getQuotePreFilterDesc():string;
                getQuoteScheme():$.kd.bos.dataentity.entity.DynamicObject;
                getSourceFilter():$.kd.bos.orm.query.QFilter;
                getSourceFilterDesc():$.kd.bos.orm.query.QFilter;
                setCalcStratege(calcStratege:$.kd.bos.dataentity.entity.DynamicObject):void;
                setQuotePreFilter(quotePreFilter:$.kd.bos.orm.query.QFilter):void;
                setQuotePreFilterDesc(quotePreFilterDesc:string):void;
                setQuoteScheme(quoteScheme:$.kd.bos.dataentity.entity.DynamicObject):void;
                setSourceFilter(sourceFilter:$.kd.bos.orm.query.QFilter):void;
                setSourceFilterDesc(sourceFilterDesc:$.kd.bos.orm.query.QFilter):void;
            }
            type QuoteFilterParam_T = QuoteFilterParam_S & QuoteFilterParam$;
            interface QuoteFilterParam extends QuoteFilterParam_T {
            }
            interface IQuoteCasePlugin_S {
            }
            interface IQuoteCasePlugin$ {
                /**
                 * �÷�������������ȡ�����ݼ���
                 * ˵���������е����ݼ������Ǿ���ȡ�۷���������Ĵ����������ݼ�����ο�ԭ������������ݼ��������ݼ�����������߼�
                 *
                 * @param  e ��ѯ��������
                 * @return boolean ����boolean true����Ҫ����ԭʼȡ�۵������ݼ�  false��������ȡ�۵������ݼ�
                 */
                doQuote?(e:QuoteDoParam):boolean;
                /**
                 * �Ƿ���ȫ�Զ������ȡ�۹����߼�
                 *
                 * @param quoteScheme ȡ�۷���
                 * @return true: �ɲ���Զ���ȡ�����ݼ�ƥ��������߼�  false:���ñ�׼��Ʒ�߼�
                 */
                isReplaceQuote?(quoteScheme:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �÷�������������ȡ��ǰ������
                 * @param  e ��ѯ��������
                 * @return true: �ɹ�  false:ʧ��
                 */
                preQuote?(e:QuoteFilterParam):boolean;
            }
            type IQuoteCasePlugin_T = IQuoteCasePlugin_S & IQuoteCasePlugin$;
            interface IQuoteCasePlugin extends IQuoteCasePlugin_T {
            }
        }
        namespace kd.sdk.mpscmm.msbd.expoint.workbench{
            interface IWorkBenchPlugin_S {
            }
            interface IWorkBenchPlugin$ {
                /**
                 * ��ȡҵ��Ա��ҵ����
                 *
                 * @param bizData        ��������
                 * @param entryRowData   һ�з�¼�����ݣ��������ǰ���¼�����ɣ���ֵΪnull
                 * @param genTaskByEntry �Ƿ񰴷�¼����������true-�� false-��
                 * @return ҵ��Ա��ҵ����
                 */
                getBizOperatorAndGroup?(bizData:$.kd.bos.dataentity.entity.DynamicObject,entryRowData:$.kd.bos.dataentity.entity.DynamicObject,genTaskByEntry:boolean):BizOperatorAndGroup;
                /**
                 * �ֶ�׼�����������̨����ҵ��Ա��ҵ������Ҫ�õ����ֶ�
                 *
                 * @param entityNumber ʵ���ʶ
                 * @param domainNumber �����ʶ
                 * @return ��Ҫ�õ����ֶ�set
                 */
                preparePropertys?(entityNumber:string,domainNumber:string):$.java.util.Set;
            }
            type IWorkBenchPlugin_T = IWorkBenchPlugin_S & IWorkBenchPlugin$;
            interface IWorkBenchPlugin extends IWorkBenchPlugin_T {
            }
            interface BizOperatorAndGroup_S {
            }
            interface BizOperatorAndGroup_C extends BizOperatorAndGroup_S {
                new():BizOperatorAndGroup;
            }
            interface BizOperatorAndGroup$ {
                getGroup():$.kd.bos.dataentity.entity.DynamicObject;
                getOperator():$.kd.bos.dataentity.entity.DynamicObject;
                setGroup(group:$.kd.bos.dataentity.entity.DynamicObject):void;
                setOperator(operator:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type BizOperatorAndGroup_T = BizOperatorAndGroup_S & BizOperatorAndGroup$;
            interface BizOperatorAndGroup extends BizOperatorAndGroup_T {
            }
        }
        namespace kd.sdk.mpscmm.mscon{
            interface SdkMsconModule_S {
            }
            type SdkMsconModule_ST = $.kd.sdk.module.Module & SdkMsconModule_S;
            interface SdkMsconModule_C extends SdkMsconModule_ST {
                new():SdkMsconModule;
            }
            interface SdkMsconModule$ {
            }
            type SdkMsconModule_T = $.kd.sdk.module.Module & SdkMsconModule_S & SdkMsconModule$;
            interface SdkMsconModule extends SdkMsconModule_T {
            }
        }
        namespace kd.sdk.mpscmm.mscon.extpoint.documentedit{
            interface IDocumentPlugin_S {
            }
            interface IDocumentPlugin$ {
                /**
                 * @Description �ĵ� �����Ϊ�������¼�
                 */
                afterSaveAsDocument?(event:kd.sdk.mpscmm.mscon.extpoint.documentedit.events.AfterSaveAsDocumentEvent):void;
                /**
                 * @Description �ĵ��б���ʼ����ǰ�����¼�
                 */
                beforeOpenDocumentList?(event:kd.sdk.mpscmm.mscon.extpoint.documentedit.events.BeforeOpenDocumentListEvent):void;
                /**
                 * @Description �ĵ������Ϊ��ҳ���ǰ�����¼�
                 */
                beforeOpenSaveAsForm?(event:kd.sdk.mpscmm.mscon.extpoint.documentedit.events.BeforeOpenSaveAsFormEvent):void;
                /**
                 * @Description �������滻��ǰ�����¼�
                 */
                beforeReplaceVariable?(event:kd.sdk.mpscmm.mscon.extpoint.documentedit.events.BeforeReplaceVariableEvent):void;
                /**
                 * @Description �ĵ� �����Ϊ��ǰ�����¼�
                 */
                beforeSaveAsDocument?(event:kd.sdk.mpscmm.mscon.extpoint.documentedit.events.BeforeSaveAsDocumentEvent):void;
            }
            type IDocumentPlugin_T = IDocumentPlugin_S & IDocumentPlugin$;
            interface IDocumentPlugin extends IDocumentPlugin_T {
            }
        }
        namespace kd.sdk.mpscmm.mscon.extpoint.documentedit.events{
            interface BeforeOpenSaveAsFormEvent_S {
            }
            interface BeforeOpenSaveAsFormEvent_C extends BeforeOpenSaveAsFormEvent_S {
                new(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):BeforeOpenSaveAsFormEvent;
            }
            interface BeforeOpenSaveAsFormEvent$ {
                getCustomParam():$.java.util.Map;
                getDataEntity():$.kd.bos.dataentity.entity.DynamicObject;
                getDocType():string;
                getDocTypeList():$.java.util.List;
                getFileName():string;
                getPosition():string;
                getPositionList():$.java.util.List;
                getSaveAsFormId():string;
                setCustomParam(customParam:$.java.util.Map):void;
                setDocType(docType:string):void;
                setDocTypeList(docTypeList:$.java.util.List):void;
                setFileName(fileName:string):void;
                setPosition(position:string):void;
                setPositionList(positionList:$.java.util.List):void;
                setSaveAsFormId(saveAsFormId:string):void;
            }
            type BeforeOpenSaveAsFormEvent_T = BeforeOpenSaveAsFormEvent_S & BeforeOpenSaveAsFormEvent$;
            interface BeforeOpenSaveAsFormEvent extends BeforeOpenSaveAsFormEvent_T {
            }
            interface AfterSaveAsDocumentEvent_S {
            }
            interface AfterSaveAsDocumentEvent_C extends AfterSaveAsDocumentEvent_S {
                new():AfterSaveAsDocumentEvent;
            }
            interface AfterSaveAsDocumentEvent$ {
                dataEntity:$.kd.bos.dataentity.entity.DynamicObject;
                document:$.java.util.Map;
                getCustomParam():$.java.util.Map;
                getDataEntity():$.kd.bos.dataentity.entity.DynamicObject;
                getDocument():$.java.util.Map;
                setCustomParam(customParam:$.java.util.Map):void;
                setDataEntity(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):void;
                setDocument(document:$.java.util.Map):void;
            }
            type AfterSaveAsDocumentEvent_T = AfterSaveAsDocumentEvent_S & AfterSaveAsDocumentEvent$;
            interface AfterSaveAsDocumentEvent extends AfterSaveAsDocumentEvent_T {
            }
            interface BeforeReplaceVariableEvent_S {
            }
            interface BeforeReplaceVariableEvent_C extends BeforeReplaceVariableEvent_S {
                new(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):BeforeReplaceVariableEvent;
            }
            interface BeforeReplaceVariableEvent$ {
                getCustomParam():$.java.util.Map;
                getDataEntity():$.kd.bos.dataentity.entity.DynamicObject;
                getMark():string;
                getValue():any;
                setCustomParam(customParam:$.java.util.Map):void;
                setMark(mark:string):void;
                setValue(value:any):void;
            }
            type BeforeReplaceVariableEvent_T = BeforeReplaceVariableEvent_S & BeforeReplaceVariableEvent$;
            interface BeforeReplaceVariableEvent extends BeforeReplaceVariableEvent_T {
            }
            interface BeforeOpenDocumentListEvent_S {
            }
            interface BeforeOpenDocumentListEvent_C extends BeforeOpenDocumentListEvent_S {
                new(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):BeforeOpenDocumentListEvent;
            }
            interface BeforeOpenDocumentListEvent$ {
                getCustomParam():$.java.util.Map;
                getDataEntity():$.kd.bos.dataentity.entity.DynamicObject;
                getDocuments():$.java.util.List;
                isShowListForm():boolean;
                setCustomParam(customParam:$.java.util.Map):void;
                setDataEntity(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):void;
                setDocuments(documents:$.java.util.List):void;
                setShowListForm(showListForm:boolean):void;
            }
            type BeforeOpenDocumentListEvent_T = BeforeOpenDocumentListEvent_S & BeforeOpenDocumentListEvent$;
            interface BeforeOpenDocumentListEvent extends BeforeOpenDocumentListEvent_T {
            }
            interface BeforeSaveAsDocumentEvent_S {
            }
            interface BeforeSaveAsDocumentEvent_C extends BeforeSaveAsDocumentEvent_S {
                new():BeforeSaveAsDocumentEvent;
            }
            interface BeforeSaveAsDocumentEvent$ {
                dataEntity:$.kd.bos.dataentity.entity.DynamicObject;
                document:$.java.util.Map;
                getCustomParam():$.java.util.Map;
                getDataEntity():$.kd.bos.dataentity.entity.DynamicObject;
                getDocument():$.java.util.Map;
                isCancel():boolean;
                setCancel(cancel:boolean):void;
                setCustomParam(customParam:$.java.util.Map):void;
                setDataEntity(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):void;
                setDocument(document:$.java.util.Map):void;
            }
            type BeforeSaveAsDocumentEvent_T = BeforeSaveAsDocumentEvent_S & BeforeSaveAsDocumentEvent$;
            interface BeforeSaveAsDocumentEvent extends BeforeSaveAsDocumentEvent_T {
            }
        }
        namespace kd.sdk.mpscmm.msmob{
            interface SdkMsmobModule_S {
            }
            type SdkMsmobModule_ST = $.kd.sdk.module.Module & SdkMsmobModule_S;
            interface SdkMsmobModule_C extends SdkMsmobModule_ST {
                new():SdkMsmobModule;
            }
            interface SdkMsmobModule$ {
            }
            type SdkMsmobModule_T = $.kd.sdk.module.Module & SdkMsmobModule_S & SdkMsmobModule$;
            interface SdkMsmobModule extends SdkMsmobModule_T {
            }
        }
        namespace kd.sdk.mpscmm.msmob.expoint{
            interface IMobOpenApiUrlMapping_S {
            }
            interface IMobOpenApiUrlMapping$ {
                /**
                 * ����ԭ���ӿڸ������ӿڵĵ�ַӳ���ϵ
                 * @return key=ԭ���Ľӿڵ�ַ��,value=�����Ľӿڵ�ַ
                 */
                urlMapping?():$.java.util.Map;
            }
            type IMobOpenApiUrlMapping_T = IMobOpenApiUrlMapping_S & IMobOpenApiUrlMapping$;
            interface IMobOpenApiUrlMapping extends IMobOpenApiUrlMapping_T {
            }
            interface IMobOperationDataTransferPlugin_S {
            }
            interface IMobOperationDataTransferPlugin$ {
                /**
                 * �����beforeDoOperation�л�����������
                 * @param plugIn  ����plugIn��Ϊ����������������е���֡�������Ŀ���ǿ��ǵ���������������Ҫ��ȡpageCache֮��Ķ�����
                 * @param args
                 */
                beforeDoOperation?(plugIn:$.kd.bos.bill.AbstractMobBillPlugIn,args:$.kd.bos.form.events.BeforeDoOperationEventArgs):void;
                /**
                 * ����PCʵ�����
                 * @param operationKey
                 * @param pcEntityKey
                 * @param mobDataEntity
                 * @return
                 */
                executeWithEntity?(operationKey:string,pcEntityKey:string,mobDataEntity:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
            }
            type IMobOperationDataTransferPlugin_T = IMobOperationDataTransferPlugin_S & IMobOperationDataTransferPlugin$;
            interface IMobOperationDataTransferPlugin extends IMobOperationDataTransferPlugin_T {
            }
            interface IMobHomePageCustomDataPlugin_S {
            }
            interface IMobHomePageCustomDataPlugin$ {
                /**
                 * ɾ��������Ȩ����ҵ��ģ��
                 * ע�� ��
                 * ��Ҫ�޸ĶԵ�����ͼ����
                 * ���ò���������Ӧ�Ķ����˵����ʶ����
                 *
                 * @param view    ��Ӧ�ı���ͼ
                 * @param extKeys ����������ʶ����
                 * @return ������Ҫɾ������ҵ��ģ���ʶ��
                 */
                deleteWithoutPermissionCard?(view:$.kd.bos.form.IFormView,extKeys:$.java.util.Set):$.java.util.Set;
                /**
                 * ������Ҫɾ���Ķ����˵���ʶ
                 * ע�� ��
                 * ��Ҫ�޸ĶԵ�����ͼ����
                 * ���ò���������Ӧ�Ķ����˵����ʶ����
                 *
                 * @param view    ��Ӧ�ı���ͼ
                 * @param extKeys �����˵����ʶ����
                 * @return ��Ҫɾ����Ȩ�Ĳ˵�ģ���ʶ
                 */
                deleteWithoutPermissionMenu?(view:$.kd.bos.form.IFormView,extKeys:$.java.util.Set):$.java.util.Set;
                /**
                 * ��ȡ��Ҫ�������appId
                 * ֻ��ɾ����ӦӦ�õĶ�����
                 *
                 * @return
                 */
                getAppId():string;
            }
            type IMobHomePageCustomDataPlugin_T = IMobHomePageCustomDataPlugin_S & IMobHomePageCustomDataPlugin$;
            interface IMobHomePageCustomDataPlugin extends IMobHomePageCustomDataPlugin_T {
            }
            interface IMobBotpResultHandlerPlugin_S {
            }
            interface IMobBotpResultHandlerPlugin$ {
                /**
                 * ���ڹ�Ӧ���ƶ��˿ͻ��ֳ��Լ�����BOTP���ƹ����в������쳣��Ϣ
                 * ����ʵ��onBotpFailed�������������쳣��Ϣ��
                 * ���Ҫ�����쳣��Ϣ����Ϻ����������У�һ�����ʹ�ã�throw new KDBizException(messageStr);
                 * ������û���׳��쳣�����쳣��Ϣ�Ĵ���Ȩ���ظ�ԭ�����봦��
                 * �������׳��쳣���쳣��Ϣ�ɶ�������ԭ���Ĵ��벻����
                 * ע�⣺�������չ��������÷�Χ�ǹ�Ӧ���ƶ�����Ŀ�鿪����ȫ�����Ƴ���������������ֻ�봦��ĳЩ�ض����ݵ������쳣��Ϣ��������ڴ����и��ݵ����������жϡ�
                 */
                onBotpFailed?(convertResult:$.kd.bos.entity.botp.runtime.ConvertOperationResult):void;
            }
            type IMobBotpResultHandlerPlugin_T = IMobBotpResultHandlerPlugin_S & IMobBotpResultHandlerPlugin$;
            interface IMobBotpResultHandlerPlugin extends IMobBotpResultHandlerPlugin_T {
            }
            interface MsmobExpandCaseCodes_S {
                readonly SCMC_MSMOB_CUSTOM_DELETE_REGION:string;
                readonly SCMC_MSMOB_MOB_LIST_EXPAND_FITER:string;
            }
            interface MsmobExpandCaseCodes_C extends MsmobExpandCaseCodes_S {
                new():MsmobExpandCaseCodes;
            }
            interface MsmobExpandCaseCodes$ {
            }
            type MsmobExpandCaseCodes_T = MsmobExpandCaseCodes_S & MsmobExpandCaseCodes$;
            interface MsmobExpandCaseCodes extends MsmobExpandCaseCodes_T {
            }
        }
        namespace kd.sdk.mpscmm.msrcs{
            interface SdkMsrcsModule_S {
            }
            type SdkMsrcsModule_ST = $.kd.sdk.module.Module & SdkMsrcsModule_S;
            interface SdkMsrcsModule_C extends SdkMsrcsModule_ST {
                new():SdkMsrcsModule;
            }
            interface SdkMsrcsModule$ {
            }
            type SdkMsrcsModule_T = $.kd.sdk.module.Module & SdkMsrcsModule_S & SdkMsrcsModule$;
            interface SdkMsrcsModule extends SdkMsrcsModule_T {
            }
        }
        namespace kd.sdk.mpscmm.msrcs.extpoint{
            interface IRebatePlugin_S {
            }
            interface IRebatePlugin$ {
                /**
                 * �Զ��� ����Ŀ�����ı�ʶ
                 * ���ڷ��������Ŀ����������Ż����������Ը��ݾ���������ж��ƻ��������Ż������������ܣ�
                 * ������
                 * ÿ��Ŀ�굥�����н������������Ż� 						return String.valueOf(target.getLong("id"));
                 * ��׼��Ʒ����������+��ʼʱ��+����ʱ��+�޸�ʱ�� ���з����Ż�	return String.join("#",
                 *  			  									String.valueOf(DynamicObjectUtils.getDynamicObjectLPkValue(target, MsrcsRebateTarget.F_POLICY)),
                 *   			  									DateUtil.getDateTimeFormat(target.getDate( MsrcsRebateTarget.F_STARTTIME)),
                 *   			  									DateUtil.getDateTimeFormat(target.getDate( MsrcsRebateTarget.F_ENDTIME)),
                 *   			  									DateUtil.getDateTimeFormat(target.getDate( MsrcsRebateTarget.F_MODIFYTIME)));
                 * @param target		����Ŀ��
                 * @return				����Ŀ�����key�ַ���
                 */
                buildTargetGroupKey?(target:$.kd.bos.dataentity.entity.DynamicObject):string;
            }
            type IRebatePlugin_T = IRebatePlugin_S & IRebatePlugin$;
            interface IRebatePlugin extends IRebatePlugin_T {
            }
        }
        namespace kd.sdk.scmc.conm{
            interface SdkScmcConmModule_S {
            }
            type SdkScmcConmModule_ST = $.kd.sdk.module.Module & SdkScmcConmModule_S;
            interface SdkScmcConmModule_C extends SdkScmcConmModule_ST {
                new():SdkScmcConmModule;
            }
            interface SdkScmcConmModule$ {
            }
            type SdkScmcConmModule_T = $.kd.sdk.module.Module & SdkScmcConmModule_S & SdkScmcConmModule$;
            interface SdkScmcConmModule extends SdkScmcConmModule_T {
            }
        }
        namespace kd.sdk.scmc.conm.extpoint{
            interface IWebOfficePlugin_S {
            }
            interface IWebOfficePlugin$ {
                /**
                 * �����滻ʱ����Բ�ͬ����ǩ���������Զ����Ӧ��ֵ
                 * @param bill ��ǰ���ݶ���
                 * @param mark ��ǩ����
                 * @return ����ֵ
                 */
                replaceMark(bill:$.kd.bos.dataentity.entity.DynamicObject,mark:string):any;
            }
            type IWebOfficePlugin_T = IWebOfficePlugin_S & IWebOfficePlugin$;
            interface IWebOfficePlugin extends IWebOfficePlugin_T {
            }
            interface IXContractPlugin_S {
            }
            interface IXContractPlugin$ {
                /**
                 * ��ͬ�������Ч��ͬ���޸�ԭ��ͬ��¼�͵�ͷ״̬
                 * @param srcBills  ԭ�����ݣ��ɹ���ͬ�����ۺ�ͬ
                 * @param xBills    ��������ݣ��ɹ���ͬ����������ۺ�ͬ�����
                 * @return ͬ�������Ĭ�Ϸ���true, Ҫ��ͬ���ɹ����أ�true ʧ�ܷ��أ�false
                 */
                activeSynContractStatus?(srcBills:$.kd.bos.dataentity.entity.DynamicObject[],xBills:$.kd.bos.dataentity.entity.DynamicObject[]):boolean;
            }
            type IXContractPlugin_T = IXContractPlugin_S & IXContractPlugin$;
            interface IXContractPlugin extends IXContractPlugin_T {
            }
        }
        namespace kd.sdk.scmc.im{
            interface SdkScmcImModule_S {
            }
            type SdkScmcImModule_ST = $.kd.sdk.module.Module & SdkScmcImModule_S;
            interface SdkScmcImModule_C extends SdkScmcImModule_ST {
                new():SdkScmcImModule;
            }
            interface SdkScmcImModule$ {
            }
            type SdkScmcImModule_T = $.kd.sdk.module.Module & SdkScmcImModule_S & SdkScmcImModule$;
            interface SdkScmcImModule extends SdkScmcImModule_T {
            }
        }
        namespace kd.sdk.scmc.im.acct{
            interface DateHelper_S {
                /**
                 * ĳ��֯������������
                 */
                getCloseDate(orgID:long):Date;
                /**
                 * ��ÿ����֯����������
                 */
                getInvStartedDate(orgID:long):Date;
                /**
                 * �Ӳֿ������У����ĳ���ֿ�ĳ�ʼ������
                 */
                getWarehouseInitDate(warehouseIDs:long[]):$.java.util.Map;
            }
            interface DateHelper_C extends DateHelper_S {
                new():DateHelper;
            }
            interface DateHelper$ {
            }
            type DateHelper_T = DateHelper_S & DateHelper$;
            interface DateHelper extends DateHelper_T {
            }
            interface InvSchemeHelper_S {
                /**
                 * ���ݿ�������ȡĬ�����������
                 */
                getDefaltInvtype(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݿ�������ȡĬ�ϳ���������
                 */
                getDefaltOutInvtype(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݿ�������ȡĬ�������״̬
                 */
                getDefaultInvStatus(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݿ�������ȡĬ�������״̬
                 */
                getDefaultOutInvStatus(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݵ��ݺ�ҵ�����ͻ�ÿ��������
                 */
                getInvSchemeByEntityAndBizType(billFormID:string,bizTypeID:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݵ��ݻ�ÿ�������壬�����ڴ�ʱУ��
                 */
                getInvSchemeByEntityID(entityID:string):$.java.util.List;
                /**
                 * ���ݿ�������ȡĬ����������ͼ���
                 */
                getInvtypes(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.List;
                /**
                 * ���ݿ�������ȡĬ�ϳ��������ͼ���
                 */
                getOutInvtypes(invScheme:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.List;
                /**
                 * ����������������ؿ���
                 *
                 * @author rd_qirui_chen
                 */
                setSpecialEnable(view:$.kd.bos.form.IFormView,invScheme:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ���ÿ���������չʾ��Ϣ
                 *
                 * @param view
                 * @param isInUpdate
                 * @param isOutUpdate
                 */
                setViewByUpdate(view:$.kd.bos.form.IFormView,isInUpdate:boolean,isOutUpdate:boolean):void;
            }
            interface InvSchemeHelper_C extends InvSchemeHelper_S {
                new():InvSchemeHelper;
            }
            interface InvSchemeHelper$ {
            }
            type InvSchemeHelper_T = InvSchemeHelper_S & InvSchemeHelper$;
            interface InvSchemeHelper extends InvSchemeHelper_T {
            }
            interface InverseBillHelper_S {
                /**
                 * ��ȡ�����ֶΣ�ͳһά�����ڲ���������������ֵ�ı��¼���ͳһ��ȡ
                 */
                getNeedInverseColumns(billEntity:string):string[];
                /**
                 * �Ƿ���ֵ����������������շ����ͣ��շ����ͷ���Ϊ����ʱ
                 *
                 * @return
                 */
                isNegativeBill(model:$.kd.bos.entity.datamodel.IDataModel):boolean;
                /**
                 * ���ú쵥��Ҫ�෴����Ϊ����
                 */
                setInverseValues(model:$.kd.bos.entity.datamodel.IDataModel,needInverseColumns:string[]):void;
                /**
                 * ���ݣ��Ƿ������������չʾ����ɫ
                 */
                setNegativeColumnColor(view:$.kd.bos.form.IFormView,redColumns:string[]):void;
            }
            interface InverseBillHelper_C extends InverseBillHelper_S {
                new():InverseBillHelper;
            }
            interface InverseBillHelper$ {
            }
            type InverseBillHelper_T = InverseBillHelper_S & InverseBillHelper$;
            interface InverseBillHelper extends InverseBillHelper_T {
            }
            interface BillQtyAndUnitHelper_S {
                /**
                 * ��������������
                 * ��֪�����ϡ�����������������λ���Ƽ۵�λ���Ƽ۵�λ������
                 * ���㣺����������������λ�����������ʡ�ҵ��������ҵ��λ��ҵ�����ʡ��Ƽ�����
                 */
                getQty(material:$.kd.bos.dataentity.entity.DynamicObject,baseQty:$.java.math.BigDecimal,baseUnit:$.kd.bos.dataentity.entity.DynamicObject,unit:$.kd.bos.dataentity.entity.DynamicObject,unitRate:$.java.math.BigDecimal,bizUnit:$.kd.bos.dataentity.entity.DynamicObject,bizUnitRate:$.java.math.BigDecimal,priceUnit:$.kd.bos.dataentity.entity.DynamicObject,priceUnitRate:$.java.math.BigDecimal):$.java.util.Map;
                /**
                 * ������ ��ȡ������λ�Ļ�����
                 */
                getUnitRateConv(materialId:long,srcUnitId:long,desUnitId:long):$.java.math.BigDecimal;
                /**
                 * ���ݺͼ�����λ�ı仯��
                 * ����������λ������������ҵ��λ��ҵ�������������ʡ�ҵ��λ�����ʵı仯 - TODO �̵��δ���죬ʹ���У��̵�������ɾ��
                 */
                setBizQtyAndUnit(bill:$.kd.bos.entity.datamodel.IDataModel,rowindex:number,fieldName:string,newValue:any):void;
                /**
                 * �ж���������ϵͳԤ�����ݵ����ֵ9999999999999
                 *
                 * @param amount ����
                 */
                showAmountErrorTip(amount:$.java.math.BigDecimal):void;
            }
            interface BillQtyAndUnitHelper_C extends BillQtyAndUnitHelper_S {
                new():BillQtyAndUnitHelper;
            }
            interface BillQtyAndUnitHelper$ {
            }
            type BillQtyAndUnitHelper_T = BillQtyAndUnitHelper_S & BillQtyAndUnitHelper$;
            interface BillQtyAndUnitHelper extends BillQtyAndUnitHelper_T {
            }
            interface BillUnitAndQtytHelper_S {
                getDesQtyConv(material:$.kd.bos.dataentity.entity.DynamicObject,srcUnit:$.kd.bos.dataentity.entity.DynamicObject,srcQty:$.java.math.BigDecimal,desUnit:$.kd.bos.dataentity.entity.DynamicObject):$.java.math.BigDecimal;
                /**
                 * ���ݺͼ�����λ�ı仯��
                 * �������������������λ������������ҵ��λ��ҵ�������������ʡ�ҵ��λ�����ʵı仯
                 */
                setBizQtyAndUnitWithAuditQty(bill:$.kd.bos.entity.datamodel.IDataModel,rowindex:number,fieldName:string,newValue:any):void;
            }
            interface BillUnitAndQtytHelper_C extends BillUnitAndQtytHelper_S {
                new():BillUnitAndQtytHelper;
            }
            interface BillUnitAndQtytHelper$ {
            }
            type BillUnitAndQtytHelper_T = BillUnitAndQtytHelper_S & BillUnitAndQtytHelper$;
            interface BillUnitAndQtytHelper extends BillUnitAndQtytHelper_T {
            }
            interface SettleBillHelper_S {
                getGenerateSettleBills(billids:$.java.util.List):$.java.util.Map;
            }
            interface SettleBillHelper_C extends SettleBillHelper_S {
                new():SettleBillHelper;
            }
            interface SettleBillHelper$ {
            }
            type SettleBillHelper_T = SettleBillHelper_S & SettleBillHelper$;
            interface SettleBillHelper extends SettleBillHelper_T {
            }
            interface AuxQtyAndUnitHelper_S {
            }
            interface AuxQtyAndUnitHelper_C extends AuxQtyAndUnitHelper_S {
                new():AuxQtyAndUnitHelper;
            }
            interface AuxQtyAndUnitHelper$ {
                /**
                 * ������ȡ���ϼ�����λ
                 *
                 * @param materialIds
                 * @param convertType
                 * @return
                 * @author liuxian_liu
                 * @data 2019-12-19 15:57
                 */
                getAssistMUListResult(materialIds:$.java.util.List,convertType:string):$.java.util.Map;
                /**
                 * ��ȡ���ϸ���������
                 *
                 * @param pageCache
                 * @param material
                 * @return
                 * @author liuxian_liu
                 * @data 2020-03-10 21:30
                 */
                getAuxptyRateCache(pageCache:$.kd.bos.form.IPageCache,material:$.kd.bos.dataentity.entity.DynamicObject):$.java.math.BigDecimal;
                /**
                 * ���������Σ���������λ������
                 *
                 * @param pageCache ҳ�滺��
                 * @param bill      ��������ģ��
                 * @param rowindex  �к�
                 * @param fieldName �ı��ֶ�
                 * @param newValue  ��ֵ
                 */
                setAuxBizQtyAndUnit(pageCache:$.kd.bos.form.IPageCache,bill:$.kd.bos.entity.datamodel.IDataModel,rowindex:number,fieldName:string,newValue:any):any;
                /**
                 * �ж������������ϵͳԤ�����ݵ����ֵ9999999999999
                 *
                 * @param qtyAmount
                 */
                showQtyErrorTip(qtyAmount:$.java.math.BigDecimal):any;
            }
            type AuxQtyAndUnitHelper_T = AuxQtyAndUnitHelper_S & AuxQtyAndUnitHelper$;
            interface AuxQtyAndUnitHelper extends AuxQtyAndUnitHelper_T {
            }
            interface InvBillCalcHelper_S {
                /**
                 * BOTP ʹ�ü��㸨������
                 *
                 * @param entrycoll
                 * @param entityID
                 * @param cacheMap
                 * @return
                 */
                entryAuxptyQtyCalc(entry:$.kd.bos.dataentity.entity.DynamicObject,entityID:string,cacheMap:$.java.util.Map):void;
            }
            interface InvBillCalcHelper_C extends InvBillCalcHelper_S {
                new():InvBillCalcHelper;
            }
            interface InvBillCalcHelper$ {
            }
            type InvBillCalcHelper_T = InvBillCalcHelper_S & InvBillCalcHelper$;
            interface InvBillCalcHelper extends InvBillCalcHelper_T {
            }
            interface SdkAppParameterHelper_S {
                /**
                 * @param formId
                 * @param orgId
                 * @param key
                 * @return
                 */
                getAppParameterByFormId(formId:string,orgId:long,key:string):any;
            }
            interface SdkAppParameterHelper_C extends SdkAppParameterHelper_S {
                new():SdkAppParameterHelper;
            }
            interface SdkAppParameterHelper$ {
                /**
                 * ��������ȡӦ�ò�������֪ʲôʱ�������getAppParameter��ƽ̨���Ϊ�ѹ�ʱ...���µ���У��ʱ��ȡ��������...
                 *
                 * @author:RD_longger_yang ����ʱ�䣺2019��7��4�� <p>
                 */
                getAppParameter(appId:string,viewType:string,orgId:long,key:string):any;
                /**
                 * ��Ӧ�ñ����Ӧ��Ӧ�ò���
                 */
                getAppParameterByAppNumber(appNumber:string,orgViewType:string,orgId:long,key:string):any;
                /**
                 * ��ʵ����ʵ�����ڵ�Ӧ�ò���
                 */
                getBatchAppParameterByFormId(formId:string,orgIds:$.java.util.List):$.java.util.Map;
            }
            type SdkAppParameterHelper_T = SdkAppParameterHelper_S & SdkAppParameterHelper$;
            interface SdkAppParameterHelper extends SdkAppParameterHelper_T {
            }
        }
        namespace kd.sdk.scmc.im.extpoint{
            interface IInvCountSchemeAuditExpand_S {
            }
            interface IInvCountSchemeAuditExpand$ {
                /**
                 * ��ȡ�̵㷽��-�̵����չ�ֶε�ӳ��
                 * @return �̵㷽��-�̵����չ�ֶε�ӳ�伯��
                 */
                getFieldMap():$.java.util.Map;
            }
            type IInvCountSchemeAuditExpand_T = IInvCountSchemeAuditExpand_S & IInvCountSchemeAuditExpand$;
            interface IInvCountSchemeAuditExpand extends IInvCountSchemeAuditExpand_T {
            }
            interface IInvEntrustExpand_S {
            }
            interface IInvEntrustExpand$ {
                /**
                 * ������۳��ⵥ�����ֶ�
                 * @param salOutBillEntry ��¼����
                 */
                fillSaloutBillEntryField(salOutBillEntry:$.kd.bos.dataentity.entity.DynamicObject,entrustEntry:$.java.util.Map):void;
                /**
                 * ������۳��ⵥ��ͷ�ֶ�
                 * @param salOutBill ���ݶ���
                 */
                fillSaloutBillHeadField(salOutBill:$.kd.bos.dataentity.entity.DynamicObject,entrustEntry:$.java.util.Map):void;
                /**
                 * ��չ��ѯί�д����嵥�ֶ�
                 * @return ��ѯ�ֶ�����
                 */
                selectSaleAgencyField():string[];
            }
            type IInvEntrustExpand_T = IInvEntrustExpand_S & IInvEntrustExpand$;
            interface IInvEntrustExpand extends IInvEntrustExpand_T {
            }
            interface ImExpandCaseCodes_S {
                readonly INVQUERY_FILTERANDRETURN:string;
                readonly INV_COUNTSCHEMEAUDIT:string;
                readonly INV_ENTRUST:string;
                readonly INV_FILLBATCH:string;
                readonly INV_GROUPBILL:string;
                readonly INV_MATCHRULEOUT:string;
            }
            interface ImExpandCaseCodes_C extends ImExpandCaseCodes_S {
                new():ImExpandCaseCodes;
            }
            interface ImExpandCaseCodes$ {
            }
            type ImExpandCaseCodes_T = ImExpandCaseCodes_S & ImExpandCaseCodes$;
            interface ImExpandCaseCodes extends ImExpandCaseCodes_T {
            }
            interface IInvQueryExpand_S {
                readonly FILTER:string;
            }
            interface IInvQueryExpand$ {
                /**
                 * ����ѯ�����к�Ĵ���,�������ڿ���ѯ���غ��ٶԽ���������һЩ���⴦������ϣ������ĳЩֵ��ֵ�ı䣬�Լ�����ֵ����Ҫ�ٶ�ĳЩֵ���и�����ȡֵ�߼��Ƚϸ���(���������ڼ�ʱ����ѯ�ֶλ�̶�ֵ)
                 * @param view ������ͼ����
                 * @param entrykey ѡ�еĵ��ݷ�¼��ʶ
                 * @param chooseRow �û�ѡ�е��к�(��δѡ����,��ֵ����-1)
                 * @param currentRow ��ǰ������к�
                 * @param operatekey ��������(��ֱ�ӵ������ĵ���͵�������ѯ��Ӧ��ͬ�Ĳ�������)
                 */
                afterReturnRow?(view:$.kd.bos.form.IFormView,entrykey:string,chooseRow:number,currentRow:number,operatekey:string):void;
                /**
                 * ����ѯ����������ǰ�Ĵ���,�������ڿ���ѯ����������ǰ�������и�Ĭ��ֵ,��Ĭ��ֵȡֵ�߼��Ƚϸ���(���������ڼ�ʱ����ѯ�ֶλ�̶�ֵ)
                 * @param view ������ͼ����
                 * @param entrykey ѡ�еĵ��ݷ�¼��ʶ
                 * @param chooseRow �û�ѡ�е��к�(��δѡ����,��ֵ����-1)
                 * @param currentRow ��ǰ�������к�
                 * @param operatekey ��������(��ֱ�ӵ������ĵ���͵�������ѯ��Ӧ��ͬ�Ĳ�������)
                 */
                beforeCreateRow?(view:$.kd.bos.form.IFormView,entrykey:string,chooseRow:number,currentRow:number,operatekey:string):void;
                /**
                 * �ӹ�����ѯ������ֵ
                 * @param view ��ǰ���ݵ�view����
                 * @param returnData ����ѯ����ֵ
                 */
                dealReturnData?(view:$.kd.bos.form.IFormView,returnData:any):void;
                /**
                 * ��ȡ����ѯ��չQFilter,�˲�����չ�Ĺ������������ڴ򿪿���ѯǰ�ĵ���ҳ��<br/>
                 *  ���ڵ���׼����ѯ�������õ��ֶ�ӳ�䲻�������������ҵ������,����ĳЩ���ⵥ��,��Ҫ����ֻ��ѡ���ض����Ե�����/�ֿ��(����,ϣ��ֻ��ѡ��"���ʲ�"���͵�����)
                 * @param view �򿪿���ѯǰ�ĵ���ҳ����ͼ����
                 * @param entrykey ѡ�еĵ��ݷ�¼��ʶ
                 * @param row ѡ�е��к�(�統ǰδѡ����,��rowֵ����-1)
                 * @param operatekey ��������(��ֱ�ӵ������ĵ���͵�������ѯ��Ӧ��ͬ�Ĳ�������)
                 * @param filterMap ������filter����(ʹ��key="filter"��ȡ),���ں�������е��Ӵ�����һ��������ص�QFilter<br/>
                 * ����ͨ��QFilter filter = filterMap.get(FILTER)�õ���ǰ����չQFilter����,��filter������Ϻ�,��ʹ��filterMap.put(FILTER, filter)д����map��,�Ը�д��չ�Ĺ�������<br/>
                 * ע��,�����Ը�дͨ������ѯ�������ֶ�ӳ�����õĹ�������,������Ҫ��ֱ���ڹ����н������ã�����չ���ɶ��޷�ͨ������ѯ���ý������õĹ�������������չ
                 */
                getExpandFilter?(view:$.kd.bos.form.IFormView,entrykey:string,row:number,operatekey:string,filterMap:$.java.util.Map):void;
                /**
                 * ��ȡ����ѯ��չQFilter,�˲�����չ�Ĺ�������������"���ϼ�ʱ����ѯ"ҳ�汾����չ�Ĳ�ѯ�����ֶ�
                 * @param view "���ϼ�ʱ����ѯ"ҳ����ͼ����
                 * @return "���ϼ�ʱ����ѯ"ҳ������չ��ѯ�����ֶ������ӵĹ�������
                 */
                getExpandFilterFromQueryView?(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
                /**
                 *  ��ȡ����ѯ��չ���ص����ֶ��߼�����<br/>
                 *  ���ڵ���׼����ѯ�������õķ��ص����ֶβ��������������ҵ������<br/>
                 *  ����,ϣ����������ʱ�̶���ĳ���ֶθ�ֵ,ϣ����һ����ʱ����ѯ�ֶη��ص���������ֶ���(��׼����ֻ֧��һ���ֶη��ص�һ�������ֶ�)<br/>
                 *  @param view ������ͼ����
                 *  @param entrykey ѡ�еĵ��ݷ�¼��ʶ
                 *  @param row ѡ�е��к�(�統ǰδѡ����,��rowֵ����-1)
                 *  @param operatekey ��������(��ֱ�ӵ������ĵ���͵�������ѯ��Ӧ��ͬ�Ĳ�������)
                 *  @return ��Ҫ���ص����ݵ��ֶ��߼�����(���û����չ�򷵻�һ���ռ���,��Collections.emptyList())<br/>
                 *  ���ض�����һ��Map<String,String>����,֧�ַ��ع̶�ֵ�ʹӼ�ʱ����ֶ�ȡֵ������ʽ,ʾ�����£�<br/>
                 *  �����Ҫ�ڷ�������ʱ,���۸��ֶι̶�����Ϊ"1000",�Լ�����ѯ�������ֶγ��˷��ص������ϵ������ֶ�(���ڱ�׼����������)����,��ϣ��ͬʱ���ص���ע��<br/>
                 * �򷵻� [{key="billentry.entrycomment", type="acc",formula="lotnum"}, <br/>
                 *  {key="billentry.price", type="fix",formula="1000"}]<br/>
                 * ����,key�������ֶ�,type��ǰ֧��acc(�ӿ���ѯ�ֶη���)��fix(�̶�ֵ)��<br/>
                 * ��type="acc"ʱ,formula�����Ӧ�Ŀ���ѯ�ֶ�;��type="fix"ʱ,formula����ǰ�Ĺ̶�ֵ
                 */
                getExpandUpdateFields?(view:$.kd.bos.form.IFormView,entrykey:string,row:number,operatekey:string):$.java.util.List;
            }
            type IInvQueryExpand_T = IInvQueryExpand_S & IInvQueryExpand$;
            interface IInvQueryExpand extends IInvQueryExpand_T {
            }
            interface IInvBatchFillExpand_S {
            }
            interface IInvBatchFillExpand$ {
                /**
                 * ��ȡ�����������ֶ�
                 * @param entity ����ʶ
                 * @return ��Ҫ��չ�����ֶμ���
                 */
                getFieldKey(entity:string):$.java.util.List;
            }
            type IInvBatchFillExpand_T = IInvBatchFillExpand_S & IInvBatchFillExpand$;
            interface IInvBatchFillExpand extends IInvBatchFillExpand_T {
            }
            interface IInvMatchruleoutExpand_S {
                readonly RETURNROW_EXPENDVALUES:string;
                readonly RETURNROW_QTY:string;
                readonly RETURNROW_QTYCOL:string;
                readonly RETURNROW_ROWINDEX:string;
                readonly RETURNROW_ROWNUMS:string;
            }
            interface IInvMatchruleoutExpand$ {
                /**
                 * ��չƥ��������ʱ�Ŀ�漴ʱ����������
                 *
                 * @param getValue ��ȡ����ֵ������ͨ��getEntryValue.apply(��¼.��¼�ֶ�)�����ɻ�ȡ��ǰ�еķ�¼ֵ��getEntryValue.apply(��ͷ�ֶ�)���ɻ�ȡ��ͷ�ֶ�ֵ
                 * @param formId ����ʵ��
                 * @param entryKey ��¼��ֵ
                 * @return ��漴ʱ��������������
                 */
                getFilter?(func0:(t:any)=>any,formId:string,entryKey:string):$.java.util.List;
                /**
                 * ָ��������Ҫ���ݵ�handleAfter�����еġ�ִ��ƥ�����������ǰ���ֶ�ԭֵ���ֶα�ʶ��<br/>
                 * ���磬������չϣ���ڲ�ֺ����������չ�ֶΡ��������������¼��㣬����ʱ��Ҫʹ�õ����ǰ��������ԭֵ,���ڱ�������ָ�����ֶα�ʶ���ֶ�ԭֵ�������ӵ�handleAfter��returnRows��
                 * @param billtype ��������
                 * @param entrykey ��¼��ʶ
                 * @return ��Ҫ������Ҫ���ݵ�����handleAfter�����еġ�ִ��ƥ�����������ǰ���ֶ�ԭֵ���ֶα�ʶ
                 */
                getHandleNeedFields?(billtype:string,entrykey:string):$.java.util.List;
                /**
                 *  ��浥��ƥ�������������չ,����չ��������֧���ڱ�׼ƥ�������ⷵ�ص����ֶδ�����ɺ�ҳ��ִ��ˢ����ʾ��ǰ,���������ɶ������ֶν��ж��⸳ֵ����
                 *  @param view ������ͼ����
                 *  @param entrykey ��¼��ʶ
                 *  @param returnRows ƥ����������漰������Ϣ<br/>
                 *  returnRows����ʾ������:<br/>
                 *  �����¼������5����¼��,�����û�ѡ���˵�1,2,4��(index�ֱ�Ϊ0,1,3),���ƥ��������,�����зֱ�ƥ�䷵����2��/0��(û��ƥ�䵽���)/1��<br/>
                 *  ���غ�,����ԭ��1��(ԭindex=0)������1��(����2��,1��ƥ��,1���ڶ�Ӧѡ���к�����),���6����¼�У������ڵ�һ�к��������.ԭindex=1֮�����index�������1<br/>
                 * returnRows�е���Ϣ��������ƥ����к�,��Ӧ���б�ʶ��ƥ��������Ϣ�Լ���Ӧ���ֶβ��ǰԭֵ,������,������һ������Ϊ3��List<br/>
                 * [{returnRowNums=2, returnRowIndex=0, qty=5.0000, qtyCol="qty", expandNeedFieldValues={weight=30,volumn=12} }, <br/>
                 *  {returnRowNums=0, returnRowIndex=2, qty=10.0000, qtyCol="qty", expandNeedFieldValues={} }, <br/>
                 *  {returnRowNums=1, returnRowIndex=4, qty=3.0000, qtyCol="qty", expandNeedFieldValues={weight=50,volumn=15} }]<br/>
                 *  ����,returnRowNums����ԭ��һ��ѡ����ƥ�䵽�ķ�������,�ֱ�Ϊ2/0/1<br/>
                 * returnRowIndex����,ƥ����ԭѡ�����µ�index���ֱ�Ϊ0/2/4(����1/3/5��,���м������һ��,ԭѡ�еĵ�2��4��ƥ������˵�3�͵�5��) <br/>
                 * qty����,ƥ��ǰԭѡ���е�����,�����ǰ������ <br/>
                 * qtyCol����,����ƥ��ʱʹ�õ������ֶα�ʶ,ͨ����"qty" <br/>
                 * expandNeedFieldValues����,ƥ��ǰԭѡ���е�����������Ҫ���ֶε�ԭֵ(��Ҫ���ֶ���getHandleNeedFields��ָ������getHandleNeedFields��ָ����"weight"��"volumn",��Ὣ�������ֶβ��ǰ��ֵ���ݵ�returnRows��)<br/>
                 * ����,returnRowNums=0ʱ,expandNeedFieldValuesΪ�ռ���(��ƥ���У���������)
                 */
                handleAfter?(view:$.kd.bos.form.IFormView,entrykey:string,returnRows:$.java.util.List):void;
            }
            type IInvMatchruleoutExpand_T = IInvMatchruleoutExpand_S & IInvMatchruleoutExpand$;
            interface IInvMatchruleoutExpand extends IInvMatchruleoutExpand_T {
            }
        }
        namespace kd.sdk.scmc.im.service{
            interface MatchingRuleOutService_S {
                readonly OUTRULE_CALLBACK:string;
                /**
                 * ��ȡMatchingRuleOutServiceʵ������
                 *  @return MatchingRuleOutServiceʵ������
                 */
                get():MatchingRuleOutService;
            }
            interface MatchingRuleOutService$ {
                /**
                 * ��ƥ�����������ƥ�䲻������ʱ�����ܵ����û�ȷ�ϵĴ��ڣ��˷�������ƥ�������ⵯ������(������confirmCallBack����), ��Ҫ��execMatchingFromViewͬʱʹ��
                 *  @param view ����ҳ����ͼ����
                 *  @param e ��Ϣ�����ر��¼�����
                 * <p>ʾ������execMatchingFromViewʾ��,��formPlugin��confirmCallBack�����е��ñ�api
                 * 	 <pre><code>
                 * 	 public void confirmCallBack(MessageBoxClosedEvent e) {
                 *         super.confirmCallBack(e);
                 *         String callBackId = e.getCallBackId();
                 *         if (MatchingRuleOutService.OUTRULE_CALLBACK.equals(callBackId)) {
                 *             kd.sdk.scmc.im.service.MatchingRuleOutService matchingRuleOutService = kd.sdk.scmc.im.service.MatchingRuleOutService.get();
                 *             matchingRuleOutService.confirmCallBack(getView(), e);
                 *         }
                 *     }
                 * 	 </code></pre>
                 */
                confirmCallBack(view:$.kd.bos.form.IFormView,e:$.kd.bos.form.events.MessageBoxClosedEvent):void;
                /**
                 *  ��ĳ�з�¼ƥ�䵽���������ӻ���������ɾ������ɾ����¼ʱ����ô˷�������ҳ������beforeDeleteRow�����е��ã���������������˻ء�
                 *  @param index ��¼�кţ���0��ʼ
                 *  @param view ҳ��view����
                 *  @param entry ��¼������
                 *  <p>ʾ�����ڽ�������beforeDeleteRow()�����е��ô˽ӿڷ�����
                 * 	 <pre><code>
                 * 	  public void beforeDeleteRow(BeforeDeleteRowEventArgs e) {
                 * 		  super.beforeDeleteRow(e);
                 * 		  int[] rowIndexs = e.getRowIndexs();
                 * 		  //����api
                 * 		  kd.sdk.scmc.im.service.MatchingRuleOutService matchingRuleOutService = kd.sdk.scmc.im.service.MatchingRuleOutService.get();
                 * 		  for (int index : rowIndexs) {
                 * 			//ɾ����������
                 * 			matchingRuleOutService.deleteMatchInfoPageCache(index, getView(), "billentry");
                 * 		  }
                 * 	  }
                 * 	  </code></pre>
                 */
                deleteMatchInfoPageCache(index:number,view:$.kd.bos.form.IFormView,entry:string):void;
                /**
                 *  ִ��ƥ�����������(�ӵ���ҳ��"ƥ��������"��ť�������)
                 *  @param formPlugin ����ҳ������
                 *  @param formid ����ʵ��Ԫ����id
                 *  @param entry ƥ�������⹦�ܶ�Ӧ�ķ�¼��ʶ
                 *  @param operatekey ƥ�������ⰴť�Ĳ�������
                 *  @param view ����ҳ����ͼ����
                 *  @param selectRows ѡ�������
                 * <p>ʾ���������ڶ�������Ԫ������������һ����ƥ�������⡱��ť����ť�Ĳ�������Ϊmatchingruleout������Ҫ���ñ�׼��ƥ�������⹦�ܣ�Ӧ����formPlugin��beforeDoOperation�����е��ñ�api
                 * 	 <pre><code>
                 * 	 public void beforeDoOperation(BeforeDoOperationEventArgs args) {
                 *         super.beforeDoOperation(args);
                 *         String opKey = ((AbstractOperate) e.getSource()).getOperateKey();
                 *         switch (opKey) {
                 *             case "matchingruleout" :
                 *             	IFormView view = getView();
                 *             	String formid = getModel().getDataEntityType().getName();
                 *             	try {
                 *                     String msg = ResManager.loadKDString("����ƥ���棬���Ժ�", "XXXXXX", "XXXXXX");
                 *                     LocaleString info = new LocaleString(msg);
                 *                     view.showLoading(info);
                 *
                 *                     //ȡ��¼��ѡ����
                 *                     String entry = "billentry";
                 * 			        EntryGrid control = getControl(entry);
                 * 			        int[] selectRows = control.getSelectRows();
                 * 			        if (selectRows.length == 0) {
                 * 			            view.showTipNotification(ResManager.loadKDString("��ѡ��Ҫִ�е����ݡ�", "XXXXXX", "XXXXXX"));
                 * 			            return;
                 * 			        }
                 *
                 * 			        List<Integer> selectRowList = new ArrayList<>(selectRows.length);
                 * 			        for(int i = 0; i < selectRows.length; i++) {
                 * 			        	selectRowList.add(selectRows[i]);
                 * 			        }
                 *
                 * 			        //����api
                 * 			        kd.sdk.scmc.im.service.MatchingRuleOutService matchingRuleOutService = kd.sdk.scmc.im.service.MatchingRuleOutService.get();
                 * 			        matchingRuleOutService.execMatchingFromView(this, formid, entry, opKey, view, selectRowList);
                 *                 } finally {
                 *                 	view.hideLoading();
                 *                 }
                 *                 break;
                 *         }
                 *     }
                 * 	 </code></pre>
                 */
                execMatchingFromView(formPlugin:$.kd.bos.form.plugin.IFormPlugin,formid:string,entry:string,operatekey:string,view:$.kd.bos.form.IFormView,selectRows:$.java.util.List):void;
                /**
                 * �õ�ƥ��������Ĳ����Ϣ
                 * �����Ҫ�ں�̨�����У����Զ����ɵĵ��ݺ�ϣ��ִ��һ��ƥ����������̣�����ʹ�ñ�api�����ݷ��ص�List<Map<String, Object>>�����ϵĲ����Ϣ���Ե��ݷ�¼��DynamicObject���в�֡�����
                 *  @param formid ����ʵ��Ԫ����id
                 *  @param entry ƥ�������⹦�ܶ�Ӧ�ķ�¼��ʶ
                 *  @param operatekey ƥ�������ⰴť�Ĳ�������
                 *  @param billDynObj ���ݶ�̬ʵ�����
                 *  @param entriesDynObj ��Ҫ����ƥ��ĵ��ݷ�¼��̬���󼯺�
                 *  @return ƥ����
                 * <p>ʾ��
                 * 	 <pre><code>
                 * 	 kd.sdk.scmc.im.service.MatchingRuleOutService matchingRuleOutService = kd.sdk.scmc.im.service.MatchingRuleOutService.get();
                 * 	 List<Map<String, Object>> entryInfoList = matchingRuleOutService.getMatchingResultFromDynobj(formid, "billentry", "matchingruleout", view.getModel().getDataEntity(), view.getModel().getEntryEntity("billentry"));
                 * 	 ����entryInfoList�е���Ϣ��entriesDynObj������Ҫ�Ĵ���
                 *
                 * 	 api����ֵ����ϸ�������£������¼һ��3�У���1��ƥ����4������¼����2��ƥ����󣬵�3��ƥ����5������¼
                 * 	 [
                 * 		{materialmasterid=1510860254529869824, materialname=cqr_test_00003, qtyCol=qty, qty=34.0000000000, plusQty=0.00, rulename=����Ч��, orgid=100000, entryInfo=[
                 * 			{entryId=1510945563619637248, invaccId=1510867016268135425, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_001, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-16 00:00:00.0, expirydate=2024-09-16 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844674, entrycomment=},
                 * 			{entryId=1513917845556415488, invaccId=1510867016268135427, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_002, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-17 00:00:00.0, expirydate=2024-09-17 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844675, entrycomment=},
                 * 			{entryId=1513917845556536320, invaccId=1510867016268135428, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_003, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-18 00:00:00.0, expirydate=2024-09-18 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844676, entrycomment=},
                 * 			{entryId=1513917845556415489, invaccId=1510867016268135426, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_004, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-19 00:00:00.0, expirydate=2024-09-19 00:00:00.0, baseqty=10.0000000000, qty=4.0000000000, qtyunit2nd=0E-10, lot=1510866578642844672, entrycomment=}
                 * 		 ]
                 * 		},
                 *
                 * 		{
                 * 		 errMsg=���������Ϣ
                 * 		},
                 *
                 * 		{materialmasterid=1510860254529869824, materialname=cqr_test_00003, qtyCol=qty, qty=40.0000000000, plusQty=0.00, rulename=����Ч��, orgid=100000, entryInfo=[
                 * 			{entryId=1511429027150382080, invaccId=1510867016268135425, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_001, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-16 00:00:00.0, expirydate=2024-09-16 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844674, entrycomment=},
                 * 			{entryId=1513917845816583168, invaccId=1510867016268135427, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_002, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-17 00:00:00.0, expirydate=2024-09-17 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844675, entrycomment=},
                 * 			{entryId=1513917845816462336, invaccId=1510867016268135428, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_003, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-18 00:00:00.0, expirydate=2024-09-18 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844676, entrycomment=},
                 * 			{entryId=1513917845816583169, invaccId=1510867016268135426, material=1510860254529869824, warehouse=1194939339558420480, outownertype=bos_org, outkeepertype=bos_org, auxpty=0, outinvtype=688884005529250816, outinvstatus=691928582720825344, baseunit=1357068589710010368, location=0, outowner=100000, outkeeper=100000, lotnumber=MATCHOUT_004, project=0, configuredcode=0, tracknumber=0, unit=1357068589710010368, unit2nd=0, producedate=2022-09-19 00:00:00.0, expirydate=2024-09-19 00:00:00.0, baseqty=10.0000000000, qty=10.0000000000, qtyunit2nd=0E-10, lot=1510866578642844672, entrycomment=}
                 * 		 ]
                 * 		}
                 * 	 ]
                 * 	 ��A��List��size�Ͳ��ǰ��¼������һ�£�ÿһ��Ŀ���ζ�Ӧ�÷�¼��Ҫ���Ϊ������
                 * 	��B��ÿһ��ĿMap<String,Object>�������¼���key�����map.isEmptyΪ�棬˵������û�����ó����������ҵ��ȷ���������账��򱨴�(ǰ̨��ǰ��Ϊ����,���޷��ش�����Ϣ)��
                 * 		��1��������ϢerrMsg, ���get(��errMsg��)��Ϊ��˵�����д����ֶα���У������������errMsg��������Ϣ��������
                 * 		��2������mastid��materialmasterid=1510860254529869824
                 * 		��3���������ƣ�materialname=cqr_test_00003,
                 * 		��4���÷�¼���õ������ֶα�ʶ��qtyCol=qty,
                 * 		��5�����ǰԭ���� qty=34.0000000000,
                 * 		��6��ƥ���ʣ������(�ѱ�������)��plusQty=0.00,
                 * 		��7�����е�ƥ��������ƣ�rulename=����Ч��
                 * 		��8�������֯id��orgid=100000
                 * 		��9�����������Ϣ��entryInfo=һ���Ӳ�List<Map<String, Object>>���󣬺�̨����һ��ֻ��Ҫ���ģ�9��
                 * 	��C�����ڣ�9��entryInfo����ϸ˵���������÷�¼��Ҫ�����Ϊ�����еľ�����Ϣ��List��size��Ϊ��Ҫ���Ϊ�����У����sizeΪ0��˵��һ�����õĿ�涼û�У�����ҵ�񳡾�һ�����������账���ɣ�Ҳ������ʾ����ÿһ�е�Map<String, Object>������2+N��key������2���ֶι̶���
                 * 		��1��entryId����¼id��ÿ�е��׸�entryId���ǲ��ǰ��entryId����2�п�ʼΪapi�Զ�Ԥ����entryId�����÷�Ӧʹ����ЩentryId�����������ظ����ɣ�
                 * 		��2��invaccId����Ӧ�������ϸid��һ����÷�����Ҫʹ��
                 * 		��3�����������ֶΣ���Ӧ���ݷ�¼�ϵ��ֶα�ʶӦ�ñ����µ�ֵ��������ƥ�������������˷��ص��ݵ��ֶΣ��Լ����������Զ���������չ�ֶΣ��������������������Ϊ���ſ��Ƶ����ϣ�
                 * 	���⣬����ƥ����򷵻ص�����ֶ��⣬���ܻ����������⴦���磬���ݿ�����Ҫ�ȸ���Դ��ǰ���ֶΣ���������Ϊ�����Ƶ��ֶΣ���Դ���ݵȣ��������루3�����ֶΣ��������з�����ֶε�������ƣ����ܼۣ����У�����Ҫ���м���
                 * 	</code></pre>
                 */
                getMatchingResultFromDynobj(formid:string,entry:string,operatekey:string,billDynObj:$.kd.bos.dataentity.entity.DynamicObject,entriesDynObj:$.kd.bos.dataentity.entity.DynamicObjectCollection):$.java.util.List;
            }
            type MatchingRuleOutService_T = MatchingRuleOutService_S & MatchingRuleOutService$;
            interface MatchingRuleOutService extends MatchingRuleOutService_T {
            }
            interface LotnumService_S {
                readonly EXPIRYDATE:string;
                readonly PRODUCEDATE:string;
                /**
                 * ��ȡLotnumServiceʵ������
                 *  @return LotnumServiceʵ������
                 */
                get():LotnumService;
            }
            interface LotnumService$ {
                /**
                 * ���ݿ����֯ID�����Ͽ����ϢID�����ŵļ��ϣ���ѯ���������ٱ����ز�ѯ��Χ���������ں͵���������Ϣ����
                 *  @param orgIds �����֯ID����
                 *  @param materialIds ���Ͽ����ϢID����
                 *  @param lotNumbers ���ż���
                 *  @return ��ѯ�����������ں͵���������Ϣ����
                 * <p>ʾ������
                 * 	 <pre><code>
                 * 	 kd.sdk.scmc.im.service.LotnumService lotnumService = kd.sdk.scmc.im.service.LotnumService.get();
                 * 	 List<Object> orgIds = ArrayList<>();
                 * 	 orgIds.add(100000L);
                 * 	 List<Object> materialIds = new ArrayList<>();
                 * 	 materialIds.add(1159348455517429760L);
                 * 	 materialIds.add(1158762107278304256L);
                 * 	 List<String> lotNumbers = new ArrayList<>();
                 * 	 lotNumbers.add("PH-10061");
                 * 	 lotNumbers.add("123");
                 * 	 lotNumbers.add("121");
                 * 	 Map<String, Map<String, Date>> lifeDateMaps = lotnumService.getLifeDateFromLotIntrack(orgIds,materialIds,lotNumbers);
                 * 	 </code></pre>
                 * ���ؽ��lifeDateMaps�ĽṹΪ:{key:�����֯ID_���Ͽ����ϢID_����,value:{LotnumService.PRODUCEDATE=Date����,LotnumService.EXPIRYDATE=Date����}<br/>
                 *  ��:{100000_1159348455517429760_121={producedate=Mon May 17 00:00:00 CST 2021, expirydate=Sat Nov 13 00:00:00 CST 2021}, <br/>
                 *    100000_1159348455517429760_123={producedate=Thu May 20 00:00:00 CST 2021, expirydate=null}}
                 */
                getLifeDateFromLotIntrack(orgIds:$.java.util.List,materialIds:$.java.util.List,lotNumbers:$.java.util.List):$.java.util.Map;
            }
            type LotnumService_T = LotnumService_S & LotnumService$;
            interface LotnumService extends LotnumService_T {
            }
        }
        namespace kd.sdk.scmc.mobim{
            interface SdkMobImModule_S {
            }
            type SdkMobImModule_ST = $.kd.sdk.module.Module & SdkMobImModule_S;
            interface SdkMobImModule_C extends SdkMobImModule_ST {
                new():SdkMobImModule;
            }
            interface SdkMobImModule$ {
            }
            type SdkMobImModule_T = $.kd.sdk.module.Module & SdkMobImModule_S & SdkMobImModule$;
            interface SdkMobImModule extends SdkMobImModule_T {
            }
        }
        namespace kd.sdk.scmc.mobim.extpoint{
            interface MobImExpandCaseCodes_S {
                readonly INVQUERY_EXPAND_AFTER_RETURN_DATA:string;
                readonly INVQUERY_EXPAND_DETAIL_ENTRY_FIELDS:string;
                readonly INVQUERY_EXPAND_DETAIL_HEAD_FIELDS:string;
                readonly INVQUERY_EXPAND_LIST_FIELDS:string;
                readonly INVQUERY_FILTERANDRETURN:string;
            }
            interface MobImExpandCaseCodes_C extends MobImExpandCaseCodes_S {
                new():MobImExpandCaseCodes;
            }
            interface MobImExpandCaseCodes$ {
            }
            type MobImExpandCaseCodes_T = MobImExpandCaseCodes_S & MobImExpandCaseCodes$;
            interface MobImExpandCaseCodes extends MobImExpandCaseCodes_T {
            }
            interface IInvQueryExpand_S {
                readonly FILTER:string;
            }
            interface IInvQueryExpand$ {
                /**
                 * ��ʱ����ѯ��ӵ������ֶ��ֶ���չ��
                 *
                 * @param allQueryFieldSet ����ѯ���ֶΣ�<String String> ���ֶ���������
                 * @param showFieldSet     �ƶ���ҳ���ֶ�
                 */
                getExpandDetailEntryFields?(allQueryFieldSet:$.java.util.Set,showFieldSet:$.java.util.Set):void;
                /**
                 * ��ȡ����ѯ��չQFilter,�˲�����չ�Ĺ������������ڴ򿪿���ѯǰ�ĵ���ҳ��<br/>
                 * ���ڵ���׼����ѯ�������õ��ֶ�ӳ�䲻�������������ҵ������,����ĳЩ���ⵥ��,��Ҫ����ֻ��ѡ���ض����Ե�����/�ֿ��(����,ϣ��ֻ��ѡ��"���ʲ�"���͵�����)
                 *
                 * @param entity     �򿪿���ѯǰ�ĵ���ʵ�����
                 * @param entryKey   ѡ�еĵ��ݷ�¼��ʶ
                 * @param row        ѡ�е��к�(�統ǰδѡ����,��rowֵ����-1)
                 * @param operateKey ��������(��ֱ�ӵ������ĵ���͵�������ѯ��Ӧ��ͬ�Ĳ�������)
                 * @param filterMap  ������filter����(ʹ��key="filter"��ȡ),���ں�������е��Ӵ�����һ��������ص�QFilter<br/>
                 *                   ����ͨ��QFilter filter = filterMap.get(FILTER)�õ���ǰ����չQFilter����,��filter������Ϻ�,��ʹ��filterMap.put(FILTER, filter)д����map��,�Ը�д��չ�Ĺ�������<br/>
                 *                   ע��,�����Ը�дͨ������ѯ�������ֶ�ӳ�����õĹ�������,������Ҫ��ֱ���ڹ����н������ã�����չ���ɶ��޷�ͨ������ѯ���ý������õĹ�������������չ
                 */
                getExpandFilter?(entity:$.kd.bos.dataentity.entity.DynamicObject,entryKey:string,row:number,operateKey:string,filterMap:$.java.util.Map):void;
                /**
                 * ��ʱ����ѯ��ӵ���ͷ�ֶ��ֶ���չ��
                 *
                 * @param groupByFields ����ѯ�ֶ�
                 *                      key����ҳ���ֶα�ʶ��value�����ݿ����ֶ���
                 */
                getExpandHeadFields?(groupByFields:$.java.util.Map):void;
                /**
                 * ��ʱ����б��ѯ����ֶ���չ��
                 *
                 * @param groupByFields ����ѯ�ֶ�
                 *                      key���б��ϵ��ֶα�ʶ��value�Ƕ�Ӧ���ݿ�����ֶ�����
                 */
                getExpandListFields?(groupByFields:$.java.util.Map):void;
            }
            type IInvQueryExpand_T = IInvQueryExpand_S & IInvQueryExpand$;
            interface IInvQueryExpand extends IInvQueryExpand_T {
            }
        }
        namespace kd.sdk.scmc.pm{
            interface SdkScmcPmModule_S {
            }
            type SdkScmcPmModule_ST = $.kd.sdk.module.Module & SdkScmcPmModule_S;
            interface SdkScmcPmModule_C extends SdkScmcPmModule_ST {
                new():SdkScmcPmModule;
            }
            interface SdkScmcPmModule$ {
            }
            type SdkScmcPmModule_T = $.kd.sdk.module.Module & SdkScmcPmModule_S & SdkScmcPmModule$;
            interface SdkScmcPmModule extends SdkScmcPmModule_T {
            }
        }
        namespace kd.sdk.scmc.pm.extpoint{
            interface IXPurApplyCasePlugin_S {
            }
            interface IXPurApplyCasePlugin$ {
                /**
                 * �ɹ����뵥�����Чͬ���������ݷ�¼�͵�ͷ״̬
                 * @return ͬ�������Ĭ�Ϸ���true, Ҫ��ͬ���ɹ����أ�true ʧ�ܷ��أ�false<br/>
                 */
                activeSynApplyBillStatus?(srcBill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type IXPurApplyCasePlugin_T = IXPurApplyCasePlugin_S & IXPurApplyCasePlugin$;
            interface IXPurApplyCasePlugin extends IXPurApplyCasePlugin_T {
            }
            interface IPurQuotaCasePlugin_S {
            }
            interface IPurQuotaCasePlugin$ {
                /**
                 * ����µ�����ȡ������ɹ������еĿͻ�����Ϣ
                 * @param quotaInfos ����������Ϣ
                 * @return
                 */
                getCustomPushOrderInfos?(quotaInfos:$.java.util.Collection):$.java.util.Map;
            }
            type IPurQuotaCasePlugin_T = IPurQuotaCasePlugin_S & IPurQuotaCasePlugin$;
            interface IPurQuotaCasePlugin extends IPurQuotaCasePlugin_T {
            }
            interface IForecastPlanCasePlugin_S {
            }
            interface IForecastPlanCasePlugin$ {
                /**
                 * �ɹ�Ԥ��ƻ�����������
                 *  @param schemeId �����ƻ�����ID
                 *  @param startDate ��ʼִ������
                 *  @return ͬ�������Ĭ�Ϸ���List<String></>  <br/>
                 */
                getDateColumnList?(schemeId:long,startDate:Date):$.java.util.List;
            }
            type IForecastPlanCasePlugin_T = IForecastPlanCasePlugin_S & IForecastPlanCasePlugin$;
            interface IForecastPlanCasePlugin extends IForecastPlanCasePlugin_T {
            }
            interface IXPurOrderCasePlugin_S {
                readonly CANCEL_AMOUNTCHECKKEY:string;
                readonly CANCEL_QTYCHECKKEY:string;
            }
            interface IXPurOrderCasePlugin$ {
                /**
                 * �ɹ������Чͬ�����ε��ݿͻ������Ʋ���ӿ�,�ӿڵ���ʱ�����ɹ������Ч���������Чǰ�������������ε�����Ϣͬ��
                 *
                 * @param changeBillIds  �ɹ��������ID����<br/>
                 * ����ͨ��ID���ϲ�ѯ�������������ϸ��Ϣ�����������������ε�����Ϣͬ��<br/>
                 * @param changeBillEntity  �ɹ����������ʵ���ʶ���ɸ��ݸò������ִ���ͬ������ݵĶ�Ӧ�߼�
                 *
                 * @return ͬ�������Ĭ�Ϸ���true, Ҫ��ͬ���ɹ����أ�true ʧ�ܷ��أ�false  <br/>
                 */
                activeSynBillInfo?(changeBillIds:$.java.util.List,changeBillEntity:string):boolean;
                /**
                 * �ɹ������Чͬ���������ݷ�¼�͵�ͷ״̬
                 *
                 * @return ͬ�������Ĭ�Ϸ���true, Ҫ��ͬ���ɹ����أ�true ʧ�ܷ��أ�false  <br/>
                 */
                activeSynOrderBillStatus?(srcBill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �ɹ������Чȡ��У�飬�ӿڵ���ʱ�����ɹ������Ч���������Чʱ����������ȡ����ЧУ��
                 *
                 * @return  ȡ�������Ĭ�Ϸ��ؿ�Map��Ҫ�󷵻ؼ���ȡ��������� entryCheckCancel��true  <br/>
                 */
                cancelCheck?():$.java.util.Map;
            }
            type IXPurOrderCasePlugin_T = IXPurOrderCasePlugin_S & IXPurOrderCasePlugin$;
            interface IXPurOrderCasePlugin extends IXPurOrderCasePlugin_T {
            }
            interface PmExpandCaseCodes_S {
                readonly SCMC_PM_FORECASTPLAN_DATECOLUMN:string;
                readonly SCMC_PM_PURAPPLYBCBILL_ACTIVE_MODIFYSRCBILL:string;
                readonly SCMC_PM_PURORDERBCBILL_ACTIVE_MODIFYSRCBILL:string;
                readonly SCMC_PM_PURQUOTA:string;
                readonly SCMC_PM_VMIMANMALSETTLE_ADDCUSTOMPARAM:string;
                readonly SCMC_PM_VMISETTLE_ADJUSTSETTLEMODEL:string;
                readonly SCMC_PM_XSPURAPPLYBILL_ACTIVE_SYNCSTATUS:string;
                readonly SCMC_PM_XSPURORDERBILL_ACTIVE_CANCELCHECK:string;
                readonly SCMC_PM_XSPURORDERBILL_ACTIVE_SYNCBILL:string;
                readonly SCMC_PM_XSPURORDERBILL_ACTIVE_SYNCSTATUS:string;
            }
            interface PmExpandCaseCodes_C extends PmExpandCaseCodes_S {
                new():PmExpandCaseCodes;
            }
            interface PmExpandCaseCodes$ {
            }
            type PmExpandCaseCodes_T = PmExpandCaseCodes_S & PmExpandCaseCodes$;
            interface PmExpandCaseCodes extends PmExpandCaseCodes_T {
            }
            interface IPurBatChangeCasePlugin_S {
            }
            interface IPurBatChangeCasePlugin$ {
                /**
                 * ��Ӳ�ѯԭ����Ҫ������
                 * @return ԭ�����Լ���
                 */
                addSrcBillProps?():$.java.util.List;
                /**
                 * ���ݶ��������޸ķ�д���ԭ�����ݣ���Ҫ���ڴ�������������ֶ�ֵ�ı�����Ķ����ֶε������ı�
                 * @param srcBills ԭ������
                 * @param selectRows �����������ѡ�в���ͨ��У�����
                 * @return �޸ĺ��ԭ������
                 */
                modifySrcBills?(srcBills:$.java.util.List,selectRows:$.java.util.Set):$.java.util.List;
            }
            type IPurBatChangeCasePlugin_T = IPurBatChangeCasePlugin_S & IPurBatChangeCasePlugin$;
            interface IPurBatChangeCasePlugin extends IPurBatChangeCasePlugin_T {
            }
            interface IVMISettleCasePlugin_S {
            }
            interface IVMISettleCasePlugin$ {
                /**
                 *  ����һ����Ȩת�Ƶ�����ʱʹ�õĽ���ģ���ж�Ӧ��BOTP
                 *  @param transferBills ��Ȩת�Ƶ���Ϣ
                 *  @param settleModels ����ģ��
                 *  @return �޸ĺ�Ľ���ģ��
                 */
                adjustSettleModel?(transferBills:$.kd.bos.dataentity.entity.DynamicObject[],settleModels:$.java.util.List):$.java.util.List;
                /**
                 * VMI�ɹ����㣬��ȡ����������鵥�Ŀͻ�����Ϣ
                 * @param vmisettleinfos VMI�ɹ������������Ϣ
                 * @return
                 */
                getManualSettleCustomParam?(vmisettleinfos:$.java.util.List):$.java.util.Map;
            }
            type IVMISettleCasePlugin_T = IVMISettleCasePlugin_S & IVMISettleCasePlugin$;
            interface IVMISettleCasePlugin extends IVMISettleCasePlugin_T {
            }
        }
        namespace kd.sdk.scmc.pm.helper{
            interface PurApplyHelper_S {
                /**
                 * ����������
                 * @param bill �ɹ����뵥
                 * @return �ɹ����뵥
                 * @since 2023/05/31
                 */
                calcAllAmount(bill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���䵥��Ĭ��ֵ������������
                 * @param bills �ɹ����뵥
                 * @return �ɹ����뵥
                 * @since 2023/05/31
                 */
                completeBillInfo(bills:$.java.util.List):$.java.util.List;
            }
            interface PurApplyHelper_C extends PurApplyHelper_S {
                new():PurApplyHelper;
            }
            interface PurApplyHelper$ {
            }
            type PurApplyHelper_T = PurApplyHelper_S & PurApplyHelper$;
            interface PurApplyHelper extends PurApplyHelper_T {
            }
            interface PmCommonHelper_S {
                /**
                 * ָ��������ʶ��ȡ�ɹ�����Ӧ�ò���ֵ
                 * @param orgId ��֯id
                 * @param key ������ʶ
                 * @return ����ֵ
                 * @since 2023/05/31
                 */
                getAppParameter(orgId:long,key:string):any;
                /**
                 * ��ȡȫ���ɹ�����Ӧ�ò���
                 * @param orgId ��֯id
                 * @return Ӧ�ò���map
                 * @since 2023/05/31
                 */
                getAppParameterMap(orgId:long):$.java.util.Map;
                /**
                 * ����ҵ�������жϵ�ǰ�������Ƿ�ΪVMIҵ��
                 * @param bizTypeId ҵ������
                 * @return true/false
                 * @since 2023/05/31
                 */
                isVmi(bizTypeId:long):boolean;
            }
            interface PmCommonHelper_C extends PmCommonHelper_S {
                new():PmCommonHelper;
            }
            interface PmCommonHelper$ {
            }
            type PmCommonHelper_T = PmCommonHelper_S & PmCommonHelper$;
            interface PmCommonHelper extends PmCommonHelper_T {
            }
            interface PurOrderHelper_S {
                /**
                 * ���������㣬��������ƻ���¼
                 * @param bill �ɹ�����
                 * @return �ɹ�����
                 * @since 2023/05/31
                 */
                calcAllAmount(bill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���㸶�����¼���
                 * @param bill �ɹ�����
                 * @return �ɹ�����
                 * @since 2023/05/31
                 */
                calcAmountPlan(bill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���㵥ͷ��˰���˰�ϼ�
                 * @param bill �ɹ�����
                 * @return �ɹ�����
                 * @since 2023/05/31
                 */
                calcTotalAmount(bill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ����Ĭ��ֵ��������������������
                 * @param bills �ɹ�����
                 * @return �ɹ�����
                 * @since 2023/05/31
                 */
                completeBillInfo(bills:$.java.util.List):$.java.util.List;
            }
            interface PurOrderHelper_C extends PurOrderHelper_S {
                new():PurOrderHelper;
            }
            interface PurOrderHelper$ {
            }
            type PurOrderHelper_T = PurOrderHelper_S & PurOrderHelper$;
            interface PurOrderHelper extends PurOrderHelper_T {
            }
        }
        namespace kd.sdk.scmc.sbs{
            interface SdkScmcSbsModule_S {
            }
            type SdkScmcSbsModule_ST = $.kd.sdk.module.Module & SdkScmcSbsModule_S;
            interface SdkScmcSbsModule_C extends SdkScmcSbsModule_ST {
                new():SdkScmcSbsModule;
            }
            interface SdkScmcSbsModule$ {
            }
            type SdkScmcSbsModule_T = $.kd.sdk.module.Module & SdkScmcSbsModule_S & SdkScmcSbsModule$;
            interface SdkScmcSbsModule extends SdkScmcSbsModule_T {
            }
        }
        namespace kd.sdk.scmc.sbs.extpoint{
            interface ISbsSelectSNExpand_S {
                readonly SELECTMAP_KEY_ENTITY:string;
                readonly SELECTMAP_KEY_RETURNCOL:string;
                readonly SELECTMAP_KEY_SELECTCOL:string;
                readonly SELECTMAP_VAL_SNMAINFILE:string;
                readonly SELECTMAP_VAL_SNTRACK:string;
            }
            interface ISbsSelectSNExpand$ {
                /**
                 *  ������չϣ����ӵ�sql�еĲ�ѯ�ֶ��Լ���ѯ�ֶ�����淵���ֶεĶ�Ӧ��ϵ
                 *  @param view ������ͼ����ͨ��view�ɵõ�ҳ�����û�����ĸ��ֶ�ֵ,�Լ�ͨ��getFormShowParameter().getCustomParams()�õ��������ݵ����ͺ�id����Ϣ
                 *  @return ϣ����ӵ�sql�еĲ�ѯ�ֶ��Լ���ѯ�ֶ�����淵���ֶεĶ�Ӧ��ϵ<br/>
                 *  ��1�������û���չ�����к�����,�����˶����ֶ�"��Ŀ"(��ʶproject)����չ�����кŹ켣,���Ӷ����ֶ�"������"���Ҿ��Ѿ�ͨ�����кŵ�������������д����ֵ,<br/>
                 *  ��2����"ѡ���������к�"ҳ��Ĳ�ѯ���������������ֶ�"��Ŀ"(��ʶproject_return)��"������"(��ʶlinetype_return)��ϣ������ѯ���к���������Ŀ�͵�ǰ�켣�������ͷ��ص���ѯ��������ֶ���<br/>
                 *  ���ڴ�����,����ֵ�Ķ���ʾ������:<br/>
                 * [{entity:"bd_snmainfile",selectcol:"fproject",returncol:"project_return"},   <br/>
                 * {entity:"bd_snmovetrack",selectcol:"flinetype",returncol:"linetype_return"}]  <br/>
                 * ����,��1��entity�����ѯ��Ԫ���ݶ���,��ǰ֧�����к�������bd_snmainfile�������кŹ켣��bd_snmovetrack��<br/>
                 * ��2��selectcol���������к�������켣�ϵ��ֶε����ݿ��ֶα�ʶ<br/>
                 * ��3��returncol������"ѡ���������к�"ҳ��Ĳ�ѯ������������û���չ���ֶ�"��Ŀ"(��ʶproject_return)��"������"(��ʶlinetype_return)
                 */
                getExpandSelectMaps?(view:$.kd.bos.form.IFormView):$.java.util.List;
                /**
                 *  ������չϣ����ӵ�sql�е�where��������
                 *  @param view ������ͼ����ͨ��view�ɵõ�ҳ�����û�����ĸ��ֶ�ֵ,�Լ�ͨ��getFormShowParameter().getCustomParams()�õ��������ݵ����ͺ�id����Ϣ
                 *  @return ϣ����ӵ�sql�е�where��������<br/>
                 *  �����û���"ѡ���������к�"ҳ��Ҳͬ����ӹ��������ֶ�"��Ŀ"(��ʶproject_head)��"������"(��ʶlinetype_head)����ϣ���û���д�ĸ��ֶ�ֵ��Ϊ��ѯ���к�ʱ�Ĺ�������<br/>
                 *  ���ڴ�����,�û�������ͨ������view�õ��û��ڽ�����ѡ���ֵ,����project_head��ֵΪ10001234��linetype_headΪ20004567<br/>
                 * ������ֵ��ֵΪ�ַ��� "bd_snmainfile.fproject = 10001234 and bd_snmovetrack.flinetype = 20004567"����<br/>
                 * ע����1���ֶ���ǰ��Ҫ���ǰ׺"bd_snmainfile."��"bd_snmovetrack.",�������������к������������кŹ켣�Ķ�Ӧ�ֶα�ʶ<br/>
                 * ��2��������Ҫ��չ�˲�������,���ؿ��ַ�������<br/>
                 * ��3������չ���������ڽ�����ӹ����ֶ�,���Դ�view�õ�����ɵõ���������װΪ����Ĺ�������,�����û����ϣ���ṩС©��֧�֣���ֱ��֧��С©��������չ����,Ҳ��ͨ��view����õ�С©���е���ѡ����,��ת��ΪString���󷵻�;
                 */
                getExpandWhere?(view:$.kd.bos.form.IFormView):string;
            }
            type ISbsSelectSNExpand_T = ISbsSelectSNExpand_S & ISbsSelectSNExpand$;
            interface ISbsSelectSNExpand extends ISbsSelectSNExpand_T {
            }
            interface SbsExpandCaseCodes_S {
                readonly SELECTSN_QUERY:string;
            }
            interface SbsExpandCaseCodes_C extends SbsExpandCaseCodes_S {
                new():SbsExpandCaseCodes;
            }
            interface SbsExpandCaseCodes$ {
            }
            type SbsExpandCaseCodes_T = SbsExpandCaseCodes_S & SbsExpandCaseCodes$;
            interface SbsExpandCaseCodes extends SbsExpandCaseCodes_T {
            }
        }
        namespace kd.sdk.scmc.scmdi{
            interface SdkScmcDiModule_S {
            }
            type SdkScmcDiModule_ST = $.kd.sdk.module.Module & SdkScmcDiModule_S;
            interface SdkScmcDiModule_C extends SdkScmcDiModule_ST {
                new():SdkScmcDiModule;
            }
            interface SdkScmcDiModule$ {
            }
            type SdkScmcDiModule_T = $.kd.sdk.module.Module & SdkScmcDiModule_S & SdkScmcDiModule$;
            interface SdkScmcDiModule extends SdkScmcDiModule_T {
            }
        }
        namespace kd.sdk.scmc.sm{
            interface SdkScmcSmModule_S {
            }
            type SdkScmcSmModule_ST = $.kd.sdk.module.Module & SdkScmcSmModule_S;
            interface SdkScmcSmModule_C extends SdkScmcSmModule_ST {
                new():SdkScmcSmModule;
            }
            interface SdkScmcSmModule$ {
            }
            type SdkScmcSmModule_T = $.kd.sdk.module.Module & SdkScmcSmModule_S & SdkScmcSmModule$;
            interface SdkScmcSmModule extends SdkScmcSmModule_T {
            }
        }
        namespace kd.sdk.scmc.sm.extpoint{
            interface IXSalOrderCasePlugin_S {
                readonly CANCEL_AMOUNTCHECKKEY:string;
                readonly CANCEL_QTYCHECKKEY:string;
            }
            interface IXSalOrderCasePlugin$ {
                /**
                 * ���۱����Чͬ���������ݷ�¼�͵�ͷ״̬
                 *
                 * @return ͬ�������Ĭ�Ϸ���true, Ҫ��ͬ���ɹ����أ�true ʧ�ܷ��أ�false  <br/>
                 */
                activeSynOrderBillStatus?(srcBill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * ���۱����Чȡ��У�飬�ӿڵ���ʱ�������۱����Ч���������Чʱ����������ȡ����ЧУ��
                 *
                 * @return  ȡ�������Ĭ�Ϸ��ؿ�Map��Ҫ�󷵻ؼ���ȡ��������� entryCheckCancel��true  <br/>
                 */
                cancelCheck?():$.java.util.Map;
            }
            type IXSalOrderCasePlugin_T = IXSalOrderCasePlugin_S & IXSalOrderCasePlugin$;
            interface IXSalOrderCasePlugin extends IXSalOrderCasePlugin_T {
            }
            interface IAmountCalculateCasePlugin_S {
            }
            interface IAmountCalculateCasePlugin$ {
                /**
                 * ���÷�¼��˰�ϼƺ������ʱĬ�ϼ��صĵ����ֶ�
                 *
                 * @param entityName ����ʵ���ʶ���ɸ��ݸò������ִ���ͬ���۵��ݵĶ�Ӧ�߼�
                 * @return  Ҫ���صĵ������ԣ�����ֻ��Ҫд�ֶ�������<br/>
                 * ����set��ֻ������ӵ���������ֶΣ�������ͷ�ֶκͷ�¼�ֶΣ���ұ�currency�����ϣ�material�������ֶ����ȣ���¼�ֶβ���Ҫ���ݷ�¼ǰ׺<br/>
                 */
                beforeCalculte?(entityName:string):$.java.util.Set;
                /**
                 * ��¼��˰�ϼƺ����ڱ�׼��Ʒ�ļ�˰�ϼƹ����У��õ���˰�ϼƵ����󣬿��Լ����Լ�˰�ϼƵ������мӹ�����������Ϻ���ҳ���У�ֻ֧�ֽ������ĳ���<br/>
                 *
                 * @param amountAndTax   ��׼��Ʒ�������߼��õ��ķ�¼�ϵļ�˰�ϼ�
                 * @param entityName   ����ʵ���ʶ���ɸ��ݸò������ִ���ͬ���۵��ݵĶ�Ӧ�߼�����Ҫ�����в�ͬ�ĵ��ݴ����߼�д��ͬһ��ʵ�ֲ����
                 * @param entryInfo  �����ĵ����ֶ���Ϣͨ��Map���ݣ�ʹ��Map����Ϊ�������Ҹ����<br/>
                 *    ����[{material:���϶�̬����, currency:�ұ�̬����, qty:100, price:10�������ֶ����������ֶ�ֵ} <br/>
                 *
                 * @return  �����ļ�˰�ϼ�  ��׼��Ʒ�����ݷ��ص���ֵ���������߼����絥ͷ���ܵ�
                 */
                calculteAmountAndTax?(amountAndTax:$.java.math.BigDecimal,entityName:string,entryInfo:$.java.util.Map):$.java.math.BigDecimal;
            }
            type IAmountCalculateCasePlugin_T = IAmountCalculateCasePlugin_S & IAmountCalculateCasePlugin$;
            interface IAmountCalculateCasePlugin extends IAmountCalculateCasePlugin_T {
            }
            interface SmExpandCaseCodes_S {
                readonly SCMC_SM_BILL_CALCULTEAMOUNTANDTAX:string;
                readonly SCMC_SM_BILL_ISCLEANPRICEFIELD:string;
                readonly SCMC_SM_XSSALORDERBILL_ACTIVE_CANCELCHECK:string;
                readonly SCMC_SM_XSSALORDERBILL_ACTIVE_SYNCSTATUS:string;
            }
            interface SmExpandCaseCodes_C extends SmExpandCaseCodes_S {
                new():SmExpandCaseCodes;
            }
            interface SmExpandCaseCodes$ {
            }
            type SmExpandCaseCodes_T = SmExpandCaseCodes_S & SmExpandCaseCodes$;
            interface SmExpandCaseCodes extends SmExpandCaseCodes_T {
            }
            interface ICleanFieldsCasePlugin_S {
            }
            interface ICleanFieldsCasePlugin$ {
                /**
                 *  ���۵���ҳ���л������Ƿ�����۸�����ֶ���Ϣ
                 *
                 * @param newMaterial  ��¼�������л��������ϣ�����Ϊ����Ҫ�п�
                 * @param oldMaterial  ��¼�������л�ǰ�����ϣ�����Ϊ����Ҫ�п�
                 * @param entityName   ����ʵ���ʶ,�ɸ��ݸò������ִ���ͬ���۵��ݵĶ�Ӧ�߼�
                 * @param entryInfo  �����ķ�¼���ֶ���Ϣͨ��Map���ݣ��˲���ΪԤ������
                 *
                 * @return �Ƿ���Ҫ���  Ĭ��Ϊ��true ��Ҫ��true  ����Ҫ��false <br/>
                 * 	ͨ���Ϳ��ж��߼��������Ƿ�����۸�۸��ֶΣ�<br/>
                 */
                isCleanPriceField?(newMaterial:$.kd.bos.dataentity.entity.DynamicObject,oldMaterial:$.kd.bos.dataentity.entity.DynamicObject,entityName:string,entryInfo:$.java.util.Map):boolean;
            }
            type ICleanFieldsCasePlugin_T = ICleanFieldsCasePlugin_S & ICleanFieldsCasePlugin$;
            interface ICleanFieldsCasePlugin extends ICleanFieldsCasePlugin_T {
            }
        }
        namespace kd.sdk.scmc.upm{
            interface SdkScmcUpmModule_S {
            }
            type SdkScmcUpmModule_ST = $.kd.sdk.module.Module & SdkScmcUpmModule_S;
            interface SdkScmcUpmModule_C extends SdkScmcUpmModule_ST {
                new():SdkScmcUpmModule;
            }
            interface SdkScmcUpmModule$ {
            }
            type SdkScmcUpmModule_T = $.kd.sdk.module.Module & SdkScmcUpmModule_S & SdkScmcUpmModule$;
            interface SdkScmcUpmModule extends SdkScmcUpmModule_T {
            }
        }
        namespace kd.sdk.scmc.upm.extpoint{
            interface UpmExpandCaseCodes_S {
                readonly SCMC_UPM_WORKBENCH_EXTDATA:string;
            }
            interface UpmExpandCaseCodes_C extends UpmExpandCaseCodes_S {
                new():UpmExpandCaseCodes;
            }
            interface UpmExpandCaseCodes$ {
            }
            type UpmExpandCaseCodes_T = UpmExpandCaseCodes_S & UpmExpandCaseCodes$;
            interface UpmExpandCaseCodes extends UpmExpandCaseCodes_T {
            }
        }
    }
}
export {};