/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.sihc.soebs.business.service.cadrefile{
            interface CadreSnapReportExtHisQueryDateDTO_S {
            }
            interface CadreSnapReportExtHisQueryDateDTO_C extends CadreSnapReportExtHisQueryDateDTO_S {
                new():CadreSnapReportExtHisQueryDateDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo):CadreSnapReportExtHisQueryDateDTO;
            }
            interface CadreSnapReportExtHisQueryDateDTO$ {
                /**
                 * ��ȡ��ѯ������ϸ��Ϣ
                 *
                 * @return filterInfo
                 */
                getFilterInfo():$.kd.bos.entity.report.FilterInfo;
            }
            type CadreSnapReportExtHisQueryDateDTO_T = CadreSnapReportExtHisQueryDateDTO_S & CadreSnapReportExtHisQueryDateDTO$;
            interface CadreSnapReportExtHisQueryDateDTO extends CadreSnapReportExtHisQueryDateDTO_T {
            }
            interface CadreFileReportExtRelationFilterDTO_S {
            }
            interface CadreFileReportExtRelationFilterDTO_C extends CadreFileReportExtRelationFilterDTO_S {
                new():CadreFileReportExtRelationFilterDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo,reletionMap:$.java.util.Map):CadreFileReportExtRelationFilterDTO;
            }
            interface CadreFileReportExtRelationFilterDTO$ {
                /**
                 * ��ȡ��ѯ������ϸ��Ϣ
                 *
                 * @return filterInfo
                 */
                getFilterInfo():$.kd.bos.entity.report.FilterInfo;
                /**
                 * ��ȡ�Ѿ�ƴ�ӵ�on����
                 *
                 * @return reletionMap
                 */
                getReletionMap():$.java.util.Map;
            }
            type CadreFileReportExtRelationFilterDTO_T = CadreFileReportExtRelationFilterDTO_S & CadreFileReportExtRelationFilterDTO$;
            interface CadreFileReportExtRelationFilterDTO extends CadreFileReportExtRelationFilterDTO_T {
            }
        }
        namespace kd.sdk.sihc.soecadm{
            interface SdkSihcSoecadmModule_S {
            }
            type SdkSihcSoecadmModule_ST = $.kd.sdk.module.Module & SdkSihcSoecadmModule_S;
            interface SdkSihcSoecadmModule_C extends SdkSihcSoecadmModule_ST {
                new():SdkSihcSoecadmModule;
            }
            interface SdkSihcSoecadmModule$ {
            }
            type SdkSihcSoecadmModule_T = $.kd.sdk.module.Module & SdkSihcSoecadmModule_S & SdkSihcSoecadmModule$;
            interface SdkSihcSoecadmModule extends SdkSihcSoecadmModule_T {
            }
        }
        namespace kd.sdk.sihc.soecadm.business.service.activity{
            interface ActivityGroupInsCommonService_S {
            }
            type ActivityGroupInsCommonService_ST = kd.sdk.sihc.soecadm.common.ActivityGroupInsCommConstants_S & ActivityGroupInsCommonService_S;
            interface ActivityGroupInsCommonService_C extends ActivityGroupInsCommonService_ST {
                new():ActivityGroupInsCommonService;
            }
            interface ActivityGroupInsCommonService$ {
                /**
                 * ɾ�����ʵ��-����
                 * @param bizBillId  ҵ�񵥾�ID
                 * @return
                 */
                deleteActivityGroupInsById(bizBillId:long):number;
                /**
                 * ɾ�����ʵ��-����
                 * @param bizBillIds  ҵ�񵥾�ID����
                 * @return
                 */
                deleteActivityGroupInsByIds(bizBillIds:$.java.util.List):number;
                /**
                 * ���ݴ���Ļid�����ų������ʵ���еĻ
                 * @param activityGroupInsList           �ʵ������
                 * @param excludeActivityIds             ��Ҫ�ų��Ļid����
                 * @return  �ʵ������(activity:�ID,status:�ʵ��״̬,activitytype:�����,1�ر��0�Ǳر��)
                 */
                excludeActivityGroupInsList(activityGroupInsList:$.java.util.List,excludeActivityIds:$.java.util.List):void;
                /**
                 * ���ɻ��ʵ��
                 * @param bizBillId             ҵ�񵥾�ID
                 * @param activityGroupIns      �ʵ������(activity:�ID,status:�ʵ��״̬,activitytype:�����,1�ر��0�Ǳر��)
                 * @return ���ʵ��ID
                 */
                generateActivityGroupIns(bizBillId:long,activityGroupIns:$.java.util.List):long;
                /**
                 * ���ɻ��ʵ��-��ƥ�������
                 * @param bizBillId             ҵ�񵥾�ID
                 * @param sechemeId             �����ID
                 * @param data                  ҵ���������
                 * @param souActivityId         ������Դ���id
                 * @return ���ʵ��ID
                 */
                generateActivityGroupIns(bizBillId:long,sechemeId:long,data:$.kd.bos.dataentity.entity.DynamicObject,souActivityId:long):long;
                /**
                 * ��ѯ��˵������еĻʵ��id ���յ�ά�ȹ���map
                 * �˷��������΢����ӿڣ����Ҫ�жϻ�����Ƿ���������ڵ㣬ʹ�� queryActivityGroupInsByActivityObjs �õ���������ж�
                 *
                 * @param activityObj  ��˵�����
                 * @param activityInsId Ҫ�ж��Ƿ����ĳ���
                 * @return key: �����id value�� true ������εĻ false ��������εĻ
                 */
                getActivityContainsNodeByActivityObj(activityObj:$.kd.bos.dataentity.entity.DynamicObject,activityInsId:long):boolean;
                /**
                 * ���ݵ�������ƥ����
                 * @param sechemeId             �����ID
                 * @param data                  ҵ��̬����
                 * @return                      �ʵ������(activity:�ID,status:�ʵ��״̬,activitytype:�����,1�ر��0�Ǳر��)
                 */
                mateActivityGroup(sechemeId:long,data:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.List;
                /**
                 * ��ѯ��˵������еĻʵ��id ���յ�ά�ȹ���map
                 * �˷��������΢����ӿڣ����Ҫ�жϻ�����Ƿ���������ڵ㣬ʹ�� queryActivityGroupInsByActivityObjs �õ���������ж�
                 *
                 * @param activityObjs  ��˵����󼯺�
                 * @param activityInsId Ҫ�ж��Ƿ����ĳ���
                 * @return key: �����id value�� true ������εĻ false ��������εĻ
                 */
                queryActivityContainsNodeByActivityObjs(activityObjs:$.java.util.List,activityInsId:long):$.java.util.Map;
                /**
                 * ��ѯ��˵������еĻʵ��id ���յ�ά�ȹ���map
                 *
                 * @param activityObjs ��˵����󼯺�
                 * @return key: �����id value�� ���������ְ��¼�е����ⵥ��Ӧ�Ļʵ���Ľڵ�id�ۺ�
                 */
                queryActivityGroupInsByActivityObjs(activityObjs:$.java.util.List):$.java.util.Map;
                /**
                 * ��ѯ��˵������еĻʵ��id ���յ�ά�ȹ���map
                 *
                 * @param activityObjs ��˵����󼯺�
                 * @param filterFun  �Զ�����˹����� ������Կ���ֻ�жϱر��
                 * @return key: �����id value�� ���������ְ��¼�е����ⵥ��Ӧ�Ļʵ���Ľڵ�id�ۺ�
                 */
                queryActivityGroupInsByActivityObjs(activityObjs:$.java.util.List,func1:(t:any)=>any):$.java.util.Map;
                /**
                 * ��ѯ���ʵ��
                 * @param bizBillId  ҵ�񵥾�ID
                 * @return
                 */
                queryActivityGroupInsById(bizBillId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ѯ���ʵ��
                 * @param  bizBillIds  ҵ�񵥾�ID����
                 * @return ��ҵ�񵥾�Ϊkey��map��valueΪ�List�������id�ͻ���ͣ�1�ر��0�Ǳر��
                 */
                queryActivityGroupInsByIds(bizBillIds:$.java.util.List):$.java.util.Map;
                /**
                 * �޸Ļ��ʵ��
                 * @param bizBillId             ҵ�񵥾�ID
                 * @param activityGroupIns      �ʵ������(activity:�ID,status:�ʵ��״̬,activitytype:�����,1�ر��0�Ǳر��)
                 * @return ���ʵ��ID
                 */
                updateActivityGroupIns(bizBillId:long,activityGroupIns:$.java.util.List):long;
            }
            type ActivityGroupInsCommonService_T = kd.sdk.sihc.soecadm.common.ActivityGroupInsCommConstants & ActivityGroupInsCommonService_S & ActivityGroupInsCommonService$;
            interface ActivityGroupInsCommonService extends ActivityGroupInsCommonService_T {
            }
        }
        namespace kd.sdk.sihc.soecadm.business.service.auth{
            interface AuthOrgService_S {
            }
            interface AuthOrgService_C extends AuthOrgService_S {
                new():AuthOrgService;
            }
            interface AuthOrgService$ {
                /**
                 * �ռ�����Ǽǵ���Ȩ����
                 *
                 * @param appRemReg
                 * @return
                 */
                getAppRemRegAuthOrgs(appRemReg:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Set;
                /**
                 * ���Ȩ���ݴ���
                 *
                 * @param activity �
                 */
                handleActivityAuthEntry(activity:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ����Ǽǵ���Ȩ���ݴ���
                 *
                 * @param appRemReg ����Ǽǵ�
                 */
                handleAppRemRegAuthEntry(appRemReg:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type AuthOrgService_T = AuthOrgService_S & AuthOrgService$;
            interface AuthOrgService extends AuthOrgService_T {
            }
        }
        namespace kd.sdk.sihc.soecadm.common{
            interface ActivityGroupInsCommConstants_S {
                readonly FIELD_ACTIVITY:string;
                readonly FIELD_ACTIVITYTYPE:string;
                readonly FIELD_ACTIVITY_ID:string;
                readonly FIELD_BIZBILLID:string;
                readonly FIELD_ENTRYENTITY:string;
                readonly FIELD_SOUACTIVITYID:string;
                readonly FIELD_STATUS:string;
            }
            interface ActivityGroupInsCommConstants$ {
            }
            type ActivityGroupInsCommConstants_T = ActivityGroupInsCommConstants_S & ActivityGroupInsCommConstants$;
            interface ActivityGroupInsCommConstants extends ActivityGroupInsCommConstants_T {
            }
        }
        namespace kd.sdk.sihc.soecadm.extpoint{
            interface AbstractActivityBillCommonService_S {
            }
            interface AbstractActivityBillCommonService_C extends AbstractActivityBillCommonService_S {
                new():AbstractActivityBillCommonService;
            }
            interface AbstractActivityBillCommonService$ {
                /**
                 * ���ɻ����
                 *
                 * @param appremId   ���ⵥid
                 * @param activityId �id
                 * @param instanceId ����ʵ��id
                 * @param sla        ����ʱ��
                 * @return ���id���������0��˵������ʧ����
                 */
                assembleActivityBill(appremId:long,activityId:long,instanceId:long,sla:number):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������ֹ�����еĻ-����Ǽǵ���ֹʱ����
                 *
                 * @param appremregIds ���ⵥid����
                 */
                batchTerminateTask(appremregIds:$.java.util.List):void;
                /**
                 * ���ü�Ȩ��¼����
                 *
                 * @param activityBillDyn ����ݶ���
                 */
                generateAuthEntry(activityBillDyn:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��װְλƴ������
                 *
                 * @param positionNameSB ְλƴ��
                 * @param positionEntry  ְλ��Ϣ��¼
                 */
                generatePositionName(positionNameSB:$.java.lang.StringBuilder,positionEntry:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��װְλƴ������
                 *
                 * @param positionNameSB ְλƴ��
                 * @param dispMainInfo   ά������ְ��Ϣ
                 */
                generatePositionNameFromDispMainInfo(positionNameSB:$.java.lang.StringBuilder,dispMainInfo:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��������ְ������ְƴ��
                 *
                 * @param activityBillDyn ����ݶ���
                 */
                handlePositionName(activityBillDyn:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��������ְ������ְƴ��
                 *
                 * @param positionColl ����ݶ���
                 */
                handlePositionName4Appremcoll(positionColl:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��������Ǽǵ���ѯ�����еĻ���ݼ���
                 *
                 * @param appremregIds ����Ǽǵ�id����
                 * @return
                 */
                queryProceActivityByAppRemRegIds(appremregIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ������������еĻ����-����Ǽǵ���ֹʱ����
                 *
                 * @param appremregIds �������뵥ID
                 */
                stop(appremregIds:$.java.util.List):void;
                /**
                 * �޸Ľ����л״̬Ϊ����ֹ
                 *
                 * @param dynamicObjects ����ݼ���
                 */
                updateActivityStatus(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                /**
                 * ������Աְλ��¼
                 *
                 * @param appremregId ����Ǽǵ�id
                 * @param entryColl   ��Աְλ��¼����
                 */
                updatePersonPosition(appremregId:long,entryColl:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type AbstractActivityBillCommonService_T = AbstractActivityBillCommonService_S & AbstractActivityBillCommonService$;
            interface AbstractActivityBillCommonService extends AbstractActivityBillCommonService_T {
            }
        }
    }
}
export {};