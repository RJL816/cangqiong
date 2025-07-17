/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.sit.hcsi{
            interface SdkHcsiModule_S {
            }
            type SdkHcsiModule_ST = $.kd.sdk.module.Module & SdkHcsiModule_S;
            interface SdkHcsiModule_C extends SdkHcsiModule_ST {
                new():SdkHcsiModule;
            }
            interface SdkHcsiModule$ {
            }
            type SdkHcsiModule_T = $.kd.sdk.module.Module & SdkHcsiModule_S & SdkHcsiModule$;
            interface SdkHcsiModule extends SdkHcsiModule_T {
            }
        }
        namespace kd.sdk.sit.hcsi.business.cal{
            interface IBeforeExportCalPersonExtService_S {
            }
            interface IBeforeExportCalPersonExtService$ {
                /**
                 * ��Ʒ�籣��ϸ����ǰ�����б��ֶ�����
                 * ��չ�ӿ�ʹ�÷�����
                 * ����Ʒ�籣��ϸ����ǰ��ͨ��BeforeExportCalPersonEvent��columnFieldKeyList���ԣ��õ�������ϸ���������ֶΣ����������ֶ�������󣬱�Ʒ�ٸ����ź����˳�򣬶������б�������
                 * ��չ����ʾ����
                 * <pre><code>
                 * public class BeforeExportCalPersonExtServiceDemo implements IBeforeExportCalPersonExtService {
                 *
                 *     private static Log log = LogFactory.getLog(BeforeExportCalPersonExtServiceDemo.class);
                 *
                 *     @Override
                 *     public void sortColumnsBeforeExport(BeforeExportCalPersonEvent event) {
                 *         List<String> columnFieldKeyList = event.getColumnFieldKeyList();
                 *         log.info("BeforeExportCalPersonExtServiceDemo.sortColumnsBeforeExport: columnFieldKeyList is {}", JSONObject.toJSONString(columnFieldKeyList));
                 *         Map<String, Boolean> userListColumnsVisibleMap = event.getUserListColumnsVisibleMap();
                 *         HashSet<String> tmpColumnFieldKeySet = new HashSet<>(columnFieldKeyList);
                 *         HRBaseServiceHelper helper = HRBaseServiceHelper.create("hsba_hcsicalpersonexport");
                 *         QFilter filter = new QFilter(HRBaseConstants.NUMBER, QFilter.equals, "1010_S");
                 *         filter.and(HRBaseConstants.ENABLE, QFilter.equals, HRBaseConstants.ENABLED);
                 *         DynamicObject testDy = helper.queryOne("entryentity.fixedcolumn,sinsuritem.id,sumitem.id", filter.toArray());
                 *         if (testDy == null) {
                 *             log.info("BeforeExportCalPersonExtServiceDemo.sortColumnsBeforeExport: testDy is null.");
                 *             return;
                 *         }
                 *         DynamicObjectCollection entryColl = testDy.getDynamicObjectCollection(HRBaseConstants.ENTRYENTITY);
                 *         if (entryColl == null || entryColl.isEmpty()) {
                 *             log.info("BeforeExportCalPersonExtServiceDemo.sortColumnsBeforeExport: entryColl is empty.");
                 *             return;
                 *         }
                 *         Set<String> columnFieldKeys = new LinkedHashSet<>(entryColl.size());
                 *         for (DynamicObject entryEntity : entryColl) {
                 *             if (checkFieldValid(entryEntity.getString("fixedcolumn"), columnFieldKeys)
                 *                     || checkFieldValid(entryEntity.getString("sinsuritem.id"), columnFieldKeys)
                 *                     || checkFieldValid(entryEntity.getString("sumitem.id"), columnFieldKeys)) {
                 *             }
                 *         }
                 *         List<String> sortColumnFieldKeys = columnFieldKeys.stream().filter(tmpColumnFieldKeySet::contains).collect(Collectors.toList());
                 *         log.info("BeforeExportCalPersonExtServiceDemo.sortColumnsBeforeExport: sortColumnFieldKeys is {}", JSONObject.toJSONString(sortColumnFieldKeys));
                 *         event.setColumnFieldKeyList(sortColumnFieldKeys);
                 *     }
                 *
                 *     private boolean checkFieldValid(String columnFieldKey, Set<String> columnFieldKeys) {
                 *         return HRStringUtils.isNotEmpty(columnFieldKey) && !"0".equals(columnFieldKey) && columnFieldKeys.add(columnFieldKey);
                 *     }
                 * }
                 * </code></pre>
                 *
                 * @param event ��Ʒ�籣��ϸ����ǰ�����б��ֶ�����
                 */
                sortColumnsBeforeExport?(event:kd.sdk.sit.hcsi.common.events.cal.BeforeExportCalPersonEvent):void;
            }
            type IBeforeExportCalPersonExtService_T = IBeforeExportCalPersonExtService_S & IBeforeExportCalPersonExtService$;
            interface IBeforeExportCalPersonExtService extends IBeforeExportCalPersonExtService_T {
            }
        }
        namespace kd.sdk.sit.hcsi.business.extpoint{
            interface ITruncationDealExtService_S {
            }
            interface ITruncationDealExtService$ {
                /**
                 *  ����λ��ʽ��������
                 *  @param event
                 *  <code><pre>
                 *
                 *  public class TruncationDealExtServiceDemo implements ITruncationDealExtService {
                 *
                 *      @Override
                 *      public void dataTruncationDeal(ItemDataEvent event) {
                 *          // ��ȡ��λ��ʽ
                 *          String truncationCode = event.getTruncationCode();
                 *          // ��ȡ���ֵ
                 *          BigDecimal resultValue = event.getResultValue();
                 *          if (resultValue == null) {
                 *               return;
                 *           }
                 *          // �ж��Ƿ����������룬������λС��
                 *          if ("12".equals(truncationCode)) {
                 *              // ����λ��ʽ��������
                 *              resultValue = resultValue.setScale(2, BigDecimal.ROUND_HALF_UP);
                 *              // ������õ������������õ��¼�������
                 *              event.setResultValue(resultValue);
                 *          }
                 *      }
                 *  }
                 * <pre/><code/>
                 */
                dataTruncationDeal?(event:kd.sdk.sit.hcsi.common.events.cal.ItemDataEvent):void;
            }
            type ITruncationDealExtService_T = ITruncationDealExtService_S & ITruncationDealExtService$;
            interface ITruncationDealExtService extends ITruncationDealExtService_T {
            }
            interface IInsuranceDataSynExtService_S {
            }
            interface IInsuranceDataSynExtService$ {
                afterInsuranceDataList?(event:kd.sdk.sit.hcsi.common.events.insurancedata.AfterInsuranceDataListEvent):void;
                beforeBuildSelectFields?(event:kd.sdk.sit.hcsi.common.events.insurancedata.AfterInsuranceDataListEvent):void;
            }
            type IInsuranceDataSynExtService_T = IInsuranceDataSynExtService_S & IInsuranceDataSynExtService$;
            interface IInsuranceDataSynExtService extends IInsuranceDataSynExtService_T {
            }
        }
        namespace kd.sdk.sit.hcsi.business.mservice.helper{
            interface CalResultServiceHelper_S {
                /**
                 * @param params - map����3��key�Ͷ�Ӧ��ֵ��ÿ��key�Ĳ�����Ϣ���£�<br/>
                 *               &lt;key��sinSurTaskIds��value���籣����id���ϣ�����������Collection<Long>������&gt; <br/>
                 *               &lt;key��operationKey��value��donothing_audit����ˣ�/donothing_unaudit������ˣ�����&gt; <br/>
                 * @return Map<String,Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                auditOrUnauditSinsurTask(params:$.java.util.Map):$.java.util.Map;
                /**
                 * �����ڼ䡢�������Լ���ѯ�ֶΣ���ȡ�籣��ϸ����
                 *
                 * @param params - map����3��key�Ͷ�Ӧ��ֵ��ÿ��key�Ĳ�����Ϣ���£�<br/>
                 *               &lt;key��periodIds��value���籣�ڼ�id���ϣ�����������Collection<Long>������&gt; <br/>
                 *               &lt;key��sinsurFileIds��value�籣����id���ϣ�����������Collection<Long>������&gt; <br/>
                 *               &lt;key��selectFields��value���籣��ϸ��ѯ�ֶ�,�������ֶ�Ҫ�á�,�����ŷָ��������ѯ��¼���ݣ��ֶ�ǰҪ�ӷ�¼��ʶ������������String������&gt; <br/>
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                getSocInsurancePersons(params:$.java.util.Map):$.java.util.Map;
                /**
                 * �籣��ϸ����������н
                 *
                 * @param params - map����3��key�Ͷ�Ӧ��ֵ��ÿ��key�Ĳ�����Ϣ���£�<br/>
                 *               &lt;key��socInsurancePersonIds��value���籣��ϸid������������Collection<Long>������&gt; <br/>
                 *               &lt;key����������pushType��value�����"1", ���������ݵ���н�������"2"�������н�����������ݣ�����������String������&gt; <br/>
                 *               &lt;key��entityNumber��value�ǵ�ǰ��������ʵ�壬���ڼ�¼������־, ����������Map������&gt; <br/>
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                pushSocInsuranceToSalary(params:$.java.util.Map):$.java.util.Map;
                /**
                 * �����籣��Ա������
                 *
                 * @param params - map����4��key�Ͷ�Ӧ��ֵ��ÿ��key�Ĳ�����Ϣ���£�<br/>
                 *               &lt;key��periodId��value���籣�ڼ�id������������Long������&gt; <br/>
                 *               &lt;key��insuredCompanyIds��value�α���λid���ϣ�����������Collection<Long>������&gt; <br/>
                 *               &lt;key�Ǹ�������calType��value�����"1", ���������񲢼��㣬�����"3"����������񲢼��㣻����������String������&gt; <br/>
                 *               &lt;key��extendParams��value����չ���map, �û�������󣬵��ö�����㣬���Զ��崦������������Map������&gt; <br/>
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                updateSocInsurancePersonAndCal(params:$.java.util.Map):$.java.util.Map;
            }
            interface CalResultServiceHelper_C extends CalResultServiceHelper_S {
                new():CalResultServiceHelper;
            }
            interface CalResultServiceHelper$ {
            }
            type CalResultServiceHelper_T = CalResultServiceHelper_S & CalResultServiceHelper$;
            interface CalResultServiceHelper extends CalResultServiceHelper_T {
            }
        }
        namespace kd.sdk.sit.hcsi.common.events.cal{
            interface OnSetInsuredSumItemDataEvent_S {
            }
            type OnSetInsuredSumItemDataEvent_ST = $.java.io.Serializable & OnSetInsuredSumItemDataEvent_S;
            interface OnSetInsuredSumItemDataEvent_C extends OnSetInsuredSumItemDataEvent_ST {
                new():OnSetInsuredSumItemDataEvent;
                new(detailMap:$.java.util.Map,resultCol:$.kd.bos.dataentity.entity.DynamicObjectCollection,type_arg:string):OnSetInsuredSumItemDataEvent;
                new(detailDy:$.kd.bos.dataentity.entity.DynamicObject,resultCol:$.kd.bos.dataentity.entity.DynamicObjectCollection,type_arg:string):OnSetInsuredSumItemDataEvent;
            }
            interface OnSetInsuredSumItemDataEvent$ {
                getDetailDy():$.kd.bos.dataentity.entity.DynamicObject;
                getDetailMap():$.java.util.Map;
                getResultCol():$.kd.bos.dataentity.entity.DynamicObjectCollection;
                getType():string;
                setDetailDy(detailDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                setDetailMap(detailMap:$.java.util.Map):void;
                setResultCol(resultCol:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                setType(type_arg:string):void;
            }
            type OnSetInsuredSumItemDataEvent_T = $.java.io.Serializable & OnSetInsuredSumItemDataEvent_S & OnSetInsuredSumItemDataEvent$;
            interface OnSetInsuredSumItemDataEvent extends OnSetInsuredSumItemDataEvent_T {
            }
            interface OnGetInsuredStandardListEvent_S {
            }
            type OnGetInsuredStandardListEvent_ST = $.java.io.Serializable & OnGetInsuredStandardListEvent_S;
            interface OnGetInsuredStandardListEvent_C extends OnGetInsuredStandardListEvent_ST {
                new():OnGetInsuredStandardListEvent;
            }
            interface OnGetInsuredStandardListEvent$ {
                getInsureItemIds():$.java.util.List;
                getInsuredStandards():$.java.util.List;
                getListView():$.kd.bos.form.IFormView;
                setInsureItemIds(insureItemIds:$.java.util.List):void;
                setInsuredStandards(insuredStandards:$.java.util.List):void;
                setListView(listView:$.kd.bos.form.IFormView):void;
            }
            type OnGetInsuredStandardListEvent_T = $.java.io.Serializable & OnGetInsuredStandardListEvent_S & OnGetInsuredStandardListEvent$;
            interface OnGetInsuredStandardListEvent extends OnGetInsuredStandardListEvent_T {
            }
            interface ItemDataEvent_S {
            }
            type ItemDataEvent_ST = $.java.io.Serializable & ItemDataEvent_S;
            interface ItemDataEvent_C extends ItemDataEvent_ST {
                new(resultValue:$.java.math.BigDecimal,truncationCode:string):ItemDataEvent;
            }
            interface ItemDataEvent$ {
                getResultValue():$.java.math.BigDecimal;
                getTruncationCode():string;
                setResultValue(resultValue:$.java.math.BigDecimal):void;
                setTruncationCode(truncationCode:string):void;
            }
            type ItemDataEvent_T = $.java.io.Serializable & ItemDataEvent_S & ItemDataEvent$;
            interface ItemDataEvent extends ItemDataEvent_T {
            }
            interface OnGetInsuredSumItemListEvent_S {
            }
            type OnGetInsuredSumItemListEvent_ST = $.java.io.Serializable & OnGetInsuredSumItemListEvent_S;
            interface OnGetInsuredSumItemListEvent_C extends OnGetInsuredSumItemListEvent_ST {
                new():OnGetInsuredSumItemListEvent;
            }
            interface OnGetInsuredSumItemListEvent$ {
                getListView():$.kd.bos.form.IFormView;
                getSumItemList():$.java.util.List;
                setListView(listView:$.kd.bos.form.IFormView):void;
                setSumItemList(sumItemList:$.java.util.List):void;
            }
            type OnGetInsuredSumItemListEvent_T = $.java.io.Serializable & OnGetInsuredSumItemListEvent_S & OnGetInsuredSumItemListEvent$;
            interface OnGetInsuredSumItemListEvent extends OnGetInsuredSumItemListEvent_T {
            }
            interface BeforeExportCalPersonEvent_S {
            }
            type BeforeExportCalPersonEvent_ST = $.java.io.Serializable & BeforeExportCalPersonEvent_S;
            interface BeforeExportCalPersonEvent_C extends BeforeExportCalPersonEvent_ST {
                /**
                 * �޲ι�����
                 */
                new():BeforeExportCalPersonEvent;
                /**
                 * �в���������
                 *
                 * @param columnFieldKeyList �б��ֶ�key
                 * @param userListColumnsVisibleMap       �б�С�������б��ֶοɼ��ԣ� ture�ɼ��� false���ɼ�
                 */
                new(columnFieldKeyList:$.java.util.List,userListColumnsVisibleMap:$.java.util.Map):BeforeExportCalPersonEvent;
            }
            interface BeforeExportCalPersonEvent$ {
                /**
                 * @return ��ȡ�б��ֶ�key
                 */
                getColumnFieldKeyList():$.java.util.List;
                /**
                 * @return �б�С���֣��ֶοɼ��ԣ� ture�ɼ�
                 */
                getUserListColumnsVisibleMap():$.java.util.Map;
                /**
                 * �����������б��ֶ�key
                 *
                 * @param columnFieldKeyList �б��ֶ�key���Ӧ������Ϣ
                 */
                setColumnFieldKeyList(columnFieldKeyList:$.java.util.List):void;
            }
            type BeforeExportCalPersonEvent_T = $.java.io.Serializable & BeforeExportCalPersonEvent_S & BeforeExportCalPersonEvent$;
            interface BeforeExportCalPersonEvent extends BeforeExportCalPersonEvent_T {
            }
        }
        namespace kd.sdk.sit.hcsi.common.events.insurancedata{
            interface AfterInsuranceDataListEvent_S {
            }
            interface AfterInsuranceDataListEvent_C extends AfterInsuranceDataListEvent_S {
                new(selectFieldSet:$.java.util.Set,insuranceDataList:$.java.util.List,queryInsuranceDatas:$.kd.bos.dataentity.entity.DynamicObject[]):AfterInsuranceDataListEvent;
            }
            interface AfterInsuranceDataListEvent$ {
                getInsuranceDataList():$.java.util.List;
                getQueryInsuranceDatas():$.kd.bos.dataentity.entity.DynamicObject[];
                getSelectFieldSet():$.java.util.Set;
                setInsuranceDataList(insuranceDataList:$.java.util.List):void;
                setQueryInsuranceDatas(queryInsuranceDatas:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                setSelectFieldSet(selectFieldSet:$.java.util.Set):void;
            }
            type AfterInsuranceDataListEvent_T = AfterInsuranceDataListEvent_S & AfterInsuranceDataListEvent$;
            interface AfterInsuranceDataListEvent extends AfterInsuranceDataListEvent_T {
            }
        }
        namespace kd.sdk.sit.hcsi.common.events.sinsurfilebase{
            interface SinSurFileBaseAddPageAttributeEvent_S {
            }
            type SinSurFileBaseAddPageAttributeEvent_ST = $.java.io.Serializable & SinSurFileBaseAddPageAttributeEvent_S;
            interface SinSurFileBaseAddPageAttributeEvent_C extends SinSurFileBaseAddPageAttributeEvent_ST {
                /**
                 * ������
                 *
                 * @param tableValueSetter
                 * @param attribute
                 * @param index
                 */
                new(tableValueSetter:$.kd.bos.entity.datamodel.TableValueSetter,attribute:$.java.util.Map,index:number):SinSurFileBaseAddPageAttributeEvent;
            }
            interface SinSurFileBaseAddPageAttributeEvent$ {
                /**
                 * ��ȡ�����ֶ�ӳ��
                 *
                 * @return
                 */
                getAttribute():$.java.util.Map;
                /**
                 * ��ȡ��¼�к�
                 *
                 * @return
                 */
                getIndex():number;
                /**
                 * ��ȡ��¼����
                 *
                 * @return
                 */
                getTableValueSetter():$.kd.bos.entity.datamodel.TableValueSetter;
                /**
                 * ���ö����ֶ�ӳ��
                 *
                 * @param attribute
                 */
                setAttribute(attribute:$.java.util.Map):void;
                /**
                 * ���÷�¼�к�
                 *
                 * @param index
                 */
                setIndex(index:number):void;
                /**
                 * ���÷�¼����
                 *
                 * @param tableValueSetter
                 */
                setTableValueSetter(tableValueSetter:$.kd.bos.entity.datamodel.TableValueSetter):void;
            }
            type SinSurFileBaseAddPageAttributeEvent_T = $.java.io.Serializable & SinSurFileBaseAddPageAttributeEvent_S & SinSurFileBaseAddPageAttributeEvent$;
            interface SinSurFileBaseAddPageAttributeEvent extends SinSurFileBaseAddPageAttributeEvent_T {
            }
            interface SinSurFileBaseAddAttributeEvent_S {
            }
            type SinSurFileBaseAddAttributeEvent_ST = $.java.io.Serializable & SinSurFileBaseAddAttributeEvent_S;
            interface SinSurFileBaseAddAttributeEvent_C extends SinSurFileBaseAddAttributeEvent_ST {
                /**
                 * ������
                 *
                 * @param sinSurFileBase
                 * @param attribute
                 */
                new(sinSurFileBase:$.kd.bos.dataentity.entity.DynamicObject,attribute:$.java.util.Map):SinSurFileBaseAddAttributeEvent;
            }
            interface SinSurFileBaseAddAttributeEvent$ {
                /**
                 * �����ֶ�
                 * ��ȡ
                 *
                 * @return
                 */
                getAttribute():$.java.util.Map;
                /**
                 * ��ȡ������Ϣ
                 *
                 * @return
                 */
                getMessage():string;
                /**
                 * ��ȡ�籣�������ö���
                 *
                 * @return
                 */
                getSinSurFileBase():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�����Ƿ����óɹ�
                 *
                 * @return
                 */
                isStatus():boolean;
                /**
                 * ���ö����ֶ�
                 *
                 * @param attribute
                 */
                setAttribute(attribute:$.java.util.Map):void;
                /**
                 * ���ô�����Ϣ
                 *
                 * @param message
                 */
                setMessage(message:string):void;
                /**
                 * �����籣�������ö���
                 *
                 * @param sinSurFileBase
                 */
                setSinSurFileBase(sinSurFileBase:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ���������Ƿ����óɹ�
                 *
                 * @param status
                 */
                setStatus(status:boolean):void;
            }
            type SinSurFileBaseAddAttributeEvent_T = $.java.io.Serializable & SinSurFileBaseAddAttributeEvent_S & SinSurFileBaseAddAttributeEvent$;
            interface SinSurFileBaseAddAttributeEvent extends SinSurFileBaseAddAttributeEvent_T {
            }
            interface SinSurFileBaseHisChangeEvent_S {
            }
            type SinSurFileBaseHisChangeEvent_ST = $.java.io.Serializable & SinSurFileBaseHisChangeEvent_S;
            interface SinSurFileBaseHisChangeEvent_C extends SinSurFileBaseHisChangeEvent_ST {
                /**
                 * ������
                 *
                 * @param sinSurFileBase �籣�������ö���
                 * @param attribute      �����ֶ�
                 */
                new(sinSurFileBase:$.kd.bos.dataentity.entity.DynamicObject,attribute:$.java.util.Map):SinSurFileBaseHisChangeEvent;
            }
            interface SinSurFileBaseHisChangeEvent$ {
                /**
                 * ��ȡ�����ֶ�
                 *
                 * @return
                 */
                getAttribute():$.java.util.Map;
                /**
                 * ��ȡ�籣�������ö���
                 *
                 * @return
                 */
                getSinSurFileBase():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ��ʶλ
                 *
                 * @return
                 */
                isFlag():boolean;
                /**
                 * ���ö����ֶ�
                 *
                 * @param attribute
                 */
                setAttribute(attribute:$.java.util.Map):void;
                /**
                 * ���ñ�ʶλ
                 *
                 * @param flag
                 */
                setFlag(flag:boolean):void;
                /**
                 * �����籣�������ö���
                 *
                 * @param sinSurFileBase
                 */
                setSinSurFileBase(sinSurFileBase:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type SinSurFileBaseHisChangeEvent_T = $.java.io.Serializable & SinSurFileBaseHisChangeEvent_S & SinSurFileBaseHisChangeEvent$;
            interface SinSurFileBaseHisChangeEvent extends SinSurFileBaseHisChangeEvent_T {
            }
            interface SinSurFileBaseImportAddExcelColumnEvent_S {
            }
            type SinSurFileBaseImportAddExcelColumnEvent_ST = $.java.io.Serializable & SinSurFileBaseImportAddExcelColumnEvent_S;
            interface SinSurFileBaseImportAddExcelColumnEvent_C extends SinSurFileBaseImportAddExcelColumnEvent_ST {
                new(headerList:$.java.util.List):SinSurFileBaseImportAddExcelColumnEvent;
            }
            interface SinSurFileBaseImportAddExcelColumnEvent$ {
                getHeaderList():$.java.util.List;
                setHeaderList(headerList:$.java.util.List):void;
            }
            type SinSurFileBaseImportAddExcelColumnEvent_T = $.java.io.Serializable & SinSurFileBaseImportAddExcelColumnEvent_S & SinSurFileBaseImportAddExcelColumnEvent$;
            interface SinSurFileBaseImportAddExcelColumnEvent extends SinSurFileBaseImportAddExcelColumnEvent_T {
            }
        }
        namespace kd.sdk.sit.hcsi.formplugin.cal.detail{
            interface ICalPersonListAutoSumPlugin_S {
            }
            interface ICalPersonListAutoSumPlugin$ {
                /**
                 * ��ȡ�籣��ϸ�б��Ƿ��Զ��ϼ�
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
            }
            type ICalPersonListAutoSumPlugin_T = ICalPersonListAutoSumPlugin_S & ICalPersonListAutoSumPlugin$;
            interface ICalPersonListAutoSumPlugin extends ICalPersonListAutoSumPlugin_T {
            }
            interface ICalPersonListDisplayPlugin_S {
            }
            interface ICalPersonListDisplayPlugin$ {
                /**
                 * ��ȡ�籣��ϸ�б�̬��ʾ�Ķ�̬��������Ŀ��Ϣ
                 *
                 * @param event
                 */
                onGetInsuredStandardList?(event:kd.sdk.sit.hcsi.common.events.cal.OnGetInsuredStandardListEvent):void;
                /**
                 * ��ȡ�籣��ϸ�ϲ�����Ϣ
                 * @param event
                 */
                onGetInsuredSumItemList?(event:kd.sdk.sit.hcsi.common.events.cal.OnGetInsuredSumItemListEvent):void;
                /**
                 * �����籣��ϸ�ϲ�������
                 * @param event
                 */
                onSetInsuredSumItemData?(event:kd.sdk.sit.hcsi.common.events.cal.OnSetInsuredSumItemDataEvent):void;
            }
            type ICalPersonListDisplayPlugin_T = ICalPersonListDisplayPlugin_S & ICalPersonListDisplayPlugin$;
            interface ICalPersonListDisplayPlugin extends ICalPersonListDisplayPlugin_T {
            }
        }
        namespace kd.sdk.sit.hcsi.formplugin.sinsurfilebase{
            interface ISinSurFileBaseAddAttributePlugin_S {
            }
            interface ISinSurFileBaseAddAttributePlugin$ {
                /**
                 * �籣����������Ӷ�������
                 *
                 * @param sinSurFileBaseAddPageAttributeEvent Ϊ�籣��������ҳ����Ӷ������Բ���ֵ���
                 *   <pre><code>
                 *
                 *     //��Ҫ����Ķ����ֶ�
                 *     private static final List<String> FIELDS = Arrays.asList("datefield", "basedatafield", "combofield");
                 *
                 *     @Override
                 *     public void addAttribute(SinSurFileBaseAddPageAttributeEvent sinSurFileBaseAddPageAttributeEvent) {
                 *         Map<String, Object> attribute = sinSurFileBaseAddPageAttributeEvent.getAttribute();
                 *         TableValueSetter tableValueSetter = sinSurFileBaseAddPageAttributeEvent.getTableValueSetter();
                 *         for (Map.Entry<String, Object> entry : attribute.entrySet()) {
                 *             String key = entry.getKey();
                 *             Object value = entry.getValue();
                 *             if (FIELDS.contains(key)) {
                 *                 if ("basedatafield".equals(key)) {
                 *                     //���⴦������ֶ��ǻ������ϣ���Ҫ��ȡ�������ϵ������ڸ�ֵ
                 *                     if (value != null) {
                 *                         tableValueSetter.set(key, ((DynamicObject) value).getPkValue(), sinSurFileBaseAddPageAttributeEvent.getIndex());
                 *                     }
                 *                 } else {
                 *                     tableValueSetter.set(key, value, sinSurFileBaseAddPageAttributeEvent.getIndex());
                 *                 }
                 *             }
                 *         }
                 *     }
                 *  </code></pre>
                 */
                addAttribute(sinSurFileBaseAddPageAttributeEvent:kd.sdk.sit.hcsi.common.events.sinsurfilebase.SinSurFileBaseAddPageAttributeEvent):void;
            }
            type ISinSurFileBaseAddAttributePlugin_T = ISinSurFileBaseAddAttributePlugin_S & ISinSurFileBaseAddAttributePlugin$;
            interface ISinSurFileBaseAddAttributePlugin extends ISinSurFileBaseAddAttributePlugin_T {
            }
            interface ISinSurFileBaseImportAddExcelColumnPlugin_S {
            }
            interface ISinSurFileBaseImportAddExcelColumnPlugin$ {
                /**
                 * ΪExcelģ����Ӷ����ֶ���
                 *
                 * @param sinSurFileBaseImportAddExcelColumnEvent �籣�������ý��������ֻ�����������ʱģ����Ӷ����ֶ����
                 * <pre><code>
                 *   //ģ���еĵ�3��
                 *     private static final List<String> NUMBERS = Arrays.asList("datefield", "basedatafield", "combofield");
                 *     //ģ���еĵ�4�� Ҫ��ѭ�ֶ�ӳ�� datefield������6��basedatafield�����Һ͵�����combofield�������б�3
                 *     private static final List<String> NAMES = Arrays.asList("����6", "���Һ͵���", "�����б�3");
                 *     //����ֵ
                 *     private static final List<String> DROP_DOWN_LIST = Arrays.asList("����1", "����2");
                 *
                 *     @Override
                 *     public void addExcelColumn(SinSurFileBaseImportAddExcelColumnEvent sinSurFileBaseImportAddExcelColumnEvent) {
                 *         List<List<Map<String, Object>>> headerLists = sinSurFileBaseImportAddExcelColumnEvent.getHeaderList();
                 *         List<Map<String, Object>> numberRowLists = headerLists.get(0);
                 *         List<Map<String, Object>> nameRowLists = headerLists.get(1);
                 *         List<Map<String, Object>> numberRowList = new ArrayList<>(10);
                 *         List<Map<String, Object>> nameRowList = new ArrayList<>(10);
                 *         for (int i = numberRowLists.size(); i < NUMBERS.size() + numberRowLists.size(); i++) {
                 *             Map<String, Object> numberCellMap = new HashMap<>(3);
                 *             //index��value��headerΪ����
                 *             numberCellMap.put("index", i);
                 *             numberCellMap.put("value", NUMBERS.get(i - numberRowLists.size()));
                 *             numberCellMap.put("header", Boolean.FALSE);
                 *             numberRowList.add(numberCellMap);
                 *         }
                 *         List<Integer> isDropDownColumn = Collections.singletonList(2);
                 *         List<Integer> mustInputColumn = Arrays.asList(0, 2);
                 *         for (int j = nameRowLists.size(); j < NAMES.size() + nameRowLists.size(); j++) {
                 *             Map<String, Object> nameCellMap = new HashMap<>(4);
                 *             //index��value��headerΪ����
                 *             nameCellMap.put("index", j);
                 *             nameCellMap.put("value", NAMES.get(j - nameRowLists.size()));
                 *             nameCellMap.put("header", Boolean.TRUE);
                 *             if (mustInputColumn.contains(j - nameRowLists.size())) {
                 *                 //��ɫ���
                 *                 nameCellMap.put("color", Boolean.TRUE);
                 *                 //����
                 *                 nameCellMap.put("mustInput", Boolean.TRUE);
                 *             }
                 *             if (isDropDownColumn.contains(j - nameRowLists.size())) {
                 *                 //��������
                 *                 nameCellMap.put("isDropDown", Boolean.TRUE);
                 *                 nameCellMap.put("dropDownList", DROP_DOWN_LIST);
                 *             }
                 *             nameRowList.add(nameCellMap);
                 *         }
                 *         numberRowLists.addAll(numberRowList);
                 *         nameRowLists.addAll(nameRowList);
                 *     }
                 *  </code></pre>
                 */
                addExcelColumn(sinSurFileBaseImportAddExcelColumnEvent:kd.sdk.sit.hcsi.common.events.sinsurfilebase.SinSurFileBaseImportAddExcelColumnEvent):void;
            }
            type ISinSurFileBaseImportAddExcelColumnPlugin_T = ISinSurFileBaseImportAddExcelColumnPlugin_S & ISinSurFileBaseImportAddExcelColumnPlugin$;
            interface ISinSurFileBaseImportAddExcelColumnPlugin extends ISinSurFileBaseImportAddExcelColumnPlugin_T {
            }
        }
        namespace kd.sdk.sit.hcsi.oppplugin.sinsurfile{
            interface ISinSurFileBsedValidatorPlugin_S {
            }
            interface ISinSurFileBsedValidatorPlugin$ {
                /**
                 * �籣���������α�ʱ�������Ч���ڿ�Խ���ù��������ڲ��
                 *
                 *  <pre><code>
                 *   @Override
                 *   public boolean isNotValidator() {
                 *       //true ��Խ���������ڼ���
                 *       return true;
                 *   }
                 *  </code></pre>
                 */
                isNotValidator?():boolean;
            }
            type ISinSurFileBsedValidatorPlugin_T = ISinSurFileBsedValidatorPlugin_S & ISinSurFileBsedValidatorPlugin$;
            interface ISinSurFileBsedValidatorPlugin extends ISinSurFileBsedValidatorPlugin_T {
            }
        }
        namespace kd.sdk.sit.hcsi.oppplugin.sinsurfilebase{
            interface ISinSurFileBaseAddAttributeService_S {
            }
            interface ISinSurFileBaseAddAttributeService$ {
                /**
                 * �籣����������Ӷ�������
                 *
                 * @param sinSurFileBaseAddAttributeEvent �籣����������Ӷ����������
                 *  <pre><code>
                 *    private static final List<String> FIELDS = Arrays.asList("datefield", "basedatafield", "combofield");
                 *
                 *     @Override
                 *     public void addAttribute(SinSurFileBaseAddAttributeEvent sinSurFileBaseAddAttributeEvent) {
                 *         DynamicObject sinSurFileBase = sinSurFileBaseAddAttributeEvent.getSinSurFileBase();
                 *         Map<String, Object> attribute = sinSurFileBaseAddAttributeEvent.getAttribute();
                 *         for (Map.Entry<String, Object> entry : attribute.entrySet()) {
                 *             //�ж��Ƿ��Ƕ����ֶ�
                 *             String key = entry.getKey();
                 *             if (FIELDS.contains(key)) {
                 *                 Object value = entry.getValue();
                 *                 //����ж�һ��valueֵ�Ƿ�����ֶ�����
                 *                 sinSurFileBase.set(key, value);
                 *             }
                 *         }
                 *     }
                 *  </code></pre>
                 */
                addAttribute(sinSurFileBaseAddAttributeEvent:kd.sdk.sit.hcsi.common.events.sinsurfilebase.SinSurFileBaseAddAttributeEvent):void;
            }
            type ISinSurFileBaseAddAttributeService_T = ISinSurFileBaseAddAttributeService_S & ISinSurFileBaseAddAttributeService$;
            interface ISinSurFileBaseAddAttributeService extends ISinSurFileBaseAddAttributeService_T {
            }
            interface ISinSurFileBaseHisChangeService_S {
            }
            interface ISinSurFileBaseHisChangeService$ {
                /**
                 * �ж϶����ֶ��Ƿ����˱仯���Դ��ж��Ƿ�����������
                 *
                 * @param sinSurFileBaseHisChangeEvent  �籣���������Ƿ���Ҫ����ӿ����
                 *  <pre><code>
                 *   @Override
                 *     public void isChange(SinSurFileBaseHisChangeEvent sinSurFileBaseHisChangeEvent) {
                 *         DynamicObject sinSurFileBase = sinSurFileBaseHisChangeEvent.getSinSurFileBase();
                 *         //attribute ����Դ�������洦���value�����string��map���ͣ���ʹ��ʱ��Ҫ����ת������
                 *         Map<String, Object> attribute = sinSurFileBaseHisChangeEvent.getAttribute();
                 *         Date dateField = sinSurFileBase.getDate("datefield");
                 *         String dbDateField = (String) attribute.get("datefield");
                 *         if ((dateField == null && dbDateField != null) || (dateField != null && dbDateField == null)) {
                 *             sinSurFileBaseHisChangeEvent.setFlag(true);
                 *             return;
                 *         }
                 *         try {
                 *             if (dateField != null && !dateField.equals(HRDateTimeUtils.parseDate(dbDateField, "yyyy-MM-dd"))) {
                 *                 sinSurFileBaseHisChangeEvent.setFlag(true);
                 *                 return;
                 *             }
                 *         } catch (ParseException e) {
                 *             e.printStackTrace();
                 *         }
                 *         String comboField = sinSurFileBase.getString("combofield");
                 *         String dbComboField = (String) attribute.get("combofield");
                 *         if ((comboField == null && dbComboField != null) || (comboField != null && dbComboField == null)) {
                 *             sinSurFileBaseHisChangeEvent.setFlag(true);
                 *             return;
                 *         }
                 *         if (comboField != null && !comboField.equals(dbComboField)) {
                 *             sinSurFileBaseHisChangeEvent.setFlag(true);
                 *             return;
                 *         }
                 *         Long baseDataFieldId = sinSurFileBase.getLong("basedatafield.id");
                 *         Map basedatafield = (Map) attribute.get("basedatafield");
                 *         if ((baseDataFieldId == 0 && basedatafield != null) || (baseDataFieldId != 0 && basedatafield == null)) {
                 *             sinSurFileBaseHisChangeEvent.setFlag(true);
                 *             return;
                 *         }
                 *         if (baseDataFieldId != 0 && !baseDataFieldId.equals(Long.valueOf((basedatafield).get("id").toString()))) {
                 *             sinSurFileBaseHisChangeEvent.setFlag(true);
                 *         }
                 *     }
                 *
                 *  </code></pre>
                 */
                isChange(sinSurFileBaseHisChangeEvent:kd.sdk.sit.hcsi.common.events.sinsurfilebase.SinSurFileBaseHisChangeEvent):void;
            }
            type ISinSurFileBaseHisChangeService_T = ISinSurFileBaseHisChangeService_S & ISinSurFileBaseHisChangeService$;
            interface ISinSurFileBaseHisChangeService extends ISinSurFileBaseHisChangeService_T {
            }
        }
        namespace kd.sdk.sit.hcsi.service.sinsurfile{
            interface SinSurFileHelper_S {
            }
            interface SinSurFileHelper_C extends SinSurFileHelper_S {
                new():SinSurFileHelper;
            }
            interface SinSurFileHelper$ {
                /**
                 * �籣����д��
                 *
                 * @param params
                 * @return
                 */
                syncFileAndPersonInfo(params:$.java.util.List):$.java.util.Map;
                /**
                 * �籣����д��
                 *
                 * @param params
                 * @return
                 */
                syncFileAndPersonInfoByEmployeeId(params:$.java.util.List):$.java.util.Map;
            }
            type SinSurFileHelper_T = SinSurFileHelper_S & SinSurFileHelper$;
            interface SinSurFileHelper extends SinSurFileHelper_T {
            }
        }
        namespace kd.sdk.sit.hcsi.service.sinsurfilebase{
            interface ISinSurFileBaseImportAddAttributeService_S {
            }
            interface ISinSurFileBaseImportAddAttributeService$ {
                /**
                 * �籣����������Ӷ�������
                 *
                 * @param sinSurFileBaseAddAttributeEvent
                 *  <pre><code>
                 *
                 *     //��Ҫ����Ķ����ֶ�
                 *     private static final List<String> FIELDS = Arrays.asList("datefield", "basedatafield", "combofield");
                 *
                 *     @Override
                 *     public void addImportAttribute(SinSurFileBaseAddAttributeEvent sinSurFileBaseAddAttributeEvent) {
                 *         DynamicObject sinSurFileBase = sinSurFileBaseAddAttributeEvent.getSinSurFileBase();
                 *         Map<String, Object> attribute = sinSurFileBaseAddAttributeEvent.getAttribute();
                 *         for (Map.Entry<String, Object> entry : attribute.entrySet()) {
                 *             //����Excelʱvalueֵ�����ַ�������Ҫ�ж�һ��valueֵ�Ƿ�����ֶ����ͣ������������Ҫ����ת������������ʱ�����ֶδ��ݹ�������һ���ַ�������Ҫת�������ڸ�ʽ
                 *             String key = entry.getKey();
                 *             switch (key) {
                 *                 case "datefield":
                 *                     try {
                 *                         sinSurFileBase.set(key, HRDateTimeUtils.parseDate((String) entry.getValue(), "yyyy-MM-dd"));
                 *                     } catch (ParseException e) {
                 *                         e.printStackTrace();
                 *                         sinSurFileBaseAddAttributeEvent.setStatus(false);
                 *                         sinSurFileBaseAddAttributeEvent.setMessage("����ת��ʧ��");
                 *                     }
                 *                     break;
                 *                 case "basedatafield":
                 *                     //�����չ�ֶ��ǻ������ϣ�Excel�ϴ�ʱ���ݵ��Ǳ��룬��Ҫ��ѯ����Ӧ�������ڽ��и�ֵ
                 *                     HRBaseServiceHelper hrBaseServiceHelper = new HRBaseServiceHelper("bd_country");
                 *                     sinSurFileBase.set(key, hrBaseServiceHelper.queryOne(new QFilter[]{new QFilter("number", QCP.equals, entry.getValue())}));
                 *                     break;
                 *                 case "combofield":
                 *                     //���������ѡ�Excel��д���ǡ���ʾ���⡿�������Ҫת��Ϊ������ֵ��
                 *                     String comboFieldValue = (String) entry.getValue();
                 *                     if (HRStringUtils.equals("����1", comboFieldValue)) {
                 *                         sinSurFileBase.set(key, 1);
                 *                     } else if (HRStringUtils.equals("����2", comboFieldValue)) {
                 *                         sinSurFileBase.set(key, 2);
                 *                     } else {
                 *                         sinSurFileBaseAddAttributeEvent.setStatus(false);
                 *                         sinSurFileBaseAddAttributeEvent.setMessage("������ѡ��ֵ");
                 *                     }
                 *                     break;
                 *                 default:
                 *                     break;
                 *             }
                 *         }
                 *     }
                 * </code></pre>
                 */
                addImportAttribute(sinSurFileBaseAddAttributeEvent:kd.sdk.sit.hcsi.common.events.sinsurfilebase.SinSurFileBaseAddAttributeEvent):void;
            }
            type ISinSurFileBaseImportAddAttributeService_T = ISinSurFileBaseImportAddAttributeService_S & ISinSurFileBaseImportAddAttributeService$;
            interface ISinSurFileBaseImportAddAttributeService extends ISinSurFileBaseImportAddAttributeService_T {
            }
            interface SinSurFileBaseHelper_S {
            }
            interface SinSurFileBaseHelper_C extends SinSurFileBaseHelper_S {
                new():SinSurFileBaseHelper;
            }
            interface SinSurFileBaseHelper$ {
                /**
                 * ������籣��������
                 *
                 * @param params
                 * @return
                 */
                hisChangeSinSurBases(params:$.java.util.List):$.java.util.Map;
                /**
                 * �籣�������ñ��������α���׼���籣�������ã�
                 *
                 * @param params
                 * @return
                 */
                hisChangeSinSurFileStdAndBases(params:$.java.util.List):$.java.util.Map;
                /**
                 * ��������������α���׼
                 *
                 * @param params
                 * @return
                 */
                hisChangeSinSurFileStds(params:$.java.util.List):$.java.util.Map;
                /**
                 * ����������籣��������
                 *
                 * @param params
                 * @return
                 */
                saveSinSurFileStdAndBases(params:$.java.util.List):$.java.util.Map;
            }
            type SinSurFileBaseHelper_T = SinSurFileBaseHelper_S & SinSurFileBaseHelper$;
            interface SinSurFileBaseHelper extends SinSurFileBaseHelper_T {
            }
        }
        namespace kd.sdk.sit.iit{
            interface SdkIitModule_S {
            }
            type SdkIitModule_ST = $.kd.sdk.module.Module & SdkIitModule_S;
            interface SdkIitModule_C extends SdkIitModule_ST {
                new():SdkIitModule;
            }
            interface SdkIitModule$ {
            }
            type SdkIitModule_T = $.kd.sdk.module.Module & SdkIitModule_S & SdkIitModule$;
            interface SdkIitModule extends SdkIitModule_T {
            }
        }
        namespace kd.sdk.sit.iit.business.mservice.helper{
            interface TaxFileServiceHelper_S {
                /**
                 * ��ѯ��˰������Ϣ
                 *
                 * @param params - ����Map�����£�<br/>
                 *               &lt;key��data��value����Ա��˰����ID-�������ؼ��ϣ�����������List������&gt; <br/>
                 *               &lt;key��props��value��Ҫ��ѯ�����Լ��ϣ�����������Set������&gt; <br/>
                 *               &lt;key��includeStop��value���Ƿ����ֹͣ��˰�ĵ���������������Boolean���Ǳ���&gt; <br/>
                 *               &lt;key��useHis��value����ʷ��������ƥ��ģʽ������������Integer���Ǳ���&gt; <br/>
                 *               &lt;key��includeAbandon��value���Ƿ������������ģʽ������������Integer���Ǳ���&gt; <br/>
                 *               &lt;key��dataStatus��value������״̬ƥ��ģʽ������������Integer���Ǳ���&gt; <br/>
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                findPropOfTaxFile(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ͬ����˰�������ݰ�����ģ����Ϣ��ͨ��status�ֶο��Կ��Ƶ������ݵ� ���� �� �޸� �� �����Ч
                 *
                 * @param params - ���Map��ɵ��б����У�ÿ��Map�Ĳ����б����£�<br/>
                 *               &lt;key��sourceid��value�����󵥾ݵ�id��Э���˶���id��������Դʹ�ã�����������Long������&gt; <br/>
                 *               &lt;key��taxfile��value�Ǹ�˰����������ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��taxcontact��value����ϵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��employment��value����ְ�ܹʹ�ҵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��overseasperson��value�Ǿ�����Ա��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��investor��value�ǹɶ�Ͷ������ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��bankcard��value�����п���ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��specialinfo��value����������˰��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                synTaxFileData(params:$.java.util.List):$.java.util.Map;
                /**
                 * ͬ����˰�������ݰ�����ģ����Ϣ��ͨ��status�ֶο��Կ��Ƶ������ݵ� ���� �� �޸� �� �����Ч
                 *
                 * @param params - ���Map��ɵ��б����У�ÿ��Map�Ĳ����б����£�<br/>
                 *               &lt;key��sourceid��value�����󵥾ݵ�id��Э���˶���id��������Դʹ�ã�����������Long������&gt; <br/>
                 *               &lt;key��taxfile��value�Ǹ�˰����������ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��taxcontact��value����ϵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��employment��value����ְ�ܹʹ�ҵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *               &lt;key��overseasperson��value�Ǿ�����Ա��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��investor��value�ǹɶ�Ͷ������ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��bankcard��value�����п���ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *               &lt;key��specialinfo��value����������˰��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 * @param actionWay - 0 �C ҳ��������1 �C ��н���룬2 �C ��˰���룬-1 �C ����
                 * @param action - 1 �C ��У�飬2 �C �����棬 3 �C У�鲢����
                 *
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                synTaxFileData(params:$.java.util.List,actionWay:string,action:string):$.java.util.Map;
                /**
                 * ͬ����˰�������ݰ�����ģ����Ϣ��ͨ��status�ֶο��Կ��Ƶ������ݵ� ���� �� �޸� �� �����Ч
                 *
                 * @param params - ���Map��ɵ��б����У�ÿ��Map�Ĳ����б����£�<br/>
                 *        &lt;key��sourceid��value�����󵥾ݵ�id��Э���˶���id��������Դʹ�ã�����������Long������&gt; <br/>
                 *        &lt;key��taxfile��value�Ǹ�˰����������ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *        &lt;key��taxcontact��value����ϵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *        &lt;key��employment��value����ְ�ܹʹ�ҵ��ϢMap<���Ա�ʶ��ֵ>������������Map������&gt; <br/>
                 *        &lt;key��overseasperson��value�Ǿ�����Ա��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *        &lt;key��investor��value�ǹɶ�Ͷ������ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *        &lt;key��bankcard��value�����п���ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 *        &lt;key��specialinfo��value����������˰��ϢMap<���Ա�ʶ��ֵ>������������Map���Ǳ���&gt; <br/>
                 * @param actionWay - 0 �C ҳ��������1 �C ��н���룬2 �C ��˰���룬-1 �C ����
                 * @param action - 1 �C ��У�飬2 �C �����棬 3 �C У�鲢����
                 *
                 * @return Map<String, Object> - �ӿ��Ƿ���óɹ���������Ϣ���ӿ�״̬��Ϣ���������ݵ�Map
                 */
                synTaxFileData(params:$.java.util.List,actionWay:string,action:string,skipPermCheck:string):$.java.util.Map;
            }
            interface TaxFileServiceHelper_C extends TaxFileServiceHelper_S {
                new():TaxFileServiceHelper;
            }
            interface TaxFileServiceHelper$ {
            }
            type TaxFileServiceHelper_T = TaxFileServiceHelper_S & TaxFileServiceHelper$;
            interface TaxFileServiceHelper extends TaxFileServiceHelper_T {
            }
        }
        namespace kd.sdk.sit.iit.business.tax.person{
            interface TaxPersonQueryService_S {
                /**
                 * ��ȡSitbsCommonServiceʵ������
                 *
                 * @return
                 */
                get():TaxPersonQueryService;
            }
            interface TaxPersonQueryService$ {
                /**
                 * ������ԱID��ȡ��Ա��Ϣ��ǰ�汾ֵ
                 *
                 * @param personIds ��ԱID
                 * @param selectProperties ��������
                 * @return ��ԱID - ��Ա������ - ����ֵ
                 */
                queryPersonInfos(personIds:$.java.util.Collection,selectProperties:$.java.util.Collection):$.java.util.Map;
                /**
                 * ������Ա��ϢID����ͬ��Ϣ���в�ͬ��ID����ȡ��Ա��Ϣ��ǰ�汾ֵ
                 *
                 * @param hisIds ��Ա��Ϣ��ʷ�汾ID
                 * @param selectProperties ��������
                 * @return ��Ա��Ϣ��ʶ - ��Ա������ - ����ֵ
                 */
                queryPersonInfosHis(hisIds:$.java.util.List,selectProperties:$.java.util.Collection):$.java.util.Map;
            }
            type TaxPersonQueryService_T = TaxPersonQueryService_S & TaxPersonQueryService$;
            interface TaxPersonQueryService extends TaxPersonQueryService_T {
            }
        }
        namespace kd.sdk.sit.itc{
            interface SdkItcModule_S {
            }
            type SdkItcModule_ST = $.kd.sdk.module.Module & SdkItcModule_S;
            interface SdkItcModule_C extends SdkItcModule_ST {
                new():SdkItcModule;
            }
            interface SdkItcModule$ {
            }
            type SdkItcModule_T = $.kd.sdk.module.Module & SdkItcModule_S & SdkItcModule$;
            interface SdkItcModule extends SdkItcModule_T {
            }
        }
        namespace kd.sdk.sit.itc.business.tax.data{
            interface TaxDataQueryService_S {
                /**
                 * ��ȡTaxDataQueryServiceʵ������
                 *
                 * @return
                 */
                get():TaxDataQueryService;
            }
            interface TaxDataQueryService$ {
                /**
                 * ������Ա��˰����ID��ȡ��Ա��Ϣ��ǰ�汾ֵ
                 *
                 * @param taxFileIds ��˰������boid
                 * @param selectProperties ��������
                 * @return ��ԱID - ��Ա������ - ����ֵ
                 */
                queryCurrentPersonInfos(taxFileIds:$.java.util.Collection,selectProperties:$.java.util.Collection):$.java.util.Map;
                /**
                 * ���ݸ�˰����ID��ȡ��Ա��Ϣ��ʱ�汾ֵ
                 *
                 * @param taxDataIds ��˰����ID
                 * @param selectProperties ��������
                 * @return ��˰����id - ��Ա������ - ����ֵ
                 */
                queryHisPersonInfos(taxDataIds:$.java.util.Collection,selectProperties:$.java.util.Collection):$.java.util.Map;
                /**
                 * ���ݸ�˰����ID��ȡ��˰������Ŀֵ
                 *
                 * @param taxDataIds ��˰����ID
                 * @param taxItems ����ĿID
                 * @return ��˰����ID - ��˰��Ŀ - ��˰��Ŀֵ
                 */
                queryTaxDataItems(taxDataIds:$.java.util.Collection,taxItems:$.java.util.Collection):$.java.util.Map;
                /**
                 * ���ݸ�˰����ID��ȡ��˰������Ŀֵ
                 *
                 * @param taxDataIds ��˰����ID
                 * @param taxItems ����ĿID
                 * @param queryItemValue true��ѯitemvalue  false��ѯcalvalue
                 * @return ��˰����ID - ��˰��Ŀ - ��˰��Ŀֵ
                 */
                queryTaxDataItems(taxDataIds:$.java.util.Collection,taxItems:$.java.util.Collection,queryItemValue:boolean):$.java.util.Map;
                /**
                 * �����������Ҹ�˰����ά����Ϣ��������أ�����ά�ȷ�������˱����ж�������¼��
                 *
                 * @param selectProperties���������ԣ�
                 * @param filters ��������
                 * @param orderBy ������
                 * @return ��˰���ݶ�̬�����б�
                 */
                queryTaxDataList(selectProperties:$.java.util.Collection,filters:$.java.util.Collection,orderBy:string):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * �����������Ҹ�˰����ά����Ϣ��������أ�����ά�ȷ�������˱����ж�������¼��
                 *
                 * @param selectProperties���������ԣ�
                 * @param filters ��������
                 * @param orderBy ������
                 * @param originalQuery ��originalQuery��ѯ��
                 * @return ��˰���ݶ�̬�����б�
                 */
                queryTaxDataList(selectProperties:$.java.util.Collection,filters:$.java.util.Collection,orderBy:string,originalQuery:boolean):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ����id���Ҹ�˰������Ϣ
                 *
                 * @param selectProperties���������ԣ�
                 * @param taxDataIds ��˰����ID
                 * @param orderBy ������
                 * @return ��˰���ݶ�̬�����б�
                 */
                queryTaxDataListById(selectProperties:$.java.util.Collection,taxDataIds:$.java.util.Collection,orderBy:string):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ����id���Ҹ�˰������Ϣ
                 *
                 * @param selectProperties���������ԣ�
                 * @param taxDataIds ��˰����ID
                 * @param orderBy ������
                 * @param originalQuery ��originalQuery��ѯ��
                 * @return ��˰���ݶ�̬�����б�
                 */
                queryTaxDataListById(selectProperties:$.java.util.Collection,taxDataIds:$.java.util.Collection,orderBy:string,originalQuery:boolean):$.kd.bos.dataentity.entity.DynamicObjectCollection;
            }
            type TaxDataQueryService_T = TaxDataQueryService_S & TaxDataQueryService$;
            interface TaxDataQueryService extends TaxDataQueryService_T {
            }
        }
        namespace kd.sdk.sit.sitbp{
            interface SdkSitbpModule_S {
            }
            type SdkSitbpModule_ST = $.kd.sdk.module.Module & SdkSitbpModule_S;
            interface SdkSitbpModule_C extends SdkSitbpModule_ST {
                new():SdkSitbpModule;
            }
            interface SdkSitbpModule$ {
            }
            type SdkSitbpModule_T = $.kd.sdk.module.Module & SdkSitbpModule_S & SdkSitbpModule$;
            interface SdkSitbpModule extends SdkSitbpModule_T {
            }
        }
        namespace kd.sdk.sit.sitbp.service.spi{
            interface SitbpCommonService_S {
                /**
                 * ��ȡSitbsCommonServiceʵ������
                 *
                 * @return
                 */
                get():SitbpCommonService;
            }
            interface SitbpCommonService$ {
                /**
                 * ������λ��ʽ������ֵȡ��
                 *
                 * @param valBeforeRound ����λ֮ǰ��ֵ
                 * @param roundTypeEnum �α���׼����λ��ʽö��ֵ
                 * @return BigDecimal ����λ���ֵ
                 */
                getBigDecimalValue?(valBeforeRound:$.java.math.BigDecimal,roundTypeEnum:string):$.java.math.BigDecimal;
            }
            type SitbpCommonService_T = SitbpCommonService_S & SitbpCommonService$;
            interface SitbpCommonService extends SitbpCommonService_T {
            }
        }
        namespace kd.sdk.sit.sitbs{
            interface SdkSitbsModule_S {
            }
            type SdkSitbsModule_ST = $.kd.sdk.module.Module & SdkSitbsModule_S;
            interface SdkSitbsModule_C extends SdkSitbsModule_ST {
                new():SdkSitbsModule;
            }
            interface SdkSitbsModule$ {
            }
            type SdkSitbsModule_T = $.kd.sdk.module.Module & SdkSitbsModule_S & SdkSitbsModule$;
            interface SdkSitbsModule extends SdkSitbsModule_T {
            }
        }
        namespace kd.sdk.sit.sitbs.business.extpoint.person{
            interface ISITBSPersonExtService_S {
            }
            interface ISITBSPersonExtService$ {
                /**
                 * ��н��Ա�޸Ĺ��ŷ���
                 *
                 * <pre><code>
                 *
                 * public class SITBSPersonExtDemoService implements ISITBSPersonExtService {
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
                 *         //�����޸���չ�����Ĺ���
                 *         dealModifyPersonNumberForEntityEqual(param, oriNumbers, numberMap, "kdtest_sitbs_extdemotest", "number");
                 *
                 *         //�޷���ֵ������ʧ��ֱ�����쳣
                 *         if (param.containsKey("testerrorsitbs")) {
                 *             throw new RuntimeException("This deal fail sitbs!!!");
                 *         }
                 *     }
                 *
                 *     private DynamicObject[] dealModifyPersonNumberForEntityEqual(Map<String, Object> param, Set<String> oriNumbers, Map<String, String> numberMap, String entityNumber, String propertyName) {
                 *         HRBaseServiceHelper logHelper = new HRBaseServiceHelper("sitbs_dataupdatelog");
                 *         List<DynamicObject> logDys = new ArrayList<>(SITBaseConstants.INITCAPACITY_ARRAYLIST);
                 *
                 *         QFilter qFilter = new QFilter(propertyName, QFilter.in, oriNumbers);
                 *
                 *         HRBaseServiceHelper empHelper = new HRBaseServiceHelper(entityNumber);
                 *         DynamicObject[] dataDys = empHelper.query(propertyName, new QFilter[]{qFilter});
                 *         for (DynamicObject empDy : dataDys) {
                 *             String oriVal = empDy.getString(propertyName);
                 *             String newVal = numberMap.get(empDy.get(propertyName));
                 *             empDy.set(propertyName, newVal);
                 *
                 *             //��¼��־
                 *             DynamicObject logDy = logHelper.generateEmptyDynamicObject();
                 *             logDy.set("batchnum", param.get("batchnum"));
                 *             logDy.set("mainop", "modifyPersonNumber");
                 *             logDy.set("childop", "sitbs");
                 *             logDy.set("entityNumber", entityNumber);
                 *             logDy.set("field", propertyName);
                 *             logDy.set("updatestatus", "S");//�ɹ�
                 *             logDy.set("logdatatype", "D");//��ϸ
                 *             logDy.set("dataid", empDy.get("id"));
                 *             logDy.set("orivalue", oriVal);
                 *             logDy.set("newvalue", newVal);
                 *             logDys.add(logDy);
                 *         }
                 *         empHelper.update(dataDys);
                 *
                 *         logHelper.save(logDys.toArray(new DynamicObject[0]));
                 *
                 *         Map<String, Object> resultMap = (Map<String, Object>) param.get("dealInfo");
                 *         resultMap.put(entityNumber + "#" + propertyName, dataDys.length);
                 *
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
            type ISITBSPersonExtService_T = ISITBSPersonExtService_S & ISITBSPersonExtService$;
            interface ISITBSPersonExtService extends ISITBSPersonExtService_T {
            }
        }
        namespace kd.sdk.sit.sitbs.business.tax.basic{
            interface TaxBasicInfoQueryService_S {
                /**
                 * ��ȡTaxDataQueryServiceʵ������
                 *
                 * @return
                 */
                get():TaxBasicInfoQueryService;
            }
            interface TaxBasicInfoQueryService$ {
                /**
                 * ���ݸ�˰��ĿID��ȡ��˰��Ŀ
                 *
                 * @param itemIds ��˰��ĿID�б�
                 * @return ��˰��Ŀ��̬�����б�
                 */
                queryTaxItems(itemIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��˰�ڼ�����ID + ��ֹʱ����Ҹ�˰�ڼ�
                 *
                 * @param periodType �ڼ�����
                 * @param startDate ��ʼʱ��
                 * @param endDate ����ʱ��
                 * @return ��˰�ڼ䶯̬�����б�
                 */
                queryTaxPeriods(periodType:long,startDate:Date,endDate:Date):$.kd.bos.dataentity.entity.DynamicObjectCollection;
            }
            type TaxBasicInfoQueryService_T = TaxBasicInfoQueryService_S & TaxBasicInfoQueryService$;
            interface TaxBasicInfoQueryService extends TaxBasicInfoQueryService_T {
            }
        }
        namespace kd.sdk.sit.sitcs{
            interface SdkSitcsModule_S {
            }
            type SdkSitcsModule_ST = $.kd.sdk.module.Module & SdkSitcsModule_S;
            interface SdkSitcsModule_C extends SdkSitcsModule_ST {
                new():SdkSitcsModule;
            }
            interface SdkSitcsModule$ {
            }
            type SdkSitcsModule_T = $.kd.sdk.module.Module & SdkSitcsModule_S & SdkSitcsModule$;
            interface SdkSitcsModule extends SdkSitcsModule_T {
            }
        }
        namespace kd.sdk.sit.sitcs.business.extpoint.sinsurcal{
            interface ISocialCalDataSave_S {
            }
            interface ISocialCalDataSave$ {
                /**
                 * ��Ʒ����������֮�󣬵��ô˷�����ʵ�ֶ��ƻ�ҵ���߼�
                 * ��չ�ӿ�ʹ�÷�����
                 * ��λᴫ������ɵ��籣��������ID���ʹ��籣����ӿڴ���������չ����extendParams������AfterSocialCalDataSaveEvent �У�
                 * �û���afterSocialCalDataSave������ʵ���Զ����߼���
                 * ��չ����ʾ����
                 * <pre><code>
                 * public class SocialCalDataSaveExtServiceDemo implements ISocialCalDataSave {
                 *
                 *     private static Log log = LogFactory.getLog(SocialCalDataSaveExtServiceDemo.class);
                 *
                 *     @Override
                 *     public void afterSocialCalDataSave(AfterSocialCalDataSaveEvent event) {
                 *         // �籣��������
                 *         Long taskId = event.getCalTaskId();
                 *         // �ͻ����ü���ӿڣ��������Ĳ���
                 *         Map<String, Object> extendParams = event.getExtendParams();
                 *         HRBaseServiceHelper helper = new HRBaseServiceHelper("hcsi_sinsurtask");
                 *         String selectFields = "id,number,sinsurperiod.id,sinsurperiod.name,sinsurperiod.number,welfarepayer.id,welfarepayer.name,welfarepayer.number";
                 *         DynamicObject taskDy = helper.queryOne(selectFields, taskId);
                 *         if (taskDy != null) {
                 *             log.info("SocialCalDataSaveExtServiceDemo.afterSocialCalDataSave: taskId is {}, taskNumber is {}, " +
                 *                             "sinsurperiod.name is {}, sinsurperiod.number is {}," +
                 *                             "welfarepayer.name is {}, welfarepayer.number is {}",
                 *                     taskDy.getLong("id"), taskDy.getString("number"),
                 *                     taskDy.getString("sinsurperiod.name"), taskDy.getString("sinsurperiod.number"),
                 *                     taskDy.getString("welfarepayer.name"), taskDy.getString("welfarepayer.number"));
                 *         } else {
                 *             log.info("SocialCalDataSaveExtServiceDemo.afterSocialCalDataSave: task is empty.");
                 *         }
                 *         log.info("SocialCalDataSaveExtServiceDemo.afterSocialCalDataSave: extendParams info is {}.", JSON.toString(extendParams));
                 *     }
                 * }
                 * </code></pre>
                 *
                 * @param event �籣������չ�ӿ����
                 */
                afterSocialCalDataSave?(event:kd.sdk.sit.sitcs.common.events.sinsurcal.AfterSocialCalDataSaveEvent):void;
            }
            type ISocialCalDataSave_T = ISocialCalDataSave_S & ISocialCalDataSave$;
            interface ISocialCalDataSave extends ISocialCalDataSave_T {
            }
            interface IBeforeSocialCalDataSaveExtService_S {
            }
            interface IBeforeSocialCalDataSaveExtService$ {
                /**
                 * ��Ʒ�籣��ϸ���֮ǰ�����ô˷�����ʵ�ֶ��ƻ�ҵ���߼�
                 * ��չ�ӿ�ʹ�÷�����
                 * ʵ�ֽӿ�IBeforeSocialCalDataSaveExtService����BeforeSocialCalDataSaveEvent������õ��籣��ϸcalPersonDys���ݣ������������չ���ֶκ�����
                 * ��չ����ʾ����
                 * <pre><code>
                 * public class BeforeSocialCalDataSaveExtServiceDemo implements IBeforeSocialCalDataSaveExtService {
                 *
                 *     private static Log log = LogFactory.getLog(BeforeSocialCalDataSaveExtServiceDemo.class);
                 *
                 *     @Override
                 *     public void beforeSocialCalDataSave(BeforeSocialCalDataSaveEvent event) {
                 *         // �����õ����ǰ���籣��ϸ���ݣ������������չ���ֶκ�����
                 *         List<DynamicObject> calPersonDys = event.getCalPersonDys();
                 *         @SuppressWarnings("unchecked")
                 *         List<Map> calPersonsInfo = calPersonDys.stream().map(HRDynamicObjectUtils::convertDynamicObjectToMap).collect(Collectors.toList());
                 *         log.info("BeforeSocialCalDataSaveExtServiceDemo.beforeSocialCalDataSave: calPersonsInfo are {}.", JSON.toString(calPersonsInfo));
                 *     }
                 * }
                 * </code></pre>
                 * @param event �籣�������ǰ����չ�ӿ����
                 */
                beforeSocialCalDataSave?(event:kd.sdk.sit.sitcs.common.events.sinsurcal.BeforeSocialCalDataSaveEvent):void;
            }
            type IBeforeSocialCalDataSaveExtService_T = IBeforeSocialCalDataSaveExtService_S & IBeforeSocialCalDataSaveExtService$;
            interface IBeforeSocialCalDataSaveExtService extends IBeforeSocialCalDataSaveExtService_T {
            }
        }
        namespace kd.sdk.sit.sitcs.business.extpoint.sinsurdcl{
            interface IDclPersonDataSaveBeforeExtService_S {
            }
            interface IDclPersonDataSaveBeforeExtService$ {
                /**
                 * ��Ʒ�籣�걨�������֮ǰ�����ô˷�����ʵ�ֶ��ƻ�ҵ���߼�
                 * ��չ�ӿ�ʹ�÷�����
                 * ʵ�ֽӿ�IDclPersonDataSaveBeforeExtService����DclPersonDataSaveBeforeEvent������õ��籣�걨����dclPersonDys���ݣ������������չ���ֶκ�����
                 * ��չ����ʾ����
                 * <pre><code>
                 * public class DclPersonDataSaveBeforeExtServiceDemo implements IDclPersonDataSaveBeforeExtService {
                 *
                 *     private final static Log log = LogFactory.getLog(DclPersonDataSaveBeforeExtServiceDemo.class);
                 *
                 *     @Override
                 *     public void dclPersonDataSaveBefore(DclPersonDataSaveBeforeEvent event) {
                 *         // �����õ����ǰ���籣�걨�������ݣ������������չ���ֶκ�����
                 *         List<DynamicObject> dclPersonDys = event.getDclPersonDys();
                 *         @SuppressWarnings("unchecked")
                 *         List<Map> dclPersonsInfo = dclPersonDys.stream().map(HRDynamicObjectUtils::convertDynamicObjectToMap).collect(Collectors.toList());
                 *         log.info("DclPersonDataSaveBeforeExtServiceDemo.dclPersonDataSaveBefore: dclPersonsInfo are {}.", JSON.toString(dclPersonsInfo));
                 *         // ��ѯ������Ŀ
                 *         HRBaseServiceHelper helper = HRBaseServiceHelper.create("sitbs_basefetchitem");
                 *         DynamicObjectCollection itemDys = helper.queryOriginalCollection("id", new QFilter("1", QFilter.equals, 1).toArray());
                 *         if (itemDys != null && itemDys.size() != 0) {
                 *             int minSize = Math.min(itemDys.size(), dclPersonDys.size());
                 *             for (int i = 0; i < minSize; i++) {
                 *                 DynamicObject itemDy = itemDys.get(i);
                 *                 DynamicObject dclPersonDy = dclPersonDys.get(i);
                 *                 // ������Ŀ��Ϣ
                 *                 dclPersonDy.set("kdtest_item", itemDy.getLong(HRBaseConstants.ID));
                 *             }
                 *         }
                 *     }
                 * }
                 * </code></pre>
                 * @param event �籣�걨�������ǰ����չ�ӿ����
                 */
                dclPersonDataSaveBefore?(event:kd.sdk.sit.sitcs.common.events.sinsurdcl.DclPersonDataSaveBeforeEvent):void;
            }
            type IDclPersonDataSaveBeforeExtService_T = IDclPersonDataSaveBeforeExtService_S & IDclPersonDataSaveBeforeExtService$;
            interface IDclPersonDataSaveBeforeExtService extends IDclPersonDataSaveBeforeExtService_T {
            }
        }
        namespace kd.sdk.sit.sitcs.common.events.sinsurcal{
            interface BeforeSocialCalDataSaveEvent_S {
            }
            type BeforeSocialCalDataSaveEvent_ST = $.java.io.Serializable & BeforeSocialCalDataSaveEvent_S;
            interface BeforeSocialCalDataSaveEvent_C extends BeforeSocialCalDataSaveEvent_ST {
                /**
                 * �޲ι�����
                 */
                new():BeforeSocialCalDataSaveEvent;
                /**
                 * �����籣��ϸ��̬����Ĺ�����
                 *
                 * @param calPersonDys �籣��ϸ����
                 */
                new(calPersonDys:$.java.util.List):BeforeSocialCalDataSaveEvent;
            }
            interface BeforeSocialCalDataSaveEvent$ {
                /**
                 * @return ��ȡ�籣��ϸ����
                 */
                getCalPersonDys():$.java.util.List;
                /**
                 * �����籣��ϸ����
                 *
                 * @param calPersonDys �籣��ϸ����
                 */
                setCalPersonDys(calPersonDys:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type BeforeSocialCalDataSaveEvent_T = $.java.io.Serializable & BeforeSocialCalDataSaveEvent_S & BeforeSocialCalDataSaveEvent$;
            interface BeforeSocialCalDataSaveEvent extends BeforeSocialCalDataSaveEvent_T {
            }
            interface AfterSocialCalDataSaveEvent_S {
            }
            type AfterSocialCalDataSaveEvent_ST = $.java.io.Serializable & AfterSocialCalDataSaveEvent_S;
            interface AfterSocialCalDataSaveEvent_C extends AfterSocialCalDataSaveEvent_ST {
                /**
                 * �޲ι�����
                 */
                new():AfterSocialCalDataSaveEvent;
                /**
                 * ������������
                 *
                 * @param calTaskId    �籣��������ID
                 * @param extendParams �û������籣����΢����ӿڣ�͸�������Ĳ����������Զ���ҵ���߼�����
                 */
                new(calTaskId:long,extendParams:$.java.util.Map):AfterSocialCalDataSaveEvent;
            }
            interface AfterSocialCalDataSaveEvent$ {
                /**
                 * ��ȡ�籣��������id
                 */
                getCalTaskId():long;
                /**
                 * @return ��ȡ�籣����͸�������Ĳ���������û������籣����΢����ӿ�ʱ��null�������ﷵ��һ��empty��map
                 */
                getExtendParams():$.java.util.Map;
                /**
                 * @param calTaskId �����籣��������id
                 */
                setCalTaskId(calTaskId:long):void;
                /**
                 * @param extendParams �����籣����͸�������Ĳ���
                 */
                setExtendParams(extendParams:$.java.util.Map):void;
            }
            type AfterSocialCalDataSaveEvent_T = $.java.io.Serializable & AfterSocialCalDataSaveEvent_S & AfterSocialCalDataSaveEvent$;
            interface AfterSocialCalDataSaveEvent extends AfterSocialCalDataSaveEvent_T {
            }
        }
        namespace kd.sdk.sit.sitcs.common.events.sinsurdcl{
            interface DclPersonDataSaveBeforeEvent_S {
            }
            type DclPersonDataSaveBeforeEvent_ST = $.java.io.Serializable & DclPersonDataSaveBeforeEvent_S;
            interface DclPersonDataSaveBeforeEvent_C extends DclPersonDataSaveBeforeEvent_ST {
                /**
                 * �޲ι�����
                 */
                new():DclPersonDataSaveBeforeEvent;
                /**
                 * �����籣�걨������̬����Ĺ�����
                 *
                 * @param dclPersonDys �籣�걨��������
                 */
                new(dclPersonDys:$.java.util.List):DclPersonDataSaveBeforeEvent;
            }
            interface DclPersonDataSaveBeforeEvent$ {
                /**
                 * @return ��ȡ�籣�걨��������
                 */
                getDclPersonDys():$.java.util.List;
                /**
                 * �����籣�걨��������
                 *
                 * @param dclPersonDys �籣�걨��������
                 */
                setDclPersonDys(dclPersonDys:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type DclPersonDataSaveBeforeEvent_T = $.java.io.Serializable & DclPersonDataSaveBeforeEvent_S & DclPersonDataSaveBeforeEvent$;
            interface DclPersonDataSaveBeforeEvent extends DclPersonDataSaveBeforeEvent_T {
            }
        }
    }
}
export {};