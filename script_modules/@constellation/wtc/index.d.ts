/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.bos.ext.hr.ruleengine.infos{
            interface RuleConditionInfo_S {
            }
            interface RuleConditionInfo_C extends RuleConditionInfo_S {
                new():RuleConditionInfo;
            }
            interface RuleConditionInfo$ {
                getConditionExpressList():$.java.util.List;
                getConditionExpressStr():string;
                getConditionExpressType():string;
                getConditionList():$.java.util.List;
                setConditionExpressList(arg0:$.java.util.List):void;
                setConditionExpressStr(arg0:string):void;
                setConditionExpressType(arg0:string):void;
                setConditionList(arg0:$.java.util.List):void;
            }
            type RuleConditionInfo_T = RuleConditionInfo_S & RuleConditionInfo$;
            interface RuleConditionInfo extends RuleConditionInfo_T {
            }
        }
        namespace kd.bos.util{
            interface Pair_S {
            }
            type Pair_ST = $.java.io.Serializable & Pair_S;
            interface Pair_C extends Pair_ST {
                new(arg0:any,arg1:any):Pair;
            }
            interface Pair$ {
                getKey():any;
                getValue():any;
            }
            type Pair_T = $.java.io.Serializable & Pair_S & Pair$;
            interface Pair extends Pair_T {
            }
        }
        namespace kd.sdk.wtc.wtabm{
            interface SdkWtcWtabmModule_S {
            }
            type SdkWtcWtabmModule_ST = $.kd.sdk.module.Module & SdkWtcWtabmModule_S;
            interface SdkWtcWtabmModule_C extends SdkWtcWtabmModule_ST {
                new():SdkWtcWtabmModule;
            }
            interface SdkWtcWtabmModule$ {
            }
            type SdkWtcWtabmModule_T = $.kd.sdk.module.Module & SdkWtcWtabmModule_S & SdkWtcWtabmModule$;
            interface SdkWtcWtabmModule extends SdkWtcWtabmModule_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.helper{
            interface VaBillEntryEntityDto_S {
            }
            type VaBillEntryEntityDto_ST = $.java.io.Serializable & VaBillEntryEntityDto_S;
            interface VaBillEntryEntityDto_C extends VaBillEntryEntityDto_ST {
                new():VaBillEntryEntityDto;
            }
            interface VaBillEntryEntityDto$ {
                /**
                 * ��ȡ���ڵ���BOID
                 * @return  ���ڵ���BOID
                 */
                getAttFileBoid():long;
                /**
                 * ��ȡ���ݱ��
                 * @return
                 */
                getBillNo():string;
                /**
                 * ��ȡ��������/ʱ��
                 * @return
                 */
                getEndDate():Date;
                /**
                 * ��ȡ�������ݼٷ�ʽ��0-�ϰ��죻1-�°��죻2-ȫ�죻3-��ѡʱ�Σ�
                 * @return
                 */
                getEndMethod():string;
                /**
                 * ��ȡ�������Ƿ�off��ʱ��
                 * @return true-�ǣ�false-��
                 */
                getEndOffNonPlan():boolean;
                /**
                 * ��ȡ ��ѡʱ�ι�������
                 * @return
                 */
                getOwnDate():Date;
                /**
                 * ��ʵ����ʱ��
                 * ���е�ʱ�����ʱ��㣬���ݰ�κ��ݼٷ�ʽ����/�°��졢ȫ�죩����ʵ�ʵ��ݼ�ʱ�䣻
                 * ע�⣺
                 * 1.OFF����ʱ��ʱ�����ֶ�ֵΪ�ݼٵ���¼��ѡ�������
                 * 2.�������°���ķָ��Ϊ����м�ָ��
                 * @return realEndDate
                 */
                getRealEndDate():Date;
                /**
                 * ��ʵ��ʼʱ��
                 * ���е�ʱ�����ʱ��㣬���ݰ�κ��ݼٷ�ʽ����/�°��졢ȫ�죩����ʵ�ʵ��ݼ�ʱ�䣻
                 * ע�⣺
                 * 1.OFF����ʱ��ʱ�����ֶ�ֵΪ�ݼٵ���¼��ѡ�������
                 * 2.�������°���ķָ��Ϊ����м�ָ��
                 *
                 * @return realStartDate
                 */
                getRealStartDate():Date;
                /**
                 * ��ȡ ������ݼٷ�ʽID
                 * @return
                 */
                getSpVaMethodId():long;
                /**
                 * ��ȡ�������չ��ϢJSON
                 * @return �������չ��ϢJSON
                 */
                getSpecialExtJson():string;
                /**
                 * ��ȡ������ݼ����ͣ���A-����٣���ͨ�ٴ��ֶ�Ϊ�գ�
                 * @return
                 */
                getSpecialVaType():string;
                /**
                 * ��ȡ��ʼ����/ʱ��
                 * @return
                 */
                getStartDate():Date;
                /**
                 * ��ȡ��ʼ���ݼٷ�ʽ��0-�ϰ��죻1-�°��죻2-ȫ�죻3-��ѡʱ�Σ�
                 * @return
                 */
                getStartMethod():string;
                /**
                 * ��ȡ��ʼ���Ƿ�off��ʱ��
                 * @return true-�ǣ�false-��
                 */
                getStartOffNonPlan():boolean;
                /**
                 * ��ȡ�����ѷ��������
                 * @return �����ѷ��������
                 */
                getStorageTo():Date;
                /**
                 * ��ȡ�ݼٵ��ӵ�����
                 * @return
                 */
                getVaSubEntryVoList():$.java.util.List;
                /**
                 * ���� ���ڵ���BOID
                 * @param attFileBoid
                 */
                setAttFileBoid(attFileBoid:long):void;
                /**
                 * ���� ���ݱ��
                 * @param billNo
                 */
                setBillNo(billNo:string):void;
                /**
                 * ���� ��������/ʱ��
                 * @param endDate
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ���ý������ݼٷ�ʽ��0-�ϰ��죻1-�°��죻2-ȫ�죻3-��ѡʱ�Σ�
                 * @param endMethod
                 */
                setEndMethod(endMethod:string):void;
                /**
                 * ���ý������Ƿ�off��ʱ��
                 * @param endOffNonPlan
                 */
                setEndOffNonPlan(endOffNonPlan:boolean):void;
                /**
                 * ������ѡʱ�ι�������
                 * @param ownDate
                 */
                setOwnDate(ownDate:Date):void;
                /**
                 * ������ʵ����ʱ��
                 * @param realEndDate
                 */
                setRealEndDate(realEndDate:Date):void;
                setRealStartDate(realStartDate:Date):void;
                /**
                 * ����������ݼٷ�ʽID
                 * @param spVaMethodId ������ݼٷ�ʽID
                 * @return this
                 */
                setSpVaMethodId(spVaMethodId:long):this;
                /**
                 * �����������չ��ϢJSON
                 * @param specialExtJson �������չ��ϢJSON
                 */
                setSpecialExtJson(specialExtJson:string):void;
                /**
                 * �������������
                 * @param specialVaType  ���������
                 * @return this
                 */
                setSpecialVaType(specialVaType:string):this;
                /**
                 * ���ÿ�ʼ����/ʱ��
                 * @param startDate
                 */
                setStartDate(startDate:Date):void;
                /**
                 * ���� ��ʼ���ݼٷ�ʽ��0-�ϰ��죻1-�°��죻2-ȫ�죻3-��ѡʱ�Σ�
                 * @param startMethod
                 */
                setStartMethod(startMethod:string):void;
                /**
                 * ���ÿ�ʼ���Ƿ�off��ʱ��
                 * @param startOffNonPlan
                 */
                setStartOffNonPlan(startOffNonPlan:boolean):void;
                /**
                 * ���� �����ѷ��������
                 * @param storageTo �ѷ��������
                 */
                setStorageTo(storageTo:Date):void;
                /**
                 * �����ݼٵ��ӵ�����
                 * @param vaSubEntryVoList �ӵ�����
                 * @return this
                 */
                setVaSubEntryVoList(vaSubEntryVoList:$.java.util.List):this;
            }
            type VaBillEntryEntityDto_T = $.java.io.Serializable & VaBillEntryEntityDto_S & VaBillEntryEntityDto$;
            interface VaBillEntryEntityDto extends VaBillEntryEntityDto_T {
            }
            interface WTABMHelper_S {
                /**
                 * ���ݿ��ڵ���BOID���ݼ����ڲ�ѯ��Ӧ���ݼٷ������ݼٹ���
                 * <p>
                 *
                 * @param vaPlanRuleParams �������  ���ڵ���BOID�����ڲ���Ϊ�գ����򷵻�KDBizException
                 * @return List<VaPlanRuleQuery> ��Ӧ����,���ظÿ��ڵ����¶�Ӧ�ݼ����ڵ��ݼٷ������ݼٹ���
                 * @throws KDBizException ���ڵ���BOID���ݼ�����Ϊ��ʱ
                 */
                getVaPlanAndRule(vaPlanRuleParams:$.java.util.Set):$.java.util.List;
            }
            interface WTABMHelper_C extends WTABMHelper_S {
                new():WTABMHelper;
            }
            interface WTABMHelper$ {
            }
            type WTABMHelper_T = WTABMHelper_S & WTABMHelper$;
            interface WTABMHelper extends WTABMHelper_T {
            }
            interface WtabmVaBillHelper_S {
                /**
                 * ���ݿ�������Ϣ��ʱ�䷶Χ��ѯ���ݼ�ʱ�ε��ݼٵ�
                 *
                 * @param vaQyeryParam ��ѯ���ݼ�ʱ�εļٵ����
                 * @return List<VaBillDto> ������Ϣ�б�
                 */
                getVaBillsWithTime(vaQyeryParam:VaBillsWithTimeInfoParam):$.java.util.List;
            }
            interface WtabmVaBillHelper_C extends WtabmVaBillHelper_S {
                new():WtabmVaBillHelper;
            }
            interface WtabmVaBillHelper$ {
            }
            type WtabmVaBillHelper_T = WtabmVaBillHelper_S & WtabmVaBillHelper$;
            interface WtabmVaBillHelper extends WtabmVaBillHelper_T {
            }
            interface VaBillSubEntryDto_S {
            }
            type VaBillSubEntryDto_ST = $.java.io.Serializable & VaBillSubEntryDto_S;
            interface VaBillSubEntryDto_C extends VaBillSubEntryDto_ST {
                new():VaBillSubEntryDto;
            }
            interface VaBillSubEntryDto$ {
                getDetailId():long;
                /**
                 * ��ȡ����ʱ�䣨������ʱ���룩
                 *
                 * @return ����ʱ�䣨������ʱ���룩
                 */
                getEndDateTime():Date;
                /**
                 * ��ȡ��ʼʱ�䣨������ʱ���룩
                 * @return ��ʼʱ�䣨������ʱ���룩
                 */
                getStartDateTime():Date;
                /**
                 * ����ʱ�����գ���ֵ������Ϊ�Ű���޸Ķ���׼ȷ�����鲻ʹ�ø�ֵ��
                 * @return  ����ʱ������
                 */
                getVaEntryDate():Date;
                setDetailId(detailId:long):this;
                /**
                 * ���ý���ʱ�䣨������ʱ���룩
                 * @param endDateTime  ����ʱ�䣨������ʱ���룩
                 * @return ��ǰ����
                 */
                setEndDateTime(endDateTime:Date):this;
                /**
                 * ���� ��ʼʱ�䣨������ʱ���룩
                 * @param startDateTime ��ʼʱ��
                 * @return this
                 */
                setStartDateTime(startDateTime:Date):this;
                /**
                 * ���� ����ʱ������
                 * @param vaEntryDate  ����ʱ�����գ���ֵ������Ϊ�Ű���޸Ķ���׼ȷ�����鲻ʹ�ø�ֵ��
                 * @return ��ǰ����
                 */
                setVaEntryDate(vaEntryDate:Date):this;
            }
            type VaBillSubEntryDto_T = $.java.io.Serializable & VaBillSubEntryDto_S & VaBillSubEntryDto$;
            interface VaBillSubEntryDto extends VaBillSubEntryDto_T {
            }
            interface VaBillDto_S {
            }
            type VaBillDto_ST = $.java.io.Serializable & VaBillDto_S;
            interface VaBillDto_C extends VaBillDto_ST {
                new():VaBillDto;
            }
            interface VaBillDto$ {
                /**
                 * ��ȡ����BOID
                 * @return ����BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ����VID
                 * @return ����VID
                 */
                getAttFileVid():long;
                /**
                 * ��ȡ������ID
                 * @return ������ID
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ���ݱ��
                 * @return billNo
                 */
                getBillNo():string;
                /**
                 * ��ȡ���������ݣ���Ҫ�������������ݣ�
                 * @return ���������ݣ���Ҫ�������������ݣ�
                 */
                getEntryEntities():$.java.util.List;
                /**
                 * ��ȡ����ID
                 */
                getId():long;
                /**
                 * ��ȡ������ID����������Ϊ�����ʱ��ֵ��Ϊ0L��
                 * @return ������ID����������Ϊ�����ʱ��ֵ��Ϊ0L��
                 */
                getParentId():long;
                /**
                 * ��ȡ�Ƿ����ٵ�
                 * @return true-�ǣ�false-��
                 */
                isNotLeave():boolean;
                /**
                 * ���õ���BOID
                 * @param attFileBoId ����BOID
                 */
                setAttFileBoId(attFileBoId:long):void;
                /**
                 * ���õ���VID
                 * @param attFileVid ����VID
                 */
                setAttFileVid(attFileVid:long):void;
                /**
                 * ���ÿ�����ID
                 * @param attPersonId ������ID
                 */
                setAttPersonId(attPersonId:long):void;
                /**
                 * ���õ��ݱ��
                 * @param billNo billNo
                 */
                setBillNo(billNo:string):void;
                /**
                 * ���� ���������ݣ���Ҫ�������������ݣ�
                 * @param entryEntities  ���������ݣ���Ҫ�������������ݣ�
                 */
                setEntryEntities(entryEntities:$.java.util.List):void;
                /**
                 * ���õ���ID
                 * @param id  id
                 */
                setId(id:long):void;
                /**
                 * �����Ƿ����ٵ�
                 * @param notLeave true-�ǣ�false-��
                 */
                setNotLeave(notLeave:boolean):void;
                /**
                 * ���ø�����ID����������Ϊ�����ʱ��ֵ��Ϊ0L��
                 * @param parentId ������ID����������Ϊ�����ʱ��ֵ��Ϊ0L��
                 */
                setParentId(parentId:long):void;
            }
            type VaBillDto_T = $.java.io.Serializable & VaBillDto_S & VaBillDto$;
            interface VaBillDto extends VaBillDto_T {
            }
            interface VaBillsWithTimeInfoParam_S {
            }
            type VaBillsWithTimeInfoParam_ST = $.java.io.Serializable & VaBillsWithTimeInfoParam_S;
            interface VaBillsWithTimeInfoParam_C extends VaBillsWithTimeInfoParam_ST {
                new():VaBillsWithTimeInfoParam;
            }
            interface VaBillsWithTimeInfoParam$ {
                /**
                 * ��ȡ�ڵ���ID
                 *
                 * @return �ڵ���ID�������Ϊ�մ˴�������ѯ�ٵ�����������ʹ�ÿ�����ID��
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ������ID
                 *
                 * @return ������ID���Ϳ��ڵ���ID����ͬʱΪ�գ��Ƽ�ʹ�ÿ�����ID��Ϊ������ѯ�ٵ���
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ������
                 *
                 * @return ������, �����ǰ�ο�ʼ�գ�Ҳ�������û�ѡ�����ʵʱ��
                 */
                getEndDate():Date;
                /**
                 * ��ȡ ��ʼ��,�����ǰ�ο�ʼ�գ�Ҳ�������û�ѡ�����ʵʱ��
                 *
                 * @return ��ʼ��, �����ǰ�ο�ʼ�գ�Ҳ�������û�ѡ�����ʵʱ��
                 */
                getStartDate():Date;
                /**
                 * �����ڵ���ID
                 *
                 * @param attFileBoId �ڵ���ID�������Ϊ�մ˴�������ѯ�ٵ�����������ʹ�ÿ�����ID��
                 */
                setAttFileBoId(attFileBoId:long):void;
                /**
                 * ���ÿ�����ID
                 *
                 * @param attPersonId ������ID���Ϳ��ڵ���ID����ͬʱΪ�գ��Ƽ�ʹ�ÿ�����ID��Ϊ������ѯ�ٵ���
                 */
                setAttPersonId(attPersonId:long):void;
                /**
                 * ���ý�����
                 *
                 * @param endDate ������,�����ǰ�ο�ʼ�գ�Ҳ�������û�ѡ�����ʵʱ��
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ���� ��ʼ��
                 *
                 * @param startDate ��ʼ��,�����ǰ�ο�ʼ�գ�Ҳ�������û�ѡ�����ʵʱ��
                 */
                setStartDate(startDate:Date):void;
            }
            type VaBillsWithTimeInfoParam_T = $.java.io.Serializable & VaBillsWithTimeInfoParam_S & VaBillsWithTimeInfoParam$;
            interface VaBillsWithTimeInfoParam extends VaBillsWithTimeInfoParam_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.helper.vaplan{
            interface VaPlanRuleQuery_S {
            }
            type VaPlanRuleQuery_ST = $.java.io.Serializable & VaPlanRuleQuery_S;
            interface VaPlanRuleQuery_C extends VaPlanRuleQuery_ST {
                /**
                 * �����ݼٷ��������ѯ�������
                 *
                 * @param attFileBoId ���ڵ���BOID, ���ɴ�0
                 * @param targetDate Ҫ��ѯ������(yyyy-MM-dd)
                 * @param vaTypeId �ݼ�����ID��null�򲻸�������ȡƥ���ݼٹ���ķ�¼
                 * @param billDy ���ݶ�̬��������Ǵ������ݲ�ѯ�ݼٹ���˲����ش�
                 * @param entryKey ��¼���Ա�ʶ������Ǵ������ݲ�ѯ�ݼٹ���˲����ش�
                 * @param entryIndex ��¼�кţ�0��ʼ��������Ǵ������ݲ�ѯ�ݼٹ���˲����ش�
                 */
                new(attFileBoId:long,targetDate:Date,vaTypeId:long,billDy:$.kd.bos.dataentity.entity.DynamicObject,entryKey:string,entryIndex:number):VaPlanRuleQuery;
            }
            interface VaPlanRuleQuery$ {
                /**
                 * ��ȡ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡҪ��ѯ������(yyyy-MM-dd)
                 */
                getTargetDate():Date;
            }
            type VaPlanRuleQuery_T = $.java.io.Serializable & VaPlanRuleQuery_S & VaPlanRuleQuery$;
            interface VaPlanRuleQuery extends VaPlanRuleQuery_T {
            }
            interface VaPlanRuleResp_S {
            }
            type VaPlanRuleResp_ST = $.java.io.Serializable & VaPlanRuleResp_S;
            interface VaPlanRuleResp_C extends VaPlanRuleResp_ST {
            }
            interface VaPlanRuleResp$ {
                /**
                 * ��ȡ�����Ķ�̬����
                 * @return  �ݼٷ����Ķ�̬����
                 */
                getPlanDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ������Ч����ʱ��
                 * @return Date    ������Ч����ʱ��
                 */
                getPlanEffectEnd():Date;
                /**
                 * ��ȡ������Ч��ʼʱ��
                 * @return Date    ������Ч��ʼʱ��
                 */
                getPlanEffectStart():Date;
                /**
                 * ��ȡ �����޶��������˵��ݼٹ����¼
                 * @return �����޶��������˵��ݼٹ����¼
                 */
                getRuleCalDys():$.java.util.List;
                /**
                 * ��ȡ�ݼٹ���Ķ�̬����
                 * @return  �ݼٹ���Ķ�̬����
                 */
                getRuleDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ������Ч����ʱ��
                 * @return Date    ������Ч����ʱ��
                 */
                getRuleEffectEnd():Date;
                /**
                 * ��ȡ������Ч��ʼʱ��
                 * @return Date    ������Ч��ʼʱ��
                 */
                getRuleEffectStart():Date;
                /**
                 * ��ȡ ��ѯ���������
                 * @return  ��ѯ���������
                 */
                getVaPlanRuleQuery():VaPlanRuleQuery;
                /**
                 * ��ȡ �����޶��������˵��ݼٹ����¼���������á��������
                 * @return �����޶��������˵��ݼٹ����¼���������á��������
                 */
                getVaRuleCalInfos():$.java.util.List;
                /**
                 * ���÷�����Ч����ʱ��
                 * @param planEffectEnd   ���ð���Ч����ʱ��
                 */
                setPlanEffectEnd(planEffectEnd:Date):void;
                /**
                 * ���÷�����Ч��ʼʱ��
                 * @param planEffectStart   ���ð���Ч��ʼʱ��
                 */
                setPlanEffectStart(planEffectStart:Date):void;
                /**
                 * ���ù�����Ч����ʱ��
                 * @param ruleEffectEnd   ���ù�����Ч����ʱ��
                 */
                setRuleEffectEnd(ruleEffectEnd:Date):void;
                /**
                 * ���ù�����Ч��ʼʱ��
                 * @param ruleEffectStart   ���ù�����Ч��ʼʱ��
                 */
                setRuleEffectStart(ruleEffectStart:Date):void;
                /**
                 * �����ݼٹ����¼���������á��������
                 * @param vaRuleCalInfos    VaRuleCalInfo ��Ϣ����
                 */
                setVaRuleCalInfos(vaRuleCalInfos:$.java.util.List):void;
            }
            type VaPlanRuleResp_T = $.java.io.Serializable & VaPlanRuleResp_S & VaPlanRuleResp$;
            interface VaPlanRuleResp extends VaPlanRuleResp_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.model{
            interface ShiftParseVoExt_S {
            }
            interface ShiftParseVoExt$ {
                /**
                 * ��ȡ�Ű����ʱ��, offNoPlanΪnull
                 */
                getEndDateTime():Date;
                /**
                 * ��ȡOFF��ʱ��
                 */
                getOffNoPlan():boolean;
                /**
                 * ��ȡ��ι�����
                 */
                getRosterDate():Date;
                /**
                 * ��ȡ�м�ָ��ʱ��
                 */
                getShiftMiddleDateTime():Date;
                /**
                 * ��ȡ�Ű࿪ʼʱ��, offNoPlanΪnull
                 */
                getStartDateTime():Date;
            }
            type ShiftParseVoExt_T = ShiftParseVoExt_S & ShiftParseVoExt$;
            interface ShiftParseVoExt extends ShiftParseVoExt_T {
            }
            interface VaBillEntryEntityValidVoExt_S {
            }
            interface VaBillEntryEntityValidVoExt$ {
                /**
                 * ��ȡ���ڵ���BOID
                 */
                getAttFileBoid():long;
                /**
                 * ��ȡ���ݱ��
                 */
                getBillNo():string;
                /**
                 * ��ȡ��������
                 */
                getEndDate():Date;
                /**
                 * ��ȡ����ʱ�䷽ʽ
                 */
                getEndMethod():string;
                /**
                 * ��ȡ��¼ID
                 */
                getId():long;
                /**
                 * ��ȡ��ѡʱ�ι�������
                 */
                getOwnDate():Date;
                /**
                 * ��ȡ��¼����
                 */
                getRowCount():number;
                /**
                 * ��ȡ��¼�к�
                 */
                getRowIndex():number;
                /**
                 * ��ȡ������ݼٷ�ʽID
                 */
                getSpVaMethodId():long;
                /**
                 * ��ȡ��������ͣ�A-����٣���ͨ�ٴ��ֶ�Ϊ��
                 */
                getSpecialVaType():string;
                /**
                 * ��ȡ��ʼ����
                 */
                getStartDate():Date;
                /**
                 * ��ȡ��ʼʱ�䷽ʽ
                 */
                getStartMethod():string;
                /**
                 * ��ȡ���ʱ���б�
                 */
                getVaEntryValidTimeVoList():$.java.util.List;
                /**
                 * ��ȡ�ݼ�����ID
                 */
                getVaTypeId():long;
            }
            type VaBillEntryEntityValidVoExt_T = VaBillEntryEntityValidVoExt_S & VaBillEntryEntityValidVoExt$;
            interface VaBillEntryEntityValidVoExt extends VaBillEntryEntityValidVoExt_T {
            }
            interface VaBillWithTimeVoExt_S {
            }
            interface VaBillWithTimeVoExt$ {
                /**
                 * ��ȡ����BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ����VID
                 */
                getAttFileVid():long;
                /**
                 * ��ȡ��ԱID
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ���ݱ��
                 */
                getBillNo():string;
                /**
                 * ��ȡ����������
                 */
                getEntryEntities():$.java.util.List;
                /**
                 * ��ȡ����ID
                 */
                getId():long;
                /**
                 * ��ȡ������ID����������Ϊ�����ʱ��ֵ��Ϊ0L��
                 */
                getParentId():long;
            }
            type VaBillWithTimeVoExt_T = VaBillWithTimeVoExt_S & VaBillWithTimeVoExt$;
            interface VaBillWithTimeVoExt extends VaBillWithTimeVoExt_T {
            }
            interface VaEntryValidTimeVoExt_S {
            }
            interface VaEntryValidTimeVoExt$ {
                /**
                 * ��ȡ����ʱ���
                 */
                getEndDateTime():Date;
                /**
                 * ��ȡ�Ƿ�OFF����ʱ��
                 */
                getOffNonPlan():boolean;
                /**
                 * ��ȡ��ν�������
                 */
                getShiftParseVo():ShiftParseVoExt;
                /**
                 * ��ȡ��ʼʱ���
                 */
                getStartDateTime():Date;
            }
            type VaEntryValidTimeVoExt_T = VaEntryValidTimeVoExt_S & VaEntryValidTimeVoExt$;
            interface VaEntryValidTimeVoExt extends VaEntryValidTimeVoExt_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.quota{
            interface OnRenameVaTypeEvent_S {
            }
            interface OnRenameVaTypeEvent_C extends OnRenameVaTypeEvent_S {
                new(source:string,vaTypeDyn:$.kd.bos.dataentity.entity.DynamicObject,quota:string,unit:string,unitName:string):OnRenameVaTypeEvent;
            }
            interface OnRenameVaTypeEvent$ {
                /**
                 * ������Ϣ
                 *
                 * @return ������Ϣ
                 */
                getQuota():string;
                /**
                 * ��ȡ ��ǰ���ö������ĵ��ݵ�FormId;�磺Ϊ���������ݼ�-wtabm_vaapply,�ݼ�����-wtabn_vaapplyself
                 * @return ���ݵ�FormId
                 */
                getSource():string;
                /**
                 * ��λ�ı��루A-�죻B-Сʱ��
                 * @return ��λ�ı��루A-�죻B-Сʱ��
                 */
                getUnit():string;
                /**
                 * ��λ�����ƣ���/Сʱ��
                 * @return ��λ�����ƣ���/Сʱ��
                 */
                getUnitName():string;
                /**
                 * ��ȡ�ݼ����͵Ķ�̬����;�������ԣ�id/name/number
                 * @return �ݼ����͵Ķ�̬����
                 */
                getVaTypeDyn():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���������ݼ���������
                 *
                 * @return ���������ݼ���������
                 */
                getVaTypeName():string;
                /**
                 * �Ƿ�ȡ��������
                 * @return  true-�ǣ�false-��
                 */
                isCancel():boolean;
                /**
                 * �Ƿ�չʾ�����Ϣ��Ĭ��Ϊ��
                 * @return �Ƿ�չʾ�����Ϣ��Ĭ��Ϊ��
                 */
                isShowQuotas():boolean;
                /**
                 *  ���Ǳ�Ʒ���ɵ��ݼ��������ƣ�������õ��ݼ������������������ԭ������ͬ�򲻴�����������
                 * @param vaTypeName
                 */
                overrideVaTypeName(vaTypeName:string):void;
                /**
                 * ȡ��������
                 * @param cancel true-ȡ����false-��ȡ��
                 */
                setCancel(cancel:boolean):void;
                /**
                 * �����Ƿ�չʾ�����Ϣ����������ã�Ĭ��Ϊ��
                 * @param showQuotas true-չʾ�����Ϣ��false-��չʾ�����Ϣ
                 */
                setShowQuotas(showQuotas:boolean):void;
            }
            type OnRenameVaTypeEvent_T = OnRenameVaTypeEvent_S & OnRenameVaTypeEvent$;
            interface OnRenameVaTypeEvent extends OnRenameVaTypeEvent_T {
            }
            interface VaTypeRenamePlugin_S {
            }
            interface VaTypeRenamePlugin$ {
                /**
                 * ǰ�˶�ȼ��ݼ�����������ʱ�������¼�
                 * <p>
                 * 1.����ͨ�� {@link OnRenameVaTypeEvent#setCancel(boolean)} ȡ����ǰ�¼���ȡ����������
                 * 2.����ͨ�� {@link OnRenameVaTypeEvent#overrideVaTypeName(String)} ���Ǳ�Ʒ���ɵ��ݼ��������ƣ�������õ��ݼ������������������ԭ������ͬ�򲻴�����������
                 * 3.����ͨ�� {@link OnRenameVaTypeEvent#setShowQuotas(boolean)} �����Ƿ�չʾ�����Ϣ���˴����û�Ĭ�ϴ����Ʒ�ģ�������Ĭ�ϲ�չʾ
                 * ������2�͵�3���ܵ���1�����
                 *
                 * @param args ��ȼ��ݼ������������¼�
                 */
                onRenameVaTypeName?(args:OnRenameVaTypeEvent):void;
            }
            type VaTypeRenamePlugin_T = VaTypeRenamePlugin_S & VaTypeRenamePlugin$;
            interface VaTypeRenamePlugin extends VaTypeRenamePlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.spva{
            interface SpecialVaTimeDto_S {
            }
            interface SpecialVaTimeDto_C extends SpecialVaTimeDto_S {
                /**
                 * ������ݼ�ʱ�����乹������
                 *
                 * @param startDateTime �ݼٿ�ʼʱ�䣬����Ϊnull
                 * @param endDateTime   �ݼٽ���ʱ�䣬����Ϊnull
                 * @throws IllegalArgumentException ���ݼٽ���ʱ�������ݼٿ�ʼʱ��ʱ�׳��쳣��
                 */
                new(startDateTime:$.java.time.LocalDateTime,endDateTime:$.java.time.LocalDateTime):SpecialVaTimeDto;
            }
            interface SpecialVaTimeDto$ {
                /**
                 * �ݼٽ���ʱ��
                 *
                 * @return �ݼٽ���ʱ��
                 */
                getEndDateTime():$.java.time.LocalDateTime;
                /**
                 * �ݼٿ�ʼʱ��
                 *
                 * @return �ݼٿ�ʼʱ��
                 */
                getStartDateTime():$.java.time.LocalDateTime;
            }
            type SpecialVaTimeDto_T = SpecialVaTimeDto_S & SpecialVaTimeDto$;
            interface SpecialVaTimeDto extends SpecialVaTimeDto_T {
            }
            interface SpecialVaTimeParam_S {
            }
            interface SpecialVaTimeParam_C extends SpecialVaTimeParam_S {
                /**
                 * constroctor
                 */
                new():SpecialVaTimeParam;
            }
            interface SpecialVaTimeParam$ {
                /**
                 * ���ڵ���BOID
                 * <p>
                 * ��ǰ�����ݼٵĿ��ڵ���
                 *
                 * @return ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ÿ�տ���ʱ������λ��Сʱ��
                 * <p>
                 * ÿ���ݼ���ʱ�����ܳ�����ֵ
                 *
                 * @return ÿ�տ���ʱ������λ��Сʱ��
                 */
                getMaxVaTimeInHour():$.java.math.BigDecimal;
                /**
                 * �������
                 *
                 * @return �������
                 */
                getShiftDate():$.java.time.LocalDate;
                /**
                 * ���հ�ΰ汾ID
                 * <p>
                 * ������� shiftDate �����ŵİ��
                 *
                 * @return ���հ�ΰ汾ID
                 */
                getShiftVid():long;
                /**
                 * ������ݼٷ�ʽ
                 * <p>
                 * ������ݼٷ�ʽ�Ķ�̬���󣬿���ȡ�����Լ�Ϊ��id��number��name
                 *
                 * @return ������ݼٷ�ʽ
                 */
                getSpecialVaTypeDyn():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ڵ���BOID
                 * <p>
                 * ��ǰ�����ݼٵĿ��ڵ���
                 *
                 * @param attFileBoId ���ڵ���BOID
                 * @return this
                 */
                setAttFileBoId(attFileBoId:long):this;
                /**
                 * ÿ�տ���ʱ������λ��Сʱ��
                 * <p>
                 * ÿ���ݼ���ʱ�����ܳ�����ֵ
                 *
                 * @param maxVaTimeInHour ÿ�տ���ʱ������λ��Сʱ��
                 * @return this
                 */
                setMaxVaTimeInHour(maxVaTimeInHour:$.java.math.BigDecimal):this;
                /**
                 * �������
                 *
                 * @param shiftDate �������
                 * @return this
                 */
                setShiftDate(shiftDate:$.java.time.LocalDate):this;
                /**
                 * ���հ�ΰ汾ID
                 * <p>
                 * ������� shiftDate �����ŵİ��
                 *
                 * @param shiftVid shiftVid ���հ�ΰ汾ID
                 * @return this
                 */
                setShiftVid(shiftVid:long):this;
                /**
                 * ������ݼٷ�ʽ
                 * <p>
                 * ������ݼٷ�ʽ�Ķ�̬���󣬿���ȡ�����Լ�Ϊ��id��number��name
                 *
                 * @param specialVaTypeDyn ������ݼٷ�ʽ
                 * @return this
                 */
                setSpecialVaTypeDyn(specialVaTypeDyn:$.kd.bos.dataentity.entity.DynamicObject):this;
            }
            type SpecialVaTimeParam_T = SpecialVaTimeParam_S & SpecialVaTimeParam$;
            interface SpecialVaTimeParam extends SpecialVaTimeParam_T {
            }
            interface SpecialVaExpService_S {
            }
            interface SpecialVaExpService$ {
                /**
                 * �Զ������Զ��岸����ݼٷ�ʽ�Ĳ�����ݼ�ʱ�Σ�ϵͳ�������ʱ���
                 *
                 * <p>����ʱ���Ӧ���ڰ��ʱ�η�Χ���ҺͰ�����ϰ�ʱ����ʱ�ν���������ʶ���ʱ����Ϊ0
                 * ������ϰ�ʱ�κ͵������ɵ���ʱ�䷶Χ����ʱ�����ó���maxVaTime,����ᴥ��ÿ�տ���ʱ��У�鵼��У�鲻ͨ��
                 * ���ɵĿ�ʼ-����ʱ��Բ�����Ͷ�����ڰ�ε�ʱ�η�Χ����������ᴥ�����У�鵼��У�鲻ͨ��
                 * �ӿڵ��÷�ʽΪ������ѭ������</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * public List<SpecialVaTimeDto> createSubEntry(SpecialVaTimeParam specialVaTimeParam) {
                 *      LocalDateTime startTime = req.getDate().atTime(9, 0, 0, 0);
                 *      LocalDateTime endTime = req.getDate().atTime(11, 30, 0, 0);
                 *      return Lists.newArrayList(new SpecialVaTimeDto(startTime, endTime));
                 * }
                 * </code></pre>
                 *
                 * @param specialVaTimeParam �����ݼ���ϸʱ������
                 * @return ��Ӧ��ο�ʼ�յ��ݼ���ϸʱ������
                 */
                createSubEntry(specialVaTimeParam:SpecialVaTimeParam):$.java.util.List;
                /**
                 * �ж�������ݼٷ�ʽ�Ƿ��Զ�����ʱ��
                 *
                 * <p>��ѡ������ݼٷ�ʽ֮�����ѡ�ж�����չ�Ĳ�����ݼٷ�ʽ������ô���չ�㣻�������true,��ϵͳ���������У�飬�������ݼ�ʱ�Σ���ʱ�μ���ʱ�������������ݼ���ϸ�ӷ�¼��Ϣ
                 * ������Ϊfalse,����Ϊ��Ҫ������дҳ����Ϣ�����ᴥ������У�������ʱ����</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * public boolean isAutoCreateSubEntry(DynamicObject spvaTypeDyn) {
                 *         String number = spvaTypeDyn.getString("number");
                 *         return StringUtils.equalsAny(number, "1011_S", "1012_s");
                 * }
                 * </code></pre>
                 *
                 * @param spvaTypeDyn ������ݼٷ�ʽ�Ķ�̬���󣬿���ȡ�����Լ�Ϊ��id��number��name
                 * @return �����Ҫ�Զ�����ʱ���򷵻�true
                 */
                isAutoCreateSubEntry(spvaTypeDyn:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type SpecialVaExpService_T = SpecialVaExpService_S & SpecialVaExpService$;
            interface SpecialVaExpService extends SpecialVaExpService_T {
            }
        }
        namespace kd.sdk.wtc.wtabm.business.va{
            interface VaInfoExpService_S {
            }
            interface VaInfoExpService$ {
                /**
                 * �ݼ���Ϣ�༭���ݻ�д�ݼٵ���
                 *
                 * <p>�ݼ�PC�ˣ���������༭�ݼ���Ϣ֮�󣬵��ȷ����ť��д���ݵ��ݼٵ���ҳ��ķ�¼�У��ṩ����չ�ӿڣ������Ի���д����</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param callBackParam ������Ϣ
                 */
                onCallBackVaInfo(callBackParam:VaInfoCallBackParam):void;
            }
            type VaInfoExpService_T = VaInfoExpService_S & VaInfoExpService$;
            interface VaInfoExpService extends VaInfoExpService_T {
            }
            interface OnCheckVaApplyOverlapEvent_S {
            }
            interface OnCheckVaApplyOverlapEvent_C extends OnCheckVaApplyOverlapEvent_S {
                /**
                 * ���췽��
                 */
                new():OnCheckVaApplyOverlapEvent;
            }
            interface OnCheckVaApplyOverlapEvent$ {
                /**
                 * ��ȡ����Ҫ����������У���ص��ĵ���ID�б�
                 * <p>������ǰά���ò������ص����ݼ������б�������ÿ�ε��ýӿ�ȥʵʱ��ѯ<p/>
                 *
                 * @return ����Ҫ����������У���ص��ĵ���ID�б�
                 */
                getNeedNotCheckedOverlapVaTypes():$.java.util.Set;
                /**
                 * ���ò���Ҫ����������У���ص��ĵ���ID�б�
                 */
                setNeedNotCheckedOverlapVaTypes(needNotCheckedOverlapVaTypes:$.java.util.Set):void;
            }
            type OnCheckVaApplyOverlapEvent_T = OnCheckVaApplyOverlapEvent_S & OnCheckVaApplyOverlapEvent$;
            interface OnCheckVaApplyOverlapEvent extends OnCheckVaApplyOverlapEvent_T {
            }
            interface OnCalVaApplyTimeEvent_S {
            }
            interface OnCalVaApplyTimeEvent$ {
                /**
                 * ��ȡ���ڵ���BOID
                 *
                 * @return ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡҪ������ݼ���Ϣ
                 *
                 * @return Ҫ����ķ�¼��̬����, ����ǵ���ҳ����˴�Ϊ����ҳ�Ķ�̬����
                 */
                getBillEntryDyn():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡƥ�䵽���ݼٻ�������
                 *
                 * @return ƥ�䵽���ݼٻ������ö�̬����
                 */
                getMatchedBaseSet():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�Ű���Ϣ
                 * @return key-�Ű�İ�ο�ʼ�գ�value-�����Ϣ
                 */
                getRosterShiftDtoMap():$.java.util.Map;
                /**
                 * ��ȡ Ҫ����Ĳ�����ӷ�¼
                 *
                 * @return Ҫ����Ĳ�����ӷ�¼;�����㲸��ٵ�ʱ��ʱ�����Ϊ�գ�����˷�¼Ϊ�գ�����Ϊ���������ݼ���Ϣ��ʱ��
                 */
                getSpecialVaTimeDto():kd.sdk.wtc.wtabm.business.spva.SpecialVaTimeDto;
                /**
                 * ��ȡ��Ʒ������
                 * @return ��Ʒ������ ��Ʒδ����ʱ�᷵��null
                 */
                getStandardResult():VaTimeResult;
                /**
                 * �����Ƿ�ȡ�������������ʱ��
                 *
                 * @param cancel true-ʹ�ñ�Ʒ��������false-ʹ�ö������������(Ĭ��Ϊfalse)
                 */
                setCancel(cancel:boolean):void;
                /**
                 * ���ö��������������ݼ�ʱ����Ϣ
                 *
                 * @param vaTimeResult �ݼ�ʱ����Ϣ
                 */
                setVaTimeResult(vaTimeResult:VaTimeResult):void;
            }
            type OnCalVaApplyTimeEvent_T = OnCalVaApplyTimeEvent_S & OnCalVaApplyTimeEvent$;
            interface OnCalVaApplyTimeEvent extends OnCalVaApplyTimeEvent_T {
            }
            interface VaApplyTimeCalExtPlugin_S {
            }
            interface VaApplyTimeCalExtPlugin$ {
                /**
                 * �ݼ������¼ʱ������ʱ���ô˽ӿڡ�
                 * ��ǰ�ӿڻ��ȵ��ñ�Ʒʱ�������߼���Ȼ��ѱ�Ʒ�������Ž����
                 * ��ǰ�ӿڿ�����д�ݼ�����ʱ���ļ���ʱ��,��������ٵ�ʱ������
                 * <p>ʾ��������Բο��ݼ�����ʱ��������չ����ʾ������չ�������룺kd.sdk.wtc.wtabm.business.va.VaApplyTimeCalExtPlugin</p>
                 *
                 * @param onCalVaApplyTimeEvent �ݼ�����ʱ��������ʱ���¼�
                 */
                onCalVaApplyTimes(onCalVaApplyTimeEvent:OnCalVaApplyTimeEvent):void;
            }
            type VaApplyTimeCalExtPlugin_T = VaApplyTimeCalExtPlugin_S & VaApplyTimeCalExtPlugin$;
            interface VaApplyTimeCalExtPlugin extends VaApplyTimeCalExtPlugin_T {
            }
            interface VaApplyOverlapCheckExtPlugin_S {
            }
            interface VaApplyOverlapCheckExtPlugin$ {
                /**
                 * �ݼ�����ʱ�ж����ݼ��ص�У��ʱ���ô���չ�ӿڡ�
                 *
                 * <p>ͨ���ýӿڿ���ָ��һЩ�ݼ����͵ĵ��ݲ�����������ݼ����͵��ص�У�顣�������ò���ٲ������ص�У�飬��ô��ͬһʱ�β���ٺ��������ͼٿ���ͬʱ����</p>
                 * <p>ʾ��������Բο��ݼ����뵥���ص��ж���չ����ʾ������չ�������룺kd.sdk.wtc.wtabm.business.va.VaApplyRepeatCheckExtPlugin</p>
                 *
                 * @param onCheckVaApplyOverlapEvent �ݼ������ж������Ƿ��ص�ʱ�¼�
                 */
                onCheckVaApplyOverlapTimePeriod(onCheckVaApplyOverlapEvent:OnCheckVaApplyOverlapEvent):void;
            }
            type VaApplyOverlapCheckExtPlugin_T = VaApplyOverlapCheckExtPlugin_S & VaApplyOverlapCheckExtPlugin$;
            interface VaApplyOverlapCheckExtPlugin extends VaApplyOverlapCheckExtPlugin_T {
            }
            interface VaInfoCallBackParam_S {
            }
            interface VaInfoCallBackParam_C extends VaInfoCallBackParam_S {
                new():VaInfoCallBackParam;
                /**
                 * @param rowIndex �ݼ���Ϣ��¼�к�
                 * @param vaInfoDyn �ݼ���Ϣҳ�Ķ�̬����
                 * @param billView  ����ҳ��view����
                 */
                new(rowIndex:number,vaInfoDyn:$.kd.bos.dataentity.entity.DynamicObject,billView:$.kd.bos.form.IFormView):VaInfoCallBackParam;
            }
            interface VaInfoCallBackParam$ {
                /**
                 * @return ����ҳ��view����
                 */
                getBillView():$.kd.bos.form.IFormView;
                /**
                 * @return �ݼ���Ϣ��¼�к�
                 */
                getRowIndex():number;
                /**
                 * @return �ݼ���Ϣҳ�Ķ�̬����
                 */
                getVaInfoDyn():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * @param billView ����ҳ��view����
                 */
                setBillView(billView:$.kd.bos.form.IFormView):void;
                /**
                 * @param rowIndex �ݼ���Ϣ��¼�к�
                 */
                setRowIndex(rowIndex:number):void;
                /**
                 * @param vaInfoDyn �ݼ���Ϣҳ�Ķ�̬����
                 */
                setVaInfoDyn(vaInfoDyn:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type VaInfoCallBackParam_T = VaInfoCallBackParam_S & VaInfoCallBackParam$;
            interface VaInfoCallBackParam extends VaInfoCallBackParam_T {
            }
            interface VaTimeResult_S {
            }
            interface VaTimeResult_C extends VaTimeResult_S {
                /**
                 * ������
                 * @param valHour ���룻ʱ��(��λ��Сʱ)����Ʒ��Ĭ�϶�ʱ����ȡ6λС������,����ΪNULL�ᱻ��Ϊ��0�벻Ҫ����ΪNULLֵ
                 * @param valDay ���룻ʱ������λ���죩����Ʒ��Ĭ�϶�ʱ����ȡ6λС������,����ΪNULL�ᱻ��Ϊ��0�벻Ҫ����ΪNULLֵ
                 */
                new(valHour:$.java.math.BigDecimal,valDay:$.java.math.BigDecimal):VaTimeResult;
            }
            interface VaTimeResult$ {
                /**
                 * �ж�����Ƿ���Ч(Сʱ������������>0)
                 * @return true-��Ч��false-��Ч
                 */
                checkValid():boolean;
                /**
                 * ��ȡ�ݼ�չʾ�ĵ�λ��A-�죻B-Сʱ��,���ο���ʱ����нضϾ��ȵ�������Դ˵�λ���ο�
                 * @return �ݼ�չʾ�ĵ�λ��A-�죻B-Сʱ��
                 */
                getUnit():string;
                /**
                 * ��ȡʱ��(��λ����)
                 * @return ʱ��(��λ����)
                 */
                getValDay():$.java.math.BigDecimal;
                /**
                 * ��ȡʱ��(��λ��Сʱ)
                 * @return ʱ��(��λ��Сʱ)
                 */
                getValHour():$.java.math.BigDecimal;
                /**
                 * ����ʱ������Ϊ��λ������Ʒ��Ĭ�϶�ʱ����ȡ6λС������,����ΪNULL�ᱻ��Ϊ��0�벻Ҫ����ΪNULLֵ
                 * @param valDay ʱ������Ϊ��λ��
                 */
                setValDay(valDay:$.java.math.BigDecimal):void;
                /**
                 * ����ʱ����СʱΪ��λ������Ʒ��Ĭ�϶�ʱ����ȡ6λС������,����ΪNULL�ᱻ��Ϊ��0�벻Ҫ����ΪNULLֵ
                 *
                 * @param valHour ʱ����СʱΪ��λ��
                 */
                setValHour(valHour:$.java.math.BigDecimal):void;
            }
            type VaTimeResult_T = VaTimeResult_S & VaTimeResult$;
            interface VaTimeResult extends VaTimeResult_T {
            }
        }
        namespace kd.sdk.wtc.wtam{
            interface SdkWtcWtamModule_S {
            }
            type SdkWtcWtamModule_ST = $.kd.sdk.module.Module & SdkWtcWtamModule_S;
            interface SdkWtcWtamModule_C extends SdkWtcWtamModule_ST {
                new():SdkWtcWtamModule;
            }
            interface SdkWtcWtamModule$ {
            }
            type SdkWtcWtamModule_T = $.kd.sdk.module.Module & SdkWtcWtamModule_S & SdkWtcWtamModule$;
            interface SdkWtcWtamModule extends SdkWtcWtamModule_T {
            }
        }
        namespace kd.sdk.wtc.wtam.business.applytime{
            interface TpApplyTimeCalculateEvent_S {
            }
            interface TpApplyTimeCalculateEvent_C extends TpApplyTimeCalculateEvent_S {
                new(attFileBo:long,entryDy:$.kd.bos.dataentity.entity.DynamicObject,shiftMap:$.java.util.Map,result:kd.sdk.wtc.wtam.business.applytime.bean.TpApplyTimeCalculateResult):TpApplyTimeCalculateEvent;
            }
            interface TpApplyTimeCalculateEvent$ {
                getAttFileBo():long;
                getEntryDy():$.kd.bos.dataentity.entity.DynamicObject;
                getResult():kd.sdk.wtc.wtam.business.applytime.bean.TpApplyTimeCalculateResult;
                getShiftMap():$.java.util.Map;
            }
            type TpApplyTimeCalculateEvent_T = TpApplyTimeCalculateEvent_S & TpApplyTimeCalculateEvent$;
            interface TpApplyTimeCalculateEvent extends TpApplyTimeCalculateEvent_T {
            }
            interface TpApplyTimeCalculateExtPlugin_S {
            }
            interface TpApplyTimeCalculateExtPlugin$ {
                /**
                 * ��ѡʱ�����룬������������ʱ��
                 *
                 * <p>����ѡʱ������ʱ��������������ʱ��������չ���滻��Ʒ����ĳ�����ѡʱ������ʱ��
                 * </p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param event ������Ϣ
                 */
                onCalculateApplyTime(event:TpApplyTimeCalculateEvent):void;
            }
            type TpApplyTimeCalculateExtPlugin_T = TpApplyTimeCalculateExtPlugin_S & TpApplyTimeCalculateExtPlugin$;
            interface TpApplyTimeCalculateExtPlugin extends TpApplyTimeCalculateExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtam.business.applytime.bean{
            interface TpApplyTimeCalculateResult_S {
            }
            type TpApplyTimeCalculateResult_ST = $.java.io.Serializable & TpApplyTimeCalculateResult_S;
            interface TpApplyTimeCalculateResult_C extends TpApplyTimeCalculateResult_ST {
                new():TpApplyTimeCalculateResult;
                new(valHour:$.java.math.BigDecimal,valDay:$.java.math.BigDecimal):TpApplyTimeCalculateResult;
            }
            interface TpApplyTimeCalculateResult$ {
                getValDay():$.java.math.BigDecimal;
                getValHour():$.java.math.BigDecimal;
                /**
                 * ���ʱ��
                 *
                 * @param target �����ӵĶ���
                 * @return base
                 */
                plus(target:TpApplyTimeCalculateResult):void;
                /**
                 * ���ʱ��
                 * @param valHour Сʱ��
                 * @param valDay ����
                 */
                plus(valHour:$.java.math.BigDecimal,valDay:$.java.math.BigDecimal):void;
                setValDay(valDay:$.java.math.BigDecimal):void;
                setValHour(valHour:$.java.math.BigDecimal):void;
            }
            type TpApplyTimeCalculateResult_T = $.java.io.Serializable & TpApplyTimeCalculateResult_S & TpApplyTimeCalculateResult$;
            interface TpApplyTimeCalculateResult extends TpApplyTimeCalculateResult_T {
            }
        }
        namespace kd.sdk.wtc.wtam.business.tp{
            interface TpInfoExpService_S {
            }
            interface TpInfoExpService$ {
                /**
                 * ������Ϣ�༭/�������ݻ�д�����
                 *
                 * <p>����PC�ˣ���������༭������Ϣ֮�󣬵��ȷ����ť��д���ݵ������ҳ��ķ�¼�У��ṩ����չ�ӿڣ�����չ�ֶλ�д����</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param tpInfoParameterParam ������Ϣ
                 */
                onCallBackTpInfo(tpInfoParameterParam:TpInfoParameterParam):void;
                /**
                 * ���˱��/Ϊ���˱������ҳ��ʼ��
                 *
                 * <p>����PC�ˣ��ڱ����б�/Ϊ�����б����󣬱����ҳ���ʼ��ʱ����¼���ݸ�ֵ ���ṩ����չ�ӿڣ�����չ�ֶθ�ֵ����</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param tpInfoParameterParam ������Ϣ
                 */
                setChangeTpInfoValue(tpInfoParameterParam:TpInfoParameterParam):void;
                /**
                 * ������Ϣ�༭��ʾ�ֶ�ֵ
                 *
                 * <p>����PC�ˣ���������༭������Ϣ֮�󣬵��ȷ����ť��д���ݵ������ҳ��ķ�¼�У��ṩ����չ�ӿڣ�����չ�ֶλ�д����</p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param tpInfoParameterParam ������Ϣ
                 */
                setTpInfoValue(tpInfoParameterParam:TpInfoParameterParam):void;
            }
            type TpInfoExpService_T = TpInfoExpService_S & TpInfoExpService$;
            interface TpInfoExpService extends TpInfoExpService_T {
            }
            interface WtamHelper_S {
                readonly TRIP_PLAN_RULE_QUERY:string;
                readonly TRIP_SDK_SERVICE:string;
            }
            interface WtamHelper_C extends WtamHelper_S {
                new():WtamHelper;
            }
            interface WtamHelper$ {
                /**
                 * ��ȡ������򣨰���ƥ��ļ������
                 *
                 * <p>���ݻ�ȡ������򣨰���ƥ��ļ������</p>
                 *
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param queries ���������Ϣ
                 */
                getTripRuleInfo(queries:$.java.util.List):$.java.util.List;
            }
            type WtamHelper_T = WtamHelper_S & WtamHelper$;
            interface WtamHelper extends WtamHelper_T {
            }
            interface TpInfoParameterParam_S {
            }
            interface TpInfoParameterParam_C extends TpInfoParameterParam_S {
                new():TpInfoParameterParam;
                /**
                 * @param view       ҳ���view����
                 * @param jsonObject ������Ϣ
                 */
                new(view:$.kd.bos.form.IFormView,jsonObject:any):TpInfoParameterParam;
                /**
                 * @param view       ҳ���view����
                 * @param jsonObject ������Ϣ
                 */
                new(view:$.kd.bos.form.IFormView,jsonObject:any,rowIndex:number):TpInfoParameterParam;
                /**
                 * @param rowIndex            �ݼ���Ϣ��¼�к�
                 * @param view               ҳ���view����
                 * @param closedCallBackEvent �ص��¼�����
                 */
                new(rowIndex:number,view:$.kd.bos.form.IFormView,closedCallBackEvent:$.kd.bos.form.events.ClosedCallBackEvent):TpInfoParameterParam;
            }
            interface TpInfoParameterParam$ {
                getClosedCallBackEvent():$.kd.bos.form.events.ClosedCallBackEvent;
                getJsonObject():any;
                getRowIndex():number;
                getView():$.kd.bos.form.IFormView;
                setClosedCallBackEvent(closedCallBackEvent:$.kd.bos.form.events.ClosedCallBackEvent):void;
                setJsonObject(jsonObject:any):void;
                setRowIndex(rowIndex:number):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type TpInfoParameterParam_T = TpInfoParameterParam_S & TpInfoParameterParam$;
            interface TpInfoParameterParam extends TpInfoParameterParam_T {
            }
        }
        namespace kd.sdk.wtc.wtbs{
            interface SdkWtcWtbsModule_S {
            }
            type SdkWtcWtbsModule_ST = $.kd.sdk.module.Module & SdkWtcWtbsModule_S;
            interface SdkWtcWtbsModule_C extends SdkWtcWtbsModule_ST {
                new():SdkWtcWtbsModule;
            }
            interface SdkWtcWtbsModule$ {
            }
            type SdkWtcWtbsModule_T = $.kd.sdk.module.Module & SdkWtcWtbsModule_S & SdkWtcWtbsModule$;
            interface SdkWtcWtbsModule extends SdkWtcWtbsModule_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.business.bill.dutydate{
            interface BillDutyDateExtPlugin_S {
            }
            interface BillDutyDateExtPlugin$ {
                /**
                 * ��ѡʱ�����룬�Զ������������չ�����
                 *
                 * <p>����ѡʱ������ʱ���������ѡʱ�εĹ������ڣ�����չ���滻��׼�Ĺ������ڽ��и�У��������Ļ�ȡ
                 * </p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param onMatchBillDutyDateEvent ���ڵ��ݹ��������¼�
                 */
                onMatchBillDutyDate(onMatchBillDutyDateEvent:OnMatchBillDutyDateEvent):void;
            }
            type BillDutyDateExtPlugin_T = BillDutyDateExtPlugin_S & BillDutyDateExtPlugin$;
            interface BillDutyDateExtPlugin extends BillDutyDateExtPlugin_T {
            }
            interface OnMatchBillDutyDateEvent_S {
            }
            interface OnMatchBillDutyDateEvent_C extends OnMatchBillDutyDateEvent_S {
                new(startTime:Date,endTime:Date,standardDate:Date,dutyDateErrorEnum:kd.sdk.wtc.wtbs.common.enums.DutyDateErrorEnum):OnMatchBillDutyDateEvent;
            }
            interface OnMatchBillDutyDateEvent$ {
                /**
                 * ��ȡ����ı�׼�������ڵĴ���ö��
                 * @return ����ı�׼���ڵĴ���ö��
                 */
                getDutyDateErrorEnum():kd.sdk.wtc.wtbs.common.enums.DutyDateErrorEnum;
                /**
                 * ��ȡ���ݷ�¼��������
                 * @return ���ݷ�¼��������
                 */
                getEndTime():Date;
                /**
                 * ��ȡ��Ʒ����ı�׼��������
                 * @return ����ı�׼����
                 */
                getStandardDate():Date;
                /**
                 * ��ȡ���ݷ�¼��ʼ����
                 * @return ���ݷ�¼��ʼ����
                 */
                getStartTime():Date;
                setDutyDateErrorEnum(dutyDateErrorEnum:kd.sdk.wtc.wtbs.common.enums.DutyDateErrorEnum):void;
                setStandardDate(standardDate:Date):void;
            }
            type OnMatchBillDutyDateEvent_T = OnMatchBillDutyDateEvent_S & OnMatchBillDutyDateEvent$;
            interface OnMatchBillDutyDateEvent extends OnMatchBillDutyDateEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.business.datarange{
            interface OnResolveDateRangeEvent_S {
            }
            interface OnResolveDateRangeEvent_C extends OnResolveDateRangeEvent_S {
                new(tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt,timeBucketExt:kd.sdk.wtc.wtes.business.tie.model.timebucket.TimeBucketExt,conditionDtoExt:kd.sdk.wtc.wtbs.common.access.ConditionDtoExt,wtcDateRangeSource:kd.sdk.wtc.wtbs.common.enums.WTCDateRangeSource):OnResolveDateRangeEvent;
            }
            interface OnResolveDateRangeEvent$ {
                /**
                 * ��ȡ�������ʽ
                 * @return �������ʽ
                 */
                getConditionDtoExt():kd.sdk.wtc.wtbs.common.access.ConditionDtoExt;
                /**
                 * ��ȡƥ����
                 * @return ƥ����
                 */
                getResult():boolean;
                /**
                 * ��ȡ����������Ķ���
                 * @return ����������Ķ���
                 */
                getTieContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                /**
                 * ��ȡʱ���
                 * @return ʱ���
                 */
                getTimeBucketExt():kd.sdk.wtc.wtes.business.tie.model.timebucket.TimeBucketExt;
                /**
                 * ��ȡ���ڷ�Χ��չ��Դö��
                 * @return ���ڷ�Χ��չ��Դö��
                 */
                getWtcDateRangeSource():kd.sdk.wtc.wtbs.common.enums.WTCDateRangeSource;
                /**
                 * ����ƥ����
                 * @param result ����ֵ
                 */
                setResult(result:boolean):void;
            }
            type OnResolveDateRangeEvent_T = OnResolveDateRangeEvent_S & OnResolveDateRangeEvent$;
            interface OnResolveDateRangeEvent extends OnResolveDateRangeEvent_T {
            }
            interface DateRangeRuleExpPlugin_S {
            }
            interface DateRangeRuleExpPlugin$ {
                /**
                 * ���ں��㴥��������չ�����ڷ�Χ����ƥ��������ֶζ�Ӧ�Ľ�����¼�
                 * <p>
                 * ���ڷ�Χ����ƥ��������ֶ�������֮����Щ��չ�ֶεĽ����������ͨ��ʵ�ָýӿ�������
                 *
                 * @param onResolveDateRangeEvent      ���㴥��������չ�����ڷ�Χ�¼�����
                 */
                onResolveDateRange(onResolveDateRangeEvent:OnResolveDateRangeEvent):void;
            }
            type DateRangeRuleExpPlugin_T = DateRangeRuleExpPlugin_S & DateRangeRuleExpPlugin$;
            interface DateRangeRuleExpPlugin extends DateRangeRuleExpPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.business.limitcond{
            interface OnLimitConditionExpPlugin_S {
            }
            interface OnLimitConditionExpPlugin$ {
                /**
                 * �ᵥ�ͺ��㴥������ ��չ���޶�����ƥ��������ֶ� ��Ӧ�Ľ�����¼�
                 * <p>
                 * �޶�����ƥ��������ֶ�������֮����Щ��չ�ֶεĽ����������ͨ��ʵ�ָýӿ�������
                 *
                 * @param onLimitConditionEvent ���㴥��������չ���޶������¼�����
                 */
                onLimitConditionEvent(onLimitConditionEvent:OnLimitConditionEvent):void;
            }
            type OnLimitConditionExpPlugin_T = OnLimitConditionExpPlugin_S & OnLimitConditionExpPlugin$;
            interface OnLimitConditionExpPlugin extends OnLimitConditionExpPlugin_T {
            }
            interface OnLimitConditionEvent_S {
            }
            interface OnLimitConditionEvent_C extends OnLimitConditionEvent_S {
                new(limitConditionSource:string,attFileVid:long,preLimitCondition:kd.sdk.wtc.wtes.business.tie.core.chain.PreLimitCondition,conditionDtoExt:kd.sdk.wtc.wtbs.common.access.ConditionDtoExt):OnLimitConditionEvent;
            }
            interface OnLimitConditionEvent$ {
                /**
                 * ��ȡ�����汾ID
                 *
                 * @return
                 */
                getAttFileVid():long;
                /**
                 * ��ȡ�������ʽ
                 *
                 * @return �������ʽ
                 */
                getConditionDtoExt():kd.sdk.wtc.wtbs.common.access.ConditionDtoExt;
                /**
                 * ��ȡ�޶�������Դ����
                 *
                 * @return
                 */
                getLimitConditionSource():string;
                /**
                 * ��ȡ��Ʒ����ֵ
                 *
                 * @return
                 */
                getPreLimitCondition():kd.sdk.wtc.wtes.business.tie.core.chain.PreLimitCondition;
                /**
                 * ��ȡƥ����
                 *
                 * @return ƥ����
                 */
                getResult():boolean;
                /**
                 * ����ƥ����
                 *
                 * @param result ����ֵ
                 */
                setResult(result:boolean):void;
            }
            type OnLimitConditionEvent_T = OnLimitConditionEvent_S & OnLimitConditionEvent$;
            interface OnLimitConditionEvent extends OnLimitConditionEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.business.mobilescheme{
            interface SchemeIsFullMatchEvent_S {
            }
            interface SchemeIsFullMatchEvent_C extends SchemeIsFullMatchEvent_S {
                new():SchemeIsFullMatchEvent;
            }
            interface SchemeIsFullMatchEvent$ {
                isFull():boolean;
                setFull(full:boolean):void;
            }
            type SchemeIsFullMatchEvent_T = SchemeIsFullMatchEvent_S & SchemeIsFullMatchEvent$;
            interface SchemeIsFullMatchEvent extends SchemeIsFullMatchEvent_T {
            }
            interface SchemeMatchEvent_S {
            }
            interface SchemeMatchEvent_C extends SchemeMatchEvent_S {
                new(attFileSchemes:$.java.util.List,sceneNumber:string):SchemeMatchEvent;
            }
            interface SchemeMatchEvent$ {
                getAttFileSchemes():$.java.util.List;
                getResultSchemeIdMap():$.java.util.Map;
                getSceneNumber():string;
                getSceneValueMaps():string;
                setResultSchemeIdMap(resultSchemeIdMap:$.java.util.Map):void;
            }
            type SchemeMatchEvent_T = SchemeMatchEvent_S & SchemeMatchEvent$;
            interface SchemeMatchEvent extends SchemeMatchEvent_T {
            }
            interface ISchemeMatchPlugin_S {
            }
            interface ISchemeMatchPlugin$ {
                /**
                 * �����Ƿ���ȫ�ɵ�ǰ���ƥ�䣨Ĭ�Ϸ�
                 *
                 * @param event
                 */
                fullMatch(event:SchemeIsFullMatchEvent):void;
                /**
                 * ƥ��
                 *
                 * @param event
                 * @return
                 */
                matchScheme(event:SchemeMatchEvent):void;
            }
            type ISchemeMatchPlugin_T = ISchemeMatchPlugin_S & ISchemeMatchPlugin$;
            interface ISchemeMatchPlugin extends ISchemeMatchPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.common.access{
            interface ConditionDtoExt_S {
            }
            interface ConditionDtoExt$ {
                /**
                 * ��ȡ���ڸ�ʽ���ַ��������������ʽ��Ӧ���ֶ���������������������ֶεĸ�ʽ���ַ��������˲���ֵ
                 * @return �������ڸ�ʽ���ַ���
                 */
                getDateFormat():string;
                /**
                 * ��ȡ�������ʽ���ֶε���ʾ����
                 * @return �������ʽ�ֶε���ʾ����
                 */
                getDisplayParam():string;
                /**
                 * ��ȡ������ʾֵ
                 * @return ���ز�����ʾֵ
                 */
                getDisplayValue():string;
                /**
                 * ��ȡ�������ʽ�����
                 * @return �������ʽ�����
                 */
                getIndex():number;
                /**
                 * ��ȡ���ʽ���ƣ����磺T01��T02��
                 * @return ���ʽ����
                 */
                getName():string;
                /**
                 * ��ȡ����������֯id
                 * @return ��������������֯id
                 */
                getObjectId():string;
                /**
                 * ��ȡ����������֯����
                 * @return ��������������֯����
                 */
                getObjectNumber():string;
                /**
                 * �������������������ʽ���ֶ�������أ����������ö�����£�
                 *   <    ��ʾ   С��
                 *   >    ��ʾ   ����
                 *   <=   ��ʾ   С�ڵ���
                 *   >=   ��ʾ   ���ڵ���
                 *   ==   ��ʾ   ����
                 *   !=   ��ʾ    ������
                 *   is_null   ��ʾ   Ϊ��
                 *   is_not_null    ��ʾ   ��Ϊ��
                 *   in   ��ʾ   ��...��
                 *   not_in    ��ʾ   ����...��
                 *   contains  ��ʾ   ����
                 *   not_contains   ��ʾ   ������
                 *   startsWith     ��ʾ   ��...��ʼ
                 *   endsWith  ��ʾ   ��...����
                 *   0d   ��ʾ   ����
                 *   <=0d ��ʾ   С�ڵ��ڽ���
                 *   >=0d ��ʾ   ���ڵ��ڽ���
                 *   -1d  ��ʾ   ����
                 *   1d   ��ʾ   ����
                 *   0w   ��ʾ   ����
                 *   -1w  ��ʾ   ����
                 *   1w   ��ʾ   ����
                 *   0m   ��ʾ   ����
                 *   -1m  ��ʾ   ����
                 *   1m   ��ʾ   ����
                 *   -3~0m     ��ʾ   ��ȥ������
                 *   0~3m ��ʾ   δ��������
                 *   0q   ��ʾ   ������
                 *   -1q  ��ʾ   �ϼ���
                 *   1q   ��ʾ   �¼���
                 *   0y   ��ʾ   ����
                 *   -1y  ��ʾ   ȥ��
                 *   1y   ��ʾ   ����
                 *   is_or_isSub    ��ʾ   ����/...���¼�
                 *   <dom ��ʾ   С�ڣ��գ�
                 *   >dom ��ʾ   ���ڣ��գ�
                 *   <=dom     ��ʾ   С�ڵ��ڣ��գ�
                 *   >=dom     ��ʾ   ���ڵ��ڣ��գ�
                 *
                 * @return ���ز�����
                 */
                getOperators():string;
                /**
                 * ��ȡ�������ʽ�ı���
                 * @return �����������ʽ����
                 */
                getParam():string;
                /**
                 * �������ʽ���ֶε����ͣ�
                 * boolean - ����ֵ
                 * date - ����
                 * string - �ַ���
                 * number - ����
                 * enum - ö��
                 * dynamicObject - ��̬����
                 *
                 * @return �����������ʽ���ֶε�����
                 */
                getParamType():string;
                /**
                 * �Ƿ�ָ����ʽ
                 * @return "true" - �ǣ�"false" - ��
                 */
                getTarget():string;
                /**
                 * ��ȡ�������ʽ��ֵ
                 * @return �����������ʽ��ֵ
                 */
                getValue():string;
                /**
                 * ֵ��������
                 */
                getValueDataType():string;
                /**
                 * ���ڸ�ʽ���ַ�
                 */
                getValueDateFormat():string;
                /**
                 *   ��ȡֵ���ͣ�1-������2-ֵ
                 * @return ����ֵ������
                 */
                getValueType():string;
            }
            type ConditionDtoExt_T = $.java.io.Serializable & ConditionDtoExt_S & ConditionDtoExt$;
            interface ConditionDtoExt extends ConditionDtoExt_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.common.constants{
            interface WTCRuleEngineConstants_S {
                readonly SOURCE_TYPE_BILL:string;
                readonly SOURCE_TYPE_TIE:string;
                readonly SOURCE_TYPE_TIE_PERIOD:string;
                readonly SOURCE_TYPE_TIE_QUOTA:string;
            }
            interface WTCRuleEngineConstants$ {
            }
            type WTCRuleEngineConstants_T = WTCRuleEngineConstants_S & WTCRuleEngineConstants$;
            interface WTCRuleEngineConstants extends WTCRuleEngineConstants_T {
            }
            interface WTCCommonConstants_S {
                readonly APP_ID_WTABM:string;
                readonly APP_ID_WTAM:string;
                readonly APP_ID_WTBS:string;
                readonly APP_ID_WTIS:string;
                readonly APP_ID_WTOM:string;
                readonly APP_ID_WTP:string;
                readonly APP_ID_WTPM:string;
                readonly APP_ID_WTS:string;
                readonly APP_ID_WTTE:string;
                readonly WTC_CLOUD_ID:string;
            }
            interface WTCCommonConstants$ {
            }
            type WTCCommonConstants_T = WTCCommonConstants_S & WTCCommonConstants$;
            interface WTCCommonConstants extends WTCCommonConstants_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.common.enums{
            enum WTCDateRangeSource {
                IDP,
                VP,
                TP,
                OTP,
                EX
            }
            enum DutyDateErrorEnum {
                NOSHIFT,
                OVER_24,
                INSHIFTOT,
                CROSSSHIFT,
                START_END_ERROR,
                EMPTYSTARTDATE,
                UN_KNOW_ERROR
            }
            enum WTCBillType {
                VA,
                OT,
                BU,
                SU,
                SW
            }
            enum WTCApplyType {
                SELF,
                OTHER
            }
            enum RefDateType {
                TODAY,
                NEXT_DAY,
                PREV_DAY
            }
            enum UserModelType {
                PERSON,
                CMP_PERSON,
                EMP_PERSON,
                DEP_PERSON
            }
        }
        namespace kd.sdk.wtc.wtbs.common.model{
            interface Extendable_S {
            }
            interface Extendable$ {
                /**
                 * ��ȡָ������չ����
                 * @param key ��������
                 * @return ����ֵ
                 */
                getExtAttribute(key:string):any;
                /**
                 * ��ȡ������չ����
                 * @return ��������
                 */
                getExtAttributes():$.java.util.Map;
                /**
                 * ������չ����
                 *
                 * @param key ��������
                 * @param value ����ֵ
                 */
                setExtAttribute(key:string,value:any):void;
            }
            type Extendable_T = Extendable_S & Extendable$;
            interface Extendable extends Extendable_T {
            }
            interface AbstractExtendableObj_S {
            }
            type AbstractExtendableObj_ST = Extendable_S & AbstractExtendableObj_S;
            interface AbstractExtendableObj_C extends AbstractExtendableObj_ST {
                new():AbstractExtendableObj;
            }
            interface AbstractExtendableObj$ {
            }
            type AbstractExtendableObj_T = Extendable & AbstractExtendableObj_S & AbstractExtendableObj$;
            interface AbstractExtendableObj extends AbstractExtendableObj_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.common.timeseq{
            interface TimeSeqInfoExt_S {
            }
            interface TimeSeqInfoExt$ {
                /**
                 * ��Ч����
                 *
                 * @return ��Ч����
                 */
                getBSed():$.java.time.LocalDate;
                /**
                 * ҵ�����id
                 * ͬ������Ψһ��ʶ
                 *
                 * @return ҵ�����id
                 */
                getBid():long;
                /**
                 * ʧЧ���ڣ�������������
                 *
                 * @return ʧЧ����
                 */
                getBlSed():$.java.time.LocalDate;
                /**
                 * �汾id
                 *
                 * @return �汾id
                 */
                getVid?():long;
            }
            type TimeSeqInfoExt_T = IEntityExt & TimeSeqInfoExt_S & TimeSeqInfoExt$;
            interface TimeSeqInfoExt extends TimeSeqInfoExt_T {
            }
            interface TimeSeqVersionExt_S {
            }
            interface TimeSeqVersionExt$ {
                /**
                 * ��ȡҵ�����id
                 * �������ʱ���԰汾����ҵ�����id��ʵ��id��ͬ
                 *
                 * @return ҵ�����id
                 */
                getBid?():long;
                /**
                 * ��ȡʱ����Ϣ
                 * �����ʱ���԰汾����÷������ܷ��� null
                 *
                 * @return ʱ����Ϣ
                 */
                getTimeSeqInfo():TimeSeqInfoExt;
                /**
                 * �Ƿ����ʱ����Ϣ
                 *
                 * @return �������ʱ����Ϣ�򷵻� true
                 */
                hasTimeSeqInfo?():boolean;
            }
            type TimeSeqVersionExt_T = IEntityExt & TimeSeqVersionExt_S & TimeSeqVersionExt$;
            interface TimeSeqVersionExt extends TimeSeqVersionExt_T {
            }
            interface IEntityExt_S {
            }
            interface IEntityExt$ {
                /**
                 * ʵ��id����ͬ���е�Ψһ��ʶ
                 *
                 * @return ʵ��id
                 */
                getId():long;
                /**
                 * ʵ����룬ʵ��������Ϊnull
                 *
                 * @return ʵ�����
                 */
                getNumber():string;
            }
            type IEntityExt_T = IEntityExt_S & IEntityExt$;
            interface IEntityExt extends IEntityExt_T {
            }
        }
        namespace kd.sdk.wtc.wtbs.task{
            interface AfterSubTaskEndEvent_S {
            }
            interface AfterSubTaskEndEvent_C extends AfterSubTaskEndEvent_S {
                new(taskId:long,subTaskId:long,category:string):AfterSubTaskEndEvent;
            }
            interface AfterSubTaskEndEvent$ {
                /**
                 * ��ȡ��������
                 * ��ο�{@link kd.wtc.wtbs.business.task.enums.TaskCategoryEnum}
                 *
                 * @return ��������
                 */
                getCategory():string;
                /**
                 * ��ȡ����������id
                 *
                 * @return ����������id
                 */
                getSubTaskId():long;
                /**
                 * ��ȡ����������id
                 *
                 * @return ����������id
                 */
                getTaskId():long;
            }
            type AfterSubTaskEndEvent_T = AfterSubTaskEndEvent_S & AfterSubTaskEndEvent$;
            interface AfterSubTaskEndEvent extends AfterSubTaskEndEvent_T {
            }
            interface WTCTaskEndExtPlugin_S {
            }
            interface WTCTaskEndExtPlugin$ {
                /**
                 * ������������������¼���֧���ڿ������������������Ի�����չ�߼���
                 * <p>����Ʒ��������������󣬵��ô���չ��������Ի�����չ�߼�</p>
                 * <pre><code>
                 *         Long taskId = afterTaskEndEvent.getTaskId();
                 *         String category = afterTaskEndEvent.getCategory();
                 *         // �ж����������ǿ��ں��㣬TaskCategoryEnum.WTTE_TIE.getCode()
                 *         if (StringUtils.equals(category, "wtte_tie")) {
                 *             // �������������������Ϣ����������ҵ�����
                 *         }
                 * </code></pre>
                 *
                 * @param afterTaskEndEvent ������������������¼�
                 */
                afterTaskEnd(afterTaskEndEvent:AfterTaskEndEvent):void;
            }
            type WTCTaskEndExtPlugin_T = WTCTaskEndExtPlugin_S & WTCTaskEndExtPlugin$;
            interface WTCTaskEndExtPlugin extends WTCTaskEndExtPlugin_T {
            }
            interface WTCSubTaskEndExtPlugin_S {
            }
            interface WTCSubTaskEndExtPlugin$ {
                /**
                 * ������������������¼���֧���ڿ������������������Ի�����չ�߼���
                 * <p>����Ʒ��������������󣬵��ô���չ��������Ի�����չ�߼�</p>
                 * <pre><code>
                 *         Long taskId = afterSubTaskEndEvent.getTaskId();
                 *         Long subTaskId = afterSubTaskEndEvent.getSubTaskId();
                 *         String category = afterSubTaskEndEvent.getCategory();
                 *         // �ж����������ǿ��ں��㣬TaskCategoryEnum.WTTE_TIE.getCode()
                 *         if (StringUtils.equals(category, "wtte_tie")) {
                 *             // �������������������Ϣ����������ҵ�����
                 *         }
                 * </code></pre>
                 *
                 * @param afterSubTaskEndEvent ������������������¼�
                 */
                afterSubTaskEnd(afterSubTaskEndEvent:AfterSubTaskEndEvent):void;
            }
            type WTCSubTaskEndExtPlugin_T = WTCSubTaskEndExtPlugin_S & WTCSubTaskEndExtPlugin$;
            interface WTCSubTaskEndExtPlugin extends WTCSubTaskEndExtPlugin_T {
            }
            interface DispatchTaskResp_S {
            }
            interface DispatchTaskResp$ {
                /**
                 * ������Ϣ
                 * ��������������ʧ�ܺ�Ĵ�����Ϣ
                 * ˵������������ʧ�ܺ�Ĵ�����Ϣ
                 */
                getErrorMsg():string;
                /**
                 * ����id
                 * ��������������ɹ��󷵻ص�����
                 * ˵�����ɹ�ʱ���ص�����id
                 */
                getTaskId():long;
                /**
                 * ����ִ�з���״̬
                 * ����������ִ�з���״̬��true->�ɹ�  false->ʧ��
                 * ˵��������ִ�з���״̬��true->�ɹ�  false->ʧ��
                 */
                isSuccess():boolean;
            }
            type DispatchTaskResp_T = DispatchTaskResp_S & DispatchTaskResp$;
            interface DispatchTaskResp extends DispatchTaskResp_T {
            }
            interface AfterTaskEndEvent_S {
            }
            interface AfterTaskEndEvent_C extends AfterTaskEndEvent_S {
                new(taskId:long,category:string):AfterTaskEndEvent;
            }
            interface AfterTaskEndEvent$ {
                /**
                 * ��ȡ��������
                 * ��ο�{@link kd.wtc.wtbs.business.task.enums.TaskCategoryEnum}
                 *
                 * @return ��������
                 */
                getCategory():string;
                /**
                 * ��ȡ����������id
                 *
                 * @return ����������id
                 */
                getTaskId():long;
            }
            type AfterTaskEndEvent_T = AfterTaskEndEvent_S & AfterTaskEndEvent$;
            interface AfterTaskEndEvent extends AfterTaskEndEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes{
            interface SdkWtcWtesModule_S {
            }
            type SdkWtcWtesModule_ST = $.kd.sdk.module.Module & SdkWtcWtesModule_S;
            interface SdkWtcWtesModule_C extends SdkWtcWtesModule_ST {
                new():SdkWtcWtesModule;
            }
            interface SdkWtcWtesModule$ {
            }
            type SdkWtcWtesModule_T = $.kd.sdk.module.Module & SdkWtcWtesModule_S & SdkWtcWtesModule$;
            interface SdkWtcWtesModule extends SdkWtcWtesModule_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte{
            interface QteRequest_S {
            }
            interface QteRequest$ {
                /**
                 * ���ڵ���BoId�б�
                 */
                getAttFileBoIds():$.java.util.List;
                /**
                 * ���ڵ���id�б�
                 */
                getAttFileIds():$.java.util.List;
                /**
                 * ������id�б�
                 */
                getAttPersonIds():$.java.util.List;
                /**
                 * �Ƿ�У��Ȩ��
                 */
                getCheckAuth():boolean;
                /**
                 * ���񴴽�ʱ��
                 */
                getCreateTime():$.java.time.LocalDateTime;
                /**
                 * ������id
                 */
                getCreateUserId():long;
                /**
                 * ��̬��������
                 */
                getDyQtTypeIds():$.java.util.List;
                /**
                 * ��������
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ���㷽��id
                 */
                getPlanId():long;
                /**
                 * �̶���������
                 */
                getRegQtTypeIds():$.java.util.List;
                /**
                 * �������Ƭindex
                 */
                getShardingIndex():number;
                /**
                 * ��ʼ����
                 */
                getStartDate():$.java.time.LocalDate;
                /**
                 * ������id
                 */
                getSubTaskId():long;
                /**
                 * ������id
                 */
                getTaskId():long;
                /**
                 * ����汾
                 */
                getVersion():string;
            }
            type QteRequest_T = QteRequest_S & QteRequest$;
            interface QteRequest extends QteRequest_T {
            }
            interface QteContextExt_S {
            }
            interface QteContextExt$ {
                /**
                 * ��ȡ��ǰ����Ŀ��ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ��ǰ����Ŀ�����ID/��Ȼ��ID
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ��ǰ��������ڣ���������������
                 */
                getCalculateDate():$.java.time.LocalDate;
                /**
                 * ��ȡ�����Զ����ʼ��������
                 *
                 * @return �����Զ���ĳ�ʼ��������
                 */
                getExtInItData():any;
                /**
                 * ��ȡ��ʼ����Ϣ
                 *
                 * @return ��ʼ������
                 */
                getInitMap():$.java.util.Map;
            }
            type QteContextExt_T = QteContextExt_S & QteContextExt$;
            interface QteContextExt extends QteContextExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.executor{
            interface QuotaDetailOverdrawQl_S {
            }
            type QuotaDetailOverdrawQl_ST = QuotaDetail_S & QuotaDetailOverdrawQl_S;
            interface QuotaDetailOverdrawQl_C extends QuotaDetailOverdrawQl_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailOverdrawQl;
            }
            interface QuotaDetailOverdrawQl$ {
                /**
                 * ��͸֧ʱ��
                 * @param canBeOdValue
                 */
                setCanBeOdValue(canBeOdValue:$.java.math.BigDecimal):void;
                /**
                 * ����͸֧ʱ��
                 * @param ownOdValue
                 */
                setOwnOdValue(ownOdValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailOverdrawQl_T = QuotaDetail & QuotaDetailOverdrawQl_S & QuotaDetailOverdrawQl$;
            interface QuotaDetailOverdrawQl extends QuotaDetailOverdrawQl_T {
            }
            interface QuotaDetailOverdraw_S {
            }
            type QuotaDetailOverdraw_ST = QuotaDetail_S & QuotaDetailOverdraw_S;
            interface QuotaDetailOverdraw_C extends QuotaDetailOverdraw_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailOverdraw;
            }
            interface QuotaDetailOverdraw$ {
                /**
                 * ��͸֧ʱ��
                 * @param canBeOdValue
                 */
                setCanBeOdValue(canBeOdValue:$.java.math.BigDecimal):void;
                /**
                 * ����͸֧ʱ��
                 * @param ownOdValue
                 */
                setOwnOdValue(ownOdValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailOverdraw_T = QuotaDetail & QuotaDetailOverdraw_S & QuotaDetailOverdraw$;
            interface QuotaDetailOverdraw extends QuotaDetailOverdraw_T {
            }
            interface QuotaDetail_S {
            }
            interface QuotaDetail_C extends QuotaDetail_S {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetail;
            }
            interface QuotaDetail$ {
                /**
                 * ���ڵ����汾id
                 * @return
                 */
                getAttFileVid():long;
                /**
                 * ����͸֧ʱ��
                 * @return
                 */
                getCanBeOdValue():$.java.math.BigDecimal;
                /**
                 * ��תʱ��
                 * @return
                 */
                getCarryDownedValue():$.java.math.BigDecimal;
                /**
                 * תн��ʱ��
                 * @return
                 */
                getCarryToBusinessValue():$.java.math.BigDecimal;
                /**
                 * ����֯����ױ����ʼʱ��
                 * @return
                 */
                getChangeSatrt():Date;
                /**
                 * ��ְʱ��
                 * @return
                 */
                getDepartCarryValue():$.java.math.BigDecimal;
                /**
                 * �������
                 * @return
                 */
                getDesc():string;
                /**
                 * ���ɽ���ʱ��
                 * @return
                 */
                getGenEndDate():Date;
                /**
                 * ���ɿ�ʼʱ��
                 * @return
                 */
                getGenStartDate():Date;
                /**
                 * ��׼ʱ��
                 * @return
                 */
                getGenValue():$.java.math.BigDecimal;
                /**
                 *  ������ϸId
                 * @return
                 */
                getId():long;
                /**
                 * ʧЧʱ��
                 * @return
                 */
                getInvalidValue():$.java.math.BigDecimal;
                /**
                 * ������֯id
                 * @return
                 */
                getOrgId():long;
                /**
                 * ����͸֧ʱ��
                 * @return
                 */
                getOwnOdValue():$.java.math.BigDecimal;
                /**
                 * ����ʱ��
                 * @return
                 */
                getOwnValue():$.java.math.BigDecimal;
                /**
                 * ����
                 * @return
                 */
                getPeriodNum():number;
                /**
                 * ��������
                 * @return
                 */
                getQtTypeId():long;
                /**
                 * ����ʱ��
                 * @return
                 */
                getSettlementValue():$.java.math.BigDecimal;
                /**
                 * ��Դ
                 * ϵͳ����	DT-000
                 * ���ڽ�ת	DT-001
                 * �ֶ�	    DT-002
                 * ����͸֧	DT-003
                 * ϵͳ����ʧЧDT-004
                 * @return
                 */
                getSource():string;
                /**
                 * ����ʱ��
                 * @return
                 */
                getUsableValue():$.java.math.BigDecimal;
                /**
                 * ʹ�ý���ʱ��
                 * @return
                 */
                getUseEndDate():Date;
                /**
                 * ʹ�ÿ�ʼʱ��
                 * @return
                 */
                getUseStartDate():Date;
                /**
                 * �ڼ�ѭ������
                 * @return
                 */
                getpCycleId():long;
                /**
                 * �Ƿ����޸�
                 * @return
                 */
                isModify():boolean;
                /**
                 * ���ñ������
                 * @param desc
                 */
                setDesc(desc:string):void;
            }
            type QuotaDetail_T = QuotaDetail_S & QuotaDetail$;
            interface QuotaDetail extends QuotaDetail_T {
            }
            interface QteGenQTExtPlugin_S {
            }
            interface QteGenQTExtPlugin$ {
                /**
                 * �������"��������"-�������ת������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailOverdrawQl��quotaDetails�е�ֵ���д������ء�
                 * ������ִ�н�ת�Ĳ���ʱ�����˽ڵ㡣
                 * ����ͨ���˽ڵ����޸��ѽ�ת������
                 * ����ͨ���˽ڵ����޸����������ת��ϸ����Դ��ϵͳ���ɵģ�
                 * <p>
                 * �ýӿڷ��صġ���תʱ��������ʧЧʱ��������תҵ������ʱ������������ʱ����������ְʱ������������޸ģ�����һ����ϸ�С���תʱ����������ְʱ��������תҵ������ʱ��������ͬʱ����
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *  public void afterOverdrawQlGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *          List<QuotaDetailCarryDwon> list = (List<QuotaDetailCarryDwon>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailCarryDwon detail : list) {
                 *             detail.setCarryValue(three, CarryDwonType.CARRY_TO_BUSINESS, Boolean.TRUE);
                 *              detail.setSettlementValue(BigDecimal.ONE);
                 *              detail.setInvalidValue(totleCarryValue);
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterCarryDwonQlGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-������ְ���㡱����֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailInOut��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailInOut��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�����ʱ������������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *         public void afterInOutGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailInOutGen> list = (List<QuotaDetailInOutGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailInOutGen detail : list) {
                 *             detail.setOwnValue(BigDecimal.ONE);
                 *             detail.setDesc("update in or out value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterInOutGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-�������׼͸֧ʱ��������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailOverdraw��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailOverdraw��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�����͸֧ʱ����������͸֧ʱ������������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *         public void afterOverdrawGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailOverdrawGen> list = (List<QuotaDetailOverdrawGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailOverdrawGen detail : list) {
                 *             detail.setOwnOdValue(BigDecimal.ONE);
                 *             detail.setCanBeOdValue(BigDecimal.ONE);
                 *             detail.setDesc("update overdraw value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterOverdrawGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-��͸֧�޶�������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailOverdrawQl��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailOverdrawQl��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�����͸֧ʱ����������͸֧ʱ������������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *  public void afterOverdrawQlGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailOverdrawQlGen> list = (List<QuotaDetailOverdrawQlGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailOverdrawQlGen detail : list) {
                 *             detail.setOwnOdValue(BigDecimal.ONE);
                 *             detail.setCanBeOdValue(BigDecimal.ONE);
                 *             detail.setDesc("update overdraw  qualification value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterOverdrawQlGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-�������޶�������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailQualification��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailQualification��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�����ʱ������������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *         public void afterQualificationGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailQualificationGen> list = (List<QuotaDetailQualificationGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailQualificationGen detail : list) {
                 *             detail.setChange(true);
                 *             detail.setOwnValue(BigDecimal.ONE);
                 *             detail.setDesc("update qualification value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterQualificationGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-����׼�������ɡ�����֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailStandard��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailStandard��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ���׼ʱ�����������ɿ�ʼʱ�䡱�������ɽ���ʱ�䡱��������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *       public void afterStandardGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailStandardGen> list = (List<QuotaDetailStandardGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailStandardGen detail : list) {
                 *             detail.setGenValue(BigDecimal.ONE);
                 *             detail.setGenEndDate(new Date());
                 *             detail.setGenStartDate(new Date());
                 *             detail.setDesc("update Standard value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterStandardGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-���������ʱ�䷶Χ������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailUse��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailUse��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�ʹ�ÿ�ʼʱ�䡱����ʹ�ý���ʱ�䡱��������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *         public void afterUseGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailUseGen> list = (List<QuotaDetailUseGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailUseGen detail : list) {
                 *             detail.setUseEndDate(new Date());
                 *             detail.setUseStartDate(new Date());
                 *             detail.setDesc("update using value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterUseGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
                /**
                 * �������"��������"-��ʹ���޶�������֮�����øĽӿڡ�
                 * �ɸ���������ݶ���εģ�QuotaDetailUseQualification��quotaDetails�е�ֵ���д������ء�
                 * ����ǰ�ڼ䷢����ҿ���֯������ǿ��ܶ���QuotaDetailUseQualification��
                 * ����ͨ��������֯����ױ����ʼʱ�䡱��ʶ�������ǿ��ǰ���ݣ�
                 * ����ͨ���������汾����������֯����ױ����ʼʱ�䡱��ʶ�������ǿ���֯ǰ���ݡ�
                 * <p>
                 * �ýӿڷ��صġ�����ʱ������������޸ģ�
                 * ���Ӧ�����еĶ�Ӧֵ������滻�����δ�Զ�Ӧ����ֵ�����޸ģ�
                 * �򱣳�ԭ����
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *         public void afterUseQlGen(AfterQteGenQTEvent afterQteGenQTEvent) {
                 *         List<QuotaDetailUseQualificationGen> list = (List<QuotaDetailUseQualificationGen>) afterQteGenQTEvent.getQuotaDetails();
                 *         for (QuotaDetailUseQualificationGen detail : list) {
                 *             detail.setOwnValue(BigDecimal.ONE);
                 *             detail.setDesc("update use qualification value");
                 *         }
                 *     }
                 * </code></pre>
                 * @param afterQteGenQTEvent
                 */
                afterUseQlGen?(afterQteGenQTEvent:AfterQteGenQTEvent):void;
            }
            type QteGenQTExtPlugin_T = QteGenQTExtPlugin_S & QteGenQTExtPlugin$;
            interface QteGenQTExtPlugin extends QteGenQTExtPlugin_T {
            }
            interface QuotaDetailInOut_S {
            }
            type QuotaDetailInOut_ST = QuotaDetail_S & QuotaDetailInOut_S;
            interface QuotaDetailInOut_C extends QuotaDetailInOut_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailInOut;
            }
            interface QuotaDetailInOut$ {
                /**
                 * ����ʱ��
                 * @param ownValue
                 */
                setOwnValue(ownValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailInOut_T = QuotaDetail & QuotaDetailInOut_S & QuotaDetailInOut$;
            interface QuotaDetailInOut extends QuotaDetailInOut_T {
            }
            interface QuotaDetailQualification_S {
            }
            type QuotaDetailQualification_ST = QuotaDetail_S & QuotaDetailQualification_S;
            interface QuotaDetailQualification_C extends QuotaDetailQualification_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailQualification;
            }
            interface QuotaDetailQualification$ {
                /**
                 * ����ʱ��
                 * @param ownValue
                 */
                setOwnValue(ownValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailQualification_T = QuotaDetail & QuotaDetailQualification_S & QuotaDetailQualification$;
            interface QuotaDetailQualification extends QuotaDetailQualification_T {
            }
            interface QuotaDetailStandard_S {
            }
            type QuotaDetailStandard_ST = QuotaDetail_S & QuotaDetailStandard_S;
            interface QuotaDetailStandard_C extends QuotaDetailStandard_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailStandard;
            }
            interface QuotaDetailStandard$ {
                /**
                 * ���ɽ���ʱ��
                 * @param genEndDate
                 */
                setGenEndDate(genEndDate:Date):void;
                /**
                 * ����ʱ��
                 * @param genStartDate
                 */
                setGenStartDate(genStartDate:Date):void;
                /**
                 * ��׼ʱ��
                 * @param genValue
                 */
                setGenValue(genValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailStandard_T = QuotaDetail & QuotaDetailStandard_S & QuotaDetailStandard$;
            interface QuotaDetailStandard extends QuotaDetailStandard_T {
            }
            interface AfterQteGenQTEvent_S {
            }
            interface AfterQteGenQTEvent_C extends AfterQteGenQTEvent_S {
                new(attPersonId:long,calculateDate:$.java.time.LocalDate,matchRule:$.java.util.Map,attFileBid:long,quotaDetails:$.java.util.List,initDataExt:any,initData:$.java.util.Map,lineVar:$.java.util.Map):AfterQteGenQTEvent;
            }
            interface AfterQteGenQTEvent$ {
                /**
                 * ���ڵ���BOID
                 * @return
                 */
                getAttFileBid():long;
                /**
                 * ������id
                 * @return
                 */
                getAttPersonId():long;
                /**
                 * ��������
                 * @return
                 */
                getCalculateDate():$.java.time.LocalDate;
                /**
                 * ��ʼ������
                 * @return
                 */
                getInitData():$.java.util.Map;
                /**
                 * ��չ�ĳ�ʼ��������
                 * @return
                 */
                getInitDataExt():any;
                /**
                 * ��ˮ�߻���
                 * @return
                 */
                getLineVar():$.java.util.Map;
                /**
                 * ��ȡƥ�����
                 * @return
                 */
                getMatchRule():$.java.util.Map;
                getQuotaDetails():$.java.util.List;
            }
            type AfterQteGenQTEvent_T = AfterQteGenQTEvent_S & AfterQteGenQTEvent$;
            interface AfterQteGenQTEvent extends AfterQteGenQTEvent_T {
            }
            interface QuotaDetailUseQualification_S {
            }
            type QuotaDetailUseQualification_ST = QuotaDetail_S & QuotaDetailUseQualification_S;
            interface QuotaDetailUseQualification_C extends QuotaDetailUseQualification_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailUseQualification;
            }
            interface QuotaDetailUseQualification$ {
                setOwnValue(ownValue:$.java.math.BigDecimal):void;
            }
            type QuotaDetailUseQualification_T = QuotaDetail & QuotaDetailUseQualification_S & QuotaDetailUseQualification$;
            interface QuotaDetailUseQualification extends QuotaDetailUseQualification_T {
            }
            interface QuotaDetailUse_S {
            }
            type QuotaDetailUse_ST = QuotaDetail_S & QuotaDetailUse_S;
            interface QuotaDetailUse_C extends QuotaDetailUse_ST {
                new(id:long,attFileVid:long,orgId:long,qtTypeId:long,pCycleId:long,periodNum:number,source:string,genValue:$.java.math.BigDecimal,genStartDate:Date,genEndDate:Date,useStartDate:Date,useEndDate:Date,ownValue:$.java.math.BigDecimal,ownOdValue:$.java.math.BigDecimal,usableValue:$.java.math.BigDecimal,canBeOdValue:$.java.math.BigDecimal,changeSatrt:Date):QuotaDetailUse;
            }
            interface QuotaDetailUse$ {
                /**
                 * ʹ�ý���ʱ��
                 * @param useEndDate
                 */
                setUseEndDate(useEndDate:Date):void;
                /**
                 * ʹ�ÿ�ʼʱ��
                 * @param useStartDate
                 */
                setUseStartDate(useStartDate:Date):void;
            }
            type QuotaDetailUse_T = QuotaDetail & QuotaDetailUse_S & QuotaDetailUse$;
            interface QuotaDetailUse extends QuotaDetailUse_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.gendate{
            interface AfterQteNoGenDateEvent_S {
            }
            interface AfterQteNoGenDateEvent_C extends AfterQteNoGenDateEvent_S {
                new(attPersonId:long,attFileBoId:long,attFileVid:long,noGenDateType:string,baseDate:$.java.time.LocalDate,noGenDate:Date,initDataExt:any,initData:$.java.util.Map):AfterQteNoGenDateEvent;
            }
            interface AfterQteNoGenDateEvent$ {
                /**
                 * ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ���ڵ����汾id,��ǰ�����ڼ���ʹ�õĵ����汾
                 */
                getAttFileVid():long;
                /**
                 * ������bid
                 */
                getAttPersonId():long;
                /**
                 * ��׼����
                 */
                getBaseDate():$.java.time.LocalDate;
                /**
                 * ��ʼ������
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������չ�ĳ�ʼ��������
                 * ֵΪ��ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} �ķ���ֵ��
                 * ע�⣺���øýӿ�ʱ����ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} ���ܻ�δ��ִ�У�
                 */
                getInitDataExt():any;
                /**
                 * �ض�����ǰ���������ڣ�����Ϊ null��
                 * ��Ʒ��������ض�����ǰ����������ֵ������Ƕ�����չ�Ĳο����ڣ���ֵΪnull��
                 */
                getNoGenDate():Date;
                /**
                 * ϵͳ��Ҫ�ض�����ǰ�����ɵ����͡�
                 * ϵͳ�����Ѿ���������ض�����ǰ�����ɵ����Ͷ�Ӧ��ʵ������ֵ�������� {@link #getNoGenDate()} �С�
                 */
                getNoGenDateType():string;
                /**
                 * �����ض�����ǰ����������ֵ.
                 * ������չ��ͨ�����Ǹ��ֶΣ�ʵ����չ
                 *
                 * @param noGenDate �ض�����ǰ����������
                 */
                setNoGenDate(noGenDate:Date):void;
            }
            type AfterQteNoGenDateEvent_T = AfterQteNoGenDateEvent_S & AfterQteNoGenDateEvent$;
            interface AfterQteNoGenDateEvent extends AfterQteNoGenDateEvent_T {
            }
            interface QteNoGenDateResolutionExtPlugin_S {
            }
            interface QteNoGenDateResolutionExtPlugin$ {
                /**
                 * �ض�����ǰ��������չ�ӿڣ���������ڽ����ó��ض�����ǰ������de���ں󣬽���ִ�и÷�����
                 * �ɸ�������е��ض�����ǰ�����������Լ��ض�����ǰ���������ڵ�ֵ�������Ի��������ء�
                 * <p>
                 * �ýӿ������صķ�null�ض�����ǰ���������ڵ�ֵ�����滻ԭ�����������ض�����ǰ���������ڵ�ֵ��
                 * �������null��������㽫��Ȼʹ��ԭֵ���д���
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *     public void afterResolveNoGenDate(AfterQteNoGenDateEvent event) {
                 *         Date noGenDate = queryAllExpandNoGenDate(event.getAttPersonId(), event.getNoGenDateType());
                 *         Date resNoGenDate = noGenDate != null ? noGenDate : event.getNoGenDate();
                 *         event.setNoGenDate(resNoGenDate);
                 *     }
                 *     private Date queryAllExpandNoGenDate(long personBid, String noGenDateType) {
                 *         return personBid % 2 == 1 ? null : new Date();
                 *     }
                 * </code></pre>
                 *
                 * @param event �ض�����ǰ������
                 */
                afterResolveNoGenDate(event:AfterQteNoGenDateEvent):void;
            }
            type QteNoGenDateResolutionExtPlugin_T = QteNoGenDateResolutionExtPlugin_S & QteNoGenDateResolutionExtPlugin$;
            interface QteNoGenDateResolutionExtPlugin extends QteNoGenDateResolutionExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.init{
            interface QteParamInitRequest_S {
            }
            interface QteParamInitRequest_C extends QteParamInitRequest_S {
                new(attPersonIds:$.java.util.List,startDate:$.java.time.LocalDate,endDate:$.java.time.LocalDate,request:QteRequest):QteParamInitRequest;
            }
            interface QteParamInitRequest$ {
                /**
                 * ��Ҫ��ʼ���Ŀ�����id����
                 */
                getAttPersonIds():$.java.util.List;
                /**
                 * ��Ҫ��ʼ���Ľ�������
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * �����������
                 */
                getRequest():QteRequest;
                /**
                 * ��Ҫ��ʼ���Ŀ�ʼ����
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type QteParamInitRequest_T = QteParamInitRequest_S & QteParamInitRequest$;
            interface QteParamInitRequest extends QteParamInitRequest_T {
            }
            interface BeforeQteCycSetInitEvent_S {
            }
            interface BeforeQteCycSetInitEvent_C extends BeforeQteCycSetInitEvent_S {
                new(attPersonId:long,attFileBoId:long,config:kd.sdk.wtc.wtes.business.qte.init.model.CircleConfig,initData:$.java.util.Map):BeforeQteCycSetInitEvent;
            }
            interface BeforeQteCycSetInitEvent$ {
                /**
                 * ����ڼ�ѭ��
                 * @param circleRestValue
                 */
                addCircleRestValue(circleRestValue:kd.sdk.wtc.wtes.business.qte.init.model.CircleRest):void;
                getAttFileBoId():long;
                getAttPersonId():long;
                getCircleRestValues():$.java.util.List;
                getConfig():kd.sdk.wtc.wtes.business.qte.init.model.CircleConfig;
                getInitData():$.java.util.Map;
                isEmptyCircleTag():boolean;
                /**
                 * ���ÿ��ڼ�ѭ��(ע�����������һ���յ�����������ÿ��ڼ䣬���߱�Ʒ��������������ڼ�ѭ��)
                 */
                setEmptyCircleRests():void;
            }
            type BeforeQteCycSetInitEvent_T = BeforeQteCycSetInitEvent_S & BeforeQteCycSetInitEvent$;
            interface BeforeQteCycSetInitEvent extends BeforeQteCycSetInitEvent_T {
            }
            interface QteCycSetInitExtPlugin_S {
            }
            interface QteCycSetInitExtPlugin$ {
                /**
                 * �ڶ������ĳ�ʼ���׶��У��ڼ�ѭ����ʼ����
                 * ͨ��event.getConfig()��ȡ�ڼ�ѭ�����ã�
                 * �����ڼ�ѭ�����뵽addCircleRestValue�У�
                 * �������һ���յ��ڼ�һ��Ҫ����setEmptyCircleRests(),��Ȼ��Ʒ��������������ڼ�ѭ��
                 * @param event �ڼ�ѭ����ʼ��
                 */
                beforeCycsetInit?(event:BeforeQteCycSetInitEvent):void;
            }
            type QteCycSetInitExtPlugin_T = QteCycSetInitExtPlugin_S & QteCycSetInitExtPlugin$;
            interface QteCycSetInitExtPlugin extends QteCycSetInitExtPlugin_T {
            }
            interface AfterQteParamInitEvent_S {
            }
            interface AfterQteParamInitEvent_C extends AfterQteParamInitEvent_S {
                new(category:string,currentInitParam:any,initParamReq:QteParamInitRequest,initData:$.java.util.Map):AfterQteParamInitEvent;
            }
            interface AfterQteParamInitEvent$ {
                /**
                 * Ҫ��ʼ���Ĳ�������
                 */
                getCategory():string;
                /**
                 * ���β�����ʼ��ִ�еĽ��
                 */
                getCurrentInitParam():any;
                /**
                 * ǰ�ý׶εĳ�ʼ������
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������ʼ���������
                 */
                getInitParamReq():QteParamInitRequest;
            }
            type AfterQteParamInitEvent_T = AfterQteParamInitEvent_S & AfterQteParamInitEvent$;
            interface AfterQteParamInitEvent extends AfterQteParamInitEvent_T {
            }
            interface QteParamInitExtPlugin_S {
            }
            interface QteParamInitExtPlugin$ {
                /**
                 * �ڶ�������У�����ʼ���׶����ʱ������ִ�и÷�����
                 * ��ͨ���÷������ظ��Ի���չ�ĳ�ʼ�����ݣ������صĸ��Ի���ʼ�����ں����Ļص��ڵ㶼���ᱻЯ����
                 *
                 * @param event ��ʼ���׶�����¼�
                 */
                afterAllParamInit?(event:AfterQteAllParamInitEvent):void;
                /**
                 * �ڶ������ĳ�ʼ���׶��У���������Ա��ʼ����Ϻ󣬽���ִ�и÷�����
                 * ��ͨ���÷�����չ��ʼ���Ŀ�����Ա���ݡ�
                 *
                 * @param event ������Ա��ʼ������¼�
                 */
                afterParamInit?(event:AfterQteParamInitEvent):void;
            }
            type QteParamInitExtPlugin_T = QteParamInitExtPlugin_S & QteParamInitExtPlugin$;
            interface QteParamInitExtPlugin extends QteParamInitExtPlugin_T {
            }
            interface AfterQteAllParamInitEvent_S {
            }
            interface AfterQteAllParamInitEvent_C extends AfterQteAllParamInitEvent_S {
                new(initRequest:QteRequest,initData:$.java.util.Map):AfterQteAllParamInitEvent;
            }
            interface AfterQteAllParamInitEvent$ {
                /**
                 * ��ǰ��������Ѿ���ʼ���Ĳ���
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������չ�ĳ�ʼ������
                 */
                getInitDataExt():any;
                /**
                 * ������ʼ���������
                 */
                getInitRequest():QteRequest;
                /**
                 * ���ö�����ʼ������
                 *
                 * @param initDataExt ������ʼ������
                 */
                setInitDataExt(initDataExt:any):void;
            }
            type AfterQteAllParamInitEvent_T = AfterQteAllParamInitEvent_S & AfterQteAllParamInitEvent$;
            interface AfterQteAllParamInitEvent extends AfterQteAllParamInitEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.init.model{
            interface DataPoint_S {
            }
            interface DataPoint_C extends DataPoint_S {
                new():DataPoint;
            }
            interface DataPoint$ {
                getAfterValue():any;
                getBeforeValue():any;
                getDate():Date;
                setAfterValue(afterValue:any):void;
                setBeforeValue(beforeValue:any):void;
                setDate(date:Date):void;
            }
            type DataPoint_T = DataPoint_S & DataPoint$;
            interface DataPoint extends DataPoint_T {
            }
            enum CircleUnitEnum {
                CIRCLE_UNIT_DAY,
                CIRCLE_UNIT_WEEK,
                CIRCLE_UNIT_MONTH,
                CIRCLE_UNIT_YEAR,
                CIRCLE_UNIT_PERIOD
            }
            interface QuotaGenConditionExt_S {
                readonly GEN_CONDITION_INIT_KEY:string;
            }
            interface QuotaGenConditionExt_C extends QuotaGenConditionExt_S {
                /**
                 * @param recordDatas
                 */
                new(recordDatas:$.java.util.Map):QuotaGenConditionExt;
            }
            interface QuotaGenConditionExt$ {
                /**
                 * ��ȡ��������ʱ��Ӧ������ֵ
                 *
                 * @param boid          ����Boid
                 * @param calculateDate ����ʱ��(yyyy.MM.dd HH:mm:ss)
                 * @return
                 */
                getConditionValue(boid:long,calculateDate:Date):$.java.util.Map;
            }
            type QuotaGenConditionExt_T = QuotaGenConditionExt_S & QuotaGenConditionExt$;
            interface QuotaGenConditionExt extends QuotaGenConditionExt_T {
            }
            interface CircleConfig_S {
            }
            interface CircleConfig_C extends CircleConfig_S {
                new():CircleConfig;
            }
            interface CircleConfig$ {
                getBeginDate():Date;
                getBeginDateId():long;
                getCirValue():$.java.util.List;
                getCircleUnitEnum():CircleUnitEnum;
                getCount():number;
                getDate():number;
                getEndDate():Date;
                getId():long;
                getInterval():$.java.util.List;
                getIntervalStr():string;
                getIntervalUnit():CircleUnitEnum;
                getMonth():number;
                getMonthDate():number;
                getName():string;
                getPerAttPeriods():$.java.util.List;
                getQtCalEndDate():Date;
                getSelDate():Date;
                getWeekDate():number;
                getYearDate():string;
                isAppointDate():boolean;
                isQtCalCall():boolean;
                setAppointDate(appointDate:boolean):void;
                setBeginDate(beginDate:Date):void;
                setBeginDateId(beginDateId:long):void;
                setCirValue(cirValue:$.java.util.List):void;
                setCircleUnitEnum(circleUnitEnum:CircleUnitEnum):void;
                setCount(count:number):void;
                setDate(date:number):void;
                setEndDate(endDate:Date):void;
                setId(id:long):void;
                setInterval(interval:$.java.util.List):void;
                setIntervalStr(intervalStr:string):void;
                setIntervalUnit(intervalUnit:CircleUnitEnum):void;
                setMonth(month:number):void;
                setMonthDate(monthDate:number):void;
                setName(name:string):void;
                setPerAttPeriods(perAttPeriods:$.java.util.List):void;
                setQtCalCall(qtCalCall:boolean):void;
                setQtCalEndDate(qtCalEndDate:Date):void;
                setSelDate(selDate:Date):void;
                setWeekDate(weekDate:number):void;
                setYearDate(yearDate:string):void;
            }
            type CircleConfig_T = CircleConfig_S & CircleConfig$;
            interface CircleConfig extends CircleConfig_T {
            }
            interface CircleRest_S {
            }
            interface CircleRest_C extends CircleRest_S {
                new():CircleRest;
            }
            interface CircleRest$ {
                getCirValue():number;
                getEndDate():Date;
                getIndex():number;
                getInterval():number;
                getStartDate():Date;
                setCirValue(cirValue:number):void;
                setEndDate(endDate:Date):void;
                setIndex(index:number):void;
                setInterval(interval:number):void;
                setStartDate(startDate:Date):void;
            }
            type CircleRest_T = CircleRest_S & CircleRest$;
            interface CircleRest extends CircleRest_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.refdate{
            interface AfterQteResolveRefDateEvent_S {
            }
            interface AfterQteResolveRefDateEvent_C extends AfterQteResolveRefDateEvent_S {
                new(attPersonId:long,attFileBoId:long,attFileVid:long,baseDate:$.java.time.LocalDate,refDateBaseDataId:long,refDate:Date,initDataExt:any,initData:$.java.util.Map):AfterQteResolveRefDateEvent;
            }
            interface AfterQteResolveRefDateEvent$ {
                /**
                 * ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ���ڵ����汾id,��ǰ�����ڼ���ʹ�õĵ����汾
                 */
                getAttFileVid():long;
                /**
                 * ������bid
                 */
                getAttPersonId():long;
                /**
                 * ��׼����
                 */
                getBaseDate():$.java.time.LocalDate;
                /**
                 * ��ʼ������
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������չ�ĳ�ʼ��������
                 * ֵΪ��ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} �ķ���ֵ��
                 * ע�⣺���øýӿ�ʱ����ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} ���ܻ�δ��ִ�У�
                 */
                getInitDataExt():any;
                /**
                 * �������ڣ�����Ϊ null��
                 * ��Ʒ������Ĳο�����ֵ������Ƕ�����չ�Ĳο����ڣ���ֵΪnull��
                 */
                getRefDate():Date;
                /**
                 * ϵͳ��Ҫ��ȡ�Ĳ������ڵ�id��
                 * ϵͳ�����Ѿ�������ò�������id��Ӧ��ʵ������ֵ�������� {@link #getRefDate()} �С�
                 */
                getRefDateBaseDataId():long;
                /**
                 * ���òο�����ֵ.
                 * ������չ��ͨ�����Ǹ��ֶΣ�ʵ����չ
                 *
                 * @param refDate �ο�����
                 */
                setRefDate(refDate:Date):void;
            }
            type AfterQteResolveRefDateEvent_T = AfterQteResolveRefDateEvent_S & AfterQteResolveRefDateEvent$;
            interface AfterQteResolveRefDateEvent extends AfterQteResolveRefDateEvent_T {
            }
            interface QteRefDateResolutionExtPlugin_S {
            }
            interface QteRefDateResolutionExtPlugin$ {
                /**
                 * ����������չ�ӿڣ���������ڽ����ó��������ں󣬽���ִ�и÷�����
                 * �ɸ�������еĲ�������id�Լ��������ڵ�ֵ�������Ի��������ء�
                 * <p>
                 * �ýӿ������صķ�null��������ֵ�����滻ԭ���������Ĳ�������ֵ��
                 * �������null��������㽫��Ȼʹ��ԭֵ���д���
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *     public void afterResolveRefDate(AfterQteResolveRefDateEvent event) {
                 *         Date refDate = queryAllExpandRefDate(event.getAttPersonId(), event.getRefDateBaseDataId());
                 *         Date resRefDate = refDate != null ? refDate : event.getRefDate();
                 *         event.setRefDate(resRefDate);
                 *     }
                 *     private Date queryAllExpandRefDate(long personBid, long refDateId) {
                 *         return personBid % 2 == 1 ? null : new Date();
                 *     }
                 * </code></pre>
                 *
                 * @param event �����������ɲ���
                 */
                afterResolveRefDate(event:AfterQteResolveRefDateEvent):void;
            }
            type QteRefDateResolutionExtPlugin_T = QteRefDateResolutionExtPlugin_S & QteRefDateResolutionExtPlugin$;
            interface QteRefDateResolutionExtPlugin extends QteRefDateResolutionExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.qte.varcondition{
            interface AfterQteResolveVarConditionEvent_S {
            }
            interface AfterQteResolveVarConditionEvent_C extends AfterQteResolveVarConditionEvent_S {
                new(attPersonId:long,attFileBoId:long,attFileVid:long,baseDate:$.java.time.LocalDate,baseDataIds:$.java.util.Set,varValue:$.java.util.Map,startDay:Date,endDay:Date,initDataExt:any,initData:$.java.util.Map):AfterQteResolveVarConditionEvent;
            }
            interface AfterQteResolveVarConditionEvent$ {
                /**
                 * ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ���ڵ����汾id,��ǰ�����ڼ���ʹ�õĵ����汾
                 */
                getAttFileVid():long;
                /**
                 * ������bid
                 */
                getAttPersonId():long;
                /**
                 * ϵͳ��Ҫ��ȡ�Ĳ������ڵ�id��
                 * ϵͳ�����Ѿ�������ò�������id��Ӧ��ʵ������ֵ�������� {@link #getVarValue(Long)} �С�
                 */
                getBaseDataIds():$.java.util.Set;
                /**
                 * ��׼����
                 */
                getBaseDate():$.java.time.LocalDate;
                /**
                 * ϵͳ�����������ֵ�Ľ������ڡ�
                 * �������������{@link #getStartDay}��{@link #getEndDay}֮��ֵ�Ƕ��٣�
                 */
                getEndDay():Date;
                /**
                 * ��ʼ������
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������չ�ĳ�ʼ��������
                 * ֵΪ��ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} �ķ���ֵ��
                 * ע�⣺���øýӿ�ʱ����ʼ����չ�ӿ� {@link QteParamInitExtPlugin#afterAllParamInit(AfterQteAllParamInitEvent) QTInitExtPlugin#onInitParamFinish} ���ܻ�δ��ִ�У�
                 */
                getInitDataExt():any;
                /**
                 * ϵͳ�����������ֵ�Ŀ�ʼ���ڡ�
                 * �������������{@link #getStartDay()}��{@link #getEndDay()}֮��ֵ�Ƕ��٣�
                 */
                getStartDay():Date;
                /**
                 * ��������ֵ������Ϊ null��
                 * ��Ʒ������ı�������ֵ������Ƕ�����չ�ı�����������ֵΪnull��
                 */
                getVarValue(baseDataId:long):$.java.math.BigDecimal;
                /**
                 * ���ñ�������ֵ.
                 * ������չ��ͨ�����Ǹ��ֶΣ�ʵ����չ
                 *
                 * @param value ��������ֵ
                 */
                setVarValue(baseDataId:long,value:$.java.math.BigDecimal):void;
            }
            type AfterQteResolveVarConditionEvent_T = AfterQteResolveVarConditionEvent_S & AfterQteResolveVarConditionEvent$;
            interface AfterQteResolveVarConditionEvent extends AfterQteResolveVarConditionEvent_T {
            }
            interface QteVarConditionResolutionExtPlugin_S {
            }
            interface QteVarConditionResolutionExtPlugin$ {
                /**
                 * ����������չ�ӿڣ���������ڽ����ó���������ֵ�󣬽���ִ�и÷�����
                 * �ɸ�������еı�������id�Լ�����������ֵ�������Ի��������ء�
                 * <p>
                 * �ýӿ������صķ�null��������ֵ�����滻ԭ���������Ĳ�������ֵ��
                 * �������null��������㽫��Ȼʹ��ԭֵ���д���
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *    public void afterResolveVarValue(AfterQteResolveVarConditionEvent event) {
                 *         Set<Long> baseDataIds = event.getBaseDataIds();
                 *         for (Long baseDataId : baseDataIds) {
                 *             event.setVarValue(baseDataId, BigDecimal.TEN);
                 *         }
                 *     }
                 * </code></pre>
                 *
                 * @param event ��������ֵ���ɲ���
                 */
                afterResolveVarValue(event:AfterQteResolveVarConditionEvent):void;
            }
            type QteVarConditionResolutionExtPlugin_T = QteVarConditionResolutionExtPlugin_S & QteVarConditionResolutionExtPlugin$;
            interface QteVarConditionResolutionExtPlugin extends QteVarConditionResolutionExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.core.chain{
            interface PreLimitCondition_S {
            }
            interface PreLimitCondition$ {
                /**
                 * ����
                 */
                getAge():number;
                /**
                 * �μӹ�������
                 */
                getBeginServiceDate():Date;
                /**
                 * ����Ա�����
                 */
                getDependencyType():long;
                /**
                 * ��ְ����
                 */
                getEntryDate():Date;
                /**
                 * �Ա�
                 */
                getGender():long;
                /**
                 * ְ��
                 */
                getJobGrade():long;
                /**
                 * ְ��
                 */
                getJobLevel():long;
                /**
                 * �ù���ϵ״̬
                 */
                getLaborRelStatus():long;
                /**
                 * ְλ����
                 */
                getObSeq():long;
                /**
                 * ת������
                 */
                getRegularDate():Date;
                /**
                 * ���ڵص�
                 */
                getWorkPlace():long;
            }
            type PreLimitCondition_T = PreLimitCondition_S & PreLimitCondition$;
            interface PreLimitCondition extends PreLimitCondition_T {
            }
            interface TieContentPersistentExt_S {
            }
            interface TieContentPersistentExt$ {
                /**
                 * �����˺����ڻ�ȡ��Ӧ����
                 *
                 * @param attPersonId ������id
                 * @param inDate      ���� ����Ϊ��
                 * @return ���ڵ�����Ϣ
                 */
                getAttFileByAttPersonIdAndDate(attPersonId:long,inDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attfile.AttFileExt;
                /**
                 * ����boId�����ڻ�ȡ������Ŀ
                 *
                 * @param bid       ������ĿboId
                 * @param chainDate ��������
                 * @return ������Ŀ
                 */
                getAttItemSpecExt(bid:long,chainDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt;
                /**
                 * ���ݿ�����ԱID�����ڻ�ȡ��Ӧ�Ŀ�������Ϣ
                 *
                 * @param attPersonId ������ԱID
                 * @param chainDate   ��������
                 * @return ������ԱID�����ڻ�ȡ��Ӧ�Ŀ�������Ϣ
                 */
                getAttendPersonByAttPersonIdAndDate(attPersonId:long,chainDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attenperson.AttendPersonExt;
                /**
                 * ��ȡ�����Զ����ʼ��������
                 *
                 * @return �����Զ���ĳ�ʼ��������
                 */
                getExtInitData():any;
                /**
                 * ������Ա�����ڻ�ȡ��Ӧ���Ű�
                 *
                 * @param chainDate ����
                 * @return �Ű�
                 */
                getRosterExt(attPersonId:long,chainDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.roster.RosterExt;
            }
            type TieContentPersistentExt_T = TieContentPersistentExt_S & TieContentPersistentExt$;
            interface TieContentPersistentExt extends TieContentPersistentExt_T {
            }
            interface TieContextExt_S {
            }
            interface TieContextExt$ {
                /**
                 * ����һ��������Ŀʵ��
                 *
                 * @param boId          ������ĿboId
                 * @param itemValue     ������Ŀֵ
                 * @param day           ������Ŀֵ����λ���죩
                 * @param secondDecimal ������Ŀֵ����λ���룩
                 * @return ������Ŀʵ��
                 */
                genAttItemInstanceExt(boId:long,itemValue:$.java.math.BigDecimal,day:$.java.math.BigDecimal,secondDecimal:$.java.math.BigDecimal):kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemInstanceExt;
                /**
                 * ��ȡ��ǰ����Ŀ��ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ���ݿ����˺����ڻ�ȡ��Ч�Ķ�ڵ���
                 *
                 * @param attPersonId ������id
                 * @param inDate      �汾���ڵ�����
                 * @return ���ڵ����汾
                 */
                getAttFileByAttPersonIdAndDate(attPersonId:long,inDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attfile.AttFileExt;
                /**
                 * ����boId�����ڻ�ȡ��Ч�Ŀ�����Ŀ����汾
                 *
                 * @param boId   ������ĿboId
                 * @param inDate �汾���ڵ�����
                 * @return ������Ŀ����
                 */
                getAttItemSpecExt(boId:long,inDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt;
                /**
                 * ��ȡ��ǰ����Ŀ�����ID/��Ȼ��ID
                 */
                getAttPersonId():long;
                /**
                 * ���ݿ�����ԱID�����ڻ�ȡ��Ӧ�Ŀ�������Ϣ
                 *
                 * @param attPersonId ������ԱID
                 * @param chainDate   ��������
                 * @return ������ԱID�����ڻ�ȡ��Ӧ�Ŀ�������Ϣ
                 */
                getAttendPersonByAttPersonIdAndDate(attPersonId:long,chainDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.attenperson.AttendPersonExt;
                /**
                 * ��ȡ��ǰ��������ڣ����ں����������
                 */
                getCalculateDate():$.java.time.LocalDate;
                /**
                 * ��ȡ�����Զ����ʼ��������
                 *
                 * @return �����Զ���ĳ�ʼ��������
                 */
                getExtInItData():any;
                /**
                 * ��ȡ��ʼ����Ϣ
                 *
                 * @return ��ʼ������
                 */
                getInitMap():$.java.util.Map;
                /**
                 * ���ݿ�����ԱID�����ڻ�ȡ��Ӧ����Ч�����ݣ�����һ�ο��Ͷ�ο���
                 *
                 * @param attPersonId ������ԱID
                 * @param chainDate   ��������
                 * @return ������ԱID�����ڻ�ȡ��Ӧ����Ч������
                 */
                getLogicCardDataByPersonIdAndDate(attPersonId:long,chainDate:$.java.time.LocalDate):$.java.util.List;
                /**
                 * ���ݿ�����Ա�����ڻ�ȡ��Ӧ����Ա�����ڼ�
                 *
                 * @param attPersonId ������ԱID
                 * @param inDate      ��Ա�������ڵ�����
                 * @return ��Ա�����ڼ�
                 */
                getPerAttPeriodByAttPersonIdAndDate(attPersonId:long,inDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.perattperiod.PerAttPeriodExt;
                /**
                 * ���ݿ�����ԱID��ȡ��Ӧ����Ա�����ڼ��б�
                 *
                 * @param attPersonId ������ԱID
                 * @return ��Ӧ�����ڼ��б�
                 */
                getPerAttPeriodListByAttPerson(attPersonId:long):$.java.util.List;
                /**
                 * �������ڻ�ȡ��ǰ�����˶�Ӧ���Ű�
                 *
                 * @param shiftDate �Ű�����
                 * @return �Ű�
                 */
                getRosterExt(shiftDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.roster.RosterExt;
                /**
                 * ���ݿ����˺��Ű����ڻ�ȡ��Ӧ���Ű�
                 *
                 * @param shiftDate �������
                 * @return �Ű�
                 */
                getRosterExt(attPersonId:long,shiftDate:$.java.time.LocalDate):kd.sdk.wtc.wtes.business.tie.model.roster.RosterExt;
            }
            type TieContextExt_T = TieContextExt_S & TieContextExt$;
            interface TieContextExt extends TieContextExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.core.chain.period{
            interface TieAttPeriodContextExt_S {
            }
            interface TieAttPeriodContextExt$ {
                /**
                 * ������Ա�����ڼ���������id��ȡ���ڵ�����Ϣ
                 *
                 * @param primaryId ��Ա�����ڼ���������id
                 * @return ���ڵ�����Ϣ
                 */
                getAttFileByPerAttPeriodId(primaryId:long):kd.sdk.wtc.wtes.business.tie.model.attfile.AttFileExt;
                /**
                 * ����boId�����ڻ�ȡ������Ŀ
                 *
                 * @param bid       ������ĿboId
                 * @param primaryId ��Ա�����ڼ���������id
                 * @return ������Ŀ
                 */
                getAttItemSpecExt(bid:long,primaryId:long):kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt;
                /**
                 * ��ȡ���ں�������
                 *
                 * @return ���ں�������
                 */
                getAttSubjects():$.java.util.List;
                /**
                 * ������Ա�����ڼ���������id��ȡ������Ա��Ϣ
                 *
                 * @param primaryId ��Ա�����ڼ���������id
                 * @return ������Ա��Ϣ
                 */
                getAttendPersonByPerAttPeriodId(primaryId:long):kd.sdk.wtc.wtes.business.tie.model.attenperson.AttendPersonExt;
                /**
                 * ��ȡ����Ҫ�ڼ���ܵ���Ա�����ڼ伯��
                 *
                 * @return ����Ҫ�ڼ���ܵ���Ա�����ڼ伯��
                 */
                getPerAttPeriodList():$.java.util.List;
                /**
                 * ��ȡ���ں����������
                 *
                 * @return ���ں����������
                 */
                getTieRequestExt():kd.sdk.wtc.wtes.business.tie.model.init.TieRequestExt;
            }
            type TieAttPeriodContextExt_T = TieAttPeriodContextExt_S & TieAttPeriodContextExt$;
            interface TieAttPeriodContextExt extends TieAttPeriodContextExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.core.init{
            interface AfterTieAllParamInitEvent_S {
            }
            interface AfterTieAllParamInitEvent_C extends AfterTieAllParamInitEvent_S {
                new(initRequest:kd.sdk.wtc.wtes.business.tie.model.init.TieRequestExt,initData:$.java.util.Map):AfterTieAllParamInitEvent;
            }
            interface AfterTieAllParamInitEvent$ {
                /**
                 * ��ǰ���ں�������Ѿ���ʼ���Ĳ���
                 */
                getInitData():$.java.util.Map;
                /**
                 * ������չ�ĳ�ʼ������
                 */
                getInitDataExt():any;
                /**
                 * ������ʼ���������
                 */
                getInitRequest():kd.sdk.wtc.wtes.business.tie.model.init.TieRequestExt;
                /**
                 * ���ö�����ʼ������
                 *
                 * @param initDataExt ������ʼ������
                 */
                setInitDataExt(initDataExt:any):void;
            }
            type AfterTieAllParamInitEvent_T = AfterTieAllParamInitEvent_S & AfterTieAllParamInitEvent$;
            interface AfterTieAllParamInitEvent extends AfterTieAllParamInitEvent_T {
            }
            interface TieParamInitExtPlugin_S {
            }
            interface TieParamInitExtPlugin$ {
                /**
                 * �ڿ��ں����У�����ʼ���׶����ʱ������ִ�и÷�����
                 *
                 * <p>��ͨ���÷������ظ��Ի���չ�ĳ�ʼ�����ݣ������صĸ��Ի���ʼ�����ں����Ļص��ڵ㶼���ᱻЯ����</p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtes.business.tie.core.init.TieParamInitExtPlugin����չ˵�����˵�·����ҵ����չƽ̨->ҵ����չ����</p>
                 *
                 * @param event ��ʼ���׶�����¼�
                 */
                afterAllParamInit?(event:AfterTieAllParamInitEvent):void;
            }
            type TieParamInitExtPlugin_T = TieParamInitExtPlugin_S & TieParamInitExtPlugin$;
            interface TieParamInitExtPlugin extends TieParamInitExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.att{
            interface AttEvaluatorExpService_S {
            }
            interface AttEvaluatorExpService$ {
                /**
                 * ���ں���Ĳ������ǰ���ô˽ӿڡ�
                 * ��ǰ�ӿڿ�������һЩ�ͻ������Զ���Ŀ�����Ŀֵ���ں���������ɵĿ�����Ŀֵ���뵽��ϸ/������Ŀ��
                 * �����ݿ�����Ŀ����ȷ�����������ϸ��Ŀ�����ڿ��ڼ�¼�洢���յ���ϸ��Ŀֵ������ǻ�����Ŀ����洢���ջ�����Ŀֵ��������ϸ�������Ŀ���򶼻�棩
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *     public void onEvaluateAttendanceEnd(OnEvaluateAttendanceEndEvent endEvent) {
                 *         TieContextExt tieContextExt = endEvent.getTieContextExt();
                 *         LocalDate calculateDate = tieContextExt.getCalculateDate();
                 *         Long bid = 1667665341460901888L; // �˴�дҪ���ɿ��ڼ�¼�Ŀ�����Ŀ��BOID,demoʹ�� �ڼ��ռӰ�_ת���� �Ŀ�����Ŀ
                 *         AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, calculateDate);
                 *         // ��ȡ���պʹ��յ��Ű���Ϣ
                 *         RosterExt rosterExt = tieContextExt.getRosterExt(calculateDate);
                 *         ShiftSpecExt shiftSpec = rosterExt.getShiftSpec();
                 *         RosterExt nextDayrosterExt = tieContextExt.getRosterExt(calculateDate.plusDays(1));
                 *
                 *         // �˴�Ϊdemo����demo��log�����أ����ڿ��ں���ʱ����ִ�п��ܻ�����ϵͳ�ٶ�
                 *         // �������������
                 *         Long attrId = rosterExt.getDateAttributeId();
                 *         // �ڶ������������
                 *         Long nextDayAttrId = nextDayrosterExt.getDateAttributeId();
                 *         // �������͵ڶ��춼���ǽڼ��գ���ֱ�ӷ���;������Ҫ����ʱ��Բ��������ɿ�����Ŀʱ��;1220227377297100800L�ڼ���
                 *         if (!isHolday(nextDayAttrId) && !isHolday(attrId)) {
                 *             return;
                 *         }
                 *
                 *         List<TimeBucketExt> timeBucketExtList = endEvent.getTimeBucketExtList();
                 *         List<AttItemInstanceExt> itemInstanceExtList = Lists.newArrayListWithExpectedSize(timeBucketExtList.size());
                 *
                 *         for (TimeBucketExt timeBucketExt : timeBucketExtList) {
                 *             // �˴�Ϊdemo����demo��log�����أ����ڿ��ں���ʱ����ִ�п��ܻ�����ϵͳ�ٶ�
                 *             LOG.info("timeBucketExt:{}, {}, {}", timeBucketExt.getStartTime(), timeBucketExt.getEndTime(), timeBucketExt.getDateAttribute());
                 *             // �������͵ڶ��춼�ǽڼ��ղ�����ʱ���ֱ�Ӽ��㣻��������ǽڼ��յڶ��첻����Ҫ��ȡʱ��Եĵ���ʱ�Σ�����ڶ������������ǽڼ��յ��첻����Ҫ��ȡʱ��Եĵڶ���ʱ���
                 *             LocalDateTime startTime = timeBucketExt.getStartTime();
                 *             LocalDateTime endTime = timeBucketExt.getEndTime();
                 *             if (!isHolday(nextDayAttrId)) {
                 *                 LocalDateTime localDate = calculateDate.plusDays(1).atStartOfDay();
                 *                 endTime = min(endTime, localDate);
                 *             }
                 *             if (!isHolday(attrId)) {
                 *                 LocalDateTime localDate = calculateDate.plusDays(1).atStartOfDay();
                 *                 startTime = max(startTime, localDate);
                 *             }
                 *             // ���ڿ��ܻ������ʼ����ʱ�䣬�˴�����һ���ж�������������ڼ���ʱ�Σ�ִ����һ�����ڷ�Χ
                 *             if (!startTime.isBefore(endTime)) {
                 *                 continue;
                 *             }
                 *             long millis = Duration.between(startTime, endTime).toMillis();
                 *             BigDecimal secondDecimal = BigDecimal.valueOf(millis / 1000.0d).setScale(6, RoundingMode.HALF_UP);
                 *             BigDecimal dayDecimal = shiftSpec.secondsToDays(secondDecimal);
                 *             AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, secondDecimal, dayDecimal, secondDecimal);
                 *             itemInstanceExtList.add(instanceExt);
                 *         }
                 *         endEvent.setAttItemSpecExtList(itemInstanceExtList);
                 *     }
                 *
                 *     private LocalDateTime max(LocalDateTime... dateTimes) { // ����������,��β�������null
                 *         LocalDateTime max = Arrays.stream(dateTimes).max((d1, d2) -> d1.isAfter(d2) ? 1 : -1).get();
                 *         return max;
                 *     }
                 *
                 *     private LocalDateTime min(LocalDateTime... dateTimes) { // ����������,��β�������null
                 *         LocalDateTime min = Arrays.stream(dateTimes).min((d1, d2) -> d1.isAfter(d2) ? 1 : -1).get();
                 *         return min;
                 *     }
                 *
                 *     private boolean isHolday(long dateAttributeId) { // �Ƿ�ڼ��գ�����ϵͳԤ�õĽڼ�����������ID�ж�
                 *         // ϵͳԤ�õĽڼ�����������ID
                 *         return dateAttributeId == 1220227377297100800L;
                 *     }
                 * </code></pre>
                 *
                 * @param endEvent ���ں�����ں��㲽������¼�
                 */
                onEvaluateAttendanceEnd(endEvent:OnEvaluateAttendanceEndEvent):void;
            }
            type AttEvaluatorExpService_T = AttEvaluatorExpService_S & AttEvaluatorExpService$;
            interface AttEvaluatorExpService extends AttEvaluatorExpService_T {
            }
            interface TieExecAttendanceExtPlugin_S {
            }
            interface TieExecAttendanceExtPlugin$ {
                /**
                 * ���ں����Ʒ����ִ����ɺ����ִ����չ
                 * <p>�����ں��㲽��ִ����ϣ����ɱ�Ʒ������Ŀ�󣬵��ô���չ���������Ի�������Ŀֵ</p>
                 * <pre><code>
                 * // ʾ������Ϊ���ӵ�ǰ�׶εĺϲ�/���ǽ��ȡ������Ŀ�ڼ��ռӰ�_ת����(ID:1667665341460901888)�Ŀ�����Ŀֵ�����������Ŀʱ�����ڲ��ܱ�1Сʱ������ʱ��������һСʱ��
                 * // ����ʱ��Ϊ3700�룬������һ��ʱ��Ϊ3500��ĸÿ�����Ŀ
                 * public void afterExecAttendance(AfterExecAttendanceEvent event) {
                 *         LOG.info("�����㲽����չ�������ڡ�����Σ�{}", JSON.toJSONString(event));
                 *         AfterExecAttendanceParam param = event.getParam();
                 *         TieContextExt tieContextExt = param.getTieContext();
                 *         Map&lt;Long, AttItemInstanceExt> curStageInstances = param.getCurStageInstanceMap(); // �˴�Ϊ��ǰ�׶��Ѽ�����Ŀ�����Ŀ
                 *         Map&lt;Long, AttItemInstanceExt> curChainInstances = param.getCurChainInstanceMap(); // �˴�Ϊ��ǰ�������Ѽ�����Ŀ�����Ŀ
                 *         List&lt;TimeBucketExt> rawTimeBucket = param.getRawTimeBucket(); // �˴�Ϊԭʼʱ���
                 *
                 *         Long bid = 1667665341460901888L; // �˴�дҪ���ɿ��ڼ�¼�Ŀ�����Ŀ��BOID,demoʹ�� �ڼ��ռӰ�_ת���� �Ŀ�����Ŀ
                 *         AttItemInstanceExt attItemInstanceExt = curStageInstances.get(bid);
                 *         AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, tieContextExt.getCalculateDate());
                 *         if (attItemInstanceExt != null && attItemSpecExt != null) {
                 *             BigDecimal sumSecondDecimal = attItemInstanceExt.getSecondDecimal();
                 *             BigDecimal remainder = sumSecondDecimal.remainder(ONE_HOUR_SECONDS);
                 *             if (remainder.compareTo(BigDecimal.ZERO) > 0) {
                 *                 BigDecimal secondDecimal = ONE_HOUR_SECONDS.subtract(remainder);
                 *                 RosterExt rosterExt = tieContextExt.getRosterExt(tieContextExt.getCalculateDate());
                 *                 ShiftSpecExt shiftSpec = rosterExt.getShiftSpec();
                 *                 BigDecimal dayDecimal = shiftSpec.secondsToDays(secondDecimal);
                 *                 AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, secondDecimal, dayDecimal, secondDecimal);
                 *                 event.setTieDataNodeExtList(Lists.newArrayList(instanceExt));
                 *             }
                 *         }
                 *         LOG.info("�����㲽����չ�������ڡ������Σ�{}", JSON.toJSONString(event.getTieDataNodeExtList()));
                 *     }
                 * </code></pre>
                 *
                 * @param event ���ڼ���׶�ִ�н���ʱ��չ�¼�
                 */
                afterExecAttendance(event:AfterExecAttendanceEvent):void;
            }
            type TieExecAttendanceExtPlugin_T = TieExecAttendanceExtPlugin_S & TieExecAttendanceExtPlugin$;
            interface TieExecAttendanceExtPlugin extends TieExecAttendanceExtPlugin_T {
            }
            interface AfterExecAttendanceParam_S {
            }
            interface AfterExecAttendanceParam$ {
                /**
                 * ��ȡ���ڹ������
                 *
                 * @return ���ڹ������
                 */
                getRuleExt():kd.sdk.wtc.wtes.business.tie.model.attconfig.AttRuleExt;
            }
            type AfterExecAttendanceParam_T = kd.sdk.wtc.wtes.business.tie.exexutor.common.AfterExecDailyChainParam & AfterExecAttendanceParam_S & AfterExecAttendanceParam$;
            interface AfterExecAttendanceParam extends AfterExecAttendanceParam_T {
            }
            interface OnEvaluateAttendanceEndEvent_S {
                readonly ADDALL:string;
                readonly OVERROAD:string;
            }
            interface OnEvaluateAttendanceEndEvent_C extends OnEvaluateAttendanceEndEvent_S {
                /**
                 * ���ι��췽�����ӿ���λ��ڸ÷���������
                 * @param tieContextExt ����������
                 * @param timeBucketExtList ʵ�ʳ���ʱ��Թ���
                 */
                new(tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt,timeBucketExtList:$.java.util.List):OnEvaluateAttendanceEndEvent;
            }
            interface OnEvaluateAttendanceEndEvent$ {
                /**
                 * @return �������ɵġ�������Ŀʵ�����б�
                 */
                getAttItemSpecExtList():$.java.util.List;
                /**
                 *  ȡ��ǰ���������е���ǰ�׶β����Ŀ�����Ŀ
                 * @return ��ǰ���������е���ǰ�׶β����Ŀ�����Ŀ
                 */
                getCurrentChainAttItemInstanceExtMap():$.java.util.Map;
                /**
                 * ȡ��ǰ�׶β����Ŀ�����Ŀ
                 * @return ��ǰ�׶β����Ŀ�����Ŀ
                 */
                getCurrentStageAttItemInstanceExtMap():$.java.util.Map;
                getTieContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                /**
                 * ��ȡ�׶δ�����
                 * @return 0-�ϲ���1-���ǣ����ϲ�ʱ�������������ͬ������Ŀ��ʱ��/��Ŀֵ���ϲ�������Ϊ����ʱ�������������ͬ������Ŀ��ʱ��/��Ŀֵʹ�����һ�β����Ľ������
                 */
                getTiePhaseResult():string;
                getTimeBucketExtList():$.java.util.List;
                /**
                 * ���ö������ɵġ�������Ŀʵ�����б�
                 *
                 * @param attItemSpecExtList �������ɵġ�������Ŀʵ�����б�
                 */
                setAttItemSpecExtList(attItemSpecExtList:$.java.util.List):void;
            }
            type OnEvaluateAttendanceEndEvent_T = OnEvaluateAttendanceEndEvent_S & OnEvaluateAttendanceEndEvent$;
            interface OnEvaluateAttendanceEndEvent extends OnEvaluateAttendanceEndEvent_T {
            }
            interface AttEvaluatorExpServiceDefault_S {
            }
            type AttEvaluatorExpServiceDefault_ST = AttEvaluatorExpService_S & AttEvaluatorExpServiceDefault_S;
            interface AttEvaluatorExpServiceDefault_C extends AttEvaluatorExpServiceDefault_ST {
                new():AttEvaluatorExpServiceDefault;
            }
            interface AttEvaluatorExpServiceDefault$ {
            }
            type AttEvaluatorExpServiceDefault_T = AttEvaluatorExpService & AttEvaluatorExpServiceDefault_S & AttEvaluatorExpServiceDefault$;
            interface AttEvaluatorExpServiceDefault extends AttEvaluatorExpServiceDefault_T {
            }
            interface AfterExecAttendanceEvent_S {
            }
            interface AfterExecAttendanceEvent_C extends AfterExecAttendanceEvent_S {
                new(param:AfterExecAttendanceParam):AfterExecAttendanceEvent;
            }
            interface AfterExecAttendanceEvent$ {
                /**
                 * @return ���㲽�����ʱִ����չ����
                 */
                getParam():AfterExecAttendanceParam;
                /**
                 * ��ȡ�������ɵĿ���ʵ���ڵ�
                 *
                 * @return �������ɵĿ���ʵ���ڵ�
                 */
                getTieDataNodeExtList():$.java.util.List;
                /**
                 * ���ö������ɵĿ���ʵ���ڵ�
                 *
                 * @param tieDataNodeExtList �������ɵĿ���ʵ���ڵ�
                 */
                setTieDataNodeExtList(tieDataNodeExtList:$.java.util.List):void;
            }
            type AfterExecAttendanceEvent_T = AfterExecAttendanceEvent_S & AfterExecAttendanceEvent$;
            interface AfterExecAttendanceEvent extends AfterExecAttendanceEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.common{
            interface AfterExecDailyChainParam_S {
                readonly COMBINE:string;
                readonly OVERRIDE:string;
            }
            interface AfterExecDailyChainParam$ {
                /**
                 * �׶δ�����
                 * @return  Ĭ��Ϊ�ϲ�
                 */
                getAttItemResolveMode?():string;
                /**
                 * ��ǰ��������Ʒ��������Ŀֵ
                 *
                 * @return ��ǰ��������Ʒ��������Ŀֵ key- ������Ŀ�����BOID�� value- ������Ŀʵ��
                 */
                getCurChainInstanceMap():$.java.util.Map;
                /**
                 * ��ǰ�׶α�Ʒ��������Ŀֵ
                 *
                 * @return ��ǰ�׶α�Ʒ��������Ŀֵ key- ������Ŀ�����BOID�� value- ������Ŀʵ��
                 */
                getCurStageInstanceMap():$.java.util.Map;
                /**
                 * ��ȡԭʼʱ���
                 *
                 * @return ��ǰ�׶α�Ʒԭʼʱ���
                 */
                getRawTimeBucket():$.java.util.List;
                /**
                 * ��ȡ���ں�����������
                 *
                 * @return ���ں�����������
                 */
                getTieContext():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
            }
            type AfterExecDailyChainParam_T = AfterExecDailyChainParam_S & AfterExecDailyChainParam$;
            interface AfterExecDailyChainParam extends AfterExecDailyChainParam_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.daily{
            interface TieAttDailyEvaluatorExtPlugin_S {
            }
            interface TieAttDailyEvaluatorExtPlugin$ {
                /**
                 *  ���ں����Զ�����㲽��
                 *  <p>ʵ�ִ˷��������ڿ��ں��������ڼ���ܡ��׶�ǰ���һ������</p>
                 *  <pre><code>
                 *  public void doEvaluate(ExecDailyEvaluatorEvent evaluatorEvent) {
                 *     LOG.info("�����㲽����չ�����Զ�����㲽�衿����Σ�{}", JSON.toJSONString(evaluatorEvent));
                 *     Map<Long, AttItemInstanceExt> curChainInstanceMap = evaluatorEvent.getCurChainInstanceMap();
                 *     long bid = 1576185320372699136L; // EX_1140_S:��������
                 *     TieContextExt tieContext = evaluatorEvent.getTieContext();
                 *     AttItemSpecExt attItemSpecExt = tieContext.getAttItemSpecExt(bid, tieContext.getCalculateDate());
                 *     RosterExt rosterExt = tieContext.getRosterExt(tieContext.getCalculateDate());
                 *     ShiftSpecExt shiftSpec = rosterExt.getShiftSpec();
                 *     AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, BigDecimal.ZERO,
                 *             BigDecimal.ONE, shiftSpec.daysToSecondDecimal(BigDecimal.ONE));
                 *     List<AttItemInstanceExt> tieDataNodeList = Lists.newArrayList(instanceExt);
                 *     evaluatorEvent.setTieDataNodeExtList(tieDataNodeList);
                 *     LOG.info("�����㲽����չ�����Զ�����㲽�衿�����Σ�{}", JSON.toJSONString(tieDataNodeList));
                 * }
                 *  </code></pre>
                 *  @param evaluatorEvent ���ں����Զ�����㲽���¼�
                 */
                doEvaluate(evaluatorEvent:ExecDailyEvaluatorEvent):void;
            }
            type TieAttDailyEvaluatorExtPlugin_T = TieAttDailyEvaluatorExtPlugin_S & TieAttDailyEvaluatorExtPlugin$;
            interface TieAttDailyEvaluatorExtPlugin extends TieAttDailyEvaluatorExtPlugin_T {
            }
            interface ExecDailyEvaluatorEvent_S {
            }
            interface ExecDailyEvaluatorEvent$ {
                /**
                 * ��ǰ��������Ʒ��������Ŀֵ
                 *
                 * @return ��ǰ��������Ʒ��������Ŀֵ key- ������Ŀ�����BOID�� value- ������Ŀʵ��
                 */
                getCurChainInstanceMap():$.java.util.Map;
                /**
                 * @return ����������
                 */
                getTieContext():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                /**
                 * ��ȡ�������ɵĿ���ʵ���ڵ�
                 *
                 * @return �������ɵĿ���ʵ���ڵ�
                 */
                getTieDataNodeExtList():$.java.util.List;
                /**
                 * ���ö������ɵĿ���ʵ���ڵ�
                 *
                 * @param tieDataNodeExtList �������ɵĿ���ʵ���ڵ�
                 */
                setTieDataNodeExtList(tieDataNodeExtList:$.java.util.List):void;
            }
            type ExecDailyEvaluatorEvent_T = ExecDailyEvaluatorEvent_S & ExecDailyEvaluatorEvent$;
            interface ExecDailyEvaluatorEvent extends ExecDailyEvaluatorEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.ex{
            interface ExEvaluatorExpService_S {
            }
            interface ExEvaluatorExpService$ {
                /**
                 * �쳣�����ӿ�
                 * @param event
                 */
                extraTimeBucket(event:ExEvaluatorEvent):void;
            }
            type ExEvaluatorExpService_T = ExEvaluatorExpService_S & ExEvaluatorExpService$;
            interface ExEvaluatorExpService extends ExEvaluatorExpService_T {
            }
            interface ExAttItemInstanceExtDTO_S {
            }
            interface ExAttItemInstanceExtDTO_C extends ExAttItemInstanceExtDTO_S {
                /**
                 * �쳣������Ŀ������
                 */
                new():ExAttItemInstanceExtDTO;
                /**
                 * �쳣������Ŀ������
                 *
                 * @param attItemSpecExt ������Ŀ����
                 * @param itemValue      ������Ŀֵ����������Ŀ��λת����Ľ��
                 * @param secondDecimal  ������Ŀֵ����λ���룩
                 */
                new(attItemSpecExt:kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt,itemValue:$.java.math.BigDecimal,secondDecimal:$.java.math.BigDecimal):ExAttItemInstanceExtDTO;
            }
            interface ExAttItemInstanceExtDTO$ {
                /**
                 * ��ȡ������Ŀ����
                 *
                 * @return ������Ŀ����
                 */
                getAttItemSpecExt():kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt;
                /**
                 * �쳣��ʶ
                 *
                 * @return �쳣��ʶ
                 */
                getExFilterType():string;
                /**
                 * ��ȡ�쳣����ʽID
                 *
                 * @return �쳣����ʽID
                 */
                getExProcessId():long;
                /**
                 * ��ȡ�쳣����ID
                 *
                 * @return �쳣����ID
                 */
                getExTypeId():long;
                /**
                 * ��ȡ�쳣������Ŀֵ
                 * <p>
                 * ��ֵ�ǰ�������Ŀ��λת�����
                 *
                 * @return �쳣������Ŀֵ
                 */
                getItemValue():$.java.math.BigDecimal;
                /**
                 * ��ȡ�쳣������Ŀֵ����λ���룩
                 *
                 * @return �쳣������Ŀֵ
                 */
                getSecondDecimal():$.java.math.BigDecimal;
                /**
                 * ��ȡ�������
                 *
                 * @return �������
                 */
                getShiftDate():$.java.time.LocalDate;
                getShiftTimeBucketSeqId():long;
                /**
                 * ��ȡӦ�򿨶�ID
                 *
                 * @return Ӧ�򿨶�ID
                 */
                getShouldPunchCardSeqId():long;
                /**
                 * ��ȡӦ���°࿨��
                 *
                 * @return Ӧ���°࿨��
                 */
                getShouldPunchPointEnd():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ���ϰ࿨��
                 *
                 * @return Ӧ���ϰ࿨��
                 */
                getShouldPunchPointStart():$.java.time.LocalDateTime;
                /**
                 * ������Ŀ����
                 * <p>
                 * ��������Ŀ {@link AttItemSpecExt#dataType()}�Ǵ�������0����ʱ��
                 * ��Ŀֵȡ{@link #getItemValue()}�ֶΣ���ʱ������1����ʱ����Ŀֵȡ{@link #getSecondDecimal()}��
                 *
                 * @param attItemSpecExt ������Ŀ����
                 */
                setAttItemSpecExt(attItemSpecExt:kd.sdk.wtc.wtes.business.tie.model.attitem.AttItemSpecExt):void;
                /**
                 * �����쳣��ʶ
                 * <p>
                 * ���û��ָ���쳣��ʶ����ϵͳ�Զ�����Ϊ�����쳣����4����
                 *
                 * @param exFilterType �쳣��������
                 */
                setExFilterType(exFilterType:string):void;
                /**
                 * �����쳣����ʽ
                 * <p>
                 * ���û��ָ���쳣����ʽ����ʹ�ñ�Ʒ�쳣�����е��쳣����ʽ
                 *
                 * @param exProcessId �쳣����ʽ
                 */
                setExProcessId(exProcessId:long):void;
                /**
                 * �����쳣����
                 * <p>
                 * �쳣���ͱ�������
                 *
                 * @param exTypeId �쳣����ID
                 */
                setExTypeId(exTypeId:long):void;
                /**
                 * ���������쳣������Ŀ��ֵ����λ���Σ�
                 * <p>
                 * ���쳣������Ŀ�Ǵ�������ʱ�����ֶ�ֵ����Ϊnull��
                 *
                 * @param itemValue ���������쳣��Ŀ��ֵ����λ���Σ�
                 */
                setItemValue(itemValue:$.java.math.BigDecimal):void;
                /**
                 * ʱ�������쳣������Ŀ��ֵ����λ���룩
                 * <p>
                 * ���쳣������Ŀ��ʱ������ʱ�����ֶ�ֵ����Ϊnull����λ���������Ŀֵ��ҪתΪ��������ø�ֵ��
                 *
                 * @param secondDecimal ʱ�������쳣��Ŀ��ֵ����λ���룩
                 */
                setSecondDecimal(secondDecimal:$.java.math.BigDecimal):void;
                /**
                 * ���ð������/�Ű�����
                 * <p>
                 * ����İ������ָ�����쳣��Ӧ���Ű�����
                 *
                 * @param shiftDate �������/�Ű�����
                 */
                setShiftDate(shiftDate:$.java.time.LocalDate):void;
                setShiftTimeBucketSeqId(shiftTimeBucketSeqId:long):void;
                /**
                 * ����Ӧ�򿨶�ID
                 * <p>
                 * ȡӦ�򿨶ԣ���wtbd_punchcardpair����ʵ���ID��
                 * ���쳣������Ŀ�ƶ�����Ӧ���ʱ
                 *
                 * @param shouldPunchCardSeqId Ӧ�򿨶�ID
                 */
                setShouldPunchCardSeqId(shouldPunchCardSeqId:long):void;
                /**
                 * ����Ӧ���°࿨��
                 * <p>
                 * ��Ҫ��Ӧ�򿨶�IDͬʱ����
                 *
                 * @param shouldPunchPointEnd Ӧ���°࿨��
                 */
                setShouldPunchPointEnd(shouldPunchPointEnd:$.java.time.LocalDateTime):void;
                /**
                 * ����Ӧ���ϰ࿨��
                 * <p>
                 * ��Ҫ��Ӧ�򿨶�IDͬʱ����
                 *
                 * @param shouldPunchPointStart Ӧ���ϰ࿨��
                 */
                setShouldPunchPointStart(shouldPunchPointStart:$.java.time.LocalDateTime):void;
            }
            type ExAttItemInstanceExtDTO_T = ExAttItemInstanceExtDTO_S & ExAttItemInstanceExtDTO$;
            interface ExAttItemInstanceExtDTO extends ExAttItemInstanceExtDTO_T {
            }
            interface AfterExecExEvent_S {
            }
            interface AfterExecExEvent_C extends AfterExecExEvent_S {
                new(param:AfterExecExParam):AfterExecExEvent;
            }
            interface AfterExecExEvent$ {
                /**
                 * ��ȡ�������ɵ��쳣������Ŀ
                 * <p>
                 * ��Ʒͨ���÷�����ȡ�������ɵ��쳣������Ŀ
                 *
                 * @return �쳣��Ŀ
                 */
                getExAttItemInstances():$.java.util.List;
                /**
                 * ��ȡ�쳣������չ�¼�����
                 *
                 * @return �쳣������չ�¼�����
                 */
                getParam():AfterExecExParam;
                /**
                 * ���ö������ɵ��쳣������Ŀ
                 *
                 * @param exAttItemInstances �������ɵ��쳣������Ŀ
                 */
                setExAttItemInstances(exAttItemInstances:$.java.util.List):void;
            }
            type AfterExecExEvent_T = AfterExecExEvent_S & AfterExecExEvent$;
            interface AfterExecExEvent extends AfterExecExEvent_T {
            }
            interface TieExecExExtPlugin_S {
            }
            interface TieExecExExtPlugin$ {
                /**
                 * ִ�п��ں����쳣�����¼���չ����
                 * <p>
                 * ֧�����쳣�����д�����չ�߼���������������쳣������Ŀ����Ԥ��Ʒ�����ģ�����������쳣������Ŀ���Ʒ����ͬ���쳣������Ŀ��ϲ���
                 * <p>
                 * ʾ��������Բο����ں����쳣������չ����ʾ������չ�������룺kd.sdk.wtc.wtes.business.tie.exexutor.ex.TieExecExExtPlugin
                 * <code><pre>
                 *  public void afterExecEx(AfterExecExEvent event) {
                 *     LOG.info("�����㲽����չ�����쳣������Σ�{}", JSON.toJSONString(event));
                 *     AfterExecExParam param = event.getParam();
                 *     TieContextExt tieContextExt = param.getTieContext();
                 *     List<ExAttItemInstanceExt> exAttItemInstances = param.getExAttItemInstances();
                 *
                 *     // �ٵ��쳣
                 *     Optional<ExAttItemInstanceExt> exAttItemInstanceOpt = exAttItemInstances.stream()
                 *             .filter(exAttItemInstanceExt -> "EX_1010_S".equals(exAttItemInstanceExt.getAttItemSpecExt().getNumber())).findFirst();
                 *
                 *     Long bid = 1576191782905970688L; // �������� ������Ŀ��BOID
                 *     AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, tieContextExt.getCalculateDate());
                 *     if (exAttItemInstanceOpt.isPresent() && attItemSpecExt != null) {
                 *         ExAttItemInstanceExt exAttItemInstance = exAttItemInstanceOpt.get();
                 *         BigDecimal secondDecimal = exAttItemInstance.getSecondDecimal();
                 *         if (secondDecimal.compareTo(HALF_HOUR_SECONDS) > 0) {
                 *             ExAttItemInstanceExtDTO instanceExt = new ExAttItemInstanceExtDTO(attItemSpecExt, BigDecimal.ONE, BigDecimal.ZERO);
                 *             instanceExt.setExTypeId(exAttItemInstance.getExTypeId());
                 *             instanceExt.setExProcessId(exAttItemInstance.getExProcessId());
                 *             instanceExt.setShiftDate(exAttItemInstance.getShiftDate());
                 *             instanceExt.setShouldPunchCardSeqId(exAttItemInstance.getShouldPunchCardSeqId());
                 *             instanceExt.setShouldPunchPointStart(exAttItemInstance.getShouldPunchPointStart());
                 *             instanceExt.setShouldPunchPointEnd(exAttItemInstance.getShouldPunchPointEnd());
                 *             instanceExt.setShiftTimeBucketSeqId(exAttItemInstance.getShiftTimeBucketSeqId());
                 *             event.setExAttItemInstances(Lists.newArrayList(instanceExt));
                 *         } else {
                 *             BigDecimal negate = secondDecimal.negate();
                 *             ExAttItemInstanceExtDTO instanceExt = new ExAttItemInstanceExtDTO(exAttItemInstance.getAttItemSpecExt(), negate, negate);
                 *             instanceExt.setExTypeId(exAttItemInstance.getExTypeId());
                 *             instanceExt.setExProcessId(exAttItemInstance.getExProcessId());
                 *             instanceExt.setShiftDate(exAttItemInstance.getShiftDate());
                 *             instanceExt.setShouldPunchCardSeqId(exAttItemInstance.getShouldPunchCardSeqId());
                 *             instanceExt.setShouldPunchPointStart(exAttItemInstance.getShouldPunchPointStart());
                 *             instanceExt.setShouldPunchPointEnd(exAttItemInstance.getShouldPunchPointEnd());
                 *             instanceExt.setShiftTimeBucketSeqId(exAttItemInstance.getShiftTimeBucketSeqId());
                 *             instanceExt.setExFilterType(exAttItemInstance.getExFilterType());
                 *             event.setExAttItemInstances(Lists.newArrayList(instanceExt));
                 *         }
                 *     }
                 *     LOG.info("�����㲽����չ�����쳣�������Σ�{}", JSON.toJSONString(event.getExAttItemInstances()));
                 * }
                 * </pre></code>
                 *
                 * @param event �쳣����׶�ִ�н���ʱ��չ�¼�
                 */
                afterExecEx(event:AfterExecExEvent):void;
            }
            type TieExecExExtPlugin_T = TieExecExExtPlugin_S & TieExecExExtPlugin$;
            interface TieExecExExtPlugin extends TieExecExExtPlugin_T {
            }
            interface ExEvaluatorEvent_S {
            }
            interface ExEvaluatorEvent_C extends ExEvaluatorEvent_S {
                new():ExEvaluatorEvent;
                new(tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt,shiftSessionExts:$.java.util.List,attBillTimeBuckets:$.java.util.List,logicCards:$.java.util.List):ExEvaluatorEvent;
            }
            interface ExEvaluatorEvent$ {
                getAttBillTimeBuckets():$.java.util.List;
                getAttItemSpecExtList():$.java.util.List;
                getLogicCards():$.java.util.List;
                getShiftSessionExts():$.java.util.List;
                getTieContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                setAttBillTimeBuckets(attBillTimeBuckets:$.java.util.List):void;
                setAttItemSpecExtList(attItemSpecExtList:$.java.util.List):void;
                setLogicCards(logicCards:$.java.util.List):void;
                setShiftSessionExts(shiftSessionExts:$.java.util.List):void;
                setTieContextExt(tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt):void;
            }
            type ExEvaluatorEvent_T = ExEvaluatorEvent_S & ExEvaluatorEvent$;
            interface ExEvaluatorEvent extends ExEvaluatorEvent_T {
            }
            interface ExEvaluatorExpServiceDefault_S {
            }
            type ExEvaluatorExpServiceDefault_ST = ExEvaluatorExpService_S & ExEvaluatorExpServiceDefault_S;
            interface ExEvaluatorExpServiceDefault_C extends ExEvaluatorExpServiceDefault_ST {
                new():ExEvaluatorExpServiceDefault;
            }
            interface ExEvaluatorExpServiceDefault$ {
            }
            type ExEvaluatorExpServiceDefault_T = ExEvaluatorExpService & ExEvaluatorExpServiceDefault_S & ExEvaluatorExpServiceDefault$;
            interface ExEvaluatorExpServiceDefault extends ExEvaluatorExpServiceDefault_T {
            }
            interface AfterExecExParam_S {
            }
            interface AfterExecExParam$ {
                /**
                 * ��ȡ��ǰ�������Ѿ����ɵ��쳣������Ŀ
                 *
                 * @return �쳣������Ŀ
                 */
                getExAttItemInstances():$.java.util.List;
                /**
                 * ��ȡ���ڹ������
                 *
                 * @return ���ڹ������
                 */
                getExRule():kd.sdk.wtc.wtes.business.tie.model.ex.ExRulePackageExt;
            }
            type AfterExecExParam_T = kd.sdk.wtc.wtes.business.tie.exexutor.common.AfterExecDailyChainParam & AfterExecExParam_S & AfterExecExParam$;
            interface AfterExecExParam extends AfterExecExParam_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.otcal{
            interface AfterExecOvertimeParam_S {
            }
            interface AfterExecOvertimeParam$ {
                /**
                 * @return �Ӱ�����������
                 */
                getOtRulePackageExt():kd.sdk.wtc.wtes.business.tie.model.otcal.OtRulePackageExt;
            }
            type AfterExecOvertimeParam_T = kd.sdk.wtc.wtes.business.tie.exexutor.common.AfterExecDailyChainParam & AfterExecOvertimeParam_S & AfterExecOvertimeParam$;
            interface AfterExecOvertimeParam extends AfterExecOvertimeParam_T {
            }
            interface TieExecOvertimeExtPlugin_S {
            }
            interface TieExecOvertimeExtPlugin$ {
                /**
                 * ���ں����Ʒ�Ӱ����ִ����ɺ����ִ����չ
                 * <p>�����ں��㲽��ִ����ϣ����ɱ�Ʒ������Ŀ�󣬵��ô���չ���������Ի�������Ŀֵ</p>
                 * <pre><code>
                 * public void afterExecOvertime(AfterExecOvertimeEvent event) {
                 *     LOG.info("�����㲽����չ�����Ӱࡿ����Σ�{}", JSON.toJSONString(event));
                 *     AfterExecOvertimeParam param = event.getParam();
                 *     TieContextExt tieContextExt = param.getTieContext();
                 *     Map<Long, AttItemInstanceExt> curChainInstances = param.getCurChainInstanceMap(); // ��ǰ�������Ŀ�����Ŀ
                 *     Long exBid = 1667650973922881536L; //OT1_1100_S(�����ռӰ�_ת����)
                 *     Long bid = 1667656552783409152L; // OT1_1130_S�������ռӰ�_ת�Ӱ�ѣ�
                 *     AttItemInstanceExt attItemInstanceExt = curChainInstances.get(exBid);
                 *     AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, tieContextExt.getCalculateDate());
                 *     if (attItemInstanceExt != null && attItemSpecExt != null) {
                 *         AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, attItemInstanceExt.getSecondDecimal(),
                 *                 attItemInstanceExt.getDay(), attItemInstanceExt.getSecondDecimal());
                 *         event.setTieDataNodeExtList(Lists.newArrayList(instanceExt));
                 *     }
                 *     LOG.info("�����㲽����չ�����Ӱࡿ�����Σ�{}", JSON.toJSONString(event.getTieDataNodeExtList()));
                 * }
                 * </code></pre>
                 *
                 * @param event �Ӱ����׶�ִ�н���ʱ��չ�¼�
                 */
                afterExecOvertime(event:AfterExecOvertimeEvent):void;
            }
            type TieExecOvertimeExtPlugin_T = TieExecOvertimeExtPlugin_S & TieExecOvertimeExtPlugin$;
            interface TieExecOvertimeExtPlugin extends TieExecOvertimeExtPlugin_T {
            }
            interface AfterExecOvertimeEvent_S {
            }
            interface AfterExecOvertimeEvent_C extends AfterExecOvertimeEvent_S {
            }
            interface AfterExecOvertimeEvent$ {
                /**
                 * @return �Ӱ���㲽�����ʱִ����չ����
                 */
                getParam():AfterExecOvertimeParam;
                /**
                 * @return �������ɵĿ�����Ŀ
                 */
                getTieDataNodeExtList():$.java.util.List;
                /**
                 * @param tieDataNodeExtList �������ɵĿ�����Ŀ
                 */
                setTieDataNodeExtList(tieDataNodeExtList:$.java.util.List):void;
            }
            type AfterExecOvertimeEvent_T = AfterExecOvertimeEvent_S & AfterExecOvertimeEvent$;
            interface AfterExecOvertimeEvent extends AfterExecOvertimeEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.period{
            interface TieExecPerPeriodSummaryExtPlugin_S {
            }
            interface TieExecPerPeriodSummaryExtPlugin$ {
                /**
                 * ִ���ڼ���ܺ��㲽������¼�������֧���ڱ�Ʒ���ܺ����д�����չ�߼������������������Ļ��ܼ�¼�����������޸�/ɾ����Ʒ�Ļ��ܼ�¼��
                 * <p>֧���ڱ�Ʒ���ܺ����д�����չ�߼������������������Ļ��ܼ�¼�����������޸�/ɾ����Ʒ�Ļ��ܼ�¼��</p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtes.business.tie.exexutor.period.TieExecPerPeriodSummaryExtPlugin��չ˵�����˵�·����ҵ����չƽ̨-ҵ����չ����</p>
                 *
                 * @param tieAttPeriodContextExt �ڼ����������
                 * @param attPeriodItemInstanceMap �ڼ���ܽ������Ա�����ڼ����  key �� ��Ա�����ڼ�id��value �� �ڼ���ܽ���б�
                 * @return �ڼ���ܽ������Ա�����ڼ���� key �� ��Ա�����ڼ�id ��Ա�����ڼ��������Ա�����ڼ��б��У�value �� �ڼ���ܽ���б� �� ������Ŀ���ͱ����ǻ��ܻ���ܼ���ϸ������Ŀ
                 */
                afterExecPerPeriodSummary(tieAttPeriodContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt,attPeriodItemInstanceMap:$.java.util.Map):$.java.util.Map;
            }
            type TieExecPerPeriodSummaryExtPlugin_T = TieExecPerPeriodSummaryExtPlugin_S & TieExecPerPeriodSummaryExtPlugin$;
            interface TieExecPerPeriodSummaryExtPlugin extends TieExecPerPeriodSummaryExtPlugin_T {
            }
            interface TieAttPeriodEvaluatorExt_S {
            }
            interface TieAttPeriodEvaluatorExt$ {
                /**
                 * ִ���ڼ���ܺ��㲽������¼�����
                 *
                 * <p>֧���ڱ�Ʒ���ܺ��㲽�����������չ�߼������������������Ļ��ܼ�¼�����������޸�/ɾ����Ʒ�Ļ��ܼ�¼/p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 * @param tieAttPeriodContextExt �ڼ����������
                 * @param attPeriodItemInstanceMap �ڼ���ܽ������Ա�����ڼ����  key �� ��Ա�����ڼ�id��value �� �ڼ���ܽ���б�
                 * @return �ڼ���ܽ������Ա�����ڼ���� key �� ��Ա�����ڼ�id ��Ա�����ڼ��������Ա�����ڼ��б��У�value �� �ڼ���ܽ���б� �� ������Ŀ���ͱ����ǻ��ܻ���ܼ���ϸ������Ŀ
                 */
                doEvaluate(tieAttPeriodContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt,attPeriodItemInstanceMap:$.java.util.Map):$.java.util.Map;
            }
            type TieAttPeriodEvaluatorExt_T = TieAttPeriodEvaluatorExt_S & TieAttPeriodEvaluatorExt$;
            interface TieAttPeriodEvaluatorExt extends TieAttPeriodEvaluatorExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.tvl{
            interface AfterExecBusinessTripEvent_S {
            }
            interface AfterExecBusinessTripEvent_C extends AfterExecBusinessTripEvent_S {
            }
            interface AfterExecBusinessTripEvent$ {
                /**
                 * @return ������㲽�����ʱִ����չ����
                 */
                getParam():AfterExecBusinessTripParam;
                /**
                 * ��ȡ�������ɵĿ���ʵ���ڵ�
                 *
                 * @return �������ɵĿ���ʵ���ڵ�
                 */
                getTieDataNodeExtList():$.java.util.List;
                /**
                 * ���ö������ɵĿ���ʵ���ڵ�
                 *
                 * @param tieDataNodeExtList �������ɵĿ���ʵ���ڵ�
                 */
                setTieDataNodeExtList(tieDataNodeExtList:$.java.util.List):void;
            }
            type AfterExecBusinessTripEvent_T = AfterExecBusinessTripEvent_S & AfterExecBusinessTripEvent$;
            interface AfterExecBusinessTripEvent extends AfterExecBusinessTripEvent_T {
            }
            interface AfterExecBusinessTripParam_S {
            }
            interface AfterExecBusinessTripParam$ {
                /**
                 * ��ȡ�ݼٹ������
                 *
                 * @return �ݼٹ������
                 */
                getExRuleExt():kd.sdk.wtc.wtes.business.tie.model.tvl.TravelRuleExt;
            }
            type AfterExecBusinessTripParam_T = kd.sdk.wtc.wtes.business.tie.exexutor.common.AfterExecDailyChainParam & AfterExecBusinessTripParam_S & AfterExecBusinessTripParam$;
            interface AfterExecBusinessTripParam extends AfterExecBusinessTripParam_T {
            }
            interface TieExecBusinessTripExtPlugin_S {
            }
            interface TieExecBusinessTripExtPlugin$ {
                /**
                 * ���ں����Ʒ�쳣ת������ִ����ɺ����ִ����չ
                 * <p>�����ں��㲽��ִ����ϣ����ɱ�Ʒ������Ŀ�󣬵��ô���չ���������Ի�������Ŀֵ</p>
                 * <pre><code>
                 *  // ��ǰ��չ��DEMO���ܣ�
                 *  // ��ǰ����׶εĿ�����ĿBT_1040_S���������_���ʱ�� ID:1610167120157573120������������ʱ�������>28800�루8Сʱ����������������ID:1616554563408645120L��+1
                 * public void afterExecBusinessTrip(AfterExecBusinessTripEvent event) {
                 *     LOG.info("�����㲽����չ�����������Σ�{}", JSON.toJSONString(event));
                 *     AfterExecBusinessTripParam param = event.getParam();
                 *     TieContextExt tieContextExt = param.getTieContext();
                 *     Map<Long, AttItemInstanceExt> curStageInstances = param.getCurStageInstanceMap(); // ��ǰ�׶μ��������Ŀֵ
                 *     Map<Long, AttItemInstanceExt> curChainInstances = param.getCurChainInstanceMap(); // ��ǰ���������������Ŀֵ
                 *     List<TimeBucketExt> rawTimebucket = param.getRawTimeBucket(); // ԭʼʱ���
                 *     Long exBid = 1610167120157573120L; // ���ڳ���_���ʱ����BID
                 *     Long bid = 1616554563408645120L; // �˴�дҪ���ɿ��ڼ�¼�Ŀ�����Ŀ��BOID,demoʹ�� ���������� �Ŀ�����Ŀ
                 *     AttItemInstanceExt attItemInstanceExt = curStageInstances.get(exBid);
                 *
                 *     AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, tieContextExt.getCalculateDate());
                 *     if (attItemInstanceExt != null && attItemSpecExt != null) {
                 *         BigDecimal sumDayDecimal = attItemInstanceExt.getDay();
                 *         BigDecimal sumSecondDecimal = attItemInstanceExt.getSecondDecimal();
                 *         if (sumSecondDecimal.compareTo(ONE_HOUR_SECONDS.multiply(BigDecimal.valueOf(8))) > 0) {
                 *             AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, BigDecimal.ONE, BigDecimal.ZERO, BigDecimal.ZERO);
                 *             event.setTieDataNodeExtList(Lists.newArrayList(instanceExt));
                 *         }
                 *     }
                 *     LOG.info("�����㲽����չ������������Σ�{}", JSON.toJSONString(event.getTieDataNodeExtList()));
                 * }
                 * </code></pre>
                 *
                 * @param event �������׶�ִ�н���ʱ��չ�¼�
                 */
                afterExecBusinessTrip(event:AfterExecBusinessTripEvent):void;
            }
            type TieExecBusinessTripExtPlugin_T = TieExecBusinessTripExtPlugin_S & TieExecBusinessTripExtPlugin$;
            interface TieExecBusinessTripExtPlugin extends TieExecBusinessTripExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.exexutor.va{
            interface TieExecVacationExtPlugin_S {
            }
            interface TieExecVacationExtPlugin$ {
                /**
                 * ���ں����Ʒ�ݼٺ��㲽��ִ����ɺ����ִ����չ
                 * <p>�����ں��㲽��ִ����ϣ����ɱ�Ʒ������Ŀ�󣬵��ô���չ���������Ի�������Ŀֵ</p>
                 * <pre><code>
                 *  public void afterExecVacation(AfterExecVacationEvent event) {
                 *      LOG.info("�����㲽����չ�����ݼ١�����Σ�{}", JSON.toJSONString(event));
                 *      AfterExecVacationParam param = event.getParam();
                 *      TieContextExt tieContextExt = param.getTieContext();
                 *      Map<Long, AttItemInstanceExt> curStageInstances = param.getCurStageInstanceMap();
                 *      Map<Long, AttItemInstanceExt> curChainInstances = param.getCurChainInstanceMap(); // ��ǰ��������ʱ��
                 *      List<TimeBucketExt> rawTimebucket = param.getRawTimeBucket();
                 *
                 *      Long exBid = 1428132636110356480L; // LE_1170_S���¼�_���ʱ����
                 *      Long bid = 1428132636110356480L; // �˴�дҪ���ɿ��ڼ�¼�Ŀ�����Ŀ��BOID,demoʹ�� ����ʱ�� �Ŀ�����Ŀ
                 *      AttItemInstanceExt attItemInstanceExt = curChainInstances.get(exBid);
                 *
                 *      AttItemSpecExt attItemSpecExt = tieContextExt.getAttItemSpecExt(bid, tieContextExt.getCalculateDate());
                 *      if (attItemInstanceExt != null && attItemSpecExt != null) {
                 *          BigDecimal sumSecondDecimal = attItemInstanceExt.getSecondDecimal();
                 *          if (sumSecondDecimal.compareTo(BigDecimal.ZERO) > 0 && sumSecondDecimal.compareTo(ONE_HOUR_SECONDS) < 0) {
                 *              RosterExt rosterExt = tieContextExt.getRosterExt(tieContextExt.getAttPersonId(), tieContextExt.getCalculateDate());
                 *              ShiftSpecExt shiftSpec = rosterExt.getShiftSpec();
                 *              AttItemInstanceExt instanceExt = new AttItemInstanceExt(attItemSpecExt, ONE_HOUR_SECONDS.subtract(sumSecondDecimal), shiftSpec.secondsToDays(ONE_HOUR_SECONDS.subtract(sumSecondDecimal)), ONE_HOUR_SECONDS.subtract(sumSecondDecimal));
                 *              event.setTieDataNodeExtList(Lists.newArrayList(instanceExt));
                 *          }
                 *      }
                 *      LOG.info("�����㲽����չ�����ݼ١������Σ�{}", JSON.toJSONString(event.getTieDataNodeExtList()));
                 *  }
                 * </code></pre>
                 *
                 * @param event �ݼٽ׶�ִ�н���ʱ��չ�¼�
                 */
                afterExecVacation(event:AfterExecVacationEvent):void;
            }
            type TieExecVacationExtPlugin_T = TieExecVacationExtPlugin_S & TieExecVacationExtPlugin$;
            interface TieExecVacationExtPlugin extends TieExecVacationExtPlugin_T {
            }
            interface AfterExecVacationEvent_S {
            }
            interface AfterExecVacationEvent_C extends AfterExecVacationEvent_S {
            }
            interface AfterExecVacationEvent$ {
                /**
                 * @return �ݼٲ���ִ�н���ʱ��չ�¼�����
                 */
                getParam():AfterExecVacationParam;
                /**
                 * ��ȡ�������ɵĿ���ʵ���ڵ�
                 *
                 * @return �������ɵĿ���ʵ���ڵ�
                 */
                getTieDataNodeExtList():$.java.util.List;
                /**
                 * ���ö������ɵĿ���ʵ���ڵ�
                 *
                 * @param tieDataNodeExtList �������ɵĿ���ʵ���ڵ�
                 */
                setTieDataNodeExtList(tieDataNodeExtList:$.java.util.List):void;
            }
            type AfterExecVacationEvent_T = AfterExecVacationEvent_S & AfterExecVacationEvent$;
            interface AfterExecVacationEvent extends AfterExecVacationEvent_T {
            }
            interface AfterExecVacationParam_S {
            }
            interface AfterExecVacationParam$ {
                /**
                 * ��ȡ�ݼٹ������
                 *
                 * @return �ݼٹ������
                 */
                getVaRuleExt():kd.sdk.wtc.wtes.business.tie.model.va.VaRulePackageExt;
            }
            type AfterExecVacationParam_T = kd.sdk.wtc.wtes.business.tie.exexutor.common.AfterExecDailyChainParam & AfterExecVacationParam_S & AfterExecVacationParam$;
            interface AfterExecVacationParam extends AfterExecVacationParam_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.accountplan{
            interface TieSchemeExtPlugin_S {
            }
            interface TieSchemeExtPlugin$ {
                /**
                 * ֧������������ϸ���㲽��ִ�к�ִ����չ���裬Ч���൱���ڡ��ڼ���ܡ��׶�ǰ����һ����չ���裻
                 *
                 * <p>֧������������ϸ���㲽��ִ�к�ִ����չ���裬Ч���൱���ڡ��ڼ���ܡ��׶�ǰ����һ����չ����</p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtes.business.tie.init.accountplan.TieSchemeExtPlugin��չ˵�����˵�·����ҵ����չƽ̨-ҵ����չ����</p>
                 *
                 * @param tieSchemeExt ���㷽��
                 */
                onBuildDailyChain(tieSchemeExt:kd.sdk.wtc.wtes.business.tie.model.accountplan.TieSchemeExt):void;
                /**
                 * ֧�������л��ܺ��㲽��ִ�к�ִ����չ���裬Ч���൱���ڡ��ڼ���ܵ������׶κ�����һ����չ���裻
                 *
                 * <p>֧������������ϸ���㲽��ִ�к�ִ����չ���裬Ч���൱���ڡ��ڼ���ܵ������׶�ǰ����һ����չ����</p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtes.business.tie.init.accountplan.TieSchemeExtPlugin��չ˵�����˵�·����ҵ����չƽ̨-ҵ����չ����</p>
                 *
                 * @param tieSchemeExt ���㷽��
                 */
                onBuildPeriodChain(tieSchemeExt:kd.sdk.wtc.wtes.business.tie.model.accountplan.TieSchemeExt):void;
            }
            type TieSchemeExtPlugin_T = TieSchemeExtPlugin_S & TieSchemeExtPlugin$;
            interface TieSchemeExtPlugin extends TieSchemeExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.attfile{
            interface OnQueryInitParamOfAttFileEvent_S {
            }
            interface OnQueryInitParamOfAttFileEvent_C extends OnQueryInitParamOfAttFileEvent_S {
                new(attFileQueryParam:AttFileQueryParamExt):OnQueryInitParamOfAttFileEvent;
            }
            interface OnQueryInitParamOfAttFileEvent$ {
                getAttFileQueryParam():AttFileQueryParamExt;
                getExtKeys():$.java.util.Set;
                setExtKeys(extKeys:$.java.util.Set):void;
            }
            type OnQueryInitParamOfAttFileEvent_T = OnQueryInitParamOfAttFileEvent_S & OnQueryInitParamOfAttFileEvent$;
            interface OnQueryInitParamOfAttFileEvent extends OnQueryInitParamOfAttFileEvent_T {
            }
            interface AttFileQueryParamExt_S {
            }
            interface AttFileQueryParamExt$ {
                /**
                 * ��ȡ��ѯ�����Ŀ����˼���
                 *
                 * @return Ҫ��ѯ�Ŀ����˼���
                 */
                getAttPersonSetIds():$.java.util.Set;
                /**
                 * ��ȡ��ѯ�����Ľ���ʱ��
                 *
                 * @return ����ʱ��
                 */
                getEndDate():Date;
                /**
                 * ��ȡʵ��ʵ�ֵ�ʵ��
                 * @return ʵ��ʵ��
                 */
                getInstance():any;
                /**
                 * ��ȡ��ѯ�����Ŀ�ʼʱ��
                 *
                 * @return ��ʼʱ��
                 */
                getStartDate():Date;
                /**
                 * ���ò�ѯ�Ŀ����˼��ϣ���������˻Ḳ��ϵͳ�ģ���������û���ϵͳ��
                 *
                 * @param personSetIds ��ѯ�Ŀ����˼���
                 */
                setAttPersonSetIds(personSetIds:$.java.util.Set):void;
                /**
                 * ���ò�ѯ�Ľ���ʱ�䣬��������˻Ḳ��ϵͳ�ģ���������û���ϵͳ��
                 *
                 * @param endDate ����ʱ��
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ���������Ĳ�ѯ������Ĭ���ǿյ�
                 * <pre><code>
                 *     // �������ò�ѯ����������״̬
                 *      QFilter attPersonIdsFilter =  new QFilter(WTCCommonConstants.DATASTATUS, QCP.in, dataStatus)
                 * </code></pre>
                 *
                 * @param qFilter ���������Ĺ�������
                 */
                setQFilter(qFilter:$.kd.bos.orm.query.QFilter):void;
                /**
                 * ���ò�ѯ�����Ŀ�ʼʱ�䣬��������˻Ḳ��ϵͳ�ģ���������û���ϵͳ��
                 *
                 * @param startDate ��ʼʱ��
                 */
                setStartDate(startDate:Date):void;
            }
            type AttFileQueryParamExt_T = AttFileQueryParamExt_S & AttFileQueryParamExt$;
            interface AttFileQueryParamExt extends AttFileQueryParamExt_T {
            }
            interface TieInitAttFileExtPlugin_S {
            }
            interface TieInitAttFileExtPlugin$ {
                /**
                 * ���ں��㿼�ڵ�����ʼ����չ����
                 *
                 * <p>���ں���ʱ����Ҫ��׼�����ݣ����ӿ������ڿ��ڵ�������׼���Ĳ�ѯ��������</p>
                 * <pre><code>
                 *      Set<String> extKeys ֧�ֲ�ѯʱ��չ�Ĳ�ѯ�ֶΣ���չ�����Ա����� ����Ԫ���ݣ�wtp_attfilebase�� �����չ����
                 *      AttFileQueryParamExt  �ṩ��ѯ����������һЩ��ѯ������
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *
                 *  public void onQueryAttFile(OnQueryInitParamOfAttFileEvent event) {
                 *      // ��ѯʱ���Ӷ���Ŀ����˲�ѯ
                 *      event.getAttFileQueryParam().getAttPersonSetIds().add(1863000118957967360L);
                 *      // ��չ�ֶ����ӹ��ţ���չ�ֶα������Ե�����wtp_attfilebase��
                 *      event.setExtKeys(Sets.newHashSet("extkey01"));
                 *  }
                 *
                 * </code></pre>
                 *
                 * @param event ��չ���
                 */
                onQueryAttFile(event:OnQueryInitParamOfAttFileEvent):void;
            }
            type TieInitAttFileExtPlugin_T = TieInitAttFileExtPlugin_S & TieInitAttFileExtPlugin$;
            interface TieInitAttFileExtPlugin extends TieInitAttFileExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.attitemspec{
            interface TieInitAttItemSpecExtPlugin_S {
            }
            interface TieInitAttItemSpecExtPlugin$ {
                /**
                 * ִ�в�ѯ������Ŀ��ʼ������ǰ���¼�������֧���޸�Ԥ�ú��������������ѯ�ֶ�
                 *
                 * <p>ִ�в�ѯ������Ŀ��ʼ������ǰ���¼�������֧���޸�Ԥ�ú��������������ѯ�ֶ�</p>
                 * <pre><code>
                 *      Set<String> extKeys ֧�ֲ�ѯʱ��չ�Ĳ�ѯ�ֶΣ���չ�����Ա����� ������ĿԪ���ݣ�wtbd_attitem�� �����չ����
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *    // ����Ҫ������չ�ֶ� ������"extkey01"
                 *    event.setExtKeys(Sets.newHashSet("extkey01"));
                 * </code></pre>
                 *
                 * @param event ��չ���
                 */
                onQueryAttItemSpec(event:OnQueryInitParamOfAttItemSpecEvent):void;
            }
            type TieInitAttItemSpecExtPlugin_T = TieInitAttItemSpecExtPlugin_S & TieInitAttItemSpecExtPlugin$;
            interface TieInitAttItemSpecExtPlugin extends TieInitAttItemSpecExtPlugin_T {
            }
            interface OnQueryInitParamOfAttItemSpecEvent_S {
            }
            interface OnQueryInitParamOfAttItemSpecEvent_C extends OnQueryInitParamOfAttItemSpecEvent_S {
                new():OnQueryInitParamOfAttItemSpecEvent;
            }
            interface OnQueryInitParamOfAttItemSpecEvent$ {
                getExtKeys():$.java.util.Set;
                setExtKeys(extKeys:$.java.util.Set):void;
            }
            type OnQueryInitParamOfAttItemSpecEvent_T = OnQueryInitParamOfAttItemSpecEvent_S & OnQueryInitParamOfAttItemSpecEvent$;
            interface OnQueryInitParamOfAttItemSpecEvent extends OnQueryInitParamOfAttItemSpecEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.bill{
            interface VaTimeBucketSplitExtPlugin_S {
            }
            interface VaTimeBucketSplitExtPlugin$ {
                /**
                 * �ݼٵ���ʱ����Ϣ��ʼ��ʱ���ô˽ӿڡ�
                 * ��ǰ�ӿڿ��Դ����Ʒ�Ѳ�����ݼٵ���ʱ��ԣ���ʱ������µ������,��Ӱ�쵽�ݼٵĿ��ں���Ͷ��������
                 * <p>ʾ��������Բο��ݼ����뵥���ص��ж���չ����ʾ������չ�������룺kd.sdk.wtc.wtes.business.tie.init.bill.TieInitializerVaTimeBucketSplitExtPlugin</p>
                 *
                 * @param onSplitVaBillTimeBucketEvent ����ʱ��ʼ���ݼٵ��ݲ���¼�
                 */
                onSplitVaBillTimeBucket(onSplitVaBillTimeBucketEvent:OnVaBillTimeBucketSplitEvent):void;
            }
            type VaTimeBucketSplitExtPlugin_T = VaTimeBucketSplitExtPlugin_S & VaTimeBucketSplitExtPlugin$;
            interface VaTimeBucketSplitExtPlugin extends VaTimeBucketSplitExtPlugin_T {
            }
            interface OnVaBillTimeBucketSplitEvent_S {
            }
            interface OnVaBillTimeBucketSplitEvent_C extends OnVaBillTimeBucketSplitEvent_S {
            }
            interface OnVaBillTimeBucketSplitEvent$ {
                /**
                 * ��ȡ����ʱ����Ϣ
                 *
                 * @return ����ʱ����Ϣ
                 */
                getAttBillTimeBucketExtList():$.java.util.List;
                /**
                 * ��ȡ �Ű����
                 *
                 * @return �Ű����
                 */
                getShiftTableExt():kd.sdk.wtc.wtes.business.tie.model.roster.ShiftTableExt;
                /**
                 * ��ȡ��ѯ�����ݼٵ����б�����ʱ����Ǹ����ݼٵ��ݲ�ֳ�����
                 *
                 * @return ��ѯ�����ݼٵ����б�
                 */
                getVaBillDyns():$.java.util.List;
                /**
                 * ���� ����ʱ����Ϣ���������ʱ���ѵ���ʱ����Ϣ�����д���˴�
                 * @param attBillTimeBucketExtList ����ʱ����Ϣ
                 */
                setAttBillTimeBucketExtList(attBillTimeBucketExtList:$.java.util.List):void;
                /**
                 * �����Ƿ�ȡ��������ԣ���ȡ��ʱ����ʹ�ñ�Ʒ��Խ��
                 *
                 * @param cancel true-��;false-�� ;Ĭ��false
                 */
                setCancel(cancel:boolean):void;
            }
            type OnVaBillTimeBucketSplitEvent_T = OnVaBillTimeBucketSplitEvent_S & OnVaBillTimeBucketSplitEvent$;
            interface OnVaBillTimeBucketSplitEvent extends OnVaBillTimeBucketSplitEvent_T {
            }
            interface VaBillInitExpService_S {
            }
            interface VaBillInitExpService$ {
                /**
                 * ���ں����ݼٵ��ݳ�ʼ����ѯ������չ����
                 *
                 * <p>���ں���ʱ����Ҫ��׼�����ݣ����ӿ��������ݼٵ�������׼���Ĳ�ѯ��������</p>
                 * ϵͳ������ȫʹ�ø÷����ķ��ؽ����Ϊ��ѯ������ѯ�ݼٵ��� ������޸�Ԥ������������Ҫ�ڷ���ʱ�� {@link qFilters} ���뵽���ز�����
                 * presetFilters��ǰ���������£�
                 * <pre><code>
                 *      // ��ָ��������ID�б��У����ݼٷ�¼ʱ���ڸ����Ŀ�ʼ�ͽ����������н������ҵ���״̬Ϊ����ˣ��ҵ���û�б�����
                 *      QFilter attPersonIdsFilter = new QFilter("personid", QFilter.in, attPersonIds);
                 *      QFilter fromDateFilter = new QFilter("entryentity.entrystartdate", QFilter.less_equals, WTCDateUtils.toDate(toDate));
                 *      QFilter toDateDateFilter = new QFilter("entryentity.entrystartdate", QFilter.large_equals, WTCDateUtils.toDate(fromDate));
                 *      QFilter audit = new QFilter(WTCBaseConstants.BILLSTATUS, QFilter.equals, WTCCommonConstants.AUDITSTATUS_AUDITPASS);
                 *      QFilter isNotLeave = new QFilter("isnotleave", QFilter.equals, WTCCommonConstants.STR_ZERO);
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *     public void onAddFilters(List<QFilter> qFilters) {
                 *         // ��չʾ����������ݴ��ڱ�����������ݲ����뿼�ں���
                 *         isHaveChangeFilter(qFilters);
                 *     }
                 *
                 *     private List<QFilter> isHaveChangeFilter(List<QFilter> presetQFilters) {
                 *         QFilter isHaveChangeFilter = new QFilter(IS_HAVE_CHANGE, QCP.equals, Boolean.FALSE);
                 *         presetQFilters.add(isHaveChangeFilter);
                 *         return presetQFilters;
                 *     }
                 * </code></pre>
                 *
                 * @param qFilters �����б�
                 * @return ��չ��Ĳ�ѯ����
                 */
                onAddFilters(qFilters:$.java.util.List):void;
            }
            type VaBillInitExpService_T = VaBillInitExpService_S & VaBillInitExpService$;
            interface VaBillInitExpService extends VaBillInitExpService_T {
            }
            interface TieInitTPBillExtPlugin_S {
            }
            interface TieInitTPBillExtPlugin$ {
                /**
                 * ���������ѯ������չ����
                 *
                 * <p>�ڿ��ں��㵥��ʼ��ʱ��ͨ���÷��������޸ĳ����ѯ����</p>
                 * <p>ʾ����</p>
                 * 1.����Զ����ѯ������
                 * ���磺��ӳ���ʱ���ڡ�2020-01-01��֮��Ĳ�ѯ����
                 * event.getQFilter().add(new QFilter("entrystartdate",QCP.large_equals,"2020-01-01"));
                 *
                 * @param event ��չ�¼�����
                 */
                onBuildQFilter?(event:OnBuildTPQFilterEvent):void;
            }
            type TieInitTPBillExtPlugin_T = TieInitTPBillExtPlugin_S & TieInitTPBillExtPlugin$;
            interface TieInitTPBillExtPlugin extends TieInitTPBillExtPlugin_T {
            }
            interface OnBuildTPQFilterEvent_S {
            }
            interface OnBuildTPQFilterEvent_C extends OnBuildTPQFilterEvent_S {
                new(qFilters:$.java.util.List):OnBuildTPQFilterEvent;
            }
            interface OnBuildTPQFilterEvent$ {
                /**
                 * ��ȡ��Ʒ��������
                 *
                 * @return ��������ʼ���Ӱ൥�ݵĲ�ѯ����
                 */
                getQFilter():$.java.util.List;
            }
            type OnBuildTPQFilterEvent_T = OnBuildTPQFilterEvent_S & OnBuildTPQFilterEvent$;
            interface OnBuildTPQFilterEvent extends OnBuildTPQFilterEvent_T {
            }
            interface OnBuildOTQFilterEvent_S {
            }
            interface OnBuildOTQFilterEvent_C extends OnBuildOTQFilterEvent_S {
                new(qFilters:$.java.util.List):OnBuildOTQFilterEvent;
            }
            interface OnBuildOTQFilterEvent$ {
                /**
                 * ��ȡ��Ʒ��������
                 *
                 * @return ��������ʼ���Ӱ൥�ݵĲ�ѯ����
                 */
                getQFilter():$.java.util.List;
            }
            type OnBuildOTQFilterEvent_T = OnBuildOTQFilterEvent_S & OnBuildOTQFilterEvent$;
            interface OnBuildOTQFilterEvent extends OnBuildOTQFilterEvent_T {
            }
            interface TieInitOTBillExtPlugin_S {
            }
            interface TieInitOTBillExtPlugin$ {
                /**
                 * �����Ӱ൥��ѯ������չ����
                 *
                 * <p>�ڿ��ں��㵥��ʼ��ʱ��ͨ���÷��������޸ļӰ൥��ѯ����</p>
                 * <p>ʾ����</p>
                 * 1.����Զ����ѯ������
                 * ���磺��ӼӰ�ʱ���ڡ�2020-01-01��֮��Ĳ�ѯ����
                 * event.getQFilter().add(new QFilter("startdate",QCP.large_equals,"2020-01-01"));
                 *
                 * @param event ��չ�¼�����
                 */
                onBuildQFilter?(event:OnBuildOTQFilterEvent):void;
            }
            type TieInitOTBillExtPlugin_T = TieInitOTBillExtPlugin_S & TieInitOTBillExtPlugin$;
            interface TieInitOTBillExtPlugin extends TieInitOTBillExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.configmix{
            interface TieConfigMixQueryEvent_S {
            }
            interface TieConfigMixQueryEvent_C extends TieConfigMixQueryEvent_S {
                new(fromDate:$.java.time.LocalDate,toDate:$.java.time.LocalDate):TieConfigMixQueryEvent;
            }
            interface TieConfigMixQueryEvent$ {
                /**
                 * ׷���Զ�����������
                 */
                addConfigMixResult(configMixResult:$.java.util.List):void;
                /**
                 * ��ȡ�Զ�����������
                 * ���صĽ�������ѯ����Щ��������е�����countryid.number,attitemmap.id,attstsmap.id,tbpcrelcnf.id,entryentity.biztype,entryentity.exattr,entryentity.attendattr,entryentity.datasource
                 *
                 * @return �Զ�����������
                 */
                getConfigMixResult():$.java.util.List;
                /**
                 * ��ȡ���ں����ʼ�Ŀ�ʼ���ڣ�����������
                 *
                 * @return ���ں����ʼ�Ŀ�ʼ���ڣ�����������
                 */
                getFromDate():$.java.time.LocalDate;
                /**
                 * ��ȡ���ں����ʼ�Ľ������ڣ�����������
                 *
                 * @return ���ں����ʼ�Ľ������ڣ�����������
                 */
                getToDate():$.java.time.LocalDate;
            }
            type TieConfigMixQueryEvent_T = TieConfigMixQueryEvent_S & TieConfigMixQueryEvent$;
            interface TieConfigMixQueryEvent extends TieConfigMixQueryEvent_T {
            }
            interface ConfigMixInitPluginDemo_S {
            }
            type ConfigMixInitPluginDemo_ST = TieConfigMixInitPlugin_S & ConfigMixInitPluginDemo_S;
            interface ConfigMixInitPluginDemo_C extends ConfigMixInitPluginDemo_ST {
                new():ConfigMixInitPluginDemo;
            }
            interface ConfigMixInitPluginDemo$ {
            }
            type ConfigMixInitPluginDemo_T = TieConfigMixInitPlugin & ConfigMixInitPluginDemo_S & ConfigMixInitPluginDemo$;
            interface ConfigMixInitPluginDemo extends ConfigMixInitPluginDemo_T {
            }
            interface TieConfigMixInitPlugin_S {
            }
            interface TieConfigMixInitPlugin$ {
                onQuery(event:TieConfigMixQueryEvent):void;
            }
            type TieConfigMixInitPlugin_T = TieConfigMixInitPlugin_S & TieConfigMixInitPlugin$;
            interface TieConfigMixInitPlugin extends TieConfigMixInitPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.logiccard{
            interface OnQueryInitParamOfLogicCardEvent_S {
            }
            interface OnQueryInitParamOfLogicCardEvent_C extends OnQueryInitParamOfLogicCardEvent_S {
                new(qFilter:$.kd.bos.orm.query.QFilter):OnQueryInitParamOfLogicCardEvent;
            }
            interface OnQueryInitParamOfLogicCardEvent$ {
                getExtKeys():$.java.util.Set;
                getQFilter():$.kd.bos.orm.query.QFilter;
                setExtKeys(extKeys:$.java.util.Set):void;
            }
            type OnQueryInitParamOfLogicCardEvent_T = OnQueryInitParamOfLogicCardEvent_S & OnQueryInitParamOfLogicCardEvent$;
            interface OnQueryInitParamOfLogicCardEvent extends OnQueryInitParamOfLogicCardEvent_T {
            }
            interface TieInitEffectiveCardExtPlugin_S {
            }
            interface TieInitEffectiveCardExtPlugin$ {
                /**
                 * ִ�в�ѯ��Ч��ο���ʼ������ǰ���¼�������֧���޸�Ԥ�ú�������Ĳ�ѯ������������ѯ�ֶ�
                 *
                 * <p>���ں���ʱ����Ҫ��׼�����ݣ����ӿ������ڳ�ʼ����ο����ݵ�ʱ����չ</p>
                 * <pre><code>
                 *      Set<String> extKeys ֧�ֲ�ѯʱ��չ�Ĳ�ѯ�ֶΣ���չ�����Ա����� ��ο�Ԫ���ݣ�wtpm_multicard�� �����չ����
                 *      QFilter qFilter  �����Ѿ�������Ҫ��ѯ��������ϵͳ������ȫʹ�ø÷����ķ��ؽ����Ϊ��ѯ������ѯ��δο�
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *  // ����Ҫ������չ�ֶ� ������"extkey01"
                 *  event.setExtKeys(Sets.newHashSet("extkey01"));
                 *  // �޸Ĳ�ѯ�������� �У�����ʱ������ qFilter.and(new QFilter("timezone", QCP.in,320881823238577152L));
                 *  QFilter qFilter = event.getQFilter();
                 *
                 * </code></pre>
                 *
                 * @param event ��չ���
                 */
                onQueryMultiEffectiveCard?(event:OnQueryInitParamOfLogicCardEvent):void;
                /**
                 * ִ�в�ѯ��Чһ�ο���ʼ������ǰ���¼�������֧���޸�Ԥ�ú�������Ĳ�ѯ������������ѯ�ֶ�
                 *
                 * <p>���ں���ʱ����Ҫ��׼�����ݣ����ӿ������ڳ�ʼ��һ�ο����ݵ�ʱ����չ</p>
                 * <pre><code>
                 *      Set<String> extKeys ֧�ֲ�ѯʱ��չ�Ĳ�ѯ�ֶΣ���չ�����Ա����� һ�ο�Ԫ���ݣ�wtpm_oncecard�� �����չ����
                 *      QFilter qFilter  �����Ѿ�������Ҫ��ѯ��������ϵͳ������ȫʹ�ø÷����ķ��ؽ����Ϊ��ѯ������ѯһ�ο�
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *  // ����Ҫ������չ�ֶ� ������"extkey01"
                 *  event.setExtKeys(Sets.newHashSet("extkey01"));
                 *  // �޸Ĳ�ѯ�������� �У�����ʱ������ qFilter.and(new QFilter("timezone", QCP.in,320881823238577152L));
                 *  QFilter qFilter = event.getQFilter();
                 *
                 * </code></pre>
                 *
                 * @param event ��չ���
                 */
                onQueryOnceEffectiveCard?(event:OnQueryInitParamOfLogicCardEvent):void;
            }
            type TieInitEffectiveCardExtPlugin_T = TieInitEffectiveCardExtPlugin_S & TieInitEffectiveCardExtPlugin$;
            interface TieInitEffectiveCardExtPlugin extends TieInitEffectiveCardExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.init.perattperiod{
            interface OnQueryInitParamOfPerAttPeriodEvent_S {
            }
            interface OnQueryInitParamOfPerAttPeriodEvent_C extends OnQueryInitParamOfPerAttPeriodEvent_S {
                new(periodQueryParamExt:PerAttPeriodQueryParamExt):OnQueryInitParamOfPerAttPeriodEvent;
            }
            interface OnQueryInitParamOfPerAttPeriodEvent$ {
                getExtKeys():$.java.util.Set;
                getPeriodQueryParamExt():PerAttPeriodQueryParamExt;
                setExtKeys(extKeys:$.java.util.Set):void;
            }
            type OnQueryInitParamOfPerAttPeriodEvent_T = OnQueryInitParamOfPerAttPeriodEvent_S & OnQueryInitParamOfPerAttPeriodEvent$;
            interface OnQueryInitParamOfPerAttPeriodEvent extends OnQueryInitParamOfPerAttPeriodEvent_T {
            }
            interface TieInitAttPeriodExtPlugin_S {
            }
            interface TieInitAttPeriodExtPlugin$ {
                /**
                 * ���ں�����Ա�����ڼ��ʼ����չ����
                 *
                 * <p>���ں���ʱ����Ҫ��׼�����ݣ����ӿ���������Ա�����ڼ�����׼���Ĳ�ѯ��������</p>
                 * <pre><code>
                 *      Set<String> extKeys ֧�ֲ�ѯʱ��չ�Ĳ�ѯ�ֶΣ���չ�����Ա����� ��Ա�����ڼ�Ԫ���ݣ�wtp_perattperiod�� �����չ����
                 *      PerAttPeriodQueryParamExt  �ṩ��ѯ��Ա�����ڼ�ʱ����һЩ��ѯ������
                 * </code></pre>
                 * <p>��չʾ������</p>
                 * <pre><code>
                 *
                 *  public void onQueryAttPeriod(OnQueryInitParamOfPerAttPeriodEvent event) {
                 *      // ��ѯʱ���Ӷ���Ŀ����˲�ѯ
                 *      event.getAttFileQueryParam().getAttPersonSetIds().add(1863000118957967360L);
                 *      // ��չ�ֶ���������������չ�ֶα������Ե�����wtp_perattperiod��
                 *      event.setExtKeys(Sets.newHashSet("totaldays"));
                 *  }
                 *
                 * </code></pre>
                 *
                 * @param event ��չ���
                 */
                onQueryAttPeriod(event:OnQueryInitParamOfPerAttPeriodEvent):void;
            }
            type TieInitAttPeriodExtPlugin_T = TieInitAttPeriodExtPlugin_S & TieInitAttPeriodExtPlugin$;
            interface TieInitAttPeriodExtPlugin extends TieInitAttPeriodExtPlugin_T {
            }
            interface PerAttPeriodQueryParamExt_S {
            }
            interface PerAttPeriodQueryParamExt$ {
                /**
                 * ��ȡ��ѯ�����Ŀ����˼���
                 *
                 * @return Ҫ��ѯ�Ŀ����˼���
                 */
                getAttPersonSetIds():$.java.util.Set;
                /**
                 * ��ȡ��ѯ��������
                 *
                 * @return ��������
                 */
                getEndDate():Date;
                /**
                 * ��ȡʵ��ʵ�ֵ�ʵ��
                 *
                 * @return ʵ��ʵ��
                 */
                getInstance():any;
                /**
                 * ��ȡ��ѯ��ʼ����
                 *
                 * @return ��ʼ����
                 */
                getStartDate():Date;
                /**
                 * ���ò�ѯ�Ŀ����˼��ϣ���������˻Ḳ��ϵͳ�ģ���������û���ϵͳ��
                 *
                 * @param personSetIds ��ѯ�Ŀ����˼���
                 */
                setAttPersonSetIds(personSetIds:$.java.util.Set):void;
                /**
                 * ���ò�ѯ��������
                 *
                 * @param endDate ��������
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ���������Ĳ�ѯ������Ĭ���ǿյ�
                 * <pre><code>
                 *     // �������ò�ѯҵ��״̬������״̬
                 *      QFilter attPersonIdsFilter =  new QFilter(AttConstants.BUSISTATUS, QCP.equals, busiStatus)
                 * </code></pre>
                 *
                 * @param qFilter ���������Ĺ�������
                 */
                setQFilter(qFilter:$.kd.bos.orm.query.QFilter):void;
                /**
                 * ���ÿ�ʼ����
                 *
                 * @param startDate ��ʼ����
                 */
                setStartDate(startDate:Date):void;
            }
            type PerAttPeriodQueryParamExt_T = PerAttPeriodQueryParamExt_S & PerAttPeriodQueryParamExt$;
            interface PerAttPeriodQueryParamExt extends PerAttPeriodQueryParamExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.accountplan{
            interface TieSchemeExt_S {
            }
            interface TieSchemeExt_C extends TieSchemeExt_S {
                new():TieSchemeExt;
            }
            interface TieSchemeExt$ {
                /**
                 * @return ����ϸ/�ڼ�������һ���������ʵ����·��
                 */
                getEvaluatorName():string;
                /**
                 * @param evaluatorName ����ϸ/�ڼ�������һ���������ʵ����·��
                 */
                setEvaluatorName(evaluatorName:string):void;
            }
            type TieSchemeExt_T = TieSchemeExt_S & TieSchemeExt$;
            interface TieSchemeExt extends TieSchemeExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.attconfig{
            interface AttRuleCalExt_S {
            }
            interface AttRuleCalExt$ {
                /**
                 * �������ڻ�ȡ�Զ������ʱ����¼��ʱ��������
                 *
                 * @param chainDate
                 * @return
                 */
                getAttCustomDurations(chainDate:$.java.time.LocalDate):$.java.util.List;
                /**
                 * @return ���ڷ�Χ����json
                 */
                getConditionJson():string;
                /**
                 * @return �޶�����
                 */
                getLimitConditionJson():string;
            }
            type AttRuleCalExt_T = AttRuleCalExt_S & AttRuleCalExt$;
            interface AttRuleCalExt extends AttRuleCalExt_T {
            }
            interface AttRuleExt_S {
            }
            interface AttRuleExt$ {
                /**
                 * ��ȡ���ڹ����¼������ʱ����¼��
                 *
                 * @return ���ڹ����¼������ʱ����¼��
                 */
                getAttRuleCal():$.java.util.List;
                /**
                 * �������ڣ���ȡ Ӧ�������ö���
                 *
                 * @param chainDate ������
                 * @return Ӧ�������ö���
                 */
                getAttendConfigTimeSeqBo(chainDate:$.java.time.LocalDate):AttendConfigExt;
                /**
                 * @return Ӧ���������Ŀ�����ĿBOID
                 */
                getShouldAttendDay():long;
                /**
                 * @return Ӧ����ʱ���Ŀ�����ĿBOID
                 */
                getShouldAttendHour():long;
                /**
                 * @return ���ڼӰ�ʱ�μ���Ӧ����
                 */
                isContainOverTime():boolean;
            }
            type AttRuleExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & AttRuleExt_S & AttRuleExt$;
            interface AttRuleExt extends AttRuleExt_T {
            }
            interface AttendConfigExt_S {
                readonly ATTENDDAYS_A:string;
                readonly ATTENDDAYS_B:string;
            }
            interface AttendConfigExt$ {
                /**
                 * ��ȡӦ������������ǰ��֧�ְ��Ű� {@link AttendConfigExt#ATTENDDAYS_A}
                 *
                 * @return Ӧ��������
                 */
                getAttendDays():string;
                /**
                 * ��ȡ ���ָ������json
                 *
                 * @return ���ָ������json
                 */
                getShiftConditionJsonTag():string;
            }
            type AttendConfigExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & AttendConfigExt_S & AttendConfigExt$;
            interface AttendConfigExt extends AttendConfigExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.attenperson{
            interface PersonExt_S {
            }
            interface PersonExt$ {
                /**
                 * boId
                 */
                getBid():long;
                /**
                 * ͷ��
                 */
                getHeadSculpture():string;
                /**
                 * ��Ȼ��Ψһ����id
                 */
                getId():long;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ����
                 */
                getNumber():string;
                /**
                 * ��ǰ������
                 */
                getPersonIndexId():long;
                /**
                 * �Ƿ�HR����
                 */
                isHrCreate():boolean;
            }
            type PersonExt_T = PersonExt_S & PersonExt$;
            interface PersonExt extends PersonExt_T {
            }
            interface EmpJobRelExt_S {
            }
            interface EmpJobRelExt$ {
                /**
                 * ����
                 */
                getAdminOrg():long;
                /**
                 * ��˾
                 */
                getCompany():long;
                /**
                 * ��������
                 */
                getEndDate():Date;
                /**
                 * ְλ����ҵ��Ԫ
                 */
                getHrBu():long;
                /**
                 * ְλ
                 */
                getJob():long;
                /**
                 * ְλ��
                 */
                getJobClass():long;
                /**
                 * ְλ��
                 */
                getJobFamily():long;
                /**
                 * ְ��
                 */
                getJobGrade():long;
                /**
                 * ְλ
                 */
                getJobHr():long;
                /**
                 * ְ��ְ��ʱ��
                 */
                getJobLength():long;
                /**
                 * ְ��
                 */
                getJobLevel():long;
                /**
                 * ְλ����
                 */
                getJobSeq():long;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ��λ
                 */
                getPosition():long;
                /**
                 * ��ʼ����
                 */
                getStartDate():Date;
            }
            type EmpJobRelExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & EmpJobRelExt_S & EmpJobRelExt$;
            interface EmpJobRelExt extends EmpJobRelExt_T {
            }
            interface EmpEntRelExt_S {
            }
            interface EmpEntRelExt$ {
                /**
                 * �״��ù���ʼ����
                 */
                getFirstStartDate():Date;
                /**
                 * �ù���ϵ״̬
                 */
                getLaborRelStatus():long;
                /**
                 * ǰ����
                 */
                getOldEmpNumber():string;
                /**
                 * �ù���ʼ����
                 */
                getStartDate():Date;
            }
            type EmpEntRelExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & EmpEntRelExt_S & EmpEntRelExt$;
            interface EmpEntRelExt extends EmpEntRelExt_T {
            }
            interface ContrWorkLocExt_S {
            }
            interface ContrWorkLocExt$ {
                /**
                 * ����
                 */
                getName():string;
            }
            type ContrWorkLocExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & ContrWorkLocExt_S & ContrWorkLocExt$;
            interface ContrWorkLocExt extends ContrWorkLocExt_T {
            }
            interface EmpPosOrgRelExt_S {
            }
            interface EmpPosOrgRelExt$ {
                /**
                 * ���������
                 */
                getAssignNo():string;
                /**
                 * ҵ�����
                 */
                getBusiNumber():string;
                /**
                 * ��������Χ
                 */
                getCmpEmp():long;
                /**
                 * ������Ա
                 */
                getDepEmp():long;
                /**
                 * ���ڽ�������
                 */
                getEndDate():Date;
                /**
                 * �Ƿ�����ְ,0=��1=��
                 */
                getIsPrimary():string;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ��ְ״̬
                 */
                getPosStatus():long;
                /**
                 * ��ְ����
                 */
                getPosType():long;
                /**
                 * ��ˮ��
                 */
                getSerialNo():string;
                /**
                 * ��ְ��ʼ����
                 */
                getStartDate():Date;
                /**
                 * ϵͳ��������
                 */
                getSysEndDate():Date;
                /**
                 * ���������ڳ���
                 */
                getWorkplace():long;
            }
            type EmpPosOrgRelExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & EmpPosOrgRelExt_S & EmpPosOrgRelExt$;
            interface EmpPosOrgRelExt extends EmpPosOrgRelExt_T {
            }
            interface EmployeeExt_S {
            }
            interface EmployeeExt$ {
                /**
                 * ����
                 */
                getEmpNumber():string;
                /**
                 * �ù���������
                 */
                getEndDate():Date;
                /**
                 * ���˵�λ
                 */
                getEnterPrise():long;
                /**
                 * �ù���ϵ״̬
                 */
                getLaborRelStatus():long;
                /**
                 * �ù���ϵ����
                 */
                getLaborRelType():long;
                /**
                 * �������
                 */
                getLastWorkDate():Date;
                /**
                 * �ù���ʼ����
                 */
                getStartDate():Date;
                /**
                 * ϵͳ��������
                 */
                getSysEndDate():Date;
            }
            type EmployeeExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & EmployeeExt_S & EmployeeExt$;
            interface EmployeeExt extends EmployeeExt_T {
            }
            interface PerNonTsPropExt_S {
            }
            interface PerNonTsPropExt$ {
                /**
                 * ����
                 */
                getAge():number;
                /**
                 * �μӹ�������
                 */
                getBeginServiceDate():Date;
                /**
                 * ��ǰ������
                 */
                getBirthDay():Date;
                /**
                 * ����
                 */
                getFolk():long;
                /**
                 * �Ա�
                 */
                getGender():long;
                /**
                 * ��ǰ������
                 */
                getId():long;
                /**
                 * ���Ǽ���
                 */
                getMarryDate():Date;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ����
                 */
                getNationality():long;
            }
            type PerNonTsPropExt_T = PerNonTsPropExt_S & PerNonTsPropExt$;
            interface PerNonTsPropExt extends PerNonTsPropExt_T {
            }
            interface AttendPersonExt_S {
            }
            interface AttendPersonExt$ {
                /**
                 * Э�鹤������Ϣ
                 */
                getContrWorkLocExt():ContrWorkLocExt;
                /**
                 * ְҵ��Ϣ
                 */
                getEmpEntRelExt():EmpEntRelExt;
                /**
                 * ְ��ְ����Ϣ
                 */
                getEmpJobRelExt():EmpJobRelExt;
                /**
                 * ��ҵ��Ա��Ϣ
                 */
                getEmployeeExt():EmployeeExt;
                /**
                 * ��Աʱ����Ϣ
                 */
                getPerNonTsPropExt():PerNonTsPropExt;
                /**
                 * ��Ա��ʱ����Ϣ
                 */
                getPersonExt():PersonExt;
                /**
                 * ��������Ϣ
                 */
                getTrialPeriodExt():TrialPeriodExt;
            }
            type AttendPersonExt_T = AttendPersonExt_S & AttendPersonExt$;
            interface AttendPersonExt extends AttendPersonExt_T {
            }
            interface CmpEmpExt_S {
            }
            interface CmpEmpExt$ {
                /**
                 * ��������
                 */
                getEndDate():Date;
                /**
                 * �Ƿ�������Χ,0=��1=��
                 */
                getIsPrimaryScope():string;
                /**
                 * �������
                 */
                getLastWorkDate():Date;
                /**
                 * �Ƿ��ù�ǰ���¼�¼,0=��1=��
                 */
                getLateStrecord():string;
                /**
                 * ��������Χ
                 */
                getManagingScope():long;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ��ʼ����
                 */
                getStartDate():Date;
                /**
                 * ϵͳ��������
                 */
                getSysEndDate():Date;
            }
            type CmpEmpExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & CmpEmpExt_S & CmpEmpExt$;
            interface CmpEmpExt extends CmpEmpExt_T {
            }
            interface TrialPeriodExt_S {
            }
            interface TrialPeriodExt$ {
                /**
                 * ��ְ����
                 */
                getEntryDate():Date;
                /**
                 * ת������
                 */
                getRegularDate():Date;
            }
            type TrialPeriodExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & TrialPeriodExt_S & TrialPeriodExt$;
            interface TrialPeriodExt extends TrialPeriodExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.attfile{
            interface TimeZoneExt_S {
            }
            interface TimeZoneExt$ {
                /**
                 * ʱ��
                 */
                getTimeDiff():number;
                /**
                 * ʱ��id
                 */
                getTimeZoneId():long;
            }
            type TimeZoneExt_T = TimeZoneExt_S & TimeZoneExt$;
            interface TimeZoneExt extends TimeZoneExt_T {
            }
            interface AttFileExt_S {
            }
            interface AttFileExt$ {
                /**
                 * ������֯ID
                 */
                getAdminOrgId():long;
                /**
                 * �ҿ�������֯bid
                 */
                getAffiliateAdminOrgBid():long;
                /**
                 * �ҿ�������֯�汾����
                 */
                getAffiliateAdminOrgVid():$.java.util.List;
                /**
                 * ��ȡָ������{@code inDate}��ʹ�õķ�¼���� ���ڿ���
                 *
                 * @param inDate ʹ�õ����ڣ�����Ϊnull
                 * @return �޷���ȡ��Ч���ݽ�����null
                 * @throws NullPointerException if inDate is null
                 */
                getAttCard(inDate:$.java.time.LocalDate):string;
                /**
                 * ��ȡָ������{@code inDate}��ʹ�õĿ��ڷ�ʽ
                 *
                 * @param inDate ʹ�÷��������ڣ�����Ϊnull
                 * @return ���ڷ�ʽ������޷���ȡ��Ч���ڷ�ʽ������null
                 * @throws NullPointerException if inDate is null
                 */
                getAttMode(inDate:$.java.time.LocalDate):string;
                /**
                 * ������ID
                 */
                getAttPersonId():long;
                /**
                 * ���ڱ�ʶ
                 */
                getAttTagId():long;
                /**
                 * ��������Χid
                 */
                getCmpEmpId():long;
                /**
                 * ��˾ID
                 */
                getCompanyId():long;
                /**
                 * ���ڹ�������,����ֱ�ӻ�ȡ������(����Ϊ���ҵ���)
                 */
                getDependency():string;
                /**
                 * ���ҵ���id
                 */
                getDependencyId():long;
                /**
                 * ����Ա������id
                 */
                getDependencyType():long;
                /**
                 * ������Ա��id
                 */
                getEmpGroup():long;
                /**
                 * ��ְ����id
                 */
                getEmpPosOrgRelId():long;
                /**
                 * ��������
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ְλID
                 */
                getJobId():long;
                /**
                 * ҵ��ԪID
                 */
                getOrgId():long;
                /**
                 * ��λID
                 */
                getPositionId():long;
                /**
                 * ��ʼ����
                 */
                getStartDate():$.java.time.LocalDate;
                /**
                 * ��ʱ����id
                 */
                getTimeResolveId():long;
                /**
                 * ��ȡָ������{@code inDate}��ʹ�õķ�¼���� ʱ��
                 *
                 * @param inDate ʹ�õ����ڣ�����Ϊnull
                 * @return �޷���ȡ��Ч���ݽ�����null
                 */
                getTimeZone(inDate:$.java.time.LocalDate):TimeZoneExt;
                /**
                 * ���ڵص�
                 */
                getWorkplace():long;
                /**
                 * ����Ա��
                 */
                isManaged():boolean;
            }
            type AttFileExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & kd.sdk.wtc.wtes.business.tie.model.common.DataAttributeExtendable & AttFileExt_S & AttFileExt$;
            interface AttFileExt extends AttFileExt_T {
            }
            interface AttFileScheduleEntityExt_S {
            }
            interface AttFileScheduleEntityExt$ {
                /**
                 * ����ʱ��
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ����
                 */
                getEntity():any;
                /**
                 * id
                 */
                getId():long;
                /**
                 * ��ʼʱ��
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type AttFileScheduleEntityExt_T = AttFileScheduleEntityExt_S & AttFileScheduleEntityExt$;
            interface AttFileScheduleEntityExt extends AttFileScheduleEntityExt_T {
            }
            interface AttStateExt_S {
            }
            interface AttStateExt$ {
                /**
                 * ����������
                 */
                getAccountTo():Date;
                /**
                 * ����������������
                 */
                getAllowReAccountTime():Date;
                /**
                 * �쳣��������
                 */
                getExcEndDate():Date;
                /**
                 * �쳣��ʼ����
                 */
                getExcStartDate():Date;
                /**
                 * ����BoId
                 */
                getFileBoId():long;
                /**
                 * ���᷶Χ-�����������
                 */
                getFrozenEnDate():Date;
                /**
                 * ���᷶Χ-���Ὺʼ����
                 */
                getFrozenStartDate():Date;
                /**
                 * id
                 */
                getId():long;
                /**
                 * ����������
                 */
                getLockTo():Date;
                /**
                 * ������id
                 */
                getPersonId():long;
                /**
                 * ���������
                 */
                getStorageTo():Date;
                /**
                 * �Ƿ����쳣
                 */
                isExState():boolean;
            }
            type AttStateExt_T = AttStateExt_S & AttStateExt$;
            interface AttStateExt extends AttStateExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.attitem{
            interface ExAttItemInstanceExt_S {
            }
            type ExAttItemInstanceExt_ST = AttItemInstanceExt_S & ExAttItemInstanceExt_S;
            interface ExAttItemInstanceExt_C extends ExAttItemInstanceExt_ST {
                /**
                 * �쳣������Ŀ������
                 *
                 * @param attItemSpecExt ������Ŀ����
                 * @param itemValue      ������Ŀֵ
                 * @param day            ������Ŀֵ����λ���죩
                 * @param secondDecimal  ������Ŀֵ����λ�룺�죩
                 */
                new(attItemSpecExt:AttItemSpecExt,itemValue:$.java.math.BigDecimal,day:$.java.math.BigDecimal,secondDecimal:$.java.math.BigDecimal):ExAttItemInstanceExt;
            }
            interface ExAttItemInstanceExt$ {
                /**
                 * ��ȡ�쳣��ʶ
                 *
                 * @return �쳣��ʶ
                 */
                getExFilterType():string;
                /**
                 * ��ȡ�쳣����ʽID
                 *
                 * @return �쳣����ʽID
                 */
                getExProcessId():long;
                /**
                 * ��ȡ�쳣����ID
                 *
                 * @return �쳣����ID
                 */
                getExTypeId():long;
                /**
                 * ��ȡԭʼ������ĿBOID�б�
                 *
                 * @return ԭʼ������ĿBOID�б�
                 */
                getOriginAttItemBoIds():$.java.util.List;
                /**
                 * ��ȡԭʼ������Ŀֵ
                 *
                 * @return ԭʼ������Ŀֵ
                 */
                getOriginAttItemValue():$.java.math.BigDecimal;
                /**
                 * ��ȡԭʼ������ĿVID�б�
                 *
                 * @return ԭʼ������ĿVID�б�
                 */
                getOriginAttItemVids():$.java.util.List;
                /**
                 * ��ȡ�����Ŀ����쳣�������
                 *
                 * @return �������
                 */
                getShiftDate():$.java.time.LocalDate;
                /**
                 * ��ȡ���ʱ��ID
                 *
                 * @return ���ʱ��ID
                 */
                getShiftTimeBucketSeqId():long;
                /**
                 * ��ȡӦ�򿨵�ID
                 *
                 * @return Ӧ�򿨵�ID
                 */
                getShouldPunchCardSeqId():long;
                /**
                 * ��ȡӦ���°࿨��
                 *
                 * @return Ӧ���°࿨��
                 */
                getShouldPunchPointEnd():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ���ϰ࿨��
                 *
                 * @return Ӧ���ϰ࿨��
                 */
                getShouldPunchPointStart():$.java.time.LocalDateTime;
                /**
                 * �Ƿ�ԭʼ�쳣
                 *
                 * @return �Ƿ�ԭʼ�쳣
                 */
                isOriginEx():boolean;
            }
            type ExAttItemInstanceExt_T = AttItemInstanceExt & ExAttItemInstanceExt_S & ExAttItemInstanceExt$;
            interface ExAttItemInstanceExt extends ExAttItemInstanceExt_T {
            }
            interface AttItemInstanceExt_S {
            }
            interface AttItemInstanceExt_C extends AttItemInstanceExt_S {
                /**
                 * ������Ŀ������
                 *
                 * @param attItemSpecExt ������Ŀ����
                 * @param itemValue      ������Ŀֵ
                 * @param day            ������Ŀֵ����λ���죩
                 * @param secondDecimal  ������Ŀֵ����λ�룺�죩
                 */
                new(attItemSpecExt:AttItemSpecExt,itemValue:$.java.math.BigDecimal,day:$.java.math.BigDecimal,secondDecimal:$.java.math.BigDecimal):AttItemInstanceExt;
            }
            interface AttItemInstanceExt$ {
                /**
                 * ��ȡ������Ŀ����
                 *
                 * @return ������Ŀ����
                 */
                getAttItemSpecExt():AttItemSpecExt;
                /**
                 * ��ȡ������Ŀֵ����λ���죩
                 *
                 * @return ������Ŀֵ����λ���죩
                 */
                getDay():$.java.math.BigDecimal;
                /**
                 * ������Ŀֵ
                 *
                 * @return ������Ŀֵ
                 */
                getItemValue():$.java.math.BigDecimal;
                /**
                 * ��ȡ������Ŀֵ����λ���룩
                 *
                 * @return ������Ŀֵ����λ���룩
                 */
                getSecondDecimal():$.java.math.BigDecimal;
            }
            type AttItemInstanceExt_T = AttItemInstanceExt_S & AttItemInstanceExt$;
            interface AttItemInstanceExt extends AttItemInstanceExt_T {
            }
            interface PeriodAttItemInstanceExt_S {
            }
            interface PeriodAttItemInstanceExt_C extends PeriodAttItemInstanceExt_S {
                new(attItemSpecExt:AttItemSpecExt,itemValue:$.java.math.BigDecimal):PeriodAttItemInstanceExt;
            }
            interface PeriodAttItemInstanceExt$ {
                /**
                 * @return ������Ŀ
                 */
                getAttItemSpecExt():AttItemSpecExt;
                /**
                 * @return ������Ŀֵ
                 */
                getItemValue():$.java.math.BigDecimal;
            }
            type PeriodAttItemInstanceExt_T = PeriodAttItemInstanceExt_S & PeriodAttItemInstanceExt$;
            interface PeriodAttItemInstanceExt extends PeriodAttItemInstanceExt_T {
            }
            interface AttItemSpecExt_S {
            }
            interface AttItemSpecExt$ {
                /**
                 * �Ƿ����
                 */
                combo():boolean;
                /**
                 * �����Ŀid
                 */
                comboItemBids():$.java.util.List;
                /**
                 * ���ݾ���
                 */
                dataAccuracy():number;
                /**
                 * ��������
                 */
                dataType():string;
                /**
                 * ��ȡ��Ʒ������Ŀʵ��
                 */
                getInstance():any;
                /**
                 * ��ת�Ʒ�ʽ
                 */
                getTransferType():string;
                /**
                 * ��Ŀ����
                 */
                itemType():string;
                /**
                 * ��ת����һ����Ŀ
                 */
                lastTermItemBid():long;
                /**
                 * ��ת����һ����Ŀ
                 */
                lastYearItemBid():long;
                /**
                 * �Ƿ�ԭʼ������Ŀ
                 */
                originalItem():boolean;
                /**
                 * �Ƿ��俼�ڼ�¼��ϸ
                 */
                persistence():boolean;
                /**
                 * ����β���
                 */
                precisionTail():string;
                /**
                 * �Ƿ�н����Ŀ
                 */
                salaryItem():boolean;
                /**
                 * ��λ����
                 */
                unit():string;
            }
            type AttItemSpecExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & kd.sdk.wtc.wtes.business.tie.model.common.DataAttributeExtendable & AttItemSpecExt_S & AttItemSpecExt$;
            interface AttItemSpecExt extends AttItemSpecExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.card{
            interface LogicCardExt_S {
            }
            interface LogicCardExt$ {
                /**
                 * ������id
                 */
                getAttPersonId():long;
                /**
                 * Ӧ�򿨵�(�����ϵ�ʱ��)
                 */
                getCardPointSupposed():$.java.time.LocalDateTime;
                /**
                 * ��Ч����,����ʱ��(ԭʼ����ʱ��)
                 */
                getEffectiveCardPoint():$.java.time.LocalDateTime;
                /**
                 * ʱ��
                 */
                getTimeDiff():number;
                /**
                 * ʱ��id(ԭʼ����ʱ��)
                 */
                getTimeZoneId():long;
            }
            type LogicCardExt_T = kd.sdk.wtc.wtes.business.tie.model.common.DataAttributeExtendable & LogicCardExt_S & LogicCardExt$;
            interface LogicCardExt extends LogicCardExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.common{
            interface DataAttributeExtendable_S {
            }
            interface DataAttributeExtendable$ {
                /**
                 * ��ȡ��չ���Ե�ֵ�����Ҫ��ȡ����չ�ֶ�û������չ�����б���ʱ�����쳣
                 *
                 * @param extKey ��չ�����ֶ�����
                 * @return ��ȡ��չ���Ե�ֵ
                 */
                getExtAttribute(extKey:string):any;
                /**
                 * ��ȡ��չ�����ֶμ���
                 *
                 * @return ��չ�����ֶμ���
                 */
                getExtKeys():$.java.util.Set;
            }
            type DataAttributeExtendable_T = DataAttributeExtendable_S & DataAttributeExtendable$;
            interface DataAttributeExtendable extends DataAttributeExtendable_T {
            }
            interface TieAttSubjectExt_S {
            }
            interface TieAttSubjectExt$ {
                /**
                 * ��ȡ���ڵ���
                 *
                 * @return ���ڵ���
                 */
                getAttFileBos():$.java.util.List;
                /**
                 * ��ȡ������ID
                 *
                 * @return ������ID
                 */
                getAttPersonId():long;
                /**
                 * ����ʱ��
                 *
                 * @return ����ʱ��
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ��ʼʱ��
                 *
                 * @return ��ʼʱ��
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type TieAttSubjectExt_T = TieAttSubjectExt_S & TieAttSubjectExt$;
            interface TieAttSubjectExt extends TieAttSubjectExt_T {
            }
            interface TieAttFileBoExt_S {
            }
            interface TieAttFileBoExt$ {
                /**
                 * ����BoId
                 */
                getAttFileBoId():long;
                /**
                 * ���ڵ����汾
                 */
                getAttFileVersions():$.java.util.List;
                /**
                 * ����ʱ��
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ��ʼʱ��
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type TieAttFileBoExt_T = TieAttFileBoExt_S & TieAttFileBoExt$;
            interface TieAttFileBoExt extends TieAttFileBoExt_T {
            }
            interface TieAttFileVersionExt_S {
            }
            interface TieAttFileVersionExt$ {
                /**
                 * ���ڵ����汾id
                 */
                getAttFileVid():long;
                /**
                 * ������������
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ������ʼ����
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type TieAttFileVersionExt_T = TieAttFileVersionExt_S & TieAttFileVersionExt$;
            interface TieAttFileVersionExt extends TieAttFileVersionExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.ex{
            interface ExConfigExt_S {
            }
            interface ExConfigExt$ {
                /**
                 * @return ��conditions jsonת�ɵĶ���
                 */
                getConditionInfo():kd.bos.ext.hr.ruleengine.infos.RuleConditionInfo;
                /**
                 * @return ��������
                 */
                getConditions():string;
                /**
                 * @return ����ʽ��¼�б�
                 */
                getEntryList():$.java.util.List;
                /**
                 * @return �쳣����id
                 */
                getExTypeId():long;
                /**
                 * @return �Զ������ ʱ�ι��˲��
                 */
                getPeriodFilter():long;
                /**
                 * @return �Ƿ���������Ӧ�򿨶�
                 */
                isAllPunchCard():boolean;
                /**
                 * @return �쳣�����Ƿ��Զ���  ������Զ����߿ͻ��Զ���Ĳ������
                 */
                isCustom():boolean;
                /**
                 * @return �Ƿ��Գ���ʱ�β����쳣
                 */
                isFlexAttendance():boolean;
                /**
                 * @return �Ƿ�OFF�಻���쳣
                 */
                isOff():boolean;
            }
            type ExConfigExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & ExConfigExt_S & ExConfigExt$;
            interface ExConfigExt extends ExConfigExt_T {
            }
            interface ExRulePackageExt_S {
            }
            interface ExRulePackageExt$ {
                /**
                 * ��ȡ�쳣�����б�
                 *
                 * @return �쳣�����б�
                 */
                getConfigList(chainDate:$.java.time.LocalDate):$.java.util.List;
                /**
                 * ��ȡ�쳣ת����¼�б�
                 *
                 * @return �쳣ת����¼�б�
                 */
                getEntryPackageList():$.java.util.List;
                /**
                 * ��ȡ����ʽ
                 */
                getExProcessId():long;
            }
            type ExRulePackageExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & ExRulePackageExt_S & ExRulePackageExt$;
            interface ExRulePackageExt extends ExRulePackageExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.ex.enums{
            enum ExDealTypeEnumExt {
                DEAL_ERROR,
                DEAL_TYPE_A,
                DEAL_TYPE_B
            }
            enum DurationUnitEnumExt {
                UNIT_SECOND,
                UNIT_MINUTE,
                UNIT_HOUR,
                UNIT_DAY,
                UNIT_ERROR
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.init{
            interface TieRequestBaseExt_S {
            }
            interface TieRequestBaseExt$ {
                /**
                 * ����������
                 * �������û�в�֣�������͸�����id��ͬ
                 *
                 * @return ����������
                 */
                getSubTaskId?():long;
                /**
                 * ��������id
                 *
                 * @return ��������id
                 */
                getTaskId?():long;
                /**
                 * ����汾
                 *
                 * @return ����汾
                 */
                getVersion?():string;
            }
            type TieRequestBaseExt_T = TieRequestBaseExt_S & TieRequestBaseExt$;
            interface TieRequestBaseExt extends TieRequestBaseExt_T {
            }
            interface TieRequestExt_S {
            }
            interface TieRequestExt$ {
                /**
                 * ��ȡ��������е�����BoId
                 *
                 * @return ��������е�����BoId
                 */
                getAttFileBoIdList():$.java.util.List;
                /**
                 * ��ȡ��������п�����id
                 *
                 * @return ids
                 */
                getAttPersonIds():$.java.util.List;
                /**
                 * �����������
                 *
                 * @return endDate
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ���㿪ʼ����
                 *
                 * @return startDate
                 */
                getStartDate():$.java.time.LocalDate;
            }
            type TieRequestExt_T = TieRequestBaseExt & TieRequestExt_S & TieRequestExt$;
            interface TieRequestExt extends TieRequestExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.otcal{
            interface OtRuleCalConfigExt_S {
            }
            interface OtRuleCalConfigExt$ {
                /**
                 * @return �Ӱ�ʱ����Դ
                 */
                getDataSources():long;
                /**
                 * @return �������ڷ�Χjson
                 */
                getDateRangeCondition():string;
                /**
                 * @return ��¼����
                 */
                getEntryId():long;
                /**
                 * @return �޶�����JSON�ַ���
                 */
                getLimitScope():string;
                /**
                 * @return �������-������ʽ��¼
                 */
                getMatchOtRuleCalCompenConfig():OtRuleCalCompenConfigExt;
                /**
                 * @return ������ʽ
                 * 0 ��
                 * 2 �Ӱ��
                 * 3 ����
                 * A03 Ա����ѡ
                 */
                getOtCompenMode():string;
                /**
                 * @return ������ʽ��¼
                 */
                getOtRuleCalCompenConfigs():$.java.util.List;
                /**
                 * @return �Ӱ�����ID
                 */
                getOtType():long;
                /**
                 * �Ƿ�Ա����ѡ
                 * @return �Ƿ�Ա����ѡ,true-��;null/false��
                 */
                isEmpChoice():boolean;
            }
            type OtRuleCalConfigExt_T = OtRuleCalConfigExt_S & OtRuleCalConfigExt$;
            interface OtRuleCalConfigExt extends OtRuleCalConfigExt_T {
            }
            interface OtRulePackageExt_S {
            }
            interface OtRulePackageExt$ {
                /**
                 * �Ӱ�����¼
                 *
                 * @return �Ӱ�����¼(unmodifyable)
                 */
                getOtRuleCalConfigList():$.java.util.List;
            }
            type OtRulePackageExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & OtRulePackageExt_S & OtRulePackageExt$;
            interface OtRulePackageExt extends OtRulePackageExt_T {
            }
            interface OtSubTimeItemExt_S {
            }
            interface OtSubTimeItemExt$ {
                /**
                 * @return ��ʼʱ��(����)
                 */
                getBeginTime():number;
                /**
                 * @return ����ʱ��(����)
                 */
                getEndTime():number;
            }
            type OtSubTimeItemExt_T = OtSubTimeItemExt_S & OtSubTimeItemExt$;
            interface OtSubTimeItemExt extends OtSubTimeItemExt_T {
            }
            interface OtRuleCalCompenConfigExt_S {
            }
            interface OtRuleCalCompenConfigExt$ {
                /**
                 * ��ȡ�������ID
                 *
                 * @return �������ID
                 */
                getBfRoundingRule():long;
                /**
                 * ��ȡ��¼����
                 *
                 * @return ��¼����
                 */
                getEntryId():long;
                /**
                 * @return ����ʱ��������ĿBOID
                 */
                getOriginalCalPrjSet():$.java.util.Set;
                /**
                 * @return ����ʱ�����ã����ӣ�
                 */
                getOriginalConf():$.java.math.BigDecimal;
                /**
                 * ԭʼʱ��������ĿBOID
                 *
                 * @return ԭʼʱ��������ĿBOID
                 */
                getOriginalPrjSet():$.java.util.Set;
                /**
                 * ��ȡ������ʽ
                 *
                 * @return ������ʽ
                 */
                getOtCompenMode():long;
                /**
                 * ���ݸ����������ڻ�ȡ�ۼ�����
                 *
                 * @param chainDate ��������
                 * @return �ۼ�����
                 */
                getOtSubConfig(chainDate:$.java.time.LocalDate):OtSubConfigExt;
                /**
                 * ��ȡ���ʱ��������ĿBOID
                 *
                 * @return ���ʱ��������Ŀ
                 */
                getResultPrjSet():$.java.util.Set;
                /**
                 * ��ȡ�ۼ�ʱ��������ĿID����BOID
                 *
                 * @return �ۼ�ʱ��������ĿID����
                 */
                getSubPrjSet():$.java.util.Set;
            }
            type OtRuleCalCompenConfigExt_T = OtRuleCalCompenConfigExt_S & OtRuleCalCompenConfigExt$;
            interface OtRuleCalCompenConfigExt extends OtRuleCalCompenConfigExt_T {
            }
            interface OtSubConfigExt_S {
            }
            interface OtSubConfigExt$ {
                /**
                 * @return ָ��ʱ����Сʱ��
                 */
                getDesTimes():$.java.math.BigDecimal;
                /**
                 * ��ȡ�ۼ��̶�ʱ����Сʱ��
                 *
                 * @return �ۼ��̶�ʱ����Сʱ��
                 */
                getFixTimes():$.java.math.BigDecimal;
                /**
                 * @return �����۳�
                 */
                getOtDeductSubTimeItemList():$.java.util.List;
                /**
                 * @return ʱ���
                 */
                getOtSubTimeItemList():$.java.util.List;
                /**
                 * @return �ۼ�Ĭ����Ϣʱ��
                 */
                getSelectSub():string;
                /**
                 * ��ȡ�ۼ���ʽ
                 *
                 * @return �ۼ���ʽ A: ���ۼ� B: �۳��̶�ʱ�� C: �۳�Ĭ����Ϣʱ�� D: �����۳� E: �۳��̶�ʱ��
                 */
                getSubType():string;
            }
            type OtSubConfigExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & OtSubConfigExt_S & OtSubConfigExt$;
            interface OtSubConfigExt extends OtSubConfigExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.perattperiod{
            interface PerAttPeriodExt_S {
            }
            interface PerAttPeriodExt$ {
                /**
                 * ��������
                 */
                getAscriptionYearMonth():string;
                /**
                 * ���ڵ���BoId
                 */
                getAttFileBoId():long;
                /**
                 * ���ڵ����汾id
                 */
                getAttFileId():long;
                /**
                 * �ڼ����ʱ��
                 */
                getAttPeriodEndDate():Date;
                /**
                 * �ڼ�id
                 */
                getAttPeriodId():long;
                /**
                 * �ڼ俪ʼʱ��
                 */
                getAttPeriodStartDate():Date;
                /**
                 * ҵ����Ա�����ڼ�id����ɣ���Աid+"_"+�ڼ�id+��Ա�����ڼ俪ʼʱ��yyyy-MM-dd
                 */
                getId():string;
                /**
                 * ��ʱ��������id
                 */
                getMhsa():long;
                /**
                 * �ڼ���ˮ��
                 */
                getNumber():string;
                /**
                 * ��Ա�����ڼ俪ʼʱ��
                 */
                getPerAttBeginDate():Date;
                /**
                 * ��Ա�����ڼ����ʱ��
                 */
                getPerAttEndDate():Date;
                /**
                 * ��Ա�����ڼ�����
                 */
                getPerAttPeriodName():string;
                /**
                 * ����Id
                 */
                getPeriodId():long;
                /**
                 * ��������
                 */
                getPeriodName():string;
                /**
                 * ����
                 */
                getPersonId():long;
                /**
                 * ��������
                 */
                getPrimaryId():long;
                /**
                 * ����δ���
                 */
                isFirstNotStorage():boolean;
                /**
                 * �����ѷ��
                 */
                isLastStorage():boolean;
            }
            type PerAttPeriodExt_T = kd.sdk.wtc.wtes.business.tie.model.common.DataAttributeExtendable & PerAttPeriodExt_S & PerAttPeriodExt$;
            interface PerAttPeriodExt extends PerAttPeriodExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.roster{
            interface DateTypeExt_S {
            }
            interface DateTypeExt$ {
                /**
                 * id
                 */
                getId():long;
                /**
                 * ����
                 */
                getName():string;
                /**
                 * ����
                 */
                getNumber():string;
            }
            type DateTypeExt_T = DateTypeExt_S & DateTypeExt$;
            interface DateTypeExt extends DateTypeExt_T {
            }
            interface RosterExt_S {
            }
            interface RosterExt$ {
                /**
                 * ��������
                 */
                getDateAttributeId():long;
                /**
                 * ��������
                 */
                getDateType():DateTypeExt;
                /**
                 * ����id���������ʱ�����ŷָ�
                 */
                getHoliday():string;
                /**
                 * ����id
                 */
                getId():long;
                /**
                 * �Ű�����
                 */
                getRosterDate():$.java.time.LocalDate;
                /**
                 * �Ű�����
                 */
                getRosterType():string;
                /**
                 * �����Ϣ
                 */
                getShiftSpec():ShiftSpecExt;
            }
            type RosterExt_T = RosterExt_S & RosterExt$;
            interface RosterExt extends RosterExt_T {
            }
            interface ShiftTableExt_S {
            }
            interface ShiftTableExt$ {
                shiftTableSingle(personid:long):ShiftTableSingleExt;
            }
            type ShiftTableExt_T = ShiftTableExt_S & ShiftTableExt$;
            interface ShiftTableExt extends ShiftTableExt_T {
            }
            interface ShiftMiddleRuleExt_S {
            }
            interface ShiftMiddleRuleExt$ {
                /**
                 * �������
                 */
                getAllDay():$.java.math.BigDecimal;
                /**
                 * ȫ����ʱ��
                 */
                getAllDayHour():$.java.math.BigDecimal;
                /**
                 * ����������
                 */
                getHalfDay():$.java.math.BigDecimal;
                /**
                 * ������ʱ��
                 */
                getHalfDayHour():$.java.math.BigDecimal;
                /**
                 * ����м�ָ��
                 */
                getMiddlePoint():number;
                /**
                 * ����м�ָ�������
                 */
                getMiddleRefDate():string;
            }
            type ShiftMiddleRuleExt_T = ShiftMiddleRuleExt_S & ShiftMiddleRuleExt$;
            interface ShiftMiddleRuleExt extends ShiftMiddleRuleExt_T {
            }
            interface RosterExtMap_S {
            }
            interface RosterExtMap$ {
                /**
                 * �������ڻ�ȡ��Ӧ����Ű�
                 *
                 * @param localDate ����
                 * @return �Ű�
                 */
                getByDate(localDate:$.java.time.LocalDate):RosterExt;
            }
            type RosterExtMap_T = RosterExtMap_S & RosterExtMap$;
            interface RosterExtMap extends RosterExtMap_T {
            }
            interface ShiftSpecExt_S {
                readonly DEFAULT_DIVIDE_SCALE:number;
                readonly SECOND_OF_ONE_HOUR:number;
            }
            interface ShiftSpecExt$ {
                /**
                 * ��ת��
                 *
                 * @param days
                 * @return
                 */
                daysToSecondDecimal(days:$.java.math.BigDecimal):$.java.math.BigDecimal;
                getAllDayHour():$.java.math.BigDecimal;
                /**
                 * ��Ϣʱ��
                 */
                getBreakTime():number;
                /**
                 * �����ϰ�ʱ��
                 */
                getEarliestShiftTime():$.java.time.LocalTime;
                /**
                 * �����ϰ�ʱ�������
                 */
                getFirstRefDateType():string;
                /**
                 * �����°�ʱ�������
                 */
                getLastRefDateType():string;
                /**
                 * �����°�ʱ��
                 */
                getLastShiftTime():$.java.time.LocalTime;
                /**
                 * �Ӱ�ʱ��
                 */
                getOtTime():number;
                /**
                 * ��������������
                 */
                getShiftMiddleRule():ShiftMiddleRuleExt;
                /**
                 * ���ʱ����Ϣ
                 */
                getShiftSession():$.java.util.List;
                /**
                 * ���ʱ��
                 */
                getShiftTime():number;
                /**
                 * ������� A- �̶����; B- ȫ�쵯�԰�� C- ����ʱ�ε��԰�� X- δ֪(����ֵ)
                 */
                getShiftType():string;
                /**
                 * ȫ����ʱ��
                 */
                getStandardTime():number;
                /**
                 * ����ʱ����Ϣ
                 */
                getWorkSession():$.java.util.List;
                /**
                 * ����ʱ��
                 */
                getWorkTime():number;
                /**
                 * �Ƿ���off��
                 */
                isOff():boolean;
                /**
                 * �Ƿ����޼ƻ�ʱ��
                 */
                isOffNonPlan():boolean;
                /**
                 * ��ת��
                 *
                 * @param seconds
                 * @return
                 */
                secondsToDays(seconds:$.java.math.BigDecimal):$.java.math.BigDecimal;
            }
            type ShiftSpecExt_T = ShiftSpecExt_S & ShiftSpecExt$;
            interface ShiftSpecExt extends ShiftSpecExt_T {
            }
            interface ShiftTableSingleExt_S {
            }
            interface ShiftTableSingleExt$ {
                getRoster(localDate:$.java.time.LocalDate):RosterExt;
            }
            type ShiftTableSingleExt_T = ShiftTableSingleExt_S & ShiftTableSingleExt$;
            interface ShiftTableSingleExt extends ShiftTableSingleExt_T {
            }
            interface ShiftSessionExt_S {
            }
            interface ShiftSessionExt$ {
                /**
                 * ��ȡ�����°�Ӧ��ʱ��
                 * @return
                 */
                getAbsoluteShiftEndDate(checkDate:$.java.time.LocalDate):$.java.time.LocalDateTime;
                /**
                 * ��ȡ�����ϰ�Ӧ��ʱ��
                 * @return
                 */
                getAbsoluteShiftStartDate(checkDate:$.java.time.LocalDate):$.java.time.LocalDateTime;
                /**
                 * ʱ��ʱ������λ�룩
                 * �������0
                 */
                getDurationInSeconds():number;
                /**
                 * ʱ�ν���ʱ��ο���������
                 */
                getEndRefDateType():string;
                /**
                 * ʱ�ν���ʱ��
                 */
                getEndTime():$.java.time.LocalTime;
                /**
                 * id
                 */
                getId():long;
                /**
                 * ʱ������
                 */
                getOutWorkType():string;
                /**
                 * ʱ�ο�ʼʱ��ο���������
                 */
                getStartRefDateType():string;
                /**
                 * ʱ�ο�ʼʱ��
                 */
                getStartTime():$.java.time.LocalTime;
                /**
                 * ʱ�ο�ʼ�Ƿ���Ҫ��
                 */
                isRequiredPunchIn():boolean;
                /**
                 * ʱ�ν����Ƿ���Ҫ��
                 */
                isRequiredPunchOut():boolean;
            }
            type ShiftSessionExt_T = ShiftSessionExt_S & ShiftSessionExt$;
            interface ShiftSessionExt extends ShiftSessionExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.timebucket{
            interface AttBillTimeBucketExt_S {
            }
            interface AttBillTimeBucketExt$ {
                /**
                 * ��������������id
                 */
                getAttPersonId():long;
                /**
                 * ����id
                 */
                getBillId():long;
                /**
                 * ��ʱ�ε�������
                 * ��ö�� {@link kd.wtc.wtes.common.enums.BillNonPlanEnum}
                 */
                getBillNonPlan():string;
                /**
                 * ����С�࣬�����ݼ��ֲַ��١���ٵȣ��Ӱ�����id
                 * һ����ЩС�౻����Ϊ�������ϻ���ö�٣��ֶ�����Ҳ�᲻ͬ������ͳһתΪ�����Σ�ʹ��ʱ��Ҫ���ֳ���
                 */
                getBillType():long;
                /**
                 * ���ݷ��ࣨ���ࣩ������Ӱ൥���ݼٵ��������
                 * ������{@link kd.wtc.wtes.common.constants.AttBillCategoryConst}
                 */
                getBillTypeBig():string;
                /**
                 * ������ʽ
                 */
                getCompenType():number;
                /**
                 * ������ʽ
                 */
                getCompenTypeId():long;
                /**
                 * ��ʱ�ε������ͣ��Զ���ʱ��ʱ����ֵ
                 */
                getDuration():long;
                /**
                 * ʱ�ν���ʱ��
                 */
                getEndTime():$.java.time.LocalDateTime;
                getEntryRowDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ʱ��id,�����ݼ����뵥�ݣ�����ǲ���٣�����ӵ������ID��������¼ID
                 */
                getId():long;
                /**
                 * ���ݱ���
                 */
                getNumber():string;
                /**
                 * �Ű�����
                 * ʱ�η������Ű�����
                 */
                getRosterDate():$.java.time.LocalDate;
                /**
                 * ʱ�ο�ʼʱ��
                 */
                getStartTime():$.java.time.LocalDateTime;
                /**
                 * ʱ�η���
                 * ��ö��{@link kd.wtc.wtes.common.enums.BillTimeBucketType}
                 */
                getType():string;
                newInstanceResetTime(attBillTimeBucketExt:AttBillTimeBucketExt,rosterDate:$.java.time.LocalDate,startTime:$.java.time.LocalDateTime,endTime:$.java.time.LocalDateTime):this;
                /**
                 * �����µĿ�ʼ�ͽ���ʱ�䣬�ӵ�ǰtimeBucket�в�ֳ��µ�TimeBucket������ʼʱ��ͽ���ʱ���⣬���Ǹ����Ե�ǰ����ע�⵱ǰ��֧����ʱ�ε�timebucket��֣�
                 *
                 * @param newStart �µĿ�ʼʱ��
                 * @param newEnd   �µĽ���ʱ��
                 * @return AttBillTimeBucketExt �µ�timeBucket
                 */
                split(newStart:$.java.time.LocalDateTime,newEnd:$.java.time.LocalDateTime):this;
            }
            type AttBillTimeBucketExt_T = AttBillTimeBucketExt_S & AttBillTimeBucketExt$;
            interface AttBillTimeBucketExt extends AttBillTimeBucketExt_T {
            }
            interface TimeBucketExt_S {
            }
            interface TimeBucketExt$ {
                /**
                 * ʱ��Թ����յ��������� �ο�ö�� DateAttribute
                 */
                getDateAttribute():long;
                /**
                 * ����ʱ��
                 */
                getEndTime():$.java.time.LocalDateTime;
                /**
                 * ��ʼʱ��
                 */
                getStartTime():$.java.time.LocalDateTime;
                /**
                 * ��ʼʱ��ͽ���ʱ�����
                 */
                getTbSecond():$.java.math.BigDecimal;
            }
            type TimeBucketExt_T = TimeBucketExt_S & TimeBucketExt$;
            interface TimeBucketExt extends TimeBucketExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.tvl{
            interface TravelRuleExt_S {
            }
            interface TravelRuleExt$ {
                /**
                 * ��ȡ��������¼
                 *
                 * @return ��������¼
                 */
                getEntryPackageList():$.java.util.List;
            }
            type TravelRuleExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & TravelRuleExt_S & TravelRuleExt$;
            interface TravelRuleExt extends TravelRuleExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.model.va{
            interface VaCalculateRuleExt_S {
            }
            interface VaCalculateRuleExt$ {
                /**
                 * ��ȡ�������ڷ�ΧJSON�ַ���
                 *
                 * @return �������ڷ�ΧJSON�ַ���
                 */
                getCondition():string;
                /**
                 * ��ȡ����ۼ�����BOID
                 *
                 * @return ����ۼ�����BOID
                 */
                getDeductionRuleId():long;
                /**
                 * ��ȡ �޶�������JSON�ַ���
                 *
                 * @return �޶�������JSON�ַ���
                 */
                getLimitJson():string;
                /**
                 * ��ȡԭʼʱ����ĿBOID
                 *
                 * @return ԭʼʱ����ĿBOID
                 */
                getOriginId():long;
                /**
                 * ��ȡ���� ���ʱ��������ĿBOID
                 *
                 * @return ���ʱ��������ĿBOID
                 */
                getResultId():long;
                /**
                 * ��ȡ���� ����ʱ����ĿBOID
                 *
                 * @return ����ʱ����ĿBOID
                 */
                getRoundAttId():long;
                /**
                 * ��ȡ�������BOID
                 *
                 * @return �������BOID
                 */
                getRoundRuleId():long;
                /**
                 * ������ת��ʱ��������ĿBOID
                 *
                 * @return ���ת��ʱ��������ĿBOID
                 */
                getTimeByDayItemId():long;
                /**
                 * ���ת��ʱ��������ĿBOID
                 *
                 * @return ���ת��ʱ��������ĿBOID
                 */
                getTimeByShiftItemId():long;
                /**
                 * ���ݿ��ں������ڻ�ȡ��Ӧ�յ��ݼٻ�������
                 *
                 * @param chainDate ������
                 * @return �ݼٻ�������
                 */
                getVaBaseSetPackage(chainDate:$.java.time.LocalDate):VaBaseSetPackageExt;
                /**
                 * ��ȡ�ݼ�����ID
                 *
                 * @return �ݼ�����ID
                 */
                getVaTypeId():long;
                /**
                 * �Ƿ��ȼ�
                 *
                 * @return true-�ǣ�false-��
                 */
                isQuota():boolean;
            }
            type VaCalculateRuleExt_T = VaCalculateRuleExt_S & VaCalculateRuleExt$;
            interface VaCalculateRuleExt extends VaCalculateRuleExt_T {
            }
            interface VaBaseSetPackageExt_S {
                readonly HALFDAYTYPE_A:string;
                readonly HALFDAYTYPE_B:string;
                readonly HALFDAYTYPE_C:string;
                readonly TIMECALCTYPE_A:string;
                readonly TIMECALCTYPE_B:string;
            }
            interface VaBaseSetPackageExt$ {
                /**
                 * ��ȡ����ָʽ
                 *
                 * @return A-����ָʽ_����ָ��;B-����ָʽ_��α�׼ʱ��/2��C-����ָʽ_ȫ����ʱ��/2
                 */
                getHalfDayType():string;
                /**
                 * ��ȡ�ݼ�ʱ�����㷽ʽ
                 *
                 * @return �ݼ�ʱ�����㷽ʽ A-�ݼ�ʱ�����㷽ʽ_����� B-�ݼ�ʱ�����㷽ʽ_��������
                 */
                getTimeCalcType():string;
                /**
                 * ���ڼӰ��Ƿ��������ʱ��
                 *
                 * @return true-���룻false-������
                 */
                isContainOverTime():boolean;
            }
            type VaBaseSetPackageExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & VaBaseSetPackageExt_S & VaBaseSetPackageExt$;
            interface VaBaseSetPackageExt extends VaBaseSetPackageExt_T {
            }
            interface VaRulePackageExt_S {
            }
            interface VaRulePackageExt$ {
                /**
                 * ��ȡ�ݼٹ����¼
                 *
                 * @return �ݼٹ����¼
                 */
                getEntryPackageList():$.java.util.List;
            }
            type VaRulePackageExt_T = kd.sdk.wtc.wtbs.common.timeseq.TimeSeqVersionExt & VaRulePackageExt_S & VaRulePackageExt$;
            interface VaRulePackageExt extends VaRulePackageExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.persistent.clean{
            interface AfterCleanHisDataEvent_S {
            }
            interface AfterCleanHisDataEvent_C extends AfterCleanHisDataEvent_S {
                new(attSubjects:$.java.util.List,version:string):AfterCleanHisDataEvent;
            }
            interface AfterCleanHisDataEvent$ {
                /**
                 * ��ȡ���ں�������
                 *
                 * @return ���ں�������
                 */
                getAttSubjects():$.java.util.List;
                /**
                 * ��ȡ�����
                 *
                 * @return �����
                 */
                getVersion():string;
            }
            type AfterCleanHisDataEvent_T = AfterCleanHisDataEvent_S & AfterCleanHisDataEvent$;
            interface AfterCleanHisDataEvent extends AfterCleanHisDataEvent_T {
            }
            interface TieCleanExDataExtPlugin_S {
            }
            interface TieCleanExDataExtPlugin$ {
                /**
                 * �����쳣���ݺ����¼�������֧�������쳣���ں��������ݺ�����չ�߼�������ɾ���Ϳ����쳣���ں��������ݡ�
                 * <p>����Ʒ�����쳣����ִ�к󣬵��ô���չ��ɾ�����Ի����쳣���ں���������</p>
                 * <pre><code>
                 * public void afterCleanExData(AfterCleanExDataEvent afterCleanExDataEvent) {
                 *         try {
                 *             // ��ȡ������Ϣ����
                 *             List<AttStateExt> attStateExtList = afterCleanExDataEvent.getAttStateExtList();
                 *             // ҳ�淢���������Ŀ��ڵ���boId������ʵ�ʺ����
                 *             List<Long> requestAttFileBoIdList = afterCleanExDataEvent.getTieRequestExt().getAttFileBoIdList();
                 *             // ��¼���쳣�Ŀ��ڵ���boId
                 *             List<Long> attFileBoIdList = new ArrayList<>();
                 *             for (AttStateExt attStateInfoBO : attStateExtList) {
                 *                 // �ж��Ƿ����쳣
                 *                 if (attStateInfoBO.isExState() != null && !attStateInfoBO.isExState()) {
                 *                     continue;
                 *                 }
                 *                 // ��������
                 *                 Date lockToDate = attStateInfoBO.getLockTo();
                 *                 // �쳣��ʼ����
                 *                 Date exStartDate = attStateInfoBO.getExcStartDate();
                 *                 // �쳣��������
                 *                 Date exEndDate = attStateInfoBO.getExcEndDate();
                 *                 // ����BoId
                 *                 Long fileBoId = attStateInfoBO.getFileBoId();
                 *                 if (lockToDate != null && lockToDate.getTime() >= exStartDate.getTime()) {
                 *                     // �����
                 *                 } else {
                 *                     attFileBoIdList.add(fileBoId);
                 *                     // �簴���ڵ���boId���쳣��ʼ���ڽ�������
                 *                     // doClearByAttFileBoId(fileBoId, exStartDate);
                 *                 }
                 *             }
                 *         } catch (Exception ex) {
                 *             logger.warn("TieCleanExDataExtPluginDemo.afterCleanExData error", ex);
                 *         }
                 *     }
                 * </code></pre>
                 *
                 * @param afterCleanExDataEvent �����쳣���ݺ����¼�
                 */
                afterCleanExData(afterCleanExDataEvent:AfterCleanExDataEvent):void;
            }
            type TieCleanExDataExtPlugin_T = TieCleanExDataExtPlugin_S & TieCleanExDataExtPlugin$;
            interface TieCleanExDataExtPlugin extends TieCleanExDataExtPlugin_T {
            }
            interface TieCleanHisDataExtPlugin_S {
            }
            interface TieCleanHisDataExtPlugin$ {
                /**
                 * ������ʷ���ݺ����¼�������֧����������ʷ���ں��������ݺ�����չ�߼�������ɾ���Ϳ��Ŀ��ں��������ݡ�
                 * <p>����Ʒ������ʷ����ִ�к󣬵��ô���չ��ɾ�����Ի��Ŀ��ں���������</p>
                 * <pre><code>
                 *    public void afterCleanHisData(AfterCleanHisDataEvent afterCleanHisDataEvent) {
                 *         try {
                 *             // ���ں�������
                 *             List<TieAttSubjectExt> attSubjects = afterCleanHisDataEvent.getAttSubjects();
                 *             // ���������������
                 *             List<QFilter> qFilterList = new ArrayList<>();
                 *             QFilter qFilterKey;
                 *             Map<String, Tuple<QFilter, List<Long>>> qFilterListMap = new HashMap<>();
                 *             for (TieAttSubjectExt attSubject : attSubjects) {
                 *                 // attSubject.getStartDate()Ϊ��ʼʱ�䣻attSubject.getEndDate()Ϊ����ʱ�䣻
                 *                 qFilterKey = new QFilter("perperiodbegindate", QCP.less_equals, attSubject.getEndDate())
                 *                         .and("perperiodenddate", QCP.large_equals, attSubject.getStartDate());
                 *                 Tuple<QFilter, List<Long>> personIdList = qFilterListMap.get(qFilterKey.toString());
                 *                 if (personIdList == null) {
                 *                     personIdList = new Tuple<>(qFilterKey, new ArrayList<>());
                 *                 }
                 *
                 *                 for (TieAttFileBoExt attFileBo : attSubject.getAttFileBos()) {
                 *                     // ���ڵ����µĿ��ڴ�boId
                 *                     personIdList.getValue().add(attFileBo.getAttFileBoId());
                 *                 }
                 *                 qFilterListMap.put(qFilterKey.toString(), personIdList);
                 *             }
                 *             QFilter result;
                 *             for (Map.Entry<String, Tuple<QFilter, List<Long>>> entry : qFilterListMap.entrySet()) {
                 *                 if (entry.getValue().getValue().size() == 1) {
                 *                     result = new QFilter("attfileid", QCP.equals, entry.getValue().getValue().get(0)).and(entry.getValue().getKey());
                 *                 } else {
                 *                     result = new QFilter("attfileid", QCP.in, entry.getValue().getValue()).and(entry.getValue().getKey());
                 *                 }
                 *                 qFilterList.add(result);
                 *             }
                 *             QFilter qFilter = null;
                 *             // ��װ�������
                 *             for (QFilter filter : qFilterList) {
                 *                 if (null == qFilter) {
                 *                     qFilter = filter;
                 *                 } else {
                 *                     qFilter.or(filter);
                 *                 }
                 *             }
                 *             // ���ݹ���Ĳ��������Լ���չ��Ԫ��������
                 *             // serviceHelper.deleteByFilter(new QFilter[]{qFilter});
                 *         } catch (Exception ex) {
                 *             logger.warn("TieCleanHisDataExtPluginDemo.afterCleanHisData error", ex);
                 *         }
                 *     }
                 * </code></pre>
                 *
                 * @param afterCleanHisDataEvent ������ʷ���ݺ����¼�
                 */
                afterCleanHisData(afterCleanHisDataEvent:AfterCleanHisDataEvent):void;
            }
            type TieCleanHisDataExtPlugin_T = TieCleanHisDataExtPlugin_S & TieCleanHisDataExtPlugin$;
            interface TieCleanHisDataExtPlugin extends TieCleanHisDataExtPlugin_T {
            }
            interface AfterCleanExDataEvent_S {
            }
            interface AfterCleanExDataEvent_C extends AfterCleanExDataEvent_S {
                new(attStateExtList:$.java.util.List,tieRequestExt:kd.sdk.wtc.wtes.business.tie.model.init.TieRequestExt):AfterCleanExDataEvent;
            }
            interface AfterCleanExDataEvent$ {
                /**
                 * ��ȡ������Ϣ����
                 *
                 * @return ������Ϣ����
                 */
                getAttStateExtList():$.java.util.List;
                /**
                 * ��ȡ���ں����������
                 *
                 * @return ���ں����������
                 */
                getTieRequestExt():kd.sdk.wtc.wtes.business.tie.model.init.TieRequestExt;
            }
            type AfterCleanExDataEvent_T = AfterCleanExDataEvent_S & AfterCleanExDataEvent$;
            interface AfterCleanExDataEvent extends AfterCleanExDataEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.persistent.daily{
            interface TieSaveDailyDataExtPlugin_S {
            }
            interface TieSaveDailyDataExtPlugin$ {
                /**
                 * д�뿼�ں�����ϸ�������ǰ���¼�������֧���ڿ�����ϸ���������д����չ�ֶΡ�
                 * <p>����Ʒ������ϸ����������ǰ�����ô���չ���ڿ�����ϸ���������д����չ�ֶ�</p>
                 * <pre><code>
                 *         public void beforeSaveDailyDataResult(BeforeSaveDailyDataResultEvent beforeSaveDailyDataResultEvent) {
                 *         // ���ں��������� ���Ի�ȡ�Ű࣬������Ŀ���壬��չ��������Ա��Ϣ
                 *         TieContentPersistentExt tieContentPersistentExt = beforeSaveDailyDataResultEvent.getTieContentPersistentExt();
                 *         // ����ϸ��Ŀ���������ϸ��Ŀ��ϸ���Ӧ��ϵ����
                 *         List<TieDataResultRelExt> tieDataResultRelExtList = beforeSaveDailyDataResultEvent.getTieDataResultRelExtList();
                 *         for (int i = 0; i < tieDataResultRelExtList.size(); i++) {
                 *             // ����ϸ��Ŀ���������ϸ��Ŀ��ϸ���Ӧ��ϵ
                 *             TieDataResultRelExt tieDataResultRelExt = tieDataResultRelExtList.get(i);
                 *             // tieDataResultRelExt.getMainObject()Ϊ����ϸ��Ŀ����Ԫ����Ϊ(wtdtd_attrecordbase)��paramsext1��paramsext2Ϊ��չ�ֶ�
                 *             // ����ϸ�����ܸ��ǵ��ֶ�Ϊ"createtime", "calculatedate", "reckoner", "personid", "orgid", "owndate", "datetype", "dateattr", "shiftvid", "shiftid", "departmentvid", "companyvid", "positionvid", "jobvid", "mode", "versionid", "perattperiodid", "perperiodenddate", "perperiodbegindate", "attperattperiodid", "managescopevid", "affiliateadminorgvid", "attperattperiodpk", "attfileid", "attfilevid"
                 *             // ͨ��setExtProperties������չ���Ե�ֵ����������ʧ�ܵļ�ֵ��
                 *             Map<String, String> failMap = tieDataResultRelExt.getMainObject().setExtProperties("paramsext1", i);
                 *             tieDataResultRelExt.getMainObject().setExtProperties("paramsext2", tieDataResultRelExt.getDetailObjects().size());
                 *             // tieDataResultRelExt.getDetailObjects()����ϸ��Ŀ��ϸ��Ԫ����Ϊ(wtdtd_attrecorddetail)��paramsext1��paramsext2Ϊ��չ�ֶ�
                 *             // ����ϸ��Ŀ��ϸ���ܸ��ǵ��ֶ�Ϊ"owndate", "attitemtype", "attitemvid", "attitemid", "value", "valuesecond", "valuestring", "valuelong", "sourceattitemids", "attmain", "managingscope", "empgroup", "dependency", "dependencytype", "agreedworkplace", "workplace"
                 *             List<TieDataResultExt> detailObjects = tieDataResultRelExt.getDetailObjects();
                 *             for (int j = 0; j < detailObjects.size(); j++) {
                 *                 TieDataResultExt tieDataResultExt = detailObjects.get(j);
                 *                 tieDataResultExt.setExtProperties("paramsext1", i);
                 *                 tieDataResultExt.setExtProperties("paramsext2", j);
                 *             }
                 *         }
                 *     }
                 * </code></pre>
                 *
                 * @param beforeSaveDailyDataResultEvent д�뿼�ں�����ϸ�������ǰ���¼�
                 */
                beforeSaveDailyDataResult(beforeSaveDailyDataResultEvent:BeforeSaveDailyDataResultEvent):void;
            }
            type TieSaveDailyDataExtPlugin_T = TieSaveDailyDataExtPlugin_S & TieSaveDailyDataExtPlugin$;
            interface TieSaveDailyDataExtPlugin extends TieSaveDailyDataExtPlugin_T {
            }
            interface BeforeSaveDailyDataResultEvent_S {
            }
            interface BeforeSaveDailyDataResultEvent_C extends BeforeSaveDailyDataResultEvent_S {
                new(tieDataResultRelExtList:$.java.util.List,tieContentPersistentExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContentPersistentExt):BeforeSaveDailyDataResultEvent;
            }
            interface BeforeSaveDailyDataResultEvent$ {
                /**
                 * ��ȡ���ں��㹹��������
                 *
                 * @return ���ں��㹹��������
                 */
                getTieContentPersistentExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContentPersistentExt;
                /**
                 * ��ȡ����ϸ��Ŀ���������ϸ��Ŀ��ϸ���Ӧ��ϵ����
                 * ����ϸ��Ŀ����Ԫ���ݣ�wtdtd_attrecordbase��
                 * ����ϸ��Ŀ��ϸ��Ԫ���ݣ�wtdtd_attrecorddetail��
                 *
                 * @return ����ϸ��Ŀ���������ϸ��Ŀ��ϸ���Ӧ��ϵ����
                 */
                getTieDataResultRelExtList():$.java.util.List;
            }
            type BeforeSaveDailyDataResultEvent_T = BeforeSaveDailyDataResultEvent_S & BeforeSaveDailyDataResultEvent$;
            interface BeforeSaveDailyDataResultEvent extends BeforeSaveDailyDataResultEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.persistent.period{
            interface TieSavePerPeriodDataExtPlugin_S {
            }
            interface TieSavePerPeriodDataExtPlugin$ {
                /**
                 * д�뿼�ں�����ܽ������ǰ���¼�������֧���ڿ��ڻ��ܼ�¼���������д����չ�ֶΡ�
                 * <p>����Ʒ�ڼ���ܽ���������ǰ�����ô���չ���ڿ��ڻ��ܼ�¼���������д����չ�ֶ�</p>
                 * <pre><code>
                 *     public void beforeSavePerPeriodDataResult(BeforeSavePerPeriodDataResultEvent beforeSavePerPeriodDataResultEvent) {
                 *         // ���ں����ڼ���������ģ���ҳ�����������ʵ�ʿ��ں������壬����Ҫ�ڼ���ܵ���Ա�����ڼ伯�ϵ�
                 *         TieAttPeriodContextExt tieAttPeriodContextExt = beforeSavePerPeriodDataResultEvent.getTieAttPeriodContextExt();
                 *         // �ڼ����������ڼ������ϸ���Ӧ��ϵ����
                 *         List<TieDataResultRelExt> tieDataResultRelExtList = beforeSavePerPeriodDataResultEvent.getTieDataResultRelExtList();
                 *         // ҳ���������
                 *         TieRequestExt tieRequestExt = beforeSavePerPeriodDataResultEvent.getTieAttPeriodContextExt().getTieRequestExt();
                 *         for (int i = 0; i < tieDataResultRelExtList.size(); i++) {
                 *             // �ڼ����������ڼ������ϸ���Ӧ��ϵ
                 *             TieDataResultRelExt tieDataResultRelExt = tieDataResultRelExtList.get(i);
                 *             // tieDataResultRelExt.getMainObject()Ϊ�ڼ��������Ԫ����Ϊ(wtctd_atttotalbase)��paramsext1��paramsext2Ϊ��չ�ֶ�
                 *             // �ڼ���������ܸ��ǵ��ֶ�Ϊ"personid", "orgid", "companyvid", "positionvid", "departmentvid", "jobvid", "modifierfieldname", "createtime", "calculatedate", "versionid", "managescopevid", "affiliateadminorgvid", "reckoner", "attfileid", "attfilevid", "perattperiodid", "attperattperiodid", "perperiodbegindate", "perperiodenddate", "attperattperiodpk"
                 *             // ͨ��setExtProperties������չ���Ե�ֵ����������ʧ�ܵļ�ֵ��
                 *             Map<String, String> failMap = tieDataResultRelExt.getMainObject().setExtProperties("paramsext1", i);
                 *             tieDataResultRelExt.getMainObject().setExtProperties("paramsext2", tieRequestExt.getVersion());
                 *             // tieDataResultRelExt.getDetailObjects()�ڼ������ϸ��Ԫ����Ϊ(wtctd_atttotaldetail)��paramsext1��paramsext2Ϊ��չ�ֶ�
                 *             // �ڼ������ϸ���ܸ��ǵ��ֶ�Ϊ"perattperiodid", "attmain", "attitemtype", "attitemvid", "attitemid", "valuelong", "managingscope", "empgroup", "dependency", "dependencytype", "agreedworkplace", "workplace"
                 *             List<TieDataResultExt> detailObjects = tieDataResultRelExt.getDetailObjects();
                 *             for (int j = 0; j < detailObjects.size(); j++) {
                 *                 TieDataResultExt tieDataResultExt = detailObjects.get(j);
                 *                 tieDataResultExt.setExtProperties("paramsext1", j);
                 *                 tieDataResultExt.setExtProperties("paramsext2", tieRequestExt.getVersion());
                 *             }
                 *         }
                 * </code></pre>
                 *
                 * @param beforeSavePerPeriodDataResultEvent д�뿼�ں�����ܽ������ǰ���¼�
                 */
                beforeSavePerPeriodDataResult(beforeSavePerPeriodDataResultEvent:BeforeSavePerPeriodDataResultEvent):void;
            }
            type TieSavePerPeriodDataExtPlugin_T = TieSavePerPeriodDataExtPlugin_S & TieSavePerPeriodDataExtPlugin$;
            interface TieSavePerPeriodDataExtPlugin extends TieSavePerPeriodDataExtPlugin_T {
            }
            interface BeforeSavePerPeriodDataResultEvent_S {
            }
            interface BeforeSavePerPeriodDataResultEvent_C extends BeforeSavePerPeriodDataResultEvent_S {
                new(tieDataResultRelExtList:$.java.util.List,tieAttPeriodContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt):BeforeSavePerPeriodDataResultEvent;
            }
            interface BeforeSavePerPeriodDataResultEvent$ {
                /**
                 * ��ȡ���ں����ڼ����������
                 *
                 * @return ���ں����ڼ����������
                 */
                getTieAttPeriodContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt;
                /**
                 * ��ȡ�ڼ����������ڼ������ϸ���Ӧ��ϵ����
                 * �ڼ��������Ԫ����(wtctd_atttotalbase)
                 * �ڼ������ϸ��Ԫ����(wtctd_atttotaldetail)
                 *
                 * @return �ڼ����������ڼ������ϸ���Ӧ��ϵ����
                 */
                getTieDataResultRelExtList():$.java.util.List;
            }
            type BeforeSavePerPeriodDataResultEvent_T = BeforeSavePerPeriodDataResultEvent_S & BeforeSavePerPeriodDataResultEvent$;
            interface BeforeSavePerPeriodDataResultEvent extends BeforeSavePerPeriodDataResultEvent_T {
            }
            interface AfterSaveAllPerPeriodDataResultEvent_S {
            }
            interface AfterSaveAllPerPeriodDataResultEvent_C extends AfterSaveAllPerPeriodDataResultEvent_S {
                new(tieDataResultRelExtList:$.java.util.List,tieAttPeriodContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt):AfterSaveAllPerPeriodDataResultEvent;
            }
            interface AfterSaveAllPerPeriodDataResultEvent$ {
                /**
                 * ��ȡ���ں����ڼ����������
                 *
                 * @return ���ں����ڼ����������
                 */
                getTieAttPeriodContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt;
                /**
                 * ��ȡ�ڼ����������ڼ������ϸ���Ӧ��ϵ����
                 * �ڼ��������Ԫ����(wtctd_atttotalbase)
                 * �ڼ������ϸ��Ԫ����(wtctd_atttotaldetail)
                 *
                 * @return �ڼ����������ڼ������ϸ���Ӧ��ϵ����
                 */
                getTieDataResultRelExtList():$.java.util.List;
            }
            type AfterSaveAllPerPeriodDataResultEvent_T = AfterSaveAllPerPeriodDataResultEvent_S & AfterSaveAllPerPeriodDataResultEvent$;
            interface AfterSaveAllPerPeriodDataResultEvent extends AfterSaveAllPerPeriodDataResultEvent_T {
            }
            interface TieSaveAllAttPeriodDataExtPlugin_S {
            }
            interface TieSaveAllAttPeriodDataExtPlugin$ {
                /**
                 * д�����п��ں�����ܽ�����ݺ����¼�������֧���ڻ��ܺ���������д�������չ�߼�������д�������ڼ�������ݡ�
                 * <p>����Ʒ�ڼ���ܽ���������󣬵��ô���չ��������Ի�����չ�߼�������д�������ڼ��������</p>
                 * <pre><code>
                 *     public void afterSaveAllPerPeriodDataResult(AfterSaveAllPerPeriodDataResultEvent afterSaveAllPerPeriodDataResultEvent) {
                 *         try {
                 *             // ���ں����ڼ���������ģ���ҳ�����������ʵ�ʿ��ں������壬����Ҫ�ڼ���ܵ���Ա�����ڼ伯�ϵ�
                 *             TieAttPeriodContextExt tieAttPeriodContextExt = afterSaveAllPerPeriodDataResultEvent.getTieAttPeriodContextExt();
                 *             // ���ں����ҳ���������
                 *             TieRequestExt tieRequestExt = tieAttPeriodContextExt.getTieRequestExt();
                 *             // ʵ�ʵĿ��ں�������
                 *             List<TieAttSubjectExt> attSubjects = tieAttPeriodContextExt.getAttSubjects();
                 *             DynamicObjectCollection dynamicObjects = new DynamicObjectCollection();
                 *             attSubjects.forEach(item -> {
                 *                 // ����Ԫ���ݣ�kdtest_wtctd_atttotal����̬����
                 *                 DynamicObject ext = BusinessDataServiceHelper.newDynamicObject("kdtest_wtctd_atttotal");
                 *                 ext.set("taskid", tieRequestExt.getTaskId());
                 *                 ext.set("version", tieRequestExt.getVersion());
                 *                 ext.set("totalpersoncount", attSubjects.size());
                 *                 ext.set("personid", item.getAttPersonId());
                 *                 dynamicObjects.add(ext);
                 *             });
                 *             HRBaseServiceHelper serviceHelper = new HRBaseServiceHelper("kdtest_wtctd_atttotal");
                 *             // �������
                 *             serviceHelper.save(dynamicObjects);
                 *         } catch (Exception ex) {
                 *             logger.warn("TieSaveAllAttPeriodDataExtPluginDemo.afterSaveAllPerPeriodDataResult error", ex);
                 *         }
                 *     }
                 * </code></pre>
                 *
                 * @param afterSaveAllPerPeriodDataResultEvent д�����п��ں�����ܽ�����ݺ����¼�
                 */
                afterSaveAllPerPeriodDataResult(afterSaveAllPerPeriodDataResultEvent:AfterSaveAllPerPeriodDataResultEvent):void;
            }
            type TieSaveAllAttPeriodDataExtPlugin_T = TieSaveAllAttPeriodDataExtPlugin_S & TieSaveAllAttPeriodDataExtPlugin$;
            interface TieSaveAllAttPeriodDataExtPlugin extends TieSaveAllAttPeriodDataExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.persistent.utils{
            interface TieDataResultExt_S {
            }
            interface TieDataResultExt_C extends TieDataResultExt_S {
                new(blackList:$.java.util.Set,dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):TieDataResultExt;
            }
            interface TieDataResultExt$ {
                /**
                 * �����������ƻ�ȡ����ֵ
                 *
                 * @param propertyName ��������
                 * @return ����ֵ
                 */
                getProperty(propertyName:string):any;
                /**
                 * ��ȡ���е����ԺͶ�Ӧֵ
                 *
                 * @return ��ֵ��
                 */
                getPropertyMap():$.java.util.Map;
                /**
                 * �������Լ�ֵ��������չ�ֶε�����ֵ
                 *
                 * @param propertyMap �������ƺ�����ֵ��ֵ��
                 * @return ��������ʧ�ܵ����Ժ�ԭ��
                 */
                setExtProperties(propertyMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ������ֵ���ƺ�����ֵ������չ�ֶε�����ֵ
                 *
                 * @param propertyName ��������
                 * @param value        ����ֵ
                 * @return ��������ʧ�ܵ����Ժ�ԭ��
                 */
                setExtProperties(propertyName:string,value:any):$.java.util.Map;
            }
            type TieDataResultExt_T = TieDataResultExt_S & TieDataResultExt$;
            interface TieDataResultExt extends TieDataResultExt_T {
            }
            interface TieDataResultRelExt_S {
            }
            interface TieDataResultRelExt_C extends TieDataResultRelExt_S {
                new(mainObject:TieDataResultExt,detailObjects:$.java.util.List):TieDataResultRelExt;
            }
            interface TieDataResultRelExt$ {
                /**
                 * ��ȡ��ϸ��
                 *
                 * @return ��ϸ��
                 */
                getDetailObjects():$.java.util.List;
                /**
                 * ��ȡ����
                 *
                 * @return ����
                 */
                getMainObject():TieDataResultExt;
            }
            type TieDataResultRelExt_T = TieDataResultRelExt_S & TieDataResultRelExt$;
            interface TieDataResultRelExt extends TieDataResultRelExt_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.tie.task{
            interface TieTaskEndExtPlugin_S {
            }
            interface TieTaskEndExtPlugin$ {
                /**
                 * ���ں����Ƭ������������¼���֧���ڿ��ں����Ƭ�������������Ի�����չ�߼���
                 * <p>����Ʒ���ں����Ƭ��������󣬵��ô���չ��������Ի�����չ�߼�</p>
                 * <pre><code>
                 *         Long taskId = afterTieTaskEndEvent.getTaskId();
                 *         Long subTaskId = afterTieTaskEndEvent.getSubTaskId();
                 *         String version = afterTieTaskEndEvent.getVersion();
                 *         Set<Long> attFileBoIds = afterTieTaskEndEvent.getAttFileBoIds();
                 *         logger.info("���ں����Ƭ���������չ�ӿ�taskId={},subTaskId={},version={},attFileBoIds={}", taskId, subTaskId, version, attFileBoIds);
                 * </code></pre>
                 *
                 * @param afterTieTaskEndEvent ���ں����Ƭ������������¼�
                 */
                afterTieTaskEnd(afterTieTaskEndEvent:AfterTieTaskEndEvent):void;
            }
            type TieTaskEndExtPlugin_T = TieTaskEndExtPlugin_S & TieTaskEndExtPlugin$;
            interface TieTaskEndExtPlugin extends TieTaskEndExtPlugin_T {
            }
            interface AfterTieTaskEndEvent_S {
            }
            interface AfterTieTaskEndEvent_C extends AfterTieTaskEndEvent_S {
                new(taskId:long,subTaskId:long,version:string,attFileBoIds:$.java.util.Set):AfterTieTaskEndEvent;
            }
            interface AfterTieTaskEndEvent$ {
                /**
                 * ��ȡ���ں����Ƭ�����в������Ŀ��ڵ���boId����
                 * ���������Ĳ�������
                 *
                 * @return ���ں����Ƭ�����в������Ŀ��ڵ���boId����
                 */
                getAttFileBoIds():$.java.util.Set;
                /**
                 * ��ȡ�����Ƭ����id
                 *
                 * @return ��Ƭ����id
                 */
                getSubTaskId():long;
                /**
                 * ��ȡ����������id
                 *
                 * @return ������id
                 */
                getTaskId():long;
                /**
                 * ��ȡ���������
                 *
                 * @return ���������
                 */
                getVersion():string;
            }
            type AfterTieTaskEndEvent_T = AfterTieTaskEndEvent_S & AfterTieTaskEndEvent$;
            interface AfterTieTaskEndEvent extends AfterTieTaskEndEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtes.business.timecut{
            interface TimeCutMatchExtPlugin_S {
            }
            interface TimeCutMatchExtPlugin$ {
                /**
                 * ���㴥������ ��չ��ʱ���з�����ƥ��������ֶ� ��Ӧ�Ľ�����¼�
                 * <p>
                 * ʱ���з�����ƥ��������ֶ�������֮����Щ��չ�ֶεĽ����������ͨ��ʵ�ָýӿ�������
                 *
                 * @param onTimeCutMatchEvent ���㴥��������չ��ʱ���з������¼�����
                 */
                onTimeCutMatch(onTimeCutMatchEvent:OnTimeCutMatchEvent):void;
            }
            type TimeCutMatchExtPlugin_T = TimeCutMatchExtPlugin_S & TimeCutMatchExtPlugin$;
            interface TimeCutMatchExtPlugin extends TimeCutMatchExtPlugin_T {
            }
            interface OnTimeCutMatchEvent_S {
            }
            interface OnTimeCutMatchEvent_C extends OnTimeCutMatchEvent_S {
                new(tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt,refDateType:kd.sdk.wtc.wtbs.common.enums.RefDateType,conditionDtoExt:kd.sdk.wtc.wtbs.common.access.ConditionDtoExt,wtcDateRangeSource:kd.sdk.wtc.wtbs.common.enums.WTCDateRangeSource):OnTimeCutMatchEvent;
            }
            interface OnTimeCutMatchEvent$ {
                /**
                 * ��ȡ�������ʽ
                 * @return �������ʽ
                 */
                getConditionDtoExt():kd.sdk.wtc.wtbs.common.access.ConditionDtoExt;
                /**
                 * ��ȡ�ο���������
                 * @return �ο���������
                 */
                getRefDateType():kd.sdk.wtc.wtbs.common.enums.RefDateType;
                /**
                 * ��ȡƥ����
                 * @return ƥ����
                 */
                getResult():boolean;
                /**
                 * ��ȡ����������Ķ���
                 * @return ����������Ķ���
                 */
                getTieContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                /**
                 * ��ȡ���ڷ�Χ��չ��Դö��
                 * @return ���ڷ�Χ��չ��Դö��
                 */
                getWtcDateRangeSource():kd.sdk.wtc.wtbs.common.enums.WTCDateRangeSource;
                /**
                 * ����ƥ����
                 * @param result ����ֵ
                 */
                setResult(result:boolean):void;
            }
            type OnTimeCutMatchEvent_T = OnTimeCutMatchEvent_S & OnTimeCutMatchEvent$;
            interface OnTimeCutMatchEvent extends OnTimeCutMatchEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtis{
            interface SdkWtcWtisModule_S {
            }
            type SdkWtcWtisModule_ST = $.kd.sdk.module.Module & SdkWtcWtisModule_S;
            interface SdkWtcWtisModule_C extends SdkWtcWtisModule_ST {
                new():SdkWtcWtisModule;
            }
            interface SdkWtcWtisModule$ {
            }
            type SdkWtcWtisModule_T = $.kd.sdk.module.Module & SdkWtcWtisModule_S & SdkWtcWtisModule$;
            interface SdkWtcWtisModule extends SdkWtcWtisModule_T {
            }
        }
        namespace kd.sdk.wtc.wtis.business.attdata{
            interface BeforeSavePayAttDataInfoEvent_S {
            }
            interface BeforeSavePayAttDataInfoEvent_C extends BeforeSavePayAttDataInfoEvent_S {
                new(version:string,mainTaskId:long,taskId:long,rule:$.kd.bos.dataentity.entity.DynamicObject,periodInfo:$.kd.bos.dataentity.entity.DynamicObject):BeforeSavePayAttDataInfoEvent;
            }
            interface BeforeSavePayAttDataInfoEvent$ {
                /**
                 * ������id
                 * @return ������id
                 */
                getMainTaskId():long;
                /**
                 * ���ɻ��ܵ���Ŀ��ϸ������;�˼��ϲ�֧�ֱ����ֻ�ܶ�DynamicObject�����������
                 * @return  ���ɻ��ܵ���Ŀ��ϸ������
                 */
                getPayAttDataInfoList():$.java.util.List;
                /**
                 * �ڼ���Ϣ
                 * @return �ڼ���Ϣ
                 */
                getPeriodInfo():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���͹���
                 *
                 * @return ���͹���
                 */
                getRule():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������id
                 * @return ������id
                 */
                getTaskId():long;
                /**
                 * �����
                 * @return �����
                 */
                getVersion():string;
                /**
                 * ���ɻ��ܵ���Ŀ��ϸ������
                 */
                setPayAttDataInfoList(payAttDataInfoList:$.java.util.List):void;
            }
            type BeforeSavePayAttDataInfoEvent_T = BeforeSavePayAttDataInfoEvent_S & BeforeSavePayAttDataInfoEvent$;
            interface BeforeSavePayAttDataInfoEvent extends BeforeSavePayAttDataInfoEvent_T {
            }
            interface DoSetExtFieldEvent_S {
            }
            interface DoSetExtFieldEvent_C extends DoSetExtFieldEvent_S {
                /**
                 * ���췽��
                 * @param payAttDataInfo ���ݿ�鵽������ (T_WTIS_PAYATTDATAINFO)
                 * @param restOneData ���ص�ÿ������,����ж������ӵ��ֶΣ�����˳���� restOneData �������
                 */
                new(payAttDataInfo:$.kd.bos.dataentity.entity.DynamicObject,restOneData:$.java.util.List):DoSetExtFieldEvent;
            }
            interface DoSetExtFieldEvent$ {
                /**
                 * @return ���ݿ�鵽������ (T_WTIS_PAYATTDATAINFO)
                 */
                getPayAttDataInfo():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * @return ���ص�ÿ������,����ж������ӵ��ֶΣ�����˳���� restOneData �������
                 */
                getRestOneData():$.java.util.List;
            }
            type DoSetExtFieldEvent_T = DoSetExtFieldEvent_S & DoSetExtFieldEvent$;
            interface DoSetExtFieldEvent extends DoSetExtFieldEvent_T {
            }
            interface PayAttDataInfoExtPluginDemo_S {
            }
            type PayAttDataInfoExtPluginDemo_ST = PayAttDataInfoExtPlugin_S & PayAttDataInfoExtPluginDemo_S;
            interface PayAttDataInfoExtPluginDemo_C extends PayAttDataInfoExtPluginDemo_ST {
                new():PayAttDataInfoExtPluginDemo;
            }
            interface PayAttDataInfoExtPluginDemo$ {
            }
            type PayAttDataInfoExtPluginDemo_T = PayAttDataInfoExtPlugin & PayAttDataInfoExtPluginDemo_S & PayAttDataInfoExtPluginDemo$;
            interface PayAttDataInfoExtPluginDemo extends PayAttDataInfoExtPluginDemo_T {
            }
            interface AttDataPushReq_S {
            }
            type AttDataPushReq_ST = $.java.io.Serializable & AttDataPushReq_S;
            interface AttDataPushReq_C extends AttDataPushReq_ST {
                new():AttDataPushReq;
            }
            interface AttDataPushReq$ {
                /**
                 * ��ȡ���ͷ�ʽ����ѡ��Ĭ��ֵΪ1��
                 *
                 * @return ��ȡ���ͷ�ʽ��1��������У��ͨ�������ݣ�2��ȫ��У��ͨ������������
                 */
                getPushType():string;
                /**
                 * ��ȡ���������������ΰ汾�ţ��ش���
                 *
                 * @return ���������������ΰ汾��
                 */
                getVersion():string;
                /**
                 * ��ȡ���ͷ�ʽ
                 *
                 * @param pushType ��ȡ���ͷ�ʽ��1��������У��ͨ�������ݣ�2��ȫ��У��ͨ������������
                 */
                setPushType(pushType:string):void;
                /**
                 * ���ÿ��������������ΰ汾��
                 *
                 * @param version ���������������ΰ汾��
                 */
                setVersion(version:string):void;
            }
            type AttDataPushReq_T = $.java.io.Serializable & AttDataPushReq_S & AttDataPushReq$;
            interface AttDataPushReq extends AttDataPushReq_T {
            }
            interface PayAttDataInfoExtPlugin_S {
            }
            interface PayAttDataInfoExtPlugin$ {
                /**
                 * ��ȡ�����¼ʱҪ���ӵĶ����ֶ�
                 *
                 * @return Ҫ���ӵĶ����ֶΣ�Ҫ�������ݷ��뷵�ؽ���У�����ÿ�����ݴ���ķ�����doSetExtFieldValue��Ҫ�������˳�򱣳�һ��
                 */
                beforePayAttDataInfoAddExtField():$.java.util.List;
                /**
                 * ��֧�ֵ�������ɹ��ɹ��Ŀ��ڵ����Ļ���������ϸ
                 * �����������ɣ��˷������ڱ�����Ŀ��ϸ����֮ǰ�����
                 *
                 * @param event ����������ʱ��һЩ������Ҫ������ϸ���������
                 */
                beforeSavePayAttDataInfo(event:BeforeSavePayAttDataInfoEvent):void;
                /**
                 * ÿ����������ݴ���
                 */
                doSetExtFieldValue(event:DoSetExtFieldEvent):void;
            }
            type PayAttDataInfoExtPlugin_T = PayAttDataInfoExtPlugin_S & PayAttDataInfoExtPlugin$;
            interface PayAttDataInfoExtPlugin extends PayAttDataInfoExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtis.business.coordination{
            interface AttFileSchemeDto_S {
            }
            interface AttFileSchemeDto_C extends AttFileSchemeDto_S {
                new():AttFileSchemeDto;
            }
            interface AttFileSchemeDto$ {
                getAttMode():kd.sdk.wtc.wtp.business.attfile.AttMode;
                /**
                 * ���ڷ�����boId
                 */
                getAttendPlanBoId():long;
                /**
                 * ���ڿ���
                 */
                getCard():string;
                /**
                 * �쳣������boId
                 */
                getExceptionPlanBoId():long;
                /**
                 * ����������boId
                 */
                getIncAndDecPlanBoId():long;
                /**
                 * �Ӱ෽����boId
                 */
                getOvertimePlanBoId():long;
                /**
                 * �������ڵ�id
                 */
                getPeriodId():long;
                /**
                 * �������boId
                 */
                getQuotaPlanBoId():long;
                /**
                 * ��ǩ������boId
                 */
                getSupplePlanBoId():long;
                /**
                 * ʱ����id
                 */
                getTimeZoneId():long;
                /**
                 * �������boId
                 */
                getTravelPlanBoId():long;
                /**
                 * �ݼٷ�����boId
                 */
                getVacationPlanBoId():long;
                /**
                 * �����ճ̱��id
                 */
                getWorkScheduleId():long;
                setAttMode(attMode:kd.sdk.wtc.wtp.business.attfile.AttMode):void;
                /**
                 * ���ڷ�����boId
                 */
                setAttendPlanBoId(attendPlanBoId:long):void;
                /**
                 * ���ڿ���
                 */
                setCard(card:string):void;
                /**
                 * �쳣������boId
                 */
                setExceptionPlanBoId(exceptionPlanBoId:long):void;
                /**
                 * ����������boId
                 */
                setIncAndDecPlanBoId(incAndDecPlanBoId:long):void;
                /**
                 * �Ӱ෽����boId
                 */
                setOvertimePlanBoId(overtimePlanBoId:long):void;
                /**
                 * �������ڵ�id
                 */
                setPeriodId(periodId:long):void;
                /**
                 * �������boId
                 */
                setQuotaPlanBoId(quotaPlanBoId:long):void;
                /**
                 * ��ǩ������boId
                 */
                setSupplePlanBoId(supplePlanBoId:long):void;
                /**
                 * ʱ����id
                 */
                setTimeZoneId(timeZoneId:long):void;
                /**
                 * �������boId
                 */
                setTravelPlanBoId(travelPlanBoId:long):void;
                /**
                 * �ݼٷ�����boId
                 */
                setVacationPlanBoId(vacationPlanBoId:long):void;
                /**
                 * �����ճ̱��id
                 */
                setWorkScheduleId(workScheduleId:long):void;
            }
            type AttFileSchemeDto_T = AttFileSchemeDto_S & AttFileSchemeDto$;
            interface AttFileSchemeDto extends AttFileSchemeDto_T {
            }
            interface EntryCoordinationParam_S {
            }
            interface EntryCoordinationParam_C extends EntryCoordinationParam_S {
                new():EntryCoordinationParam;
            }
            interface EntryCoordinationParam$ {
                /**
                 * ��ְ����id
                 *
                 * @return ��ְ����id
                 */
                getEmpPosOrgRelId():long;
                /**
                 * Эͬ��־����
                 *
                 * @return Эͬ��־����
                 */
                getLogNo():string;
                /**
                 * ��Ȼ��id
                 *
                 * @return ��Ȼ��id
                 */
                getPersonId():long;
                /**
                 * ��ְ����id
                 *
                 * @param empPosOrgRelId ��ְ����id
                 */
                setEmpPosOrgRelId(empPosOrgRelId:long):void;
                /**
                 * Эͬ��־����
                 *
                 * @param logNo Эͬ��־����
                 */
                setLogNo(logNo:string):void;
                /**
                 * ��Ȼ��id
                 *
                 * @param personId ��Ȼ��id
                 */
                setPersonId(personId:long):void;
            }
            type EntryCoordinationParam_T = EntryCoordinationParam_S & EntryCoordinationParam$;
            interface EntryCoordinationParam extends EntryCoordinationParam_T {
            }
            interface NewAttFileCoordinationExpService_S {
            }
            interface NewAttFileCoordinationExpService$ {
                /**
                 * Ա����ְ��ʱ�����ɵ����Ļ��������͹��򷽰���
                 * <p>
                 * Ա����ְ��ʱ�򣬹�ʱ���ڻ����������¼���ͨ����̨Эͬ���ɵ�����
                 * �����ɵĵ���ĿǰĬ����û�й��򷽰��ͻ��������ģ�����ͨ�����ӿ���չʵ�������ɶ�Ӧ�Ĺ��򷽰��ͻ���������
                 *
                 * @param entryCoordinationParam ��ְЭͬ���ɵ�����ҵ�����
                 * @return �����Ļ��������͹��򷽰���dto������޷���ȡ���ʵķ��������򷵻�null
                 */
                genAttFileSchemeForEntry(entryCoordinationParam:EntryCoordinationParam):AttFileSchemeDto;
            }
            type NewAttFileCoordinationExpService_T = NewAttFileCoordinationExpService_S & NewAttFileCoordinationExpService$;
            interface NewAttFileCoordinationExpService extends NewAttFileCoordinationExpService_T {
            }
        }
        namespace kd.sdk.wtc.wtis.business.helper{
            interface WTISServiceHelper_S {
                /**
                 * �·�����������������
                 *
                 * @param attDataPushReq ������������������
                 * @return ��������������Ӧ���
                 */
                dispatchAttPushTask(attDataPushReq:kd.sdk.wtc.wtis.business.attdata.AttDataPushReq):kd.sdk.wtc.wtbs.task.DispatchTaskResp;
                /**
                 * �����������ͷ����������
                 *
                 * @param attSumTaskReq �����������������
                 * @return ����������Ӧ���
                 */
                dispatchAttSumTask(attSumTaskReq:kd.sdk.wtc.wtis.business.task.AttSumTaskReq):kd.sdk.wtc.wtbs.task.DispatchTaskResp;
            }
            interface WTISServiceHelper_C extends WTISServiceHelper_S {
                new():WTISServiceHelper;
            }
            interface WTISServiceHelper$ {
            }
            type WTISServiceHelper_T = WTISServiceHelper_S & WTISServiceHelper$;
            interface WTISServiceHelper extends WTISServiceHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtis.business.task{
            interface AttSumTaskReq_S {
            }
            type AttSumTaskReq_ST = $.java.io.Serializable & AttSumTaskReq_S;
            interface AttSumTaskReq_C extends AttSumTaskReq_ST {
                new():AttSumTaskReq;
            }
            interface AttSumTaskReq$ {
                /**
                 * ������֯ids
                 */
                getAdminOrgIds():$.java.util.List;
                /**
                 * ���ڵ���boId����
                 */
                getAttFileBoIds():$.java.util.List;
                /**
                 * �����ڼ�id
                 *
                 * @return �����ڼ�id
                 */
                getAttPeriodId():long;
                /**
                 * �ų�����ids
                 */
                getExtantFileBoIds():$.java.util.List;
                /**
                 * �����������͹���
                 *
                 * @return �����������͹���
                 */
                getGenRuleId():long;
                /**
                 * ������֯
                 *
                 * @return ������֯
                 */
                getOrg():long;
                /**
                 * ����������֯���ϣ����ѯ���õ�������֯�Լ��¼���������֯ + �ڿ����ڼ�������Ч�ĵ���
                 * ����������������֯����
                 * ˵�����������Ϻ�������֯���������Ĳ���ȡ��ѯ����
                 * @param adminOrgIds ������֯����
                 */
                setAdminOrgIds(adminOrgIds:$.java.util.List):void;
                /**
                 * ���ÿ��ڵ���boId���ϣ���������ʱ���ᱣ���ڼ�������Ч�ĵ���
                 * ���������ÿ��ڵ���boId����
                 * ˵�����������Ϻ�������֯���������Ĳ���ȡ��ѯ����
                 * @param attFileBoIds ���ڵ���boId����
                 */
                setAttFileBoIds(attFileBoIds:$.java.util.List):void;
                /**
                 * ���ÿ����ڼ�
                 * �������������ÿ����ڼ�
                 * ˵�������δ�ջ������ʱ���ɻ�ʧ��
                 *
                 * @param attPeriodId �����ڼ�id
                 */
                setAttPeriodId(attPeriodId:long):void;
                /**
                 * ���������������֯����Ҫ�ų�������֯�µ�ĳЩ������������Ҫ�ų����ɵĵ�������
                 * ������������֯��Ҫ�ų����ɵĵ�������
                 * ˵����������֯��Ҫ�ų����ɵĵ�������
                 * @param extantFileBoIds ������֯��Ҫ�ų����ɵĵ�������
                 */
                setExtantFileBoIds(extantFileBoIds:$.java.util.List):void;
                /**
                 * ���ÿ����������͹���
                 * ���������ÿ����������͹���
                 * ˵�������Ϊ�ջ������ʱ�������ʧ��
                 * @param genRuleId ���ÿ����������͹���
                 */
                setGenRuleId(genRuleId:long):void;
                /**
                 * ���ÿ�����֯
                 * ���������û��ܵ���������Ŀ�����֯
                 * ˵�����Ǳ�����û��ȡ��ǰ�û��Ŀ�����֯
                 *
                 * @param org ������֯
                 */
                setOrg(org:long):void;
            }
            type AttSumTaskReq_T = $.java.io.Serializable & AttSumTaskReq_S & AttSumTaskReq$;
            interface AttSumTaskReq extends AttSumTaskReq_T {
            }
        }
        namespace kd.sdk.wtc.wtom{
            interface OnMatchOtDutyDateEvent_S {
            }
            interface OnMatchOtDutyDateEvent_C extends OnMatchOtDutyDateEvent_S {
                new():OnMatchOtDutyDateEvent;
            }
            interface OnMatchOtDutyDateEvent$ {
                getOtDutyDateParams():$.java.util.List;
                setOtDutyDateParams(otDutyDateParams:$.java.util.List):void;
            }
            type OnMatchOtDutyDateEvent_T = OnMatchOtDutyDateEvent_S & OnMatchOtDutyDateEvent$;
            interface OnMatchOtDutyDateEvent extends OnMatchOtDutyDateEvent_T {
            }
            interface OtDutyDateParam_S {
            }
            interface OtDutyDateParam_C extends OtDutyDateParam_S {
                new(otBillDy:$.kd.bos.dataentity.entity.DynamicObject,entryDy:$.kd.bos.dataentity.entity.DynamicObject,entryIndex:number,standardDutyDate:Date):OtDutyDateParam;
            }
            interface OtDutyDateParam$ {
                /**
                 * ��ȡ�û��Զ���ļӰ�����
                 * @return �û��Զ���ļӰ�����
                 */
                getCustomizedDutyDate():Date;
                /**
                 * ��༭���ڵļӰ൥��¼��̬����
                 * @return  ��¼��̬����
                 */
                getEntryDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��༭���ڵļӰ൥��¼��
                 * @return �к�
                 */
                getEntryIndex():number;
                /**
                 * ��༭���ڵļӰ൥��̬������֧��ʵ�壺wtom_overtimeapplybill��wtom_otbillself��
                 * @return �Ӱ൥��̬����
                 */
                getOtBillDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ƷĬ�Ϸ��صı�׼����
                 * @return ��ƷĬ�Ϸ��صı�׼����
                 */
                getStandardDutyDate():Date;
                /**
                 * �����û��Զ���ļӰ�����
                 * @param customizedDutyDate �û��Զ���ļӰ�����
                 */
                setCustomizedDutyDate(customizedDutyDate:Date):void;
            }
            type OtDutyDateParam_T = OtDutyDateParam_S & OtDutyDateParam$;
            interface OtDutyDateParam extends OtDutyDateParam_T {
            }
            interface SdkWtcWtomModule_S {
            }
            type SdkWtcWtomModule_ST = $.kd.sdk.module.Module & SdkWtcWtomModule_S;
            interface SdkWtcWtomModule_C extends SdkWtcWtomModule_ST {
                new():SdkWtcWtomModule;
            }
            interface SdkWtcWtomModule$ {
            }
            type SdkWtcWtomModule_T = $.kd.sdk.module.Module & SdkWtcWtomModule_S & SdkWtcWtomModule$;
            interface SdkWtcWtomModule extends SdkWtcWtomModule_T {
            }
        }
        namespace kd.sdk.wtc.wtom.business{
            interface OtDutyDateExtPlugin_S {
            }
            interface OtDutyDateExtPlugin$ {
                /**
                 * ʱ�������Զ���Ӱ�ʱ�䡣
                 *
                 * <p>��ʱ������ļӰ൥������ݸýӿڵ�ʵ�֣������û��Զ��ļӰ����ڵ������ϡ�
                 * OtDutyDateParam ע�⣺
                 * 1������׼���ڲ�Ϊ�գ��Զ���ļӰ����ڷ��ز���Ϊ��
                 * 2���Ӱ�ʱ������ڰ���ڲ��������������ǰ��ʱ�Σ����������Ϊǰ����Ű�����Ϊ�Ӱ�����
                 * 3���Զ���Ӱ����������ĵ�����������Ű�
                 * 4���Զ���Ӱ�����ֻ�ܷ�����㣬��2023-11-06 00:00:00 ,������Ϊ2023-11-06 16:30:00
                 * </p>
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param onMatchOtDutyDateEvent �Ӱ൥�Ӱ������¼�
                 */
                onMatchOtDutyDate(onMatchOtDutyDateEvent:OnMatchOtDutyDateEvent):void;
            }
            type OtDutyDateExtPlugin_T = OtDutyDateExtPlugin_S & OtDutyDateExtPlugin$;
            interface OtDutyDateExtPlugin extends OtDutyDateExtPlugin_T {
            }
            interface WtomHelper_S {
            }
            interface WtomHelper_C extends WtomHelper_S {
                new():WtomHelper;
            }
            interface WtomHelper$ {
                /**
                 * ��ȡ�Ӱ���򣨰���ƥ��ļ������
                 *
                 * <p>���ݻ�ȡ�Ӱ���򣨰���ƥ��ļ������</p>
                 *
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param otRuleQuery ���������Ϣ
                 */
                getOTRuleInfo(otRuleQuery:$.java.util.List):$.java.util.List;
                /**
                 * ��ȡ��׼�Ӱ�����
                 *
                 * <p>��ȡ��׼��Ʒ�߼��µļӰ�����</p>
                 *
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param standardDutyDateParam ������Ϣ
                 */
                getStandardDutyDate(standardDutyDateParam:$.java.util.List):$.java.util.List;
                /**
                 *  �������롢Ϊ��������Ӱ൥У��
                 *
                 *  <pre>
                 *  failCode У����
                 *
                 * MUST_INPUT	��¼
                 *  	������Ϣ��id,attfile,attfilebasef7,personid,applytyperadio,ischange,isnewbill,originalid,parent,iscancel,otapplytype,sdottype
                 *  	ʱ����Ϣ��sdottype,otstartdate,otenddate
                 *  	ʱ����Ϣ��scottype,otdate,otdtime
                 *  ATTACHMENT	����У��
                 *  LARGETZERO	����ʱ����Ҫ����0У��
                 *  OVER24INONEBILL	��ǰ���ݷ�¼��Ӧ�ļӰ�����С��24СʱУ��
                 *  REPEATINONEBILL	��ǰ���ݷ�¼��ʱ���ص�У��
                 *  EACHDATESHIFT	����ļӰ�ʱ��ÿ������Ű�У��
                 *  EXISTDUTYDATE	�Ӱ����ڣ������գ�����У��
                 *  SHIFT	�Ӱ����ڣ������գ��Ű�У��
                 *  INSHIF	����ʱ���Ƿ��ڳ���ʱ����У��
                 *  DUTYAUTH	�Ӱ����ڣ������գ�����Ȩ��У��
                 *  SIMULATION_PERIOD	�Ӱ����ڣ������գ�ģ��ʱ��У��
                 *  OVER24	��ͬ���ݼ�24СʱУ��
                 *  REPEAT	��ͬ���ݼ�ʱ���ظ�У��
                 *  SUSPEND	�Ӱ����ڣ������գ���ͣ����У��
                 *  FROZEN	�Ӱ����ڣ������գ�����У��
                 *  PLANS	�Ӱ����ڣ������գ���������У��
                 *  RULE	�Ӱ����ڣ������գ��������У��
                 *  BASESET	�Ӱ����ڣ������գ�������������
                 *  MINOT	�Ӱ����ڣ������գ�������С�Ӱ�ʱ��У��
                 *  ADVANCE_AND_AFTER	�Ӱ����ڣ������գ�����Ԥ�Ჹ��У��
                 *  MAX_LIMIT_ADVANCE	�Ӱ����ڣ������գ���������ᵥ��ΧУ��
                 *  REASON	ԭ�����У��
                 *  SCFLXS	���Ƶ��԰��Ӱ�У��
                 *  FLXS	���Ƶ��԰��Ӱ�У��
                 *  COMPENSATION	������ʽ��ȷ��У��
                 *  LARGERTIME	����ʱ����ڿ�ʼʱ��
                 *
                 *  </pre>
                 *
                 *  @param otBillDys �Ӱ൥��У����������Ϊ�գ��򷵻ؿռ��ϡ�
                 *  @param appId Ӧ�ñ�ʶ���� �ճ����ڣ�wtam��������У�鵵����Ȩ��(Ĭ���ճ����ڣ�wtam��)
                 *  @return  �Ӱ�У��������
                 */
                validateOtBills(otBillDys:$.java.util.List,appId:string):$.java.util.List;
            }
            type WtomHelper_T = WtomHelper_S & WtomHelper$;
            interface WtomHelper extends WtomHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtom.business.applytime{
            interface OtApplyTimeExtPlugin_S {
            }
            interface OtApplyTimeExtPlugin$ {
                /**
                 * ʱ�������Զ���Ӱ�ʱ�䡣
                 *
                 * <p>��չʾ������</p>
                 * <pre><code>
                 * </code></pre>
                 *
                 * @param onCalOtApplyTimeEvent �Ӱ൥ʱ������Ӱ�ʱ�������¼�
                 */
                onSetOtApplyTimeEvent(onCalOtApplyTimeEvent:OnCalOtApplyTimeEvent):void;
            }
            type OtApplyTimeExtPlugin_T = OtApplyTimeExtPlugin_S & OtApplyTimeExtPlugin$;
            interface OtApplyTimeExtPlugin extends OtApplyTimeExtPlugin_T {
            }
            interface OnCalOtApplyTimeEvent_S {
            }
            interface OnCalOtApplyTimeEvent_C extends OnCalOtApplyTimeEvent_S {
                new(onSetOtApplyTimeQuery:OnSetOtApplyTimeQuery,applyTimeInSec:number):OnCalOtApplyTimeEvent;
            }
            interface OnCalOtApplyTimeEvent$ {
                getApplyTimeInSec():number;
                getOnSetOtApplyTimeQuery():OnSetOtApplyTimeQuery;
                setApplyTimeInSec(applyTimeInSec:number):void;
            }
            type OnCalOtApplyTimeEvent_T = OnCalOtApplyTimeEvent_S & OnCalOtApplyTimeEvent$;
            interface OnCalOtApplyTimeEvent extends OnCalOtApplyTimeEvent_T {
            }
            interface OnSetOtApplyTimeQuery_S {
            }
            interface OnSetOtApplyTimeQuery_C extends OnSetOtApplyTimeQuery_S {
                new():OnSetOtApplyTimeQuery;
            }
            interface OnSetOtApplyTimeQuery$ {
                getEntryDy():$.kd.bos.dataentity.entity.DynamicObject;
                getEntryIndex():number;
                getOtBillDy():$.kd.bos.dataentity.entity.DynamicObject;
                getShiftDtoMap():$.java.util.Map;
                setEntryDy(entryDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                setEntryIndex(entryIndex:number):void;
                setOtBillDy(otBillDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                setShiftDtoMap(shiftDtoMap:$.java.util.Map):void;
            }
            type OnSetOtApplyTimeQuery_T = OnSetOtApplyTimeQuery_S & OnSetOtApplyTimeQuery$;
            interface OnSetOtApplyTimeQuery extends OnSetOtApplyTimeQuery_T {
            }
        }
        namespace kd.sdk.wtc.wtp{
            interface SdkWtcWtpModule_S {
            }
            type SdkWtcWtpModule_ST = $.kd.sdk.module.Module & SdkWtcWtpModule_S;
            interface SdkWtcWtpModule_C extends SdkWtcWtpModule_ST {
                new():SdkWtcWtpModule;
            }
            interface SdkWtcWtpModule$ {
            }
            type SdkWtcWtpModule_T = $.kd.sdk.module.Module & SdkWtcWtpModule_S & SdkWtcWtpModule$;
            interface SdkWtcWtpModule extends SdkWtcWtpModule_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.adplan{
            interface AdPlanHelper_S {
            }
            interface AdPlanHelper_C extends AdPlanHelper_S {
                new():AdPlanHelper;
            }
            interface AdPlanHelper$ {
                /**
                 * ���ݿ��ڵ���BOID�Ͳ�ǩ���ڲ�ѯ��Ӧ�Ĳ�ǩ�����Ͳ�ǩ����
                 * <p>
                 * ���ڵ���BOID�Ͳ�ǩ�����Ǳش�����ظÿ��ڵ����¶�Ӧ��ǩ���ڵĲ�ǩ�����Ͳ�ǩ����
                 *
                 * @param adPlanRuleParams �������
                 * @return List<AdPlanRuleQuery> ��Ӧ����
                 */
                getAdPlanAndRule(adPlanRuleParams:$.java.util.List):$.java.util.List;
            }
            type AdPlanHelper_T = AdPlanHelper_S & AdPlanHelper$;
            interface AdPlanHelper extends AdPlanHelper_T {
            }
            interface AdPlanRuleResp_S {
            }
            type AdPlanRuleResp_ST = $.java.io.Serializable & AdPlanRuleResp_S;
            interface AdPlanRuleResp_C extends AdPlanRuleResp_ST {
                new(adPlanRuleQuery:AdPlanRuleQuery,planDy:$.kd.bos.dataentity.entity.DynamicObject,ruleDy:$.kd.bos.dataentity.entity.DynamicObject):AdPlanRuleResp;
            }
            interface AdPlanRuleResp$ {
                getAdPlanRuleQuery():AdPlanRuleQuery;
                getPlanDy():$.kd.bos.dataentity.entity.DynamicObject;
                getPlanEffectEnd():Date;
                getPlanEffectStart():Date;
                getRuleDy():$.kd.bos.dataentity.entity.DynamicObject;
                getRuleEffectEnd():Date;
                getRuleEffectStart():Date;
                setPlanEffectEnd(planEffectEnd:Date):void;
                setPlanEffectStart(planEffectStart:Date):void;
                setRuleEffectEnd(ruleEffectEnd:Date):void;
                setRuleEffectStart(ruleEffectStart:Date):void;
            }
            type AdPlanRuleResp_T = $.java.io.Serializable & AdPlanRuleResp_S & AdPlanRuleResp$;
            interface AdPlanRuleResp extends AdPlanRuleResp_T {
            }
            interface AdPlanRuleQuery_S {
            }
            type AdPlanRuleQuery_ST = $.java.io.Serializable & AdPlanRuleQuery_S;
            interface AdPlanRuleQuery_C extends AdPlanRuleQuery_ST {
                new(attFileBoId:long,adDate:Date):AdPlanRuleQuery;
            }
            interface AdPlanRuleQuery$ {
                getAdDate():Date;
                getAttFileBoId():long;
            }
            type AdPlanRuleQuery_T = $.java.io.Serializable & AdPlanRuleQuery_S & AdPlanRuleQuery$;
            interface AdPlanRuleQuery extends AdPlanRuleQuery_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.attfile{
            interface AttFileVersion_S {
            }
            type AttFileVersion_ST = $.java.io.Serializable & AttFileVersion_S;
            interface AttFileVersion_C extends AttFileVersion_ST {
                new():AttFileVersion;
            }
            interface AttFileVersion$ {
                /**
                 * ��ȡ������֯id
                 * @return ������֯id
                 */
                getAdminOrg():long;
                /**
                 * ��ȡ�ҿ�������֯id
                 * @return �ҿ�������֯id
                 */
                getAffiliateAdminOrg():long;
                /**
                 * ��ȡЭ�鹤����id
                 * @return Э�鹤����id
                 */
                getAgreedLocation():long;
                /**
                 * ��ȡ������id
                 * @return ������id
                 */
                getAttPerson():long;
                /**
                 * ��ȡ���ڱ�ʶid
                 * @return ���ڱ�ʶid
                 */
                getAttTag():long;
                /**
                 * ��ȡ����ҵ������
                 * @return ����ҵ������
                 */
                getBoId():long;
                /**
                 * ��ȡ��Ч����
                 * @return ��Ч����
                 */
                getBsed():Date;
                /**
                 * ��ȡʧЧ����
                 * @return ʧЧ����
                 */
                getBsled():Date;
                /**
                 * ��ȡ��˾��id
                 * @return ��˾��id
                 */
                getCmpEmp():long;
                /**
                 * ��ȡ������˾id
                 * @return ������˾id
                 */
                getCompany():long;
                /**
                 * ��ȡ���ݰ汾״̬
                 * -2����ɾ��
                 * -1���ѷ���
                 * 0������Ч
                 * 1����Ч��
                 * 2����ʧЧ
                 * @return ���ݰ汾״̬
                 */
                getDataStatus():string;
                /**
                 * ��ȡ��֯��id
                 * @return ��֯��id
                 */
                getDepEmp():long;
                /**
                 * ��ȡ����/����id
                 * @return ����/����id
                 */
                getDependency():long;
                /**
                 * ��ȡ����Ա�����id
                 * @return ����Ա�����id
                 */
                getDependencyType():long;
                /**
                 * ��ȡ������Ա��id
                 * @return ������Ա��id
                 */
                getEmpGroup():long;
                /**
                 * ��ȡ������ְ����id
                 * @return ������ְ����id
                 */
                getEmpPosOrgRel():long;
                /**
                 * ��ȡ��ҵ��id
                 * @return ��ҵ��id
                 */
                getEmployee():long;
                /**
                 * ��ȡ������������
                 * @return ������������
                 */
                getEndDate():Date;
                /**
                 * ��ȡ����id
                 * @return ����id
                 */
                getId():long;
                /**
                 * ��ȡְλid
                 * @return ְλid
                 */
                getJob():long;
                /**
                 * ��ȡ��������Χid
                 * @return ��������Χid
                 */
                getManagingScope():long;
                /**
                 * ��ȡ����
                 * @return ����
                 */
                getName():string;
                /**
                 * ��ȡ�������
                 * @return �������
                 */
                getNumber():string;
                /**
                 * ��ȡ������֯id
                 * @return ������֯id
                 */
                getOrg():long;
                /**
                 * ��ȡ��Ȼ��id
                 * @return ��Ȼ��id
                 */
                getPersonId():long;
                /**
                 * ��ȡ��λid
                 * @return ��λid
                 */
                getPosition():long;
                /**
                 * ��ȡ������ʼ����
                 * @return ������ʼ����
                 */
                getStartDate():Date;
                /**
                 * ��ȡ��������
                 * 1�����ڵ��� 2�����ڵ���
                 *
                 * @return ��������
                 */
                getType():string;
                /**
                 * ��ȡ���ڵص�id
                 * @return ���ڵص�id
                 */
                getWorkplace():long;
                /**
                 * ����������֯id
                 * @param adminOrg ������֯id
                 */
                setAdminOrg(adminOrg:long):void;
                /**
                 * ���ùҿ�������֯id
                 * @param affiliateAdminOrg �ҿ�������֯id
                 */
                setAffiliateAdminOrg(affiliateAdminOrg:long):void;
                /**
                 * ����Э�鹤����id
                 * @param agreedLocation Э�鹤����id
                 */
                setAgreedLocation(agreedLocation:long):void;
                /**
                 * ���ÿ�����id
                 * @param attPerson ������id
                 */
                setAttPerson(attPerson:long):void;
                /**
                 * ���ÿ��ڱ�ʶid
                 * @param attTag ���ڱ�ʶid
                 */
                setAttTag(attTag:long):void;
                /**
                 * ���õ���ҵ������
                 * @param boId ����ҵ������
                 */
                setBoId(boId:long):void;
                /**
                 * ������Ч����
                 * @param bsed ��Ч����
                 */
                setBsed(bsed:Date):void;
                /**
                 * ����ʧЧ����
                 * @param bsled ʧЧ����
                 */
                setBsled(bsled:Date):void;
                /**
                 * ���ù�˾��id
                 * @param cmpEmp ��˾��id
                 */
                setCmpEmp(cmpEmp:long):void;
                /**
                 * ����������˾id
                 * @param company ������˾id
                 */
                setCompany(company:long):void;
                /**
                 * �������ݰ汾״̬
                 * -2����ɾ��
                 * -1���ѷ���
                 * 0������Ч
                 * 1����Ч��
                 * 2����ʧЧ
                 * @param dataStatus ���ݰ汾״̬
                 */
                setDataStatus(dataStatus:string):void;
                /**
                 * ������֯��id
                 * @param depEmp ��֯��id
                 */
                setDepEmp(depEmp:long):void;
                /**
                 * ���ù���/����id
                 * @param dependency ����/����id
                 */
                setDependency(dependency:long):void;
                /**
                 * ��������Ա�����id
                 * @param dependencyType ����Ա�����id
                 */
                setDependencyType(dependencyType:long):void;
                /**
                 * ���ÿ�����Ա��id
                 * @param empGroup ������Ա��id
                 */
                setEmpGroup(empGroup:long):void;
                /**
                 * ���ÿ�����ְ����id
                 *
                 * @param empPosOrgRel ������ְ����id
                 */
                setEmpPosOrgRel(empPosOrgRel:long):void;
                /**
                 * ������ҵ��id
                 * @param employee ��ҵ��id
                 */
                setEmployee(employee:long):void;
                /**
                 * ���õ�����������
                 * @param endDate ������������
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ����c
                 * @param id ����id
                 */
                setId(id:long):void;
                /**
                 * ����ְλid
                 * @param job ְλid
                 */
                setJob(job:long):void;
                /**
                 * ������������Χ
                 * @param managingScope ��������Χid
                 */
                setManagingScope(managingScope:long):void;
                /**
                 * ��������
                 * @param name ����
                 */
                setName(name:string):void;
                /**
                 * ���õ������
                 * @param number �������
                 */
                setNumber(number_arg:string):void;
                /**
                 * ���ÿ�����֯id
                 * @param org ������֯id
                 */
                setOrg(org:long):void;
                /**
                 * ������Ȼ��id
                 * @param personId ��Ȼ��id
                 */
                setPersonId(personId:long):void;
                /**
                 * ���ø�λid
                 * @param position ��λid
                 */
                setPosition(position:long):void;
                /**
                 * ���õ�����ʼ����
                 * @param startDate ������ʼ����
                 */
                setStartDate(startDate:Date):void;
                /**
                 * ���õ�������
                 * @param type �������� 1�����ڵ��� 2�����ڵ���
                 */
                setType(type_arg:string):void;
                /**
                 * ���ÿ��ڵص�id
                 * @param workplace ���ڵص�id
                 */
                setWorkplace(workplace:long):void;
            }
            type AttFileVersion_T = $.java.io.Serializable & AttFileVersion_S & AttFileVersion$;
            interface AttFileVersion extends AttFileVersion_T {
            }
            interface WTPAttFileHelper_S {
                /**
                 * �жϵ�����ָ������֮���Ƿ����ҵ������
                 *
                 * <pre>
                 * ���ݿ��ڵ���boId���ϣ���ѯlocalDate������localDate���죩��֮����ڵ�ҵ�����ݣ�Ŀǰ������������ҵ������
                 * signCardData :��Ч��
                 * vaBillData :�ݼٵ�
                 * otBillData :�Ӱ൥
                 * tpBillData :���
                 *
                 * ���ؽ��ʾ��
                 * {
                 * key:  signCardData, {1452940499953387520,true},
                 * key:  vaBillData, {1452940499953387520,true},
                 * key:  otBillData, {1452940499953387520,true},
                 * key:  tpBillData, {1452940499953387520,true}
                 * }
                 * </pre>
                 *
                 * @param fileBoIds   ���ڵ���boId���ϣ�Ϊ��ʱ���ؿյ�map
                 * @param specialDate ���ڣ�Ϊ��ʱ�׳��쳣
                 * @return Map<ҵ�����ݷ��� �� Map < ���ڵ���boId �� �Ƿ����ҵ������>> ���ص�У�����������������ҵ�����ݣ����ؿ�map���������ָ��ҵ����������ڶ�Ӧ���ݷ����У����
                 */
                existBusinessData(fileBoIds:$.java.util.Collection,specialDate:$.java.time.LocalDate):$.java.util.Map;
                /**
                 * ͨ����Ա���ͣ���Աid��ѯĳһ��ĵ����汾
                 *
                 * @param localDate ����
                 * @param userId    ��Աid
                 * @param userType  ��Ա����
                 * @return �����汾��Ϣ��ҵ�����
                 */
                getAttFile(localDate:$.java.time.LocalDate,userId:long,userType:kd.sdk.wtc.wtbs.common.enums.UserModelType):AttFileVersion;
                /**
                 * ��ѯָ�����ڷ�Χ�ڵĵ����汾
                 * <p>
                 * �������ڷ�Χ��ָ����Ա���͵���Աid���ϣ���ѯ�����н�������Ч�����汾������ָ���Ƿ��Ȩ
                 *
                 * @param startDate  ��ʼ���ڣ���ʼ���ڴ��ڽ�������ʱ���������ڹ���
                 * @param endDate    �������ڣ���ʼ���ڴ��ڽ�������ʱ���������ڹ���
                 * @param userIdList ��Աid����
                 * @param userType   ��Ա���ͣ��Բ���userIdList��ά��˵�������磬��userIdList���������Ȼ�˵�id���ϣ�userTypeӦ��Ϊ UserModelType.PERSON
                 * @param checkAuth  �Ƿ��Ȩ����checkAuth=true�ǣ���У�鵱ǰ��¼�û���Ȩ�޵ĵ����汾����
                 * @return �����汾��Ϣ��ҵ����󼯺ϣ�������Ϊ�յĲ���ʱ�����ؿյ�List
                 */
                getAttFileList(startDate:$.java.time.LocalDate,endDate:$.java.time.LocalDate,userIdList:$.java.util.Set,userType:kd.sdk.wtc.wtbs.common.enums.UserModelType,checkAuth:boolean):$.java.util.List;
            }
            interface WTPAttFileHelper_C extends WTPAttFileHelper_S {
                new():WTPAttFileHelper;
            }
            interface WTPAttFileHelper$ {
            }
            type WTPAttFileHelper_T = WTPAttFileHelper_S & WTPAttFileHelper$;
            interface WTPAttFileHelper extends WTPAttFileHelper_T {
            }
            enum AttMode {
                MULTI_PUNCH,
                SINGLE_PUNCH,
                NO_PUNCH
            }
            interface IAttFileDiscardExpandService_S {
            }
            interface IAttFileDiscardExpandService$ {
                /**
                 * ����ֵ˵����<br/>
                 * key:  success ����ɹ������ݱ�ʶ��failed ����ʧ�ܵ����ݱ�ʶ<br/>
                 * value: ����ɹ���ʧ����Ϣ ����ΪMap ��ʽ����<br/>
                 *     key:  ����boId  ����Long �磺1575282784384182272L <br/>
                 *     value: ����ΪString ������Ϣ �磺����������ִ�и������񣬲��ɷ�������
                 *
                 * ���磺
                 * {
                 * "success":{
                 *      1575282784384182272:"��������ִ�и������񣬲��ɷ�����"
                 *    }
                 * }
                 * @param fileBoIds ��Ҫ����Ŀ��ڵ���boId
                 * @return Map<String, Map<Long, String>>
                 */
                handleAttFileRelateData(fileBoIds:$.java.util.List):$.java.util.Map;
            }
            type IAttFileDiscardExpandService_T = IAttFileDiscardExpandService_S & IAttFileDiscardExpandService$;
            interface IAttFileDiscardExpandService extends IAttFileDiscardExpandService_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.attperiod{
            interface PerAttPeriod_S {
            }
            interface PerAttPeriod_C extends PerAttPeriod_S {
                new():PerAttPeriod;
            }
            interface PerAttPeriod$ {
                /**
                 * ��ȡ�ڼ�id
                 * @return �ڼ�id
                 */
                getAttPeriodId():long;
                /**
                 * ��ȡ���ڵ���boId
                 * @return ���ڵ���boId
                 */
                getFileBoId():long;
                /**
                 * ��ȡ���ڵ���id
                 * @return ���ڵ���id
                 */
                getFileId():long;
                /**
                 * ��ȡ��Ա�����ڼ����ʱ��
                 * @return ��Ա�����ڼ����ʱ��
                 */
                getPerAttPeriodEndDate():Date;
                /**
                 * ��ȡ��Ա�����ڼ俪ʼʱ��
                 * @return ��Ա�����ڼ俪ʼʱ��
                 */
                getPerAttPeriodStartDate():Date;
                /**
                 * ��ȡ����Id
                 * @return ����Id
                 */
                getPeriodId():long;
                /**
                 * ��ȡ����Id
                 * @return ����Id
                 */
                getPersonId():long;
                /**
                 * �����ڼ�id
                 * @param attPeriodId �ڼ�id
                 */
                setAttPeriodId(attPeriodId:long):void;
                /**
                 * ���ÿ��ڵ���boId
                 * @param fileBoId ���ڵ���boId
                 */
                setFileBoId(fileBoId:long):void;
                /**
                 * ���ÿ��ڵ���id
                 * @param fileId ���ڵ���id
                 */
                setFileId(fileId:long):void;
                /**
                 * ������Ա�����ڼ����ʱ��
                 * @param perAttPeriodEndDate ��Ա�����ڼ����ʱ��
                 */
                setPerAttPeriodEndDate(perAttPeriodEndDate:Date):void;
                /**
                 * ������Ա�����ڼ俪ʼʱ��
                 * @param perAttPeriodStartDate ��Ա�����ڼ俪ʼʱ��
                 */
                setPerAttPeriodStartDate(perAttPeriodStartDate:Date):void;
                /**
                 * ��������Id
                 * @param periodId ����Id
                 */
                setPeriodId(periodId:long):void;
                /**
                 * ��������Id
                 * @param personId ����Id
                 */
                setPersonId(personId:long):void;
            }
            type PerAttPeriod_T = PerAttPeriod_S & PerAttPeriod$;
            interface PerAttPeriod extends PerAttPeriod_T {
            }
            interface PerAttPeriodQueryParam_S {
            }
            interface PerAttPeriodQueryParam_C extends PerAttPeriodQueryParam_S {
                new():PerAttPeriodQueryParam;
            }
            interface PerAttPeriodQueryParam$ {
                getAttFileBoId():long;
                getEndDate():$.java.time.LocalDate;
                getStartDate():$.java.time.LocalDate;
                setAttFileBoId(attFileBoId:long):void;
                setEndDate(endDate:$.java.time.LocalDate):void;
                setStartDate(startDate:$.java.time.LocalDate):void;
            }
            type PerAttPeriodQueryParam_T = PerAttPeriodQueryParam_S & PerAttPeriodQueryParam$;
            interface PerAttPeriodQueryParam extends PerAttPeriodQueryParam_T {
            }
            interface WTPPerAttPeriodHelper_S {
                /**
                 * ��ѯ��Ա�����ڼ�
                 * <p>
                 * ��ѯ������Ա���ڵ����ڷ�Χ�����ָ������ {@code dateInAttPeriod}
                 *
                 * @param attFileBoId     ���ڵ���BoId
                 * @param dateInAttPeriod ��Ա�����ڼ��е�ĳ�����ڣ���ѯ������Ա�����ڼ����ڷ�Χ����������
                 * @return ��Ա�����ڼ䣬����鲻���򷵻�null��attFileBoId == 0 ���� dateInAttPeriod == null �򷵻�null
                 */
                getPerAttPeriod(attFileBoId:long,dateInAttPeriod:$.java.time.LocalDate):PerAttPeriod;
                /**
                 * ��ѯ��Ա�����ڼ��б�
                 * <p>
                 * ��ѯ������Ա�����ڼ����ڷ�Χ���ѯ�����е����ڷ�Χ�н�������ѯ�������ݷ��ؿռ���
                 *
                 * @param perAttPeriodQueryParam ��ѯ����
                 * @return List<PerAttPeriodDto> ��Ա�����ڼ��б������ѯ���������򷵻ؿռ��ϣ������ѯ������ attFileBoId==0����startDate==null��endDate == null �򷵻�null
                 */
                getPerAttPeriods(perAttPeriodQueryParam:PerAttPeriodQueryParam):$.java.util.List;
            }
            interface WTPPerAttPeriodHelper_C extends WTPPerAttPeriodHelper_S {
                new():WTPPerAttPeriodHelper;
            }
            interface WTPPerAttPeriodHelper$ {
            }
            type WTPPerAttPeriodHelper_T = WTPPerAttPeriodHelper_S & WTPPerAttPeriodHelper$;
            interface WTPPerAttPeriodHelper extends WTPPerAttPeriodHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.attperson{
            interface AttPerson_S {
            }
            type AttPerson_ST = $.java.io.Serializable & AttPerson_S;
            interface AttPerson_C extends AttPerson_ST {
                new():AttPerson;
            }
            interface AttPerson$ {
                /**
                 * ��ȡЭ�鹤����id
                 * @return Э�鹤����id
                 */
                getAgreedLocation():long;
                /**
                 * ��ȡ�μӹ�������
                 * @return �μӹ�������
                 */
                getBeginServiceDate():Date;
                /**
                 * ��ȡ̥����������
                 * @return ̥����������
                 */
                getBirthday():Date;
                /**
                 * ��ȡ��������̥����
                 * @return ��������̥����
                 */
                getChildrenNumber():number;
                /**
                 * ��ȡ���˵�λid
                 * @return ���˵�λid
                 */
                getEnterprise():long;
                /**
                 * ��ȡ��ְ����
                 * @return ��ְ����
                 */
                getEntryDate():Date;
                /**
                 * ��ȡ�״��ù���ʼ����
                 * @return �״��ù���ʼ����
                 */
                getFirstStartDate():Date;
                /**
                 * ��ȡ�Ա�id
                 * @return �Ա�id
                 */
                getGender():long;
                /**
                 * ��ȡ�ù���������
                 * @return �ù���������
                 */
                getHireEndDate():Date;
                /**
                 * ��ȡ�ù���ʼ����
                 * @return �ù���ʼ����
                 */
                getHireStartDate():Date;
                /**
                 * ��ȡ������id
                 * @return ������id
                 */
                getId():long;
                /**
                 * ��ȡְλid
                 * @return ְλid
                 */
                getJobHr():long;
                /**
                 * ��ȡ�ù���ϵ״̬id
                 * @return �ù���ϵ״̬id
                 */
                getLaborRelStatus():long;
                /**
                 * ��ȡ�ù���ϵ����id
                 * @return �ù���ϵ����id
                 */
                getLaborRelType():long;
                /**
                 * ��ȡ�������
                 * @return �������
                 */
                getLastWorkDate():Date;
                /**
                 * ��ȡ����״��id
                 * @return ����״��id
                 */
                getMarriageStatus():long;
                /**
                 * ��ȡ����
                 * @return ����
                 */
                getName():string;
                /**
                 * ��ȡ����
                 * @return ����
                 */
                getNationality():long;
                /**
                 * ��ȡ����
                 * @return ����
                 */
                getNumber():string;
                /**
                 * ��ȡ��Ȼ��id
                 * @return ��Ȼ��id
                 */
                getPerson():long;
                /**
                 * ��ȡ������ʽid
                 * @return ������ʽid
                 */
                getProcreateMode():long;
                /**
                 * ��ȡת������
                 * @return ת������
                 */
                getRegularDate():Date;
                /**
                 * ��ȡ��ְ��Ч��
                 * @return ��ְ��Ч��
                 */
                getResignDate():Date;
                /**
                 * ����Э�鹤����id
                 * @param agreedLocation Э�鹤����id
                 */
                setAgreedLocation(agreedLocation:long):void;
                /**
                 * ���òμӹ�������
                 * @param beginServiceDate �μӹ�������
                 */
                setBeginServiceDate(beginServiceDate:Date):void;
                /**
                 * ����̥����������
                 * @param birthday ̥����������
                 */
                setBirthday(birthday:Date):void;
                /**
                 * ���ñ�������̥����
                 * @param childrenNumber ��������̥����
                 */
                setChildrenNumber(childrenNumber:number):void;
                /**
                 * �������˵�λid
                 * @param enterprise ���˵�λid
                 */
                setEnterprise(enterprise:long):void;
                /**
                 * ������ְ����
                 * @param entryDate ��ְ����
                 */
                setEntryDate(entryDate:Date):void;
                /**
                 * �����״��ù���ʼ����
                 * @param firstStartDate �״��ù���ʼ����
                 */
                setFirstStartDate(firstStartDate:Date):void;
                /**
                 * �����Ա�id
                 * @param gender �Ա�id
                 */
                setGender(gender:long):void;
                /**
                 * �����ù���������
                 * @param hireEndDate �ù���������
                 */
                setHireEndDate(hireEndDate:Date):void;
                /**
                 * �����ù���ʼ����
                 * @param hireStartDate �ù���ʼ����
                 */
                setHireStartDate(hireStartDate:Date):void;
                /**
                 * ���ÿ�����id
                 * @param id ������id
                 */
                setId(id:long):void;
                /**
                 * ����ְλid
                 * @param jobHr ְλid
                 */
                setJobHr(jobHr:long):void;
                /**
                 * �����ù���ϵ״̬id
                 * @param laborRelStatus �ù���ϵ״̬id
                 */
                setLaborRelStatus(laborRelStatus:long):void;
                /**
                 * �����ù���ϵ����id
                 * @param laborRelType �ù���ϵ����id
                 */
                setLaborRelType(laborRelType:long):void;
                /**
                 * �����������
                 * @param lastWorkDate �������
                 */
                setLastWorkDate(lastWorkDate:Date):void;
                /**
                 * ���û���״��id
                 * @param marriageStatus ����״��id
                 */
                setMarriageStatus(marriageStatus:long):void;
                /**
                 * ��������
                 * @param name ����
                 */
                setName(name:string):void;
                /**
                 * ���ù���
                 * @param nationality ����
                 */
                setNationality(nationality:long):void;
                /**
                 * ���ù���
                 * @param number ����
                 */
                setNumber(number_arg:string):void;
                /**
                 * ������Ȼ��id
                 * @param person ��Ȼ��id
                 */
                setPerson(person:long):void;
                /**
                 * ����������ʽid
                 * @param procreateMode ������ʽid
                 */
                setProcreateMode(procreateMode:long):void;
                /**
                 * ����ת������
                 * @param regularDate ת������
                 */
                setRegularDate(regularDate:Date):void;
                /**
                 * ������ְ��Ч��
                 * @param resignDate ��ְ��Ч��
                 */
                setResignDate(resignDate:Date):void;
            }
            type AttPerson_T = $.java.io.Serializable & AttPerson_S & AttPerson$;
            interface AttPerson extends AttPerson_T {
            }
            interface WTPAttPersonHelper_S {
                /**
                 * ͨ����Ȼ��Աid��ѯ��Ա��Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return ������Ա��Ϣ
                 */
                getAttPerson(personId:long):AttPerson;
            }
            interface WTPAttPersonHelper_C extends WTPAttPersonHelper_S {
                new():WTPAttPersonHelper;
            }
            interface WTPAttPersonHelper$ {
            }
            type WTPAttPersonHelper_T = WTPAttPersonHelper_S & WTPAttPersonHelper$;
            interface WTPAttPersonHelper extends WTPAttPersonHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.coordination{
            interface AfterCoordinationEvent_S {
            }
            interface AfterCoordinationEvent_C extends AfterCoordinationEvent_S {
                new():AfterCoordinationEvent;
                /**
                 * AfterCoordinationEvent ���췽��
                 *
                 * @param coreCoordinationParam coreCoordinationParam
                 * @param messageDy             messageDy
                 * @param successPkIdMap        successPkIdMap
                 */
                new(coreCoordinationParam:CoreCoordinationParam,messageDy:$.kd.bos.dataentity.entity.DynamicObject,successPkIdMap:$.java.util.Map):AfterCoordinationEvent;
            }
            interface AfterCoordinationEvent$ {
                /**
                 * ��ȡЭͬ�¼����Ĳ���
                 *
                 * @return CoreCoordinationParam
                 */
                getCoreCoordinationParam():CoreCoordinationParam;
                /**
                 * ��ȡҵ���¼���־��̬����
                 *
                 * @return DynamicObject
                 */
                getMessageDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�ɹ�����������map����
                 *
                 * @return Map<String, List < Object>>
                 */
                getSuccessPkIdMap():$.java.util.Map;
            }
            type AfterCoordinationEvent_T = AfterCoordinationEvent_S & AfterCoordinationEvent$;
            interface AfterCoordinationEvent extends AfterCoordinationEvent_T {
            }
            interface BeforeCoordinationEvent_S {
            }
            interface BeforeCoordinationEvent_C extends BeforeCoordinationEvent_S {
                new():BeforeCoordinationEvent;
                /**
                 * BeforeCoordinationEvent ���췽��
                 *
                 * @param coreCoordinationParam coreCoordinationParam
                 * @param messageDy             messageDy
                 * @param stopCoordination      stopCoordination
                 */
                new(coreCoordinationParam:CoreCoordinationParam,messageDy:$.kd.bos.dataentity.entity.DynamicObject,stopCoordination:boolean):BeforeCoordinationEvent;
            }
            interface BeforeCoordinationEvent$ {
                /**
                 * ��ȡЭͬ�¼����Ĳ���
                 *
                 * @return CoreCoordinationParam
                 */
                getCoreCoordinationParam():CoreCoordinationParam;
                /**
                 * ��ȡҵ���¼���־��̬����
                 *
                 * @return DynamicObject
                 */
                getMessageDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�Ƿ�ֹͣ����Эͬ����
                 *
                 * @return boolean
                 */
                isStopCoordination():boolean;
                /**
                 * �����Ƿ�ֹͣ����Эͬ������������Ϊtrueʱ����ǰ��Эͬ�Ӳ����������ִ��
                 *
                 * @param stopCoordination stopCoordination
                 */
                setStopCoordination(stopCoordination:boolean):void;
            }
            type BeforeCoordinationEvent_T = BeforeCoordinationEvent_S & BeforeCoordinationEvent$;
            interface BeforeCoordinationEvent extends BeforeCoordinationEvent_T {
            }
            interface CoordinationExecuteExtPlugin_S {
            }
            interface CoordinationExecuteExtPlugin$ {
                /**
                 * Эִͬ�к��¼���Эִͬ�к���ô˽ӿڣ�Эͬ�����Эͬ�д���������Ƿֿ�������һ��Эͬ�¼�ֻ��ִ��һ��
                 * <p>
                 * 1.ͨ���ýӿڿ�����Эͬ���������Эͬ�¼����Ĳ��������Ѿ�Эͬ����ɹ������ݣ������Զ��崦��Эͬ��ҵ���߼�����������ɹ�����Ҫ�޸Ļ���ˢ�����β���ҵ�����ݣ�
                 * 2.���Ը���ҵ���¼���־�����Զ��崦��ҵ���¼���־��Э�������������ݡ�
                 * </p>
                 * <p>��չʾ����</p>
                 * <pre><code>
                 * ʾ��������Բο���ԱЭͬ����ִ����չ�������ʾ������չ�������룺kd.sdk.wtc.wtp.business.coordination.CoordinationExecuteExtPlugin
                 * </code></pre>
                 *
                 * @param afterCoordinationEvent Эͬ�¼�ִ�к����
                 */
                afterExecuteCoordination?(afterCoordinationEvent:AfterCoordinationEvent):void;
                /**
                 * Эִͬ��ǰ�¼���Эִͬ��ǰ���ô˽ӿڣ���ע��Эͬǰ�����ݴ���������Эͬ�¼�ʧ�ܶ��س���һ��Эͬ�¼�ֻ��ִ��һ��
                 * <p>
                 * 1.������Эͬ����ǰ����Эͬ�¼����Ĳ���ǰ�����Ƿ�ȡ��Эͬ������
                 * 2.�����Զ��崦��Эͬǰҵ���߼�������ת��ǰ������ҵ�����ݣ�
                 * 3.���Ը���ҵ���¼���־�����Զ��崦��ҵ���¼���־��Э�������������ݡ�
                 * </p>
                 * <p>��չʾ����</p>
                 * <pre><code>
                 * ʾ��������Բο���ԱЭͬ����ִ����չ�������ʾ������չ�������룺kd.sdk.wtc.wtp.business.coordination.CoordinationExecuteExtPlugin
                 * </code></pre>
                 *
                 * @param beforeCoordinationEvent Эͬ�¼�ִ��ǰ����
                 */
                beforeExecuteCoordination?(beforeCoordinationEvent:BeforeCoordinationEvent):void;
                /**
                 * Эִͬ�����¼�����Эִͬ�У�����ʵ�ʵĲ���opǰִ�У�һ��Эͬ�¼����ܻ���ö��op������������ܻ�ִ�ж��
                 * 1.������Эִͬ���У��޸�ִ�е�List<DynamicObject> exeOpDyList ��̬�������ݣ�Ҳ�����Լ��Զ���������ض���ִ���µĲ���operationKey��
                 * 2.���Ը���ҵ���¼���־�����Զ��崦��ҵ���¼���־��Э�������������ݡ�
                 * <p>��չʾ����</p>
                 * <pre><code>
                 * ʾ��������Բο���ԱЭͬ����ִ����չ�������ʾ������չ�������룺kd.sdk.wtc.wtp.business.coordination.CoordinationExecuteExtPlugin
                 * </code></pre>
                 *
                 * @param executingCoordinationEvent Эͬ�¼�ִ���в���
                 */
                executingCoordination?(executingCoordinationEvent:ExecutingCoordinationEvent):void;
            }
            type CoordinationExecuteExtPlugin_T = CoordinationExecuteExtPlugin_S & CoordinationExecuteExtPlugin$;
            interface CoordinationExecuteExtPlugin extends CoordinationExecuteExtPlugin_T {
            }
            interface CoordinationExpandService_S {
            }
            interface CoordinationExpandService$ {
                /**
                 * ������������Ա�䶯������/������ڵ�����
                 * <p>
                 * ������������Ա�䶯����ʱ���ڻ����������¼���ͨ����̨Эͬ����/���������
                 * ��Ʒ������/����ĵ����Ĺ������泡�����������󣬿���ͨ�����ӿ���չʵ�������ɶ�Ӧ�Ĺ������泡����Ρ�
                 *
                 * @param coordinationExpandParam Эͬ���ɵ�����ҵ�����
                 * @return Map<String, Object> key:��չ�ĳ�����������Ĳ�����ʶ��value:��չ��ֵ�����Ϳ����ǻ������ϣ��ַ�������ֵ�����������ڵ����Ͳ�����
                 */
                genCoordinationSceneExpand(coordinationExpandParam:CoordinationExpandParam):$.java.util.Map;
            }
            type CoordinationExpandService_T = CoordinationExpandService_S & CoordinationExpandService$;
            interface CoordinationExpandService extends CoordinationExpandService_T {
            }
            interface CoordinationExpandParam_S {
            }
            interface CoordinationExpandParam_C extends CoordinationExpandParam_S {
                new():CoordinationExpandParam;
            }
            interface CoordinationExpandParam$ {
                /**
                 * ��ְ����id
                 *
                 * @return ��ְ����id
                 */
                getEmpPosOrgRelId():long;
                /**
                 * ��Ȼ��id
                 *
                 * @return ��Ȼ��id
                 */
                getPersonId():long;
                /**
                 * ��ְ����id
                 *
                 * @param empPosOrgRelId ��ְ����id
                 */
                setEmpPosOrgRelId(empPosOrgRelId:long):void;
                /**
                 * ��Ȼ��id
                 *
                 * @param personId ��Ȼ��id
                 */
                setPersonId(personId:long):void;
            }
            type CoordinationExpandParam_T = CoordinationExpandParam_S & CoordinationExpandParam$;
            interface CoordinationExpandParam extends CoordinationExpandParam_T {
            }
            interface CoreCoordinationParam_S {
            }
            interface CoreCoordinationParam_C extends CoreCoordinationParam_S {
                new():CoreCoordinationParam;
                /**
                 * CoreCoordinationParam ���췽��
                 */
                new(configId:long,msgSubNo:string,personId:long,effectTime:Date):CoreCoordinationParam;
            }
            interface CoreCoordinationParam$ {
                /**
                 * ��ȡ��Ӧ��Э�����õ�id
                 *
                 * @return long
                 */
                getConfigId():long;
                /**
                 * ��ȡ�¼���Ч����
                 *
                 * @return Date
                 */
                getEffectTime():Date;
                /**
                 * ��ȡ��Ϣ���ĺ�
                 *
                 * @return String
                 */
                getMsgSubNo():string;
                /**
                 * ��ȡ����Ȼ��id
                 *
                 * @return long
                 */
                getPersonId():long;
            }
            type CoreCoordinationParam_T = CoreCoordinationParam_S & CoreCoordinationParam$;
            interface CoreCoordinationParam extends CoreCoordinationParam_T {
            }
            interface ExecutingCoordinationEvent_S {
            }
            interface ExecutingCoordinationEvent_C extends ExecutingCoordinationEvent_S {
                new():ExecutingCoordinationEvent;
                /**
                 * ExecutingCoordinationEvent ���췽��
                 *
                 * @param operationKey operationKey
                 * @param entityNumber entityNumber
                 * @param messageDy    messageDy
                 * @param exeOpDyList  exeOpDyList
                 */
                new(operationKey:string,entityNumber:string,messageDy:$.kd.bos.dataentity.entity.DynamicObject,exeOpDyList:$.java.util.List):ExecutingCoordinationEvent;
                new(operationKey:string,entityNumber:string,coreCoordinationParam:CoreCoordinationParam,messageDy:$.kd.bos.dataentity.entity.DynamicObject,exeOpDyList:$.java.util.List):ExecutingCoordinationEvent;
            }
            interface ExecutingCoordinationEvent$ {
                /**
                 * ��ȡЭͬ�¼����Ĳ���
                 *
                 * @return CoreCoordinationParam
                 */
                getCoreCoordinationParam():CoreCoordinationParam;
                /**
                 * ��ȡ�������ݵ�Ԫ����ʵ�����
                 *
                 * @return String
                 */
                getEntityNumber():string;
                /**
                 * ��ȡ��Ҫִ�в��������ݵĶ�̬���󼯺�
                 *
                 * @return List<DynamicObject>
                 */
                getExeOpDyList():$.java.util.List;
                /**
                 * ��ȡҵ���¼���־��̬����
                 *
                 * @return DynamicObject
                 */
                getMessageDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ��Ҫִ�в����� OperationKey
                 *
                 * @return String
                 */
                getOperationKey():string;
                /**
                 * ���ò������ݵ�Ԫ����ʵ�����
                 *
                 * @param entityNumber
                 */
                setEntityNumber(entityNumber:string):void;
                /**
                 * ������Ҫִ�в����� OperationKey
                 *
                 * @param operationKey
                 */
                setOperationKey(operationKey:string):void;
            }
            type ExecutingCoordinationEvent_T = ExecutingCoordinationEvent_S & ExecutingCoordinationEvent$;
            interface ExecutingCoordinationEvent extends ExecutingCoordinationEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.formula{
            interface FormulaDataProvideExtPlugin_S {
            }
            interface FormulaDataProvideExtPlugin$ {
                /**
                 * <p>
                 * ִ�й�ʽ����Ԫ��ȡ����չ,��ΰ�����: 1.��չ�ļ���Ԫ��Ψһ����(uniqueCode),2.ȡ��Ҫ�õ���������map
                 *
                 * </p>
                 * <p>��չʾ����</p>
                 * <pre><code>
                 * ��չ�����ο���kd.sdk.wtc.wtp.business.formula.FormulaDataProvideExtDemo
                 * </code></pre>
                 * @param onDataProvideEvent ���ڹ�ʽ��չȡ���¼�
                 */
                onDataProvide(onDataProvideEvent:OnDataProvideEvent):void;
            }
            type FormulaDataProvideExtPlugin_T = FormulaDataProvideExtPlugin_S & FormulaDataProvideExtPlugin$;
            interface FormulaDataProvideExtPlugin extends FormulaDataProvideExtPlugin_T {
            }
            interface OnDataProvideEvent_S {
            }
            interface OnDataProvideEvent_C extends OnDataProvideEvent_S {
                new(dataProviderKey:string,paramMap:$.java.util.Map):OnDataProvideEvent;
            }
            interface OnDataProvideEvent$ {
                getDataProviderKey():string;
                getParamMap():$.java.util.Map;
                getResult():any;
                setResult(result:any):void;
            }
            type OnDataProvideEvent_T = OnDataProvideEvent_S & OnDataProvideEvent$;
            interface OnDataProvideEvent extends OnDataProvideEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.quota{
            interface QuotaQueryParam_S {
            }
            interface QuotaQueryParam_C extends QuotaQueryParam_S {
                new():QuotaQueryParam;
            }
            interface QuotaQueryParam$ {
                /**
                 * ��Ա����BoId��������򷵻ؿռ��ϡ�
                 */
                getAttFileBoId():long;
                /**
                 * ʱ�䷶Χ���˵Ľ���ʱ�䣬��Ϊ null��Ϊ null ʱ��ֱ��ʹ�õ�ǰʱ���ѯ�Ҳ����� startDate ��ֵ��
                 * <p>
                 * �� startDate �� endDate ��һһ��Ϊ null ʱ����ֱ���϶�Ϊʹ�õ�ǰϵͳ���ڲ�ѯ��
                 * �� startDate �� endDate ����Ϊ null ʱ��Ҫ�� startDate С�ڵ��� endDate�����򷵻ؿ��б�
                 */
                getEndDate():Date;
                /**
                 * ��Ҫ��ѯ�Ķ������ͣ�Ϊ null ���߿ռ���ʱ����ѯ�����������͵Ķ����Ϣ��
                 */
                getQuotaTypeIdList():$.java.util.List;
                /**
                 * ʱ�䷶Χ����ģʽ
                 * <p>
                 * 0(��ʹ�÷�Χ����),
                 * 1(�����ɷ�Χ����),
                 * 2(ʹ�÷�Χ�����ɷ�Χͬʱ����),
                 * 3(ʹ�÷�Χ�����ɷ�Χ����),
                 * ���������򷵻ؿս����
                 */
                getRangQueryType():number;
                /**
                 * ʱ�䷶Χ���˵Ŀ�ʼʱ�䣬��Ϊ null��Ϊ null ʱ��ֱ��ʹ�õ�ǰʱ���ѯ�Ҳ����� endDate ��ֵ��
                 * <p>
                 * �� startDate �� endDate ��һһ��Ϊ null ʱ����ֱ���϶�Ϊʹ�õ�ǰϵͳ���ڲ�ѯ��
                 * �� startDate �� endDate ����Ϊ null ʱ��Ҫ�� startDate С�ڵ��� endDate�����򷵻ؿ��б�
                 */
                getStartDate():Date;
                /**
                 * ��Ա����BoId��������򷵻ؿռ��ϡ�
                 */
                setAttFileBoId(attFileBoId:long):void;
                /**
                 * ʱ�䷶Χ���˵Ľ���ʱ�䣬��Ϊ null��Ϊ null ʱ��ֱ��ʹ�õ�ǰʱ���ѯ�Ҳ����� startDate ��ֵ��
                 * <p>
                 * �� startDate �� endDate ��һһ��Ϊ null ʱ����ֱ���϶�Ϊʹ�õ�ǰϵͳ���ڲ�ѯ��
                 * �� startDate �� endDate ����Ϊ null ʱ��Ҫ�� startDate С�ڵ��� endDate�����򷵻ؿ��б�
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ��Ҫ��ѯ�Ķ������ͣ�Ϊ null ���߿ռ���ʱ����ѯ�����������͵Ķ����Ϣ��
                 */
                setQuotaTypeIdList(quotaTypeIdList:$.java.util.List):void;
                /**
                 * ʱ�䷶Χ����ģʽ��
                 * <p>
                 * 0(��ʹ�÷�Χ����),
                 * 1(�����ɷ�Χ����),
                 * 2(ʹ�÷�Χ�����ɷ�Χͬʱ����),
                 * 3(ʹ�÷�Χ�����ɷ�Χ����),
                 * ���������򷵻ؿս����
                 */
                setRangQueryType(rangQueryType:number):void;
                /**
                 * ʱ�䷶Χ���˵Ŀ�ʼʱ�䣬��Ϊ null��Ϊ null ʱ��ֱ��ʹ�õ�ǰʱ���ѯ�Ҳ����� endDate ��ֵ��
                 * <p>
                 * �� startDate �� endDate ��һһ��Ϊ null ʱ����ֱ���϶�Ϊʹ�õ�ǰϵͳ���ڲ�ѯ��
                 * �� startDate �� endDate ����Ϊ null ʱ��Ҫ�� startDate С�ڵ��� endDate�����򷵻ؿ��б�
                 */
                setStartDate(startDate:Date):void;
            }
            type QuotaQueryParam_T = QuotaQueryParam_S & QuotaQueryParam$;
            interface QuotaQueryParam extends QuotaQueryParam_T {
            }
            interface WTPQuotaHelper_S {
                /**
                 * ������Ա�ĵ���boId��ѯ�Ķ�����Ϣ��
                 *
                 * @param queryParam ��ѯ����
                 * @return �������Ԫ��Ϊҳ�棨wtp_qtlinedetail���Ķ�̬��������ѯ���ֶ��У�
                 * <pre>
                 * attfilebo�����ڵ���bo��,
                 * attfileid�����ڵ����汾��,
                 * qttype���������ͣ�,
                 * genstartdate�����ɿ�ʼ���ڣ�,
                 * genenddate�����ɽ������ڣ�,
                 * usestartdate��ʹ�ÿ�ʼ���ڣ�,
                 * useenddate��ʹ�ý������ڣ�,
                 * source����Դ��,
                 * ownvalue�����п���ֵ-�����ɺ�̶���,
                 * ownodvalue������͸ֵ֧-�����ɺ�̶���,
                 * pastvalue������ֵ-�����ɺ�̶���,
                 * balance�����ֵ-�����ɺ�̶���,
                 * cdedvalue���ѽ�תֵ-�����ɺ�̶���,
                 * usablevalue������ֵ-�浥�ݵ�����仯��,
                 * freezevalue������ֵ-�浥�ݵ�����仯��,
                 * usedvalue������ֵ-�浥�ݵ�����仯��,
                 * canbeodvalue����͸ֵ֧-�浥�ݵ�����仯��,
                 * useodvalue����͸ֵ֧-�浥�ݵ�����仯��
                 * </pre>
                 */
                queryQuota(queryParam:QuotaQueryParam):$.java.util.List;
            }
            interface WTPQuotaHelper_C extends WTPQuotaHelper_S {
                new():WTPQuotaHelper;
            }
            interface WTPQuotaHelper$ {
            }
            type WTPQuotaHelper_T = WTPQuotaHelper_S & WTPQuotaHelper$;
            interface WTPQuotaHelper extends WTPQuotaHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.quota.summary{
            interface QTSummaryExpService_S {
            }
            interface QTSummaryExpService$ {
                query(queryParam:$.kd.bos.entity.report.ReportQueryParam,object_arg:any):$.kd.bos.algo.DataSet;
            }
            type QTSummaryExpService_T = QTSummaryExpService_S & QTSummaryExpService$;
            interface QTSummaryExpService extends QTSummaryExpService_T {
            }
            interface QTSummaryServiceDefault_S {
            }
            type QTSummaryServiceDefault_ST = QTSummaryExpService_S & QTSummaryServiceDefault_S;
            interface QTSummaryServiceDefault_C extends QTSummaryServiceDefault_ST {
                new():QTSummaryServiceDefault;
            }
            interface QTSummaryServiceDefault$ {
                /**
                 * ���ݲ�ѯ������ȡQFilter
                 *
                 * @param queryParam ��ѯ���
                 * @return ����QFilter����
                 */
                getQFilters(queryParam:$.kd.bos.entity.report.ReportQueryParam):$.java.util.List;
                /**
                 * ����QFilter�������ɷ�����ѯ��DataSet
                 *
                 * @param qFilterList QFilter����
                 * @return ������ѯ��DataSet
                 */
                queryDataInBatch(qFilterList:$.java.util.List):$.kd.bos.algo.DataSet;
            }
            type QTSummaryServiceDefault_T = QTSummaryExpService & QTSummaryServiceDefault_S & QTSummaryServiceDefault$;
            interface QTSummaryServiceDefault extends QTSummaryServiceDefault_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.ruleengine{
            interface OnGenRuleEngineInputParamEvent_S {
            }
            interface OnGenRuleEngineInputParamEvent_C extends OnGenRuleEngineInputParamEvent_S {
                new(source:string,planVersionId:long,inputParamMap:$.java.util.Map,extendKeys:$.java.util.Set,extendMap:$.java.util.Map):OnGenRuleEngineInputParamEvent;
                /**
                 * �����ڵ�������ù�������������ֶζ�����㹹�췽��
                 */
                new(calDate:Date,source:string,planVersionId:long,inputParamMap:$.java.util.Map,extendKeys:$.java.util.Set,extendMap:$.java.util.Map):OnGenRuleEngineInputParamEvent;
                /**
                 * �����ڶ��������ù�������������ֶζ�����㹹�췽��
                 */
                new(calDate:Date,source:string,planVersionId:long,inputParamMap:$.java.util.Map,extendKeys:$.java.util.Set,extendMap:$.java.util.Map,qteContextExt:kd.sdk.wtc.wtes.business.qte.QteContextExt):OnGenRuleEngineInputParamEvent;
                /**
                 * �����ں��������ڼ���ܺ����������ù�������������ֶζ�����㹹�췽��
                 */
                new(source:string,planVersionId:long,inputParamMap:$.java.util.Map,extendKeys:$.java.util.Set,extendMap:$.java.util.Map,tieAttPeriodContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt,perAttPeriodExt:kd.sdk.wtc.wtes.business.tie.model.perattperiod.PerAttPeriodExt):OnGenRuleEngineInputParamEvent;
                /**
                 * �����ں����������պ����������ù�������������ֶζ�����㹹�췽��
                 */
                new(calDate:Date,source:string,planVersionId:long,inputParamMap:$.java.util.Map,extendKeys:$.java.util.Set,extendMap:$.java.util.Map,tieContextExt:kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt):OnGenRuleEngineInputParamEvent;
            }
            interface OnGenRuleEngineInputParamEvent$ {
                /**
                 * ��ȡ��������
                 *
                 * @return calDate ��������
                 */
                getCalDate():Date;
                /**
                 * ��ȡ��չ�����key
                 *
                 * @return extendKeys ��չ�����key
                 */
                getExtendKeys():$.java.util.Set;
                /**
                 * ��ȡ��չ������ֶ�map
                 *
                 * @return extendMap ��չ������ֶ�map
                 */
                getExtendMap():$.java.util.Map;
                /**
                 * ��ȡ���������������map
                 *
                 * @return inputParaMap ���������������map
                 */
                getInputParamMap():$.java.util.Map;
                /**
                 * ��ȡ��Ա�����ڼ����
                 *
                 * @return perAttPeriodExt ��Ա�����ڼ����
                 */
                getPerAttPeriodExt():kd.sdk.wtc.wtes.business.tie.model.perattperiod.PerAttPeriodExt;
                /**
                 * ��ȡ�����汾ID
                 *
                 * @return planVersionId �����汾ID
                 */
                getPlanVersionId():long;
                /**
                 * ��ȡ���������������
                 * @return qteContextExt ��ȡ���������������
                 */
                getQteContextExt():kd.sdk.wtc.wtes.business.qte.QteContextExt;
                /**
                 * ��ȡ�������泡������
                 *
                 * @return source �������泡������
                 */
                getSource():string;
                /**
                 * ��ȡ��չ��Դ
                 *
                 * @return type ��չ��Դ
                 */
                getSourceType():string;
                /**
                 * ��ȡ���ں����ڼ����������
                 *
                 * @return tieAttPeriodContextExt ���ں����ڼ����������
                 */
                getTieAttPeriodContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.period.TieAttPeriodContextExt;
                /**
                 * ��ȡ��������ϸ������������
                 *
                 * @return tieContextExt ��������ϸ������������
                 */
                getTieContextExt():kd.sdk.wtc.wtes.business.tie.core.chain.TieContextExt;
                /**
                 * ������չ������ֶ�map
                 *
                 * @param extendMap ��չ������ֶ�map
                 */
                setExtendMap(extendMap:$.java.util.Map):void;
                /**
                 * ���ù��������������map
                 *
                 * @param inputParamMap ���������������map
                 */
                setInputParamMap(inputParamMap:$.java.util.Map):void;
            }
            type OnGenRuleEngineInputParamEvent_T = OnGenRuleEngineInputParamEvent_S & OnGenRuleEngineInputParamEvent$;
            interface OnGenRuleEngineInputParamEvent extends OnGenRuleEngineInputParamEvent_T {
            }
            interface RuleEngineInputParamExtPlugin_S {
            }
            interface RuleEngineInputParamExtPlugin$ {
                /**
                 * <p>
                 * wtc_scene_tp_v2 �����
                 * wtc_scene_otp_v2 , wtc_scene_otp_v3�Ӱೡ��
                 * wtc_scene_idp_v2 ��������
                 * wtc_scene_attendplan_v2 ���ڳ���
                 * wtc_scene_exception_v2 �쳣����
                 * wtc_scene_vacation_v2 �ݼٳ���
                 * wtc_scene_ad_v2 ��ǩ����
                 * wtc_scene_quota_v2 ���������
                 * ���ϳ���ʹ���˹������棬�ҹ��򷽰������������������չ�ֶΣ�ʹ�ø÷�����ҵ�񣨱��翼�ں��㡢�ݼٵ��ݣ�����øýӿ�
                 * </p>
                 * <p>
                 * ��ΰ����˹��򷽰��汾id�����������������map��inputParamMap����չ������ֶ�map��extendMap,���򳡾����룺source����Ҫ��չ���ֶμ��ϣ�extendKeys
                 * �����չ����α�ʶ����ʶ����Ӧ��ֵ��д��inputParamMap���������inputParamMap���Ѵ��ڵı�ʶ��ֻ�ڸñ�ʶ����չ��ҵ���ֶΣ������inputParamMap��ĸ�Ԫ��
                 * ��������չ�µ���α�ʶ�����ڵ�ǰ����α�ʶ����չ�ֶΣ���չ��������д��extendMap����д���key��Ҫ��extendKeys��Ԫ�ر���һ�£�ע�⣺��չ���ֶβ��ܳ���extendKeys���ϵ�Ԫ�����ƣ�������׳��쳣��
                 * </p>
                 * <p>��չʾ����</p>
                 * <pre><code>
                 * ��չ�����ο���kd.sdk.wtc.wtp.business.ruleengine.demo.RuleEngineInputParamExtPluginDemo
                 * ���������չ�����ο���kd.sdk.wtc.wtp.business.ruleengine.demo.QteRuleEngineInputParamExtPluginDemo
                 * </code></pre>
                 * @param onGenRuleEngineInputParamEvent �����������������չ�¼�
                 */
                onGenInputParam(onGenRuleEngineInputParamEvent:OnGenRuleEngineInputParamEvent):void;
            }
            type RuleEngineInputParamExtPlugin_T = RuleEngineInputParamExtPlugin_S & RuleEngineInputParamExtPlugin$;
            interface RuleEngineInputParamExtPlugin extends RuleEngineInputParamExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtp.business.tripplan{
            interface TripPlanRuleQuery_S {
            }
            type TripPlanRuleQuery_ST = $.java.io.Serializable & TripPlanRuleQuery_S;
            interface TripPlanRuleQuery_C extends TripPlanRuleQuery_ST {
                /**
                 * �������������ѯ�������
                 *
                 * @param attFileBoId ���ڵ���BoId, ���ɴ�0
                 * @param queryDate   Ҫ��ѯ������(yyyy-MM-dd)
                 * @param tripType    Ҫ��ѯ�ĳ�������
                 */
                new(attFileBoId:long,queryDate:Date,tripType:long):TripPlanRuleQuery;
            }
            interface TripPlanRuleQuery$ {
                /**
                 * ��ȡ���ڵ���BoId
                 */
                getAttFileBoId():long;
                getEntryIndex():number;
                /**
                 * ��ȡҪ��ѯ������(yyyy-MM-dd)
                 */
                getQueryDate():Date;
                getTpBillDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡҪ��ѯ�ĳ������ͣ�null��ѯȫ�����ͣ�
                 */
                getTripType():long;
                setEntryIndex(entryIndex:number):void;
                setTpBillDy(tpBillDy:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type TripPlanRuleQuery_T = $.java.io.Serializable & TripPlanRuleQuery_S & TripPlanRuleQuery$;
            interface TripPlanRuleQuery extends TripPlanRuleQuery_T {
            }
        }
        namespace kd.sdk.wtc.wtpm{
            interface SdkWtcWtpmModule_S {
            }
            type SdkWtcWtpmModule_ST = $.kd.sdk.module.Module & SdkWtcWtpmModule_S;
            interface SdkWtcWtpmModule_C extends SdkWtcWtpmModule_ST {
                new():SdkWtcWtpmModule;
            }
            interface SdkWtcWtpmModule$ {
            }
            type SdkWtcWtpmModule_T = $.kd.sdk.module.Module & SdkWtcWtpmModule_S & SdkWtcWtpmModule$;
            interface SdkWtcWtpmModule extends SdkWtcWtpmModule_T {
            }
        }
        namespace kd.sdk.wtc.wtpm.business{
            interface WTPMSignCardHelper_S {
                /**
                 * ͨ���Զ����ȡ��ƥ�俪ʼ���������ڣ���ָ���Ŀ��ڵ���BOID���ϣ�ִ���Զ����ȡ��ƥ������
                 *
                 * @param cardMatchTaskParam     ȡ��ƥ�䶨ʱ�������
                 */
                executeCardMatchTask(cardMatchTaskParam:kd.sdk.wtc.wtpm.business.cardmatch.CardMatchTaskParam):void;
                /**
                 * ͨ���Զ����ȡ��ƥ�俪ʼ���������ڣ���ָ���Ŀ��ڵ���BOID���ϣ�ִ���Զ����ȡ��ƥ������
                 *
                 * @param cardMatchTaskParam     ȡ��ƥ�䶨ʱ�������
                 */
                executeCustomCardMatchTask(cardMatchTaskParam:kd.sdk.wtc.wtpm.business.cardmatch.CardMatchTaskParam):$.kd.bos.entity.api.ApiResult;
            }
            interface WTPMSignCardHelper_C extends WTPMSignCardHelper_S {
                new():WTPMSignCardHelper;
            }
            interface WTPMSignCardHelper$ {
            }
            type WTPMSignCardHelper_T = WTPMSignCardHelper_S & WTPMSignCardHelper$;
            interface WTPMSignCardHelper extends WTPMSignCardHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtpm.business.cardmatch{
            interface AfterCardMatchEvent_S {
            }
            interface AfterCardMatchEvent_C extends AfterCardMatchEvent_S {
                new(taskVoExt:kd.sdk.wtc.wtpm.model.cardmatch.CardMatchTaskVoExt):AfterCardMatchEvent;
            }
            interface AfterCardMatchEvent$ {
                /**
                 * ��ȡ��Ҫ�滻�Ķ�ο�map�������map��key-vaule:(���ڵ���boid-Map),�ڶ���map��key-vaule:(�������-MultiCardExt)
                 */
                getMulTiCardExtMap():$.java.util.Map;
                /**
                 * ��ȡȡ��ƥ��������������Ϣ
                 */
                getTaskVoExt():kd.sdk.wtc.wtpm.model.cardmatch.CardMatchTaskVoExt;
            }
            type AfterCardMatchEvent_T = AfterCardMatchEvent_S & AfterCardMatchEvent$;
            interface AfterCardMatchEvent extends AfterCardMatchEvent_T {
            }
            interface CardMatchIntersectionExtPlugin_S {
            }
            interface CardMatchIntersectionExtPlugin$ {
                /**
                 * ȡ��ƥ�佻��ȡ��ǰ����չ����
                 *
                 * <p>
                 * �ڽ���ȡ���߼�ִ��ǰ���˷�������ȡ������ȡ�������ó����ȡ����ʽȡ����ͨ������BeforeCardMatchIntersectionEvent.setNeedIntersection()���������Ƿ�ȡ������ȡ����
                 * ����˷�����ǰ��������ȡ��������Χ����ԭʼ��
                 *
                 * </p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtpm.business.cardmatch.CardMatchIntersectionExtPlugin����չ˵�����˵�·����ҵ����չƽ̨->ҵ����չ����</p>
                 * @param event ����ȡ��ǰ�������¼�
                 */
                beforeIntersection?(event:BeforeCardMatchIntersectionEvent):void;
            }
            type CardMatchIntersectionExtPlugin_T = CardMatchIntersectionExtPlugin_S & CardMatchIntersectionExtPlugin$;
            interface CardMatchIntersectionExtPlugin extends CardMatchIntersectionExtPlugin_T {
            }
            interface BeforeCardMatchIntersectionEvent_S {
            }
            interface BeforeCardMatchIntersectionEvent_C extends BeforeCardMatchIntersectionEvent_S {
                new(taskVoExt:kd.sdk.wtc.wtpm.model.cardmatch.CardMatchTaskVoExt,cardMatchVoExt:kd.sdk.wtc.wtpm.model.cardmatch.CardMatchVoExt,signCardExtList:$.java.util.List):BeforeCardMatchIntersectionEvent;
            }
            interface BeforeCardMatchIntersectionEvent$ {
                /**
                 * ��ȡȡ��ƥ����������Ϣ
                 */
                getMatchVoExt():kd.sdk.wtc.wtpm.model.cardmatch.CardMatchVoExt;
                /**
                 * ��ȡ������Χ���ԭʼ��
                 */
                getSignCardExtList():$.java.util.List;
                /**
                 * ��ȡȡ��ƥ��������������Ϣ
                 */
                getTaskVoExt():kd.sdk.wtc.wtpm.model.cardmatch.CardMatchTaskVoExt;
                /**
                 * ��ȡ�Ƿ���Ҫִ�н���ȡ���߼�
                 */
                isNeedIntersection():boolean;
                /**
                 * �����Ƿ���Ҫִ�н���ȡ���߼�
                 */
                setNeedIntersection(needIntersection:boolean):void;
            }
            type BeforeCardMatchIntersectionEvent_T = BeforeCardMatchIntersectionEvent_S & BeforeCardMatchIntersectionEvent$;
            interface BeforeCardMatchIntersectionEvent extends BeforeCardMatchIntersectionEvent_T {
            }
            interface AfterCardMatchExtPlugin_S {
            }
            interface AfterCardMatchExtPlugin$ {
                /**
                 * ȡ��ƥ��-ȡ��ƥ����㣬��ƥ���߼�������ɺ���Ч���������ǰ����øýӿڡ�
                 *
                 * <p>
                 * ����չ������������Ч��-��ο���¼���ǰ�޸Ķ�ο���¼�����ԣ��޸ĺ�����ݱ���д��AfterCardMatchEvent.getMulTiCardExtMap()��û�б仯����Ҫд��
                 * AfterCardMatchEvent.getTaskVoExt()�����ɻ�ȡ��ȡ��ƥ���߼�����������Ϣ��������������Ϣ�޸Ķ�ο���¼���ԡ�
                 * </p>
                 *
                 * <p>��չʾ������ο�ҵ����չ����kd.sdk.wtc.wtpm.business.cardmatch.AfterCardMatchExtPlugin����չ˵�����˵�·����ҵ����չƽ̨->ҵ����չ����</p>
                 * @param event ȡ��ƥ���߼�������������¼�
                 */
                adjustMultiCard?(event:AfterCardMatchEvent):void;
            }
            type AfterCardMatchExtPlugin_T = AfterCardMatchExtPlugin_S & AfterCardMatchExtPlugin$;
            interface AfterCardMatchExtPlugin extends AfterCardMatchExtPlugin_T {
            }
            interface CardMatchTaskParam_S {
            }
            type CardMatchTaskParam_ST = $.java.io.Serializable & CardMatchTaskParam_S;
            interface CardMatchTaskParam_C extends CardMatchTaskParam_ST {
                new():CardMatchTaskParam;
            }
            interface CardMatchTaskParam$ {
                /**
                 * ȡ��ƥ��ָ�����ڵ���BOID����
                 *
                 * @return ȡ��ƥ��ָ�����ڵ���BOID����
                 */
                getAttFileBoIds():$.java.util.Set;
                getAttOrgId():long;
                /**
                 * ��ȡ���񴴽���id
                 */
                getCreatorId():long;
                /**
                 * �����������
                 *
                 * @return �����������
                 */
                getEndDate():Date;
                /**
                 * ����ʼ����
                 *
                 * @return ����ʼ����
                 */
                getStartDate():Date;
                /**
                 * ȡ��ƥ����������
                 *
                 * @return ȡ��ƥ����������
                 */
                getTaskDesc():string;
                /**
                 * ��ȡȡ��ƥ���������ͣ�1-�ֶ�ƥ�䣻7-��ʱ����8-������ǩ
                 */
                getTaskType():string;
                /**
                 * ȡ��ƥ��ָ�����ڵ���BOID���ϣ�������ִ��ƥ�����п��ڵ���BOID��ѡ�
                 *
                 * @param attFileBoIds ȡ��ƥ��ָ�����ڵ���BOID���ϣ�������ִ��ƥ�����п��ڵ���BOID��ѡ�
                 */
                setAttFileBoIds(attFileBoIds:$.java.util.Set):void;
                setAttOrgId(attOrgId:long):void;
                /**
                 * �������񴴽���id��ѡ�
                 */
                setCreatorId(creatorId:long):void;
                /**
                 * �����������
                 *
                 * @param endDate �����������
                 */
                setEndDate(endDate:Date):void;
                /**
                 * ����ʼ����
                 *
                 * @param startDate ����ʼ����
                 */
                setStartDate(startDate:Date):void;
                /**
                 * ȡ��ƥ������������ѡ���200�����ַ�
                 *
                 * @param taskDesc ȡ��ƥ������������ѡ���200�����ַ�
                 */
                setTaskDesc(taskDesc:string):void;
                /**
                 * ����ȡ��ƥ���������ͣ�1-�ֶ�ƥ�䣻7-��ʱ����8-������ǩ
                 */
                setTaskType(taskType:string):void;
            }
            type CardMatchTaskParam_T = $.java.io.Serializable & CardMatchTaskParam_S & CardMatchTaskParam$;
            interface CardMatchTaskParam extends CardMatchTaskParam_T {
            }
            interface CardMatchOffShiftExtPlugin_S {
            }
            interface CardMatchOffShiftExtPlugin$ {
                /**
                 * ȡ��ƥ��-ƥ��off�ࣨ���������죩���㣬��ȡ����off����ʱ�ε�ȡ�������ȡ����Χ֮�����øĽӿڡ�
                 *
                 * <p>
                 * �ɸ���������ݶ���εĳ�ʼ��ȡ����Χ�Ŀ�ʼʱ��������int����ȡ����Χ�Ľ���ʱ��������int�����д������أ�֧�ָ�����
                 * �����˲ε�ƥ������Ϊ2023-10-01����ʼʱ������=7200������ʱ������=86399��˵����ʼ��ȡ����ΧΪ[2023-10-01 02:00:00~2023-10-01 23:59:59]
                 * �޸���εĿ�ʼʱ������=-1200������ʱ������=93600��˵����չ���ȡ����ΧΪ[2023-09-30 23:40:00~2023-10-02 02:00:00]
                 * ���޸Ŀ�ʼ����ʱ��������ȡ����Χ�ޱ仯��Ҳ��ֻ�޸Ŀ�ʼ����ʱ����������֮һ��Ҳ��ȫ�޸ġ�
                 * </p>
                 *
                 * <p>��չʾ����</p>
                 * <pre><code>
                 *     public void afterOffShiftTakeCardRange(OffShiftTakeCardRangeEvent event) {
                 *         // ���������Ϣ��ȡƥ�����ڵ�ȡ����Χ��Ҫ��ǰ�����Ӷ���ʱ��(����)
                 *         event.setRangeStartSecords(event.getRangeStartSecords() - 1200);
                 *         event.setRangeEndSecords(event.getRangeEndSecords() + 7200);
                 *     }
                 * </code></pre>
                 * @param event off����ʱ�ΰ��ȡ����Χ���������¼�
                 */
                afterOffShiftTakeCardRange?(event:OffShiftTakeCardRangeEvent):void;
            }
            type CardMatchOffShiftExtPlugin_T = CardMatchOffShiftExtPlugin_S & CardMatchOffShiftExtPlugin$;
            interface CardMatchOffShiftExtPlugin extends CardMatchOffShiftExtPlugin_T {
            }
            interface OffShiftTakeCardRangeEvent_S {
            }
            interface OffShiftTakeCardRangeEvent_C extends OffShiftTakeCardRangeEvent_S {
                new(attPersonId:long,matchDate:$.java.time.LocalDate,attFileBoId:long,shiftId:long,rangeStartSecords:number,rangeEndSecords:number):OffShiftTakeCardRangeEvent;
            }
            interface OffShiftTakeCardRangeEvent$ {
                /**
                 * ��ȡ���ڵ���BOID
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡƥ������
                 */
                getMatchDate():$.java.time.LocalDate;
                /**
                 * ��ȡȡ����Χ����ʱ������
                 */
                getRangeEndSecords():number;
                /**
                 * ��ȡȡ����Χ��ʼʱ������
                 */
                getRangeStartSecords():number;
                /**
                 * ��ȡ��ΰ汾id
                 */
                getShiftId():long;
                /**
                 * ���ÿ��ڵ���BOID
                 */
                setAttFileBoId(attFileBoId:long):void;
                /**
                 * ���ÿ�����id
                 */
                setAttPersonId(attPersonId:long):void;
                /**
                 * ����ƥ������
                 */
                setMatchDate(matchDate:$.java.time.LocalDate):void;
                /**
                 * ����ȡ����Χ����ʱ������
                 */
                setRangeEndSecords(rangeEndSecords:number):void;
                /**
                 * ����ȡ����Χ��ʼʱ������
                 */
                setRangeStartSecords(rangeStartSecords:number):void;
                /**
                 * ���ð�ΰ汾id
                 */
                setShiftId(shiftId:long):void;
            }
            type OffShiftTakeCardRangeEvent_T = OffShiftTakeCardRangeEvent_S & OffShiftTakeCardRangeEvent$;
            interface OffShiftTakeCardRangeEvent extends OffShiftTakeCardRangeEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtpm.business.punchcard{
            interface WTPMPunchCardHelper_S {
                /**
                 * ��ѯ�û�ĳ�մ����顢���ʱ��
                 *
                 * @param attPersonId ������id
                 * @param startDate   ��ʼ����
                 * @param endDate     ��������
                 * @return Map<Date, Map < String, Object>> key:�������
                 * <pre>
                 * <p>
                 * ��ο����ؽṹ:
                 * {
                 * "type": "1",    --��ο����ڷ�ʽ
                 * "attfileboid" : 123456789L,
                 * "offshift": "true"/"false",
                 * "sign":         --������
                 * [
                 * {
                 * "mustsignpoint": "2022-05-01 09:00:00" -- Ӧ�򿨵�(��off����ʱ�εİ���Ҵ�����Ч����Ż���ֵ)
                 * "needsignon": "true",   --��Ҫ���ϰ࿨
                 * "hassignedon": "true",  --�Ѵ��ϰ࿨
                 * "signon": "2022-05-01 09:00:02",    --ʵ���ϰ�򿨵�
                 * "signonaddress": "���ڽ�����԰1F",  -- ʵ���ϰ��λ��
                 * "needsignoff": "true",  --��Ҫ���°࿨
                 * "hassignedoff": "true", --�Ѵ��°࿨
                 * "signoff": "2022-05-01 12:01:07",   --ʵ���°�򿨵�
                 * "signoffaddress": "���ڽ�����԰3F"   --ʵ���°��λ��
                 * <p>
                 * },
                 * {
                 * "needsignon": "false",  --��Ҫ���ϰ࿨
                 * "hassignedon": "false", --�Ѵ��ϰ࿨
                 * "needsignoff": "true",  --��Ҫ���°࿨
                 * "hassignedoff": "false", --�Ѵ��°࿨
                 * },
                 * {
                 * "needsignon": "false",  --��Ҫ���ϰ࿨
                 * "hassignedon": "false", --�Ѵ��ϰ࿨
                 * "needsignoff": "true",  --��Ҫ���°࿨
                 * "hassignedoff": "true", --�Ѵ��°࿨
                 * "mustsignpoint": "2022-05-01 18:00:00" -- Ӧ�򿨵�(��off����ʱ�εİ���Ҵ�����Ч����Ż���ֵ)
                 * "signoff": "2022-05-02 02:21:45"    --ʵ���°�򿨵�
                 * "signoffaddress": "���ڽ�����԰" --ʵ���°��λ��
                 * }
                 * ],
                 * "shift":    --�������
                 * [   {
                 * "start": "2022-05-01 09:00:00", --���ʱ��1���ϰ࿨��
                 * "end": "2022-05-01 12:00:00"    --���ʱ��1���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 14:00:00", --���ʱ��2���ϰ࿨��
                 * "end": "2022-05-01 18:00:00"    --���ʱ��2���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 19:00:00", --���ʱ��3���ϰ࿨��
                 * "end": "2022-05-02 02:00:00"    --���ʱ��3���°࿨��
                 * }
                 * ]
                 * }
                 * </p>
                 *
                 * <p>
                 * һ�ο����ؽṹ:
                 * {
                 * "type": "2",    --һ�ο����ڷ�ʽ
                 * "attfileboid" : 123456789L,
                 * "offshift": "true"/"false",
                 * "sign": "2022-05-01 09:00:02",    --һ�ο��򿨵�
                 * "signaddress": "���ڽ�����԰3F",    --һ�ο���λ��
                 * "shift":    --�������
                 * [   {
                 * "start": "2022-05-01 09:00:00", --���ʱ��1���ϰ࿨��
                 * "end": "2022-05-01 12:00:00"    --���ʱ��1���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 14:00:00", --���ʱ��2���ϰ࿨��
                 * "end": "2022-05-01 18:00:00"    --���ʱ��2���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 19:00:00", --���ʱ��3���ϰ࿨��
                 * "end": "2022-05-02 02:00:00"    --���ʱ��3���°࿨��
                 * }
                 * ]
                 * }
                 * </p>
                 * <p>
                 * ���򿨷��ؽṹ:
                 * {
                 * "type": "3",    --���ڷ�ʽΪ����
                 * "attfileboid" : 123456789L,
                 * "offshift": "true"/"false",
                 * "shift":    --�������
                 * [   {
                 * "start": "2022-05-01 09:00:00", --���ʱ��1���ϰ࿨��
                 * "end": "2022-05-01 12:00:00"    --���ʱ��1���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 14:00:00", --���ʱ��2���ϰ࿨��
                 * "end": "2022-05-01 18:00:00"    --���ʱ��2���°࿨��
                 * },
                 * {
                 * "start": "2022-05-01 19:00:00", --���ʱ��3���ϰ࿨��
                 * "end": "2022-05-02 02:00:00"    --���ʱ��3���°࿨��
                 * }]}
                 * </p>
                 * </pre>
                 */
                getPunchCardDetail(attPersonId:long,startDate:Date,endDate:Date):$.java.util.Map;
            }
            interface WTPMPunchCardHelper_C extends WTPMPunchCardHelper_S {
                new():WTPMPunchCardHelper;
            }
            interface WTPMPunchCardHelper$ {
            }
            type WTPMPunchCardHelper_T = WTPMPunchCardHelper_S & WTPMPunchCardHelper$;
            interface WTPMPunchCardHelper extends WTPMPunchCardHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtpm.model.cardmatch{
            interface CardMatchTaskVoExt_S {
            }
            interface CardMatchTaskVoExt$ {
                /**
                 * ��ȡ���ڵ����Ϳ��ڿ��Ÿ���ӳ���ϵ��key:���ڵ���boid-value:���ڿ���list
                 */
                getAttCardMap():$.java.util.Map;
                /**
                 * ��ȡ���ڵ���boid����
                 */
                getAttFileBoIds():$.java.util.Set;
                /**
                 * ��ȡ���ڵ����Ϳ��ڷ�ʽ����ӳ���ϵ��key:���ڵ���boid-value:���ڷ�ʽlist
                 */
                getAttModeMap():$.java.util.Map;
                /**
                 * ��ȡ������id����
                 */
                getAttPersonIds():$.java.util.Set;
                /**
                 * ��ȡȡ��ƥ�������������
                 */
                getEndDate():Date;
                /**
                 * ��ȡȡ��ƥ��������������Ϣ
                 */
                getMultiCardSet():$.java.util.Set;
                /**
                 * ��ȡ�����˺Ϳ��ڵ���ӳ���ϵ��key:������id-value:���ڵ���list
                 */
                getPersonAttFileMap():$.java.util.Map;
                /**
                 * ��ȡȡ��������ʷ�汾��Ϣ��key:ȡ������boid-value:ȡ��������ʷ�汾
                 */
                getRuleConfigMap():$.java.util.Map;
                /**
                 * ��ȡȡ��������ʷ�汾��Ϣ��key:ȡ������boid-value:ȡ��������ʷ�汾
                 */
                getRuleMap():$.java.util.Map;
                /**
                 * ��ȡ�����ʷ�汾��Ϣ��key:���boid-value:�����ʷ�汾
                 */
                getShiftMap():$.java.util.Map;
                /**
                 * ��ȡȡ��ƥ������ʼ����
                 */
                getStartDate():Date;
                /**
                 * ��ȡȡ��ƥ����Ƭ����id
                 */
                getSubTaskId():long;
                /**
                 * ��ȡȡ��ƥ������id
                 */
                getTaskId():long;
                /**
                 * ��ȡ���ڵ�����ʱ������ӳ���ϵ��key:���ڵ���boid-value:ʱ��list
                 */
                getTimeZoneMap():$.java.util.Map;
                /**
                 * ��ȡ�ݼٵ���Ϣ��key:���ڵ���boid
                 */
                getVaBillMap():$.java.util.Map;
            }
            type CardMatchTaskVoExt_T = CardMatchTaskVoExt_S & CardMatchTaskVoExt$;
            interface CardMatchTaskVoExt extends CardMatchTaskVoExt_T {
            }
            interface MultiCardExtStd_S {
            }
            interface MultiCardExtStd$ {
                /**
                 * ��ȡ���ڿ���
                 */
                getAttCard():string;
                /**
                 * ��ȡ���ڵ���boid
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ���ڵ����汾id
                 */
                getAttFileId():long;
                /**
                 * ��ȡ���ڵ�����ʱ��id
                 */
                getAttFileTimeZoneId():long;
                /**
                 * ��ȡ������
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ��������
                 */
                getDateTypeId():long;
                /**
                 * ��ȡ��ο���¼
                 */
                getEntryList():$.java.util.List;
                /**
                 * ��ȡ���ڹ�����֯
                 */
                getOrgId():long;
                /**
                 * ��ι�������(������)
                 */
                getShiftDate():$.java.time.LocalDate;
                /**
                 * ��ȡ���id
                 */
                getShiftId():long;
                /**
                 * ��ȡ����
                 */
                getWeek():string;
                /**
                 * ��ȡ�Ƿ���ʱ��
                 */
                isNotPlan():boolean;
                /**
                 * ��ȡ�Ƿ�off��
                 */
                isOffShift():boolean;
            }
            type MultiCardExtStd_T = MultiCardExtStd_S & MultiCardExtStd$;
            interface MultiCardExtStd extends MultiCardExtStd_T {
            }
            interface MultiCardExt_S {
            }
            interface MultiCardExt_C extends MultiCardExt_S {
                new():MultiCardExt;
            }
            interface MultiCardExt$ {
                /**
                 * ��ȡ���ڿ���
                 */
                getAttCard():string;
                /**
                 * ��ȡ���ڵ���boid
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ���ڵ����汾id
                 */
                getAttFileId():long;
                /**
                 * ��ȡ���ڵ�����ʱ��id
                 */
                getAttFileTimeZoneId():long;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ��������
                 */
                getDateTypeId():long;
                /**
                 * ��ȡ��ο���¼
                 */
                getEntryList():$.java.util.List;
                /**
                 * ��ȡ��ο�����
                 */
                getId():long;
                /**
                 * ��ȡ���ڹ�����֯
                 */
                getOrgId():long;
                /**
                 * ��ȡ��ι�������(������)
                 */
                getShiftDate():$.java.time.LocalDate;
                /**
                 * ��ȡ��ΰ汾id
                 */
                getShiftId():long;
                /**
                 * ��ȡ����
                 */
                getWeek():string;
                /**
                 * ��ȡ�Ƿ���ʱ��
                 */
                isNotPlan():boolean;
                /**
                 * ��ȡ�Ƿ�off��
                 */
                isOffShift():boolean;
                /**
                 * ���ÿ��ڿ���
                 */
                setAttCard(attCard:string):void;
                /**
                 * ���ÿ��ڵ���boid
                 */
                setAttFileBoId(attFileBoId:long):void;
                /**
                 * ���ÿ��ڵ����汾id
                 */
                setAttFileId(attFileId:long):void;
                /**
                 * ���ÿ��ڵ�����ʱ��id
                 */
                setAttFileTimeZoneId(attFileTimeZoneId:long):void;
                /**
                 * ���ÿ�����id
                 */
                setAttPersonId(attPersonId:long):void;
                /**
                 * ������������
                 */
                setDateTypeId(dateTypeId:long):void;
                /**
                 * ���ö�ο���¼
                 */
                setEntryList(entryList:$.java.util.List):void;
                /**
                 * ���ö�ο�����
                 */
                setId(id:long):void;
                /**
                 * �����Ƿ���ʱ��
                 */
                setNotPlan(notPlan:boolean):void;
                /**
                 * �����Ƿ�off��
                 */
                setOffShift(offShift:boolean):void;
                /**
                 * ���ÿ��ڹ�����֯
                 */
                setOrgId(orgId:long):void;
                /**
                 * ���ð�ι�������(������)
                 */
                setShiftDate(shiftDate:$.java.time.LocalDate):void;
                /**
                 * ���ð�ΰ汾id
                 */
                setShiftId(shiftId:long):void;
                /**
                 * ��������
                 */
                setWeek(week:string):void;
            }
            type MultiCardExt_T = MultiCardExt_S & MultiCardExt$;
            interface MultiCardExt extends MultiCardExt_T {
            }
            interface CardMatchVoExt_S {
            }
            interface CardMatchVoExt$ {
                /**
                 * ��ȡ���ڵ���boid
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ���ڵ���id
                 */
                getAttFileId():long;
                /**
                 * ��ȡ���ڷ�ʽ "1"-��ο���"2"-һ�ο���"3"-����
                 */
                getAttMode():string;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡƥ������
                 */
                getLocalDate():$.java.time.LocalDate;
                /**
                 * ��ȡƥ������
                 */
                getMatchDate():Date;
                /**
                 * ��ȡ�¸���ε�һ��Ӧ�򿨵�(0ʱ��)���¸����Ϊ��ʱ��off��ʱ�򲻸�ֵ
                 */
                getNextShiftMustSignFirst():$.java.time.LocalDateTime;
                /**
                 * ��ȡ��һ��ʱ��
                 */
                getNextTimeDiff():number;
                /**
                 * ��ȡʱ��
                 */
                getTimeDiff():number;
                /**
                 * ��ȡʱ��
                 */
                getTimeZoneId():long;
                /**
                 * ��ȡ�¸�����Ƿ�Ϊ��ʱ��off��
                 */
                nextOffShift():boolean;
            }
            type CardMatchVoExt_T = CardMatchVoExt_S & CardMatchVoExt$;
            interface CardMatchVoExt extends CardMatchVoExt_T {
            }
            interface MultiCardEntryExt_S {
            }
            type MultiCardEntryExt_ST = $.java.io.Serializable & MultiCardEntryExt_S;
            interface MultiCardEntryExt_C extends MultiCardEntryExt_ST {
                new():MultiCardEntryExt;
            }
            interface MultiCardEntryExt$ {
                /**
                 * ��ȡ������ʶ
                 */
                getAccessTag():string;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ���豸
                 */
                getDeviceId():long;
                /**
                 * ��ȡ��Ч����
                 */
                getEffectivePoint():$.java.time.LocalDateTime;
                /**
                 * ��ȡ�Ǳ�Ʒ����չ�ֶΣ�key���ֶ����ƣ�value���ֶ�ֵ
                 */
                getExtFieldMap():$.java.util.Map;
                /**
                 * ��ȡ�������
                 */
                getMatchDate():$.java.time.LocalDate;
                /**
                 * ��ȡ��Ч����(0ʱ��)
                 */
                getMultiPointUtc():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ�򿨵�
                 */
                getMustPoint():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ�򿨵�(0ʱ��)
                 */
                getMustPointUtc():$.java.time.LocalDateTime;
                /**
                 * ��ȡ����˵��
                 */
                getPointDescId():long;
                /**
                 * ��ȡ������ű�ʶ
                 */
                getPointTag():string;
                /**
                 * ��ȡԤ��ҵ���ֶ�1
                 */
                getPresetBiz1():string;
                /**
                 * ��ȡԤ��ҵ���ֶ�2
                 */
                getPresetBiz2():string;
                /**
                 * ��ȡԭʼ��ID
                 */
                getSignCardId():long;
                /**
                 * ��ȡ����Դ
                 */
                getSourceId():long;
                /**
                 * ��ȡʱ��id
                 */
                getTimeZoneId():long;
                /**
                 * ���ý�����ʶ
                 */
                setAccessTag(accessTag:string):void;
                /**
                 * ���ÿ�����id
                 */
                setAttPersonId(attPersonId:long):void;
                /**
                 * ���ô��豸
                 */
                setDeviceId(deviceId:long):void;
                /**
                 * ������Ч����
                 */
                setEffectivePoint(effectivePoint:$.java.time.LocalDateTime):void;
                /**
                 * ���÷Ǳ�Ʒ����չ�ֶΣ�key���ֶ����ƣ�value���ֶ�ֵ
                 */
                setExtFieldMap(extFieldMap:$.java.util.Map):void;
                /**
                 * ���ð������
                 */
                setMatchDate(matchDate:$.java.time.LocalDate):void;
                /**
                 * ������Ч����(0ʱ��)
                 */
                setMultiPointUtc(multiPointUtc:$.java.time.LocalDateTime):void;
                /**
                 * ����Ӧ�򿨵�
                 */
                setMustPoint(mustPoint:$.java.time.LocalDateTime):void;
                /**
                 * ����Ӧ�򿨵�(0ʱ��)
                 */
                setMustPointUtc(mustPointUtc:$.java.time.LocalDateTime):void;
                /**
                 * ���ÿ���˵��
                 */
                setPointDescId(pointDescId:long):void;
                /**
                 * ���ÿ�����ű�ʶ
                 */
                setPointTag(pointTag:string):void;
                /**
                 * ����Ԥ��ҵ���ֶ�1
                 */
                setPresetBiz1(presetBiz1:string):void;
                /**
                 * ����Ԥ��ҵ���ֶ�2
                 */
                setPresetBiz2(presetBiz2:string):void;
                /**
                 * ����ԭʼ��ID
                 */
                setSignCardId(signCardId:long):void;
                /**
                 * ���ô���Դ
                 */
                setSourceId(sourceId:long):void;
                /**
                 * ����ʱ��id
                 */
                setTimeZoneId(timeZoneId:long):void;
            }
            type MultiCardEntryExt_T = $.java.io.Serializable & MultiCardEntryExt_S & MultiCardEntryExt$;
            interface MultiCardEntryExt extends MultiCardEntryExt_T {
            }
            interface MultiCardEntryExtStd_S {
            }
            interface MultiCardEntryExtStd$ {
                /**
                 * ��ȡ������ʶ
                 */
                getAccessTag():string;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ���豸
                 */
                getDeviceId():long;
                /**
                 * ��ȡ��Ч����
                 */
                getEffectivePoint():$.java.time.LocalDateTime;
                /**
                 * ��ȡ�������
                 */
                getMatchDate():$.java.time.LocalDate;
                /**
                 * ��ȡ��Ч����(0ʱ��)
                 */
                getMultiPointUtc():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ�򿨵�
                 */
                getMustPoint():$.java.time.LocalDateTime;
                /**
                 * ��ȡӦ�򿨵�,(0ʱ��)
                 */
                getMustPointUtc():$.java.time.LocalDateTime;
                /**
                 * ��ȡ����˵��
                 */
                getPointDescId():long;
                /**
                 * ��ȡ������ű�ʶ
                 */
                getPointTag():string;
                /**
                 * ��ȡԤ��ҵ���ֶ�1
                 */
                getPresetBiz1():string;
                /**
                 * ��ȡԤ��ҵ���ֶ�2
                 */
                getPresetBiz2():string;
                /**
                 * ��ȡԭʼ��ID
                 */
                getSignCardId():long;
                /**
                 * ��ȡ����Դ
                 */
                getSourceId():long;
                /**
                 * ��ȡʱ��id
                 */
                getTimeZoneId():long;
            }
            type MultiCardEntryExtStd_T = MultiCardEntryExtStd_S & MultiCardEntryExtStd$;
            interface MultiCardEntryExtStd extends MultiCardEntryExtStd_T {
            }
            interface SignCardExt_S {
            }
            interface SignCardExt$ {
                /**
                 * ��ȡ������ "on"-�� ��off����
                 */
                getAccessTag():string;
                /**
                 * ��ȡ���ڿ���
                 */
                getAttCard():string;
                /**
                 * ��ȡ���ڵ���boid
                 */
                getAttFileBoId():long;
                /**
                 * ��ȡ���ڵ���id
                 */
                getAttFileId():long;
                /**
                 * ��ȡ������id
                 */
                getAttPersonId():long;
                /**
                 * ��ȡ����
                 */
                getId():long;
                /**
                 * ��ȡԤ��ҵ���ֶ�1
                 */
                getPresetBiz1():string;
                /**
                 * ��ȡԤ��ҵ���ֶ�2
                 */
                getPresetBiz2():string;
                /**
                 * ��ȡ��ʱ��"yyyy-MM-dd HH:mm:ss"
                 */
                getSignDateTime():Date;
                /**
                 * ��ȡ��ʱ��(0ʱ��)"yyyy-MM-dd HH:mm:ss"
                 */
                getSignDateTimeUtc():Date;
                /**
                 * ��ȡ��ʱ��"yyyy-MM-dd HH:mm:ss"
                 */
                getSignPoint():$.java.time.LocalDateTime;
                /**
                 * ��ȡ��ʱ��(0ʱ��)"yyyy-MM-dd HH:mm:ss"
                 */
                getSignPointUtc():$.java.time.LocalDateTime;
                /**
                 * ��ȡ����Դ
                 */
                getSource():long;
                /**
                 * ��ȡʱ��
                 */
                getTimeDiff():number;
                /**
                 * ��ȡʱ��id
                 */
                getTimeZoneId():long;
            }
            type SignCardExt_T = SignCardExt_S & SignCardExt$;
            interface SignCardExt extends SignCardExt_T {
            }
        }
        namespace kd.sdk.wtc.wts{
            interface SdkWtcWtsModule_S {
            }
            type SdkWtcWtsModule_ST = $.kd.sdk.module.Module & SdkWtcWtsModule_S;
            interface SdkWtcWtsModule_C extends SdkWtcWtsModule_ST {
                new():SdkWtcWtsModule;
            }
            interface SdkWtcWtsModule$ {
            }
            type SdkWtcWtsModule_T = $.kd.sdk.module.Module & SdkWtcWtsModule_S & SdkWtcWtsModule$;
            interface SdkWtcWtsModule extends SdkWtcWtsModule_T {
            }
        }
        namespace kd.sdk.wtc.wts.business.roster{
            interface WTSRosterHelper_S {
                /**
                 * ����ѯָ�����ڵ�������Ա�Ű��
                 *
                 * @param attFileBoId ������id
                 * @param startDate  ��ʼ���� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @param endDate   �������� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @return ��������ΪMap
                 * ����ֵ˵����<br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21"<br/>
                 * value: Map<String, Object><br/>
                 * Map<String, Map<String, Object>> <br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21" <br/>
                 * value: Map<String, Object> ���ݸ�ʽ���£�<br/>
                 * <table>
                 *     <tr>
                 *         <th>��������</th>
                 *         <th>һ������</th>
                 *         <th>��������</th>
                 *         <th>��������</th>
                 *         <th>�Ƿ��¼</th>
                 *         <th>��������</th>
                 *     </tr>
                 *     <tr>
                 *         <td>�Ƿ�OFF���</td>
                 *         <td>isoff</td>
                 *         <td>-</td>
                 *         <td>Boolean</td>
                 *         <td>��</td>
                 *         <td>˵�������ܵ�ֵ false: ��off�� ��true: off��</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�ڼ������Ƽ���</td>
                 *         <td>holidaynameset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;String&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ������Ƽ��ϣ����磺{"�Ͷ���","�����"}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>�ڼ���id����</td>
                 *         <td>holidayidset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;Long&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ���id���ϣ����磺{1410170658523971584L}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>������������</td>
                 *         <td>dateattributename</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���������������ƣ����磺������</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�������Ա���</td>
                 *         <td>dateattributecode</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵�����������Ա��룬���磺DS-0002 ���������������˵��</td>
                 *     </tr>
                 *     <tr>
                 *         <td>���id</td>
                 *         <td>shiftid</td>
                 *         <td>-</td>
                 *         <td>Long</td>
                 *         <td>��</td>
                 *         <td>˵���������ڶ�Ӧ�İ�ΰ汾id</td>
                 *     </tr>
                 * </table>
                 * �ر�˵������������Ϊö�����ͣ�id,���룬���ƣ������ܵ�ֵ������3��<br/>
                 * 1: OFFDAY(1220227289099276288L,"DS-0002", "��Ϣ��")<br/>
                 * 2: HOLIDAY(1220227377297100800L,"DS-0003", "�ڼ���")<br/>
                 * 3: WORKDAY(1220227453272723456L,"DS-0001", "������")<br/>
                 */
                queryRosterDataByFileId(attFileBoId:long,startDate:Date,endDate:Date):$.java.util.Map;
                /**
                 * ����ѯָ�����ڵ�������Ա�Ű��
                 *
                 * @param attFileBoIds ���ڵ���ids
                 * @param startDate  ��ʼ���� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @param endDate   �������� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @return ��������ΪMap
                 * ����ֵ˵����<br/>
                 * key: ����boid �磺1410170658523971584L <br/>
                 * value: Map<String, Map<String, Object>> �ɲο�����<br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21"<br/>
                 * value: Map<String, Object><br/>
                 * Map<String, Map<String, Object>> <br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21" <br/>
                 * value: Map<String, Object> ���ݸ�ʽ���£�<br/>
                 * <table>
                 *     <tr>
                 *         <th>��������</th>
                 *         <th>һ������</th>
                 *         <th>��������</th>
                 *         <th>��������</th>
                 *         <th>�Ƿ��¼</th>
                 *         <th>��������</th>
                 *     </tr>
                 *     <tr>
                 *         <td>�Ƿ�OFF���</td>
                 *         <td>isoff</td>
                 *         <td>-</td>
                 *         <td>Boolean</td>
                 *         <td>��</td>
                 *         <td>˵�������ܵ�ֵ false: ��off�� ��true: off��</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�ڼ������Ƽ���</td>
                 *         <td>holidaynameset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;String&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ������Ƽ��ϣ����磺{"�Ͷ���","�����"}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>�ڼ���id����</td>
                 *         <td>holidayidset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;Long&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ���id���ϣ����磺{1410170658523971584L}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>������������</td>
                 *         <td>dateattributename</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���������������ƣ����磺������</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�������Ա���</td>
                 *         <td>dateattributecode</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵�����������Ա��룬���磺DS-0002 ���������������˵��</td>
                 *     </tr>
                 *     <tr>
                 *         <td>���id</td>
                 *         <td>shiftid</td>
                 *         <td>-</td>
                 *         <td>Long</td>
                 *         <td>��</td>
                 *         <td>˵���������ڶ�Ӧ�İ�ΰ汾id</td>
                 *     </tr>
                 * </table>
                 * �ر�˵������������Ϊö�����ͣ�id,���룬���ƣ������ܵ�ֵ������3��<br/>
                 * 1: OFFDAY(1220227289099276288L,"DS-0002", "��Ϣ��")<br/>
                 * 2: HOLIDAY(1220227377297100800L,"DS-0003", "�ڼ���")<br/>
                 * 3: WORKDAY(1220227453272723456L,"DS-0001", "������")<br/>
                 */
                queryRosterDataByFileIds(attFileBoIds:$.java.util.List,startDate:Date,endDate:Date):$.java.util.Map;
                /**
                 * ����ѯָ��������Ա����Ա�Ű��
                 *
                 * @param personId ������id
                 * @param startDate  ��ʼ���� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @param endDate   �������� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @return ��������ΪMap
                 * ����ֵ˵����<br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21"<br/>
                 * value: Map<String, Object><br/>
                 * <table>
                 *     <tr>
                 *         <th>��������</th>
                 *         <th>һ������</th>
                 *         <th>��������</th>
                 *         <th>��������</th>
                 *         <th>�Ƿ��¼</th>
                 *         <th>��������</th>
                 *     </tr>
                 *     <tr>
                 *         <td>�Ƿ�OFF���</td>
                 *         <td>isoff</td>
                 *         <td>-</td>
                 *         <td>Boolean</td>
                 *         <td>��</td>
                 *         <td>˵�������ܵ�ֵ false: ��off�� ��true: off��</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�ڼ������Ƽ���</td>
                 *         <td>holidaynameset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;String&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ������Ƽ��ϣ����磺{"�Ͷ���","�����"}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>�ڼ���id����</td>
                 *         <td>holidayidset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;Long&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ���id���ϣ����磺{1410170658523971584L}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>������������</td>
                 *         <td>dateattributename</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���������������ƣ����磺������</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�������Ա���</td>
                 *         <td>dateattributecode</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���� �������Ա��룬���������������˵��</td>
                 *     </tr>
                 *     <tr>
                 *         <td>���id</td>
                 *         <td>shiftid</td>
                 *         <td>-</td>
                 *         <td>Long</td>
                 *         <td>��</td>
                 *         <td>˵���������ڶ�Ӧ�İ�ΰ汾id</td>
                 *     </tr>
                 * </table>
                 * �ر�˵������������Ϊö�����ͣ�id,���룬���ƣ������ܵ�ֵ������3��<br/>
                 * 1: OFFDAY(1220227289099276288L,"DS-0002", "��Ϣ��")<br/>
                 * 2: HOLIDAY(1220227377297100800L,"DS-0003", "�ڼ���")<br/>
                 * 3: WORKDAY(1220227453272723456L,"DS-0001", "������")<br/>
                 */
                queryRosterDataByPersonId(personId:long,startDate:Date,endDate:Date):$.java.util.Map;
                /**
                 * ����ѯָ��������Ա����Ա�Ű��
                 *
                 * @param personIds ������id
                 * @param startDate  ��ʼ���� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @param endDate   �������� ��ʽ��yyyy-MM-dd  �磺2023-01-01 ������Ϊ��
                 * @return ��������ΪMap
                 * ����ֵ˵����<br/>
                 * key: ����boid �磺1410170658523971584L <br/>
                 * value: Map<String, Map<String, Object>> �ɲο�����<br/>
                 * key:  ���ڣ�yyyy-MM-dd  �磺"2022-05-21"<br/>
                 * value: Map<String, Object><br/>
                 * <table>
                 *     <tr>
                 *         <th>��������</th>
                 *         <th>һ������</th>
                 *         <th>��������</th>
                 *         <th>��������</th>
                 *         <th>�Ƿ��¼</th>
                 *         <th>��������</th>
                 *     </tr>
                 *     <tr>
                 *         <td>�Ƿ�OFF���</td>
                 *         <td>isoff</td>
                 *         <td>-</td>
                 *         <td>Boolean</td>
                 *         <td>��</td>
                 *         <td>˵�������ܵ�ֵ false: ��off�� ��true: off��</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�ڼ������Ƽ���</td>
                 *         <td>holidaynameset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;String&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ������Ƽ��ϣ����磺{"�Ͷ���","�����"}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>�ڼ���id����</td>
                 *         <td>holidayidset</td>
                 *         <td>-</td>
                 *         <td>Set&lt;Long&gt;����</td>
                 *         <td>��</td>
                 *         <td>˵�����ڼ���id���ϣ����磺{1410170658523971584L}</td>
                 *     </tr>
                 *     <tr>
                 *         <td>������������</td>
                 *         <td>dateattributename</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���������������ƣ����磺������</td>
                 *     </tr>
                 *      <tr>
                 *         <td>�������Ա���</td>
                 *         <td>dateattributecode</td>
                 *         <td>-</td>
                 *         <td>String</td>
                 *         <td>��</td>
                 *         <td>˵���� �������Ա��룬���������������˵��</td>
                 *     </tr>
                 *     <tr>
                 *         <td>���id</td>
                 *         <td>shiftid</td>
                 *         <td>-</td>
                 *         <td>Long</td>
                 *         <td>��</td>
                 *         <td>˵���������ڶ�Ӧ�İ�ΰ汾id</td>
                 *     </tr>
                 * </table>
                 * �ر�˵������������Ϊö�����ͣ�id,���룬���ƣ������ܵ�ֵ������3��<br/>
                 * 1: OFFDAY(1220227289099276288L,"DS-0002", "��Ϣ��")<br/>
                 * 2: HOLIDAY(1220227377297100800L,"DS-0003", "�ڼ���")<br/>
                 * 3: WORKDAY(1220227453272723456L,"DS-0001", "������")<br/>
                 */
                queryRosterDataByPersonIds(personIds:$.java.util.List,startDate:Date,endDate:Date):$.java.util.Map;
            }
            interface WTSRosterHelper_C extends WTSRosterHelper_S {
                new():WTSRosterHelper;
            }
            interface WTSRosterHelper$ {
            }
            type WTSRosterHelper_T = WTSRosterHelper_S & WTSRosterHelper$;
            interface WTSRosterHelper extends WTSRosterHelper_T {
            }
            interface OnRosterValidatorEvent_S {
            }
            interface OnRosterValidatorEvent_C extends OnRosterValidatorEvent_S {
                new():OnRosterValidatorEvent;
            }
            interface OnRosterValidatorEvent$ {
                getAlreadyExistPersonRosterData():$.kd.bos.dataentity.entity.DynamicObject[];
                getDynamicObjectList():$.java.util.Collection;
                getFileAndRosterDateWithShiftVid():$.java.util.Map;
                getOperateType():string;
                getOriginalRosterData():$.java.util.List;
                getResult():$.java.util.Map;
                getRosterLogId():long;
                setAlreadyExistPersonRosterData(alreadyExistPersonRosterData:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setDynamicObjectList(dynamicObjectList:$.java.util.Collection):void;
                setFileAndRosterDateWithShiftVid(fileAndRosterDateWithShiftVid:$.java.util.Map):void;
                setOperateType(operateType:string):void;
                setOriginalRosterData(originalRosterData:$.java.util.List):void;
                setResult(result:$.java.util.Map):void;
                setRosterLogId(rosterLogId:long):void;
            }
            type OnRosterValidatorEvent_T = OnRosterValidatorEvent_S & OnRosterValidatorEvent$;
            interface OnRosterValidatorEvent extends OnRosterValidatorEvent_T {
            }
            interface RosterValidatorExtPlugin_S {
                readonly FIELD_ATTFILEBASE:string;
                readonly FIELD_ID:string;
                readonly FIELD_ROSTERDATE:string;
            }
            interface RosterValidatorExtPlugin$ {
                /**
                 * �Ű�У����չ�ӿ�
                 * <p>ʾ��������Բο��Ű�У����չ��������չ�������룺kd.sdk.wtc.wts.business.roster.RosterValidatorExtPlugin</p>
                 *
                 * @param event �Ű�У���¼�
                 */
                onValidate(event:OnRosterValidatorEvent):void;
            }
            type RosterValidatorExtPlugin_T = RosterValidatorExtPlugin_S & RosterValidatorExtPlugin$;
            interface RosterValidatorExtPlugin extends RosterValidatorExtPlugin_T {
            }
            interface RosterValidatorExt_S {
                readonly ACTUAL:string;
                readonly PLAN:string;
            }
            interface RosterValidatorExt$ {
                /**
                 * �Ű�У����չ�ӿ�
                 *
                 * @param attFileBoIds ����boid����
                 * @param startDate ��ʼ����
                 * @param endDate ��������
                 * @return ��������ΪMap
                 * ����ֵ˵����<br/>
                 * key:  ����boid ����ΪLong �磺1575282784384182272L <br/>
                 * value: У��ʧ����Ϣ ����ΪMap ��ʽ����<br/>
                 *     key:  ���ڣ�yyyy-MM-dd  ����String �磺"2023-10-01" <br/>
                 *     value: ����ΪMap ��ʽ���£�
                 *         key�� ����ΪString �ɴ���ֵ����plan��,"actual"
                 *         value: ����ΪString ������Ϣ �磺�������ѷ�棬�����Űࡣ��
                 * ���磺
                 * {
                 * "1575282784384182272":{
                 *      "2022-08-31":{
                 * 		    "actual":"�����ѷ�棬�����Űࡣ",
                 * 		    "plan":"�����ѷ�棬�����Űࡣ"
                 *        }
                 *    }
                 * }
                 */
                onValidate(attFileBoIds:$.java.util.Collection,startDate:Date,endDate:Date):$.java.util.Map;
            }
            type RosterValidatorExt_T = RosterValidatorExt_S & RosterValidatorExt$;
            interface RosterValidatorExt extends RosterValidatorExt_T {
            }
        }
        namespace kd.sdk.wtc.wtss{
            interface SdkWtcWtssModule_S {
            }
            type SdkWtcWtssModule_ST = $.kd.sdk.module.Module & SdkWtcWtssModule_S;
            interface SdkWtcWtssModule_C extends SdkWtcWtssModule_ST {
                new():SdkWtcWtssModule;
            }
            interface SdkWtcWtssModule$ {
            }
            type SdkWtcWtssModule_T = $.kd.sdk.module.Module & SdkWtcWtssModule_S & SdkWtcWtssModule$;
            interface SdkWtcWtssModule extends SdkWtcWtssModule_T {
            }
        }
        namespace kd.sdk.wtc.wtss.business.homepage{
            interface BeforeShowApplyPageEvent_S {
            }
            interface BeforeShowApplyPageEvent_C extends BeforeShowApplyPageEvent_S {
                /**
                 * �򿪵�������ҳ���¼�������
                 *
                 * @param billType          ��������
                 * @param applyType         ��������
                 * @param formShowParameter ������
                 */
                new(billType:kd.sdk.wtc.wtbs.common.enums.WTCBillType,applyType:kd.sdk.wtc.wtbs.common.enums.WTCApplyType,formShowParameter:$.kd.bos.form.FormShowParameter):BeforeShowApplyPageEvent;
            }
            interface BeforeShowApplyPageEvent$ {
                /**
                 * ��ȡ��������
                 */
                getApplyType():kd.sdk.wtc.wtbs.common.enums.WTCApplyType;
                /**
                 * ��ȡ��������
                 */
                getBillType():kd.sdk.wtc.wtbs.common.enums.WTCBillType;
                /**
                 * ��ȡ������
                 *
                 * @return ������
                 */
                getFormShowParameter():$.kd.bos.form.FormShowParameter;
            }
            type BeforeShowApplyPageEvent_T = BeforeShowApplyPageEvent_S & BeforeShowApplyPageEvent$;
            interface BeforeShowApplyPageEvent extends BeforeShowApplyPageEvent_T {
            }
            interface ISignAddressReplacePlugin_S {
            }
            interface ISignAddressReplacePlugin$ {
                /**
                 * ѡ���ҵļ��ڡ�(PC�ˡ��ƶ���)�������ʱչʾ�ġ����ڵص㡿ʹ�õ���չ�ֶΣ�����չ�ֶλ���Ϊ���ڵص�չʾ
                 *
                 * @param event
                 */
                replaceSignAddress?(event:SignAddressChooseEvent):void;
            }
            type ISignAddressReplacePlugin_T = ISignAddressReplacePlugin_S & ISignAddressReplacePlugin$;
            interface ISignAddressReplacePlugin extends ISignAddressReplacePlugin_T {
            }
            interface BillReplaceExtPlugin_S {
            }
            interface BillReplaceExtPlugin$ {
                /**
                 * PC�˻��ƶ��˴򿪵�������ʱ�������¼�
                 * <p>
                 * ����ͨ�� {@link BeforeShowApplyPageEvent#getFormShowParameter()} ���ô��滻ҳ������Ҫ�Ĳ�����
                 *
                 * @param event �������������滻��չ�¼�
                 */
                beforeShowApplyPage?(event:BeforeShowApplyPageEvent):void;
                /**
                 * PC�˻��ƶ��˴򿪵�������ʱ�������¼�
                 * <p>
                 * ����ͨ�� {@link BeforeShowApplyPageEvent#getFormShowParameter()} ���ô��滻ҳ������Ҫ�Ĳ�����
                 *
                 * @param event �������������滻��չ�¼�
                 */
                beforeShowDetailPage?(event:BeforeShowDetailPageEvent):void;
                /**
                 * �ƶ��˴򿪵�������ѡ�����ʱ�������¼�
                 * <p>
                 * ����ͨ�� {@link OnFilterMobileBillListEvent#setBillTypeRights(Map)} ���ô�ɸѡ���ʱ���õĵ�������
                 *
                 * @param event �������������滻��չ�¼�
                 */
                onFilterMobileBillList?(event:OnFilterMobileBillListEvent):void;
                /**
                 * �ƶ��˵����б��ѯ��չ�ӿ�
                 *
                 * @param event �����б��ѯ�¼�
                 */
                onQueryMobileBillList?(event:OnQueryMobileBillListEvent):void;
            }
            type BillReplaceExtPlugin_T = BillReplaceExtPlugin_S & BillReplaceExtPlugin$;
            interface BillReplaceExtPlugin extends BillReplaceExtPlugin_T {
            }
            interface MobileBillListDto_S {
            }
            interface MobileBillListDto_C extends MobileBillListDto_S {
                new():MobileBillListDto;
            }
            interface MobileBillListDto$ {
                getApplyType():string;
                getBillStatus():string;
                getCreatorId():long;
                getCreatorName():string;
                getEndDate():Date;
                getId():long;
                getModifyTime():Date;
                getPersonId():long;
                getPersonName():string;
                getStartDate():Date;
                getSubmitDate():Date;
                setApplyType(applyType:string):void;
                setBillStatus(billStatus:string):void;
                setCreatorId(creatorId:long):void;
                setCreatorName(creatorName:string):void;
                setEndDate(endDate:Date):void;
                setId(id:long):void;
                setModifyTime(modifyTime:Date):void;
                setPersonId(personId:long):void;
                setPersonName(personName:string):void;
                setStartDate(startDate:Date):void;
                setSubmitDate(submitDate:Date):void;
            }
            type MobileBillListDto_T = MobileBillListDto_S & MobileBillListDto$;
            interface MobileBillListDto extends MobileBillListDto_T {
            }
            interface WtssHomepageServiceHelper_S {
                /**
                 * ��ȡ����ϸ������Ŀ�е��쳣���ͣ����ڶ���ʱ���ϲ�����
                 *
                 * @param mobileSchemeId ���ڷ���id
                 * @param workspace      A-���ˣ��ֽ�֧��A��
                 * @return �쳣���������б�
                 */
                getAbnormalConfig(mobileSchemeId:long,workspace:string):$.java.util.Set;
            }
            interface WtssHomepageServiceHelper_C extends WtssHomepageServiceHelper_S {
                new():WtssHomepageServiceHelper;
            }
            interface WtssHomepageServiceHelper$ {
            }
            type WtssHomepageServiceHelper_T = WtssHomepageServiceHelper_S & WtssHomepageServiceHelper$;
            interface WtssHomepageServiceHelper extends WtssHomepageServiceHelper_T {
            }
            interface OnFilterMobileBillListEvent_S {
            }
            interface OnFilterMobileBillListEvent_C extends OnFilterMobileBillListEvent_S {
                new():OnFilterMobileBillListEvent;
            }
            interface OnFilterMobileBillListEvent$ {
                /**
                 * �����Ƿ���Ȩ�޲鿴��Ӧ�ĵ�������
                 */
                getBillTypeRights():$.java.util.Map;
                /**
                 * �����Ƿ���Ȩ�޲鿴��Ӧ�ĵ�������
                 */
                setBillTypeRights(billTypeRights:$.java.util.Map):void;
            }
            type OnFilterMobileBillListEvent_T = OnFilterMobileBillListEvent_S & OnFilterMobileBillListEvent$;
            interface OnFilterMobileBillListEvent extends OnFilterMobileBillListEvent_T {
            }
            interface OnQueryMobileBillListEvent_S {
            }
            interface OnQueryMobileBillListEvent_C extends OnQueryMobileBillListEvent_S {
                new():OnQueryMobileBillListEvent;
            }
            interface OnQueryMobileBillListEvent$ {
                /**
                 * ��ǰӦ��ID���������ڿ�Ȩ
                 */
                getAppId():string;
                getAttPersonId():long;
                /**
                 * ��ѯ�ĵ���ʵ��
                 */
                getBillData():MobileBillListDto[];
                getBillType():kd.sdk.wtc.wtbs.common.enums.WTCBillType;
                getOrgId():long;
                /**
                 * ҳ��С
                 */
                getPageSize():number;
                /**
                 * ҳ��ʼ
                 */
                getPageStart():number;
                /**
                 * ������չ��ѯ���ܼ�¼����Ĭ��ֵΪ-1
                 * <p>
                 * �������-1��ʾû����ȷִ�ж�����չ�ӿڣ�ϵͳ��ִ�б�Ʒ��ѯ
                 */
                getRowCount():number;
                /**
                 * �û������ĵ���״̬�����б�
                 */
                getSearchBillStatus():$.java.util.List;
                /**
                 * �û������Ľ�������
                 */
                getSearchEndDate():Date;
                /**
                 * �û����������������
                 */
                getSearchPersonName():string;
                /**
                 * �û������Ŀ�ʼ����
                 */
                getSearchStartDate():Date;
                getUserId():long;
                isOnlyCount():boolean;
                /**
                 * ���÷�ҳ��ѯ���ĵ�����Ϣ��������չ��Ҫ���ø÷���
                 *
                 * @param billData ��ҳ��ѯ���ĵ�����Ϣ
                 */
                setBillData(billData:MobileBillListDto[]):void;
                /**
                 * ���ò�ѯ���ܼ�¼����������չ��Ҫ���ø÷���
                 *
                 * @param rowCount ��ѯ���ܼ�¼��
                 */
                setRowCount(rowCount:number):void;
            }
            type OnQueryMobileBillListEvent_T = OnQueryMobileBillListEvent_S & OnQueryMobileBillListEvent$;
            interface OnQueryMobileBillListEvent extends OnQueryMobileBillListEvent_T {
            }
            interface BeforeChooseApplyTypeEvent_S {
            }
            interface BeforeChooseApplyTypeEvent_C extends BeforeChooseApplyTypeEvent_S {
                new(billType:kd.sdk.wtc.wtbs.common.enums.WTCBillType):BeforeChooseApplyTypeEvent;
            }
            interface BeforeChooseApplyTypeEvent$ {
                /**
                 * ��ȡ��������
                 */
                getBillType():kd.sdk.wtc.wtbs.common.enums.WTCBillType;
                /**
                 * ��ȡ�����������ʱ�Ƿ�չʾѡ�����
                 */
                getShowChoices():boolean;
                /**
                 * ���õ����������ʱ�Ƿ�չʾѡ�����
                 */
                setShowChoices(showChoices:boolean):void;
            }
            type BeforeChooseApplyTypeEvent_T = BeforeChooseApplyTypeEvent_S & BeforeChooseApplyTypeEvent$;
            interface BeforeChooseApplyTypeEvent extends BeforeChooseApplyTypeEvent_T {
            }
            enum SignAddressChooseEvent$ChoosePreSetBiz {
                PRESETBIZ1,
                PRESETBIZ2
            }
            interface BeforeShowDetailPageEvent_S {
            }
            type BeforeShowDetailPageEvent_ST = BeforeShowApplyPageEvent_S & BeforeShowDetailPageEvent_S;
            interface BeforeShowDetailPageEvent_C extends BeforeShowDetailPageEvent_ST {
                /**
                 * �򿪵�������ҳ���¼�������
                 *
                 * @param billType          ��������
                 * @param applyType         ��������
                 * @param formShowParameter ������
                 */
                new(billType:kd.sdk.wtc.wtbs.common.enums.WTCBillType,applyType:kd.sdk.wtc.wtbs.common.enums.WTCApplyType,formShowParameter:$.kd.bos.form.FormShowParameter):BeforeShowDetailPageEvent;
            }
            interface BeforeShowDetailPageEvent$ {
            }
            type BeforeShowDetailPageEvent_T = BeforeShowApplyPageEvent & BeforeShowDetailPageEvent_S & BeforeShowDetailPageEvent$;
            interface BeforeShowDetailPageEvent extends BeforeShowDetailPageEvent_T {
            }
            interface SignAddressChooseEvent_S {
            }
            interface SignAddressChooseEvent_C extends SignAddressChooseEvent_S {
                new():SignAddressChooseEvent;
            }
            interface SignAddressChooseEvent$ {
                getUseColumn():SignAddressChooseEvent$ChoosePreSetBiz;
                setUseColumn(useColumn:SignAddressChooseEvent$ChoosePreSetBiz):void;
            }
            type SignAddressChooseEvent_T = SignAddressChooseEvent_S & SignAddressChooseEvent$;
            interface SignAddressChooseEvent extends SignAddressChooseEvent_T {
            }
        }
        namespace kd.sdk.wtc.wtss.business.spi.homepage{
            interface WtssHomepageService_S {
                /**
                 * ��ȡSchemaServiceSpi��ʾ������
                 * @return SchemaServiceSpi��ʵ������
                 */
                get():WtssHomepageService;
            }
            interface WtssHomepageService$ {
                /**
                 * ��ȡ����ϸ������Ŀ�е��쳣���ͣ����ڶ���ʱ���ϲ�����
                 *
                 * @param mobileSchemeId ���ڷ���id
                 * @param workspace      A-����  B-����
                 * @return �쳣���������б�
                 */
                getAbnormalConfig(mobileSchemeId:long,workspace:string):$.java.util.Set;
            }
            type WtssHomepageService_T = WtssHomepageService_S & WtssHomepageService$;
            interface WtssHomepageService extends WtssHomepageService_T {
            }
        }
        namespace kd.sdk.wtc.wtss.business.teamhome{
            interface AttStatisticTargetQueryParam_S {
            }
            interface AttStatisticTargetQueryParam_C extends AttStatisticTargetQueryParam_S {
                new():AttStatisticTargetQueryParam;
            }
            interface AttStatisticTargetQueryParam$ {
                /**
                 * ��ȡ�ҿ�������֯id
                 *
                 * @return ����������֯id
                 */
                getAffiliateAdminOrgId():long;
                /**
                 * ��ȡ����Map<����boId,������id>
                 */
                getAttFileMap():$.java.util.Map;
                /**
                 * ��ȡ�����汾id����
                 *
                 * @return ���ص����汾id����
                 */
                getFileVidSet():$.java.util.Set;
                /**
                 * ��ȡ�ڼ伯��
                 */
                getPeriodEntrySet():$.java.util.Set;
                /**
                 * ��ȡ��ѯĳ��
                 */
                getQueryDate():Date;
                /**
                 * ��ȡ��ѯ��Χ����
                 */
                getQueryEndDate():Date;
                /**
                 * ��ȡ��ѯ��Χ��ʼ
                 */
                getQueryStartDate():Date;
                /**
                 * ����������֯id
                 *
                 * @param affiliateAdminOrgId ������֯id
                 */
                setAffiliateAdminOrgId(affiliateAdminOrgId:long):void;
                /**
                 * ���õ���Map<����boId,������id>
                 */
                setAttFileMap(attFileMap:$.java.util.Map):void;
                /**
                 * ���õ����汾id����
                 *
                 * @param fileVidSet �����汾id����
                 */
                setFileVidSet(fileVidSet:$.java.util.Set):void;
                /**
                 * �����ڼ伯��
                 */
                setPeriodEntrySet(periodEntrySet:$.java.util.Set):void;
                /**
                 * ���ò�ѯĳ��
                 */
                setQueryDate(queryDate:Date):void;
                /**
                 * ���ò�ѯ��Χ����
                 */
                setQueryEndDate(queryEndDate:Date):void;
                /**
                 * ���ò�ѯ��Χ��ʼ
                 */
                setQueryStartDate(queryStartDate:Date):void;
                /**
                 * ��ȡ����boId SET
                 */
                thenAttFileSet():$.java.util.Set;
            }
            type AttStatisticTargetQueryParam_T = AttStatisticTargetQueryParam_S & AttStatisticTargetQueryParam$;
            interface AttStatisticTargetQueryParam extends AttStatisticTargetQueryParam_T {
            }
            interface AfterInitAttStatisticAdminOrgEvent_S {
            }
            interface AfterInitAttStatisticAdminOrgEvent_C extends AfterInitAttStatisticAdminOrgEvent_S {
                new():AfterInitAttStatisticAdminOrgEvent;
            }
            interface AfterInitAttStatisticAdminOrgEvent$ {
                /**
                 * ��ȡ��ʼ���Ŀ�ѡ���ѯ��������֯����
                 *
                 * @return Collection<AttStatisticAdminOrgParam>
                 */
                getAttStatisticAdminOrgParams():$.java.util.Collection;
                /**
                 * ��ȡ��ǰ��¼�˵���Ȼ��id
                 *
                 * @return currentPersonId
                 */
                getCurrentPersonId():long;
                /**
                 * ���ó�ʼ���Ŀ�ѡ���ѯ��������֯����
                 *
                 * @param attStatisticAdminOrgParams ��ʼ���Ŀ�ѡ���ѯ��������֯����
                 */
                setAttStatisticAdminOrgParams(attStatisticAdminOrgParams:$.java.util.Collection):void;
                /**
                 * ���õ�ǰ��¼�˵���Ȼ��id
                 *
                 * @param currentPersonId ǰ��¼�˵���Ȼ��id
                 */
                setCurrentPersonId(currentPersonId:long):void;
            }
            type AfterInitAttStatisticAdminOrgEvent_T = AfterInitAttStatisticAdminOrgEvent_S & AfterInitAttStatisticAdminOrgEvent$;
            interface AfterInitAttStatisticAdminOrgEvent extends AfterInitAttStatisticAdminOrgEvent_T {
            }
            interface AttStatisticQueryExtPlugin_S {
            }
            interface AttStatisticQueryExtPlugin$ {
                /**
                 * �ŶӼ��ڳ�ʼ���ɲ�ѯ��������֯���÷���
                 * <p>
                 * �������ŶӼ��ڿɲ�ѯ��������֯��ʼ���󣬵����ɲ�ѯ��������֯
                 *
                 * @param attStatisticAdminOrgEvent �ŶӼ��ڳ�ʼ���ɲ�ѯ��������֯����
                 */
                afterInitAdminOrg?(attStatisticAdminOrgEvent:AfterInitAttStatisticAdminOrgEvent):void;
                /**
                 * �ŶӼ��ڲ�ѯͳ��ǰ���¼�
                 * <p>
                 * �ŶӼ��ڲ�ѯͳ��ǰ������Ҫͳ�ƵĿ��ڵ����汾
                 *
                 * @param beforeQueryAttStatisticEvent �ŶӼ��ڲ�ѯͳ�Ʋ���
                 */
                beforeAttStatistic?(beforeQueryAttStatisticEvent:BeforeQueryAttStatisticEvent):void;
            }
            type AttStatisticQueryExtPlugin_T = AttStatisticQueryExtPlugin_S & AttStatisticQueryExtPlugin$;
            interface AttStatisticQueryExtPlugin extends AttStatisticQueryExtPlugin_T {
            }
            interface AttStatisticAdminOrgParam_S {
            }
            interface AttStatisticAdminOrgParam_C extends AttStatisticAdminOrgParam_S {
                new():AttStatisticAdminOrgParam;
            }
            interface AttStatisticAdminOrgParam$ {
                /**
                 * ��ȡ������֯id
                 *
                 * @return id
                 */
                getBoId():long;
                /**
                 * ��ȡ������֯�ɲ�ѯ�Ľ���ʱ��
                 *
                 * @return LocalDate
                 */
                getEndDate():$.java.time.LocalDate;
                /**
                 * ��ȡ������֯�ɲ�ѯ�Ŀ�ʼʱ��
                 *
                 * @return LocalDate
                 */
                getStartDate():$.java.time.LocalDate;
                /**
                 * ����������֯id
                 *
                 * @param boId ������֯id
                 */
                setBoId(boId:long):void;
                /**
                 * ����������֯�ɲ�ѯ�Ľ���ʱ��
                 *
                 * @param endDate ������֯�ɲ�ѯ�Ľ���ʱ��
                 */
                setEndDate(endDate:$.java.time.LocalDate):void;
                /**
                 * ����������֯�ɲ�ѯ�Ŀ�ʼʱ��
                 *
                 * @param startDate ����֯�ɲ�ѯ�Ŀ�ʼʱ��
                 */
                setStartDate(startDate:$.java.time.LocalDate):void;
            }
            type AttStatisticAdminOrgParam_T = AttStatisticAdminOrgParam_S & AttStatisticAdminOrgParam$;
            interface AttStatisticAdminOrgParam extends AttStatisticAdminOrgParam_T {
            }
            interface BeforeQueryAttStatisticEvent_S {
            }
            interface BeforeQueryAttStatisticEvent_C extends BeforeQueryAttStatisticEvent_S {
                new():BeforeQueryAttStatisticEvent;
            }
            interface BeforeQueryAttStatisticEvent$ {
                /**
                 * ��ȡ��ͳ�ƵĿ��ڵ����汾����
                 *
                 * @return Collection<AttFileVersion>
                 */
                getAttFileVersions():$.java.util.Collection;
                /**
                 * ��ȡ��ǰ��¼�˵���Ȼ��id
                 *
                 * @return long
                 */
                getCurrentPersonId():long;
                /**
                 * ���ô�ͳ�ƵĿ��ڵ����汾����
                 *
                 * @param attFileVersions ��ͳ�ƵĿ��ڵ����汾����
                 */
                setAttFileVersions(attFileVersions:$.java.util.Collection):void;
                /**
                 * ���õ�ǰ��¼�˵���Ȼ��id
                 * @param currentPersonId ��ǰ��¼�˵���Ȼ��id
                 */
                setCurrentPersonId(currentPersonId:long):void;
            }
            type BeforeQueryAttStatisticEvent_T = BeforeQueryAttStatisticEvent_S & BeforeQueryAttStatisticEvent$;
            interface BeforeQueryAttStatisticEvent extends BeforeQueryAttStatisticEvent_T {
            }
            interface AttTargetQueryExpandService_S {
            }
            interface AttTargetQueryExpandService$ {
                /**
                 * @param queryParam ָ���ѯ����
                 * @param kpiId      ָ��id
                 * @return Map<Long, Double>  �������� "header": List<Map<String, String>>��Ӧ���У� "body": Map<String, List<Map<String, String>>>  ��Ӧ������
                 */
                getDetailMap(queryParam:AttStatisticTargetQueryParam,kpiId:long):$.java.util.Map;
                /**
                 * @param queryParam ָ���ѯ����
                 * @param kpiId      ָ��id
                 * @return Map<Long, Double>  key ����boId��value ͳ��ֵ
                 */
                getTargetChartData(queryParam:AttStatisticTargetQueryParam,kpiId:long):$.java.util.Map;
                /**
                 * @param queryParam ָ���ѯ����
                 * @param kpiId      ָ��id
                 * @return Pair<String, String>  key ͳ��ֵ��value ͳ�Ƶ�λ
                 */
                getTargetStatisticsData(queryParam:AttStatisticTargetQueryParam,kpiId:long):kd.bos.util.Pair;
            }
            type AttTargetQueryExpandService_T = AttTargetQueryExpandService_S & AttTargetQueryExpandService$;
            interface AttTargetQueryExpandService extends AttTargetQueryExpandService_T {
            }
        }
        namespace kd.sdk.wtc.wtte{
            interface SdkWtcWtteModule_S {
            }
            type SdkWtcWtteModule_ST = $.kd.sdk.module.Module & SdkWtcWtteModule_S;
            interface SdkWtcWtteModule_C extends SdkWtcWtteModule_ST {
                new():SdkWtcWtteModule;
            }
            interface SdkWtcWtteModule$ {
            }
            type SdkWtcWtteModule_T = $.kd.sdk.module.Module & SdkWtcWtteModule_S & SdkWtcWtteModule$;
            interface SdkWtcWtteModule extends SdkWtcWtteModule_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business{
            interface WTTEServiceHelper_S {
                /**
                 * �����ڽ�������
                 * �������˷���֧�ְ��ڼ������㣬����ʱ��Ҫָ���������͡������ڼ�Ϳ��ڵ������ҿ�������֯������������ǹҿ�������֯ʱ����ͨ���ҿ�������֯��ѯ���ڵ���
                 *      �˷����������ֲ�ʽ���񣬴�������ɹ���ͻ᷵�ؽ���������Ҫ������ִ�к���ҵ������ʹ�÷ֲ�ʽ��������
                 *
                 * @param attSettleTaskReq �����ں�������
                 * @return ���ڽ��㷢����Ӧ���
                 */
                dispatchAttSettleTask(attSettleTaskReq:kd.sdk.wtc.wtte.business.settle.AttSettleTaskReq):kd.sdk.wtc.wtte.business.settle.AttSettleTaskResp;
            }
            interface WTTEServiceHelper_C extends WTTEServiceHelper_S {
                new():WTTEServiceHelper;
            }
            interface WTTEServiceHelper$ {
            }
            type WTTEServiceHelper_T = WTTEServiceHelper_S & WTTEServiceHelper$;
            interface WTTEServiceHelper extends WTTEServiceHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.attrecord{
            interface WTTEAttRecordHelper_S {
                /**
                 * ��ѯ��������Ա�Ŀ�����Ŀ�����ڼ����ֵ���ӿ���ֵʱ���ؿ�Map
                 *
                 * @param perAttPeriodId �����ڼ�id�����
                 * @param attItemSet     ������ĿboId���ϣ����
                 * @param attFileSet     ����boId List�����
                 * @return Map<����boId, Map < ������ĿboId �� ������Ŀͳ��ֵ>>
                 */
                getAttItemValueByPeriod(perAttPeriodId:long,attItemSet:$.java.util.Set,attFileSet:$.java.util.Set):$.java.util.Map;
            }
            interface WTTEAttRecordHelper_C extends WTTEAttRecordHelper_S {
                new():WTTEAttRecordHelper;
            }
            interface WTTEAttRecordHelper$ {
            }
            type WTTEAttRecordHelper_T = WTTEAttRecordHelper_S & WTTEAttRecordHelper$;
            interface WTTEAttRecordHelper extends WTTEAttRecordHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.attrecord.report{
            interface AttRecordDailyItemRptExtPlugin_S {
            }
            interface AttRecordDailyItemRptExtPlugin$ {
            }
            type AttRecordDailyItemRptExtPlugin_T = AttRecordRptExtPlugin & AttRecordDailyItemRptExtPlugin_S & AttRecordDailyItemRptExtPlugin$;
            interface AttRecordDailyItemRptExtPlugin extends AttRecordDailyItemRptExtPlugin_T {
            }
            interface AttRecordPeriodItemRptExtPlugin_S {
            }
            interface AttRecordPeriodItemRptExtPlugin$ {
            }
            type AttRecordPeriodItemRptExtPlugin_T = AttRecordRptExtPlugin & AttRecordPeriodItemRptExtPlugin_S & AttRecordPeriodItemRptExtPlugin$;
            interface AttRecordPeriodItemRptExtPlugin extends AttRecordPeriodItemRptExtPlugin_T {
            }
            interface AttRecordDailyRptExtPlugin_S {
            }
            interface AttRecordDailyRptExtPlugin$ {
            }
            type AttRecordDailyRptExtPlugin_T = AttRecordRptExtPlugin & AttRecordDailyRptExtPlugin_S & AttRecordDailyRptExtPlugin$;
            interface AttRecordDailyRptExtPlugin extends AttRecordDailyRptExtPlugin_T {
            }
            interface OnGetBaseSortEvent_S {
            }
            interface OnGetBaseSortEvent_C extends OnGetBaseSortEvent_S {
                new(defBaseSort:string):OnGetBaseSortEvent;
            }
            interface OnGetBaseSortEvent$ {
                getDefBaseSort():string;
                /**
                 * �����Զ��������
                 *
                 * @param defBaseSort ����ʽ
                 */
                setDefBaseSort(defBaseSort:string):void;
            }
            type OnGetBaseSortEvent_T = OnGetBaseSortEvent_S & OnGetBaseSortEvent$;
            interface OnGetBaseSortEvent extends OnGetBaseSortEvent_T {
            }
            interface OnGetDetailQFiltersEvent_S {
            }
            interface OnGetDetailQFiltersEvent_C extends OnGetDetailQFiltersEvent_S {
                new(defaultDetailQFilterList:$.java.util.List,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam):OnGetDetailQFiltersEvent;
            }
            interface OnGetDetailQFiltersEvent$ {
                getDefaultDetailQFilterList():$.java.util.List;
                getReportQueryParam():$.kd.bos.entity.report.ReportQueryParam;
                setDefaultDetailQFilterList(defaultDetailQFilterList:$.java.util.List):void;
            }
            type OnGetDetailQFiltersEvent_T = OnGetDetailQFiltersEvent_S & OnGetDetailQFiltersEvent$;
            interface OnGetDetailQFiltersEvent extends OnGetDetailQFiltersEvent_T {
            }
            interface AttRecordRptExtPlugin_S {
            }
            interface AttRecordRptExtPlugin$ {
                getBaseSort?(ongetBaseSortEvent:OnGetBaseSortEvent):void;
                getDetailSort?(onGetDetailSortEvent:OnGetDetailSortEvent):void;
                onGetBaseQFilters?(onGetBaseQFiltersEvent:OnGetBaseQFiltersEvent):void;
                onGetDetailQFilters?(onGetDetailQFiltersEvent:OnGetDetailQFiltersEvent):void;
            }
            type AttRecordRptExtPlugin_T = AttRecordRptExtPlugin_S & AttRecordRptExtPlugin$;
            interface AttRecordRptExtPlugin extends AttRecordRptExtPlugin_T {
            }
            interface OnGetDetailSortEvent_S {
            }
            interface OnGetDetailSortEvent_C extends OnGetDetailSortEvent_S {
                new(defDetailSort:string):OnGetDetailSortEvent;
            }
            interface OnGetDetailSortEvent$ {
                getDefDetailSort():string;
                setDefDetailSort(defDetailSort:string):void;
            }
            type OnGetDetailSortEvent_T = OnGetDetailSortEvent_S & OnGetDetailSortEvent$;
            interface OnGetDetailSortEvent extends OnGetDetailSortEvent_T {
            }
            interface OnGetBaseQFiltersEvent_S {
            }
            interface OnGetBaseQFiltersEvent_C extends OnGetBaseQFiltersEvent_S {
                new(defaultBaseQFilterList:$.java.util.List,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam):OnGetBaseQFiltersEvent;
            }
            interface OnGetBaseQFiltersEvent$ {
                getDefaultBaseQFilterList():$.java.util.List;
                getReportQueryParam():$.kd.bos.entity.report.ReportQueryParam;
                setDefaultBaseQFilterList(defaultBaseQFilterList:$.java.util.List):void;
            }
            type OnGetBaseQFiltersEvent_T = OnGetBaseQFiltersEvent_S & OnGetBaseQFiltersEvent$;
            interface OnGetBaseQFiltersEvent extends OnGetBaseQFiltersEvent_T {
            }
            interface AttRecordPeriodRptExtPlugin_S {
            }
            interface AttRecordPeriodRptExtPlugin$ {
            }
            type AttRecordPeriodRptExtPlugin_T = AttRecordRptExtPlugin & AttRecordPeriodRptExtPlugin_S & AttRecordPeriodRptExtPlugin$;
            interface AttRecordPeriodRptExtPlugin extends AttRecordPeriodRptExtPlugin_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.exrecord{
            interface WTTEExRecordHelper_S {
                /**
                 * ��ȡ��Ա�ڶ�Ӧ�������ڵ�һ���쳣��Ϣ
                 *
                 * @param personId ������id
                 * @param dutyDay      �������� yyyy-MM-dd
                 * @param exRecordIds      �쳣����id����
                 * @return key: Ӧ�򿨵� punchcardPoint value 2022-10-01 08:00,2022-10-01 18:00
                 * <pre>
                 * key: �쳣���� exType value ����id  1320384650887095296
                 * {
                 * ����  1320384650887095296
                 * �絽  1320384483332989952
                 * ȱ��  1320384356908327936
                 * ����  1320384239123833856
                 * ����  1320384079815828480
                 * �ٵ�  1320383951981782016
                 * }
                 * key: �쳣����ʽ exProcess value 1452940499953387520,1452940383955717120
                 * {
                 * �ݼ�	1452940499953387520
                 * �Ӱ�	1452940383955717120
                 * ����	1452940620564793344
                 * ��ǩ 1452940872415971328
                 * }
                 * key: ����ʱ�� shiftCard value  8:00,12:00,14:00,18:00
                 * </pre>
                 */
                getAttExInfo(personId:long,dutyDay:$.java.time.LocalDate,exRecordIds:$.java.util.Set):$.java.util.List;
            }
            interface WTTEExRecordHelper_C extends WTTEExRecordHelper_S {
                new():WTTEExRecordHelper;
            }
            interface WTTEExRecordHelper$ {
            }
            type WTTEExRecordHelper_T = WTTEExRecordHelper_S & WTTEExRecordHelper$;
            interface WTTEExRecordHelper extends WTTEExRecordHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.qttask{
            interface QTTaskReq_S {
            }
            type QTTaskReq_ST = $.java.io.Serializable & QTTaskReq_S;
            interface QTTaskReq_C extends QTTaskReq_ST {
                new():QTTaskReq;
            }
            interface QTTaskReq$ {
                /**
                 * ��ȡ���ڵ���boid����
                 */
                getAttFileBoIds():$.java.util.Set;
                /**
                 * ��ȡ�����������
                 */
                getExpectEndDate():Date;
                /**
                 * ��ȡ���㿪ʼ����
                 */
                getExpectStartDate():Date;
                getPlanId():long;
                /**
                 * ��ȡ��������id����
                 */
                getQtTypeIds():$.java.util.Set;
                /**
                 * ��ȡ���ݼ���ĺ��㷽��id
                 */
                getTiePlanId():long;
                /**
                 * ��ȡ�Ƿ�洢���㲽��
                 */
                isSaveStep():boolean;
                /**
                 * ���ÿ��ڵ���boid����
                 */
                setAttFileBoIds(attFileBoIds:$.java.util.Set):void;
                /**
                 * ���ú����������
                 */
                setExpectEndDate(expectEndDate:Date):void;
                /**
                 * ���ú��㿪ʼ����
                 */
                setExpectStartDate(expectStartDate:Date):void;
                setPlanId(planId:long):void;
                /**
                 * ���ö�������id����
                 */
                setQtTypeIds(qtTypeIds:$.java.util.Set):void;
                /**
                 * �����Ƿ�洢���㲽��
                 */
                setSaveStep(saveStep:boolean):void;
                /**
                 * ���õ��ݼ���ĺ��㷽��id
                 */
                setTiePlanId(tiePlanId:long):void;
            }
            type QTTaskReq_T = $.java.io.Serializable & QTTaskReq_S & QTTaskReq$;
            interface QTTaskReq extends QTTaskReq_T {
            }
            interface QTTaskStartReq_S {
            }
            type QTTaskStartReq_ST = $.java.io.Serializable & QTTaskStartReq_S;
            interface QTTaskStartReq_C extends QTTaskStartReq_ST {
                new():QTTaskStartReq;
            }
            interface QTTaskStartReq$ {
                /**
                 * ��ȡ���ڵ���BOID���ϣ�����
                 */
                getAttFileBoIds():$.java.util.Set;
                /**
                 * ��ȡ�����ڼ䣬����
                 */
                getCalPeriod():string;
                /**
                 * ��ȡ������ѡ��
                 */
                getDesc():string;
                /**
                 * ��ȡ���ɷ�ʽ�����
                 * ��Σ��ַ��� A Ϊ�̶����ɣ��ַ��� B Ϊ��̬���ɡ�
                 */
                getGenMode():string;
                /**
                 * ��ȡ���ڹ�����֯BOID��ѡ��
                 */
                getOrgId():long;
                /**
                 * ��ȡ������㷽��BOID������
                 */
                getQtTiePlanId():long;
                /**
                 * ��ȡ��������ID�����
                 * ��εĶ������͵����ɷ�ʽ������{@link #genMode}��ͬ��
                 */
                getQtTypeIds():$.java.util.Set;
                /**
                 * ��ȡ���ں��㷽��BOID������
                 */
                getTiePlanId():long;
                /**
                 * ��ȡ�Ƿ�洢���㲽�裬����
                 */
                isSaveStep():boolean;
                /**
                 * ���ÿ��ڵ���BOID���ϣ�����
                 */
                setAttFileBoIds(attFileBoIds:$.java.util.Set):void;
                /**
                 * ���ú����ڼ䣬����
                 */
                setCalPeriod(calPeriod:string):void;
                /**
                 * ����������ѡ��
                 */
                setDesc(desc:string):void;
                /**
                 * �������ɷ�ʽ�����
                 * ��Σ��ַ��� A Ϊ�̶����ɣ��ַ��� B Ϊ��̬���ɡ�
                 */
                setGenMode(genMode:string):void;
                /**
                 * ���ÿ��ڹ�����֯BOID��ѡ��
                 */
                setOrgId(orgId:long):void;
                /**
                 * ���ö�����㷽��BOID������
                 */
                setQtTiePlanId(qtTiePlanId:long):void;
                /**
                 * ���ö�������ID�����
                 * ��εĶ������͵����ɷ�ʽ������{@link #genMode}��ͬ��
                 */
                setQtTypeIds(qtTypeIds:$.java.util.Set):void;
                /**
                 * �����Ƿ�洢���㲽�裬����
                 */
                setSaveStep(saveStep:boolean):void;
                /**
                 * ���ÿ��ں��㷽��BOID������
                 */
                setTiePlanId(tiePlanId:long):void;
            }
            type QTTaskStartReq_T = $.java.io.Serializable & QTTaskStartReq_S & QTTaskStartReq$;
            interface QTTaskStartReq extends QTTaskStartReq_T {
            }
            interface QTTaskStartRes_S {
            }
            type QTTaskStartRes_ST = $.java.io.Serializable & QTTaskStartRes_S;
            interface QTTaskStartRes_C extends QTTaskStartRes_ST {
                new():QTTaskStartRes;
            }
            interface QTTaskStartRes$ {
                /**
                 * ��ȡ������룬����������ʧ��ʱ�����ø�ֵ��
                 */
                getErrCode():string;
                /**
                 * ��ȡ������Ϣ������������ʧ��ʱ�����ø�ֵ��
                 */
                getErrMsg():string;
                /**
                 * ��ȡ����ID������������ɹ�ʱ�����ø�ֵ��
                 */
                getTaskId():long;
                /**
                 * ��ȡSDK����״̬��"TRUE"��FALSE��
                 */
                isSuccess():boolean;
                /**
                 * ���ô�����룬����������ʧ��ʱ�����ø�ֵ��
                 */
                setErrCode(errCode:string):void;
                /**
                 * ���ô�����Ϣ������������ʧ��ʱ�����ø�ֵ��
                 */
                setErrMsg(errMsg:string):void;
                /**
                 * ����SDK����״̬��"TRUE"��FALSE��
                 */
                setSuccess(success:boolean):void;
                /**
                 * ��������ID������������ɹ�ʱ�����ø�ֵ��
                 */
                setTaskId(taskId:long):void;
            }
            type QTTaskStartRes_T = $.java.io.Serializable & QTTaskStartRes_S & QTTaskStartRes$;
            interface QTTaskStartRes extends QTTaskStartRes_T {
            }
            interface QTTaskHelper_S {
                /**
                 * ���𶨶��������
                 *
                 * @param req �����������������
                 * @return �����������id�����Ϊ 0 ���ʾ��������ʧ��
                 */
                startQTTask(req:QTTaskReq):long;
                /**
                 * ���𶨶��������
                 *
                 * @param req �����������������
                 * @return �����������������
                 */
                startQTTask(req:QTTaskStartReq):QTTaskStartRes;
            }
            interface QTTaskHelper_C extends QTTaskHelper_S {
                new():QTTaskHelper;
            }
            interface QTTaskHelper$ {
            }
            type QTTaskHelper_T = QTTaskHelper_S & QTTaskHelper$;
            interface QTTaskHelper extends QTTaskHelper_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.settle{
            interface AttSettleTaskResp_S {
                with():AttSettleTaskResp$Builder;
            }
            type AttSettleTaskResp_ST = kd.sdk.wtc.wtbs.task.DispatchTaskResp_S & $.java.io.Serializable & AttSettleTaskResp_S;
            interface AttSettleTaskResp_C extends AttSettleTaskResp_ST {
                new():AttSettleTaskResp;
            }
            interface AttSettleTaskResp$ {
            }
            type AttSettleTaskResp_T = kd.sdk.wtc.wtbs.task.DispatchTaskResp & $.java.io.Serializable & AttSettleTaskResp_S & AttSettleTaskResp$;
            interface AttSettleTaskResp extends AttSettleTaskResp_T {
            }
            interface AttSettleTaskResp$Builder_S {
            }
            interface AttSettleTaskResp$Builder_C extends AttSettleTaskResp$Builder_S {
                new():AttSettleTaskResp$Builder;
            }
            interface AttSettleTaskResp$Builder$ {
                build():AttSettleTaskResp;
                errorMsg(arg0:string):this;
                status(arg0:boolean):this;
                taskId(arg0:long):this;
            }
            type AttSettleTaskResp$Builder_T = AttSettleTaskResp$Builder_S & AttSettleTaskResp$Builder$;
            interface AttSettleTaskResp$Builder extends AttSettleTaskResp$Builder_T {
            }
            interface AttSettleTaskReq_S {
            }
            interface AttSettleTaskReq_C extends AttSettleTaskReq_S {
                new():AttSettleTaskReq;
            }
            interface AttSettleTaskReq$ {
                /**
                 * �ҿ�������֯���͵���id���ϲ�ͬʱΪ��
                 * ����������ݴ���Ĺҿ�������֯��ѯ���ڵ���������ȡ���Ŀ��ڵ����ʹ���Ŀ��ڵ������ܣ�һ����н���
                 *      ���ҿ�������֯�Ϳ��ڵ���id����ͬʱΪ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼�ڵ�����������֯������ͬʱΪ�ա���taskId=0
                 * ˵�������ֶ�Ϊhaos_adminorg����
                 */
                getAffiliateAdminOrgIds():$.java.util.Set;
                /**
                 * ����Id���ϣ��͹ҿ�������֯��ͬʱΪ��
                 * �������Ὣ����Ŀ��ڵ�����ͨ���ҿ�������֯��ѯ���Ŀ��ڵ���һһ����н���
                 *      ���ҿ�������֯�Ϳ��ڵ���id����ͬʱΪ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼�ڵ�����������֯������ͬʱΪ�ա���taskId=0
                 * ˵�������ֶ�Ϊwtp_attfilebase����
                 */
                getAttFileIds():$.java.util.Set;
                /**
                 * ���㿼���ڼ�id������
                 * ����������sdk��֧�ְ��ڼ���н��㣬�������ֶα���
                 *      ������ֶ�Ϊ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼���ڼ䲻����Ϊ�ա���taskId=0
                 * ˵��������ֶ�ֵΪ���������ڼ��¼������
                 */
                getPeriodId():long;
                /**
                 * ���ڽ������ͣ�����
                 * �������û��ж������ֽ������
                 *      ������ֶ�Ϊ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=�������Ͳ�����Ϊ�գ�taskId=0
                 * ����˵����1-���ᣬ2-�ⶳ��3-��棬4-��⣬5-������6-����
                 */
                getSettleType():string;
                /**
                 * �ҿ�������֯���͵���id���ϲ�ͬʱΪ��
                 * ����������ݴ���Ĺҿ�������֯��ѯ���ڵ���������ȡ���Ŀ��ڵ����ʹ���Ŀ��ڵ������ܣ�һ����н���
                 *      ���ҿ�������֯�Ϳ��ڵ���id����ͬʱΪ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼�ڵ�����������֯������ͬʱΪ�ա���taskId=0
                 * ˵�������ֶ�Ϊhaos_adminorg����
                 */
                setAffiliateAdminOrgIds(affiliateAdminOrgIds:$.java.util.Set):void;
                /**
                 * ����Id���ϣ��͹ҿ�������֯��ͬʱΪ��
                 * �������Ὣ����Ŀ��ڵ�����ͨ���ҿ�������֯��ѯ���Ŀ��ڵ���һһ����н���
                 *      ���ҿ�������֯�Ϳ��ڵ���id����ͬʱΪ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼�ڵ�����������֯������ͬʱΪ�ա���taskId=0
                 * ˵�������ֶ�Ϊwtp_attfilebase����
                 */
                setAttFileIds(attFileIds:$.java.util.Set):void;
                /**
                 * ���㿼���ڼ�id������
                 * ����������sdk��֧�ְ��ڼ���н��㣬�������ֶα���
                 *      ������ֶ�Ϊ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=���㿼���ڼ䲻����Ϊ�ա���taskId=0
                 * ˵��������ֶ�ֵΪ���������ڼ��¼������
                 */
                setPeriodId(periodId:long):void;
                /**
                 * ���ڽ������ͣ�����
                 * �������û��ж������ֽ������
                 *      ������ֶ�Ϊ��ʱ������SettleTaskResp������isSuccess = false��errorMsg=�������Ͳ�����Ϊ�գ�taskId=0
                 * ˵����1-���ᣬ2-�ⶳ��3-��棬4-��⣬5-������6-����
                 */
                setSettleType(settleType:string):void;
            }
            type AttSettleTaskReq_T = AttSettleTaskReq_S & AttSettleTaskReq$;
            interface AttSettleTaskReq extends AttSettleTaskReq_T {
            }
        }
        namespace kd.sdk.wtc.wtte.business.tietask{
            interface TieTaskReq_S {
            }
            type TieTaskReq_ST = $.java.io.Serializable & TieTaskReq_S;
            interface TieTaskReq_C extends TieTaskReq_ST {
                new():TieTaskReq;
            }
            interface TieTaskReq$ {
                /**
                 * ��ȡ���õĿ��ڵ���boId����
                 * @return ���ڵ���boId����
                 */
                getAttFileBoIds():$.java.util.List;
                /**
                 * ��ȡ���õ���������
                 * @return ��������
                 */
                getDesc():string;
                /**
                 * ��ȡ���õĺ����������
                 * @return �����������
                 */
                getExpectEndDate():Date;
                /**
                 * ��ȡ���õĺ��㿪ʼ����
                 * @return ���㿪ʼ����
                 */
                getExpectStartDate():Date;
                /**
                 * ��ȡ���õĿ�����֯
                 * @return ������֯
                 */
                getOrg():long;
                /**
                 * ��ȡ���õĿ��ں��㷽��id
                 * @return ���ں��㷽��id
                 */
                getTiePlanId():long;
                /**
                 * ��ȡ���õ��Ƿ�洢���㲽��
                 * @return �Ƿ�洢���㲽��
                 */
                isSaveStep():boolean;
                /**
                 * ���ڵ���boId����  ����
                 * @param attFileBoIds ���ڵ���boId����
                 */
                setAttFileBoIds(attFileBoIds:$.java.util.List):void;
                /**
                 * ������������
                 * @param desc ��������
                 */
                setDesc(desc:string):void;
                /**
                 * ���ú����������  ����
                 * @param expectEndDate �����������
                 */
                setExpectEndDate(expectEndDate:Date):void;
                /**
                 * ���ú��㿪ʼ���� �Ǳ���
                 * @param expectStartDate ���㿪ʼ����
                 */
                setExpectStartDate(expectStartDate:Date):void;
                /**
                 * ���ÿ�����֯
                 * @param org ���ÿ�����֯
                 */
                setOrg(org:long):void;
                /**
                 * �����Ƿ�洢���㲽��
                 * @param saveStep �Ƿ�洢���㲽��
                 */
                setSaveStep(saveStep:boolean):void;
                /**
                 * ���ÿ��ں��㷽��id
                 * @param tiePlanId ���ں��㷽��id
                 */
                setTiePlanId(tiePlanId:long):void;
            }
            type TieTaskReq_T = $.java.io.Serializable & TieTaskReq_S & TieTaskReq$;
            interface TieTaskReq extends TieTaskReq_T {
            }
            interface TieTaskResp_S {
            }
            interface TieTaskResp$ {
                /**
                 * �������
                 */
                getErrorCode():string;
                /**
                 * ������Ϣ
                 */
                getErrorMsg():string;
                /**
                 * ����ִ�з���״̬
                 */
                getStatus():boolean;
                /**
                 * ����id
                 */
                getTaskId():long;
            }
            type TieTaskResp_T = TieTaskResp_S & TieTaskResp$;
            interface TieTaskResp extends TieTaskResp_T {
            }
            interface TieTaskHelper_S {
                /**
                 * �����ں�������
                 *
                 * @param tieTaskReq �����ں���������
                 * @return ���ں��㷢����Ӧ���
                 */
                startTieTask(tieTaskReq:TieTaskReq):TieTaskResp;
            }
            interface TieTaskHelper_C extends TieTaskHelper_S {
                new():TieTaskHelper;
            }
            interface TieTaskHelper$ {
            }
            type TieTaskHelper_T = TieTaskHelper_S & TieTaskHelper$;
            interface TieTaskHelper extends TieTaskHelper_T {
            }
        }
    }
}
export {};