/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.hr.hbp.business.application.common{
            interface ISortingArrayService_S {
            }
            interface ISortingArrayService$ {
                /**
                 * �Ƚ������������obj1���� ojb2���򷵻�true, ���򷵻�false
                 * @param obj1
                 * @param obj2
                 * @return
                 */
                compareEqual(obj1:any,obj2:any):boolean;
                /**
                 * �Ƚ���������  Ҫʵ��������� obj1 > ojb2���򷵻�true, ���򷵻�false
                 *              Ҫʵ�ֽ������ obj1 < ojb2���򷵻�true, ���򷵻�false
                 * @param obj1
                 * @param obj2
                 * @return
                 */
                compareLarge(obj1:any,obj2:any):boolean;
                /**
                 * ��������
                 * @param arr
                 */
                quickSort(arr:any[]):void;
                /**
                 * ��������
                 * @param arr
                 * @param start ��ʼλ��,һ��Ϊ0
                 * @param end   ����λ��
                 */
                quickSort(arr:any[],start:number,end:number):void;
            }
            type ISortingArrayService_T = ISortingArrayService_S & ISortingArrayService$;
            interface ISortingArrayService extends ISortingArrayService_T {
            }
            interface ICompareDiffController_S {
            }
            interface ICompareDiffController$ {
                /**
                 * �����Ƚ϶�̬�����Ƿ������ݿ��У��Ƿ������ͬ������
                 * @param compareDiffApiBatchInputParam �����Ƚ� ���ݲ���ӿ����
                 * @return �Ƚ� ���ݲ���ӿ� ����
                 */
                batchIsNewData(compareDiffApiBatchInputParam:kd.hr.hbp.business.domain.model.newhismodel.api.comparediff.CompareDiffApiBatchInputParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �Ƚ϶�̬�����Ƿ������ݿ��У��Ƿ������ͬ������
                 * @param compareDiffApiParam �Ƚ� ���ݲ���ӿ����
                 * @return �Ƚ� ���ݲ���ӿ� ����
                 */
                isNewData(compareDiffApiParam:kd.hr.hbp.business.domain.model.newhismodel.api.comparediff.CompareDiffApiInputParam):kd.hr.hbp.common.api.HrApiResponse;
            }
            type ICompareDiffController_T = ICompareDiffController_S & ICompareDiffController$;
            interface ICompareDiffController extends ICompareDiffController_T {
            }
            interface IDynamicObjectCommonService_S {
            }
            interface IDynamicObjectCommonService$ {
                /**
                 * ���� master ID
                 * @param dynamicObject
                 */
                setMastId(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * �������� master ID
                 * @param dynamicObjects
                 */
                setMastId(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * �޸���Ϣ�� �޸��ˡ��޸�ʱ��
                 * @param dynamicObject
                 */
                setSimpleModifyInfo(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ������Ϣ: �����ˣ�����ʱ�䡢 �޸��ˡ��޸�ʱ��
                 * @param dynamicObject
                 */
                setSimpleNewInfo(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ������Ϣ: �����ˣ�����ʱ�䡢 �޸��ˡ��޸�ʱ��, ָ���Ĵ���ʱ�䣬�޸�ʱ��
                 * @param dynamicObject
                 * @param date  ָ���Ĵ���ʱ�䣬�޸�ʱ��
                 */
                setSimpleNewInfoByTime(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject,date:Date):void;
                /**
                 * �����û���Ϣ�� �����ˡ�����ʱ��
                 *
                 * @param dynamicObject
                 */
                setSimpleOperateInfo(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 *  �����û���Ϣ�� �����ˡ�����ʱ�䣬ָ���Ĵ���ʱ��
                 * @param dynamicObject
                 * @param date ָ���Ĵ���ʱ��
                 */
                setSimpleOperateInfoByTime(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject,date:Date):void;
            }
            type IDynamicObjectCommonService_T = IDynamicObjectCommonService_S & IDynamicObjectCommonService$;
            interface IDynamicObjectCommonService extends IDynamicObjectCommonService_T {
            }
        }
        namespace kd.hr.hbp.business.application.impl.common{
            interface CompareDiffController_S {
            }
            type CompareDiffController_ST = kd.hr.hbp.business.application.common.ICompareDiffController_S & CompareDiffController_S;
            interface CompareDiffController_C extends CompareDiffController_ST {
                new():CompareDiffController;
            }
            interface CompareDiffController$ {
            }
            type CompareDiffController_T = kd.hr.hbp.business.application.common.ICompareDiffController & CompareDiffController_S & CompareDiffController$;
            interface CompareDiffController extends CompareDiffController_T {
            }
            interface AbstractSortingArrayService_S {
            }
            type AbstractSortingArrayService_ST = kd.hr.hbp.business.application.common.ISortingArrayService_S & AbstractSortingArrayService_S;
            interface AbstractSortingArrayService_C extends AbstractSortingArrayService_ST {
                new():AbstractSortingArrayService;
            }
            interface AbstractSortingArrayService$ {
            }
            type AbstractSortingArrayService_T = kd.hr.hbp.business.application.common.ISortingArrayService & AbstractSortingArrayService_S & AbstractSortingArrayService$;
            interface AbstractSortingArrayService extends AbstractSortingArrayService_T {
            }
            interface DynamicObjectCommonService_S {
                /**
                 * ˫�ؼ����� ����ʽ
                 *
                 * @return ������
                 */
                getInstance():DynamicObjectCommonService;
            }
            type DynamicObjectCommonService_ST = kd.hr.hbp.business.application.common.IDynamicObjectCommonService_S & DynamicObjectCommonService_S;
            interface DynamicObjectCommonService_C extends DynamicObjectCommonService_ST {
                new():DynamicObjectCommonService;
            }
            interface DynamicObjectCommonService$ {
            }
            type DynamicObjectCommonService_T = kd.hr.hbp.business.application.common.IDynamicObjectCommonService & DynamicObjectCommonService_S & DynamicObjectCommonService$;
            interface DynamicObjectCommonService extends DynamicObjectCommonService_T {
            }
        }
        namespace kd.hr.hbp.business.application.impl.newhismodel{
            interface HRHisModelModule_S {
            }
            type HRHisModelModule_ST = $.kd.sdk.module.Module & HRHisModelModule_S;
            interface HRHisModelModule_C extends HRHisModelModule_ST {
                new():HRHisModelModule;
            }
            interface HRHisModelModule$ {
            }
            type HRHisModelModule_T = $.kd.sdk.module.Module & HRHisModelModule_S & HRHisModelModule$;
            interface HRHisModelModule extends HRHisModelModule_T {
            }
            interface HisModelController_S {
                /**
                 * ˫�ؼ����� ����ʽ
                 *
                 * @return ������
                 */
                getInstance():HisModelController;
            }
            type HisModelController_ST = kd.hr.hbp.business.application.newhismodel.IHisModelController_S & HisModelController_S;
            interface HisModelController_C extends HisModelController_ST {
                new():HisModelController;
            }
            interface HisModelController$ {
            }
            type HisModelController_T = kd.hr.hbp.business.application.newhismodel.IHisModelController & HisModelController_S & HisModelController$;
            interface HisModelController extends HisModelController_T {
            }
            interface HisModelAttachController_S {
                /**
                 * ˫�ؼ����� ����ʽ
                 *
                 * @return ������
                 */
                getInstance():HisModelAttachController;
            }
            type HisModelAttachController_ST = kd.hr.hbp.business.application.newhismodel.IHisModelAttachController_S & HisModelAttachController_S;
            interface HisModelAttachController_C extends HisModelAttachController_ST {
                new():HisModelAttachController;
            }
            interface HisModelAttachController$ {
            }
            type HisModelAttachController_T = kd.hr.hbp.business.application.newhismodel.IHisModelAttachController & HisModelAttachController_S & HisModelAttachController$;
            interface HisModelAttachController extends HisModelAttachController_T {
            }
            interface HisModelInitController_S {
                /**
                 * ˫�ؼ����� ����ʽ
                 *
                 * @return ������
                 */
                getInstance():HisModelInitController;
            }
            type HisModelInitController_ST = kd.hr.hbp.business.application.newhismodel.IHisModelInitController_S & HisModelInitController_S;
            interface HisModelInitController_C extends HisModelInitController_ST {
                new():HisModelInitController;
            }
            interface HisModelInitController$ {
            }
            type HisModelInitController_T = kd.hr.hbp.business.application.newhismodel.IHisModelInitController & HisModelInitController_S & HisModelInitController$;
            interface HisModelInitController extends HisModelInitController_T {
            }
        }
        namespace kd.hr.hbp.business.application.newhismodel{
            interface IHisModelController_S {
            }
            interface IHisModelController$ {
                /**
                 * �����������ݷ���
                 *
                 * @param hisBatchDiscardApiBo
                 */
                batchDiscardBoData(hisBatchDiscardApiBo:kd.hr.hbp.business.domain.model.newhismodel.api.HisBatchDiscardApiBo):void;
                /**
                 * ������ʷ�汾�޶�������ʱ���ԣ���ʱ���԰汾���
                 *
                 * @param hisVersionParamListBo
                 */
                batchHisVersionChange(hisVersionParamListBo:kd.hr.hbp.business.domain.model.newhismodel.HisVersionParamListBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * ����ʵ������F7�ֶΣ��ж�F7 �Ƿ��� ��ʷ�汾F7
                 *
                 * @param mainEntityNumber ��ʵ��
                 * @param f7FieldName      ��ʵ��F7�ֶ�
                 * @param baseEntityNumber F7�ֶε�ʵ�����
                 * @return HisImportBo
                 */
                buildImportFilter(mainEntityNumber:string,f7FieldName:string,baseEntityNumber:string):kd.hr.hbp.business.domain.model.newhismodel.HisInitReturnBo;
                /**
                 * ɾ�� bo����
                 *
                 * @param hisBaseBo
                 */
                deleteBo(hisBaseBo:kd.hr.hbp.business.domain.model.newhismodel.HisBaseBo):void;
                /**
                 * ���ý���
                 *
                 * @param hisEnableParamBo
                 */
                disableOrEnableBo(hisEnableParamBo:kd.hr.hbp.business.domain.model.newhismodel.enable.HisEnableParamBo):void;
                /**
                 * �������ݷ���
                 *
                 * @param hisDiscardApiBo
                 */
                discardBoData(hisDiscardApiBo:kd.hr.hbp.business.domain.model.newhismodel.api.HisDiscardApiBo):void;
                /**
                 * �ж�ʵ��̳й�ϵ����ͨʵ�塢��ʷʱ����ʵ�塢��ʷ��ʱ����ʵ��
                 *
                 * @param entityNumber
                 * @return enum EnumEntityTpl {
                 * COMMON_TPL("0"),    // ��ͨʵ��
                 * LINETIMESEQ_TPL("1"),   // �̳���ʷʱ����ʵ��
                 * NONLINETIMESEQ_TPL("2");    // �̳���ʷ��ʱ����ʵ��
                 */
                entityInhRelation(entityNumber:string):string;
                /**
                 * ��ȡ�޶���¼
                 *
                 * @param hisVersionReviseParamBo �汾�޶�����
                 */
                getReviseRecord(hisVersionReviseParamBo:kd.hr.hbp.business.domain.model.newhismodel.api.revise.HisReviseRecordParamBo):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ʱ���Ե�������ӿ�
                 *
                 * @param hisImportBo ����bo
                 * @return �ӿ���Ӧ���
                 */
                hisLineImportData(hisImportBo:kd.hr.hbp.business.domain.model.newhismodel.HisImportBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * ��ʱ���Ե�������ӿ�
                 *
                 * @param hisImportBo ����bo
                 */
                hisNonLineImportData(hisImportBo:kd.hr.hbp.business.domain.model.newhismodel.HisImportBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * ʱ������ʷ�汾�޶�����������汾��������Ч�汾���޸���Ч���ڵȷ���
                 *
                 * @param hisVersionParamBo
                 */
                hisVersionChange(hisVersionParamBo:kd.hr.hbp.business.domain.model.newhismodel.HisVersionParamBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * �汾�������
                 *
                 * @param hisVersionCalcApiParam �汾�и�������
                 * @return
                 */
                hisVersionSaveCalc(hisVersionCalcApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisVersionCalcApiParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��������ʷ�汾�޶�����������汾��������Ч�汾
                 *
                 * @param hisVersionParamBo
                 * @return HisResponse<VersionChangeRespData>
                 */
                noLineTimeHisVersionChange(hisVersionParamBo:kd.hr.hbp.business.domain.model.newhismodel.HisVersionParamBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * �汾�޶�����
                 *
                 * @param hisVersionReviseParamBo
                 */
                reviseVersion(hisVersionReviseParamBo:kd.hr.hbp.business.domain.model.newhismodel.HisVersionReviseParamBo):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * @param hisTransRevocationListBo ȫ��/���ֳ������񼯺�
                 */
                revocationEvent(hisTransRevocationListBo:kd.hr.hbp.business.domain.model.newhismodel.HisTransRevocationListBo):void;
                /**
                 * ��ѯ��������
                 *
                 * @param hisSearchLaterEventParam
                 * @return
                 */
                searchLaterEvent(hisSearchLaterEventParam:kd.hr.hbp.business.domain.model.newhismodel.event.HisSearchLaterEventParam):kd.hr.hbp.common.api.HrApiResponse;
            }
            type IHisModelController_T = IHisModelController_S & IHisModelController$;
            interface IHisModelController extends IHisModelController_T {
            }
            interface IHisModelAttachController_S {
            }
            interface IHisModelAttachController$ {
                /**
                 * ��ѯ���ݿ��еĸ������ݣ�����װ����ʷģ����Ҫ�ĸ�����ʽ
                 * @param hisAttachmentParamBo ��������API���
                 * @return
                 */
                generateAttachmentMap(hisAttachmentParamBo:kd.hr.hbp.business.domain.model.newhismodel.api.attachment.HisAttachmentParamBo):kd.hr.hbp.business.domain.model.newhismodel.HisResponse;
                /**
                 * �����ϴ����ݿ�
                 *
                 * @param hisAttachmentDataBo  ��ʷ����Ҫ�����θ�ʽ
                 * @return
                 */
                uploadAttachmentMap(hisAttachmentDataBo:kd.hr.hbp.business.domain.model.newhismodel.api.attachment.HisAttachmentDataBo):void;
            }
            type IHisModelAttachController_T = IHisModelAttachController_S & IHisModelAttachController$;
            interface IHisModelAttachController extends IHisModelAttachController_T {
            }
            interface IHisModelInitController_S {
            }
            interface IHisModelInitController$ {
                /**
                 * ����BO
                 *
                 * @param hisInitBoApiParam ��ʼ�������������
                 * @return ���ݼ�������Ϣ
                 */
                initBo(hisInitBoApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisInitBoApiParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ����BOУ�����
                 *
                 * @param hisInitBoApiParam ��ʼ����������
                 * @return ���ݼ�������Ϣ
                 */
                initBoValidate(hisInitBoApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisInitBoApiParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��ʼ�������汾��ȷ�ϱ��
                 *
                 * @param hisInitVersionApiParam ��ʼ�������汾����
                 * @return ���ݼ�������Ϣ
                 */
                initVersionConfirm(hisInitVersionApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisInitVersionApiParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��ʼ�������汾
                 *
                 * @param hisInitVersionApiParam ��ʼ�������汾����
                 * @return ���ݼ�������Ϣ
                 */
                initVersionSave(hisInitVersionApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisInitVersionApiParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��ʼ�������汾У��
                 *
                 * @param hisInitVersionApiParam ��ʼ�������汾����
                 * @return ���ݼ�������Ϣ
                 */
                initVersionValidate(hisInitVersionApiParam:kd.hr.hbp.business.domain.model.newhismodel.calc.api.HisInitVersionApiParam):kd.hr.hbp.common.api.HrApiResponse;
            }
            type IHisModelInitController_T = IHisModelInitController_S & IHisModelInitController$;
            interface IHisModelInitController extends IHisModelInitController_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel{
            interface HisVersionReviseParamBo_S {
            }
            interface HisVersionReviseParamBo_C extends HisVersionReviseParamBo_S {
                new():HisVersionReviseParamBo;
            }
            interface HisVersionReviseParamBo$ {
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ Ҫ����ĸ�����Ϣ
                 *
                 * @return mapHisAttachmentBos Ҫ����ĸ�����Ϣ
                 */
                getMapHisAttachmentBos():$.java.util.Map;
                /**
                 * ��ȡ ����ǰ�ĸ�����Ϣ
                 *
                 * @return preHisAttachmentBos ����ǰ�ĸ�����Ϣ
                 */
                getPreHisAttachmentBos():$.java.util.Map;
                /**
                 * ��ȡ ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 *
                 * @return reviseDys ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 */
                getReviseDys():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ �Ƿ���ͬ�����Ի�����
                 *
                 * @return isPersonalDataSyn �Ƿ���ͬ�����Ի�����
                 */
                isPersonalDataSyn():boolean;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� Ҫ����ĸ�����Ϣ
                 *
                 * @param mapHisAttachmentBos Ҫ����ĸ�����Ϣ
                 */
                setMapHisAttachmentBos(mapHisAttachmentBos:$.java.util.Map):void;
                /**
                 * ���� �Ƿ���ͬ�����Ի�����
                 *
                 * @param isPersonalDataSyn �Ƿ���ͬ�����Ի�����
                 */
                setPersonalDataSyn(isPersonalDataSyn:boolean):void;
                /**
                 * ���� ����ǰ�ĸ�����Ϣ
                 *
                 * @param preHisAttachmentBos ����ǰ�ĸ�����Ϣ
                 */
                setPreHisAttachmentBos(preHisAttachmentBos:$.java.util.Map):void;
                /**
                 * ���� ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 *
                 * @param reviseDys ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 */
                setReviseDys(reviseDys:$.kd.bos.dataentity.entity.DynamicObject[]):void;
            }
            type HisVersionReviseParamBo_T = HisVersionReviseParamBo_S & HisVersionReviseParamBo$;
            interface HisVersionReviseParamBo extends HisVersionReviseParamBo_T {
            }
            interface ImportRespData_S {
            }
            type ImportRespData_ST = VersionChangeRespData_S & ImportRespData_S;
            interface ImportRespData_C extends ImportRespData_ST {
                new():ImportRespData;
            }
            interface ImportRespData$ {
                /**
                 * ��ȡ ���뷽ʽ
                 *
                 * @return importType ���뷽ʽ
                 */
                getImportType():string;
                /**
                 * ��ȡ ����ɹ�������id
                 *
                 * @return pkIds ����ɹ�������id
                 */
                getPkIds():$.java.util.List;
                /**
                 * ���� ���뷽ʽ
                 *
                 * @param importType ���뷽ʽ
                 */
                setImportType(importType:string):void;
                /**
                 * ���� ����ɹ�������id
                 *
                 * @param pkIds ����ɹ�������id
                 */
                setPkIds(pkIds:$.java.util.List):void;
            }
            type ImportRespData_T = VersionChangeRespData & ImportRespData_S & ImportRespData$;
            interface ImportRespData extends ImportRespData_T {
            }
            interface HisBaseBo_S {
            }
            interface HisBaseBo_C extends HisBaseBo_S {
                new():HisBaseBo;
            }
            interface HisBaseBo$ {
                /**
                 * ��ȡ ҵ��ʵ�� boId �б�
                 *
                 * @return boIdList ҵ��ʵ�� boId �б�
                 */
                getBoIdList():$.java.util.List;
                /**
                 * ��ȡ ��ǰҵ��ʵ�嶯̬����  boIdList�� dyCurrents����ʱ������ȡ dyCurrents �������� dyCurrents ��ѯ��ǰ����.      ���Ӳ���Ŀ�ģ� ����ʱ������Ҫ�����޸ĵ����ݣ�������ͨ��idȥ��ѯ
                 *
                 * @return dyCurrents ��ǰҵ��ʵ�嶯̬����  boIdList�� dyCurrents����ʱ������ȡ dyCurrents �������� dyCurrents ��ѯ��ǰ����.      ���Ӳ���Ŀ�ģ� ����ʱ������Ҫ�����޸ĵ����ݣ�������ͨ��idȥ��ѯ
                 */
                getDyCurrents():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ ��Դʵ�����
                 *
                 * @return entityNumber ��Դʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ���� ҵ��ʵ�� boId �б�
                 *
                 * @param boIdList ҵ��ʵ�� boId �б�
                 */
                setBoIdList(boIdList:$.java.util.List):void;
                /**
                 * ���� ��ǰҵ��ʵ�嶯̬����  boIdList�� dyCurrents����ʱ������ȡ dyCurrents �������� dyCurrents ��ѯ��ǰ����.  ���Ӳ���Ŀ�ģ� ����ʱ������Ҫ�����޸ĵ����ݣ�������ͨ��idȥ��ѯ
                 *
                 * @param dyCurrents ��ǰҵ��ʵ�嶯̬����  boIdList�� dyCurrents����ʱ������ȡ dyCurrents �������� dyCurrents ��ѯ��ǰ����.  ���Ӳ���Ŀ�ģ� ����ʱ������Ҫ�����޸ĵ����ݣ�������ͨ��idȥ��ѯ
                 */
                setDyCurrents(dyCurrents:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * ���� ��Դʵ�����
                 *
                 * @param entityNumber ��Դʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
            }
            type HisBaseBo_T = HisBaseBo_S & HisBaseBo$;
            interface HisBaseBo extends HisBaseBo_T {
            }
            interface HisVersionParamBo_S {
            }
            interface HisVersionParamBo_C extends HisVersionParamBo_S {
                new():HisVersionParamBo;
            }
            interface HisVersionParamBo$ {
                /**
                 * ��ȡ ҵ���Զ����ֶ�ֵ
                 *
                 * @return customizedFiledValue ҵ���Զ����ֶ�ֵ
                 */
                getCustomizedFiledValue():$.java.util.List;
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ ����ID ���ش˴����ɵ�����ID
                 *
                 * @return eventId ����ID ���ش˴����ɵ�����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ �׸����ư汾ID �����߿����Զ����׸����ݰ汾ID�����Ϊ�գ�Ĭ���Զ�����ID����̬���� hisDyns ����˳���Ӧ�� hisDyns ������ firstVersionIds ����������Ȳ���Ч
                 *
                 * @return firstVersionIds �׸����ư汾ID �����߿����Զ����׸����ݰ汾ID�����Ϊ�գ�Ĭ���Զ�����ID����̬���� hisDyns ����˳���Ӧ�� hisDyns ������ firstVersionIds ����������Ȳ���Ч
                 */
                getFirstVersionIds():long[];
                /**
                 * ��ȡ ��̬�������� (֧��ͬһ��ʵ�壬�������������������������볡��)
                 *
                 * @return hisDyns ��̬�������� (֧��ͬһ��ʵ�壬�������������������������볡��)
                 */
                getHisDyns():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ ҵ��������ʵ��id(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 *
                 * @return mainBoId ҵ��������ʵ��id(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 */
                getMainBoId():long;
                /**
                 * ��ȡ Ҫ����ĸ�����Ϣ
                 *
                 * @return mapHisAttachmentBos Ҫ����ĸ�����Ϣ
                 */
                getMapHisAttachmentBos():$.java.util.Map;
                /**
                 * ��ȡ �ӿڵ�������
                 *
                 * @return operateType �ӿڵ�������
                 */
                getOperateType():string;
                /**
                 * ��ȡ �Ƿ�������Ի����ݣ�  1:������ԭʼ����; 0: ���ּ��У���δ��֪������У��4 ������;
                 *
                 * @return personalDataType �Ƿ�������Ի����ݣ�  1:������ԭʼ����; 0: ���ּ��У���δ��֪������У��4 ������;
                 */
                getPersonalDataType():number;
                /**
                 * ��ȡ �Ƿ�ԭ������
                 *
                 * @return atomicTrans �Ƿ�ԭ������
                 */
                isAtomicTrans():boolean;
                /**
                 * ��ȡ ��ѯ�汾�� ȡ�����������־
                 *
                 * @return cancel_notSupported ��ѯ�汾�� ȡ�����������־
                 */
                isCancel_notSupported():boolean;
                /**
                 * ��ȡ ����Ƿ�������Ч
                 *
                 * @return effImmediately ����Ƿ�������Ч
                 */
                isEffImmediately():boolean;
                /**
                 * ��ȡ �Ƿ����� ���롢���á����ò���Ҫ������
                 *
                 * @return needProcessAttachment �Ƿ����� ���롢���á����ò���Ҫ������
                 */
                isNeedProcessAttachment():boolean;
                /**
                 * ��ȡ �Ƿ���ҪУ��ʱ�������Ƿ���ȷ.  Ĭ����ҪУ�顣 �������У����У�飬�������ٴ�У��(��̨��ʷģ��У���� kd.hr.hbp.opplugin.web.hismodel.validator.HisSaveValidator)
                 *
                 * @return needValidateDate �Ƿ���ҪУ��ʱ�������Ƿ���ȷ.  Ĭ����ҪУ�顣 �������У����У�飬�������ٴ�У��(��̨��ʷģ��У���� kd.hr.hbp.opplugin.web.hismodel.validator.HisSaveValidator)
                 */
                isNeedValidateDate():boolean;
                /**
                 * ���� �Ƿ�ԭ������
                 *
                 * @param atomicTrans �Ƿ�ԭ������
                 */
                setAtomicTrans(atomicTrans:boolean):void;
                /**
                 * ���� ��ѯ�汾�� ȡ�����������־
                 *
                 * @param cancel_notSupported ��ѯ�汾�� ȡ�����������־
                 */
                setCancel_notSupported(cancel_notSupported:boolean):void;
                /**
                 * ���� ҵ���Զ����ֶ�ֵ
                 *
                 * @param customizedFiledValue ҵ���Զ����ֶ�ֵ
                 */
                setCustomizedFiledValue(customizedFiledValue:$.java.util.List):void;
                /**
                 * ���� ����Ƿ�������Ч
                 *
                 * @param effImmediately ����Ƿ�������Ч
                 */
                setEffImmediately(effImmediately:boolean):void;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� ����ID ���ش˴����ɵ�����ID
                 *
                 * @param eventId ����ID ���ش˴����ɵ�����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� �׸����ư汾ID �����߿����Զ����׸����ݰ汾ID�����Ϊ�գ�Ĭ���Զ�����ID����̬���� hisDyns ����˳���Ӧ�� hisDyns ������ firstVersionIds ����������Ȳ���Ч
                 *
                 * @param firstVersionIds �׸����ư汾ID �����߿����Զ����׸����ݰ汾ID�����Ϊ�գ�Ĭ���Զ�����ID����̬���� hisDyns ����˳���Ӧ�� hisDyns ������ firstVersionIds ����������Ȳ���Ч
                 */
                setFirstVersionIds(firstVersionIds:long[]):void;
                /**
                 * ���� ��̬�������� (֧��ͬһ��ʵ�壬�������������������������볡��)
                 *
                 * @param hisDyns ��̬�������� (֧��ͬһ��ʵ�壬�������������������������볡��)
                 */
                setHisDyns(hisDyns:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * ���� ҵ��������ʵ��id(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 *
                 * @param mainBoId ҵ��������ʵ��id(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 */
                setMainBoId(mainBoId:long):void;
                /**
                 * ���� Ҫ����ĸ�����Ϣ
                 *
                 * @param mapHisAttachmentBos Ҫ����ĸ�����Ϣ
                 */
                setMapHisAttachmentBos(mapHisAttachmentBos:$.java.util.Map):void;
                /**
                 * ���� �Ƿ����� ���롢���á����ò���Ҫ������
                 *
                 * @param needProcessAttachment �Ƿ����� ���롢���á����ò���Ҫ������
                 */
                setNeedProcessAttachment(needProcessAttachment:boolean):void;
                /**
                 * ���� �Ƿ���ҪУ��ʱ�������Ƿ���ȷ.  Ĭ����ҪУ�顣 �������У����У�飬�������ٴ�У��(��̨��ʷģ��У���� kd.hr.hbp.opplugin.web.hismodel.validator.HisSaveValidator)
                 *
                 * @param needValidateDate �Ƿ���ҪУ��ʱ�������Ƿ���ȷ.  Ĭ����ҪУ�顣 �������У����У�飬�������ٴ�У��(��̨��ʷģ��У���� kd.hr.hbp.opplugin.web.hismodel.validator.HisSaveValidator)
                 */
                setNeedValidateDate(needValidateDate:boolean):void;
                /**
                 * ���� �ӿڵ�������
                 *
                 * @param operateType �ӿڵ�������
                 */
                setOperateType(operateType:string):void;
                /**
                 * ���� �Ƿ�������Ի����ݣ�  1:������ԭʼ����; 0: ���ּ��У���δ��֪������У��4 ������;
                 *
                 * @param personalDataType �Ƿ�������Ի����ݣ�  1:������ԭʼ����; 0: ���ּ��У���δ��֪������У��4 ������;
                 */
                setPersonalDataType(personalDataType:number):void;
            }
            type HisVersionParamBo_T = HisVersionParamBo_S & HisVersionParamBo$;
            interface HisVersionParamBo extends HisVersionParamBo_T {
            }
            interface HisVersionReviseReturnDataBo_S {
            }
            interface HisVersionReviseReturnDataBo_C extends HisVersionReviseReturnDataBo_S {
                new():HisVersionReviseReturnDataBo;
            }
            interface HisVersionReviseReturnDataBo$ {
                /**
                 * ��ȡ Ҫ����ĸ�����Ϣ
                 *
                 * @return attachmentMap Ҫ����ĸ�����Ϣ
                 */
                getAttachmentMap():$.java.util.Map;
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 *
                 * @return returnData ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 */
                getReturnData():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ���� Ҫ����ĸ�����Ϣ
                 *
                 * @param attachmentMap Ҫ����ĸ�����Ϣ
                 */
                setAttachmentMap(attachmentMap:$.java.util.Map):void;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 *
                 * @param returnData ��̬�������� (֧��ͬһ��ʵ�壬��������������������Ի����ݵ�Դ�����޸ģ�����Ӱ�������Ի��İ汾���������볡��)
                 */
                setReturnData(returnData:$.kd.bos.dataentity.entity.DynamicObject[]):void;
            }
            type HisVersionReviseReturnDataBo_T = HisVersionReviseReturnDataBo_S & HisVersionReviseReturnDataBo$;
            interface HisVersionReviseReturnDataBo extends HisVersionReviseReturnDataBo_T {
            }
            interface BatchVersionChangeRespData_S {
            }
            interface BatchVersionChangeRespData_C extends BatchVersionChangeRespData_S {
                new():BatchVersionChangeRespData;
            }
            interface BatchVersionChangeRespData$ {
                /**
                 * ��ȡ ����ID
                 *
                 * @return eventId ����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ �µİ汾ʵ����롢���ݼ���
                 *
                 * @return versionChangeRespDataList �µİ汾ʵ����롢���ݼ���
                 */
                getVersionChangeRespDataList():$.java.util.List;
                /**
                 * ���� ����ID
                 *
                 * @param eventId ����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� �µİ汾ʵ����롢���ݼ���
                 *
                 * @param versionChangeRespDataList �µİ汾ʵ����롢���ݼ���
                 */
                setVersionChangeRespDataList(versionChangeRespDataList:$.java.util.List):void;
            }
            type BatchVersionChangeRespData_T = BatchVersionChangeRespData_S & BatchVersionChangeRespData$;
            interface BatchVersionChangeRespData extends BatchVersionChangeRespData_T {
            }
            interface HisTransRevocationListBo_S {
            }
            interface HisTransRevocationListBo_C extends HisTransRevocationListBo_S {
                new():HisTransRevocationListBo;
            }
            interface HisTransRevocationListBo$ {
                /**
                 * ��ȡ ���������(���ȴӴ˻�ȡ�����飬 ���Ϊ�գ����Ӧ��ID�л�ȡ���õ�������)
                 *
                 * @return eventGroupNumber ���������(���ȴӴ˻�ȡ�����飬 ���Ϊ�գ����Ӧ��ID�л�ȡ���õ�������)
                 */
                getEventGroupNumber():string;
                /**
                 * ��ȡ ����ID
                 *
                 * @return eventId ����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ ������bo
                 *
                 * @return listHisTransRevocationBo ������bo
                 */
                getListHisTransRevocationBo():$.java.util.List;
                /**
                 * ��ȡ ע�����������Ӧ��ID  (���Ϊ�գ����HisTransRevocationBo�л�ȡʵ����룬��ȡ�����飬���ݵ�һ���ṩ��ȥ�Ľӿڲ�������)
                 *
                 * @return resisterEventGroupAppId ע�����������Ӧ��ID  (���Ϊ�գ����HisTransRevocationBo�л�ȡʵ����룬��ȡ�����飬���ݵ�һ���ṩ��ȥ�Ľӿڲ�������)
                 */
                getResisterEventGroupAppId():string;
                /**
                 * ��ȡ ע�����������ʵ����룬û��ʵ��ע������Ҳ����ͨ��ʵ�����ڵ�Ӧ���ҵ������� (���Ϊ�գ����entityNumber��ȡ���õ������� )
                 *
                 * @return resisterEventGroupEntityNumber ע�����������ʵ����룬û��ʵ��ע������Ҳ����ͨ��ʵ�����ڵ�Ӧ���ҵ������� (���Ϊ�գ����entityNumber��ȡ���õ������� )
                 */
                getResisterEventGroupEntityNumber():string;
                /**
                 * ���� ���������(���ȴӴ˻�ȡ�����飬 ���Ϊ�գ����Ӧ��ID�л�ȡ���õ�������)
                 *
                 * @param eventGroupNumber ���������(���ȴӴ˻�ȡ�����飬 ���Ϊ�գ����Ӧ��ID�л�ȡ���õ�������)
                 */
                setEventGroupNumber(eventGroupNumber:string):void;
                /**
                 * ���� ����ID
                 *
                 * @param eventId ����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� ������bo
                 *
                 * @param listHisTransRevocationBo ������bo
                 */
                setListHisTransRevocationBo(listHisTransRevocationBo:$.java.util.List):void;
                /**
                 * ���� ע�����������Ӧ��ID  (���Ϊ�գ����HisTransRevocationBo�л�ȡʵ����룬��ȡ�����飬���ݵ�һ���ṩ��ȥ�Ľӿڲ�������)
                 *
                 * @param resisterEventGroupAppId ע�����������Ӧ��ID  (���Ϊ�գ����HisTransRevocationBo�л�ȡʵ����룬��ȡ�����飬���ݵ�һ���ṩ��ȥ�Ľӿڲ�������)
                 */
                setResisterEventGroupAppId(resisterEventGroupAppId:string):void;
                /**
                 * ���� ע�����������ʵ����룬û��ʵ��ע������Ҳ����ͨ��ʵ�����ڵ�Ӧ���ҵ������� (���Ϊ�գ����entityNumber��ȡ���õ������� )
                 *
                 * @param resisterEventGroupEntityNumber ע�����������ʵ����룬û��ʵ��ע������Ҳ����ͨ��ʵ�����ڵ�Ӧ���ҵ������� (���Ϊ�գ����entityNumber��ȡ���õ������� )
                 */
                setResisterEventGroupEntityNumber(resisterEventGroupEntityNumber:string):void;
            }
            type HisTransRevocationListBo_T = HisTransRevocationListBo_S & HisTransRevocationListBo$;
            interface HisTransRevocationListBo extends HisTransRevocationListBo_T {
            }
            interface HisResponse_S {
            }
            interface HisResponse_C extends HisResponse_S {
                new():HisResponse;
            }
            interface HisResponse$ {
                /**
                 * ��ȡ ���ر��� Ĭ��200
                 *
                 * @return code ���ر��� Ĭ��200
                 */
                getCode():string;
                /**
                 * ��ȡ ��������
                 *
                 * @return data ��������
                 */
                getData():any;
                /**
                 * ��ȡ ������Ϣ
                 *
                 * @return errorMessage ������Ϣ
                 */
                getErrorMessage():string;
                /**
                 * ���� ���ر��� Ĭ��200
                 *
                 * @param code ���ر��� Ĭ��200
                 */
                setCode(code:string):void;
                setData(arg0:any):void;
                /**
                 * ���� ������Ϣ
                 *
                 * @param errorMessage ������Ϣ
                 */
                setErrorMessage(errorMessage:string):void;
            }
            type HisResponse_T = HisResponse_S & HisResponse$;
            interface HisResponse extends HisResponse_T {
            }
            interface HisTransRevocationBo_S {
            }
            interface HisTransRevocationBo_C extends HisTransRevocationBo_S {
                new():HisTransRevocationBo;
            }
            interface HisTransRevocationBo$ {
                /**
                 * ��ȡ ҵ��id
                 *
                 * @return boId ҵ��id
                 */
                getBoId():$.java.util.List;
                /**
                 * ��ȡ ʵ����루����һ������Ӱ����ʵ��Ĳ��ֳ�����
                 *
                 * @return entityNumber ʵ����루����һ������Ӱ����ʵ��Ĳ��ֳ�����
                 */
                getEntityNumber():string;
                /**
                 * ���� ҵ��id
                 *
                 * @param boId ҵ��id
                 */
                setBoId(boId:$.java.util.List):void;
                /**
                 * ���� ʵ����루����һ������Ӱ����ʵ��Ĳ��ֳ�����
                 *
                 * @param entityNumber ʵ����루����һ������Ӱ����ʵ��Ĳ��ֳ�����
                 */
                setEntityNumber(entityNumber:string):void;
            }
            type HisTransRevocationBo_T = HisTransRevocationBo_S & HisTransRevocationBo$;
            interface HisTransRevocationBo extends HisTransRevocationBo_T {
            }
            interface HisVersionParamListBo_S {
            }
            interface HisVersionParamListBo_C extends HisVersionParamListBo_S {
                new():HisVersionParamListBo;
            }
            interface HisVersionParamListBo$ {
                /**
                 * ��ȡ ����ID
                 *
                 * @return eventId ����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ ���������б�
                 *
                 * @return listHisVersionParamBo ���������б�
                 */
                getListHisVersionParamBo():$.java.util.List;
                /**
                 * ��ȡ ҵ��������ʵ��id(Ŀǰδ���ϣ��ɲ���)
                 *
                 * @return mainBoId ҵ��������ʵ��id(Ŀǰδ���ϣ��ɲ���)
                 */
                getMainBoId():long;
                /**
                 * ��ȡ ʵ�����(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 *
                 * @return mainEntityNumber ʵ�����(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 */
                getMainEntityNumber():string;
                /**
                 * ��ȡ �Ƿ�ԭ������
                 *
                 * @return atomicTrans �Ƿ�ԭ������
                 */
                isAtomicTrans():boolean;
                /**
                 * ��ȡ ����Ƿ�������Ч
                 *
                 * @return effImmediately ����Ƿ�������Ч
                 */
                isEffImmediately():boolean;
                /**
                 * ���� �Ƿ�ԭ������
                 *
                 * @param atomicTrans �Ƿ�ԭ������
                 */
                setAtomicTrans(atomicTrans:boolean):void;
                /**
                 * ���� ����Ƿ�������Ч
                 *
                 * @param effImmediately ����Ƿ�������Ч
                 */
                setEffImmediately(effImmediately:boolean):void;
                /**
                 * ���� ����ID
                 *
                 * @param eventId ����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� ���������б�
                 *
                 * @param listHisVersionParamBo ���������б�
                 */
                setListHisVersionParamBo(listHisVersionParamBo:$.java.util.List):void;
                /**
                 * ���� ҵ��������ʵ��id(Ŀǰδ���ϣ��ɲ���)
                 *
                 * @param mainBoId ҵ��������ʵ��id(Ŀǰδ���ϣ��ɲ���)
                 */
                setMainBoId(mainBoId:long):void;
                /**
                 * ���� ʵ�����(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 *
                 * @param mainEntityNumber ʵ�����(entityDataΪ����ʱ����Ϊԭ������ʱ������)
                 */
                setMainEntityNumber(mainEntityNumber:string):void;
            }
            type HisVersionParamListBo_T = HisVersionParamListBo_S & HisVersionParamListBo$;
            interface HisVersionParamListBo extends HisVersionParamListBo_T {
            }
            interface HisImportBo_S {
            }
            interface HisImportBo_C extends HisImportBo_S {
                new():HisImportBo;
            }
            interface HisImportBo$ {
                /**
                 * ��ȡ �������ݼ�
                 *
                 * @return dataEntities �������ݼ�
                 */
                getDataEntities():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ ���뷽ʽ
                 *
                 * @return importType ���뷽ʽ
                 */
                getImportType():string;
                /**
                 * ���� �������ݼ�
                 *
                 * @param dataEntities �������ݼ�
                 */
                setDataEntities(dataEntities:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * ���� ���뷽ʽ
                 *
                 * @param importType ���뷽ʽ
                 */
                setImportType(importType:string):void;
            }
            type HisImportBo_T = HisImportBo_S & HisImportBo$;
            interface HisImportBo extends HisImportBo_T {
            }
            interface HisInitReturnBo_S {
            }
            interface HisInitReturnBo_C extends HisInitReturnBo_S {
                new():HisInitReturnBo;
            }
            interface HisInitReturnBo$ {
                /**
                 * ��ȡ ����Filter
                 *
                 * @return qFilter ����Filter
                 */
                getqFilter():$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ �Ƿ�汾F7
                 *
                 * @return isF7Version �Ƿ�汾F7
                 */
                isF7Version():boolean;
                /**
                 * ��ȡ �Ƿ���ʷģ��
                 *
                 * @return hisModel �Ƿ���ʷģ��
                 */
                isHisModel():boolean;
                /**
                 * ���� �Ƿ�汾F7
                 *
                 * @param f7Version �Ƿ�汾F7
                 */
                setF7Version(f7Version:boolean):void;
                /**
                 * ���� �Ƿ���ʷģ��
                 *
                 * @param hisModel �Ƿ���ʷģ��
                 */
                setHisModel(hisModel:boolean):void;
                /**
                 * ���� ����Filter
                 *
                 * @param qFilter ����Filter
                 */
                setqFilter(qFilter:$.kd.bos.orm.query.QFilter):void;
            }
            type HisInitReturnBo_T = HisInitReturnBo_S & HisInitReturnBo$;
            interface HisInitReturnBo extends HisInitReturnBo_T {
            }
            interface VersionChangeRespData_S {
            }
            interface VersionChangeRespData_C extends VersionChangeRespData_S {
                new():VersionChangeRespData;
            }
            interface VersionChangeRespData$ {
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ ����ID
                 *
                 * @return eventId ����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ �µİ汾����
                 *
                 * @return newDynamicObjects �µİ汾����
                 */
                getNewDynamicObjects():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� ����ID
                 *
                 * @param eventId ����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� �µİ汾����
                 *
                 * @param newDynamicObjects �µİ汾����
                 */
                setNewDynamicObjects(newDynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
            }
            type VersionChangeRespData_T = VersionChangeRespData_S & VersionChangeRespData$;
            interface VersionChangeRespData extends VersionChangeRespData_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.api{
            interface HisBatchDiscardApiBo_S {
            }
            interface HisBatchDiscardApiBo_C extends HisBatchDiscardApiBo_S {
                new():HisBatchDiscardApiBo;
            }
            interface HisBatchDiscardApiBo$ {
                /**
                 * ��ȡ ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID��
                 *
                 * @return eventId ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID��
                 */
                getEventId():long;
                /**
                 * ��ȡ �������ݲ���
                 *
                 * @return hisDiscardApiBoList �������ݲ���
                 */
                getHisDiscardApiBoList():$.java.util.List;
                /**
                 * ���� ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID��
                 *
                 * @param eventId ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID��
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� �������ݲ���
                 *
                 * @param hisDiscardApiBoList �������ݲ���
                 */
                setHisDiscardApiBoList(hisDiscardApiBoList:$.java.util.List):void;
            }
            type HisBatchDiscardApiBo_T = HisBatchDiscardApiBo_S & HisBatchDiscardApiBo$;
            interface HisBatchDiscardApiBo extends HisBatchDiscardApiBo_T {
            }
            interface HisDiscardApiBo_S {
            }
            interface HisDiscardApiBo_C extends HisDiscardApiBo_S {
                new():HisDiscardApiBo;
            }
            interface HisDiscardApiBo$ {
                /**
                 * ��ȡ ҵ��id�б�
                 *
                 * @return boIdSet ҵ��id�б�
                 */
                getBoIdSet():$.java.util.Set;
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID�� ����������id�����ֵ���򵥸�������id��Ч
                 *
                 * @return eventId ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID�� ����������id�����ֵ���򵥸�������id��Ч
                 */
                getEventId():long;
                /**
                 * ���� ҵ��id�б�
                 *
                 * @param boIdSet ҵ��id�б�
                 */
                setBoIdSet(boIdSet:$.java.util.Set):void;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID�� ����������id�����ֵ���򵥸�������id��Ч
                 *
                 * @param eventId ����ID ������Ѵ��ڵ�����ID����������ݴ浽������ID�� ����������id�����ֵ���򵥸�������id��Ч
                 */
                setEventId(eventId:long):void;
            }
            type HisDiscardApiBo_T = HisDiscardApiBo_S & HisDiscardApiBo$;
            interface HisDiscardApiBo extends HisDiscardApiBo_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.api.attachment{
            interface HisAttachmentDataBo_S {
            }
            interface HisAttachmentDataBo_C extends HisAttachmentDataBo_S {
                new():HisAttachmentDataBo;
            }
            interface HisAttachmentDataBo$ {
                getEntityNumber():string;
                getMapHisAttachmentBos():$.java.util.Map;
                setEntityNumber(entityNumber:string):void;
                setMapHisAttachmentBos(mapHisAttachmentBos:$.java.util.Map):void;
            }
            type HisAttachmentDataBo_T = HisAttachmentDataBo_S & HisAttachmentDataBo$;
            interface HisAttachmentDataBo extends HisAttachmentDataBo_T {
            }
            interface HisAttachmentParamBo_S {
            }
            interface HisAttachmentParamBo_C extends HisAttachmentParamBo_S {
                new():HisAttachmentParamBo;
            }
            interface HisAttachmentParamBo$ {
                getEntityNumber():string;
                getIdSet():$.java.util.Set;
                setEntityNumber(entityNumber:string):void;
                setIdSet(idSet:$.java.util.Set):void;
            }
            type HisAttachmentParamBo_T = HisAttachmentParamBo_S & HisAttachmentParamBo$;
            interface HisAttachmentParamBo extends HisAttachmentParamBo_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.api.comparediff{
            interface CompareDiffApiOutPutParam_S {
            }
            interface CompareDiffApiOutPutParam_C extends CompareDiffApiOutPutParam_S {
                new():CompareDiffApiOutPutParam;
            }
            interface CompareDiffApiOutPutParam$ {
                /**
                 * ��ȡ ���ݿ��ҵ�����ͬ����
                 *
                 * @return dyFromDatabase ���ݿ��ҵ�����ͬ����
                 */
                getDyFromDatabase():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ ��δ����ԭʼ����
                 *
                 * @return dyOriginal ��δ����ԭʼ����
                 */
                getDyOriginal():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ���� ���ݿ��ҵ�����ͬ����
                 *
                 * @param dyFromDatabase ���ݿ��ҵ�����ͬ����
                 */
                setDyFromDatabase(dyFromDatabase:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ���� ��δ����ԭʼ����
                 *
                 * @param dyOriginal ��δ����ԭʼ����
                 */
                setDyOriginal(dyOriginal:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
            }
            type CompareDiffApiOutPutParam_T = CompareDiffApiOutPutParam_S & CompareDiffApiOutPutParam$;
            interface CompareDiffApiOutPutParam extends CompareDiffApiOutPutParam_T {
            }
            interface CompareDiffApiInputParam_S {
            }
            interface CompareDiffApiInputParam_C extends CompareDiffApiInputParam_S {
                new():CompareDiffApiInputParam;
            }
            interface CompareDiffApiInputParam$ {
                /**
                 * ��ȡ ��̬�������� (֧��ͬһ��ʵ�壬����������������)
                 *
                 * @return dynamicObjects ��̬�������� (֧��ͬһ��ʵ�壬����������������)
                 */
                getDynamicObjects():$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ ʵ�����
                 *
                 * @return entityNumber ʵ�����
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ Ҫ�Ƚϲ�����Ե��ֶΣ� Ĭ���ֶ�Ҫ�ۼӴ˺��Ե��ֶ�
                 *
                 * @return ignoreFields Ҫ�Ƚϲ�����Ե��ֶΣ� Ĭ���ֶ�Ҫ�ۼӴ˺��Ե��ֶ�
                 */
                getIgnoreFields():$.java.util.Set;
                /**
                 * ��ȡ Ҫ�ȶԲ����Ψһ�Ա�ʶ�ֶΣ�ͨ�����ֶ�ȥ�������ݿ��е������� ����ʷģ��Ĭ�� �� id ��ʷģ��Ĭ���� boId;
                 *
                 * @return keyField Ҫ�ȶԲ����Ψһ�Ա�ʶ�ֶΣ�ͨ�����ֶ�ȥ�������ݿ��е������� ����ʷģ��Ĭ�� �� id ��ʷģ��Ĭ���� boId;
                 */
                getKeyField():string;
                /**
                 * ��ȡ �ַ����ֶ� null�� ""����" " �Ƿ���ȣ� true�����  false: �����
                 * @return
                 */
                isStringNullEqualsEmpty():boolean;
                /**
                 * ���� ��̬�������� (֧��ͬһ��ʵ�壬����������������)
                 *
                 * @param dynamicObjects ��̬�������� (֧��ͬһ��ʵ�壬����������������)
                 */
                setDynamicObjects(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * ���� ʵ�����
                 *
                 * @param entityNumber ʵ�����
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���� Ҫ�Ƚϲ�����Ե��ֶΣ� Ĭ���ֶ�Ҫ�ۼӴ˺��Ե��ֶ�
                 *
                 * @param ignoreFields Ҫ�Ƚϲ�����Ե��ֶΣ� Ĭ���ֶ�Ҫ�ۼӴ˺��Ե��ֶ�
                 */
                setIgnoreFields(ignoreFields:$.java.util.Set):void;
                /**
                 * ���� Ҫ�ȶԲ����Ψһ�Ա�ʶ�ֶΣ�ͨ�����ֶ�ȥ�������ݿ��е������� ����ʷģ��Ĭ�� �� id ��ʷģ��Ĭ���� boId;
                 *
                 * @param keyField Ҫ�ȶԲ����Ψһ�Ա�ʶ�ֶΣ�ͨ�����ֶ�ȥ�������ݿ��е������� ����ʷģ��Ĭ�� �� id ��ʷģ��Ĭ���� boId;
                 */
                setKeyField(keyField:string):void;
                /**
                 * ���� �ַ����ֶ� null�� ""����" " �Ƿ���ȣ� true�����  false: �����
                 * @param stringNullEqualsEmpty �ַ����ֶ� null, ""����" " �Ƿ���ȣ� true�����  false: �����
                 */
                setStringNullEqualsEmpty(stringNullEqualsEmpty:boolean):void;
            }
            type CompareDiffApiInputParam_T = CompareDiffApiInputParam_S & CompareDiffApiInputParam$;
            interface CompareDiffApiInputParam extends CompareDiffApiInputParam_T {
            }
            interface CompareDiffApiBatchInputParam_S {
            }
            interface CompareDiffApiBatchInputParam_C extends CompareDiffApiBatchInputParam_S {
                new():CompareDiffApiBatchInputParam;
            }
            interface CompareDiffApiBatchInputParam$ {
                /**
                 * ��ȡ ���ݲ���ӿ�����б�
                 *
                 * @return compareDiffApiInputParamList ���ݲ���ӿ�����б�
                 */
                getCompareDiffApiInputParamList():$.java.util.List;
                /**
                 * ���� ���ݲ���ӿ�����б�
                 *
                 * @param compareDiffApiInputParamList ���ݲ���ӿ�����б�
                 */
                setCompareDiffApiInputParamList(compareDiffApiInputParamList:$.java.util.List):void;
            }
            type CompareDiffApiBatchInputParam_T = CompareDiffApiBatchInputParam_S & CompareDiffApiBatchInputParam$;
            interface CompareDiffApiBatchInputParam extends CompareDiffApiBatchInputParam_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.api.revise{
            interface HisReviseRecordParamBo_S {
            }
            interface HisReviseRecordParamBo_C extends HisReviseRecordParamBo_S {
                new():HisReviseRecordParamBo;
            }
            interface HisReviseRecordParamBo$ {
                /**
                 * ��ȡҵ��id
                 * @return
                 */
                getBoId():long;
                /**
                 * ��ȡʵ�����
                 * @return
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ�汾�����б�
                 * @return
                 */
                getVersionIds():$.java.util.List;
                /**
                 * ����ҵ��id
                 * @param boId
                 */
                setBoId(boId:long):void;
                /**
                 * ����
                 * @param entityNumber
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ���ð汾�����б�
                 * @param versionIds
                 */
                setVersionIds(versionIds:$.java.util.List):void;
            }
            type HisReviseRecordParamBo_T = HisReviseRecordParamBo_S & HisReviseRecordParamBo$;
            interface HisReviseRecordParamBo extends HisReviseRecordParamBo_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.calc.api{
            interface HisInitBoApiParam_S {
            }
            interface HisInitBoApiParam_C extends HisInitBoApiParam_S {
                new():HisInitBoApiParam;
            }
            interface HisInitBoApiParam$ {
                getBoGroupFields():any;
                getDynamicObjects():$.kd.bos.dataentity.entity.DynamicObject[];
                isSkipBusinessValidate():boolean;
                isSkipDbValidate():boolean;
                isSkipHisFieldValidate():boolean;
                setBoGroupFields(boGroupFields:any):void;
                setDynamicObjects(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setSkipBusinessValidate(skipBusinessValidate:boolean):void;
                setSkipDbValidate(skipDbValidate:boolean):void;
                setSkipHisFieldValidate(skipHisFieldValidate:boolean):void;
            }
            type HisInitBoApiParam_T = HisInitBoApiParam_S & HisInitBoApiParam$;
            interface HisInitBoApiParam extends HisInitBoApiParam_T {
            }
            interface HisVersionCalcApiParam_S {
            }
            interface HisVersionCalcApiParam_C extends HisVersionCalcApiParam_S {
                new():HisVersionCalcApiParam;
            }
            interface HisVersionCalcApiParam$ {
                getDynamicObject():$.kd.bos.dataentity.entity.DynamicObject;
                isValidateContinuity():boolean;
                setDynamicObject(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
                setValidateContinuity(validateContinuity:boolean):void;
            }
            type HisVersionCalcApiParam_T = HisVersionCalcApiParam_S & HisVersionCalcApiParam$;
            interface HisVersionCalcApiParam extends HisVersionCalcApiParam_T {
            }
            interface HisInitVersionApiParam_S {
            }
            interface HisInitVersionApiParam_C extends HisInitVersionApiParam_S {
                new():HisInitVersionApiParam;
            }
            interface HisInitVersionApiParam$ {
                getBoGroupFields():any;
                getDynamicObjects():$.kd.bos.dataentity.entity.DynamicObject[];
                isEffImmediately():boolean;
                isSkipBusinessValidate():boolean;
                isSkipHisFieldValidate():boolean;
                setBoGroupFields(boGroupFields:any):void;
                setDynamicObjects(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setEffImmediately(effImmediately:boolean):void;
                setSkipBusinessValidate(skipBusinessValidate:boolean):void;
                setSkipHisFieldValidate(skipHisFieldValidate:boolean):void;
            }
            type HisInitVersionApiParam_T = HisInitVersionApiParam_S & HisInitVersionApiParam$;
            interface HisInitVersionApiParam extends HisInitVersionApiParam_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.enable{
            interface HisEnableParamBo_S {
            }
            interface HisEnableParamBo_C extends HisEnableParamBo_S {
                new():HisEnableParamBo;
            }
            interface HisEnableParamBo$ {
                /**
                 * ��ȡ ���á�������Чʱ�� ���Բ��Ĭ��Ϊ����
                 *
                 * @return effectDate ���á�������Чʱ�� ���Բ��Ĭ��Ϊ����
                 */
                getEffectDate():Date;
                /**
                 * ��ȡ ����ID
                 *
                 * @return eventId ����ID
                 */
                getEventId():long;
                /**
                 * ��ȡ ʵ����� + ҵ��ʵ��id�б�
                 *
                 * @return hisBaseBo ʵ����� + ҵ��ʵ��id�б�
                 */
                getHisBaseBo():HisBaseBo;
                /**
                 * ��ȡ ��������Ϣ
                 *
                 * @return mapHisAttachmentBos ��������Ϣ
                 */
                getMapHisAttachmentBos():$.java.util.Map;
                /**
                 * ��ȡ �Ƿ�ԭ������Ĭ��Ϊtrue
                 *
                 * @return atomicTrans �Ƿ�ԭ������Ĭ��Ϊtrue
                 */
                isAtomicTrans():boolean;
                /**
                 * ��ȡ true ����  false ����
                 *
                 * @return isDisabled true ����  false ����
                 */
                isDisabled():boolean;
                /**
                 * ���� �Ƿ�ԭ������Ĭ��Ϊtrue
                 *
                 * @param atomicTrans �Ƿ�ԭ������Ĭ��Ϊtrue
                 */
                setAtomicTrans(atomicTrans:boolean):void;
                /**
                 * ���� true ����  false ����
                 *
                 * @param disabled true ����  false ����
                 */
                setDisabled(disabled:boolean):void;
                /**
                 * ���� ���á�������Чʱ�� ���Բ��Ĭ��Ϊ����
                 *
                 * @param effectDate ���á�������Чʱ�� ���Բ��Ĭ��Ϊ����
                 */
                setEffectDate(effectDate:Date):void;
                /**
                 * ���� ����ID
                 *
                 * @param eventId ����ID
                 */
                setEventId(eventId:long):void;
                /**
                 * ���� ʵ����� + ҵ��ʵ��id�б�
                 *
                 * @param hisBaseBo ʵ����� + ҵ��ʵ��id�б�
                 */
                setHisBaseBo(hisBaseBo:HisBaseBo):void;
                /**
                 * ���� ��������Ϣ
                 *
                 * @param mapHisAttachmentBos ��������Ϣ
                 */
                setMapHisAttachmentBos(mapHisAttachmentBos:$.java.util.Map):void;
            }
            type HisEnableParamBo_T = HisEnableParamBo_S & HisEnableParamBo$;
            interface HisEnableParamBo extends HisEnableParamBo_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel.event{
            interface HisSearchLaterEventParam_S {
            }
            interface HisSearchLaterEventParam_C extends HisSearchLaterEventParam_S {
                new():HisSearchLaterEventParam;
            }
            interface HisSearchLaterEventParam$ {
                getEventGroupNumber():string;
                getEventId():long;
                getResisterEventGroupAppId():string;
                getResisterEventGroupEntityNumber():string;
                setEventGroupNumber(eventGroupNumber:string):void;
                setEventId(eventId:long):void;
                setResisterEventGroupAppId(resisterEventGroupAppId:string):void;
                setResisterEventGroupEntityNumber(resisterEventGroupEntityNumber:string):void;
            }
            type HisSearchLaterEventParam_T = HisSearchLaterEventParam_S & HisSearchLaterEventParam$;
            interface HisSearchLaterEventParam extends HisSearchLaterEventParam_T {
            }
        }
        namespace kd.hr.hbp.business.extpoint.permission.dyna{
            interface RuleMatchBO_S {
            }
            interface RuleMatchBO_C extends RuleMatchBO_S {
                new():RuleMatchBO;
            }
            interface RuleMatchBO$ {
                getBizDataMap():$.java.util.Map;
                getConditionMap():$.java.util.Map;
                getRuleParamMap():$.java.util.Map;
                setBizDataMap(bizDataMap:$.java.util.Map):void;
                setConditionMap(conditionMap:$.java.util.Map):void;
                setRuleParamMap(ruleParamMap:$.java.util.Map):void;
            }
            type RuleMatchBO_T = RuleMatchBO_S & RuleMatchBO$;
            interface RuleMatchBO extends RuleMatchBO_T {
            }
            interface IPermRuleMatchPlugin_S {
            }
            interface IPermRuleMatchPlugin$ {
                /**
                 * ƥ�����
                 *
                 * @param ruleMatchBO bo
                 * @return {key:����id,value:{key:ҵ������id,value:BO}}
                 */
                matchRule(ruleMatchBO:RuleMatchBO):$.java.util.Map;
            }
            type IPermRuleMatchPlugin_T = IPermRuleMatchPlugin_S & IPermRuleMatchPlugin$;
            interface IPermRuleMatchPlugin extends IPermRuleMatchPlugin_T {
            }
        }
        namespace kd.hr.hbp.business.extpoint.permission.hradmi{
            interface IAdminGroupListSubPlugin_S {
            }
            interface IAdminGroupListSubPlugin$ {
                /**
                 * ����¼�������ҵ���߼�ִ��ʱ��������д�˷�������Ϊ�û�F7����Զ��������
                 *
                 * @param lsp �б�չʾ����
                 */
                customUserF7ShowParameter?(lsp:$.kd.bos.list.ListShowParameter):void;
            }
            type IAdminGroupListSubPlugin_T = IAdminGroupListSubPlugin_S & IAdminGroupListSubPlugin$;
            interface IAdminGroupListSubPlugin extends IAdminGroupListSubPlugin_T {
            }
            interface AdminGroupPermSubBO_S {
            }
            interface AdminGroupPermSubBO_C extends AdminGroupPermSubBO_S {
                new():AdminGroupPermSubBO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView):AdminGroupPermSubBO;
            }
            interface AdminGroupPermSubBO$ {
                getModel():$.kd.bos.entity.datamodel.IDataModel;
                getView():$.kd.bos.form.IFormView;
                setModel(model:$.kd.bos.entity.datamodel.IDataModel):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type AdminGroupPermSubBO_T = AdminGroupPermSubBO_S & AdminGroupPermSubBO$;
            interface AdminGroupPermSubBO extends AdminGroupPermSubBO_T {
            }
            interface IAdminGroupPermSubPlugin_S {
                readonly FLAG_SAVE_VALIDATE:string;
            }
            interface IAdminGroupPermSubPlugin$ {
                /**
                 * ����¼�������ҵ���߼�ִ����󴥷���ͬ��������������
                 */
                afterSave?(bo:AdminGroupPermSubBO):void;
                /**
                 * ����¼�������ҵ���߼�ִ��ǰ��������ǰ׼���������������
                 *
                 * @param bo bean
                 * @return �Ƿ�ͨ��У��
                 */
                beforeSave?(bo:AdminGroupPermSubBO):boolean;
                /**
                 * ����¼�������ҵ���߼�ִ��ʱ��������д�˷������ɸ�дҵ��ʵ���߼�
                 */
                doSave?(bo:AdminGroupPermSubBO):void;
            }
            type IAdminGroupPermSubPlugin_T = IAdminGroupPermSubPlugin_S & IAdminGroupPermSubPlugin$;
            interface IAdminGroupPermSubPlugin extends IAdminGroupPermSubPlugin_T {
            }
        }
        namespace kd.hr.hbp.business.extpoint.permission.role{
            interface IRoleAssignMemCusPlugin_S {
            }
            interface IRoleAssignMemCusPlugin$ {
                customPermFileF7?(lsp:$.kd.bos.list.ListShowParameter):void;
            }
            type IRoleAssignMemCusPlugin_T = IRoleAssignMemCusPlugin_S & IRoleAssignMemCusPlugin$;
            interface IRoleAssignMemCusPlugin extends IRoleAssignMemCusPlugin_T {
            }
            interface IMemAssignRoleCusPlugin_S {
            }
            interface IMemAssignRoleCusPlugin$ {
                customRoleF7?(showParameter:$.kd.bos.list.ListShowParameter):void;
            }
            type IMemAssignRoleCusPlugin_T = IMemAssignRoleCusPlugin_S & IMemAssignRoleCusPlugin$;
            interface IMemAssignRoleCusPlugin extends IMemAssignRoleCusPlugin_T {
            }
            interface IExportRolePermCusPlugin_S {
            }
            interface IExportRolePermCusPlugin$ {
                buildPermFileFilter():$.kd.bos.orm.query.QFilter;
            }
            type IExportRolePermCusPlugin_T = IExportRolePermCusPlugin_S & IExportRolePermCusPlugin$;
            interface IExportRolePermCusPlugin extends IExportRolePermCusPlugin_T {
            }
            interface IRoleDimF7CustomFilterPlugin_S {
            }
            interface IRoleDimF7CustomFilterPlugin$ {
                /**
                 *  @param evt
                 * @param currentHRbuCaFunc ��ǰְ��
                 * @param dimId
                 */
                addBDDimCustomFilters(evt:$.kd.bos.form.field.events.BeforeF7SelectEvent,currentHRbuCaFunc:string,dimId:string):void;
                /**
                 * +
                 *
                 *  @param currentHRbuFunc ��ǰְ��
                 *  @param dimId     ά��id
                 *  @param enumMap      ö��ֵ��¼
                 */
                addEnumDimCustomFilters(currentHRbuFunc:string,dimId:string,enumMap:$.java.util.Map):$.java.util.Map;
                /**
                 * �Ƿ�����{����}��ѡ��
                 *
                 * @param currentHRbuFunc ְ��
                 * @param dimId ά��
                 * @param originalValue ��Ʒ�и�ѡ���Ƿ�����(�鿴״̬��=false �༭״̬��=true)
                 * @return true=���� false=����
                 */
                enableNotLimitCheckBox(currentHRbuFunc:string,dimId:string,originalValue:boolean):boolean;
                /**
                 * ҵ����֯����������֯�Ŷӡ�ְ������ά�ȡ�ͨ������ ������
                 * @param treeNodes ���νṹ����ģ��
                 * @return ����������ģ��
                 */
                postProcessTreeNode?(treeNodes:$.java.util.List,customParams:$.java.util.Map):$.java.util.List;
            }
            type IRoleDimF7CustomFilterPlugin_T = IRoleDimF7CustomFilterPlugin_S & IRoleDimF7CustomFilterPlugin$;
            interface IRoleDimF7CustomFilterPlugin extends IRoleDimF7CustomFilterPlugin_T {
            }
            interface IRoleMemCusListPlugin_S {
            }
            interface IRoleMemCusListPlugin$ {
                /**
                 * @return ��ɫ��Ա������������hrcs_userrolerelat�����Խ��й���
                 */
                filterRoleMemList():$.java.util.List;
            }
            type IRoleMemCusListPlugin_T = IRoleMemCusListPlugin_S & IRoleMemCusListPlugin$;
            interface IRoleMemCusListPlugin extends IRoleMemCusListPlugin_T {
            }
            interface ISchemeParamRuleCustomFilterPlugin_S {
            }
            interface ISchemeParamRuleCustomFilterPlugin$ {
                /**
                 * ö�ٽ��ֵ֧�ֶ������˷�Χֵ
                 * @return map key:�������number ,value:��Ӧö����Ϣ��key List
                 */
                addParamRuleEnumValueCustomFilters():$.java.util.Map;
                /**
                 * �������ϼ���֯���ֵ֧�ֶ������˷�Χֵ
                 *  @return map key:�������number ,value:QFilter
                 */
                addParamRuleF7ValueCustomFilters():$.java.util.Map;
            }
            type ISchemeParamRuleCustomFilterPlugin_T = ISchemeParamRuleCustomFilterPlugin_S & ISchemeParamRuleCustomFilterPlugin$;
            interface ISchemeParamRuleCustomFilterPlugin extends ISchemeParamRuleCustomFilterPlugin_T {
            }
        }
        namespace kd.hr.hbp.business.function_{
            interface HRDefineFunction_S {
            }
            type HRDefineFunction_ST = $.java.lang.Cloneable & HRDefineFunction_S;
            interface HRDefineFunction_C extends HRDefineFunction_ST {
                new():HRDefineFunction;
            }
            interface HRDefineFunction$ {
                /**
                 * Overrides Cloneable
                 */
                clone():any;
                /**
                 * �����������
                 *
                 * @param param1
                 * @param param2
                 * @return
                 * @throws Exception
                 */
                divide(param1:number,param2:number):$.java.math.BigDecimal;
                /**
                 * ������ֵ���
                 *
                 * @param param1
                 * @param param2
                 * @return
                 * @throws Exception
                 */
                divide(param1:$.java.math.BigDecimal,param2:$.java.math.BigDecimal):$.java.math.BigDecimal;
                /**
                 * ������ת��Ϊ�߼�����
                 *
                 * @param obj: ����
                 * @return java.lang.Boolean[]
                 * @throw
                 */
                getBooleanArray(obj:any):boolean[];
                /**
                 * ������ת��Ϊ��������
                 *
                 * @param obj: ����
                 * @return java.util.Date[]
                 * @throw
                 */
                getDateArray(obj:any):Date[];
                /**
                 * ������ת��Ϊ��������
                 *
                 * @param obj: ����
                 * @return java.lang.Integer[]
                 * @throw
                 */
                getIntArray(obj:any):number[];
                gt(date1:Date,date2:Date):boolean;
                gt(param1:$.java.util.Calendar,param2:$.java.util.Calendar):boolean;
                gt(value1:number,value2:number):boolean;
                gt(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                /**
                 * ����1�Ƿ��������2
                 *
                 * @param date1:                  ����1
                 * @param date2:                  ����2
                 * @param checkHourMinSec:�Ƿ�Ƚ�ʱ����
                 * @return boolean
                 */
                gt(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
                gtOrEqual(date1:Date,date2:Date):boolean;
                gtOrEqual(value1:number,value2:number):boolean;
                gtOrEqual(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                /**
                 * ����1�Ƿ���ڵ�������2
                 *
                 * @param date1:           ����1
                 * @param date2:           ����2
                 * @param checkHourMinSec: �Ƿ�Ƚ�ʱ����
                 * @return boolean
                 */
                gtOrEqual(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
                /**
                 * �ж����������Ƿ����
                 *
                 * @param date1
                 * @param date2
                 * @return
                 */
                isEqual(date1:Date,date2:Date):boolean;
                /**
                 * �ж������ַ����Ƿ����
                 *
                 * @param string1
                 * @param string2
                 * @return
                 */
                isEqual(string1:string,string2:string):boolean;
                /**
                 * �ж����������Ƿ����
                 *
                 * @param value1
                 * @param value2
                 * @return
                 */
                isEqual(value1:any,value2:any):boolean;
                /**
                 * �ж���������ֵ�Ƿ����
                 *
                 * @param value1
                 * @param value2
                 * @return
                 */
                isEqual(value1:boolean,value2:boolean):boolean;
                /**
                 * �ж����������Ƿ����
                 *
                 * @param value1
                 * @param value2
                 * @return
                 */
                isEqual(value1:number,value2:number):boolean;
                /**
                 * �ж�������ֵ�Ƿ����
                 *
                 * @param value1
                 * @param value2
                 * @return
                 */
                isEqual(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                /**
                 * �ж�������̬�����Ƿ����
                 *
                 * @param value1
                 * @param value2
                 * @return
                 */
                isEqual(value1:$.kd.bos.dataentity.entity.DynamicObject,value2:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �ж����������Ƿ����
                 *
                 * @param date1           ����1
                 * @param date2           ����2
                 * @param checkHourMinSec �Ƿ�Ƚ�ʱ����
                 * @return
                 */
                isEqual(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
                lt(date1:Date,date2:Date):boolean;
                lt(param1:$.java.util.Calendar,param2:$.java.util.Calendar):boolean;
                lt(value1:number,value2:number):boolean;
                lt(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                /**
                 * �Ƚ�����1�Ƿ�С������2
                 *
                 * @param date1:           ����1
                 * @param date2:           ����2
                 * @param checkHourMinSec: �Ƿ�Ƚ�ʱ����
                 * @return boolean
                 */
                lt(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
                ltOrEqual(date1:Date,date2:Date):boolean;
                ltOrEqual(param1:$.java.util.Calendar,param2:$.java.util.Calendar):boolean;
                ltOrEqual(value1:number,value2:number):boolean;
                ltOrEqual(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                /**
                 * ����1�Ƿ�С�ڵ�������2
                 *
                 * @param date1:           ����1
                 * @param date2:           ����2
                 * @param checkHourMinSec: �Ƿ�Ƚ�ʱ����
                 * @return boolean
                 */
                ltOrEqual(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
                /**
                 * �����������
                 *
                 * @param param1
                 * @param param2
                 * @return
                 */
                multiply(param1:number,param2:number):$.java.math.BigDecimal;
                /**
                 * ������ֵ���
                 *
                 * @param param1
                 * @param param2
                 * @return
                 */
                multiply(param1:$.java.math.BigDecimal,param2:$.java.math.BigDecimal):$.java.math.BigDecimal;
                /**
                 * �ַ�������ת��������
                 *
                 * @param dateStr: �ַ���
                 * @return java.util.Date
                 * @throw
                 */
                parseDate(dateStr:string):Date;
                /**
                 * �����������
                 *
                 * @param param1
                 * @param param2
                 * @return
                 * @throws Exception
                 */
                plus(param1:number,param2:number):number;
                /**
                 * ������ֵ���
                 *
                 * @param param1
                 * @param param2
                 * @return
                 */
                plus(param1:$.java.math.BigDecimal,param2:$.java.math.BigDecimal):$.java.math.BigDecimal;
                /**
                 * ��ֵ���ȴ���
                 *
                 * @param value
                 * @param scale
                 * @return
                 */
                rounding(value:$.java.math.BigDecimal,scale:number):$.java.math.BigDecimal;
                /**
                 * �����������
                 *
                 * @param param1
                 * @param param2
                 * @return
                 * @throws Exception
                 */
                subtract(param1:number,param2:number):number;
                /**
                 * ������ֵ���
                 *
                 * @param param1
                 * @param param2
                 * @return
                 */
                subtract(param1:$.java.math.BigDecimal,param2:$.java.math.BigDecimal):$.java.math.BigDecimal;
                unEqual(date1:Date,date2:Date):boolean;
                unEqual(string1:string,string2:string):boolean;
                unEqual(value1:any,value2:any):boolean;
                unEqual(value1:boolean,value2:boolean):boolean;
                unEqual(value1:number,value2:number):boolean;
                unEqual(value1:$.java.math.BigDecimal,value2:$.java.math.BigDecimal):boolean;
                unEqual(value1:$.kd.bos.dataentity.entity.DynamicObject,value2:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �Ƚ������Ƿ����
                 *
                 * @param date1:                  ����1
                 * @param date2:                  ����2
                 * @param checkHourMinSec:�Ƿ���ʱ����
                 * @return boolean
                 */
                unEqual(date1:Date,date2:Date,checkHourMinSec:boolean):boolean;
            }
            type HRDefineFunction_T = $.java.lang.Cloneable & HRDefineFunction_S & HRDefineFunction$;
            interface HRDefineFunction extends HRDefineFunction_T {
            }
        }
        namespace kd.hr.hbp.business.init{
            interface ITransferConfPostMicroService_S {
            }
            interface ITransferConfPostMicroService$ {
                /**
                 * ҵ�����ͬ����������Ǩ�ƺ������
                 *
                 * @param entityNumber ʵ�����
                 * @param entityDataIdVsNumMap ʵ������id��numberӳ���ϵ<idֵ,����ֵ>
                 * @return ����ͬ�����
                 *      ���ؽ��˵����
                 *      HRMServiceResult.success : �Ƿ�ɹ���ʶ
                 *      HRMServiceResult.message : �쳣��������Ϊ�쳣��Ϣ�����쳣��������Ϊ��
                 *      HRMServiceResult.returnCode : ͬ������ȫ���ɹ�����Ϊsuccess�������ͬ��ʧ�����ݣ���Ϊfail
                 *      HRMServiceResult.returnData : ���returnCodeΪsuccess����Ϊ�գ����returnCodeΪfail��
                 *                                  ��Ϊʧ������ID��ʧ����Ϣ��Map<Object,String>����ʽΪ<ID,ʧ����Ϣ>
                 */
                postSync(entityNumber:string,entityDataIdVsNumMap:$.java.util.Map):kd.hr.hbp.common.mservice.HRMServiceResult;
            }
            type ITransferConfPostMicroService_T = ITransferConfPostMicroService_S & ITransferConfPostMicroService$;
            interface ITransferConfPostMicroService extends ITransferConfPostMicroService_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.activity{
            interface HRActivityServiceHelper_S {
                /**
                 * ����ʵ��������
                 *
                 * @param requestMap �������
                 * @return ����ʵ�������˽��
                 */
                assignActivityIns(requestMap:$.java.util.Map):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ͬ��ʵ��
                 *
                 * @param requestMap �������
                 * @return ͬ��ʵ�����
                 */
                consentActivityIns(requestMap:$.java.util.Map):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ��ѯ�����ʵ����Ϣ
                 *
                 * @param requestMap �������
                 * @return �ʵ����Ϣ
                 */
                getActivityIns(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ѯ����ʵ����Ϣ
                 *
                 * @param requestMap �������
                 * @return �ʵ����Ϣ����
                 */
                getActivityInstances(requestMap:$.java.util.Map):$.java.util.List;
                /**
                 * ��ѯ�������Ϣ
                 *
                 * @param requestMap �������
                 * @return �������Ϣ
                 */
                getActivityScheme(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ѯ���»ʵ��
                 *
                 * @param requestMap �������
                 * @return �ʵ��
                 */
                getLatestActivityIns(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ���ػʵ��
                 *
                 * @param requestMap �������
                 * @return ���ػʵ�����
                 */
                rejectActivityIns(requestMap:$.java.util.Map):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ��ֹ�
                 *
                 * @param requestMap �������
                 * @return ��ֹ����
                 */
                terminateActivityIns(requestMap:$.java.util.Map):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ת���ʵ��
                 *
                 * @param requestMap �������
                 * @return ת���ʵ�����
                 */
                transferActivityIns(requestMap:$.java.util.Map):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ���»ʵ��������ҵ�񵥾ݵ���Ϣ
                 *
                 * @param requestMap �������
                 */
                updateActivityInsBindInfo(requestMap:$.java.util.Map):void;
            }
            interface HRActivityServiceHelper_C extends HRActivityServiceHelper_S {
                new():HRActivityServiceHelper;
            }
            interface HRActivityServiceHelper$ {
            }
            type HRActivityServiceHelper_T = HRActivityServiceHelper_S & HRActivityServiceHelper$;
            interface HRActivityServiceHelper extends HRActivityServiceHelper_T {
            }
            interface HRActivityModule_S {
            }
            type HRActivityModule_ST = $.kd.sdk.module.Module & HRActivityModule_S;
            interface HRActivityModule_C extends HRActivityModule_ST {
                new():HRActivityModule;
            }
            interface HRActivityModule$ {
            }
            type HRActivityModule_T = $.kd.sdk.module.Module & HRActivityModule_S & HRActivityModule$;
            interface HRActivityModule extends HRActivityModule_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.basedata{
            interface HRBaseDataModelModule_S {
            }
            type HRBaseDataModelModule_ST = $.kd.sdk.module.Module & HRBaseDataModelModule_S;
            interface HRBaseDataModelModule_C extends HRBaseDataModelModule_ST {
                new():HRBaseDataModelModule;
            }
            interface HRBaseDataModelModule$ {
            }
            type HRBaseDataModelModule_T = $.kd.sdk.module.Module & HRBaseDataModelModule_S & HRBaseDataModelModule$;
            interface HRBaseDataModelModule extends HRBaseDataModelModule_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.hrpi{
            interface HPRIPerBankCardServiceHelper_S {
                /**
                 * �������п�
                 *
                 * @param mapList ���п��б�map
                 * @return true-�ɹ���false-ʧ��
                 */
                addPerBankCard(mapList:$.java.util.List):boolean;
                /**
                 * �������п�û�п�Ȩ
                 *
                 * @param mapList ���п��б�map
                 * @return true-�ɹ���false-ʧ��
                 */
                addPerBankCardNoPer(mapList:$.java.util.List):boolean;
                /**
                 * ɾ�����п�
                 *
                 * @param mapList ���п��б�map
                 * @return true-�ɹ���false-ʧ��
                 */
                deletePerBankCard(isHasRight:boolean,mapList:$.java.util.List):boolean;
                /**
                 * ������п�
                 *
                 * @param mapList ���п��б�map
                 * @return true-�ɹ���false-ʧ��
                 */
                modifyPerBankCard(mapList:$.java.util.List):boolean;
            }
            interface HPRIPerBankCardServiceHelper_C extends HPRIPerBankCardServiceHelper_S {
                new():HPRIPerBankCardServiceHelper;
            }
            interface HPRIPerBankCardServiceHelper$ {
            }
            type HPRIPerBankCardServiceHelper_T = HPRIPerBankCardServiceHelper_S & HPRIPerBankCardServiceHelper$;
            interface HPRIPerBankCardServiceHelper extends HPRIPerBankCardServiceHelper_T {
            }
            interface HRPIChargePersonServiceHelper_S {
            }
            interface HRPIChargePersonServiceHelper_C extends HRPIChargePersonServiceHelper_S {
                new():HRPIChargePersonServiceHelper;
            }
            interface HRPIChargePersonServiceHelper$ {
                /**
                 * ������֯id�ͼܹ�����id��ѯĳ������֯�͸�����֯��������Ϣ
                 *
                 * @param orgIds        ��֯id
                 * @param queryDate     ��ѯ����
                 * @param structProject �ܹ�����id
                 * @return ��������Ϣ
                 */
                queryChargeWithParentByOrgId(orgIds:$.java.util.List,queryDate:Date,structProject:long):$.java.util.Map;
            }
            type HRPIChargePersonServiceHelper_T = HRPIChargePersonServiceHelper_S & HRPIChargePersonServiceHelper$;
            interface HRPIChargePersonServiceHelper extends HRPIChargePersonServiceHelper_T {
            }
            interface HRPIOrgWorkFlowServiceHelper_S {
                /**
                 * ������
                 *
                 * @param referencePersons
                 * @param businessKey
                 * @param entityNumber
                 * @param params
                 * @return List<Long> ������id����
                 */
                getLeaderId(referencePersons:$.java.util.List,businessKey:string,entityNumber:string,params:$.java.util.Map):$.java.util.List;
                /**
                 * �ϼ�������
                 *
                 * @param referencePersons
                 * @param businessKey
                 * @param entityNumber
                 * @param params
                 * @return List<Long> �ϼ�������id����
                 */
                getSuperiorLeaderId(referencePersons:$.java.util.List,businessKey:string,entityNumber:string,params:$.java.util.Map):$.java.util.List;
            }
            interface HRPIOrgWorkFlowServiceHelper_C extends HRPIOrgWorkFlowServiceHelper_S {
                new():HRPIOrgWorkFlowServiceHelper;
            }
            interface HRPIOrgWorkFlowServiceHelper$ {
            }
            type HRPIOrgWorkFlowServiceHelper_T = HRPIOrgWorkFlowServiceHelper_S & HRPIOrgWorkFlowServiceHelper$;
            interface HRPIOrgWorkFlowServiceHelper extends HRPIOrgWorkFlowServiceHelper_T {
            }
            interface HRPIModule_S {
            }
            type HRPIModule_ST = $.kd.sdk.module.Module & HRPIModule_S;
            interface HRPIModule_C extends HRPIModule_ST {
                new():HRPIModule;
            }
            interface HRPIModule$ {
            }
            type HRPIModule_T = $.kd.sdk.module.Module & HRPIModule_S & HRPIModule$;
            interface HRPIModule extends HRPIModule_T {
            }
            interface HRPIPersonGenericServiceHelper_S {
                /**
                 * ��������ӿڣ�Ĭ�Ͻ�У��ͨ�������ݽ���д��
                 *
                 * @param paramMap �������ݵ����<br/><br/>
                 *  <pre>{<br/>
                 *     "caller": ���÷���Դ��initialize-��ʼ����hfps-����䶯<br/>
                 *     "mustAllSuccess": �����ֳɹ���ǣ�true-ȫ���ɹ���false-���ֳɹ�<br/>
                 *     "eventId": ����ID-�����ӿڵ��������ݶ�������һ��������,<br/>
                 *     "data": [<br/>
                 *                {  // ��һ����Ҫ����Ķ���<br/>
                 *     		"hisDyns": [{  // hisDyns = DynamicObjectCollection��������<br/>
                 *                 "bsed": �汾�ƻ���Ч���ڣ�ʱ������ʷʵ�壩,<br/>
                 *                 "bsled": �汾�ƻ�ʧЧ���ڣ�ʱ������ʷʵ�壩,<br/>
                 *                 "id": ����,<br/>
                 *                 "boid": ҵ������������Ǹ���������Ҫ��������Ĭ��������<br/>
                 *                 ...(ҵ���ֶ�)<br/>
                 *             }]<br/>
                 * 		},<br/>
                 * 		{  // �ڶ�����Ҫ����Ķ���<br/>
                 *     		"hisDyns": [{<br/>
                 *                 "bsed": �汾�ƻ���Ч���ڣ�ʱ������ʷʵ�壩,<br/>
                 *                 "bsled": �汾�ƻ�ʧЧ���ڣ�ʱ������ʷʵ�壩,<br/>
                 *                 "id": ����,<br/>
                 *                 "boid": ҵ������������Ǹ���������Ҫ��������Ĭ��������<br/>
                 *                 ...(ҵ���ֶ�)<br/>
                 *             }]<br/>
                 * 		},<br/>
                 * 		{...}<br/>
                 *     ]<br/>
                 * }</pre>
                 * @return Map<String, Object> ������<br/>
                 * <pre><br/>
                 * {<br/>
                 *     "success": �Ƿ�ɹ���ǣ�true-�ӿ�ȫ���ɹ���false-�ӿ�ִ��ʧ�ܣ���������У��ʧ�ܡ�д��ʧ�ܵ��쳣����<br/>
                 *     "message": ������Ϣ˵��<br/>
                 *     "data": [<br/>
                 *                {<br/>
                 *     		"code": 200, // ��ʷģ�ͽӿڷ��سɹ�����<br/>
                 *     		"errorMessage": ��ʷģ�ͽӿڷ��ش�����Ϣ<br/>
                 *     		"data" : {<br/>
                 *                 "eventId": ����ID��<br/>
                 *                 "versionChangeRespDataList": [<br/>
                 *                     {<br/>
                 *                         "eventId": ����ID,<br/>
                 *                         "entityNumber": ʵ�����<br/>
                 *                         "newDynamicObjects": [�µİ汾����] // dynamicObject����<br/>
                 *                     }<br/>
                 *                 ]<br/>
                 *             }<br/>
                 * 		}<br/>
                 *     ],<br/>
                 * 	"errInfos": [<br/>
                 *         {<br/>
                 *             "entityNumber": ʵ�����,<br/>
                 *             "exceptionMessage": ʵ������쳣���صĴ�����Ϣ�����ܾ�ȷ����һ�����ݣ�<br/>
                 *             "errorDatas": [<br/>
                 *                 {<br/>
                 *                     "id": ����ID,<br/>
                 *                     "errMsg": ������Ϣ��<br/>
                 *                 }<br/>
                 *             ]<br/>
                 *         }<br/>
                 *     ]<br/>
                 * }<br/>
                 * </pre>
                 */
                saveBatch(paramMap:$.java.util.Map):$.java.util.Map;
                /**
                 * У��ӿ�
                 *
                 * @param paramMap ��У�����ݵ����
                 * @return Map<String, Object> У����
                 */
                validate(paramMap:$.java.util.Map):$.java.util.Map;
            }
            interface HRPIPersonGenericServiceHelper_C extends HRPIPersonGenericServiceHelper_S {
                new():HRPIPersonGenericServiceHelper;
            }
            interface HRPIPersonGenericServiceHelper$ {
            }
            type HRPIPersonGenericServiceHelper_T = HRPIPersonGenericServiceHelper_S & HRPIPersonGenericServiceHelper$;
            interface HRPIPersonGenericServiceHelper extends HRPIPersonGenericServiceHelper_T {
            }
            interface HRPIWorkRoleServiceHelper_S {
                /**
                 * �����㱨��ϵ
                 *
                 * @param addSuperiorList �㱨��ϵ����
                 * @return HrApiResponse<Map<String, Object>> code�� 200�ɹ� 202������У��ʧ��   success��true��false   data:������Ϣ
                 */
                addSuperior(addSuperiorList:$.java.util.List):$.java.util.List;
                /**
                 * ɾ���㱨��ϵ
                 *
                 * @param delSuperiorList �㱨��ϵ����
                 * @return HrApiResponse<Map<String, Object>> code�� 200�ɹ� 202������У��ʧ��   success��true��false   data:������Ϣ
                 */
                delSuperior(delSuperiorList:$.java.util.List):$.java.util.List;
                /**
                 * ʧЧ�㱨��ϵ
                 *
                 * @param expireSuperiorList �㱨��ϵ����
                 * @return HrApiResponse<Map<String, Object>> code�� 200�ɹ� 202������У��ʧ��   success��true��false   data:������Ϣ
                 */
                expireSuperior(expireSuperiorList:$.java.util.List):$.java.util.List;
                /**
                 * �ۺϲ�ѯ�㱨���ϼ�
                 *
                 * @param personIds ��Ȼ��id
                 * @return Map<Long, List<Map<String, Object>>> �㱨���ϼ�
                 */
                getDirectSuperior(personIds:$.java.util.List):$.java.util.Map;
                /**
                 * ͨ����֯���ۺϲ�ѯ�㱨���ϼ�
                 *
                 * @param depempIds ��֯��
                 * @return Map<Long, List<Map<String, Object>>> �㱨���ϼ�
                 */
                getDirectSuperiorByDepempId(depempIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡ��Ч��������֯����������Ϣ
                 *
                 * @param orgIdList ��֯����
                 * @return List<Map<String, Object>> ��Ч��������֯����������Ϣ
                 */
                getMainChargeByOrg(orgIdList:$.java.util.List):$.java.util.List;
                /**
                 * ���ݲ�ѯʱ���ȡ������֯����������Ϣ
                 *
                 * @param orgIdList ��֯����
                 * @return List<Map<String, Object>> ������֯����������Ϣ
                 */
                getMainChargeInfoByOrg(orgIdList:$.java.util.List,queryDate:Date):$.java.util.List;
                /**
                 * �ϼ�������֯�㱨��
                 *
                 * @param orgIds ������֯
                 * @return List<Map<String, Object>> �ϼ�������֯�㱨��
                 */
                getSuperiorByOrg(orgIds:$.java.util.List):$.java.util.List;
                /**
                 * �����ϼ�������ɫ�Ļ㱨��
                 *
                 * @param roles ��ɫid����
                 * @return List<Map<String, Object>> �ϼ�������ɫ�Ļ㱨��
                 */
                getSuperiorByRole(roles:$.java.util.List):$.java.util.List;
                /**
                 * �ϼ�������ɫ�㱨��
                 *
                 * @param roleIds ��ɫid
                 * @return Map<Long, List<Map<String, Object>>> �ϼ�������ɫ�㱨��
                 */
                listSuperiorByOrg(roleIds:$.java.util.List):$.java.util.Map;
                /**
                 * ����㱨��ϵ
                 *
                 * @param updateSuperiorList �㱨��ϵ����
                 * @return HrApiResponse<Map<String, Object>> code�� 200�ɹ� 202������У��ʧ��   success��true��false   data:������Ϣ
                 */
                updateSuperior(updateSuperiorList:$.java.util.List):$.java.util.List;
            }
            interface HRPIWorkRoleServiceHelper_C extends HRPIWorkRoleServiceHelper_S {
                new():HRPIWorkRoleServiceHelper;
            }
            interface HRPIWorkRoleServiceHelper$ {
            }
            type HRPIWorkRoleServiceHelper_T = HRPIWorkRoleServiceHelper_S & HRPIWorkRoleServiceHelper$;
            interface HRPIWorkRoleServiceHelper extends HRPIWorkRoleServiceHelper_T {
            }
            interface HRPIEmployeeServiceHelper_S {
                /**
                 * �Ƿ���ְ
                 *
                 * @param checkList
                 * @param checkProp number personid employeeid
                 * @return Map
                 */
                checkEmployeeStatus(checkList:$.java.util.List,checkProp:string):$.java.util.Map;
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч��ְҵ��Ϣ��
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @return int ��Ч��ְҵ��Ϣ��
                 */
                countEmpentrelByByTypeclsAndStatusCls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List):number;
                /**
                 * ��ȡְҵ��Ϣ
                 *
                 * @param employeeId ��ҵ��id
                 * @return Map<String, Object> ְҵ��Ϣ
                 */
                getEmpentrel(employeeId:long):$.java.util.Map;
                /**
                 * ��ȡ��ҵ����Ϣ
                 *
                 * @param employeeId ��ҵ��id
                 * @return Map<String, Object>��ҵ����Ϣ
                 */
                getEmployee(employeeId:long):$.java.util.Map;
                /**
                 * ��ȡ�ù�״̬��Ϣ
                 *
                 * @param employeeIds ��ҵ��id����
                 * @return Map<Long, DynamicObject> �ù�״̬��Ϣ
                 */
                getEmployeeStatus(employeeIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��֯�ṹͼ��ʾ��ǰ����ʷʱ��ĸ�λ�µ���Ա��
                 *
                 * @param queryDate   ��ѯ����
                 * @param positionIds ��λid
                 * @return List<Map<String, Object>> ��ѯ������Ա��Ϣ
                 */
                getOrgHisPerson(queryDate:Date,positionIds:$.java.util.List):$.java.util.List;
                /**
                 * ������ȡ��ҵ�˸�����Ϣ
                 *
                 * @param employeeIds ��ҵ��id����
                 * @param qFilter          �Զ�������
                 * @param attachEntityName
                 * @return List<Map<String, Object>>
                 */
                listBatchEmployeeAttachs(employeeIds:$.java.util.List,qFilter:$.kd.bos.orm.query.QFilter,attachEntityName:string):$.java.util.List;
                /**
                 * ͨ����Ȼ��������ȡ��ҵ�˸�����Ϣ
                 *
                 * @param personIds ��Ȼ��id
                 * @param qFilter
                 * @param attachEntityName
                 * @return List<Map<String, Object>> ��ҵ�˸�����Ϣ
                 */
                listBatchEmployeeByPerson(personIds:$.java.util.List,qFilter:$.kd.bos.orm.query.QFilter,attachEntityName:string):$.java.util.List;
                /**
                 * ��ҵ�˸���
                 *
                 * @param employeeIds ��ҵ��id
                 * @param selectProps
                 * @param attachEntityName
                 * @return List<Map<String, Object>> ��ҵ�˸���
                 */
                listBatchPropEmployeeAttachs(employeeIds:$.java.util.List,selectProps:string,attachEntityName:string):$.java.util.List;
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч��ְҵ��Ϣ
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @param start               ��ҳ����
                 * @param limit               ��ҳ����
                 * @return List<Map<String, Object>> ��Ч��ְҵ��Ϣ
                 */
                listEmpentrelByByTypeclsAndStatusCls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List,start:number,limit:number):$.java.util.List;
                /**
                 * ��ҵ�˸���
                 *
                 * @param employeeId ��ҵ��id
                 * @param attachEntityName
                 * @return List<Map<String, Object>> ��ҵ�˸���
                 */
                listEmployeeAttachs(employeeId:long,attachEntityName:string):$.java.util.List;
                /**
                 * ��ȡ��ҵ����Ϣ
                 *
                 * @param employeeIds ��ҵ��id����
                 * @return ��ҵ����Ϣ
                 */
                listEmployees(employeeIds:$.java.util.List):$.java.util.List;
                /**
                 * ���Ų�ѯ��ҵ��
                 *
                 * @param numbers ���ż���
                 * @return List<Map<String, Object>> ��ҵ��
                 */
                listEmployeesByNumber(numbers:$.java.util.List):$.java.util.List;
            }
            interface HRPIEmployeeServiceHelper_C extends HRPIEmployeeServiceHelper_S {
                new():HRPIEmployeeServiceHelper;
            }
            interface HRPIEmployeeServiceHelper$ {
            }
            type HRPIEmployeeServiceHelper_T = HRPIEmployeeServiceHelper_S & HRPIEmployeeServiceHelper$;
            interface HRPIEmployeeServiceHelper extends HRPIEmployeeServiceHelper_T {
            }
            interface HRPIPersonServiceHelper_S {
                /**
                 * У���Ƿ����ָ����Ա����Ϣ
                 *
                 * @param checkList
                 * @return List<Map<String, Object>>
                 */
                checkPerson(checkList:$.java.util.List):$.java.util.List;
                /**
                 * У��Ա���Ƿ���� ��ѯbos����hr
                 *
                 * @param checkList ��ѯ��Ϣ
                 * @param queryType ��ѯ���� 0:���а���ƽ̨��hr��1��ֻУ��bos,2:ֻУ��hr
                 * @return �ɹ�ʧ��
                 */
                checkPersonByOpt(checkList:$.java.util.List,queryType:string):$.java.util.List;
                /**
                 * ��ȡ��ǰ��֯����Ч����ְ��Ա��Ϣ
                 *
                 * @param adminOrgId ������֯Id
                 * @return Map<String, Object> ��ǰ��֯����Ч����ְ��Ա��Ϣ
                 */
                getActivePersonByOrg(adminOrgId:long):$.java.util.Map;
                /**
                 * ��ȡ��ǰ��֯�Ŷ�����Ч����ְ��Ա��Ϣ
                 *
                 * @param orgteamId ��֯�Ŷ�Id
                 * @return Map<String, Object> ��ǰ��֯�Ŷ�����Ч����ְ��Ա��Ϣ
                 */
                getActivePersonByOrgteam(orgteamId:long):$.java.util.Map;
                /**
                 * ��ȡָ��ְ��ֹ���ɫ����Ա��Ϣ
                 *
                 * @param posType     1��1����ȡȫ�����ͣ� ���������ݴ������ְ���ͱ����ѯ
                 * @param dutyworkrolesIds ְ��ֹ���ɫids
                 * @return Ա����Ϣ����
                 */
                getAllUsersOfDutyworkroles(posType:string,dutyworkrolesIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��ȡָ����֯��������Ч����Ա��Ϣ
                 *
                 * @param posType       1����ȡȫ�����ͣ� ���������ݴ������ְ���ͱ����ѯ
                 * @param orgIds        ��֯IDS
                 * @param includeSubOrg �Ƿ�����¼�
                 * @return Map<Long, Set<Long>>
                 */
                getAllUsersOfOrg(posType:string,orgIds:$.java.util.List,includeSubOrg:boolean):$.java.util.Map;
                /**
                 * ��ȡָ����֯�Ŷ���������Ч����Ա��Ϣ
                 *
                 * @param posType       1����ȡȫ�����ͣ� ���������ݴ������ְ���ͱ����ѯ
                 * @param orgteamIds    ��֯�Ŷ�IDS
                 * @param includeSubOrg �Ƿ�����¼�
                 * @return Map<Long, Set<Long>>
                 */
                getAllUsersOfOrgteam(posType:string,orgteamIds:$.java.util.List,includeSubOrg:boolean):$.java.util.Map;
                /**
                 * ��ȡָ����λ����Ա��Ϣ
                 *
                 * @param posType     1��1����ȡȫ�����ͣ� ���������ݴ������ְ���ͱ����ѯ
                 * @param positionIds ��λids
                 * @return Map<Long, Set<Long>> Ա����Ϣ����
                 */
                getAllUsersOfPosition(posType:string,positionIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��ѯ��Ȼ�˻�����Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return Map<String, Object>
                 */
                getPersonBaseInfo(personId:long):$.java.util.Map;
                /**
                 * ��ȡ��ǰ��֯����ְ��Ա��Ϣ
                 *
                 * @param adminOrgIds ������֯Id
                 * @return List<Map<String, Object>> ��ǰ��֯����ְ��Ա��Ϣ
                 */
                getPersonByOrgs(adminOrgIds:$.java.util.List,queryDate:Date):$.java.util.List;
                /**
                 * ��ȡ��ǰ��֯�Ŷ�����ְ��Ա��Ϣ
                 *
                 * @param orgteamIds ��֯�Ŷ�Id
                 * @return List<Map<String, Object>> ��ǰ��֯�Ŷ�����ְ��Ա��Ϣ
                 */
                getPersonByOrgteams(orgteamIds:$.java.util.List,queryDate:Date):$.java.util.List;
                /**
                 * ����������Ϣ
                 *
                 * @param adminOrgIds ��֯
                 * @param queryDate ��ѯ����
                 * @return List<Map<String, Object>>
                 */
                getPersonChargeInfo(adminOrgIds:$.java.util.List,queryDate:Date):$.java.util.List;
                /**
                 * ��ȡ��ǰ��֯����ְ��Ա��Ϣ�����͸�������Ϣ
                 *
                 * @param adminOrgIds ������֯Id
                 * @return List<Map<String, Object>>
                 */
                getPersonCountAndChargeInfo(adminOrgIds:$.java.util.List,queryDate:Date):$.java.util.List;
                /**
                 * ��ѯ��Ȼ�˻�����Ϣ(������ְ��Ϣ)
                 *
                 * @param personId ��Ȼ��id
                 * @return Map<String, Object>
                 */
                getPersonInfo(personId:long):$.java.util.Map;
                /**
                 * ��ȡ��Ա������ְ����ID
                 *
                 * @param personId ��Ȼ��id
                 * @return Long ����ְ����ID
                 */
                getPersonMainOrgId(personId:long):long;
                /**
                 * ͨ���û�id��ȡ��Ȼ�˺���ҵ����Ϣ
                 *
                 * @param userId �û�id
                 * @return �û���Ϣ
                 */
                getPersonModelIdByUserId(userId:long):$.java.util.Map;
                /**
                 * ��ȡ��Ա������ְ��Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return Map<String, Object> ����ְ��Ϣ
                 */
                getPrimaryEmpposorgrel(personId:long):$.java.util.Map;
                /**
                 * ͨ����Ȼ�˻�����ҵ��id��ѯϵͳ�û�
                 *
                 * @return ϵͳ�û�
                 */
                getUserIdByPersonInfo(idMaps:$.java.util.Map):$.java.util.Map;
                /**
                 * ����ְ�����Ƿ�����ָ��������֯
                 *
                 * @param personId    ��ԱID
                 * @param orgId       ������֯ID
                 * @param checkSubOrg �Ƿ�У���¼�
                 * @return boolean �Ƿ�����ָ��������֯
                 */
                isBelongOrg(personId:long,orgId:long,checkSubOrg:boolean):boolean;
                /**
                 * ����ְ��λ�Ƿ�����ָ����λ
                 *
                 * @param personId   ��ԱID
                 * @param positionId ��λID
                 * @return boolean �Ƿ�����ָ����λ
                 */
                isBelongPosition(personId:long,positionId:long):boolean;
                /**
                 * ��ȡָ����Ȼ�˸�����Ϣ
                 *
                 * @param personIds
                 * @param qFilter
                 * @param attachEntityName
                 * @return List<Map<String, Object>> ��Ȼ�˸�����Ϣ
                 */
                listBatchPersonAttachs(personIds:$.java.util.List,qFilter:$.kd.bos.orm.query.QFilter,attachEntityName:string):$.java.util.List;
                /**
                 * ��ȡָ����Ȼ�˸�����Ϣ
                 *
                 * @param personIds
                 * @param qFilter
                 * @param attachEntityName
                 * @return List<Map<String, Object>>
                 */
                listBatchPropHisPersonAttachs(personIds:$.java.util.List,selectProps:string,qFilter:$.kd.bos.orm.query.QFilter,attachEntityName:string):$.java.util.List;
                /**
                 * ��ȡָ����Ȼ�˸�����Ϣ
                 *
                 * @param personIds
                 * @param qFilter
                 * @param attachEntityName
                 * @return List<Map<String, Object>>
                 */
                listBatchPropPersonAttachs(personIds:$.java.util.List,selectProps:string,qFilter:$.kd.bos.orm.query.QFilter,attachEntityName:string):$.java.util.List;
                /**
                 * ��ȡ��Ա��ȫ����ְ��Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return List<Map < String, Object>> ��ְ��Ϣ
                 */
                listEmpposorgrels(personId:long):$.java.util.List;
                /**
                 * ������ְ����������ȡ��Ա��ȫ����ְ��Ϣ
                 *
                 * @param postType  ��ְ����
                 * @param personIds ��Ȼ��ids
                 * @return List<Map < String, Object>> ��ְ��Ϣ
                 */
                listEmpposorgrels(postType:string,personIds:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡָ����Ȼ�˸�����Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return List<Map<String, Object>>  ������Ϣ
                 */
                listPersonAttachs(personId:long,attachEntityName:string):$.java.util.List;
                /**
                 * ������ȡ��Ա������Ϣ
                 *
                 * @param personIds ��Աids
                 * @return List<Map<String, Object>> ��Ա������Ϣ����
                 */
                listPersonInfos(personIds:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��Աģ��ID
                 *
                 * @param personId ��Աid
                 * @param isAll    �Ƿ��ȡȫ��(����ҵ��״̬Ϊ��ʧЧ)
                 * @return List<Map<String, Long>> ��Ա�ĸ���ģ��ID
                 */
                listPersonModelIds(personId:long,isAll:boolean):$.java.util.List;
                /**
                 * ��ȡ��Ա��ȫ������ID
                 *
                 * @param personId ��Ȼ��id
                 * @return List<Long> ȫ������ID
                 */
                listPersonOrgIds(personId:long):$.java.util.List;
                /**
                 * ͨ���û�id��ȡ��Ȼ�˺���ҵ����Ϣ����
                 *
                 * @param userIds �û�id
                 * @return Map<String, Object>�û���Ϣ
                 */
                queryPersonInfoByUserIds(userIds:$.java.util.List):$.java.util.Map;
                /**
                 * ����ɾ��
                 *
                 * @param formId
                 * @param pkId
                 * @return void
                 */
                removeTempAttachments(formId:string,pkId:any,fileUid:any):void;
                /**
                 * ����������Ա������Ϣ
                 *
                 * @param attachMap
                 * @return Map<String, Object>
                 */
                saveOrUpdateInfo(attachMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��������
                 *
                 * @param formId
                 * @param pkId
                 * @param appid
                 * @param att
                 * @return DynamicObjectCollection
                 */
                saveTempAttachments(formId:string,pkId:any,appid:string,att:$.java.util.Map):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * HR��Աͬ��ƽ̨
                 *
                 * @param userList �û���Ϣ map��key Ϊ���š�ͬ������
                 * @return Map<String, Object>
                 */
                syncPersonToSysUer(userList:$.java.util.List):$.java.util.Map;
                /**
                 * �����ù���ϵ��¼
                 *
                 * @param updateList
                 *          personid:��Ȼ��id
                 *          orgid:�ù���֯id
                 *          lawentityid:����ʵ��id
                 *          startdate����ʼ����
                 * @return Map<String, Object> �ɹ�ʧ��
                 */
                updateLaborRelRecord(updateList:$.java.util.List):$.java.util.Map;
            }
            interface HRPIPersonServiceHelper_C extends HRPIPersonServiceHelper_S {
                new():HRPIPersonServiceHelper;
            }
            interface HRPIPersonServiceHelper$ {
            }
            type HRPIPersonServiceHelper_T = HRPIPersonServiceHelper_S & HRPIPersonServiceHelper$;
            interface HRPIPersonServiceHelper extends HRPIPersonServiceHelper_T {
            }
            interface HRPIApplyServiceHelper_S {
                /**
                 * ͨ���ӿ�����HR��Ա<br/>
                 * ����Ա����Ϣʾ����θ�ʽ<br/>
                 * | ������                   | ��������                     | �Ƿ����     | ˵��                                             |<br/>
                 * | ------------------------ | ---------------------------- | ------------ | ------------------------------------------------ |<br/>
                 * | person                   | Long                         | ��           | ��Ȼ��ID                                         |<br/>
                 * | number                   | String                       | ��           | ����                                             |<br/>
                 * | name                     | String                       | ��           | ����                                             |<br/>
                 * | phone                    | String                       | ��           | �ֻ�����(��ʽ +86-15000000000)                   |<br/>
                 * | oldperson                | Long                         | ��           | ��һ����Ȼ��id                                   |<br/>
                 * | **\*baseinfo\***         | ***\*Map<String,Object>\**** | ��           | ***\*Ա��������Ϣ\****                           |<br/>
                 * | >employee                | Long                         | ��           | ��ҵ��ID                                         |<br/>
                 * | >depemp                  | Long                         | ��           | ��֯��ID                                         |<br/>
                 * | >cepmp                   | Long                         | ��           | ��������ΧID                                   |<br/>
                 * | >oldempnumber            | String                       | ��           | ǰ����                                           |<br/>
                 * | >inheritnumber           | String                       | ��           | �Ƿ�̳й���(1:��;2:��)��������ְ��ص�ҵ��      |<br/>
                 * | >startdate               | Date                         | ��           | ��ְ����                                         |<br/>
                 * | >enterprise              | Long                         | ��           | ���˵�λID                                       |<br/>
                 * | >laborreltype            | Long                         | ��           | �ù���ϵ����ID                                   |<br/>
                 * | >laborrelstatus          | Long                         | ��           | �ù���ϵ״̬ID                                   |<br/>
                 * | >labrelstatusprd         | Long                         | ��           | �ù���ϵ�׶�ID(��laborrelstatus�������ϴ���)     |<br/>
                 * | >isprobation             | Boolean                      | ��           | �Ƿ���������                                     |<br/>
                 * | >managingscope           | Long                         | ��           | ��������ΧID                                   |<br/>
                 * | >***\*empposorgrels\**** | ***\*List\****               | ��           | ***\*��ְ����\*(Ŀǰ��֧�ִ�һ����ְ��������)*** |<br/>
                 * | >>adminorg               | Long                         | ��           | ������֯ID                                       |<br/>
                 * | >>posstatus              | Long                         | ��           | ��ְ״̬                                         |<br/>
                 * | >>postype                | Long                         | ��           | ��ְ����                                         |<br/>
                 * | >>startdate              | Date                         | ��           | ���ڿ�ʼ����                                     |<br/>
                 * | >>enddate                | Date                         | ��           | ��ְ��������(������Ĭ��ϵͳ�������2999-12-31)   |<br/>
                 * | >>isprimary              | Boolean                      | ��           | �Ƿ�����ְ                                       |<br/>
                 * | >>position               | Long                         | ��           | ��λ(��λ/��׼��λ/ְλ ����һ��)                |<br/>
                 * | >>stdposition            | Long                         | ��           | ��׼��λ(��λ/��׼��λ/ְλ ����һ��)            |<br/>
                 * | >>job                    | Long                         | ��           | ְλ(��λ/��׼��λ/ְλ ����һ��)                |<br/>
                 * | >>workplace              | Long                         | ��           | ������                                           |<br/>
                 * | >>variationtype          | Long                         | ��           | �䶯����                                         |<br/>
                 * | ***\*pertsprop\****      | Map<String,Object>           | ��           | ***\*��Աʱ����Ϣ(��Ӧ��Աʱ�������Ա�)\****     |<br/>
                 * | >healthstatus            | Long                         | ��           | ����״��ID                                       |<br/>
                 * | >marriagestatus          | Long                         | ��           | ����״��ID                                       |<br/>
                 * | >procreatstatus          | Long                         | ��           | ����״��ID                                       |<br/>
                 * | >childrennumber          | Int                          | ��           | ��Ů��                                           |<br/>
                 * | ***\*pernontsprop\****   | Map                          | ��           | ***\*��Ա������Ϣ(��Ӧ��Ա��ʱ�������Ա�)\****   |<br/>
                 * | >gender                  | Long                         | ��           | �Ա�ID                                           |<br/>
                 * | >nationality             | Long                         | ��           | ����ID                                           |<br/>
                 * | >birthday                | Date                         | ��           | �������� **(��6.0�汾�ɱ����޸�Ϊ�Ǳ���)**       |<br/>
                 * | >folk                    | Long                         | ��           | ����ID                                           |<br/>
                 * | >constellation           | Long                         | ��           | ����ID                                           |<br/>
                 * | >bloodtype               | String                       | ��           | Ѫ��                                             |<br/>
                 * | >height                  | Int                          | ��           | ���(cm)                                         |<br/>
                 * | >lunarcalendarbirthday   | Date                         | ��           | ũ������                                         |<br/>
                 * | >***\*formername\****    | Map<String,Object>           | ��           | ***\*������\*(�������ֶ�)***                     |<br/>
                 * | >>zh_CN                  | String                       | ��           | ��������                                         |<br/>
                 * | >>zh_TW                  | String                       | ��           | ��������                                         |<br/>
                 * | >>en_US                  | String                       | ��           | English                                          |<br/>
                 * | >***\*title\****         | Map                          | ��           | ***\*ͷ��\*(�������ֶ�)***                       |<br/>
                 * | >>zh_CN                  | String                       | ��           | ��������                                         |<br/>
                 * | >>zh_TW                  | String                       | ��           | ��������                                         |<br/>
                 * | >>en_US                  | String                       | ��           | English                                          |<br/>
                 * | >enname                  | String                       | ��           | Ӣ����                                           |<br/>
                 * | >julianbirthday          | Date                         | ��           | ��������                                         |<br/>
                 * | >symbolicanimals         | Long                         | ��           | ��ФID                                           |<br/>
                 * | >nameen                  | String                       | ��           | ƴ����                                           |<br/>
                 * | >nativelngname           | String                       | ��           | ������������                                     |<br/>
                 * | >displayname             | String                       | ��           | ��ʾ��                                           |<br/>
                 * | >marriageregistdate      | Date                         | ��           | ���Ǽ�����                                     |<br/>
                 * | ***\*percontact\****     | ***\*Map\****                | ***\*��\**** | ***\*��ϵ��Ϣ(��Ӧ��Ա��ϵ��ʽ����ҳ���)\****   |<br/>
                 * | >otherphone              | String                       | ��           | �����ֻ�(��ʽ +86-15000000000)                   |<br/>
                 * | >peremail                | String                       | ��           | ��������                                         |<br/>
                 * | ***\*perregion\****      | Map                          | ��           | ***\*��Ա������Ϣ(��Ӧ��Ա������Ϣ��)\****       |<br/>
                 * | >politicalstatus         | Long                         | ��           | ������òID                                       |<br/>
                 * | >party                   | Long                         | ��           | ��������ID                                       |<br/>
                 * | >joinpartydate           | Date                         | ��           | �뵳����                                         |<br/>
                 * | >***\*nativeplace\****   | Map                          | ��           | ***\*����\*(�������ֶ�)***                       |<br/>
                 * | >>zh_CN                  | String                       | ��           | ��������                                         |<br/>
                 * | >>zh_TW                  | String                       | ��           | ��������                                         |<br/>
                 * | >>en_US                  | String                       | ��           | English                                          |<br/>
                 * | >***\*birthplace\****    | Map                          | ��           | ***\*������\*(�������ֶ�)***                     |<br/>
                 * | >>zh_CN                  | String                       | ��           | ��������                                         |<br/>
                 * | >>zh_TW                  | String                       | ��           | ��������                                         |<br/>
                 * | >>en_US                  | String                       | ��           | English                                          |<br/>
                 *
                 * @param employeeListInfo �����б� ���������ʾ��
                 * @return ����ķ��ؽ�� <br/>
                 * | ������       | ��������                  | ˵��                                                       |<br/>
                 * | ------------ | ------------------------- | ---------------------------------------------------------- |<br/>
                 * | data         | Map<String, Object>       | ͨ�ýӿڷ��صı�����                                     |<br/>
                 * | success      | boolean                   | �ɹ��ı�ʶ��true���ɹ���false��ʧ��                        |<br/>
                 * | errorInfoMsg | List<Map<String, Object>> | ������Ϣ���ϣ�У��Ĵ�����Ϣ���������ñ���ӿڵĴ��󷵻أ� |<br/>
                 * | successInfo  | Map<String, Object>       | �����ɹ����Ĳ���id��ص���Ϣ                               |<br/>
                 */
                addEmployee(employeeListInfo:$.java.util.List):$.java.util.Map;
                /**
                 * ������ְ����
                 *
                 * @param param ���
                 * @return Map<String, Object>
                 */
                discardEmpExp(param:$.java.util.Map):$.java.util.Map;
                /**
                 *  ��ְ����ά��<br/>
                 *  �����depemp Ϊ��ǰϵͳ���Ѵ��ڵ�id���߸���;��������<br/>
                 *  ���ʾ��<br/>
                 *  | ������        | �������� | �Ƿ���� | ˵��                                    |<br/>
                 *  | ------------- | -------- | -------- | --------------------------------------- |<br/>
                 *  | depemp        | Long     | ��       | ��֯��ID                                |<br/>
                 *  | number        | String   | ��       | ����                                    |<br/>
                 *  | adminorg      | Long     | ��       | ������֯ID                              |<br/>
                 *  | posstatus     | Long     | ��       | ��ְ״̬ID                              |<br/>
                 *  | postype       | Long     | ��       | ��ְ����ID                              |<br/>
                 *  | position      | Long     | ��       | ��λID (��λ/��׼��λ/ְλ ����һ��)    |<br/>
                 *  | stdposition   | Long     | ��       | ��׼��λID(��λ/��׼��λ/ְλ ����һ��) |<br/>
                 *  | job           | Long     | ��       | ְλID(��λ/��׼��λ/ְλ ����һ��)     |<br/>
                 *  | workplace     | Long     | ��       | ������ID                                |<br/>
                 *  | startdate     | Date     | ��       | ��ְ��ʼ����                            |<br/>
                 *  | enddate       | Date     | ��       | ��ְ��������                            |<br/>
                 *  | isprimary     | Boolean  | ��       | �Ƿ�����ְ                              |<br/>
                 *  | variationtype | Long     | ��       | �䶯����                                |<br/>
                 * <br/>
                 *  @param empOrgrels �����б� ���������ʾ��
                 *  @return ����ķ��ؽ�� <br/>
                 *  | ������       | ��������                  | ˵��                                                       |<br/>
                 *  | ------------ | ------------------------- | ---------------------------------------------------------- |<br/>
                 *  | data         | Map<String, Object>       | ͨ�ýӿڷ��صı�����                                     |<br/>
                 *  | success      | boolean                   | �ɹ��ı�ʶ��true���ɹ���false��ʧ��                        |<br/>
                 *  | errorInfoMsg | List<Map<String, Object>> | ������Ϣ���ϣ�У��Ĵ�����Ϣ���������ñ���ӿڵĴ��󷵻أ� |<br/>
                 *  | successInfo  | Map<String, Object>       | �����ɹ����Ĳ���id��ص���Ϣ                               |<br/>
                 */
                saveEmpOrgrels(empOrgrels:$.java.util.List):$.java.util.Map;
                /**
                 * ְҵ��Ϣά��,��֧��ְҵ��Ϣ����,�޷���������ְҵ��Ϣ<br/>
                 * ��β����ṹ:<br/>
                 * | ������          | �������� | �Ƿ����                             | ˵��                                         |<br/>
                 * | --------------- | -------- | ------------------------------------ | -------------------------------------------- |<br/>
                 * | employee        | Long     | ��                                   | ��ҵ��ID                                     |<br/>
                 * | number          | String   | ��                                   | ����                                         |<br/>
                 * | inheritnumber   | String   | ��                                   | �Ƿ�̳й���(1���ǣ�2����)                   |<br/>
                 * | enterprise      | Long     | ��                                   | ���˵�λID                                   |<br/>
                 * | laborreltype    | Long     | ��                                   | �ù���ϵ����ID                               |<br/>
                 * | laborrelstatus  | Long     | ��                                   | �ù���ϵ״̬ID                               |<br/>
                 * | labrelstatusprd | Long     | ��  (laborrelstatus�����ֵ����ش�) | �ù���ϵ�׶�ID(��laborrelstatus�������ϴ���) |<br/>
                 * | isprobation     | Boolean  | ��                                   | �Ƿ���������                                 |<br/>
                 * | startdate       | Date     | ��                                   | ��ʼ����                                     |<br/>
                 * | enddate         | Date     | ��                                   | ��������                                     |<br/>
                 * | adjustlength    | Double   | ��                                   | ��������                                     |<br/>
                 *
                 * @param empenTrels �����б� ���������ʾ��
                 * @return ����ķ��ؽ�� <br/>
                 * | ������       | ��������                  | ˵��                                                       |<br/>
                 * | ------------ | ------------------------- | ---------------------------------------------------------- |<br/>
                 * | data         | Map<String, Object>       | ͨ�ýӿڷ��صı�����                                     |<br/>
                 * | success      | boolean                   | �ɹ��ı�ʶ��true���ɹ���false��ʧ��                        |<br/>
                 * | errorInfoMsg | List<Map<String, Object>> | ������Ϣ���ϣ�У��Ĵ�����Ϣ���������ñ���ӿڵĴ��󷵻أ� |<br/>
                 * | successInfo  | Map<String, Object>       | �����ɹ����Ĳ���id��ص���Ϣ                               |<br/>
                 */
                saveEmpentrels(empenTrels:$.java.util.List):$.java.util.Map;
                /**
                 *  ������Ϣά�� ������Ȼ����ص���Ϣ <br/>
                 *  ��β����ṹʾ��:<br/>
                 *  | ������                 | ��������           | �Ƿ����     | ˵��                                           |<br/>
                 *  | ---------------------- | ------------------ | ------------ | ---------------------------------------------- |<br/>
                 *  | person                 | Long               | ��           | ��Ȼ��ID                                       |<br/>
                 *  | number                 | String             | ��           | ����                                           |<br/>
                 *  | name                   | String             | ��           | ����                                           |<br/>
                 *  | phone                  | String             | ��           | �ֻ�����(��ʽ +86-15000000000)                 |<br/>
                 *  | ***\*pertsprop\****    | Map<String,Object> | ��           | ***\*��Աʱ����Ϣ(��Ӧ��Աʱ�������Ա�)\****   |<br/>
                 *  | >healthstatus          | Long               | ��           | ����״��ID                                     |<br/>
                 *  | >marriagestatus        | Long               | ��           | ����״��ID                                     |<br/>
                 *  | >procreatstatus        | Long               | ��           | ����״��ID                                     |<br/>
                 *  | >childrennumber        | Int                | ��           | ��Ů��                                         |<br/>
                 *  | ***\*pernontsprop\**** | Map                | ��           | ***\*��Ա������Ϣ(��Ӧ��Ա��ʱ�������Ա�)\**** |<br/>
                 *  | >gender                | Long               | ��           | �Ա�ID                                         |<br/>
                 *  | >nationality           | Long               | ��           | ����ID                                         |<br/>
                 *  | >birthday              | Date               | ��           | �������� **(��6.0�汾�ɱ����޸�Ϊ�Ǳ���)**     |<br/>
                 *  | >folk                  | Long               | ��           | ����ID                                         |<br/>
                 *  | >constellation         | Long               | ��           | ����ID                                         |<br/>
                 *  | >bloodtype             | String             | ��           | Ѫ��                                           |<br/>
                 *  | >height                | Int                | ��           | ���(cm)                                       |<br/>
                 *  | >lunarcalendarbirthday | Date               | ��           | ũ������                                       |<br/>
                 *  | >***\*formername\****  | Map<String,Object> | ��           | ***\*������\*(�������ֶ�)***                   |<br/>
                 *  | >>zh_CN                | String             | ��           | ��������                                       |<br/>
                 *  | >>zh_TW                | String             | ��           | ��������                                       |<br/>
                 *  | >>en_US                | String             | ��           | English                                        |<br/>
                 *  | >***\*title\****       | Map                | ��           | ***\*ͷ��\*(�������ֶ�)***                     |<br/>
                 *  | >>zh_CN                | String             | ��           | ��������                                       |<br/>
                 *  | >>zh_TW                | String             | ��           | ��������                                       |<br/>
                 *  | >>en_US                | String             | ��           | English                                        |<br/>
                 *  | >enname                | String             | ��           | Ӣ����                                         |<br/>
                 *  | >julianbirthday        | Date               | ��           | ��������                                       |<br/>
                 *  | >symbolicanimals       | Long               | ��           | ��ФID                                         |<br/>
                 *  | >nameen                | String             | ��           | ƴ����                                         |<br/>
                 *  | >nativelngname         | String             | ��           | ������������                                   |<br/>
                 *  | >displayname           | String             | ��           | ��ʾ��                                         |<br/>
                 *  | >marriageregistdate    | Date               | ��           | ���Ǽ�����                                   |<br/>
                 *  | ***\*percontact\****   | ***\*Map\****      | ***\*��\**** | ***\*��ϵ��Ϣ(��Ӧ��Ա��ϵ��ʽ����ҳ���)\**** |<br/>
                 *  | >otherphone            | String             | ��           | �����ֻ�(��ʽ +86-15000000000)                 |<br/>
                 *  | >peremail              | String             | ��           | ��������                                       |<br/>
                 *  | ***\*perregion\****    | Map                | ��           | ***\*��Ա������Ϣ(��Ӧ��Ա������Ϣ��)\****     |<br/>
                 *  | >politicalstatus       | Long               | ��           | ������òID                                     |<br/>
                 *  | >party                 | Long               | ��           | ��������ID                                     |<br/>
                 *  | >joinpartydate         | Date               | ��           | �뵳����                                       |<br/>
                 *  | >***\*nativeplace\**** | Map                | ��           | ***\*����\*(�������ֶ�)***                     |<br/>
                 *  | >>zh_CN                | String             | ��           | ��������                                       |<br/>
                 *  | >>zh_TW                | String             | ��           | ��������                                       |<br/>
                 *  | >>en_US                | String             | ��           | English                                        |<br/>
                 *  | >***\*birthplace\****  | Map                | ��           | ***\*������\*(�������ֶ�)***                   |<br/>
                 *  | >>zh_CN                | String             | ��           | ��������                                       |<br/>
                 *  | >>zh_TW                | String             | ��           | ��������                                       |<br/>
                 *  | >>en_US                | String             | ��           | English                                        |<br/>
                 * <br/>
                 *  @param personInfos �����б� ���������ʾ��
                 *  @return ����ķ��ؽ�� <br/>
                 *  | ������       | ��������                  | ˵��                                                       |<br/>
                 *  | ------------ | ------------------------- | ---------------------------------------------------------- |<br/>
                 *  | data         | Map<String, Object>       | ͨ�ýӿڷ��صı�����                                     |<br/>
                 *  | success      | boolean                   | �ɹ��ı�ʶ��true���ɹ���false��ʧ��                        |<br/>
                 *  | errorInfoMsg | List<Map<String, Object>> | ������Ϣ���ϣ�У��Ĵ�����Ϣ���������ñ���ӿڵĴ��󷵻أ� |<br/>
                 *  | successInfo  | Map<String, Object>       | �����ɹ����Ĳ���id��ص���Ϣ                               |<br/>
                 */
                savePersonInfo(personInfos:$.java.util.List):$.java.util.Map;
            }
            interface HRPIApplyServiceHelper_C extends HRPIApplyServiceHelper_S {
                new():HRPIApplyServiceHelper;
            }
            interface HRPIApplyServiceHelper$ {
            }
            type HRPIApplyServiceHelper_T = HRPIApplyServiceHelper_S & HRPIApplyServiceHelper$;
            interface HRPIApplyServiceHelper extends HRPIApplyServiceHelper_T {
            }
            interface HRPIDepempServiceHelper_S {
                /**
                 * ���������ְ��ȫְ��ְ�ͽ���ʱ�䣬�޸�Ϊ����ְ��ȫְ��ְ����ԭ����ְ��ȫְ��ְ,�л�Ϊ������ְȫְ��ְ
                 *
                 * @param changeParams ���� id :��ְ��������   depempid : ��֯��id (����id �� depempid ������һ�����ɣ���������id)  updatedate:����ʱ��
                 * @return ״̬�룺200���ɹ�  201��ȫ������У���쳣 202����������У���쳣�����ֳɹ� 203���������� 500�������쳣
                 */
                changePrimaryEmpPosOrgRel(changeParams:$.java.util.List):$.java.util.Map;
                /**
                 * ��֯�ı���ά�ȸ��ģ���ȫ��������֯����Առ�������
                 * ��ѯʱ�佻�������ݣ�
                 * 1.startdate >= gteDate and startdate <= lteDate or
                 * 2.startdate <= gteDate and enddate >= lteDate or
                 * 3.enddate >= gteDate and enddate <= lteDate or
                 * 4.startdate >= gteDate and enddate <= lteDate
                 *
                 * @param gteDate   ��ѯ��ʼ���ڣ�����
                 * @param lteDate   ��ѯ��ֹ���ڣ�����
                 * @param paramMap: -- orgteamIdList ��֯�Ŷ�ID����
                 *                  -- postypeIdList ��ְ����ID����
                 *                  -- postcategoryIdList ��ְ���ͷ���ID����
                 * @return ҵ��汾���ݼ���
                 */
                countIntersectEmpOrgrels(gteDate:Date,lteDate:Date,paramMap:$.java.util.Map):number;
                /**
                 * ��ȡ��ְ��Ϣ(��ʷģ����Ч����)
                 *
                 * @param depempId ��֯��id
                 * @return Map<String, Object> ��ְ��Ϣ
                 */
                getDataEmpOrgrel(depempId:long):$.java.util.Map;
                /**
                 * ��ȡ��֯����Ϣ
                 *
                 * @param depempId ��֯��id
                 * @return Map<String, Object> ��֯����Ϣ
                 */
                getDepemp(depempId:long):$.java.util.Map;
                /**
                 * ��ȡ�Ĳ���ԱID
                 *
                 * @param depempId ��֯��id
                 * @return Map<String, Long> �Ĳ���ԱID
                 */
                getDepempIds(depempId:long):$.java.util.Map;
                /**
                 * ��ȡ��ְ��Ϣ
                 *
                 * @param depempId ��֯��id
                 * @return Map<String, Object> ��ְ��Ϣ
                 */
                getEmpOrgrel(depempId:long):$.java.util.Map;
                /**
                 * ��ȡ��ְ��Ϣ(��ʷģ����Ч����)
                 *
                 * @param depempIds ��֯��id����
                 * @return List<DynamicObject> ��ְ��Ϣ
                 */
                listDataEmpOrgrelDys(depempIds:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��ְ��Ϣ(��ʷģ����Ч����)
                 *
                 * @param depempIds ��֯��id����
                 * @return List<Map<String, Object>> ��ְ��Ϣ
                 */
                listDataEmpOrgrels(depempIds:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��ְ��Ϣ
                 *
                 * @param depempIds ��֯��id����
                 * @return List<DynamicObject> ��ְ��Ϣ
                 */
                listEmpOrgrelDys(depempIds:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��ְ��Ϣ
                 *
                 * @param depempIds ��֯��id����
                 * @return List<Map<String, Object>>
                 */
                listEmpOrgrels(depempIds:$.java.util.List):$.java.util.List;
                /**
                 * ����ְ��ֹ���ɫID��ѯĿǰ��ְ��ֹ���ɫ�ϵ���Ա��Ϣ
                 *
                 * @param dutyworkrolesIdList ְ��ֹ���ɫID�б�
                 * @return List<Map<String, Object>>  ��Ա��Ϣ��ͷ�����������š����䡢�Ա𡢹��䡢˾�䡢ְ������ְ���͡���λ
                 */
                listEmpersonByDutyworkroles(dutyworkrolesIdList:$.java.util.List):$.java.util.List;
                /**
                 * ��֯�ı���ά�ȸ��ģ���ȫ��������֯����Առ�������
                 * ��ѯʱ�佻�������ݣ�
                 * 1.startdate >= gteDate and startdate <= lteDate or
                 * 2.startdate <= gteDate and enddate >= lteDate or
                 * 3.enddate >= gteDate and enddate <= lteDate or
                 * 4.startdate >= gteDate and enddate <= lteDate
                 *
                 * @param gteDate   ��ѯ��ʼ���ڣ�����
                 * @param lteDate   ��ѯ��ֹ���ڣ�����
                 * @param paramMap: -- orgteamIdList ��֯�Ŷ�ID����
                 *                  -- postypeIdList ��ְ����ID����
                 * @param id        ID�Ĵ�������
                 * @param top       ��ѯ����
                 * @return List<Map<String, Object>> ҵ��汾���ݼ���
                 */
                listIntersectEmpOrgrels(gteDate:Date,lteDate:Date,paramMap:$.java.util.Map,id:long,top:number):$.java.util.List;
            }
            interface HRPIDepempServiceHelper_C extends HRPIDepempServiceHelper_S {
                new():HRPIDepempServiceHelper;
            }
            interface HRPIDepempServiceHelper$ {
            }
            type HRPIDepempServiceHelper_T = HRPIDepempServiceHelper_S & HRPIDepempServiceHelper$;
            interface HRPIDepempServiceHelper extends HRPIDepempServiceHelper_T {
            }
            interface HRPICmpempServiceHelper_S {
                /**
                 * ��ȡ��������Χ
                 *
                 * @param cmpempId
                 * @return
                 */
                getCmpemp(cmpempId:long):$.java.util.Map;
                /**
                 * ��ȡ����Χ��¼
                 *
                 * @param cmpempId
                 * @return
                 */
                getManagingScope(cmpempId:long):$.java.util.Map;
            }
            interface HRPICmpempServiceHelper_C extends HRPICmpempServiceHelper_S {
                new():HRPICmpempServiceHelper;
            }
            interface HRPICmpempServiceHelper$ {
            }
            type HRPICmpempServiceHelper_T = HRPICmpempServiceHelper_S & HRPICmpempServiceHelper$;
            interface HRPICmpempServiceHelper extends HRPICmpempServiceHelper_T {
            }
            interface HRPTMMServiceHelper_S {
                /**
                 * ������Ա����ҵ��id����ѯ����Ӧ��Ա��������Ŀ�Ŷ���ְ������Ϣ
                 *
                 * @param inParam �����������ҵ��id����
                 * @return ��ְ��������
                 */
                listTeamMemberRole(inParam:$.java.util.Map):$.java.util.Map;
            }
            interface HRPTMMServiceHelper_C extends HRPTMMServiceHelper_S {
                new():HRPTMMServiceHelper;
            }
            interface HRPTMMServiceHelper$ {
            }
            type HRPTMMServiceHelper_T = HRPTMMServiceHelper_S & HRPTMMServiceHelper$;
            interface HRPTMMServiceHelper extends HRPTMMServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.lcs{
            interface LCSCostCenterModule_S {
            }
            type LCSCostCenterModule_ST = $.kd.sdk.module.Module & LCSCostCenterModule_S;
            interface LCSCostCenterModule_C extends LCSCostCenterModule_ST {
                new():LCSCostCenterModule;
            }
            interface LCSCostCenterModule$ {
            }
            type LCSCostCenterModule_T = $.kd.sdk.module.Module & LCSCostCenterModule_S & LCSCostCenterModule$;
            interface LCSCostCenterModule extends LCSCostCenterModule_T {
            }
            interface LCSCostCenterServiceHelper_S {
                /**
                 * ����/�޸ĳɱ�����
                 *
                 * @param param ���������1w��
                 * @return ������Σ���֤����һ�£����Ӳ��ַ������ԣ�success��true/false  message:������Ϣ
                 */
                saveCostCenters(param:$.java.util.Map):$.java.util.Map;
            }
            interface LCSCostCenterServiceHelper_C extends LCSCostCenterServiceHelper_S {
                new():LCSCostCenterServiceHelper;
            }
            interface LCSCostCenterServiceHelper$ {
            }
            type LCSCostCenterServiceHelper_T = LCSCostCenterServiceHelper_S & LCSCostCenterServiceHelper$;
            interface LCSCostCenterServiceHelper extends LCSCostCenterServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.msgcollaboration{
            interface HRMsgCollaborationModule_S {
            }
            type HRMsgCollaborationModule_ST = $.kd.sdk.module.Module & HRMsgCollaborationModule_S;
            interface HRMsgCollaborationModule_C extends HRMsgCollaborationModule_ST {
                new():HRMsgCollaborationModule;
            }
            interface HRMsgCollaborationModule$ {
            }
            type HRMsgCollaborationModule_T = $.kd.sdk.module.Module & HRMsgCollaborationModule_S & HRMsgCollaborationModule$;
            interface HRMsgCollaborationModule extends HRMsgCollaborationModule_T {
            }
            interface HRMsgCollaborationServiceHelper_S {
                /**
                 * ��ȡ�Ѷ���/��Ч��API��Ϣ
                 *
                 * @param msgSubNo ���ķ�Ψһʶ����
                 * @return �Ѷ���/��Ч��API��Ϣ
                 */
                getAPIInfoByMsgSubNo(msgSubNo:string):$.java.util.List;
                /**
                 * ���ķ�ͨ����̨��ȡ��Ϣ�䶯��Ϣ
                 *
                 * @param apiId   api id
                 * @param qFilter ������
                 * @param orderBy ����
                 * @return ��Ա��Ϣ
                 */
                getDataBySub(apiId:long,qFilter:$.kd.bos.orm.query.QFilter,orderBy:string):$.java.util.List;
                /**
                 * ������Ϣ���ı�Ż�ȡ��Ϣ�������������ѷ�����Ϣ
                 *
                 * @param msgNumber: ��Ϣ���ı��
                 * @param actionId:  �id
                 * @return ��Ϣ������������Ϣ������Ϣ
                 */
                getMsgCenterInfo(msgNumber:string,actionId:long):$.java.util.List;
                /**
                 * ������Ϣ���ı�Ż�ȡ��Ϣ�������������ѷ�����Ϣ
                 *
                 * @param paramsList ��Ϣ��źͻid�б�
                 * @return ��Ϣ������������Ϣ������Ϣ
                 */
                getMsgCenterListInfo(paramsList:$.java.util.List):$.java.util.List;
                /**
                 * ���ݻID��ȡ��������Ϣ
                 *
                 * @param actionId �ID
                 * @return ��������Ϣ
                 */
                getPubByActionId(actionId:long):$.java.util.List;
                /**
                 * ���ݷ�����Ψһʶ�����ȡ�򵥻��Ϣ
                 *
                 * @param msgPubNo ������Ψһʶ����
                 * @return �򵥻��Ϣ
                 */
                getSimpleActionInfo(msgPubNo:string):$.java.util.Map;
                /**
                 * ���� APIģ������ ID, ��ȡ��Ӧ��XML������Ϣ
                 *
                 * @param id ģ������ID
                 * @return ��Ӧ��XML������Ϣ
                 */
                getXMLDescById(id:long):string;
                /**
                 * ҵ��������ҪЭ���Ļ��Ϣ��������̨���� ��1��У���ĺϷ��� ��2�����ݻ��Ϣ��ȡ�������Ϣ���������Ϣ ��3�������Ϣ���������Ϣ������Ϣ���� ��3�������Ϣ���������Ϣ���������Ϣ��д�������߶���
                 * ����������Ҫ���͸����ķ�����Ϣͨ��MQ���͵���̨
                 *
                 * @param actionInfo ���Ϣ
                 */
                publishAction(actionInfo:$.java.util.Map):void;
                /**
                 * ����������Ҫ���͸����ķ�����Ϣ����������ʽͨ��MQ���͵���̨
                 *
                 * @param actionInfoList:
                 * @return ��Ϣ���ͽ��
                 */
                publishAction(actionInfoList:$.java.util.List):kd.hr.hbp.common.mservice.HRMSendMsgResult;
                /**
                 * �����������������
                 *
                 * @param actionDy: ���̬����
                 * @return �������actionId
                 */
                saveActionDy(actionDy:$.kd.bos.dataentity.entity.DynamicObject):long;
                /**
                 * ��������ͻ�����������
                 *
                 * @param actionTypeDy: ����Ͷ�̬����
                 * @return �������actionTypeId
                 */
                saveActionTypeDy(actionTypeDy:$.kd.bos.dataentity.entity.DynamicObject):long;
                /**
                 * ����/�޸ķ�����������
                 *
                 * @param publisherMap: ������map
                 * @param isModify: �Ƿ��޸�
                 * @return long ������ķ�����Ψһʶ����
                 */
                saveMsgPublisher(publisherMap:$.java.util.Map,isModify:boolean):string;
                /**
                 * �����ѷ�������������Ϣ���µ��������ĵ���Ϣ��
                 *
                 * @param consumeMsgMap:������������Ϣ(msgCenterId:��Ϣ����id,businessTypeId:ҵ������id,consumeMsg:���ѷ��������ı���Ϣ,handleStatus:���ѷ�ҵ�����״̬)
                 */
                updateConsumeMsgInfo(consumeMsgMap:$.java.util.Map):void;
            }
            interface HRMsgCollaborationServiceHelper_C extends HRMsgCollaborationServiceHelper_S {
                new():HRMsgCollaborationServiceHelper;
            }
            interface HRMsgCollaborationServiceHelper$ {
            }
            type HRMsgCollaborationServiceHelper_T = HRMsgCollaborationServiceHelper_S & HRMsgCollaborationServiceHelper$;
            interface HRMsgCollaborationServiceHelper extends HRMsgCollaborationServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.multientityquery{
            interface HRQueryEntityModule_S {
            }
            type HRQueryEntityModule_ST = $.kd.sdk.module.Module & HRQueryEntityModule_S;
            interface HRQueryEntityModule_C extends HRQueryEntityModule_ST {
                new():HRQueryEntityModule;
            }
            interface HRQueryEntityModule$ {
            }
            type HRQueryEntityModule_T = $.kd.sdk.module.Module & HRQueryEntityModule_S & HRQueryEntityModule$;
            interface HRQueryEntityModule extends HRQueryEntityModule_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.odc{
            interface AdminOrgServiceHelper_S {
                /**
                 * ������֯ - ����
                 * @param adminOrgs
                 * @return resultMap
                 */
                addAdminOrg(adminOrgs:$.java.util.ArrayList):$.java.util.Map;
                /**
                 * ������֯������Ϣ��ѯ������BOID��
                 * @param orgIdList ҵ����֯ BOID
                 * @param date ��ѯ����
                 * @return
                 */
                adminOrgInfoQuery(orgIdList:$.java.util.List,date:Date):$.java.util.Map;
                /**
                 * ������֯ - ��Ϣ���
                 * @param adminOrgs
                 * @return
                 */
                change(adminOrgs:$.java.util.List):$.java.util.Map;
                /**
                 * ������֯ - �ϼ�����
                 * @param adminOrgs
                 * @return
                 */
                changeParent(adminOrgs:$.java.util.List):$.java.util.Map;
                /**
                 * ������֯ - ����
                 * @return
                 */
                disable(disableParams:$.java.util.Map):$.java.util.Map;
                /**
                 * ������֯ - ����
                 * @param idList ������֯BOID
                 * @param buId ҵ����֯
                 * @param effectDate ��Ч����
                 * @return
                 */
                disable(idList:$.java.util.List,buId:long,effectDate:Date):$.java.util.Map;
                /**
                 * ������֯ - ����
                 * @param idList ������֯BOID
                 * @param buId ҵ����֯
                 * @param effectDate ��Ч����
                 * @return
                 */
                enable(idList:$.java.util.List,buId:long,effectDate:Date):$.java.util.Map;
                /**
                 * ������֯������Ϣ��ѯ�����ձ��룩
                 * @param orgNumberList ������֯����
                 * @param date ��ѯ����
                 * @return
                 */
                getAdminOrgInfoByNumber(orgNumberList:$.java.util.List,date:Date):$.java.util.Map;
                /**
                 * ����boId������ѯָ���㼶����֯��Ϣ
                 *
                 * @param orgIds ��֯boId
                 * @param orgNumbers ��֯����
                 * @param level ָ���㼶
                 * @param date ��ѯ����
                 * @return ��֯��Ϣ
                 */
                getAdminOrgInfoByNumber(orgIds:$.java.util.List,orgNumbers:$.java.util.List,level:number,date:Date):$.java.util.Map;
                /**
                 * ��֯�ϲ��ӿ�
                 *
                 * @param billDy   ���ݶ���
                 * @param dyList   ��Ҫ��������Ϣ������ϼ������Ķ�̬����
                 * @param mergeMap keyΪ�ϲ�����֯���룬valueΪ�ϲ���֯��̬����
                 */
                merge(billDy:$.kd.bos.dataentity.entity.DynamicObject,dyList:$.java.util.List,mergeMap:$.java.util.Map):$.java.util.Map;
            }
            interface AdminOrgServiceHelper_C extends AdminOrgServiceHelper_S {
                new():AdminOrgServiceHelper;
            }
            interface AdminOrgServiceHelper$ {
            }
            type AdminOrgServiceHelper_T = AdminOrgServiceHelper_S & AdminOrgServiceHelper$;
            interface AdminOrgServiceHelper extends AdminOrgServiceHelper_T {
            }
            interface HROdcModule_S {
            }
            type HROdcModule_ST = $.kd.sdk.module.Module & HROdcModule_S;
            interface HROdcModule_C extends HROdcModule_ST {
                new():HROdcModule;
            }
            interface HROdcModule$ {
            }
            type HROdcModule_T = $.kd.sdk.module.Module & HROdcModule_S & HROdcModule$;
            interface HROdcModule extends HROdcModule_T {
            }
            interface PositionServiceHelper_S {
                /**
                 *  ������λ��Ϣ
                 * ���Ϊ��λ������Ϣ��̬���󼯺�
                 *
                 *  @param   positions      ��λ������Ϣ��̬���󼯺�
                 *  @return  Map<String, Object>
                 */
                addPosition(positions:$.java.util.List):$.java.util.Map;
                /**
                 * �����λ��Ϣ
                 * ���Ϊ��λ������Ϣ��̬���󼯺ϣ�������ֻ��Ҫ�����λId����Ҫ���������
                 *
                 * @param           positions      ��λ������Ϣ��̬���󼯺�
                 * @return          Map<String, Object>
                 */
                changePosition(positions:$.java.util.List):$.java.util.Map;
                /**
                 * ���ø�λ
                 *
                 * @param   ids      ��λID����
                 * @return  Map<String, Object>
                 */
                disablePosition(ids:$.java.util.List):$.java.util.Map;
                /**
                 * ���ø�λ
                 *
                 * @param   ids      ��λID����
                 * @return  Map<String, Object>
                 */
                enablePosition(ids:$.java.util.List):$.java.util.Map;
            }
            interface PositionServiceHelper_C extends PositionServiceHelper_S {
                new():PositionServiceHelper;
            }
            interface PositionServiceHelper$ {
            }
            type PositionServiceHelper_T = PositionServiceHelper_S & PositionServiceHelper$;
            interface PositionServiceHelper extends PositionServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.permission{
            interface HRPermissionModule_S {
            }
            type HRPermissionModule_ST = $.kd.sdk.module.Module & HRPermissionModule_S;
            interface HRPermissionModule_C extends HRPermissionModule_ST {
                new():HRPermissionModule;
            }
            interface HRPermissionModule$ {
            }
            type HRPermissionModule_T = $.kd.sdk.module.Module & HRPermissionModule_S & HRPermissionModule$;
            interface HRPermissionModule extends HRPermissionModule_T {
            }
            interface HRPermissionServiceHelper_S {
                /**
                 * ��ȡ�б�����Ȩ�޵�������֯��Χ��ID��ϸ�б�
                 * @param userId       :�û�ID
                 * @param appId        :Ӧ��ID
                 * @param entityNumber :ʵ�����
                 * @param permItemId   :Ȩ����ɲο�PermissionStatus
                 * @param propKey      :����key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedAdminOrgSet(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgResult;
                /**
                 * ��ȡF7����Ȩ�޵�������֯��Χ��ID��ϸ�б�
                 *
                 * @param userId       �û�ID
                 * @param appId        Ӧ��ID
                 * @param entityNumber ʵ�����
                 * @param permItemId   Ȩ����
                 * @param propKey      ������������key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedAdminOrgsF7(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgResult;
                /**
                 * ��ȡF7����Ȩ�޵�������֯��Χ���������¼���Ϣ
                 *
                 * @param userId       �û�ID
                 * @param appId        Ӧ��ID
                 * @param entityNumber ʵ�����
                 * @param permItemId   Ȩ����
                 * @param propKey      ������������key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedAdminOrgsF7WithSubInfo(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgResultWithSub;
                /**
                 * ��ȡ�б�����Ȩ�޵�������֯��Χ���������¼���Ϣ
                 *
                 * @param userId       �û�ID
                 * @param appId        Ӧ��ID
                 * @param entityNumber ʵ�����
                 * @param permItemId   Ȩ����
                 * @param propKey      ������������key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedAdminOrgsWithSub(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgResultWithSub;
            }
            interface HRPermissionServiceHelper_C extends HRPermissionServiceHelper_S {
                new():HRPermissionServiceHelper;
            }
            interface HRPermissionServiceHelper$ {
                /**
                 * ɾ���û��ڵ�ǰ��ɫ�ϵ�����Ȩ��+
                 *
                 * @param userId     �û�id
                 * @param roleNumber ��ɫ����
                 * @return �������ؽ��
                 */
                deleteUserRole(userId:long,roleNumber:string):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��ȡ�б�����Ȩ�޵���֯�Ŷӣ�ID��ϸ�б�
                 * @param userId       :�û�ID
                 * @param appId        :Ӧ��ID
                 * @param entityNumber :ʵ�����
                 * @param permItemId   :Ȩ����
                 * @param propKey      :f7����key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedOrgTeams(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgTeamResult;
                /**
                 * ��ȡF7����Ȩ�޵���֯�Ŷ�, ID��ϸ�б�
                 *
                 * @param userId       :�û�ID
                 * @param appId        :Ӧ��ID
                 * @param entityNumber :ʵ�����
                 * @param permItemId   :Ȩ����
                 * @param propKey      :f7����key
                 * @return ��Ȩ�޵���֯�����
                 */
                getAuthorizedOrgTeamsF7(userId:long,appId:string,entityNumber:string,permItemId:string,propKey:string):kd.hr.hbp.common.model.AuthorizedOrgTeamResult;
                /**
                 * �û������ɫ���������߼����ü��ֶ�Ȩ�ޣ�
                 *
                 * @param userId       �û�id
                 * @param roleNumber   ��ɫ����
                 * @param validStart   ��Ч�ڿ�ʼ����
                 * @param validEnd     ��Ч�ڽ�������
                 * @param isCustomData �û��Ƿ��Զ��巶Χ
                 * @param bucaPermData �û��Ƿ��Զ��巶Χ
                 * @param creatorId    ҵ�������ͼid��ְ�����ݷ�Χ
                 * @return �������ؽ��
                 */
                userAssignRole(userId:long,roleNumber:string,validStart:Date,validEnd:Date,isCustomData:boolean,bucaPermData:$.java.util.Map,creatorId:long):kd.hr.hbp.common.api.HrApiResponse;
            }
            type HRPermissionServiceHelper_T = HRPermissionServiceHelper_S & HRPermissionServiceHelper$;
            interface HRPermissionServiceHelper extends HRPermissionServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.prompt{
            interface HRPromptModule_S {
            }
            type HRPromptModule_ST = $.kd.sdk.module.Module & HRPromptModule_S;
            interface HRPromptModule_C extends HRPromptModule_ST {
                new():HRPromptModule;
            }
            interface HRPromptModule$ {
            }
            type HRPromptModule_T = $.kd.sdk.module.Module & HRPromptModule_S & HRPromptModule$;
            interface HRPromptModule extends HRPromptModule_T {
            }
            interface PromptServiceHelper_S {
                /**
                 * ��ȡ��ʾ�﴿�ı���html
                 *
                 * @param id ��ʾ��id
                 * @return ���
                 */
                getContentAndHtml(id:long):$.java.util.Map;
                /**
                 * ��ȡ��ʾ�︻�ı�
                 *
                 * @param promptId ��ʾ��id
                 * @return ���ı�
                 */
                getPromptContent(promptId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * id�б��ȡ��ʾ��
                 *
                 * @param PromptPks ����
                 * @return DynamicObject[]
                 */
                getPrompts(PromptPks:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ʾ���Ƿ����
                 *
                 * @param promptId promptId
                 * @return �Ƿ����
                 */
                isExists(promptId:long):boolean;
                /**
                 * ��ȡ��ʾ��
                 *
                 * @param entityId  ʵ�����
                 * @param controlId �ؼ�����
                 * @return ��ʾ���ֶ�
                 */
                promptServiceHelper(entityId:string,controlId:string):$.java.util.List;
                /**
                 * ���ݵ�ǰ�ؼ�������ģ�ͻ�ȡ��Ӧ�����µ���ʾ��
                 *
                 * @param entityId   ʵ�����
                 * @param controlKey �ؼ�����
                 * @param dataModel  ��̬����
                 * @return ������������ʾ������
                 */
                queryPromptContent(entityId:string,controlKey:string,dataModel:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.List;
                /**
                 * ��ѯ��������ʾ�﴿�ı�����
                 *
                 * @param entityId   ʵ�����
                 * @param controlKey �ؼ���ʶ
                 * @param dataModel  ���ݶ���
                 * @return ��ʾ��Map����
                 */
                queryPromptForString(entityId:string,controlKey:string,dataModel:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.List;
                /**
                 * ��ѯ��������ʾ��id������
                 *
                 * @param entityId   ʵ�����
                 * @param controlKey �ؼ���ʶ
                 * @param dataModel  ���ݶ���
                 * @return ��ʾ��Map����
                 */
                queryPromptIdAndContent(entityId:string,controlKey:string,dataModel:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            interface PromptServiceHelper_C extends PromptServiceHelper_S {
                new():PromptServiceHelper;
            }
            interface PromptServiceHelper$ {
            }
            type PromptServiceHelper_T = PromptServiceHelper_S & PromptServiceHelper$;
            interface PromptServiceHelper extends PromptServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.business.openservicehelper.ruleengine{
            interface RuleEngineServiceHelper_S {
                /**
                 * ����һ������
                 *
                 * @param policyMap ����
                 * @return ���
                 */
                addPolicyWithStatus(policyMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ������������
                 *
                 * @param policyMapList �����б�
                 * @return ���
                 */
                batchAddPolicyWithStatus(policyMapList:$.java.util.List):$.java.util.Map;
                /**
                 * ����ִ�й�������
                 *
                 * @param requestMapList ��������б�
                 * @return ִ�н���б���������������ö�̬�����ת��Ϊ��̬���󣬵��÷�����ֱ����DynamicObject�����û�����ö�̬�����򲻻����κ�ת����
                 */
                batchCallRuleEngine(requestMapList:$.java.util.List):$.java.util.List;
                /**
                 * �����޸Ĳ���
                 *
                 * @param policyMapList �����б�
                 * @return ���
                 */
                batchModifyPolicyWithStatus(policyMapList:$.java.util.List):$.java.util.Map;
                /**
                 * �����������������ִ�й�������
                 *
                 * @param requestMap �������
                 * @return ִ�н������������������ö�̬�����ת��Ϊ��̬���󣬵��÷�����ֱ����DynamicObject�����û�����ö�̬�����򲻻����κ�ת����
                 */
                callRuleEngine(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * �����������������ִ�й�������
                 *
                 * @param requestMap �������
                 * @return ִ��ԭʼ�������������������ö�̬���󲻻�ת������Ҫ���÷��Լ�ת��ΪDynamicObject��
                 */
                callRuleEngineForOriginal(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ����idɾ������
                 * @param policyIds ����id����
                 * @return ��ɾ���Ĳ�������
                 */
                deletePolicy(policyIds:$.java.util.List):number;
                /**
                 * �޸�һ������
                 *
                 * @param policyMap ���Զ���
                 * @return ���
                 */
                modifyPolicyWithStatus(policyMap:$.java.util.Map):$.java.util.Map;
            }
            interface RuleEngineServiceHelper_C extends RuleEngineServiceHelper_S {
                new():RuleEngineServiceHelper;
            }
            interface RuleEngineServiceHelper$ {
            }
            type RuleEngineServiceHelper_T = RuleEngineServiceHelper_S & RuleEngineServiceHelper$;
            interface RuleEngineServiceHelper extends RuleEngineServiceHelper_T {
            }
            interface HRRuleEngineModule_S {
            }
            type HRRuleEngineModule_ST = $.kd.sdk.module.Module & HRRuleEngineModule_S;
            interface HRRuleEngineModule_C extends HRRuleEngineModule_ST {
                new():HRRuleEngineModule;
            }
            interface HRRuleEngineModule$ {
            }
            type HRRuleEngineModule_T = $.kd.sdk.module.Module & HRRuleEngineModule_S & HRRuleEngineModule$;
            interface HRRuleEngineModule extends HRRuleEngineModule_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula{
            interface HRFormulaPlatformModule_S {
            }
            type HRFormulaPlatformModule_ST = $.kd.sdk.module.Module & HRFormulaPlatformModule_S;
            interface HRFormulaPlatformModule_C extends HRFormulaPlatformModule_ST {
                new():HRFormulaPlatformModule;
            }
            interface HRFormulaPlatformModule$ {
            }
            type HRFormulaPlatformModule_T = $.kd.sdk.module.Module & HRFormulaPlatformModule_S & HRFormulaPlatformModule$;
            interface HRFormulaPlatformModule extends HRFormulaPlatformModule_T {
            }
            interface FormulaParseService_S {
                /**
                 * �����ݿ��ѯ����selectItem���ʽ
                 *
                 * @param node:    �ڵ����
                 * @param calItem: ������Ŀ����
                 * @return kd.hr.hbp.business.service.formula.entity.expression.Expression
                 */
                getBaseDataOrStrExpression(node:kd.hr.hbp.business.service.formula.entity.node.OriginalNode,calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):kd.hr.hbp.business.service.formula.entity.expression.Expression;
                /**
                 * ȥԪ���ݻ����ȡö�����͵�selectItem����
                 *
                 * @param node:    �ڵ����
                 * @param calItem: ������Ŀ����
                 * @return kd.hr.hbp.business.service.formula.entity.expression.Expression
                 */
                getEnumOrStrExpression(node:kd.hr.hbp.business.service.formula.entity.node.OriginalNode,calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):kd.hr.hbp.business.service.formula.entity.expression.Expression;
            }
            interface FormulaParseService_C extends FormulaParseService_S {
                new():FormulaParseService;
            }
            interface FormulaParseService$ {
                /**
                 * ��ȡ���ʽ�ľ�������
                 *
                 * @param conditionExpression: ��ǰ�������ʽ
                 * @param nodes: �ڵ㼯��
                 * @param formula: ��ʽ����������
                 * @return java.util.List<kd.hr.hbp.business.service.formula.entity.expression.Expression>����ʽ����
                 */
                getExpression(conditionExpression:kd.hr.hbp.business.service.formula.entity.expression.ConditionExpression,nodes:$.java.util.List,formula:kd.hr.hbp.business.service.formula.entity.FormulaInfo):$.java.util.List;
                /**
                 * ������ʽ�������
                 *
                 * @param formula:   ��ʽҳ�涯̬����
                 * @param formulaId: ��ʽ��������
                 * @param view:      ��ǰҳ����ͼ����
                 * @return kd.hr.hbp.business.service.formula.entity.FormulaInfo
                 */
                parseFormula(formula:$.kd.bos.dataentity.entity.DynamicObject,formulaId:long,view:$.kd.bos.form.IFormView):kd.hr.hbp.business.service.formula.entity.FormulaInfo;
                /**
                 * ��ʽ����sdk
                 *
                 * @param formula:                ��ʽҳ�涯̬����
                 * @param formulaId:              ��ʽid
                 * @param bizAppNumber:           ��ʽ����Ӧ�ñ���
                 * @param treeNodeItems:          ������Ŀ����
                 * @param resultItems:            �����Ŀ����
                 * @param dataGradeItems:         �ּ����ݼ���
                 * @param isParseByUniqueCodeExp: �Ƿ����uniqueCodeeExp����
                 * @return kd.bos.dataentity.entity.DynamicObject
                 */
                parseFormulaDy(formula:$.kd.bos.dataentity.entity.DynamicObject,formulaId:long,bizAppNumber:string,treeNodeItems:$.java.util.List,resultItems:$.java.util.List,dataGradeItems:$.java.util.List,isParseByUniqueCodeExp:boolean):$.kd.bos.dataentity.entity.DynamicObject;
            }
            type FormulaParseService_T = FormulaParseService_S & FormulaParseService$;
            interface FormulaParseService extends FormulaParseService_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.cal.service{
            interface AbsHRMPCalcService_S {
            }
            type AbsHRMPCalcService_ST = IHRMPCalcService_S & AbsHRMPCalcService_S;
            interface AbsHRMPCalcService_C extends AbsHRMPCalcService_ST {
                new():AbsHRMPCalcService;
            }
            interface AbsHRMPCalcService$ {
                calc(paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO,paramIdList:$.java.util.List):$.java.util.Map;
            }
            type AbsHRMPCalcService_T = IHRMPCalcService & AbsHRMPCalcService_S & AbsHRMPCalcService$;
            interface AbsHRMPCalcService extends AbsHRMPCalcService_T {
            }
            interface IHRMPCalcService_S {
            }
            interface IHRMPCalcService$ {
                /**
                 * �������
                 *
                 * @param formulaParse       ��ʽ����ʵ����
                 * @param calProportionClass ռ�ȹ�ʽ����ʵ����
                 * @param paramVO            �������
                 * @param paramIdList        ����Id����
                 * @return java.util.Map<java.lang.String, CalResultDetailVO> <key:paramId,value:�������>
                 */
                calc(formulaParse:kd.hr.hbp.business.service.formula.cal.template.FormulaParse,calProportionClass:kd.hr.hbp.business.service.formula.cal.template.FormulaParse,paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO,paramIdList:$.java.util.List):$.java.util.Map;
                /**
                 * ���ն�̬���ɵļ�����
                 *
                 * @param formulaCode ���������
                 */
                clear(formulaCode:string):void;
                /**
                 * ���������࣬ҵ��ʵ��ʵ�ֿ�ѡ��
                 *
                 * @param className: ��ʽ�����Ʊ�ʶ
                 * @param paramVO:  �������ϣ�������ʽ����ͺ������鼯�ϣ�
                 * @return FormulaParse
                 * @throw
                 */
                createBizClassImpl(className:string,paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO):kd.hr.hbp.business.service.formula.cal.template.FormulaParse;
                /**
                 * ����ռ���࣬ҵ��ʵ��ʵ�ֿ�ѡ��
                 *
                 * @param className: ��ʽ�����Ʊ�ʶ
                 * @param paramVO:  �������ϣ�������ʽ����ͺ������鼯�ϣ�
                 * @return FormulaParse
                 * @throw
                 */
                createBizProportionClassImpl(className:string,paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO):kd.hr.hbp.business.service.formula.cal.template.FormulaParse;
                /**
                 * ��̬����������
                 *
                 * @param className:       ��ʽ�����Ʊ�ʶ
                 * @param formulaInfoList: ��ʽ���鼯��
                 * @param fcDetailList:    �������鼯��
                 * @return FormulaParse
                 * @throw
                 */
                createClassImpl(className:string,formulaInfoList:$.java.util.List,fcDetailList:$.java.util.List):kd.hr.hbp.business.service.formula.cal.template.FormulaParse;
                /**
                 * 3.����ȡ��
                 *
                 * @param paramVO ȡ���������
                 */
                getCalItemData(paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO):void;
                /**
                 * 4.ִ�м���
                 *
                 * @param formulaParse:       ��ʽ����ʵ�������
                 * @param calProportionClass: ռ�ȹ�ʽ����ʵ�������
                 * @param paramVO             ȡ���������
                 * @param paramIdList:        ����Id����
                 * @return CalResultDetailVO <����������>
                 */
                handleCal(formulaParse:kd.hr.hbp.business.service.formula.cal.template.FormulaParse,calProportionClass:kd.hr.hbp.business.service.formula.cal.template.FormulaParse,paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO,paramIdList:$.java.util.List):$.java.util.Map;
                /**
                 * 2.����ֶ�
                 *
                 * @param paramVO �ֶβ���
                 */
                handleCalProportion(paramVO:kd.hr.hbp.business.service.formula.cal.vo.CalAllParamVO):void;
            }
            type IHRMPCalcService_T = IHRMPCalcService_S & IHRMPCalcService$;
            interface IHRMPCalcService extends IHRMPCalcService_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.cal.template{
            interface FormulaParse_S {
            }
            type FormulaParse_ST = ParentFormulaParse_S & FormulaParse_S;
            interface FormulaParse_C extends FormulaParse_ST {
                new():FormulaParse;
            }
            interface FormulaParse$ {
                /**
                 * ���ȫ��������Ŀ�����ݵ�Map��
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addCustomCalItemValue(uniqueCode:string,value:any):void;
                /**
                 * ����Զ�����Ŀ�����ݵ���������Map��
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addOutputCustomCalItemValue(uniqueCode:string,value:any):void;
                /**
                 * ��Ӷ������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value
                 */
                addResultValue(uniqueCode:string,value:any):void;
                /**
                 * ����߼����͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addResultValue(uniqueCode:string,value:boolean):void;
                /**
                 * ����������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addResultValue(uniqueCode:string,value:number):void;
                /**
                 * ����������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addResultValue(uniqueCode:string,value:Date):void;
                /**
                 * ��Ӷ�̬���͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value
                 */
                addResultValue(uniqueCode:string,value:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * �����ֵ�������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                addResultValue(uniqueCode:string,value:$.java.math.BigDecimal):void;
                /**
                 * ����ı����͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value
                 */
                addResultValue(uniqueCode:string,value:string):void;
                /**
                 * �����ֵ�������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:any,sectionKey:string):void;
                /**
                 * ����߼����͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:boolean,sectionKey:string):void;
                /**
                 * ����������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:number,sectionKey:string):void;
                /**
                 * ��Ӷ�̬���͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:$.kd.bos.dataentity.entity.DynamicObject,sectionKey:string):void;
                /**
                 * �����ֵ�������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:$.java.math.BigDecimal,sectionKey:string):void;
                /**
                 * ����������͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:Date,sectionKey:string):void;
                /**
                 * ����ı����͵ļ�����Ŀֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 * @param sectionKey ��Ŀ�ֶ��ڼ�key
                 */
                addResultValue(uniqueCode:string,value:string,sectionKey:string):void;
                /**
                 * �ڼ������������ۼ�����ֵ
                 *
                 * @return void
                 * @throw
                 */
                calAddSumValueAfterAllCal():void;
                getAddSumMap():$.java.util.Map;
                getClassNameKey():string;
                getCustomCalItemMap():$.java.util.Map;
                /**
                 * ȡ֧����Ŀ��ȫ�ֱ�����֧����Ŀ��ֵ
                 *
                 * @param uniqueCode
                 * @return
                 */
                getCustomCalItemValue(uniqueCode:string):string;
                /**
                 * ȡ֧����Ŀ��ȫ�ֱ�����֧����Ŀ��ֵ��ת�ɶ�̬����
                 *
                 * @param uniqueCode
                 * @return
                 */
                getCustomCalItemValueAsDynamicObj(uniqueCode:string):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * �����ݷּ������л�ȡ��Ӧ�ķּ������ת����BigDecimal
                 *
                 * @param dataGradeUniqueCode: ���ݷּ�����Ψһ����
                 * @param resultKey:           ���ݷּ���ȡ�Ľ��key
                 * @param params:              ���ݷּ��������
                 * @return java.math.BigDecimal
                 */
                getDataGradeResultToBigDecimal(dataGradeUniqueCode:string,resultKey:string,...params:any[]):$.java.math.BigDecimal;
                /**
                 * �����ݷּ������л�ȡ��Ӧ�ķּ������ת��������
                 *
                 * @param dataGradeUniqueCode: ���ݷּ�����Ψһ����
                 * @param resultKey:           ���ݷּ���ȡ�Ľ��key
                 * @param params:              ���ݷּ��������
                 * @return java.util.Date
                 */
                getDataGradeResultToDate(dataGradeUniqueCode:string,resultKey:string,...params:any[]):Date;
                /**
                 * �����ݷּ������л�ȡ��Ӧ�ķּ������ת���ɶ�̬����
                 *
                 * @param dataGradeUniqueCode: ���ݷּ�����Ψһ����
                 * @param resultKey:           ���ݷּ���ȡ�Ľ��key
                 * @param params:              ���ݷּ��������
                 * @return kd.bos.dataentity.entity.DynamicObject
                 */
                getDataGradeResultToDynamicObject(dataGradeUniqueCode:string,resultKey:string,...params:any[]):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * �����ݷּ������л�ȡ��Ӧ�ķּ������ת��������
                 *
                 * @param dataGradeUniqueCode: ���ݷּ�����Ψһ����
                 * @param resultKey:           ���ݷּ���ȡ�Ľ��key
                 * @param params:              ���ݷּ��������
                 * @return java.lang.Integer
                 */
                getDataGradeResultToInteger(dataGradeUniqueCode:string,resultKey:string,...params:any[]):number;
                /**
                 * �����ݷּ������л�ȡ��Ӧ�ķּ������ת�����ַ���
                 *
                 * @param dataGradeUniqueCode: ���ݷּ�����Ψһ����
                 * @param resultKey:           ���ݷּ���ȡ�Ľ��key
                 * @param params:              ���ݷּ��������
                 * @return java.lang.String
                 */
                getDataGradeResultToString(dataGradeUniqueCode:string,resultKey:string,...params:any[]):string;
                getDynamicObjectByEntityNumberAndId(entityNumber:string,id:any):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ��ֵ���͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsBigDecimal(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):$.java.math.BigDecimal;
                /**
                 * ��ȡ�����������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.math.BigDecimal[]
                 * @throw
                 */
                getFieldValueAsBigDecimalArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):$.java.math.BigDecimal[];
                /**
                 * ��ȡ�߼����͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsBoolean(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):boolean;
                /**
                 * ��ȡ�߼����͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.lang.Boolean[]
                 * @throw
                 */
                getFieldValueAsBooleanArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):boolean[];
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsDate(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):Date;
                /**
                 * ��ȡ�����������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsDateArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):Date[];
                /**
                 * �Ӳ����л�ȡ��̬�������͵Ĳ�����ת��Ϊ��̬���󷵻�
                 *
                 * @param uniqueCode:        ������ĿΨһ����
                 * @param sectionKey:        �ֶ�Key
                 * @param calItemUniqueCode: ��������ĿΨһ����
                 * @return kd.bos.dataentity.entity.DynamicObject
                 */
                getFieldValueAsDynamicObject(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsInteger(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):number;
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.lang.Integer[]
                 * @throw
                 */
                getFieldValueAsIntegerArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):number[];
                /**
                 * ��ȡObject���͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.lang.Object
                 */
                getFieldValueAsObject(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):any;
                /**
                 * ��ȡ�ַ��������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.lang.String[]
                 * @throw
                 */
                getFieldValueAsObjectArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):any[];
                /**
                 * ��ȡ�ַ����͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey        ��������key
                 * @param calItemUniqueCode ������ĿΨһ����
                 * @return
                 */
                getFieldValueAsString(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):string;
                /**
                 * ��ȡ�ַ��������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode:        ��ʽ������Ŀ�ֶ�Ψһ����
                 * @param sectionKey:        ��������key
                 * @param calItemUniqueCode: ������ĿΨһ����
                 * @return java.lang.String[]
                 * @throw
                 */
                getFieldValueAsStringArray(uniqueCode:string,sectionKey:string,calItemUniqueCode:string):string[];
                /**
                 * ��ȡ��ǰ��Ŀ�ֶζ���
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getItemSectionList(uniqueCode:string):$.java.util.List;
                getItemSectionMap():$.java.util.Map;
                getItemSectionResultMap():$.java.util.Map;
                getOutputCustomCalItemValueMap():$.java.util.Map;
                getProportionMap():$.java.util.Map;
                getSectionParamMap():$.java.util.Map;
                getSectionPriorResultMap():$.java.util.Map;
                getUniqueCodeCalItemMap():$.java.util.Map;
                isCalProportion():boolean;
                isSection():boolean;
                setAddSumMap(addSumMap:$.java.util.Map):void;
                setCalProportion(isCalProration:boolean):void;
                setClassNameKey(classNameKey:string):void;
                setCustomCalItemMap(customCalItemMap:$.java.util.Map):void;
                setDataGradeMap(dataGradeMap:$.java.util.Map):void;
                setItemSectionMap(itemSectionMap:$.java.util.Map):void;
                setItemSectionResultMap(itemSectionResultMap:$.java.util.Map):void;
                setOutputCustomCalItemValueMap(outputCustomCalItemValueMap:$.java.util.Map):void;
                setProportionMap(proportionMap:$.java.util.Map):void;
                setSection(isSection:boolean):void;
                setSectionParamMap(sectionParamMap:$.java.util.Map):void;
                setSectionPriorResultMap(sectionPriorResultMap:$.java.util.Map):void;
                setUniqueCodeCalItemMap(uniqueCodeCalItemMap:$.java.util.Map):void;
                /**
                 * ������Ŀ�ֶν��ֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 */
                sumItemResultValue(uniqueCode:string):void;
                /**
                 * ���¼�����Ŀ��ֵ
                 *
                 * @param uniqueCode ������ĿΨһ����
                 * @param value      ��Ŀֵ
                 */
                updateCalItemValue(uniqueCode:string,value:any):void;
                /**
                 * ���¼�����Ŀ��ֵ
                 *
                 * @param uniqueCode        ������ĿΨһ����
                 * @param value             ��Ŀֵ
                 * @param sectionKey        ��Ŀ�ֶ��ڼ�key
                 * @param calItemUniqueCode �����ĿΨһ����
                 */
                updateCalItemValue(uniqueCode:string,value:any,sectionKey:string,calItemUniqueCode:string):void;
            }
            type FormulaParse_T = ParentFormulaParse & FormulaParse_S & FormulaParse$;
            interface FormulaParse extends FormulaParse_T {
            }
            interface ParentFormulaParse_S {
            }
            type ParentFormulaParse_ST = kd.hr.hbp.business.function_.HRDefineFunction_S & ParentFormulaParse_S;
            interface ParentFormulaParse_C extends ParentFormulaParse_ST {
                new():ParentFormulaParse;
            }
            interface ParentFormulaParse$ {
                /**
                 * ������ڣ�������д�˷���
                 */
                calculate():void;
                /**
                 * ��ȡ��ֵ���͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsBigDecimal(uniqueCode:string):$.java.math.BigDecimal;
                /**
                 * ��ȡ��ֵ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.math.BigDecimal[]
                 * @throw
                 */
                getFieldValueAsBigDecimalArray(uniqueCode:string):$.java.math.BigDecimal[];
                /**
                 * ��ȡ�߼����͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsBoolean(uniqueCode:string):boolean;
                /**
                 * ��ȡ�߼��������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.lang.Boolean[]
                 * @throw
                 */
                getFieldValueAsBooleanArray(uniqueCode:string):boolean[];
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsDate(uniqueCode:string):Date;
                /**
                 * ��ȡ�����������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.util.Date[]
                 * @throw
                 */
                getFieldValueAsDateArray(uniqueCode:string):Date[];
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsDynamicObject(uniqueCode:string):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsInteger(uniqueCode:string):number;
                /**
                 * ��ȡ�����������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.lang.Integer[]
                 * @throw
                 */
                getFieldValueAsIntegerArray(uniqueCode:string):number[];
                /**
                 * ��ȡObject���͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.lang.Object
                 */
                getFieldValueAsObject(uniqueCode:string):any;
                /**
                 * ��ȡ�����������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.lang.String[]
                 * @throw
                 */
                getFieldValueAsObjectArray(uniqueCode:string):any[];
                /**
                 * ��ȡ�ַ����͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return
                 */
                getFieldValueAsString(uniqueCode:string):string;
                /**
                 * ��ȡ�ַ��������͹�ʽ������Ŀ�ֶ�ֵ
                 *
                 * @param uniqueCode: ��ʽ������Ŀ�ֶ�Ψһ����
                 * @return java.lang.String[]
                 * @throw
                 */
                getFieldValueAsStringArray(uniqueCode:string):string[];
                getLoopLimit():number;
                getParams():$.java.util.Map;
                getResultLog():$.java.util.Map;
                getResultMap():$.java.util.Map;
                /**
                 * ��ȡ��ֵ�������͵���Ŀֵ
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getResultValueAsBigDecimal(uniqueCode:string):$.java.math.BigDecimal;
                /**
                 * ��ȡ�߼����͵���Ŀֵ
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getResultValueAsBoolean(uniqueCode:string):boolean;
                /**
                 * ��ȡ�������͵���Ŀֵ
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getResultValueAsDate(uniqueCode:string):Date;
                /**
                 * ��ȡ�������͵���Ŀֵ
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getResultValueAsInteger(uniqueCode:string):number;
                /**
                 * ��ȡ�ı����͵���Ŀֵ
                 *
                 * @param uniqueCode ��ĿΨһ����
                 * @return
                 */
                getResultValueAsString(uniqueCode:string):string;
                isOpenLog():boolean;
                /**
                 * ��¼������־
                 *
                 * formulaLog:��ʽ������־����
                 */
                logResult(formulaLog:FormulaLog):void;
                setLoopLimit(loopLimit:number):void;
                setOpenLog(openLog:boolean):void;
                setParams(params:$.java.util.Map):void;
                setResultLog(resultLog:$.java.util.Map):void;
                setResultMap(resultMap:$.java.util.Map):void;
                throwLoopException():void;
            }
            type ParentFormulaParse_T = kd.hr.hbp.business.function_.HRDefineFunction & ParentFormulaParse_S & ParentFormulaParse$;
            interface ParentFormulaParse extends ParentFormulaParse_T {
            }
            interface FormulaLog_S {
            }
            type FormulaLog_ST = $.java.io.Serializable & FormulaLog_S;
            interface FormulaLog_C extends FormulaLog_ST {
                new(id:string,name:string,param:string,result:string,msg:string):FormulaLog;
                new(id:string,name:string,param:string,result:string,msg:string,exception:$.java.lang.Exception):FormulaLog;
            }
            interface FormulaLog$ {
                getException():$.java.lang.Exception;
                getId():string;
                getMsg():string;
                getName():string;
                getParam():string;
                getResult():string;
                getTraceInfo():string;
                setException(exception:$.java.lang.Exception):void;
                setId(id:string):void;
                setMsg(msg:string):void;
                setName(name:string):void;
                setParam(param:string):void;
                setResult(result:string):void;
                setTraceInfo(traceInfo:string):void;
            }
            type FormulaLog_T = $.java.io.Serializable & FormulaLog_S & FormulaLog$;
            interface FormulaLog extends FormulaLog_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.cal.vo{
            interface CalAllParamVO_S {
            }
            type CalAllParamVO_ST = $.java.io.Serializable & CalAllParamVO_S;
            interface CalAllParamVO_C extends CalAllParamVO_ST {
                new():CalAllParamVO;
            }
            interface CalAllParamVO$ {
                getCalParamIdRelationMap():$.java.util.Map;
                getCalParamMap():$.java.util.Map;
                getCustomCalItemMap():$.java.util.Map;
                getDataGradeVOMap():$.java.util.Map;
                getFormulaVOList():$.java.util.List;
                getFunctionVOList():$.java.util.List;
                getItemSectionMap():$.java.util.Map;
                getItemSectionProportionRuleMap():$.java.util.Map;
                getLoopLimit():number;
                getParamIdAddSumMap():$.java.util.Map;
                getParamIdToConvertSectionMap():$.java.util.Map;
                getParamIdToParamMap():$.java.util.Map;
                getParamIdToSectionParamMap():$.java.util.Map;
                getProportionFormulaVOList():$.java.util.List;
                getSectionPriorResultMap():$.java.util.Map;
                getTraceId():string;
                getUniqueCodeCalItemMap():$.java.util.Map;
                isOpenLog():boolean;
                setCalParamIdRelationMap(calParamIdRelationMap:$.java.util.Map):void;
                setCalParamMap(calParamMap:$.java.util.Map):void;
                setCustomCalItemMap(customCalItemMap:$.java.util.Map):void;
                setDataGradeVOMap(dataGradeVOMap:$.java.util.Map):void;
                setFormulaVOList(formulaVOList:$.java.util.List):void;
                setFunctionVOList(functionVOList:$.java.util.List):void;
                setItemSectionMap(itemSectionMap:$.java.util.Map):void;
                setItemSectionProportionRuleMap(itemSectionProportionRuleMap:$.java.util.Map):void;
                setLoopLimit(loopLimit:number):void;
                setOpenLog(openLog:boolean):void;
                setParamIdAddSumMap(paramIdAddSumMap:$.java.util.Map):void;
                setParamIdToConvertSectionMap(paramIdToConvertSectionMap:$.java.util.Map):void;
                setParamIdToParamMap(paramIdToParamMap:$.java.util.Map):void;
                setParamIdToSectionParamMap(paramIdToSectionParamMap:$.java.util.Map):void;
                setProportionFormulaVOList(proportionFormulaVOList:$.java.util.List):void;
                setSectionPriorResultMap(sectionPriorResultMap:$.java.util.Map):void;
                setTraceId(traceId:string):void;
                setUniqueCodeCalItemMap(uniqueCodeCalItemMap:$.java.util.Map):void;
            }
            type CalAllParamVO_T = $.java.io.Serializable & CalAllParamVO_S & CalAllParamVO$;
            interface CalAllParamVO extends CalAllParamVO_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.entity{
            interface FormulaInfo_S {
            }
            type FormulaInfo_ST = $.java.io.Serializable & FormulaInfo_S;
            interface FormulaInfo_C extends FormulaInfo_ST {
                new():FormulaInfo;
            }
            interface FormulaInfo$ {
                /**
                 * ��ӹ�ʽ�����Ļ�������Ψһ����
                 *
                 * @param uniqueCode: Ψһ����
                 * @return void
                 */
                addBaseDataUniqueCodeSet(uniqueCode:string):void;
                /**
                 * ��ӵ�ǰnode���Զ��������Ŀӳ��map��
                 *
                 * @param calItem: �Զ��������Ŀ����
                 * @return void
                 */
                addCalCustomItemInfoToMap(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * ����Զ��������ĿΨһ����
                 *
                 * @param uniqueCode: Ψһ����
                 * @return void
                 */
                addCalCustomUniqueCode(uniqueCode:string):void;
                /**
                 * ������ݷּ������ļ�����Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addCalDependForDataGrade(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * ��Ӻ��������ļ�����Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addCalDependForFunc(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * ��ӱ����¸�ֵ�ļ�����Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addCalItemValueChange(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * ������ݷּ�Ψһ����
                 *
                 * @param uniqueCode: Ψһ����
                 * @return void
                 */
                addDataGradeUniqueCode(uniqueCode:string):void;
                /**
                 * ��������ļ�����Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addDependCalItem(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * ��ӹ�ʽ������ö��Ψһ����
                 *
                 * @param uniqueCode: Ψһ����
                 * @return void
                 */
                addEnumUniqueCodeSet(uniqueCode:string):void;
                /**
                 * ��Ӻ���Ψһ����
                 *
                 * @param uniqueCode: Ψһ����
                 * @return void
                 */
                addFcUniqueCode(uniqueCode:string):void;
                addKey(key:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):void;
                addOriginalKey(originalKey:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):void;
                /**
                 * �����Ҫ����ļ�����Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addOutputCalItem(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                /**
                 * �����Ҫ������Զ��������Ŀ
                 *
                 * @param calItem: ������Ŀ
                 * @return void
                 */
                addOutputCustomCalItem(calItem:kd.hr.hbp.business.service.formula.entity.item.CalItem):void;
                addResultCount():void;
                /**
                 * �����ʱ������mapӳ����
                 *
                 * @param tempVariable: ��ʱ����
                 * @param node:         �ڵ�
                 * @return void
                 */
                addTempVariable(tempVariable:string,node:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):void;
                getBaseDataUniqueCodeSet():$.java.util.Set;
                getCalCustomItemMap():$.java.util.Map;
                getCalCustomUniqueCodeSet():$.java.util.Set;
                getCalForDataGradeUniqueCodeKeyMap():$.java.util.Map;
                getCalForFuncUniqueCodeKeyMap():$.java.util.Map;
                getCalItemMap():$.java.util.Map;
                getCalItemValueChangeMap():$.java.util.Map;
                getCalUniqueCodeKeyMap():$.java.util.Map;
                getDataGradeMap():$.java.util.Map;
                getDataGradeUniqueCodeSet():$.java.util.Set;
                getEntityNumberBaseDataCalItemMap():$.java.util.Map;
                getEnumUniqueCodeSet():$.java.util.Set;
                getEnumValueToCalItemMap():$.java.util.Map;
                getExecuteCode():string;
                getFcMap():$.java.util.Map;
                getFcUniqueCodeSet():$.java.util.Set;
                getId():string;
                getItemCategorySet():$.java.util.Set;
                getKeys():$.java.util.List;
                getLines():string[];
                getLocaleCodes():$.java.util.Map;
                getName():string;
                getOriginalCode():string;
                getOriginalKeys():$.java.util.List;
                getOriginalLines():string[];
                getOriginalNodes():$.java.util.List;
                getOutputCalItemMap():$.java.util.Map;
                getOutputCustomCalItemMap():$.java.util.Map;
                getResultCount():number;
                getResultItem():kd.hr.hbp.business.service.formula.entity.item.ResultItem;
                getResultItemMap():$.java.util.Map;
                getResultItemPropertyName():string;
                getTempVariableMap():$.java.util.Map;
                getUniqueKeyCode():string;
                isProrateItemFormula():boolean;
                setBaseDataUniqueCodeSet(baseDataUniqueCodeSet:$.java.util.Set):void;
                setCalCustomUniqueCodeSet(calCustomUniqueCodeSet:$.java.util.Set):void;
                setCalItemMap(calItemMap:$.java.util.Map):void;
                setDataGradeMap(dataGradeMap:$.java.util.Map):void;
                setEntityNumberBaseDataCalItemMap(entityNumberBaseDataCalItemMap:$.java.util.Map):void;
                setEnumUniqueCodeSet(enumUniqueCodeSet:$.java.util.Set):void;
                setEnumValueToCalItemMap(enumValueToCalItemMap:$.java.util.Map):void;
                setExecuteCode(executeCode:string):void;
                setFcMap(fcMap:$.java.util.Map):void;
                setId(id:string):void;
                setItemCategorySet(itemCategorySet:$.java.util.Set):void;
                setKeys(keys:$.java.util.List):void;
                setLines(lines:string[]):void;
                setLocaleCodes(localeCodes:$.java.util.Map):void;
                setName(name:string):void;
                setOriginalCode(originalCode:string):void;
                setOriginalKeys(originalKeys:$.java.util.List):void;
                setOriginalLines(originalLines:string[]):void;
                setOriginalNodes(originalNodes:$.java.util.List):void;
                setProrateItemFormula(isProrateItemFormula:boolean):void;
                setResultItem(resultItem:kd.hr.hbp.business.service.formula.entity.item.ResultItem):void;
                setResultItemMap(resultItemMap:$.java.util.Map):void;
                setResultItemPropertyName(resultItemPropertyName:string):void;
                setTempVariableMap(tempVariableMap:$.java.util.Map):void;
                setUniqueKeyCode(uniqueKeyCode:string):void;
            }
            type FormulaInfo_T = $.java.io.Serializable & FormulaInfo_S & FormulaInfo$;
            interface FormulaInfo extends FormulaInfo_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.entity.expression{
            interface Expression_S {
            }
            type Expression_ST = $.java.io.Serializable & Expression_S;
            interface Expression_C extends Expression_ST {
                new():Expression;
            }
            interface Expression$ {
                getNode():kd.hr.hbp.business.service.formula.entity.node.OriginalNode;
                getType():kd.hr.hbp.business.service.formula.enums.ExpressionNodeTypeEnum;
                setNode(node:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):void;
                setType(type_arg:kd.hr.hbp.business.service.formula.enums.ExpressionNodeTypeEnum):void;
            }
            type Expression_T = $.java.io.Serializable & Expression_S & Expression$;
            interface Expression extends Expression_T {
            }
            interface ConditionExpression_S {
            }
            type ConditionExpression_ST = Expression_S & ConditionExpression_S;
            interface ConditionExpression_C extends ConditionExpression_ST {
                new(condition:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):ConditionExpression;
            }
            interface ConditionExpression$ {
                addExpression(expression:kd.hr.hbp.business.service.formula.entity.node.OriginalNode):void;
                getChildConditionExpressions():$.java.util.List;
                getConditionEnum():kd.hr.hbp.business.service.formula.enums.ConditionEnum;
                getExpressions():$.java.util.List;
                getIsResult():boolean;
                setChildConditionExpressions(childConditionExpressions:$.java.util.List):void;
                setConditionEnum(conditionEnum:kd.hr.hbp.business.service.formula.enums.ConditionEnum):void;
                setExpressionNodes(expressions:$.java.util.List):void;
                setIsResult(isResult:boolean):void;
            }
            type ConditionExpression_T = Expression & ConditionExpression_S & ConditionExpression$;
            interface ConditionExpression extends ConditionExpression_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.entity.item{
            interface Item_S {
            }
            type Item_ST = $.java.io.Serializable & Item_S;
            interface Item_C extends Item_ST {
                new():Item;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param name:         ����
                 * @param uniqueCode:   uniqueCode
                 */
                new(itemCategory:string,id:string,name:string,uniqueCode:string):Item;
            }
            interface Item$ {
                getId():string;
                getItemCategory():string;
                getName():string;
                getUniqueCode():string;
                isCheckUniqueCode():boolean;
                setCheckUniqueCode(checkUniqueCode:boolean):void;
                setId(id:string):void;
                setItemCategory(itemCategory:string):void;
                setName(name:string):void;
                setUniqueCode(uniqueCode:string):void;
            }
            type Item_T = $.java.io.Serializable & Item_S & Item$;
            interface Item extends Item_T {
            }
            interface TreeNodeItem_S {
            }
            type TreeNodeItem_ST = Item_S & TreeNodeItem_S;
            interface TreeNodeItem_C extends TreeNodeItem_ST {
                new():TreeNodeItem;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param parentId:     ��id
                 * @param name:         ����
                 */
                new(itemCategory:string,id:string,parentId:string,name:string):TreeNodeItem;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param parentId:     ��id
                 * @param name:         ����
                 * @param uniqueCode:   uniqueCode
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,uniqueCode:string):TreeNodeItem;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param parentId:     ��id
                 * @param name:         ����
                 * @param hasChild:     �Ƿ����ӽڵ�
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,hasChild:boolean):TreeNodeItem;
            }
            interface TreeNodeItem$ {
                getParentId():string;
                getParentName():string;
                isExpand():boolean;
                isHasChild():boolean;
                isShow():boolean;
                setExpand(expand:boolean):void;
                setHasChild(hasChild:boolean):void;
                setParentId(parentId:string):void;
                setParentName(parentName:string):void;
                setShow(show:boolean):void;
            }
            type TreeNodeItem_T = Item & TreeNodeItem_S & TreeNodeItem$;
            interface TreeNodeItem extends TreeNodeItem_T {
            }
            interface ResultItem_S {
                /**
                 * �жϽ��item���������Ƿ�Ϊ��
                 *
                 * @param resultItem: ���item
                 * @return void
                 */
                checkValueIsNull(resultItem:ResultItem,resultItemPropertyName:string):void;
                /**
                 * �����itemת��Ϊ��̬����
                 *
                 * @param resultItem: ���item
                 * @param type:       ��̬��������
                 * @return kd.bos.dataentity.entity.DynamicObject
                 */
                getDyByResultItem(resultItem:ResultItem,type_arg:$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType):$.kd.bos.dataentity.entity.DynamicObject;
            }
            type ResultItem_ST = CalItem_S & ResultItem_S;
            interface ResultItem_C extends ResultItem_ST {
                new():ResultItem;
            }
            interface ResultItem$ {
                getDataLength():number;
                getScale():number;
                isCalProportionItem():boolean;
                setCalProportionItem(calProportionItem:boolean):void;
                setDataLength(dataLength:number):void;
                setScale(scale:number):void;
            }
            type ResultItem_T = CalItem & ResultItem_S & ResultItem$;
            interface ResultItem extends ResultItem_T {
            }
            interface CalItem_S {
            }
            type CalItem_ST = TreeNodeItem_S & CalItem_S;
            interface CalItem_C extends CalItem_ST {
                new():CalItem;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param parentId:     ��id
                 * @param name:         ����
                 * @param uniqueCode:   uniqueCode
                 * @param dataType:     ��������ö��
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,uniqueCode:string,dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum):CalItem;
                /**
                 * @param itemCategory: itemCategory
                 * @param id:           id
                 * @param parentId:     ��id
                 * @param name:         ����
                 * @param uniqueCode:   uniqueCode
                 * @param dataType:     ��������ö��
                 * @param isCustomItem: �Ƿ��Զ��������Ŀ
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,uniqueCode:string,dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum,isCustomItem:boolean):CalItem;
                /**
                 * @param itemCategory:   itemCategory
                 * @param id:             id
                 * @param parentId:       ��id
                 * @param name:           ����
                 * @param uniqueCode:     uniqueCode
                 * @param isCustomItem:   �Ƿ��Զ��������Ŀ
                 * @param isGlobalEffect: ������Զ��������Ŀ,����Ŀ�Ƿ�ȫ����Ч
                 * @param dataType:       ��������ö��
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,uniqueCode:string,isCustomItem:boolean,isGlobalEffect:boolean,dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum):CalItem;
                /**
                 * @param itemCategory:   itemCategory
                 * @param id:             id
                 * @param parentId:       ��id
                 * @param name:           ����
                 * @param uniqueCode:     uniqueCode
                 * @param dataType:       ��������ö��
                 * @param isCustomItem:   �Ƿ��Զ��������Ŀ
                 * @param isGlobalEffect: ������Զ��������Ŀ,����Ŀ�Ƿ�ȫ����Ч
                 */
                new(itemCategory:string,id:string,parentId:string,name:string,uniqueCode:string,dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum,isCustomItem:boolean,isGlobalEffect:boolean):CalItem;
            }
            interface CalItem$ {
                getDataType():kd.hr.hbp.business.service.formula.enums.DataTypeEnum;
                getEntityNumber():string;
                getItemType():kd.hr.hbp.business.service.formula.enums.CalItemTypeEnum;
                getOrders():string;
                getPropertyField():string;
                getSerializeQFilters():$.java.util.List;
                getqFilters():$.kd.bos.orm.query.QFilter[];
                isCanAssignment():boolean;
                isCheckHourMinSec():boolean;
                isCustomItem():boolean;
                isGlobalEffect():boolean;
                setCanAssignment(canAssignment:boolean):void;
                setCheckHourMinSec(checkHourMinSec:boolean):void;
                setCustomItem(customItem:boolean):void;
                setDataType(dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum):void;
                setEntityNumber(entityNumber:string):void;
                setGlobalEffect(globalEffect:boolean):void;
                setItemType(itemType:kd.hr.hbp.business.service.formula.enums.CalItemTypeEnum):void;
                setOrders(orders:string):void;
                setPropertyField(propertyField:string):void;
                setSerializeQFilters(serializeQFilters:$.java.util.List):void;
                setqFilters(qFilters:$.kd.bos.orm.query.QFilter[]):void;
            }
            type CalItem_T = TreeNodeItem & CalItem_S & CalItem$;
            interface CalItem extends CalItem_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.entity.node{
            interface OriginalNode_S {
            }
            type OriginalNode_ST = $.java.lang.Comparable & OriginalNode_S;
            interface OriginalNode_C extends OriginalNode_ST {
                new():OriginalNode;
            }
            interface OriginalNode$ {
                compareTo(o:OriginalNode):number;
                getDataType():kd.hr.hbp.business.service.formula.enums.DataTypeEnum;
                getEndColumnIndex():number;
                getKeyType():kd.hr.hbp.business.service.formula.enums.ExpressionNodeTypeEnum;
                getLineIndex():number;
                getNodeText():string;
                getStartColumnIndex():number;
                getUniqueKey():string;
                isAnnotation():boolean;
                setAnnotation(annotation:boolean):void;
                setDataType(dataType:kd.hr.hbp.business.service.formula.enums.DataTypeEnum):void;
                setEndColumnIndex(endColumnIndex:number):void;
                setKeyType(keyType:kd.hr.hbp.business.service.formula.enums.ExpressionNodeTypeEnum):void;
                setLineIndex(lineIndex:number):void;
                setNodeText(nodeText:string):void;
                setStartColumnIndex(startColumnIndex:number):void;
                setUniqueKey(uniqueKey:string):void;
            }
            type OriginalNode_T = $.java.lang.Comparable & OriginalNode_S & OriginalNode$;
            interface OriginalNode extends OriginalNode_T {
            }
        }
        namespace kd.hr.hbp.business.service.formula.enums{
            enum DataTypeEnum {
                OBJECT,
                NUM,
                TEXT,
                BOOLEAN,
                INT,
                DATE,
                MONEY,
                ARRAY_NUM,
                ARRAY_STRING,
                ARRAY_BOOLEAN,
                ARRAY_INT,
                ARRAY_DATE,
                ARRAY_OBJECT,
                BASE,
                NULL,
                DATETIME
            }
            enum ExpressionNodeTypeEnum {
                CONDITION,
                FUN,
                STR,
                NUM,
                INT,
                ITEM,
                OPERATOR,
                CAL,
                ANNO,
                RESULT,
                BOOLEAN,
                ASS,
                ARRAY_INDEX,
                INVOKE_METHOD,
                ARRAY_INT,
                ARRAY_NUM,
                DATE,
                DATETIME,
                ARRAY_DATE,
                DATA_GRADE,
                DATA_GRADE_RESULT,
                SELECT_ITEM,
                NULL,
                EXIT,
                EXPORT
            }
            enum CalItemTypeEnum {
                BASIC,
                BASE_DATA,
                ENUM
            }
            enum ConditionEnum {
                IF,
                WHILE,
                THEN,
                ELSEIF,
                ELSE,
                ENDIF,
                END_WHILE
            }
        }
        namespace kd.hr.hbp.business.service.message{
            interface IHRMsgTplService_S {
            }
            interface IHRMsgTplService$ {
                /**
                 * �����߱���������Ϣ��api�ӿ�
                 *
                 * @param tplDy: Ĭ����hbpģ��hbp_msgcenterinputtpl�Ķ�̬����
                 */
                consumerSaveMsg(tplDy:$.kd.bos.dataentity.entity.DynamicObject):kd.hr.hbp.common.mservice.HRMServiceResult;
            }
            type IHRMsgTplService_T = IHRMsgTplService_S & IHRMsgTplService$;
            interface IHRMsgTplService extends IHRMsgTplService_T {
            }
        }
        namespace kd.hr.hbp.business.service.perm.dyna.condhandler{
            interface IDynaCondParser_S {
            }
            interface IDynaCondParser$ {
                parseDynaCond(propType:string,userId:long,customParam:$.java.util.Map):$.java.util.List;
            }
            type IDynaCondParser_T = IDynaCondParser_S & IDynaCondParser$;
            interface IDynaCondParser extends IDynaCondParser_T {
            }
        }
        namespace kd.hr.hbp.business.service.smartsearch{
            interface HRSmartSearchService_S {
                /**
                 * �������ݣ�����ǰ10000�����ݣ�
                 *
                 * @param searchParam �����������
                 * @return �������
                 */
                search(searchParam:kd.hr.hbp.common.model.smartsearch.search.SearchParam):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �������ݣ�����ǰ10000�����ݣ�
                 *
                 * @param searchParam �����������
                 * @param searchField �����ֶα�������
                 * @param qFilters    ��ȷ��������
                 * @return �������
                 */
                search(searchParam:kd.hr.hbp.common.model.smartsearch.search.SearchParam,searchField:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[]):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �������ݣ���෵��10000�����ݣ�
                 *
                 * @param searchParam �����������
                 * @param qFilters    ��ȷ��������
                 * @param searchField �����ֶα�������
                 * @param start       ��ʼ��ѯ�±�
                 * @param limit       ��ѯ������������෵��10000�����ݣ�
                 * @return �������
                 */
                search(searchParam:kd.hr.hbp.common.model.smartsearch.search.SearchParam,searchField:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],start:number,limit:number):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �������ݣ���෵��10000�����ݣ�
                 *
                 * @param searchParam      �����������
                 * @param qFilters         ��ȷ��������
                 * @param searchField      �����ֶα�������
                 * @param highLightPreTag  ��������ǩ(ʾ����"<p class='highLignt' style='color: var(--theme-color);display: inline'>")
                 * @param highLightPostTag �����ձ�ǩ��ʾ����"</p>"��
                 * @param start            ��ʼ��ѯ�±�
                 * @param limit            ��ѯ������������෵��10000�����ݣ�
                 * @return �������
                 */
                search(searchParam:kd.hr.hbp.common.model.smartsearch.search.SearchParam,searchField:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],highLightPreTag:string,highLightPostTag:string,start:number,limit:number):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �������ݣ���෵��10000�����ݣ�
                 *
                 * @param searchParam      �����������
                 * @param qFilters         ��ȷ��������
                 * @param searchField      �����ֶα�������
                 * @param highLightPreTag  ��������ǩ(ʾ����"<p class="highLignt" style="color: var(--theme-color);display: inline">)
                 * @param highLightPostTag �����ձ�ǩ��ʾ����"</p>"��
                 * @param objSortValues    �����ֶ�
                 * @param limit            ��ѯ������������෵��10000�����ݣ�
                 * @return �������
                 */
                searchAfter(searchParam:kd.hr.hbp.common.model.smartsearch.search.SearchParam,searchField:$.java.util.List,qFilters:$.kd.bos.orm.query.QFilter[],highLightPreTag:string,highLightPostTag:string,objSortValues:any[],limit:number):kd.hr.hbp.common.api.HrApiResponse;
            }
            interface HRSmartSearchService_C extends HRSmartSearchService_S {
                new():HRSmartSearchService;
            }
            interface HRSmartSearchService$ {
            }
            type HRSmartSearchService_T = HRSmartSearchService_S & HRSmartSearchService$;
            interface HRSmartSearchService extends HRSmartSearchService_T {
            }
            interface SearchSceneService_S {
                /**
                 * ������������ID���ֶα�����ȡ��ȨQFilter
                 *
                 * @param sceneId            ����ID
                 * @param fieldAlias         �ֶα���
                 * @param searchEntityNumber ����ҳ����루HR��̨ע���������̬ҳ�棩
                 * @return ��ȨQFilter
                 */
                getPermQFilters(sceneId:long,fieldAlias:string,searchEntityNumber:string):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ������������ID���ֶα�����ȡ��ȨQFilter
                 *
                 * @param sceneId            ����ID
                 * @param fieldAlias         �ֶα���
                 * @param searchEntityNumber ����ҳ����루HR��̨ע���������̬ҳ�棩
                 * @param appNumber          Ȩ�޿���Ӧ�ñ��루Ϊnullʱ��searchEntityNumber����Ӧ�ÿ�Ȩ��
                 * @return ��ȨQFilter
                 */
                getPermQFilters(sceneId:long,fieldAlias:string,searchEntityNumber:string,appNumber:string):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * �������������ȡ��������������ģ�ͱ�ǩ�ֶ���Ϣ
                 *
                 * @param searchObjId ��������ID
                 * @return ����ģ�ͱ�ǩ�ֶ���Ϣ
                 */
                queryAllLabelFields(searchObjId:long):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��������������ѯ����������Ϣ
                 * (���س������ã���׼������Ŀ�����ι��������������ֶε�)
                 *
                 * @param sceneId ��������ID
                 * @return ��������
                 * @see kd.hr.hbp.common.model.smartsearch.scene.SearchSceneBo
                 */
                querySearchScene(sceneId:long):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��������ҳ������ѯ����������Ϣ
                 * (���س������ã���׼������Ŀ�����ι��������������ֶε�)
                 *
                 * @param searchEntityNumber ����ҳ����루HR��̨ע���������̬ҳ�棩
                 * @return ��������
                 * @see kd.hr.hbp.common.model.smartsearch.scene.SearchSceneBo
                 */
                querySearchScene(searchEntityNumber:string):kd.hr.hbp.common.api.HrApiResponse;
                /**
                 * ��������ҳ������ѯ����������Ϣ
                 * (���س������ã���׼������Ŀ�����ι��������������ֶε�)
                 *
                 * @param searchEntityNumber ����ҳ����루HR��̨ע���������̬ҳ�棩
                 * @param appNumber          Ȩ�޿���Ӧ�ñ��루Ϊnullʱ��searchEntityNumber����Ӧ�ÿ�Ȩ��
                 * @return ��������
                 * @see kd.hr.hbp.common.model.smartsearch.scene.SearchSceneBo
                 */
                querySearchScene(searchEntityNumber:string,appNumber:string):kd.hr.hbp.common.api.HrApiResponse;
            }
            interface SearchSceneService_C extends SearchSceneService_S {
                new():SearchSceneService;
            }
            interface SearchSceneService$ {
            }
            type SearchSceneService_T = SearchSceneService_S & SearchSceneService$;
            interface SearchSceneService extends SearchSceneService_T {
            }
        }
        namespace kd.hr.hbp.business.servicehelper{
            interface HRQueryEntityHelper$QueryEntityParamInfo_S {
            }
            interface HRQueryEntityHelper$QueryEntityParamInfo_C extends HRQueryEntityHelper$QueryEntityParamInfo_S {
                new():HRQueryEntityHelper$QueryEntityParamInfo;
            }
            interface HRQueryEntityHelper$QueryEntityParamInfo$ {
                isMulBaseDataCollectionToString():boolean;
                setMulBaseDataCollectionToString(arg0:boolean):void;
            }
            type HRQueryEntityHelper$QueryEntityParamInfo_T = HRQueryEntityHelper$QueryEntityParamInfo_S & HRQueryEntityHelper$QueryEntityParamInfo$;
            interface HRQueryEntityHelper$QueryEntityParamInfo extends HRQueryEntityHelper$QueryEntityParamInfo_T {
            }
            interface HRQueryEntityHelper_S {
                getCurrentRequestParam():HRQueryEntityHelper$QueryEntityParamInfo;
                /**
                 * ��ȡ��ѯʵ�����ݲ�ѯ������ʵ������
                 *
                 * @return ��ǰ��ʵ�����
                 */
                getInstance():HRQueryEntityHelper;
                setCurrentRequestParam(queryEntityParamInfo:HRQueryEntityHelper$QueryEntityParamInfo):void;
            }
            interface HRQueryEntityHelper_C extends HRQueryEntityHelper_S {
                new():HRQueryEntityHelper;
            }
            interface HRQueryEntityHelper$ {
                /**
                 * ��ѯ���ݣ�����DataSet��Ĭ�ϲ���ҳ��
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param queryFileds     ��ѯ�ֶΣ�����ֶ�ͨ����,���ָ�
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @return DataSet
                 */
                getQueryDataSet(queryEntityType:$.kd.bos.entity.QueryEntityType,queryFileds:string,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string):$.kd.bos.algo.DataSet;
                /**
                 * ��ѯ���ݣ�����DataSet��Ĭ�Ϸ�ҳ��
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param queryFileds     ��ѯ�ֶΣ�����ֶ�ͨ����,���ָ�
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @param start           ��ҳ��ʼ�±�
                 * @param limit           ÿҳ����
                 * @return DataSet
                 */
                getQueryDataSet(queryEntityType:$.kd.bos.entity.QueryEntityType,queryFileds:string,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.kd.bos.algo.DataSet;
                /**
                 * ��ѯ���ݣ�����DynamicObjectCollection��Ĭ�ϲ���ҳ��
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param queryFileds     ��ѯ�ֶΣ�����ֶ�ͨ����,���ָ�
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @return DynamicObjectCollection
                 */
                getQueryDyoColl(queryEntityType:$.kd.bos.entity.QueryEntityType,queryFileds:string,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ��ѯ���ݣ�����DynamicObjectCollection��Ĭ�Ϸ�ҳ��
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param queryFileds     ��ѯ�ֶΣ�����ֶ�ͨ����,���ָ�
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @param start           ��ҳ��ʼ�±�
                 * @param limit           ÿҳ����
                 * @return DynamicObjectCollection
                 */
                getQueryDyoColl(queryEntityType:$.kd.bos.entity.QueryEntityType,queryFileds:string,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ��ѯ������ʵ������
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @return ������ʵ����������
                 */
                queryAllPkByKSql(queryEntityType:$.kd.bos.entity.QueryEntityType,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string):$.java.util.List;
                /**
                 * ��ҳ��ѯ��ʵ������
                 *
                 * @param queryEntityType ��ѯʵ��ģ��
                 * @param qFilters        ��ѯ��������
                 * @param orderBys        �����ֶΣ�����ֶ�֮����Ӣ��","�ֿ�������ʽ�������ֶ�֮���ÿո�ָ���磺"name desc,number"
                 * @param start           ��ҳ��ʼ�±�
                 * @param limit           ÿҳ����
                 * @return ��ʵ����������
                 */
                queryAllPkByKSql(queryEntityType:$.kd.bos.entity.QueryEntityType,qFilters:$.kd.bos.orm.query.QFilter[],orderBys:string,start:number,limit:number):$.java.util.List;
            }
            type HRQueryEntityHelper_T = HRQueryEntityHelper_S & HRQueryEntityHelper$;
            interface HRQueryEntityHelper extends HRQueryEntityHelper_T {
            }
        }
        namespace kd.hr.hbp.common.api{
            interface HrApiResponse_S {
                fail(arg0:any):HrApiResponse;
                fail(arg0:string):HrApiResponse;
                fail(arg0:string,arg1:string):HrApiResponse;
                success():HrApiResponse;
                success(arg0:any):HrApiResponse;
            }
            type HrApiResponse_ST = $.java.io.Serializable & HrApiResponse_S;
            interface HrApiResponse_C extends HrApiResponse_ST {
                new():HrApiResponse;
                new(arg0:boolean,arg1:string,arg2:string,arg3:any):HrApiResponse;
            }
            interface HrApiResponse$ {
                getCode():string;
                getData():any;
                getErrorMessage():string;
                isSuccess():boolean;
                setCode(arg0:string):void;
                setData(arg0:any):void;
                setErrorMessage(arg0:string):void;
                setSuccess(arg0:boolean):void;
            }
            type HrApiResponse_T = $.java.io.Serializable & HrApiResponse_S & HrApiResponse$;
            interface HrApiResponse extends HrApiResponse_T {
            }
        }
        namespace kd.hr.hbp.common.enums.smartsearch{
            enum SearchCategoryEnum {
                WORD_SEG_SEARCH,
                PHRASE_SEARCH
            }
            enum SearchKeyLogicEnum {
                AND,
                OR
            }
            enum SearchTargetTypeEnum {
                FIELDS,
                ENTITY
            }
        }
        namespace kd.hr.hbp.common.model{
            interface AuthorizedOrgTeamResult_S {
                allOrg():AuthorizedOrgTeamResult;
            }
            type AuthorizedOrgTeamResult_ST = $.java.io.Serializable & AuthorizedOrgTeamResult_S;
            interface AuthorizedOrgTeamResult_C extends AuthorizedOrgTeamResult_ST {
                new():AuthorizedOrgTeamResult;
                new(arg0:boolean):AuthorizedOrgTeamResult;
                new(arg0:boolean,arg1:$.java.util.Map):AuthorizedOrgTeamResult;
            }
            interface AuthorizedOrgTeamResult$ {
                getHasPermOrgTeamMap():$.java.util.Map;
                isHasAllOrgPerm():boolean;
                setHasAllOrgPerm(arg0:boolean):void;
                setHasPermOrgTeamMap(arg0:$.java.util.Map):void;
            }
            type AuthorizedOrgTeamResult_T = $.java.io.Serializable & AuthorizedOrgTeamResult_S & AuthorizedOrgTeamResult$;
            interface AuthorizedOrgTeamResult extends AuthorizedOrgTeamResult_T {
            }
            interface AuthorizedOrgResultWithSub_S {
                allOrg():AuthorizedOrgResultWithSub;
            }
            type AuthorizedOrgResultWithSub_ST = $.java.io.Serializable & AuthorizedOrgResultWithSub_S;
            interface AuthorizedOrgResultWithSub_C extends AuthorizedOrgResultWithSub_ST {
                new():AuthorizedOrgResultWithSub;
                new(arg0:boolean):AuthorizedOrgResultWithSub;
                new(arg0:boolean,arg1:$.java.util.List):AuthorizedOrgResultWithSub;
            }
            interface AuthorizedOrgResultWithSub$ {
                getHasPermOrgsWithSub():$.java.util.List;
                isHasAllOrgPerm():boolean;
                setHasAllOrgPerm(arg0:boolean):void;
                setHasPermOrgsWithSub(arg0:$.java.util.List):void;
            }
            type AuthorizedOrgResultWithSub_T = $.java.io.Serializable & AuthorizedOrgResultWithSub_S & AuthorizedOrgResultWithSub$;
            interface AuthorizedOrgResultWithSub extends AuthorizedOrgResultWithSub_T {
            }
            interface AuthorizedOrgResult_S {
                allOrg():AuthorizedOrgResult;
            }
            type AuthorizedOrgResult_ST = $.java.io.Serializable & AuthorizedOrgResult_S;
            interface AuthorizedOrgResult_C extends AuthorizedOrgResult_ST {
                new():AuthorizedOrgResult;
                new(arg0:boolean):AuthorizedOrgResult;
                new(arg0:boolean,arg1:$.java.util.List):AuthorizedOrgResult;
            }
            interface AuthorizedOrgResult$ {
                getHasPermOrgs():$.java.util.List;
                isHasAllOrgPerm():boolean;
                setHasAllOrgPerm(arg0:boolean):void;
                setHasPermOrgs(arg0:$.java.util.List):void;
            }
            type AuthorizedOrgResult_T = $.java.io.Serializable & AuthorizedOrgResult_S & AuthorizedOrgResult$;
            interface AuthorizedOrgResult extends AuthorizedOrgResult_T {
            }
        }
        namespace kd.hr.hbp.common.model.smartsearch.search{
            interface SearchParam_S {
            }
            type SearchParam_ST = $.java.io.Serializable & SearchParam_S;
            interface SearchParam_C extends SearchParam_ST {
                new():SearchParam;
                new(arg0:long,arg1:long,arg2:kd.hr.hbp.common.enums.smartsearch.SearchCategoryEnum,arg3:kd.hr.hbp.common.enums.smartsearch.SearchKeyLogicEnum):SearchParam;
                new(arg0:long,arg1:long,arg2:kd.hr.hbp.common.enums.smartsearch.SearchCategoryEnum,arg3:kd.hr.hbp.common.enums.smartsearch.SearchKeyLogicEnum,arg4:string):SearchParam;
            }
            interface SearchParam$ {
                getCategory():kd.hr.hbp.common.enums.smartsearch.SearchCategoryEnum;
                getLabelValCompSelList():$.java.util.List;
                getPageId():string;
                getPermCtlAppNum():string;
                getPermCtlDymNum():string;
                getSceneId():long;
                getSceneVersion():long;
                getSearchContent():string;
                getSearchKeyLogic():kd.hr.hbp.common.enums.smartsearch.SearchKeyLogicEnum;
                getSearchObjId():long;
                getSearchRangFieldList():$.java.util.List;
                getSearchTargetType():kd.hr.hbp.common.enums.smartsearch.SearchTargetTypeEnum;
                isRecordSearchLog():boolean;
                setCategory(arg0:kd.hr.hbp.common.enums.smartsearch.SearchCategoryEnum):void;
                setLabelValCompSelList(arg0:$.java.util.List):void;
                setPageId(arg0:string):void;
                setPermCtlAppNum(arg0:string):void;
                setPermCtlDymNum(arg0:string):void;
                setRecordSearchLog(arg0:boolean):void;
                setSceneId(arg0:long):void;
                setSceneVersion(arg0:long):void;
                setSearchContent(arg0:string):void;
                setSearchKeyLogic(arg0:kd.hr.hbp.common.enums.smartsearch.SearchKeyLogicEnum):void;
                setSearchObjId(arg0:long):void;
                setSearchRangFieldList(arg0:$.java.util.List):void;
                setSearchTargetType(arg0:kd.hr.hbp.common.enums.smartsearch.SearchTargetTypeEnum):void;
            }
            type SearchParam_T = $.java.io.Serializable & SearchParam_S & SearchParam$;
            interface SearchParam extends SearchParam_T {
            }
        }
        namespace kd.hr.hbp.common.mservice{
            interface HRMSendMsgResult_S {
                readonly CODE_ALL_FAILED:string;
                readonly CODE_ALL_SUCCESSED:string;
                readonly CODE_SOME_SUCCESSED:string;
                readonly IS_SUCCESS_FALSE:number;
                readonly IS_SUCCESS_TRUE:number;
            }
            type HRMSendMsgResult_ST = HRMServiceResult_S & HRMSendMsgResult_S;
            interface HRMSendMsgResult_C extends HRMSendMsgResult_ST {
                new():HRMSendMsgResult;
            }
            interface HRMSendMsgResult$ {
                getFailedCnt():number;
                getSuccessedCnt():number;
                getTotalCnt():number;
                setErrorResult(arg0:boolean,arg1:string,arg2:string):void;
                setFailedCnt(arg0:number):void;
                setResult(arg0:boolean,arg1:string,arg2:number,arg3:number,arg4:string):void;
                setSuccessedCnt(arg0:number):void;
                setTotalCnt(arg0:number):void;
            }
            type HRMSendMsgResult_T = HRMServiceResult & HRMSendMsgResult_S & HRMSendMsgResult$;
            interface HRMSendMsgResult extends HRMSendMsgResult_T {
            }
            interface HRMServiceResult_S {
                readonly DEFAULT_ERROR_CODE:string;
                readonly DEFAULT_SUCCESS_CODE:string;
                fail(arg0:string):HRMServiceResult;
                fail(arg0:string,arg1:string):HRMServiceResult;
                success():HRMServiceResult;
                success(arg0:any):HRMServiceResult;
                success(arg0:any,arg1:string):HRMServiceResult;
            }
            type HRMServiceResult_ST = $.java.io.Serializable & HRMServiceResult_S;
            interface HRMServiceResult_C extends HRMServiceResult_ST {
                new():HRMServiceResult;
            }
            interface HRMServiceResult$ {
                getMessage():string;
                getReturnCode():string;
                getReturnData():any;
                isSuccess():boolean;
                setMessage(arg0:string):void;
                setReturnCode(arg0:string):void;
                setReturnData(arg0:any):void;
                setSuccess(arg0:boolean):void;
            }
            type HRMServiceResult_T = $.java.io.Serializable & HRMServiceResult_S & HRMServiceResult$;
            interface HRMServiceResult extends HRMServiceResult_T {
            }
        }
        namespace kd.sdk.hr.hrmp.haos.extpoint{
            interface IStaffExtDimFilterExtend_S {
            }
            interface IStaffExtDimFilterExtend$ {
                /**
                 * ��ȡ��չά�ȵ��Զ���Ĺ������������ڴ�F7�Լ���������ʱ
                 * �ӿ����Ϊ ��չά�ȵĻ������ϱ���
                 * @return �Զ����������
                 */
                getCustomExtDimQfilter(extDimBaseDataNumber:string,dataModel:$.kd.bos.entity.datamodel.IDataModel):$.kd.bos.orm.query.QFilter;
            }
            type IStaffExtDimFilterExtend_T = IStaffExtDimFilterExtend_S & IStaffExtDimFilterExtend$;
            interface IStaffExtDimFilterExtend extends IStaffExtDimFilterExtend_T {
            }
            interface HROdcModule_S {
            }
            type HROdcModule_ST = $.kd.sdk.module.Module & HROdcModule_S;
            interface HROdcModule_C extends HROdcModule_ST {
                new():HROdcModule;
            }
            interface HROdcModule$ {
            }
            type HROdcModule_T = $.kd.sdk.module.Module & HROdcModule_S & HROdcModule$;
            interface HROdcModule extends HROdcModule_T {
            }
            interface IStaffRuleConfigExtend_S {
            }
            interface IStaffRuleConfigExtend$ {
                /**
                 * �Ƿ�����������Ƽƻ�����BU�ظ���У��
                 * @return
                 */
                skipBURepeatConfigValidator():boolean;
            }
            type IStaffRuleConfigExtend_T = IStaffRuleConfigExtend_S & IStaffRuleConfigExtend$;
            interface IStaffRuleConfigExtend extends IStaffRuleConfigExtend_T {
            }
        }
        namespace kd.sdk.hr.hrmp.hbjm.extpoint{
            interface HROdcModule_S {
            }
            type HROdcModule_ST = $.kd.sdk.module.Module & HROdcModule_S;
            interface HROdcModule_C extends HROdcModule_ST {
                new():HROdcModule;
            }
            interface HROdcModule$ {
            }
            type HROdcModule_T = $.kd.sdk.module.Module & HROdcModule_S & HROdcModule$;
            interface HROdcModule extends HROdcModule_T {
            }
            interface IJobTreeSortConditionExtend_S {
            }
            interface IJobTreeSortConditionExtend$ {
                /**
                 * ��ȡ��������Ĺ���
                 * @return �������
                 */
                getJobTreeAndJobClassTreeSortCondition():string;
            }
            type IJobTreeSortConditionExtend_T = IJobTreeSortConditionExtend_S & IJobTreeSortConditionExtend$;
            interface IJobTreeSortConditionExtend extends IJobTreeSortConditionExtend_T {
            }
        }
        namespace kd.sdk.hr.hrmp.hbpm.extpoint{
            interface IPositionCompareEntryServiceExtend_S {
            }
            interface IPositionCompareEntryServiceExtend$ {
                /**
                 * ��λ��¼�Ա�
                 * @param before �䶯ǰ�İ汾
                 * @param after  �䶯��İ汾
                 * @param entryKey ��¼��ʶ
                 * @return �ԱȽ��
                 */
                getEntryComparentResult(before:$.kd.bos.dataentity.entity.DynamicObject,after:$.kd.bos.dataentity.entity.DynamicObject,entryKey:string):PositionCompareEntryResult;
            }
            type IPositionCompareEntryServiceExtend_T = IPositionCompareEntryServiceExtend_S & IPositionCompareEntryServiceExtend$;
            interface IPositionCompareEntryServiceExtend extends IPositionCompareEntryServiceExtend_T {
            }
            interface IPositionF7OrgTreeOrgIdsServiceExtend_S {
            }
            interface IPositionF7OrgTreeOrgIdsServiceExtend$ {
                /**
                 * F7��������Ҫչʾ����֯���ݵ�boid
                 * @return
                 */
                getPositionF7TreeOrgIds():$.java.util.List;
            }
            type IPositionF7OrgTreeOrgIdsServiceExtend_T = IPositionF7OrgTreeOrgIdsServiceExtend_S & IPositionF7OrgTreeOrgIdsServiceExtend$;
            interface IPositionF7OrgTreeOrgIdsServiceExtend extends IPositionF7OrgTreeOrgIdsServiceExtend_T {
            }
            interface IBosPositionValidateServiceExt_S {
            }
            interface IBosPositionValidateServiceExt$ {
                /**
                 * ƽ̨��λУ��
                 *
                 * @param reqs HR��λ����ֶ����
                 * @return У�������ϣ������˳�򱣳�һ�£�
                 */
                bosPositionValidate(reqs:$.java.util.List):$.java.util.List;
            }
            type IBosPositionValidateServiceExt_T = IBosPositionValidateServiceExt_S & IBosPositionValidateServiceExt$;
            interface IBosPositionValidateServiceExt extends IBosPositionValidateServiceExt_T {
            }
            interface HROdcModule_S {
            }
            type HROdcModule_ST = $.kd.sdk.module.Module & HROdcModule_S;
            interface HROdcModule_C extends HROdcModule_ST {
                new():HROdcModule;
            }
            interface HROdcModule$ {
            }
            type HROdcModule_T = $.kd.sdk.module.Module & HROdcModule_S & HROdcModule$;
            interface HROdcModule extends HROdcModule_T {
            }
            interface PositionCompareEntryResult_S {
            }
            interface PositionCompareEntryResult_C extends PositionCompareEntryResult_S {
                new():PositionCompareEntryResult;
            }
            interface PositionCompareEntryResult$ {
                getAfterValue():string;
                getBeforeValue():string;
                isSame():boolean;
                setAfterValue(afterValue:string):void;
                setBeforeValue(beforeValue:string):void;
                setSame(same:boolean):void;
            }
            type PositionCompareEntryResult_T = PositionCompareEntryResult_S & PositionCompareEntryResult$;
            interface PositionCompareEntryResult extends PositionCompareEntryResult_T {
            }
            interface IPositionSkipValidateServiceExtend_S {
            }
            interface IPositionSkipValidateServiceExtend$ {
                /**
                 * ��ȡ��Ҫ������У��ķ�������
                 * @return ��Ҫ������У��ķ�������
                 */
                getSkipValidateMethods():$.java.util.List;
            }
            type IPositionSkipValidateServiceExtend_T = IPositionSkipValidateServiceExtend_S & IPositionSkipValidateServiceExtend$;
            interface IPositionSkipValidateServiceExtend extends IPositionSkipValidateServiceExtend_T {
            }
            interface IValidatorExtend_S {
            }
            interface IValidatorExtend$ {
                getExtendValidator():$.java.util.List;
            }
            type IValidatorExtend_T = IValidatorExtend_S & IValidatorExtend$;
            interface IValidatorExtend extends IValidatorExtend_T {
            }
        }
        namespace kd.sdk.hr.hrmp.hrdi{
            interface HRHdtcModule_S {
            }
            type HRHdtcModule_ST = $.kd.sdk.module.Module & HRHdtcModule_S;
            interface HRHdtcModule_C extends HRHdtcModule_ST {
                new():HRHdtcModule;
            }
            interface HRHdtcModule$ {
            }
            type HRHdtcModule_T = $.kd.sdk.module.Module & HRHdtcModule_S & HRHdtcModule$;
            interface HRHdtcModule extends HRHdtcModule_T {
            }
            interface IHRCommonIntegrationService_S {
            }
            interface IHRCommonIntegrationService$ {
                /**
                 * ҵ�����ݼ��ɷ���
                 *
                 * @param dataList ҵ��̬��������
                 * @param bizScene ҵ�񳡾������� 1������ 2�� ���� 3�� ��� 4�� ɾ�� 5
                 * @param extParamMap Ԥ����չ���
                 * @return ����ͬ�����
                 * ���ؽ��˵����
                 * HRMServiceResult.success : �Ƿ�ɹ���ʶ
                 * HRMServiceResult.message : �쳣��������Ϊ�쳣��Ϣ�����쳣��������Ϊ��
                 * HRMServiceResult.returnCode : ͬ������ȫ���ɹ�����Ϊsuccess�������ͬ��ʧ�����ݣ���Ϊfail
                 * HRMServiceResult.returnData : ���returnCodeΪsuccess����Ϊ�գ����returnCodeΪfail��
                 *                             ��Ϊʧ������ID��ʧ����Ϣ��Map<Long,String>����ʽΪ<ID,ʧ����Ϣ>
                 */
                sync(dataList:$.java.util.List,bizScene:string,extParamMap:$.java.util.Map):kd.hr.hbp.common.mservice.HRMServiceResult;
            }
            type IHRCommonIntegrationService_T = IHRCommonIntegrationService_S & IHRCommonIntegrationService$;
            interface IHRCommonIntegrationService extends IHRCommonIntegrationService_T {
            }
        }
    }
}
export {};