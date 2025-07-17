/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.fi.ssc.extpoint.achieve{
            interface ICustomAchieveFactorPlugin_S {
            }
            interface ICustomAchieveFactorPlugin$ {
                /**
                 * �������˶���ļ������Ӽ���
                 *
                 * @param mainOrg ��ҵ����֯����Чָ��/��Ч�����еĹ������ģ���Ϊ���Ӹù�������Լ��������
                 * @param accessType ���˶�������  1-�û��飨�ݲ�֧�֣� 2-��ʾԱ��
                 * @param accessObject ���˶��� �û���id ���� �û�id
                 * @param startDate ��ʼ���� �������ڵĿ�ʼʱ��
                 * @param endDate �������� �������ڵĽ���ʱ��
                 * @return �������ӵ�ֵ
                 */
                getCustomAchieveFactor(mainOrg:long,accessType:string,accessObject:long,startDate:Date,endDate:Date):any;
                /**
                 * ������˶����ͬһ���������Ӽ���
                 *
                 * @param mainOrg ��ҵ����֯ ����Чָ��/��Ч�����еĹ������ģ���Ϊ���Ӹù�������Լ��������
                 * @param accessType ���˶�������
                 * @param accessObjectList  ���˶��󼯺�
                 * @param startDate ��ʼ����
                 * @param endDate ��������
                 * @return ���˶�����map��keyΪ���˶���valueΪ�������ӵ�ֵ
                 */
                getCustomAchieveFactorBatch(mainOrg:long,accessType:string,accessObjectList:$.java.util.Set,startDate:Date,endDate:Date):$.java.util.Map;
            }
            type ICustomAchieveFactorPlugin_T = ICustomAchieveFactorPlugin_S & ICustomAchieveFactorPlugin$;
            interface ICustomAchieveFactorPlugin extends ICustomAchieveFactorPlugin_T {
            }
        }
        namespace kd.sdk.fi.ssc.extpoint.approve{
            interface ITaskApproveService_S {
            }
            interface ITaskApproveService$ {
                /**
                 * ������������-��������չ
                 *
                 * @param hisTaskId ���������Id�������ڣ�����ɣ���task_taskhistoryʵ��
                 * @param key ��������
                 * @param map ��������
                 */
                afterApproveOperation(hisTaskId:long,key:string,map:$.java.util.Map):void;
                /**
                 * ������������-����ǰ��չ
                 *
                 * @param taskId ����Id�������ڣ�������ɣ���task_taskʵ��
                 * @param key ��������
                 * @param map ��������
                 */
                beforeApproveOperation(taskId:long,key:string,map:$.java.util.Map):void;
            }
            type ITaskApproveService_T = ITaskApproveService_S & ITaskApproveService$;
            interface ITaskApproveService extends ITaskApproveService_T {
            }
            interface ITaskCancelPendService_S {
            }
            interface ITaskCancelPendService$ {
                /**
                 * ��������-ȡ���ݹҺ���չ
                 *
                 * @param taskId   ��������Id
                 * @param paramMap  ȡ���ݹ�΢����ӿڣ��������
                 * @param resultMap ȡ���ݹ�΢����ӿڣ���Ӧ���
                 */
                afterCancelPend(taskId:long,paramMap:$.java.util.Map,resultMap:$.java.util.Map):void;
                /**
                 * ��������-ȡ���ݹ�ǰ��չ��������У�飩
                 *
                 * @param taskId   ��������Id
                 * @param paramMap ȡ���ݹ�΢����ӿڣ��������
                 *
                 * @return ��չ���
                 * ����У��ʧ�ܷ���������ʾ����Ϣ�������ӿ�ʧ����Ӧ
                 */
                beforeCancelPend(taskId:long,paramMap:$.java.util.Map):$.java.util.Map;
            }
            type ITaskCancelPendService_T = ITaskCancelPendService_S & ITaskCancelPendService$;
            interface ITaskCancelPendService extends ITaskCancelPendService_T {
            }
        }
        namespace kd.sdk.fi.ssc.extpoint.create{
            interface ITaskCreateService_S {
            }
            interface ITaskCreateService$ {
                /**
                 * ��������ɹ�����ô˷��������ڴ����Ӷ���ҵ���߼�������֪ͨĳ������Ա��������ϵͳ�ȡ�
                 * @param taskDyo ������������--����̬����
                 * @param billTypeDyo ������������--ҵ�񵥾ݻ�������
                 * @param taskTypeDyo ������������--�������ͻ�������
                 * @param assignID ������id
                 * @param billDataDyo  ���ݶ�̬����
                 */
                afterCreateTask?(taskDyo:$.kd.bos.dataentity.entity.DynamicObject,billTypeDyo:$.kd.bos.dataentity.entity.DynamicObject,taskTypeDyo:$.kd.bos.dataentity.entity.DynamicObject,assignID:string,billDataDyo:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ����̬���󹹽���ɣ��������֮ǰ���ô˷��������ڴ����Ӷ���ҵ���߼����������������ֶθ�ֵ
                 * @param taskDyo ������������--����̬����
                 * @param billTypeDyo ������������--ҵ�񵥾ݻ�������
                 * @param taskTypeDyo ������������--�������ͻ�������
                 * @param assignID ������id
                 * @param billDataDyo  ���ݶ�̬����
                 */
                beforeSaveTask?(taskDyo:$.kd.bos.dataentity.entity.DynamicObject,billTypeDyo:$.kd.bos.dataentity.entity.DynamicObject,taskTypeDyo:$.kd.bos.dataentity.entity.DynamicObject,assignID:string,billDataDyo:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type ITaskCreateService_T = ITaskCreateService_S & ITaskCreateService$;
            interface ITaskCreateService extends ITaskCreateService_T {
            }
        }
        namespace kd.sdk.fi.ssc.extpoint.disRebuild{
            interface INotifyWfService_S {
            }
            interface INotifyWfService$ {
                /**
                 * ֪ͨ������
                 *
                 * @param disType   �����������
                 * @param disTask   ����������
                 * @param isSuccess �����Ƿ�ɹ�
                 */
                notifyWf(disType:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTypeEnum,disTask:$.kd.bos.dataentity.entity.DynamicObject,isSuccess:boolean):void;
            }
            type INotifyWfService_T = INotifyWfService_S & INotifyWfService$;
            interface INotifyWfService extends INotifyWfService_T {
            }
            interface IStateChangeService_S {
            }
            interface IStateChangeService$ {
                /**
                 * �޸�����״̬�����¼
                 *
                 * @param disType         �����������
                 * @param disTask         ����������
                 * @param isSuccess       �����Ƿ�ɹ�
                 * @param disTaskOldValue ��������������ɹ��󣬾�ֵ
                 */
                stateChange(disType:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTypeEnum,disTask:$.kd.bos.dataentity.entity.DynamicObject,isSuccess:boolean,disTaskOldValue:$.java.util.Map):void;
            }
            type IStateChangeService_T = IStateChangeService_S & IStateChangeService$;
            interface IStateChangeService extends IStateChangeService_T {
            }
            interface IAfterDisService_S {
            }
            interface IAfterDisService$ {
                /**
                 * �����������ִ��
                 *
                 * @param disType     �����������
                 * @param disTaskList ����������List
                 */
                afterDisBatch(disType:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTypeEnum,disTaskList:$.java.util.List):void;
                /**
                 * ����󣬵�������ִ��
                 *
                 * @param disType   �����������
                 * @param disTask   ����������
                 * @param isSuccess �����Ƿ�ɹ�
                 */
                afterDisSingle(disType:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTypeEnum,disTask:$.kd.bos.dataentity.entity.DynamicObject,isSuccess:boolean):void;
            }
            type IAfterDisService_T = IAfterDisService_S & IAfterDisService$;
            interface IAfterDisService extends IAfterDisService_T {
            }
            interface IDataPrepareService_S {
            }
            interface IDataPrepareService$ {
                /**
                 * ���ش�������������
                 *
                 * @param unDisFilter   ���������񣬹�������
                 * @param disTaskSource ���ش���������������չ�ӿڣ�������Դ
                 */
                prepareData(unDisFilter:$.kd.bos.orm.query.QFilter,disTaskSource:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTaskSourceEnum):$.java.util.List;
            }
            type IDataPrepareService_T = IDataPrepareService_S & IDataPrepareService$;
            interface IDataPrepareService extends IDataPrepareService_T {
            }
            interface ITaskSaveService_S {
            }
            interface ITaskSaveService$ {
                /**
                 * ��������
                 *
                 * @param disType   �����������
                 * @param disTask   ����������
                 * @param isSuccess �����Ƿ�ɹ�
                 */
                saveTask(disType:kd.sdk.fi.ssc.extpoint.disRebuild.disenum.DisTypeEnum,disTask:$.kd.bos.dataentity.entity.DynamicObject,isSuccess:boolean):void;
            }
            type ITaskSaveService_T = ITaskSaveService_S & ITaskSaveService$;
            interface ITaskSaveService extends ITaskSaveService_T {
            }
        }
        namespace kd.sdk.fi.ssc.extpoint.disRebuild.disenum{
            enum DisTaskSourceEnum {
                AUTO_DIS_1,
                AUTO_DIS_2,
                AUTO_DIS_3,
                GET_DIS_1
            }
            enum DisTypeEnum {
                AUTO_DIS,
                MANUAL_DIS,
                MANUAL_GET,
                NOPASS_DIS
            }
        }
        namespace kd.sdk.fi.ssc.util.task{
            interface PartaskUniversalUtil_S {
                /**
                 * �������������id���ж��Ƿ��Ƕ༶����
                 *
                 * @param taskId
                 *            ����id
                 * @return true���༶����false���Ƕ༶����
                 * @throws KDBizException
                 *             �Ƿ��Ƕ༶�����жϴ���
                 *
                 *             <pre>
                 * <code>����ʾ��:kd.sdk.fi.ssc.util.task.PartaskUniversalUtil.isParTaskCompleted(123456789L)</code>
                 *             </pre>
                 */
                isParTaskCompleted(taskId:long):boolean;
                /**
                 * ������;����id���ж��Ƿ��Ƕ༶����
                 *
                 * @param taskId
                 *            ����id
                 * @return true���༶����false���Ƕ༶����
                 * @throws KDBizException
                 *             �Ƿ��Ƕ༶�����жϴ���
                 *
                 *             <pre>
                 * <code>����ʾ��:kd.sdk.fi.ssc.util.task.PartaskUniversalUtil.isParTaskOnProcessing
                 * (123456789L)</code>
                 *             </pre>
                 */
                isParTaskOnProcessing(taskId:long):boolean;
                /**
                 * ������;����id���жϴ����������Ƿ��ǳ�������
                 *
                 * @param taskId
                 *            ����id
                 * @return true����������false���ǳ�������
                 * @throws KDBizException
                 *             �Ƿ��ǳ��������жϴ���
                 *
                 *             <pre>
                 * <code>����ʾ��:kd.sdk.fi.ssc.util.task.PartaskUniversalUtil.isStartInProcessing(123456789L)</code>
                 *             </pre>
                 */
                isStartInProcessing(taskId:long):boolean;
            }
            interface PartaskUniversalUtil_C extends PartaskUniversalUtil_S {
                new():PartaskUniversalUtil;
            }
            interface PartaskUniversalUtil$ {
            }
            type PartaskUniversalUtil_T = PartaskUniversalUtil_S & PartaskUniversalUtil$;
            interface PartaskUniversalUtil extends PartaskUniversalUtil_T {
            }
        }
    }
}
export {};