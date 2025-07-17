/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.fi{
            interface SdkFiModule_S {
            }
            type SdkFiModule_ST = $.kd.sdk.module.Module & SdkFiModule_S;
            interface SdkFiModule_C extends SdkFiModule_ST {
                new():SdkFiModule;
            }
            interface SdkFiModule$ {
            }
            type SdkFiModule_T = $.kd.sdk.module.Module & SdkFiModule_S & SdkFiModule$;
            interface SdkFiModule extends SdkFiModule_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.dap{
            interface IAfterGenerateVoucherExt_S {
            }
            interface IAfterGenerateVoucherExt$ {
                afterGenerateVoucher(voucherOpValue:string,billEntityNumber:string,billPkMap:$.java.util.Map):void;
            }
            type IAfterGenerateVoucherExt_T = IAfterGenerateVoucherExt_S & IAfterGenerateVoucherExt$;
            interface IAfterGenerateVoucherExt extends IAfterGenerateVoucherExt_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.importext{
            interface IAfterImportDataExt_S {
            }
            interface IAfterImportDataExt$ {
                afterImportData(e:$.kd.bos.entity.datamodel.events.ImportDataEventArgs,model:$.kd.bos.entity.datamodel.IDataModel):void;
            }
            type IAfterImportDataExt_T = IAfterImportDataExt_S & IAfterImportDataExt$;
            interface IAfterImportDataExt extends IAfterImportDataExt_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.invoice{
            interface IInvoiceImport_S {
            }
            interface IInvoiceImport$ {
                /**
                 * �ɼ���Ʊ������Ʊ��
                 * @param invoiceVOsJson ��Ʊ�ش���json����
                 * @param downloadInvs ��Ӧ���ɵ���Ʊ��
                 * @return
                 * <p>��չʾ������
                 * <pre><code>
                 *  @Override
                 * public void afterImportInvoice(String invoesJson, List<DynamicObject> list) {
                 * 	 List<JSONObject> jsonList = JSONObject.parseObject(invoesJson, List.class);
                 * 	 List<InvoiceVO> InvoiceList = new ArrayList<>();
                 * 	 for (JSONObject json : jsonList) {
                 * 	 InvoiceList.add(JSONObject.parseObject(json.toJSONString(), InvoiceVO.class));
                 *     }
                 *     }
                 * </code></pre>
                 */
                afterImportInvoice(invoiceVOsJson:string,downloadInvs:$.java.util.List):void;
            }
            type IInvoiceImport_T = IInvoiceImport_S & IInvoiceImport$;
            interface IInvoiceImport extends IInvoiceImport_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.list{
            interface IAfterBizProcess_S {
            }
            interface IAfterBizProcess$ {
                /**
                 * @param view    �б���߱�view
                 * @param bizName ��ǰҵ���ʶ�������ж��߶�Ӧ�ĸ�sdk
                 *
                 * <p>��չʾ������
                 * <pre><code>
                 * public void afterBizProcess(IFormView view, String bizName) {
                 * // ֻ����Ӧ����Դ�ɼ�����
                 * if (!AfterBizExtendConst.FINAP_COLLECT_INVOICE.equals(bizName)) return;
                 * // Demo����������Դ�ɼ���Ʊ��Ʊ���븳ֵ����ͷ�ı�ע�ֶ�
                 * IDataModel model = view.getModel();
                 * DynamicObjectCollection inventry = model.getEntryEntity("inventry");
                 * if (!inventry.isEmpty()){
                 * String invoiceCode = inventry.get(0).getString("i_invoicecode");
                 * model.setValue("remark",invoiceCode);
                 * }
                 * }
                 *    </code></pre>
                 */
                afterBizProcess(view:$.kd.bos.form.IFormView,bizName:string):void;
            }
            type IAfterBizProcess_T = IAfterBizProcess_S & IAfterBizProcess$;
            interface IAfterBizProcess extends IAfterBizProcess_T {
            }
            interface IApproverSetting_S {
            }
            interface IApproverSetting$ {
                /**
                 * �б�չʾ��ǰ�������Զ����ֶ�����
                 *
                 * @return String: �Զ�����б��ֶ���
                 * <p>��չʾ������
                 * <pre><code>
                 * public String showApproverCaptionExt() {
                 * return "��ǰ�����";
                 * }
                 * </code></pre>
                 */
                showApproverCaptionExt():string;
                /**
                 * �б�չʾ��ǰ�������Զ�����ʾ����
                 *
                 * @return �Զ������ʾ���� Map<String, String> key: ����id(ת��String����) value: ���ŵ����б����ֶ���ʾ��ֵ
                 * <p>��չʾ������
                 * <pre><code>
                 * public Map<String, String> showApproverExt() {
                 * // key: ����id(ת��String����) value: ���ŵ����б����ֶ���ʾ��ֵ
                 * Map<String, String> nodeMap = new HashMap<>(8);
                 * // ����Ҫ��ѯ ��������������ѯ
                 * for (String billId : billIds) {
                 * // �������ﹹ��nodeMap �Զ���ÿһ�ŵ��ݵ�ǰ�����˵�ֵ
                 * if ("1782516835053234176".equals(billId)) {
                 * nodeMap.put(billId, "������");
                 * }
                 * }
                 * }
                 * </code></pre>
                 */
                showApproverExt?(billIds:$.java.util.List):$.java.util.Map;
            }
            type IApproverSetting_T = IApproverSetting_S & IApproverSetting$;
            interface IApproverSetting extends IApproverSetting_T {
            }
            interface IPayeeBankInfoFilter_S {
            }
            interface IPayeeBankInfoFilter$ {
                /**
                 * ��Ӧ���տ��˺Ź���������չ���
                 * @param view ����ҳ��view����
                 * @return
                 * <p>��չʾ������
                 * <pre><code>
                 *  @Override
                 * default void setIFilters(ListFilterParameter lfp, IFormView view ) {
                 *         //ListFilterParameter lfp ���б����Ĺ�������
                 *         //view �༭�����view����
                 *         DynamicObject bill=view.getModel().getDataEntity();
                 *         bill.getLong("id");
                 *         QFilter filter=new QFilter("id", QCP.in,100000L);
                 *         return filter;
                 *
                 *     }
                 * </code></pre>
                 */
                setIFilters?(lfp:$.kd.bos.list.ListFilterParameter,view:$.kd.bos.form.IFormView):void;
            }
            type IPayeeBankInfoFilter_T = IPayeeBankInfoFilter_S & IPayeeBankInfoFilter$;
            interface IPayeeBankInfoFilter extends IPayeeBankInfoFilter_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.payapply{
            interface ICasPayBillPayCallback_S {
            }
            interface ICasPayBillPayCallback$ {
                /**
                 * ��Ʊ�ص�����
                 * @param params �������֮����ø������뵥��д�ӿ�json
                 * @return
                 *
                 * <p>��չʾ������
                 *     <pre><code>
                 *    package kd.fi.arapcommon.customer;
                 *
                 *    import kd.bos.dataentity.entity.DynamicObject;
                 *    import kd.bos.db.tx.TX;
                 *    import kd.bos.db.tx.TXHandle;
                 *    import kd.bos.orm.query.QCP;
                 *    import kd.bos.orm.query.QFilter;
                 *    import kd.bos.servicehelper.BusinessDataServiceHelper;
                 *    import kd.fi.arapcommon.consts.EntityConst;
                 *    import kd.sdk.fi.ap.extpoint.payapply.ICasPayBillPayCallback;
                 *
                 *    import java.util.List;
                 *    import java.util.Map;
                 *    import java.util.Set;
                 *    import java.util.stream.Collectors;
                 *
                 *    public class CasPayBillPayCallbaclImpl_Demo implements ICasPayBillPayCallback {
                 *        @Override
                 *        public void afterProcess(Object params) {
                 *            List<Map<String, Object>> paramList = (List<Map<String, Object>>) params;
                 *            Set<Long> sourceIds = paramList.stream().map(param -> (Long) param.get("sourcepk")).collect(Collectors.toSet());//Դ��id����
                 *            //���ܿ�������������������
                 *            try (TXHandle tx = TX.requiresNew("CasPayBillPayCallback.afterProcess")) {
                 *                try {
                 *                    //��ȡ�������뵥
                 *                    DynamicObject[] payApplyBills = BusinessDataServiceHelper.load(EntityConst.AP_PAYAPPLY, "id", new QFilter[]{new QFilter("id", QCP.in, sourceIds)});
                 *                    for (DynamicObject payApplyBill : payApplyBills){
                 *                        //��������....
                 *                    }
                 *                } catch(Exception ex) {
                 *                    tx.markRollback();
                 *                    throw ex;
                 *                }
                 *            }
                 *        }
                 *    }
                 *    </code></pre>
                 */
                afterProcess(params:any):void;
            }
            type ICasPayBillPayCallback_T = ICasPayBillPayCallback_S & ICasPayBillPayCallback$;
            interface ICasPayBillPayCallback extends ICasPayBillPayCallback_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.push{
            interface IPushAssignField_S {
            }
            interface IPushAssignField$ {
                /**
                 * @return key:���Ƶ���Ŀ�굥ҵ���ʶ����ap_finapbill value:��Ҫ֧�ֵ���չ�ֶ� [{pushfinap=[salesman, salesorg], pushfinar=[purchaser, purorg]}]
                 *
                 * ������
                 * <pre><code>
                 * public class PushAssignFieldDemo implements IPushAssignField {
                 *     public Map<String, List<String>> getAfterPushAssignField() {
                 *         Map<String, List<String>> assignMap = new HashMap<>(2);
                 *         // ����Ӧ��ת����API�ӿ�
                 *         IPushBillService pushBillService = ArApServiceAPIFactory.getPushBillService(ServiceNameEnum.FINAPTRANSFER.getValue());
                 *         List<String> apExtendField = new ArrayList<>(2);
                 *         apExtendField.add("purchaser"); // �ɹ�Ա
                 *         apExtendField.add("purorg"); // �ɹ���֯
                 *         // key ���Ƕ�Ӧʵ�ֵ�ServiceName��ʶ
                 *         assignMap.put(pushBillService.getServiceName(), apExtendField);
                 *         return assignMap;
                 *     }
                 * }
                 * </code></pre>
                 */
                getAfterPushAssignField():$.java.util.Map;
            }
            type IPushAssignField_T = IPushAssignField_S & IPushAssignField$;
            interface IPushAssignField extends IPushAssignField_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.settle{
            interface IPreSettleFilter_S {
            }
            interface IPreSettleFilter$ {
                /**
                 * @return ��չ���ӵ��ڳ�Ԥ������������
                 * <p>
                 * <pre><code>
                 * @Override
                 * public QFilter getPaidExtFilter(IFormView view) {
                 * QFilter filter = null;
                 * IDataModel model = view.getModel();
                 * DynamicObject department = (DynamicObject) model.getValue("department");
                 * if (!ObjectUtils.isEmpty(department)) {
                 * filter = new QFilter("department_ext", QCP.equals, department.getLong("id"));
                 * }
                 * return filter;
                 * }
                 * </code></pre>
                 * </p>
                 */
                getPaidExtFilter?(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
                /**
                 * @return ��չ���ӵĸ����������
                 * <p>
                 * <pre><code>
                 * @Override
                 * public QFilter getPayExtFilter(IFormView view) {
                 * QFilter filter = null;
                 * IDataModel model = view.getModel();
                 * DynamicObject department = (DynamicObject) model.getValue("department");
                 * if (!ObjectUtils.isEmpty(department)) {
                 * filter = new QFilter("department_ext", QCP.equals, department.getLong("id"));
                 * }
                 * return filter;
                 * }
                 * </code></pre>
                 * </p>
                 */
                getPayExtFilter?(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
                /**
                 * @return ��չ���ӵ��տ��������
                 * <p>
                 * <pre><code>
                 * @Override
                 * public QFilter getRecExtFilter(IFormView view) {
                 * QFilter filter = null;
                 * IDataModel model = view.getModel();
                 * DynamicObject department = (DynamicObject) model.getValue("department");
                 * if (!ObjectUtils.isEmpty(department)) {
                 * filter = new QFilter("department_ext", QCP.equals, department.getLong("id"));
                 * }
                 * return filter;
                 * }
                 * </code></pre>
                 * </p>
                 */
                getRecExtFilter?(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
                /**
                 * @return ��չ���ӵ��ڳ�Ԥ�յ���������
                 * <p>
                 * <pre><code>
                 * @Override
                 * public QFilter getReceivedExtFilter(IFormView view) {
                 * QFilter filter = null;
                 * IDataModel model = view.getModel();
                 * DynamicObject department = (DynamicObject) model.getValue("department");
                 * if (!ObjectUtils.isEmpty(department)) {
                 * filter = new QFilter("department_ext", QCP.equals, department.getLong("id"));
                 * }
                 * return filter;
                 * }
                 * </code></pre>
                 * </p>
                 */
                getReceivedExtFilter?(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
            }
            type IPreSettleFilter_T = IPreSettleFilter_S & IPreSettleFilter$;
            interface IPreSettleFilter extends IPreSettleFilter_T {
            }
            interface IAfterSettleProcess_S {
            }
            interface IAfterSettleProcess$ {
                /**
                 * ������:Ӧ��Ӧ�����������չ
                 * @param recordJson  SettleRecordVO ����kd.fi.arapcommon.vo.SettleRecordVO��json
                 * @param schemeJson  SettleSchemeVO ����kd.fi.arapcommon.vo.SettleSchemeVO��json
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    import com.alibaba.fastjson.JSONObject;
                 *    import kd.bos.db.tx.TX;
                 *    import kd.bos.db.tx.TXHandle;
                 *    import kd.fi.arapcommon.vo.SettleRecordVO;
                 *    import kd.fi.arapcommon.vo.SettleSchemeVO;
                 *    import kd.sdk.fi.ap.extpoint.settle.ArApAfterSettleProcess;
                 *
                 *    import java.util.ArrayList;
                 *    import java.util.List;
                 *
                 *    // ������:Ӧ��Ӧ�����������չ
                 *    public class AfterSettleDemoDemo implements ArApAfterSettleProcess {
                 *        public void afterProcess(String schemeJson, String recordJson) {
                 *            // Jsonת���� SettleRecordVO ��������洢�Ž����¼������Ϣ
                 *            List<JSONObject> jsonList = JSONObject.parseObject(recordJson, List.class);
                 *            List<SettleRecordVO> recordList = new ArrayList<>();
                 *            for (JSONObject json : jsonList) {
                 *                recordList.add(JSONObject.parseObject(json.toJSONString(), SettleRecordVO.class));
                 *            }
                 *            // Jsonת���� SettleSchemeVO ������洢�˽��н��㷴������Ҫ���߼�����
                 *            SettleSchemeVO scheme = JSONObject.parseObject(schemeJson, SettleSchemeVO.class);
                 *            // ���ܿ�������������������
                 *            try (TXHandle tx = TX.requiresNew("invokeAfterSettleCallback.afterProcess")) {
                 *                try {
                 *                    // �����������ֳ����ݳ������и��Ի�����
                 *                } catch(Exception ex) {
                 *                    tx.markRollback();
                 *                    throw ex;
                 *                }
                 *            }
                 *        }
                 *    }
                 *    </code></pre>
                 */
                afterProcess(schemeJson:string,recordJson:string):void;
            }
            type IAfterSettleProcess_T = IAfterSettleProcess_S & IAfterSettleProcess$;
            interface IAfterSettleProcess extends IAfterSettleProcess_T {
            }
            interface ISettleMatchExt_S {
            }
            interface ISettleMatchExt$ {
                /**
                 * ����ǰƥ��������չ
                 * @param mainBillSettleVoJson ����������Ϣ
                 * @param asstBillSettleVoJson ����������Ϣ
                 * @param schemeJson ������ز�����Ϣ
                 * @return ƥ��ͨ������ʧ��
                 * <p>
                 * <pre><code>
                 * package kd.fi.arapcommon.writeback;
                 *
                 * import com.alibaba.fastjson.JSONObject;
                 * import kd.fi.arapcommon.vo.BillSettleVO;
                 * import kd.fi.arapcommon.vo.SettleSchemeVO;
                 * import kd.sdk.fi.ap.extpoint.settle.ISettleMatchExt;
                 *
                 * public class settleExtMatchService implements ISettleMatchExt {
                 * @Override
                 * public boolean match(String mainBillSettleVoJson, String asstBillSettleVoJson, String schemeJson) {
                 * // Jsonת���� BillSettleVO ��������洢����������������������Ϣ
                 * BillSettleVO mainBillSettleVo = SerializationUtils.fromJsonString(mainBillSettleVoJson, BillSettleVO.class);
                 * BillSettleVO asstBillSettleVo = SerializationUtils.fromJsonString(asstBillSettleVoJson, BillSettleVO.class);
                 * // Jsonת���� SettleSchemeVO ������洢�˽��н��㷴������Ҫ���߼�����
                 * SettleSchemeVO scheme = SerializationUtils.fromJsonString(schemeJson, SettleSchemeVO.class);
                 * // ����ǰ����ƥ�䣬�ֳ����ݳ������и��Ի�����
                 * boolean result = false;
                 * return result;
                 * }
                 * }
                 *
                 * </code></pre>
                 * </p>
                 */
                match(mainBillSettleVoJson:string,asstBillSettleVoJson:string,schemeJson:string):boolean;
            }
            type ISettleMatchExt_T = ISettleMatchExt_S & ISettleMatchExt$;
            interface ISettleMatchExt extends ISettleMatchExt_T {
            }
            interface IPaySettleWarnFilter_S {
            }
            interface IPaySettleWarnFilter$ {
                /**
                 *  ������Ԥ�����������-���
                 *  "Ԥ����������ѹ���������չ
                 *  @param model ҳ��ģ�Ͷ���
                 *  @return ��չ���ӵĸ����������
                 * <p>
                 *     <pre><code>
                 *      @Override
                 *      public QFilter addPaidFilter(IDataModel iDataModel) {
                 *         Object asstacttype = iDataModel.getValue("asstacttype");
                 *         return new QFilter("itempayeetype", QCP.not_equals,asstacttype);
                 *      }
                 *      </code></pre>
                 *      </p>
                 */
                addPaidFilter(model:$.kd.bos.entity.datamodel.IDataModel):$.kd.bos.orm.query.QFilter;
                /**
                 *  ������Ԥ�����������-���
                 *  "Ԥ����������ѹ���������չ
                 *  @param model ҳ��ģ�Ͷ���
                 *  @return ��չ���ӵĸ����������
                 * <p>
                 *     <pre><code>
                 *      @Override
                 *      public QFilter addPayFilter(IDataModel iDataModel) {
                 *         Object asstacttype = iDataModel.getValue("asstacttype");
                 *         return new QFilter("itempayeetype", QCP.not_equals,asstacttype);
                 *      }
                 *     </code></pre>
                 *     </p>
                 */
                addPayFilter(model:$.kd.bos.entity.datamodel.IDataModel):$.kd.bos.orm.query.QFilter;
            }
            type IPaySettleWarnFilter_T = IPaySettleWarnFilter_S & IPaySettleWarnFilter$;
            interface IPaySettleWarnFilter extends IPaySettleWarnFilter_T {
            }
            interface IManualSettleCheck_S {
            }
            interface IManualSettleCheck$ {
                /**
                 *  �ֹ����������㰴ťǰ��У����չ
                 *  @param view  ҳ��ģ�Ͷ���
                 *  @return   У��ͨ������ʧ��
                 * <p>
                 *      <pre><code>
                 *     package kd.fi.arapcommon.customer.ext;
                 *
                 *     import kd.bos.dataentity.entity.DynamicObject;
                 *     import kd.bos.dataentity.resource.ResManager;
                 *     import kd.bos.form.IFormView;
                 *     import kd.bos.form.control.EntryGrid;
                 *     import kd.sdk.fi.ap.extpoint.settle.IManualSettleCheck;
                 *
                 *     import java.util.HashSet;
                 *     import java.util.Set;
                 *
                 *     public class ManualSettleCheck_Demo implements IManualSettleCheck {
                 *         public boolean check(IFormView view) {
                 *             EntryGrid mainGrid = view.getControl("mainbill");//�������
                 *             int[] mainSelectRows = mainGrid.getSelectRows();//����ѡ����
                 *             EntryGrid asstGrid = view.getControl("asstbill");//�������
                 *             int[] asstSelectRows = asstGrid.getSelectRows();//����ѡ����
                 *
                 *             Set<String> mainContactSet = new HashSet<>(1);
                 *             for (int mainSelectRow : mainSelectRows) {
                 *                 DynamicObject mainRow = view.getModel().getEntryRowEntity("mainbill", mainSelectRow);
                 *                 mainContactSet.add(mainRow.getString("maincontact"));
                 *             }
                 *             if (mainContactSet.size() > 1){
                 *                 //ResManager.loadKDString()������֧��
                 *                 view.showTipNotification(ResManager.loadKDString("�����ĺ�ͬ�ű�����ͬ", "ManualSettleCheck_Demo_1", "fi-arapcommon"));
                 *                 return false;
                 *             }
                 *
                 *             Set<String> asstContactSet = new HashSet<>(1);
                 *             for (int asstSelectRow : asstSelectRows) {
                 *                 DynamicObject asstRow = view.getModel().getEntryRowEntity("asstbill", asstSelectRow);
                 *                 asstContactSet.add(asstRow.getString("asstcontact"));
                 *             }
                 *             if (asstContactSet.size() > 1){
                 *                 //ResManager.loadKDString()������֧��
                 *                 view.showTipNotification(ResManager.loadKDString("�����ĺ�ͬ�ű�����ͬ", "ManualSettleCheck_Demo_2", "fi-arapcommon"));
                 *                 return false;
                 *             }
                 *
                 *             if(mainContactSet.size() == 1 && asstContactSet.size() == 1 &&
                 *                     mainContactSet.iterator().next().equals(asstContactSet.iterator().next())){
                 *                 return true;
                 *             }else{
                 *                 //ResManager.loadKDString()������֧��
                 *                 view.showTipNotification(ResManager.loadKDString("�����͸����ĺ�ͬ�ű���һ�²��ܽ���", "ManualSettleCheck_Demo_3", "fi-arapcommon"));
                 *                 return false;
                 *             }
                 *
                 *         }
                 *     }
                 *      </code></pre>
                 *      </p>
                 */
                check(view:$.kd.bos.form.IFormView):boolean;
            }
            type IManualSettleCheck_T = IManualSettleCheck_S & IManualSettleCheck$;
            interface IManualSettleCheck extends IManualSettleCheck_T {
            }
        }
        namespace kd.sdk.fi.ap.extpoint.woff{
            interface IAfterWoffProcess_S {
            }
            interface IAfterWoffProcess$ {
                /**
                 * @param isWoff true�����أ�false����ȡ�����
                 * @param woffMode ���ģʽ��WoffModeEnum.value
                 * @param finBillIds ����������صĲ���ID
                 * @param srcBusBillIds �������ص�Դ�ݹ���ID
                 * @param woffBillIds ���ɵĳ�ص�ID
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    public class AfterWoffProcessDemo implements IAfterWoffProcess {
                 *    @Override
                 *    public void afterProcess(boolean isWoff, String woffMode, Set<Long> finBillIds, Set<Long> srcBusBillIds, List<Object> woffBillIds) {
                 *        // �Ǻ��ĵ��ݳ��ֱ�ӷ��ز�����
                 *        if(!WoffModeEnum.COREBILL.getValue().equals(woffMode))  return;
                 *        // ����⣬��Ҫʹ��TX.required��ԭ�����񱣳�һ�£�����Ҫ����������Ҫ������������TX.requiresNew��
                 *        try (TXHandle tx = TX.required("invokeAfterWoffProcess.afterWoffProcess")) {
                 *            try {
                 *                // �����غ����ֳ����ݳ������и��Ի�����
                 *                if(isWoff) {
                 *                    // �����չ�߼�
                 *                } else {
                 *                    // ȡ�������չ�߼�
                 *                }
                 *            } catch (Exception ex) {
                 *                tx.markRollback();
                 *                throw ex;
                 *            }
                 *       }
                 *    }
                 *    }
                 *    </code></pre>
                 */
                afterProcess(isWoff:boolean,woffMode:string,finBillIds:$.java.util.Set,srcBusBillIds:$.java.util.Set,woffBillIds:$.java.util.List):void;
            }
            type IAfterWoffProcess_T = IAfterWoffProcess_S & IAfterWoffProcess$;
            interface IAfterWoffProcess extends IAfterWoffProcess_T {
            }
            interface IWoffMatchExt_S {
            }
            interface IWoffMatchExt$ {
                /**
                 * �Գ��ƥ������׷�Ӹ��Ի�ƥ��������֧�ֱ�ͷ��������ϸ���ԣ�������ϸ������Я����¼��ʶ
                 * @param woffMode ���ģʽ��WoffModeEnum.value
                 * @param finEntityKey ���񵥵��ݱ�ʶ��������Ӧ��Ӧ�����ּ���ʶ����
                 * @return <�����ֶα�ʶ, �ݹ����ֶα�ʶ>
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    public class WoffMatchExtDemo implements IWoffMatchExt {
                 *    @Override
                 *    public Map<String, String> moreMatchField(String woffMode, String finEntityKey) {
                 *        Map<String, String> matchField = new HashMap<>(2);
                 *        // ���ĵ��ݳ��׷��ƥ������
                 *        if(WoffModeEnum.COREBILL.getValue().equals(woffMode)) {
                 *            if("ap_finapbill".equals(finEntityKey)) {
                 *                // ������Ӧ��Ӧ�����ֶα�ʶ��ͬ�����ִ���������ϸ������Я����¼��ʶ
                 *                matchField.put("paycond", "paycond");// ��������
                 *                matchField.put("detailentry.tracknumber", "entry.tracknumber");// ���ٺ�
                 *            }
                 *        }
                 *        return matchField;
                 *    }
                 *    }
                 *    </code></pre>
                 */
                moreMatchField(woffMode:string,finEntityKey:string):$.java.util.Map;
            }
            type IWoffMatchExt_T = IWoffMatchExt_S & IWoffMatchExt$;
            interface IWoffMatchExt extends IWoffMatchExt_T {
            }
        }
        namespace kd.sdk.fi.ar.extpoint.invoice{
            interface IInvIssueCallback_S {
            }
            interface IInvIssueCallback$ {
                /**
                 *  ��Ʊ�ص�����
                 *  @param callBackVoJson ����kd.imc.bdm.common.dto.FiBotpCallBackVo.class��json
                 *  @return
                 *
                 *  <p>��չʾ������
                 * 	 <pre><code>
                 * 	 import java.util.*
                 * 	 import java.util.stream.Collectors;
                 * 	 import com.alibaba.fastjson.JSONObject;
                 *
                 * 	 import kd.bos.db.tx.TX;
                 * 	 import kd.bos.db.tx.TXHandle;
                 * 	 import kd.bos.servicehelper.botp.BFTrackerServiceHelper;
                 * 	 import kd.fi.arapcommon.consts.EntityConst;
                 * 	 import kd.fi.arapcommon.util.EmptyUtils;
                 * 	 import kd.imc.bdm.common.dto.FiBotpCallBackArBillVo;
                 * 	 import kd.imc.bdm.common.dto.FiBotpCallBackVo;
                 * 	 import kd.sdk.fi.ar.extpoint.invoice.IInvIssueCallback;
                 *
                 * 	 public class InvIssueCallbackImpl_Demo implements IInvIssueCallback {
                 *
                 * 		public void afterProcess(String callBackVoJson) {
                 * 			FiBotpCallBackVo callBackVo = JSONObject.parseObject(callBackVoJson, FiBotpCallBackVo.class);
                 * 			String invoiceCode = callBackVo.getInvoiceCode(); //��Ʊ����
                 * 			String invoiceNo = callBackVo.getInvoiceNo(); //��Ʊ����
                 * 			List<FiBotpCallBackArBillVo> arBillVos = callBackVo.getArs(); //Ӧ�յ��ݼ���
                 * 			List<Long> finPks = arBillVos.stream().map(FiBotpCallBackArBillVo::getArBillPk).collect(Collectors.toList());
                 * 			//���ܿ�������������������
                 * 			try (TXHandle tx = TX.requiresNew("InvIssueCallback.afterProcess")) {
                 * 			    try {
                 * 			    	//�����ε���
                 * 			    	Map<String, HashSet<Long>> linkBills = BFTrackerServiceHelper.findSourceBills(EntityConst.ENTITY_FINARBILL, finPks.toArray(new Long[]{}));
                 * 			    	//���ε���
                 * 			    	Set<Long> srcPks = linkBills.get("sm_xxxbill");
                 * 			    	if (EmptyUtils.isNotEmpty(srcPks)) {
                 * 			    		// ��ѯ���ε��ݣ����������ε���
                 * 			    		// ...
                 * 			    	}
                 * 			    } catch(Exception ex) {
                 * 			        tx.markRollback();
                 * 			        throw ex;
                 * 			    }
                 * 			}
                 * 		}
                 * 	}
                 * 	</code></pre>
                 */
                afterProcess(callBackVoJson:string):void;
            }
            type IInvIssueCallback_T = IInvIssueCallback_S & IInvIssueCallback$;
            interface IInvIssueCallback extends IInvIssueCallback_T {
            }
        }
        namespace kd.sdk.fi.ar.extpoint.plan{
            interface IPlanRowSplit_S {
            }
            interface IPlanRowSplit$ {
                /**
                 *  �ƻ��в����չ�㣬֧�ֿɸ���
                 *  @param view ����ͼģ��
                 *
                 *  <p>��չʾ������
                 *  <pre><code>
                 * 	 public class PlanRowSplitImpl_Demo implements IPlanRowSplit {
                 *
                 * 		public void splitPlanEntry(IFormView view) {
                 * 			IDataModel m = view.getModel();
                 * 	        m.beginInit();
                 * 	        DynamicObject dataEntity = m.getDataEntity(true);//��ȡҳ��ģ�͵�����ֵ����
                 * 	        String entityName = dataEntity.getDataEntityType().getName();//���ݱ�ʶ
                 * 	        BillModel bm = BillModelFactory.getModel(entityName);//�����ֶα�ʶ����
                 *
                 * 	        //1��ɾ���ƻ��е���������
                 * 	        m.deleteEntryData(bm.P_ENTRY);
                 *
                 * 	        //2������ҵ����ƻ���
                 * 	        for (int i = 0; i < 2; i++) {
                 * 	        	//�����ƻ���
                 * 	        	int iRow = m.createNewEntryRow(bm.P_ENTRY, i, null);
                 * 	        	//�ƻ��и�ֵ
                 * 	        	m.setValue(bm.P_PLANDUEDATE, m.getValue(bm.HEAD_DUEDATE), iRow);
                 * 	        	m.setValue(bm.P_PLANSETTLETYPE, m.getValue(bm.HEAD_SETTLEMENTTYPE), iRow);
                 * 	        	BigDecimal priceTaxTotal = new BigDecimal("100");
                 * 	        	m.setValue(bm.P_PLANPRICETAX, priceTaxTotal, iRow);
                 * 	        	// ...
                 * 			}
                 * 			m.endInit();
                 * 			view.updateView(bm.P_ENTRY);
                 * 		}
                 * 	}
                 *     </code></pre>
                 */
                splitPlanEntry(view:$.kd.bos.form.IFormView):void;
            }
            type IPlanRowSplit_T = IPlanRowSplit_S & IPlanRowSplit$;
            interface IPlanRowSplit extends IPlanRowSplit_T {
            }
        }
        namespace kd.sdk.fi.arapcommon.helper{
            interface SettleServiceSDKHelper_S {
                /**
                 * Ӧ����Ӧ��ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                apArAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ����Ӧ�շ�ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                apArNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ������ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                apPayAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�������ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                apPayNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�������Գ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                apSelfAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�������Գ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                apSelfNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�ճ�Ӧ��ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                arApAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�ճ�Ӧ����ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                arApNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ���տ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                arRecAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ���տ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                arRecNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�պ����Գ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                arSelfAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * Ӧ�պ����Գ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                arSelfNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * ������տ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                payRecAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * ������տ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                payRecNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * ��������Գ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                paySelfAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * ��������Գ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                paySelfNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * �տ�帶��ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                recPayAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * �տ�帶���ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                recPayNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * �տ�����Գ�ָ��������
                 * @param assignSettleParam  ָ���������
                 * @return ���㷵�ؽ��
                 */
                recSelfAssignSettle(assignSettleParam:kd.sdk.fi.arapcommon.param.AssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
                /**
                 * �տ�����Գ��ָ��������
                 * @param noAssignSettleParam  ��ָ���������
                 * @return ���㷵�ؽ��
                 */
                recSelfNoAssignSettle(noAssignSettleParam:kd.sdk.fi.arapcommon.param.NoAssignSettleParam):kd.sdk.fi.arapcommon.param.SettleResult;
            }
            interface SettleServiceSDKHelper_C extends SettleServiceSDKHelper_S {
                new():SettleServiceSDKHelper;
            }
            interface SettleServiceSDKHelper$ {
            }
            type SettleServiceSDKHelper_T = SettleServiceSDKHelper_S & SettleServiceSDKHelper$;
            interface SettleServiceSDKHelper extends SettleServiceSDKHelper_T {
            }
        }
        namespace kd.sdk.fi.arapcommon.param{
            interface NoAssignSettleParam_S {
            }
            type NoAssignSettleParam_ST = BaseSettleParam_S & $.java.io.Serializable & NoAssignSettleParam_S;
            interface NoAssignSettleParam_C extends NoAssignSettleParam_ST {
                new():NoAssignSettleParam;
                /**
                 * ���췽��
                 * @param orgId  ��֯id
                 * @param settleType   ���㷽ʽ
                 */
                new(orgId:long,settleType:string):NoAssignSettleParam;
            }
            interface NoAssignSettleParam$ {
                getAsstBillIds():$.java.util.Set;
                getMainBillIds():$.java.util.Set;
                isMainOp():boolean;
                isOnlyByBotp():boolean;
                setAsstBillIds(asstBillIds:$.java.util.Set):void;
                setMainBillIds(mainBillIds:$.java.util.Set):void;
                setMainOp(mainOp:boolean):void;
                setOnlyByBotp(onlyByBotp:boolean):void;
            }
            type NoAssignSettleParam_T = BaseSettleParam & $.java.io.Serializable & NoAssignSettleParam_S & NoAssignSettleParam$;
            interface NoAssignSettleParam extends NoAssignSettleParam_T {
            }
            interface AssignSettleParam_S {
            }
            type AssignSettleParam_ST = BaseSettleParam_S & AssignSettleParam_S;
            interface AssignSettleParam_C extends AssignSettleParam_ST {
                new():AssignSettleParam;
                /**
                 * ���췽��
                 * @param orgId  ��֯id
                 * @param settleType  ���㷽ʽ
                 * @param settleDetailType  ��ϸ���㷽ʽ��������ͷ���߰���¼��
                 */
                new(orgId:long,settleType:string,settleDetailType:string):AssignSettleParam;
            }
            interface AssignSettleParam$ {
                getAsstDetailParamList():$.java.util.List;
                getMainDetailParamList():$.java.util.List;
                getSettleDetailType():string;
                setAsstDetailParamList(asstDetailParamList:$.java.util.List):void;
                setMainDetailParamList(mainDetailParamList:$.java.util.List):this;
                setSettleDetailType(settleDetailType:string):void;
            }
            type AssignSettleParam_T = BaseSettleParam & AssignSettleParam_S & AssignSettleParam$;
            interface AssignSettleParam extends AssignSettleParam_T {
            }
            interface BaseSettleParam_S {
            }
            type BaseSettleParam_ST = $.java.io.Serializable & BaseSettleParam_S;
            interface BaseSettleParam_C extends BaseSettleParam_ST {
                new():BaseSettleParam;
            }
            interface BaseSettleParam$ {
                getAsstEntity():string;
                getMainEntity():string;
                getMatchServiceClass():string;
                getOrgId():long;
                getSettleDate():Date;
                getSettleType():string;
                isClaim():boolean;
                isContainPre():boolean;
                isDiffCurrencySettle():boolean;
                isLockWait():boolean;
                isMatchDiffCurrency():boolean;
                isNotNeedLock():boolean;
                isOnlyByConBill():boolean;
                isOnlyByCoreBill():boolean;
                isRefundAndRenote():boolean;
                isRefundByBotp():boolean;
                setAsstEntity(asstEntity:string):void;
                setClaim(claim:boolean):void;
                setContainPre(containPre:boolean):void;
                setDiffCurrencySettle(diffCurrencySettle:boolean):void;
                setLockWait(lockWait:boolean):void;
                setMainEntity(mainEntity:string):void;
                setMatchDiffCurrency(matchDiffCurrency:boolean):void;
                setMatchServiceClass(matchServiceClass:string):void;
                setNotNeedLock(notNeedLock:boolean):void;
                setOnlyByConBill(onlyByConBill:boolean):void;
                setOnlyByCoreBill(onlyByCoreBill:boolean):void;
                setOrgId(orgId:long):void;
                setRefundAndRenote(refundAndRenote:boolean):void;
                setRefundByBotp(refundByBotp:boolean):void;
                setSettleDate(settleDate:Date):void;
                setSettleType(settleType:string):void;
            }
            type BaseSettleParam_T = $.java.io.Serializable & BaseSettleParam_S & BaseSettleParam$;
            interface BaseSettleParam extends BaseSettleParam_T {
            }
            interface SettleResult_S {
            }
            type SettleResult_ST = $.java.io.Serializable & SettleResult_S;
            interface SettleResult_C extends SettleResult_ST {
                new():SettleResult;
            }
            interface SettleResult$ {
                getData():any;
                getSettleRecordPKs():$.java.util.List;
                setData(data:any):void;
                setSettleRecordPKs(settleRecordPKs:$.java.util.List):void;
            }
            type SettleResult_T = $.java.io.Serializable & SettleResult_S & SettleResult$;
            interface SettleResult extends SettleResult_T {
            }
        }
        namespace kd.sdk.fi.bd.service.balance{
            interface QueryParam_S {
            }
            type QueryParam_ST = $.java.io.Serializable & QueryParam_S;
            interface QueryParam_C extends QueryParam_ST {
                new():QueryParam;
            }
            interface QueryParam$ {
                getAccountFilter():$.kd.bos.orm.query.QFilter;
                getAccountVersionPeriodId():long;
                getAssGrpIds():$.java.util.Set;
                getCurrencyIds():long[];
                getCustomFilter():$.java.util.List;
                getMeasureUnitIds():long[];
                isAddAmountFilter():boolean;
                isOnlyLeafAcctBal():boolean;
                isSpecialAccount():boolean;
                isSubstractPL():boolean;
                isSumAssgrp():boolean;
                isZeroAmtNoDisplay():boolean;
                isZeroBalNoDisplay():boolean;
                setAccountFilter(accountFilter:$.kd.bos.orm.query.QFilter):void;
                setAccountVersionPeriodId(accountVersionPeriodId:long):void;
                setAddAmountFilter(isAddAmountFilter:boolean):void;
                setAssGrpIds(assGrpIds:$.java.util.Set):void;
                setCurrencyIds(currencyIds:long[]):void;
                setCustomFilter(customFilter:$.java.util.List):void;
                setMeasureUnitIds(measureUnitIds:long[]):void;
                setOnlyLeafAcctBal(isOnlyLeafAcctBal:boolean):void;
                setSpecialAccount(isSpecialAccount:boolean):void;
                setSubstractPL(isSubstractPL:boolean):void;
                setSumAssgrp(sumAssgrp:boolean):void;
                setZeroAmtNoDisplay(zeroAmtNoDisplay:boolean):void;
                setZeroBalNoDisplay(zeroBalNoDisplay:boolean):void;
            }
            type QueryParam_T = $.java.io.Serializable & QueryParam_S & QueryParam$;
            interface QueryParam extends QueryParam_T {
            }
            interface BalanceExecutorSdk_S {
                /**
                 * ���ݲ�����ѯ��Ŀ����,���ز�������������DataSet
                 *
                 * @param selector ��Ҫ��ѯ���ֶ� ����"org,booktype,account,assgrp,endlocal"  �����ѯ�ֶΰ���period��ֻ��ѯ������Χ���з�����Ŀ�Ŀ�������
                 *
                 * @param orgIds ������֯id
                 * @param bookTypeId �˲�����id
                 * @param accountTableId ��Ŀ��id
                 * @param beginPeriodId ��ѯ�Ŀ�ʼ�ڼ�
                 * @param endPeriodId ��ѯ�Ľ����ڼ� ��ѯһ���ڼ���������뿪ʼ�ڼ�һ�¼���
                 * @param param ������ѯ����
                 *
                 * @return ��Ŀ���Dataset����
                 *
                 * <pre> <code>
                 * ����ʾ��:
                 *
                 * ������ز���
                 *  String selector="org,booktype,account,assgrp,endlocal";
                 *  Long[] orgIds=new Long[]{0001};
                 *  long bookTypeId =1L;
                 *  long accountTableId = 1L;
                 *  long beginPeriodId = 120220080L;
                 *  long endPeriodId =120220080L;
                 *  QueryParam param =new QueryParam();
                 *  ���ýӿڲ�ѯ ���Է��ص�DataSet���д���
                 *  try(DataSet ds= kd.sdk.fi.bd.service.balance.BalanceExecutorSdk.getBalance(selector,orgIds,bookTypeId,accountTableId,beginPeriodId,endPeriodId,param)){
                 *     for(Row row:ds){
                 *         BigDecimal endlocal=row.getBigDecimal("endlocal");
                 *         ...
                 *     }
                 *  };
                 *
                 * </code></pre>
                 */
                getBalance(selector:string,orgIds:long[],bookTypeId:long,accountTableId:long,beginPeriodId:long,endPeriodId:long,param:QueryParam):$.kd.bos.algo.DataSet;
            }
            interface BalanceExecutorSdk_C extends BalanceExecutorSdk_S {
                new():BalanceExecutorSdk;
            }
            interface BalanceExecutorSdk$ {
            }
            type BalanceExecutorSdk_T = BalanceExecutorSdk_S & BalanceExecutorSdk$;
            interface BalanceExecutorSdk extends BalanceExecutorSdk_T {
            }
        }
        namespace kd.sdk.fi.bd.service.cdc{
            interface CDCServiceGLIntegratorSDK_S {
                /**
                 * ����ƾ֤ժҪ����
                 * <p>
                 * ƾ֤���������ύ������ͬ��ES���ڲ��첽ʵ�֣������ע���
                 *
                 * @param operationType �䶯����
                 * @param voucherIdColl ƾ֤ID����
                 * @return �����ɹ���
                 */
                raiseCDCEvent(operationType:CDCRecOperationTypeEnum,voucherIdColl:$.java.util.Collection):boolean;
            }
            interface CDCServiceGLIntegratorSDK_C extends CDCServiceGLIntegratorSDK_S {
                new():CDCServiceGLIntegratorSDK;
            }
            interface CDCServiceGLIntegratorSDK$ {
                /**
                 * ע��ƾ֤ժҪ�䶯��¼
                 * <p>
                 * ƾ֤����������,ƾ֤����ִ����ϣ�����ͬ��ע��ƾ֤�䶯��¼
                 *
                 * @param operationType �䶯����
                 * @param voucherIdColl ƾ֤ID����
                 * @return ע��ɹ���
                 */
                registerCDCChangedRecord(operationType:CDCRecOperationTypeEnum,voucherIdColl:$.java.util.Collection):boolean;
            }
            type CDCServiceGLIntegratorSDK_T = CDCServiceGLIntegratorSDK_S & CDCServiceGLIntegratorSDK$;
            interface CDCServiceGLIntegratorSDK extends CDCServiceGLIntegratorSDK_T {
            }
            enum CDCRecOperationTypeEnum {
                New,
                Update,
                Delete
            }
        }
        namespace kd.sdk.fi.cal.extpoint.bal{
            interface CalBalDataSDK_S {
                getBalDataForCache(qFilter:$.kd.bos.orm.query.QFilter):string;
            }
            interface CalBalDataSDK_C extends CalBalDataSDK_S {
                new():CalBalDataSDK;
            }
            interface CalBalDataSDK$ {
            }
            type CalBalDataSDK_T = CalBalDataSDK_S & CalBalDataSDK$;
            interface CalBalDataSDK extends CalBalDataSDK_T {
            }
        }
        namespace kd.sdk.fi.cal.extpoint.calintime{
            interface ICalMoveGroupCost_S {
            }
            interface ICalMoveGroupCost$ {
                /**
                 *  @function ����ؼ���ʵʱ�ƶ�����ɱ��Ӽ۴���
                 *  @param acctRecIdEleCostMap
                 *  ���key���ɱ��˲�ID+ "|" + �ɱ���¼��¼id + "|" + �ɱ���Ҫ��ID
                 *  �����key���ɱ��˲�ID+ "|" + �ɱ���¼��¼id + "|" + ��materialcost�������ϳɱ���
                 *   �� ��processcost�����ӹ��ѣ� ��  ��fee�������ã� �� ��manufacturecost����������ã� ��  ��RESOURCE������Դ���ã�
                 *  value����Ӧ���
                 *  @param entity ���ҵ��������
                 *  @param bizBillIds ҵ�񵥾�id
                 *  @return   void
                 * <pre><code>
                 *  package kd.sdk.fi.cal.extpoint.calintime;
                 *
                 *  import kd.bos.algo.DataSet;
                 *  import kd.bos.algo.Row;
                 *  import kd.bos.orm.query.QCP;
                 *  import kd.bos.orm.query.QFilter;
                 *  import kd.bos.servicehelper.QueryServiceHelper;
                 *
                 *  import java.math.BigDecimal;
                 *  import java.util.HashSet;
                 *  import java.util.Map;
                 *  import java.util.Set;
                 *
                 *  public class CalMoveGroupCostTest implements ICalMoveGroupCost{
                 *      @Override
                 *      public void doCalGroupCostEx(Map<String, BigDecimal> acctRecIdEleCostMap, String entity, Set<Long> bizBillIds) {
                 *          String splitStr = "|";
                 *          DataSet costRecordDs = getCostRecordDs(acctRecIdEleCostMap, bizBillIds);
                 *          for (Row row : costRecordDs) {
                 *              Long costAcctId = row.getLong("costaccount");
                 *              Long costRecEid = row.getLong("entryid");
                 *              Long costSubelEment = row.getLong("costsubelement");
                 *              //key���ɱ��˲�ID+ "|" + �ɱ���¼��¼id + "|" + �ɱ���Ҫ��ID��value����Ӧ���
                 *              String key;
                 *              //�ɱ��˲�-��������-���÷����ת
                 *              if(row.getBoolean("calbycostelement")){
                 *                  key = costAcctId + splitStr + costRecEid + splitStr + costSubelEment;
                 *              }else {
                 *                  //��������ϳɱ���������һ��Ǯ ���ϳɱ���materialcost���ӹ��ѣ�processcost�����ã�fee��������ã�manufacturecost����Դ���ã�resource��
                 *                  key = costAcctId + splitStr + costRecEid + splitStr + "materialcost";
                 *              }
                 *              //Դ���ɱ�
                 *              BigDecimal srcCost = acctRecIdEleCostMap.get(key);
                 *              if(srcCost == null){
                 *                  continue;
                 *              }
                 *              BigDecimal baseqty = row.getBigDecimal("baseqty");
                 *              //��������һ��Ǯ
                 *              BigDecimal addCost = srcCost.add(BigDecimal.ONE.multiply(baseqty));
                 *              //��������
                 *              acctRecIdEleCostMap.put(key, addCost);
                 *          }
                 *      }
                 *
                 *      private DataSet getCostRecordDs(Map<String, BigDecimal> acctRecIdEleCostMap, Set<Long> bizBillIds) {
                 *          //�ɱ��˲�id
                 *          Set<Long> costAcctIds = new HashSet<>(16);
                 *          //�ɱ���¼��¼id
                 *          Set<Long> recEids = new HashSet<>(16);
                 *          for (Map.Entry<String, BigDecimal> entry : acctRecIdEleCostMap.entrySet()) {
                 *              String key = entry.getKey();
                 *              String[] keySplit = key.split("\\|");
                 *              //�ɱ��˲�
                 *              String costAcctIdStr = keySplit[0];
                 *              //�ɱ���¼��¼id
                 *              String calEidStr = keySplit[1];
                 *              costAcctIds.add(Long.valueOf(costAcctIdStr));
                 *              recEids.add(Long.valueOf(calEidStr));
                 *          }
                 *          //ҵ�񵥾�id����浥��id��
                 *          QFilter bizBillIdFilter = new QFilter("bizbillid", QCP.in, bizBillIds);
                 *          QFilter eIdFilter = new QFilter("entry.id", QCP.in, recEids);
                 *          String sels = "bizentityobject,bizbillid,costaccount,entry.calentryid as calentryid,entry.id as entryid,entry.baseqty as baseqty,entry.subentrycostelement.costsubelement as costsubelement,costaccount.calpolicy.calbycostelement as calbycostelement";
                 *          //��ѯ�ɱ���¼��Ϣ
                 *          DataSet costRecordDs = QueryServiceHelper.queryDataSet(this.getClass().getName(),
                 *                  "cal_costrecord_subentity", sels, new QFilter[]{bizBillIdFilter, eIdFilter}, null);
                 *          return costRecordDs;
                 *      }
                 *
                 *  }
                 *
                 *  </code></pre>
                 */
                doCalGroupCostEx(acctRecIdEleCostMap:$.java.util.Map,entity:string,bizBillIds:$.java.util.Set):void;
            }
            type ICalMoveGroupCost_T = ICalMoveGroupCost_S & ICalMoveGroupCost$;
            interface ICalMoveGroupCost extends ICalMoveGroupCost_T {
            }
        }
        namespace kd.sdk.fi.cal.extpoint.costrecord{
            interface IQueueTypeMatch_S {
            }
            interface IQueueTypeMatch$ {
                /**
                 *  ��ȡ��������
                 *  @param costAccountId  �ɱ��˲�ID
                 *  @param bizEntityObject ҵ�����
                 *  @param billId  ҵ�񵥾�ID
                 *  @return queueType: "0"Ϊ������У�"1"Ϊ�������У���������Ч
                 *
                 *  <p>��չʾ������
                 *  <pre><code>
                 *  package kd.sdk.fi.cal.extpoint.costrecord;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.bos.servicehelper.QueryServiceHelper;
                 * import kd.bos.util.StringUtils;
                 * import kd.sdk.fi.cal.extpoint.costrecord.IQueueTypeMatch;
                 *
                 * public class SrcBill4QueuePlugin_Test implements IQueueTypeMatch {
                 *
                 * 	public String getQueueType(Long costAccountId, String bizEntityObject, Long billId) {
                 * 		//�����۳��ⵥ ���� �˲�������ָ���˲���ֱ�ӷ���
                 * 		if(!bizEntityObject.equals("im_saloutbill") || costAccountId != 88888888L){
                 * 			return null;
                 * 		}
                 * 		QFilter q = new QFilter("bizbillid", "=", billId);
                 * 		q.and("costaccount.ismainaccount", "=", true);
                 * 		DynamicObject info = QueryServiceHelper.queryOne("cal_costrecord", "id,period,entry.srcbillentity,entry.srcbillid", q.toArray());
                 * 		//û�гɱ���¼���������жϲ���߼���ֱ�ӷ���
                 * 		if(info == null){
                 * 			return null;
                 * 		}
                 * 		String srcMainEntity = info.getString("entry.srcbillentity");
                 * 		//��Դ������Ϊ�գ�ֱ�ӷ���
                 * 		if(StringUtils.isEmpty(srcMainEntity)){
                 * 			return null;
                 * 		}
                 * 		long period = info.getLong("period");
                 * 		long srcBillId = info.getLong("entry.srcbillid");
                 * 		DynamicObject srcInfo = null;
                 * 		//Դ��������ͬ���������۳��ⵥ
                 * 		if(bizEntityObject.equals(srcMainEntity)){
                 * 			q = new QFilter("bizbillid", "=", srcBillId);
                 * 			q.and("costaccount.ismainaccount", "=", true);
                 * 			//Դ��
                 * 			srcInfo = QueryServiceHelper.queryOne("cal_costrecord", "id,period,entry.srcbillentity,entry.srcbillid", q.toArray());
                 * 			//VMI�������۳��ⵥԴ���������۳��ⵥΪ��������������
                 * 			if(srcInfo == null){
                 * 				return null;
                 * 			}
                 * 			long srcPeriod = srcInfo.getLong("period");
                 * 			//Դ������=���۳��ⵥ��Դ��Ϊ���ڣ��ڼ䲻�ȣ�
                 * 			if(period != srcPeriod){
                 * 				//����Ϊ�������
                 * 				return "0";
                 * 			}
                 * 		}
                 * 		return null;
                 * 	}
                 * }
                 * </code></pre>
                 */
                getQueueType(costAccountId:long,bizEntityObject:string,billId:long):string;
            }
            type IQueueTypeMatch_T = IQueueTypeMatch_S & IQueueTypeMatch$;
            interface IQueueTypeMatch extends IQueueTypeMatch_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.claimbill{
            interface IClaimcenterHote_S {
                readonly logger:$.kd.bos.logging.Log;
            }
            interface IClaimcenterHote$ {
                setNewRecBillField?(recBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IClaimcenterHote_T = IClaimcenterHote_S & IClaimcenterHote$;
            interface IClaimcenterHote extends IClaimcenterHote_T {
            }
            interface IClaimbillFilter_S {
            }
            interface IClaimbillFilter$ {
                /**
                 * �տ����촦������������չ
                 * �������촦����¼��ѡ����ĵ���F7ҳ�����������չ
                 *
                 * @param lfp  �������������ڶ����Զ�����չ
                 * @param dataModel  ���촦������ģ�ͣ����ڶ�����ȡ��ǰ���촦����ҳ������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.fi.cas.formplugin.recclaim.claimhandle
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import kd.bos.entity.datamodel.IDataModel;
                 * import kd.bos.list.ListFilterParameter;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.fi.cas.consts.RecClaimBillModel;
                 * import kd.sdk.fi.cas.extpoint.claimbill.IClaimbillFilter;
                 *
                 * public class ClaimbillFilter implements IClaimbillFilter
                 *
                 *      public void setIFilters(ListFilterParameter lfp, IDataModel dataModel) {
                 *         // ��ȡ��ǰ�����¼���к�
                 *         int currrow = dataModel.getEntryCurrentRowIndex(RecClaimBillModel.ENTRYENTITY);
                 *         // ��ȡ��¼�к��ĵ�������
                 *         String coreBillType = (String) dataModel.getValue(RecClaimBillModel.E_COREBILLTYPE, currentRowIndex);
                 *         // ��ȡ��ǰ����ʵ��
                 *         DynamicObject claimBill = dataModel.getDataEntity();
                 *         // ͨ�����촦����������Զ����������
                 *         lfp.setFilter(new QFilter("accountingorg", QCP.equals, claimBill.getString("billstatus")));
                 *      }
                 * }
                 * </pre></code>
                 * </p>
                 */
                setIFilters(lfp:$.kd.bos.list.ListFilterParameter,dataModel:$.kd.bos.entity.datamodel.IDataModel):void;
                /**
                 * �տ����쵥����������չ���,���ڶ�����Ŀ��չ��������
                 * @param lfp �б������������
                 * @param claimBill ҳ�浥��
                 * @return void
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    import kd.bos.dataentity.entity.DynamicObject;
                 *    import kd.bos.list.ListFilterParameter;
                 *
                 *    public class ClaimbillFilter implements IClaimbillFilter {
                 *        public void setIFilters(ListFilterParameter lfp, DynamicObject claimBill) {
                 *            IClaimbillFilter.super.setIFilters(lfp, claimBill);
                 *            lfp.setFilter(new QFilter("accountingorg", QCP.equals, claimBill.getString("billstatus")));
                 *        }
                 *    }
                 *
                 *    </code></pre>
                 */
                setIFilters(lfp:$.kd.bos.list.ListFilterParameter,claimBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IClaimbillFilter_T = IClaimbillFilter_S & IClaimbillFilter$;
            interface IClaimbillFilter extends IClaimbillFilter_T {
            }
            interface BankAutoMatchCheck_S {
                readonly logger:$.kd.bos.logging.Log;
            }
            interface BankAutoMatchCheck$ {
                setBankAutoMatchCheck?(ruleList:$.java.util.List):void;
            }
            type BankAutoMatchCheck_T = BankAutoMatchCheck_S & BankAutoMatchCheck$;
            interface BankAutoMatchCheck extends BankAutoMatchCheck_T {
            }
            interface IClaimHandlePluginSDK_S {
            }
            interface IClaimHandlePluginSDK$ {
                /**
                 *  �������ݼ�����Ϊ����3����idValue�����е����ݸ�ֵ��rowData�У��൱�ڸ������¼���ݽ��и�ֵ
                 *  @param idValue ��Ų�ѯ��id����Ӧ���ݼ�
                 *  @param rowData ��¼���ݶ���
                 *
                 * <p>��չʾ������
                 * <pre><code>
                 *       public void dealResult(Map<Long, Map<String, Object>> idValue, DynamicObject rowData) {
                 *                 Long id = (Long)rowData.get("e_corebillid");
                 *                 rowData.set("e_fee", idValue.get(id).get("e_fee"));
                 *      }</code></pre>
                 */
                dealResult(idValue:$.java.util.Map,rowData:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 *  ������ݼ�����Ϊ����2���������ѡ��ĺ��ĵ��ݸ���idȥ��ȡ����ͷ���Ի��������ԣ��洢��idValue���Ա㲽��3ʹ��
                 *  @param coreBillType ���ĵ�������
                 *  @param ids ѡ��ĺ��ĵ���id
                 *  @param idValue ��Ų�ѯ��id����Ӧ���ݼ�
                 *
                 * <p>��չʾ������
                 * <pre><code>
                 *      public void fillResult(String coreBillType, Set<Long> ids, Map<Long, Map<String, Object>> idValue) {
                 *          DynamicObject obj = QueryServiceHelper.queryOne(coreBillType,"e_fee",new QFiter("id",QCP.in,ids));
                 *          Map<String,Object> s = new HashMap<>();
                 *          s.put("e_fee", obj.get("e_fee"));
                 *          idValue.put(obj.getLong("id"),s);
                 *      }</code></pre>
                 */
                fillResult(coreBillType:string,ids:$.java.util.Set,idValue:$.java.util.Map):void;
                /**
                 *  ��Ϊ����1���������Բ�ѯ���������ݽ��ں��沽��ʹ��
                 *  @param coreBillType ���ĵ�������
                 *  @param entryEntityKey ��¼��ʶ
                 *  @param srcSelectField ��Ʒԭʼ��ѯ����
                 *  @return ��Ӷ�����ѯ����
                 *
                 * <p>��չʾ������
                 *  <pre><code>
                 *  pubilc String getSelectFieldWithEntry(String coreBillType, String entryEntityKey,String srcSelectField){
                 *      String field = ",amt,entry.e_fee";// ���Ը���coreBillType��entryEntityKey���ض�����Ҫ��ѯ������
                 *      return field;
                 *  }</code></pre>
                 */
                getSelectFieldWithEntry(coreBillType:string,entryEntityKey:string,srcSelectField:string):$.java.util.Set;
            }
            type IClaimHandlePluginSDK_T = IClaimHandlePluginSDK_S & IClaimHandlePluginSDK$;
            interface IClaimHandlePluginSDK extends IClaimHandlePluginSDK_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.closeperiod{
            interface ICheckArchiveBillTypeInterface_S {
            }
            interface ICheckArchiveBillTypeInterface$ {
                /**
                 *  ��ĩ���˷�����ʱ��ҪУ���Ƿ��Ѿ��鵵�ĵ������ͣ��ѹ鵵�Ĳ���������
                 *  Ĭ���������ռ��˺��ֽ��ռ������ֵ������ͣ�������Ҫ�ڴ˽ӿ�����չ���
                 *
                 *  <p>��չʾ������</p>
                 *  <pre><code>
                 *  package kd.sdk.fi.cas.extpoint.closeperiod;
                 *
                 *  import java.util.Arrays;
                 *  import java.util.List;
                 *
                 *  public class CheckArchiveBillType implements ICheckArchiveBillTypeInterface{
                 *  @Override
                 *    public List<String> getOtherBillTypes() {
                 *        // ������Ҫ�ж��Ƿ��Ѿ��鵵�ĵ�������
                 *        return Arrays.asList("��������һ","��������һ");
                 *    }
                 * }</code></pre>
                 */
                getOtherBillTypes():$.java.util.List;
            }
            type ICheckArchiveBillTypeInterface_T = ICheckArchiveBillTypeInterface_S & ICheckArchiveBillTypeInterface$;
            interface ICheckArchiveBillTypeInterface extends ICheckArchiveBillTypeInterface_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.journal{
            interface IJournalVoucherBookInterface_S {
            }
            interface IJournalVoucherBookInterface$ {
                /**
                 * �ֽ��ռ���-ƾ֤������չ
                 * @return  extFieldName ƾ֤��¼�ֽ��˻�id��չ�ֶα�ʶ
                 *
                 * <p>��չʾ������
                 * <pre><code>
                 * package kd.fi.cas.helper;
                 *
                 * import kd.sdk.fi.cas.extpoint.journal.IJournalVoucherBookInterface;
                 *
                 * public class voucherBookCashAccountExtPlugin implements IJournalVoucherBookInterface {
                 *     public String cashJournalBookExt() {
                 *         return "kdtest_accountCashId_ext";
                 *     }
                 * }
                 * </code></pre>
                 */
                cashJournalBookExt?():string;
            }
            type IJournalVoucherBookInterface_T = IJournalVoucherBookInterface_S & IJournalVoucherBookInterface$;
            interface IJournalVoucherBookInterface extends IJournalVoucherBookInterface_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.noticeclaim{
            interface INoticeClaimSchemeInterface_S {
            }
            interface INoticeClaimSchemeInterface$ {
                /**
                 * ֪ͨ���������չ
                 * ��չ����ʱ����
                 * 1.��֪ͨ���򡿽���ѡ���Զ��塱ʱ������չ
                 * 2.�����֪ͨ���족�����Ҽ�⵽δƥ�䵽֪ͨ������ڡ�֪ͨ���족����������ѡ���Զ��塱ʱ������չ
                 *
                 * @param noticeObjectMap
                 * @return Map<String, Object> key:"userids", value:userIdList
                 *
                 * <p>��չʾ������
                 * <pre><code> package kd.fi.cas.formplugin.recclaim.extpoint;
                 *
                 * import kd.sdk.fi.cas.extpoint.noticeclaim.INoticeClaimSchemeInterface;
                 *
                 * import java.util.ArrayList;
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class NoticeClaimSchemesDefaultExt implements INoticeClaimSchemeInterface {
                 *
                 *     public Map<String, Object> noticeObjectExt(Map<String, Object> noticeObjectMap) {
                 *         // �Զ���֪ͨ�����û�ID
                 *         List<Object> userIds = new ArrayList<>(2);
                 *         userIds.add(1540672005563544576L);
                 *         noticeObjectMap.put("userids", userIds);
                 *
                 *         return noticeObjectMap;
                 *     }
                 * }</code></pre>
                 */
                noticeObjectExt?(noticeObjectMap:$.java.util.Map):$.java.util.Map;
            }
            type INoticeClaimSchemeInterface_T = INoticeClaimSchemeInterface_S & INoticeClaimSchemeInterface$;
            interface INoticeClaimSchemeInterface extends INoticeClaimSchemeInterface_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.paybill{
            interface IGenBankBillSDKService_S {
            }
            interface IGenBankBillSDKService$ {
                /**
                 * @param entityName ����ʵ����
                 * @param billList ҵ�񵥾ݼ���
                 * @return Map< Long, Map< String, Object>>: key->���е���id��value->�����ֶ�����ֵ�ļ�ֵ��
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.ext.extpoint.committobe;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 *
                 * import java.util.HashMap;
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class GenBankBillService implements IGenBankBillSDKService{
                 *
                 *     public Map< Long, Map< String, Object>> extFillBankBill(String entityName, List< DynamicObject> billList) {
                 *         Map< Long, Map< String, Object>> result = new HashMap<>();
                 *         switch (entityName){
                 *             case "���":
                 *                 Map< String,Object> prop = new HashMap<>();
                 *                 for(DynamicObject bill:billList) {
                 *                     prop.put("exfield", "�����ֶ�");
                 *                     result.put(bill.getLong("id"), prop);
                 *                 }
                 *                 break;
                 *         }
                 *         return result;
                 *     }
                 * }</code></pre>
                 */
                extFillBankBill(entityName:string,billList:$.java.util.List):$.java.util.Map;
            }
            type IGenBankBillSDKService_T = IGenBankBillSDKService_S & IGenBankBillSDKService$;
            interface IGenBankBillSDKService extends IGenBankBillSDKService_T {
            }
            interface IPayeeBankInfoFilter_S {
            }
            interface IPayeeBankInfoFilter$ {
                /**
                 * ���������տ��˺Ź���������չ���
                 * @param lfp �б������������
                 * @param payBill ҳ�浥��
                 * @return void
                 *
                 * <b>��չʾ������
                 *        <pre><code>
                 *          import kd.bos.dataentity.entity.DynamicObject;
                 *          import kd.bos.list.ListFilterParameter;
                 *
                 *          public class PayeeBankInfoFilter implements IPayeeBankInfoFilter {
                 *
                 *              public void setIFilters(ListFilterParameter lfp, DynamicObject payBill) {
                 *                  IPayeeBankInfoFilter.super.setIFilters(lfp, payBill);
                 *                  lfp.setFilter(new QFilter("accountingorg", QCP.equals, payBill.getString("billstatus")));
                 *              }
                 *
                 *          }
                 *
                 *        </code></pre>
                 */
                setIFilters?(lfp:$.kd.bos.list.ListFilterParameter,payBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IPayeeBankInfoFilter_T = IPayeeBankInfoFilter_S & IPayeeBankInfoFilter$;
            interface IPayeeBankInfoFilter extends IPayeeBankInfoFilter_T {
            }
            interface IPaybillWriteback_S {
            }
            interface IPaybillWriteback$ {
                /**
                 * �����д������չ���Է���,���ڶ�����Ŀ������չ�ֶη�д
                 *
                 * @param payBillId ���id
                 * @return Map<Long, Map < String, Object>> key:��¼ID value:��չ���� (�Լ�ֵ����ʽ����)
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *        public class PaybillWritebackImpl implements IPaybillWriteback{
                 *           public Map<Long, Map<String, Object>> loadExtendInfo(Long payBillId) {
                 *                Map<Long, Map<String, Object>> extendInfoMap = new HashMap<>();
                 *                try {
                 *                DynamicObject payWriteConfig = ExtendConfigHelper.getExtendConfig(ExtendConfigHelper.CONFIG_WRITEBACK_PAY);
                 *                if(payWriteConfig != null && StringUtils.isNotBlank(payWriteConfig.getString("configvalue"))){
                 *                    IPaybillWriteback iPaybillWriteback = (IPaybillWriteback) Class.forName(payWriteConfig.getString("configvalue")).newInstance();
                 *                    extendInfoMap.putAll(iPaybillWriteback.loadExtendInfo(payBillId));
                 *                }
                 *                } catch (Exception e) {
                 *                    logger.info("������չ�����쳣��%s",e.toString());
                 *                }
                 *                return extendInfoMap;
                 *            }
                 *        }
                 *    </code></pre>
                 */
                loadExtendInfo(payBillId:long):$.java.util.Map;
            }
            type IPaybillWriteback_T = IPaybillWriteback_S & IPaybillWriteback$;
            interface IPaybillWriteback extends IPaybillWriteback_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.paysche{
            interface IPayScheSecondaryFieldFill_S {
            }
            interface IPayScheSecondaryFieldFill$ {
                /**
                 * ��Ʊ�ص�����
                 * @param secondaryFields �����ų̵��´��Ķ����ֶ���ֵ Map ����
                 * @param paybill �������̬����
                 * @return
                 *
                 * <p>��չʾ������
                 *         <pre><code>
                 *         import kd.bos.dataentity.entity.DynamicObject;
                 *         import kd.bos.ext.fi.botp.consts.PaymentBillModel;
                 *         import java.util.Map;
                 *         public class IPayScheSecondaryFieldFill_Demo implements IPayScheSecondaryFieldFill {
                 *             public void fillSecondaryFields(Map<String, Object> secondaryFields, DynamicObject paybill) {
                 *                 IPayScheSecondaryFieldFill.super.fillSecondaryFields(secondaryFields, paybill);
                 *                 paybill.set(PaymentBillModel.HEAD_USAGE, secondaryFields.get("a1"));
                 *             }
                 *         }
                 *         </code></pre>
                 */
                fillSecondaryFields?(secondaryFields:$.java.util.Map,paybill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IPayScheSecondaryFieldFill_T = IPayScheSecondaryFieldFill_S & IPayScheSecondaryFieldFill$;
            interface IPayScheSecondaryFieldFill extends IPayScheSecondaryFieldFill_T {
            }
        }
        namespace kd.sdk.fi.cas.extpoint.recbill{
            interface IAgentPayField_S {
            }
            interface IAgentPayField$ {
                setAgentPayField?(info:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IAgentPayField_T = IAgentPayField_S & IAgentPayField$;
            interface IAgentPayField extends IAgentPayField_T {
            }
            interface IRecbillFilter_S {
            }
            interface IRecbillFilter$ {
                /**
                 * �տ����������չ���,���ڶ�����Ŀ��չ��������
                 * @param lfp �б������������
                 * @param recBill ҳ�浥��
                 * @return void
                 *
                 * <b>��չʾ������
                 *    <pre><code>
                 *    import kd.bos.dataentity.entity.DynamicObject;
                 *    import kd.bos.list.ListFilterParameter;
                 *
                 *    public class RecbillFilter implements IRecbillFilter {
                 *        public void setIFilters(ListFilterParameter lfp, DynamicObject recBill) {
                 *            IRecbillFilter.super.setIFilters(lfp, recBill);
                 *            lfp.setFilter(new QFilter("accountingorg", QCP.equals, recBill.getString("billstatus")));
                 *        }
                 *    }
                 *
                 *    </code></pre>
                 */
                setIFilters?(lfp:$.kd.bos.list.ListFilterParameter,recBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IRecbillFilter_T = IRecbillFilter_S & IRecbillFilter$;
            interface IRecbillFilter extends IRecbillFilter_T {
            }
        }
        namespace kd.sdk.fi.dhc.extpoint{
            interface ISynchronizationDataExtPlugin_S {
            }
            interface ISynchronizationDataExtPlugin$ {
                /**
                 * �ӿڵ���ʱ������������ͬ������ǰ��ȡӳ�����ù�ϵʱ
                 *
                 * @param billType Ҫͬ�����ݵĵ������͡����뱨�˹���̨�ĵ��ݵ�ʵ�����
                 * @return �Զ������ӵ�{billType}����{dhc_mybilllist}��ͬ��ӳ���ϵ
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *     public class SynchronizationDataExtTestPlugin implements ISynchronizationDataExtPlugin {
                 *
                 *        @Override
                 *        public Map<String, String> addMappingFields(String billType) {
                 *            Map<String, String> mappingFields = new HashMap<>();
                 *            switch (billType) {
                 *                case "dhc_reimorder":
                 *                    mappingFields.put("extField", "biztype");
                 *                    break;
                 *                case "ssc_tallyapplybill":
                 *                    mappingFields.put("extField", "mainbiztype");
                 *                    mappingFields.put("entryentity.extEntryField", "tallyentryentity.bizdetailtype");
                 *                    break;
                 *                default:
                 *                    break;
                 *            }
                 *            return mappingFields;
                 *        }
                 *     }
                 *    </code></pre>
                 */
                addMappingFields?(billType:string):$.java.util.Map;
            }
            type ISynchronizationDataExtPlugin_T = ISynchronizationDataExtPlugin_S & ISynchronizationDataExtPlugin$;
            interface ISynchronizationDataExtPlugin extends ISynchronizationDataExtPlugin_T {
            }
        }
        namespace kd.sdk.fi.er.extpoint.ai{
            interface IAIReimburseService_S {
                readonly BIZCODE:string;
            }
            interface IAIReimburseService$ {
                /**
                 * ����view��model��ִ�У������޸�model���ڶ�����ֵ
                 * @param view
                 * @param params �Ի�ƽ̨�������Ĳ���
                 * @return
                 */
                afterCreateView?(view:$.kd.bos.form.IFormView,params:$.java.util.Map):void;
                /**
                 * ��ʼ��ʱ�޸�ʵ���ʶ��appid��
                 * @param plugin �������������Ĳ������
                 * @return
                 */
                initDataMember?(plugin:$.kd.bos.bill.AbstractBillWebApiPlugin,params:$.java.util.Map):void;
                /**
                 * ���ɷ��ظ��Ի�ƽ̨�Ľ�����󴥷��������޸Ľ����
                 * @param view
                 * @param responseModel ���ظ��Ի�ƽ̨�Ľ��
                 * @param params �Ի�ƽ̨�������Ĳ���
                 * @return
                 */
                responseModelExt?(view:$.kd.bos.form.IFormView,responseModel:any,params:$.java.util.Map):void;
            }
            type IAIReimburseService_T = IAIReimburseService_S & IAIReimburseService$;
            interface IAIReimburseService extends IAIReimburseService_T {
            }
        }
        namespace kd.sdk.fi.er.extpoint.dailyreimbursebill{
            interface IEntryMustInput_S {
            }
            interface IEntryMustInput$ {
                /**
                 * ����trueʱ��У���ʲ����˵��ʲ���¼���false��У��
                 * @param bill
                 * @return
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *    public class AssetentryMustInput implements IEntryMustInput {
                 *    @Override
                 *    public Boolean checkAssetEntryMustInput(DynamicObject bill) {
                 *    return Boolean.FALSE;
                 *    }
                 *    }
                 *    </code></pre>
                 */
                checkAssetEntryMustInput(bill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type IEntryMustInput_T = IEntryMustInput_S & IEntryMustInput$;
            interface IEntryMustInput extends IEntryMustInput_T {
            }
            interface ITripStandardControl_S {
            }
            interface ITripStandardControl$ {
                /**
                 * �ύʱ�Ƿ�Ҫ���ò��ñ�׼
                 * @param DynamicObject ����ҳ���ύʱ��Ԫ����
                 * @return boolean
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *            public class TripStandardControl implements ITripStandardControl {
                 *                    public Boolean controlTripStandard(DynamicObject dynamicObject) {
                 *                    return true;
                 *                }
                 *            }
                 *        </code></pre>
                 */
                controlTripStandard(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type ITripStandardControl_T = ITripStandardControl_S & ITripStandardControl$;
            interface ITripStandardControl extends ITripStandardControl_T {
            }
            interface ISuperClosedCallBack_S {
            }
            interface ISuperClosedCallBack$ {
                /**
                 * �ڱ�׼�߼��� ClosedCallBack ִ��֮����и��Դ���
                 */
                afterClosedCallBack?(clazz:$.java.lang.Class,actionId:string,isPc:boolean,...params:any[]):void;
                /**
                 * Ϊtrue��ִ�б�׼�߼���Ϊfalse����ִ����˷���������׼�߼�
                 * @return �Ƿ�ִ�б�׼��closedCallBack
                 */
                beforeClosedCallBack?(clazz:$.java.lang.Class,actionId:string,isPc:boolean,...params:any[]):boolean;
                /**
                 * @param clazz      ShowFrom ���ڵĲ��
                 * @param foromid    ShowFrom �����򿪵Ľ����ʶ
                 * @param isPc       �Ƿ�ΪPC��
                 * @param params     �ɱ䴫�Σ�
                 * @return �Ƿ�ִ�б�׼��view.showfrom; Ϊtrue��ִ�б�׼�߼���Ϊfalse����ִ����˷���������׼�߼�
                 */
                beforeShowFrom?(clazz:$.java.lang.Class,foromid:string,isPc:boolean,...params:any[]):boolean;
            }
            type ISuperClosedCallBack_T = ISuperClosedCallBack_S & ISuperClosedCallBack$;
            interface ISuperClosedCallBack extends ISuperClosedCallBack_T {
            }
            interface IWriteBackService_S {
            }
            interface IWriteBackService$ {
                /**
                 * ���ɸ����д
                 * @return Object ����ʵ��kd.fi.er.mservice.botp.writeback.AbstractWriteBackServcie
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *    public class WriteBackService implements IWriteBackService {
                 *    public Object getSelfBackService() {
                 *    return new DailyLoanBillWriteBackService();
                 *    }
                 *    }
                 *    </code></pre>
                 */
                getSelfBackService():any;
            }
            type IWriteBackService_T = IWriteBackService_S & IWriteBackService$;
            interface IWriteBackService extends IWriteBackService_T {
            }
            interface IInitBillInfo_S {
            }
            interface IInitBillInfo$ {
                /**
                 * ���ñ�������������ʼ��������Ϣ
                 * @param view ����ҳ��
                 * @return void
                 *
                 * <p>��չʾ������</p>
                 *       <pre><code>
                 *        public class InitBillInfo implements IInitBillInfo{
                 *            public void initBillInfo(IFormView view) {
                 *                if (view == null){
                 *                    return;
                 *                }
                 *                Long companyId = 1247657405731330048L;//���ݾ���ҵ���ȡ��˾id
                 *                view.getModel().setValue("company", companyId);
                 *            }
                 *        }
                 *       </code></pre>
                 */
                initBillInfo(view:$.kd.bos.form.IFormView):void;
            }
            type IInitBillInfo_T = IInitBillInfo_S & IInitBillInfo$;
            interface IInitBillInfo extends IInitBillInfo_T {
            }
            interface IPayAmountCal_S {
            }
            interface IPayAmountCal$ {
                /**
                 * @param view ���ݼ�����
                 * @return ���ֽ�� ��������Ϊkd.fi.er.business.daily.reimburse.AmountObject �����׼�߼���ȡ����
                 *
                 * <p>��չʾ������</p>
                 *          <pre><code>
                 *                public Object payAmountCalc(IFormView view) {
                 *                    if (view == null) {
                 *                        return null;
                 *                    }
                 *                    BigDecimal orgiPayAmount = (BigDecimal) view.getModel().getValue("orgiPayAmount");
                 *                    BigDecimal currPayAmount = (BigDecimal) view.getModel().getValue("orgiPayAmount");
                 *                    AmountObject result = new AmountObject(orgiPayAmount, currPayAmount);
                 *                    return result;
                 *                }
                 *         </code></pre>
                 */
                payAmountCalc(view:$.kd.bos.form.IFormView):any;
            }
            type IPayAmountCal_T = IPayAmountCal_S & IPayAmountCal$;
            interface IPayAmountCal extends IPayAmountCal_T {
            }
            interface IWriteOffMoney_S {
                readonly BIZCODE:string;
            }
            interface IWriteOffMoney$ {
                afterWriteoffWithholdingByCurrcy(dataModel:$.kd.bos.entity.datamodel.IDataModel):void;
                /**
                 * ��Ԥ���¼���� ��ԭ�ҳ�����������ϸ ��Ԥ�� ��ͬ���ֳ���
                 * @param
                 */
                afterWriteoffWithholdingByOrgiCurrcy(dataModel:$.kd.bos.entity.datamodel.IDataModel):void;
            }
            type IWriteOffMoney_T = IWriteOffMoney_S & IWriteOffMoney$;
            interface IWriteOffMoney extends IWriteOffMoney_T {
            }
            interface IAmountControl_S {
            }
            interface IAmountControl$ {
                /**
                 * �ύʱ�Ƿ�Ҫ�����ж��߼�
                 * @param DynamicObject ����ҳ���ύʱ��Ԫ����
                 * @return boolean
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *        public class AmountControl implements IAmountControl {
                 *            public boolean cancelAmountControl(DynamicObject dynamicObject) {
                 *            //Ҫ�����ж�
                 *            return true;
                 *            }
                 *        }
                 *    </code></pre>
                 */
                cancelAmountControl(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type IAmountControl_T = IAmountControl_S & IAmountControl$;
            interface IAmountControl extends IAmountControl_T {
            }
            interface IChangeReceiveAmount_S {
            }
            interface IChangeReceiveAmount$ {
                /**
                 * ����������տ���Ϣ��¼�������������¼����տ���Ϣ��¼���
                 * ������ kd.fi.er.formplugin.daily.web.util.WriteOffMoneyUtils.refreshReceiveAmount
                 *      kd.fi.er.formplugin.daily.web.util.WriteOffMoneyUtils#refreshReceiveAmount
                 * @param dataModel ҳ��model
                 * @param writeOffType ������ʽ
                 * @return kd.fi.er.business.daily.reimburse.AmountObject����
                 */
                afterChangeReciveAmount?(dataModel:$.kd.bos.entity.datamodel.IDataModel,writeOffType:string):any;
                /**
                 * @param view ���ݽ���
                 * @return �Ƿ������տ���
                 *
                 * <p>��չʾ������</p>
                 *        <pre><code>
                 *            public boolean isChangeReceiveAmount(IFormView iFormView) {
                 *                return false;
                 *            }
                 *        </code></pre>
                 */
                isChangeReceiveAmount(view:$.kd.bos.form.IFormView):boolean;
            }
            type IChangeReceiveAmount_T = IChangeReceiveAmount_S & IChangeReceiveAmount$;
            interface IChangeReceiveAmount extends IChangeReceiveAmount_T {
            }
            interface IReimburseAmount_S {
            }
            interface IReimburseAmount$ {
                /**
                 * ��ȡ��ȡ��;�����ò��Ŷ��
                 * @param param
                 * @return
                 */
                getDeptCurrentInReimbursedAmountBetween(param:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡ�ѱ����Ĳ��Ŷ��
                 * @param param
                 * @return
                 */
                getDeptReimbursedAmountBetween(param:$.java.util.Map):$.java.math.BigDecimal;
                /**
                 * ��ȡĳ�����ţ�ĳ�������Ŀ����ĳ��ʱ���������ѱ����Ķ������
                 * @param param
                 * @return
                 */
                getDeptReimbursedAmountDetailBetween(param:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡĳ��Ա����ĳ�������Ŀ����ĳ��ʱ�������� ���ڱ��������еĵ��ݽ�״̬�����ύB�������C��
                 * @param param ��ȴ������key�ֱ�Ϊ company ��˾ dept/userid ���Ż���Աid expenseitem ������Ŀ
                 *              currency ��λ�� begindate ��ʼʱ�� enddate ����ʱ�� existids
                 * @return ���
                 *
                 * <p>��չʾ������</p>
                 *        <pre><code>
                 *            public BigDecimal getEmployeeCurrentInReimbursedAmountBetween(Map<String, Object> map) {
                 *                BigDecimal result = BigDecimal.ZERO;
                 *                String amount = ErStdConfig.get("Amont.Ctrl.Ext.Dept");
                 *                result = new BigDecimal(amount);
                 *                if(result == null) {
                 *                    result = BigDecimal.ZERO;
                 *                }
                 *                return result;
                 *            }
                 *        </code></pre>
                 */
                getEmployeeCurrentInReimbursedAmountBetween(param:$.java.util.Map):$.java.math.BigDecimal;
                /**
                 * ��ȡĳ��Ա����ĳ�������Ŀ����ĳ��ʱ���������ѱ����Ķ��
                 * @param param
                 * @return
                 */
                getEmployeeReimbursedAmountBetween(param:$.java.util.Map):$.java.math.BigDecimal;
                /**
                 * ��ȡĳ��Ա����ĳ�������Ŀ����ĳ��ʱ���������ѱ����Ķ������
                 * @param param
                 * @return
                 */
                getEmployeeReimbursedAmountDetailBetween(param:$.java.util.Map):$.java.math.BigDecimal;
            }
            type IReimburseAmount_T = IReimburseAmount_S & IReimburseAmount$;
            interface IReimburseAmount extends IReimburseAmount_T {
            }
            interface IAssetentryMustInput_S {
            }
            interface IAssetentryMustInput$ {
                /**
                 * ����trueʱ��У���ʲ����˵��ʲ���¼���false��У��
                 * @param bill
                 * @return
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *    public class AssetentryMustInput implements IAssetentryMustInput {
                 *        @Override
                 *        public Boolean checkAssetEntryMustInput(DynamicObject bill) {
                 *        return Boolean.FALSE;
                 *        }
                 *    }
                 *    </code></pre>
                 */
                checkAssetEntryMustInput(bill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type IAssetentryMustInput_T = IAssetentryMustInput_S & IAssetentryMustInput$;
            interface IAssetentryMustInput extends IAssetentryMustInput_T {
            }
        }
        namespace kd.sdk.fi.er.extpoint.draw{
            interface IDrawRuleService_S {
            }
            interface IDrawRuleService$ {
                /**
                 *  ���ڱ�׼��Ʒ������д����ruleid�������ֳ�ͨ���˷����޸ĵ���
                 *  @param srcEntity ������ʵ��
                 *  @param tarEntity Ŀ��ʵ��
                 *  @param tarView  Ŀ��view
                 *  @param rows  ѡ�������
                 *  @param ruleId ���е�ruleId
                 *  @return  ������ruleId
                 *
                 *  <p>��չʾ������</p>
                 *         <pre><code>
                 *             public String getRuleId(String srcEntity, String tarEntity, IFormView tarView, ListSelectedRowCollection rows,
                 * 			String ruleId) {
                 * 		//����Ƕ����ı��������������Ľ�
                 * 		if("4b3z_er_dailyloanbill_inh".equals(srcEntity) && "4b3z_er_dailyreimbursebill_inh".equals(tarEntity)){
                 * 			return "123622523888";
                 * 		}
                 * 		//���������ԭ�й��򲻶�
                 * 		return ruleId;
                 * 	}
                 *         </code></pre>
                 */
                getRuleId(srcEntity:string,tarEntity:string,tarView:$.kd.bos.form.IFormView,rows:$.kd.bos.entity.datamodel.ListSelectedRowCollection,ruleId:string):string;
            }
            type IDrawRuleService_T = IDrawRuleService_S & IDrawRuleService$;
            interface IDrawRuleService extends IDrawRuleService_T {
            }
        }
        namespace kd.sdk.fi.er.extpoint.invoicecloud{
            interface IAfterHandleBillPool_S {
                readonly BIZCODE:string;
            }
            interface IAfterHandleBillPool$ {
                /**
                 * ����д�˵��غ������չ������������
                 *
                 * @param extMap      ��չ����
                 * @param billingPool Ŀ���˵��ض���
                 */
                handleExtMapAfterAmountBack?(extMap:$.java.util.Map,billingPool:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * �˵��ض������ɺ������չ������������
                 *
                 * @param extMap      ��չ����
                 * @param billingPool Ŀ���˵��ض���
                 * @return void
                 *
                 * <p>��չʾ������</p>
                 *    <pre><code>
                 *    public class Test2 implements IAfterHandleBillPool{
                 *        public void handleExtMapAfterGenBillPool(Map<String, Object> extMap, DynamicObject billingPool) {
                 *            String tt =  extMap.get("testKey").toString();
                 *            billingPool.set("testKey",tt);
                 *        }
                 *
                 *        public void handleExtMapAfterAmountBack(Map<String, Object> extMap, DynamicObject billingPool) {
                 *            String tt =  extMap.get("testKey").toString();
                 *            billingPool.set("testKey",tt);
                 *        }
                 *    }
                 *    </code></pre>
                 */
                handleExtMapAfterGenBillPool?(extMap:$.java.util.Map,billingPool:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IAfterHandleBillPool_T = IAfterHandleBillPool_S & IAfterHandleBillPool$;
            interface IAfterHandleBillPool extends IAfterHandleBillPool_T {
            }
            interface IBeforeHandleBillPoolParamPrepare_S {
                readonly BIZCODE:string;
            }
            interface IBeforeHandleBillPoolParamPrepare$ {
                /**
                 * ����д�˵���ǰ��չ����׼������
                 *
                 * @param sourceBill ��Դ����������
                 * @param extMap     ��չ����Map
                 */
                prepareExtParamBeforeAmountBack?(sourceBill:$.kd.bos.dataentity.entity.DynamicObject,extMap:$.java.util.Map):void;
                /**
                 * �����˵���ǰ��չ����׼������
                 *
                 * @param sourceBill ��Դ����������
                 * @param extMap     ��չ����Map
                 * @return void
                 *
                 * <p>��չʾ������</p>
                 *        <pre><code>
                 *        public class Test1 implements IBeforeHandleBillPoolParamPrepare{
                 *
                 *            public void prepareExtParamBeforeGenBillPool(DynamicObject sourceBill, Map<String, Object> extMap) {
                 *                extMap.put("testKey","prepareExtParamBeforeGenBillPool");
                 *            }
                 *
                 *            public void prepareExtParamBeforeAmountBack(DynamicObject sourceBill, Map<String, Object> extMap) {
                 *                extMap.put("testKey","prepareExtParamBeforeAmountBack");
                 *            }
                 *
                 *            public String prepareSelectPropertiesBeforeAmountBack(Map<String, Object> extMap) {
                 *                return ",testKey,usage";
                 *            }
                 *        }
                 *        </code></pre>
                 */
                prepareExtParamBeforeGenBillPool?(sourceBill:$.kd.bos.dataentity.entity.DynamicObject,extMap:$.java.util.Map):void;
                /**
                 * ����д�˵��ز�����Ҫ������˵����ֶ�
                 *
                 * @param extMap     ��չ����Map
                 */
                prepareSelectPropertiesBeforeAmountBack?(extMap:$.java.util.Map):string;
            }
            type IBeforeHandleBillPoolParamPrepare_T = IBeforeHandleBillPoolParamPrepare_S & IBeforeHandleBillPoolParamPrepare$;
            interface IBeforeHandleBillPoolParamPrepare extends IBeforeHandleBillPoolParamPrepare_T {
            }
            interface AfterSelectInvoice_S {
                readonly BIZCODE:string;
            }
            interface AfterSelectInvoice$ {
                /**
                 *  ѡ��Ʊ�󣬻��淢Ʊ�ƴ��ص�ԭʼ�ķ�Ʊjson��Ϣ��
                 *  @param jsonFromInvoiceCloud ѡ��Ʊ�󣬷�Ʊ�ƴ��ص�ԭʼ�ķ�Ʊjson��Ϣ��
                 *  @return
                 *
                 *  <p>��չʾ������
                 *  <pre><code>
                 * 	public class AfterSelectInvoiceDemo implements AfterSelectInvoice {
                 *
                 * 	private String jsonFromInvoiceCloud = null;
                 *
                 * 	@Override
                 * 	public void cacheJsonFromInvoiceCloud(String jsonFromInvoiceCloud){
                 * 		this.jsonFromInvoiceCloud = jsonFromInvoiceCloud;
                 * 	}
                 *
                 * }
                 *  </code></pre>
                 */
                cacheJsonFromInvoiceCloud?(jsonFromInvoiceCloud:string):void;
                /**
                 *  ��׼��Ʒ�Ĵ�����ݷ�Ʊ��Ϣ��ɷ�Ʊ��Ϣ��¼����Ʊ��ϸ��¼������/������ϸ��¼��һ�н����ֶε����󣬵��ô˷�����<p>
                 *  @param view ���ݽ����view
                 *  @return
                 *
                 *  <p>��չʾ������
                 *
                 *  <pre><code>
                 * public class AfterSelectInvoiceDemo implements AfterSelectInvoice {
                 * 	private static final Log logger = LogFactory.getLog(AfterSelectInvoiceDemo.class);
                 *
                 * 	// �����Ա����������cacheJsonFromInvoiceCloud������Ĳ���
                 * 	private String jsonFromInvoiceCloud = null;
                 *
                 * 	@Override
                 * 	public void cacheJsonFromInvoiceCloud(String jsonFromInvoiceCloud){
                 * 		logger.info("sdk: ѡ��Ʊ�󣬻��淢Ʊ�ƴ��ص�ԭʼ�ķ�Ʊjson��Ϣ: " + jsonFromInvoiceCloud);
                 * 		this.jsonFromInvoiceCloud = jsonFromInvoiceCloud;
                 * 	}
                 *
                 * 	@Override
                 * 	public void finish(IFormView view){
                 * 		logger.info("sdk: ��׼��Ʒ�Ĵ�����ݷ�Ʊ��Ϣ��ɷ�Ʊ��Ϣ��¼����Ʊ��ϸ��¼������/������ϸ��¼��һ�н����ֶε����󣬵��ô˷�����");
                 * 		// �����ϵķ�Ʊ��Ϣ��¼
                 * 		IDataModel model = view.getModel();
                 * 		DynamicObjectCollection invoiceentries = model.getEntryEntity("invoiceentry");
                 *
                 * 		// ��Ʊ�Ʒ��ص�ԭʼ��Ʊ��Ϣ
                 * 		Map<String, Object> mapFromInvoiceCloud = SerializationUtils.fromJsonString(this.jsonFromInvoiceCloud, Map.class);
                 * 		List<Map> invoiceInfos = (List)mapFromInvoiceCloud.get("data");
                 * 	}
                 * }
                 *  </code></pre>
                 */
                finish?(view:$.kd.bos.form.IFormView):void;
            }
            type AfterSelectInvoice_T = AfterSelectInvoice_S & AfterSelectInvoice$;
            interface AfterSelectInvoice extends AfterSelectInvoice_T {
            }
        }
        namespace kd.sdk.fi.er.extpoint.trip{
            interface ITripCheckReqBillCloseService_S {
                readonly BIZCODE:string;
            }
            interface ITripCheckReqBillCloseService$ {
                /**
                 * У��������뵥�Ƿ���Թر�
                 * @param reqBill �������뵥
                 * @param operateKey ��������
                 * @return true �ɹرգ�false ���ɹر�
                 */
                checkReqBillClose(reqBill:$.kd.bos.dataentity.entity.DynamicObject,operateKey:string):boolean;
            }
            type ITripCheckReqBillCloseService_T = ITripCheckReqBillCloseService_S & ITripCheckReqBillCloseService$;
            interface ITripCheckReqBillCloseService extends ITripCheckReqBillCloseService_T {
            }
            interface ITripOrderUpdateReimService_S {
                readonly BIZCODE:string;
            }
            interface ITripOrderUpdateReimService$ {
                /**
                 * ����׷�Ӳ��ñ�������չ
                 * @param reim ���ñ�����
                 */
                orderUpdateReim(reim:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type ITripOrderUpdateReimService_T = ITripOrderUpdateReimService_S & ITripOrderUpdateReimService$;
            interface ITripOrderUpdateReimService extends ITripOrderUpdateReimService_T {
            }
            interface ITripCheckOrderUserStatusService_S {
                readonly BIZCODE:string;
            }
            interface ITripCheckOrderUserStatusService$ {
                /**
                 * У�鶩���Ƿ���ʹ��
                 * @param dynamicObject orderbill
                 * @return true ��ʹ�ã�false δʹ��
                 */
                checkOrderUserStatus(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type ITripCheckOrderUserStatusService_T = ITripCheckOrderUserStatusService_S & ITripCheckOrderUserStatusService$;
            interface ITripCheckOrderUserStatusService extends ITripCheckOrderUserStatusService_T {
            }
        }
        namespace kd.sdk.fi.fatvs.extpoint.skill{
            interface ISkillRunnableExtPlugin_S {
            }
            interface ISkillRunnableExtPlugin$ {
                /**
                 * ��ȡ������������
                 *
                 * @param runExtContext
                 *            ���������������
                 * @return ������������
                 */
                pullData?(runExtContext:SkillRunExtContext):SkillRunExtResult;
                /**
                 * չʾ����ʹ�����ָ��
                 *
                 * @param indicatorParam
                 *            ����ʹ�����ָ�����
                 */
                showSkillIndicator?(indicatorParam:SkillIndicatorParam):void;
                /**
                 * չʾ�������з���ҳ
                 *
                 * @param pageParam
                 *            ���ܷ���ҳ���
                 */
                showSkillRunAnalysisPage?(pageParam:SkillRunAnalysisPageParam):void;
            }
            type ISkillRunnableExtPlugin_T = ISkillRunnableExtPlugin_S & ISkillRunnableExtPlugin$;
            interface ISkillRunnableExtPlugin extends ISkillRunnableExtPlugin_T {
            }
            interface SkillRunExtResult_S {
            }
            interface SkillRunExtResult_C extends SkillRunExtResult_S {
                new():SkillRunExtResult;
            }
            interface SkillRunExtResult$ {
                getData():$.java.util.List;
                getDate():Date;
                getEndTime():Date;
                getFailCount():number;
                getSkillNum():string;
                getStartTime():Date;
                getTotalCount():number;
                setData(data:$.java.util.List):void;
                setDate(date:Date):void;
                setEndTime(endTime:Date):void;
                setFailCount(failCount:number):void;
                setSkillNum(skillNum:string):void;
                setStartTime(startTime:Date):void;
                setTotalCount(totalCount:number):void;
            }
            type SkillRunExtResult_T = SkillRunExtResult_S & SkillRunExtResult$;
            interface SkillRunExtResult extends SkillRunExtResult_T {
            }
            interface SkillRunAnalysisPageParam_S {
            }
            interface SkillRunAnalysisPageParam_C extends SkillRunAnalysisPageParam_S {
                new():SkillRunAnalysisPageParam;
            }
            interface SkillRunAnalysisPageParam$ {
                getExtParam():$.java.util.Map;
                getSkillId():long;
                getSkillNum():string;
                getView():$.kd.bos.form.IFormView;
                setExtParam(extParam:$.java.util.Map):void;
                setSkillId(skillId:long):void;
                setSkillNum(skillNum:string):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type SkillRunAnalysisPageParam_T = SkillRunAnalysisPageParam_S & SkillRunAnalysisPageParam$;
            interface SkillRunAnalysisPageParam extends SkillRunAnalysisPageParam_T {
            }
            interface SkillIndicatorParam_S {
            }
            interface SkillIndicatorParam_C extends SkillIndicatorParam_S {
                new():SkillIndicatorParam;
            }
            interface SkillIndicatorParam$ {
                getExtParam():$.java.util.Map;
                getIndicatorNum():string;
                getSkillId():long;
                getSkillNum():string;
                getView():$.kd.bos.form.IFormView;
                setExtParam(extParam:$.java.util.Map):void;
                setIndicatorNum(indicatorNum:string):void;
                setSkillId(skillId:long):void;
                setSkillNum(skillNum:string):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type SkillIndicatorParam_T = SkillIndicatorParam_S & SkillIndicatorParam$;
            interface SkillIndicatorParam extends SkillIndicatorParam_T {
            }
            interface SkillRunExtContext_S {
            }
            interface SkillRunExtContext_C extends SkillRunExtContext_S {
                new():SkillRunExtContext;
            }
            interface SkillRunExtContext$ {
                getEndTime():Date;
                getSkillId():long;
                getSkillNum():string;
                getSkillResult():SkillRunExtResult;
                getStartTime():Date;
                setEndTime(endTime:Date):void;
                setSkillId(skillId:long):void;
                setSkillNum(skillNum:string):void;
                setSkillResult(skillResult:SkillRunExtResult):void;
                setStartTime(startTime:Date):void;
            }
            type SkillRunExtContext_T = SkillRunExtContext_S & SkillRunExtContext$;
            interface SkillRunExtContext extends SkillRunExtContext_T {
            }
        }
        namespace kd.sdk.fi.fca.extpoint{
            interface ITranSupBillVoucher_S {
            }
            interface ITranSupBillVoucher$ {
                /**
                 * �ϻ�����ƾ֤����չ���
                 * @param rows �б�����
                 * @return void
                 *
                 * <b>��չʾ������
                 *    <pre><code>
                 *    package kd.tmc.fca.formplugin.transbill;
                 *
                 *    import kd.bos.dataentity.entity.DynamicObject;
                 *    import kd.bos.dataentity.entity.DynamicObjectCollection;
                 *    import kd.sdk.fi.fca.extpoint.ITranSupBillVoucher;
                 *
                 *    public class TranSupBillVoucher implements ITranSupBillVoucher {
                 *    @Override
                 *    public void setIVoucher(DynamicObjectCollection rows) {
                 *    ITranSupBillVoucher.super.setIVoucher(rows);
                 *    for(DynamicObject row :rows){
                 *    row.set("description","123456");
                 *    }
                 *    }
                 *    }
                 *    </code></pre>
                 */
                setIVoucher?(rows:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type ITranSupBillVoucher_T = ITranSupBillVoucher_S & ITranSupBillVoucher$;
            interface ITranSupBillVoucher extends ITranSupBillVoucher_T {
            }
        }
        namespace kd.sdk.fi.fcm.extpoint.checkitem{
            interface CheckContext_S {
            }
            type CheckContext_ST = $.java.io.Serializable & CheckContext_S;
            interface CheckContext_C extends CheckContext_ST {
            }
            interface CheckContext$ {
                /**
                 * ��ǰҵ��Ӧ��ϵͳ����(�Ǳ���)
                 */
                getBizAppId():string;
                /**
                 * ������֯ID
                 */
                getOrgId():long;
                /**
                 * �Զ����ڼ����ʱ��, һ����Ϊnull
                 */
                getPeriodEndDate():Date;
                /**
                 * ����ڼ�ID - ���ھ����Ӧ�ÿ��ܲ����ڣ� �ӵ��÷����ζ���
                 */
                getPeriodId():long;
                /**
                 * �Զ����ڼ俪ʼʱ��, һ����Ϊnull
                 */
                getPeriodStartDate():Date;
                /**
                 * ������ò��� - �û������ü����ʱ��������
                 */
                getPluginDefineParams():$.java.util.Map;
                /**
                 * ������ҵ�����ͣ����ݲ�ͬ��ҵ��ϵͳ�в�ͬ�����˲�����
                 *     �������˲�����
                 *     �ʲ����ʲ���;
                 *     Ӧ������������
                 *     ������˲����
                 */
                setBizAppId(bizAppId:string):void;
            }
            type CheckContext_T = $.java.io.Serializable & CheckContext_S & CheckContext$;
            interface CheckContext extends CheckContext_T {
            }
            interface IClosePeriodCheckPlugin_S {
            }
            interface IClosePeriodCheckPlugin$ {
                /**
                 * ����ָ���Ľ��˼�������� context��ʵ���ض���ҵ���顣
                 *
                 * Note: ��������ṩһ���޲ι��캯������ִ�г���ͨ��������е���
                 *
                 * @param context ���˼�������ģ� �������������Ϣ
                 * @return ���˼����
                 * @throws Throwable �������߼��쳣
                 *
                 *     <p>��չʾ������
                 *
                 *     <pre><code>
                 *         public class PostChecker implements IClosePeriodCheckPlugin {
                 *                &#64;Override
                 *                public CheckResult execute(CheckContext context) throws Throwable {
                 *     	        	CheckResult result = new CheckResult();
                 *     	        	QFilter post = new QFilter("ispost", "=", "0");
                 *     	        	boolean ispost = checkPost();
                 *     	        	if (!ispost) {
                 *     	        		result.setIsSuccess(true);
                 *                    } else {
                 *     	        		QFilter qf = new QFilter("booktype", QCP.equals, Long.valueOf(context.getSubBizAppId()));
                 *     	        		qf.and("ispost", QCP.equals, '0');
                 *     	        		qf.and("period", QCP.equals, context.getPeriodId());
                 *     	        		qf.and("org, QCP.equals, context.getOrgId());
                 *     	        		result.setIsSuccess(false);
                 *     	        		result.setOnlineQueryParams(qf.toSerializedString());
                 *     	        		result.setOnlineViewId("gl_voucher);
                 *     	        		List<String> errorMsg = new ArrayList<String>(1);
                 *     	        		errorMsg.add(ResManager.loadKDString("����δ����", "VoucherPostChecker_0", "fi-gl-common"));
                 *     	        		result.setMessages(errorMsg);
                 *                    }
                 *     	        	return result;
                 *                }
                 *          }
                 *     </code></pre>
                 */
                execute(context:CheckContext):CheckResult;
            }
            type IClosePeriodCheckPlugin_T = IClosePeriodCheckPlugin_S & IClosePeriodCheckPlugin$;
            interface IClosePeriodCheckPlugin extends IClosePeriodCheckPlugin_T {
            }
            interface CheckResult_S {
            }
            type CheckResult_ST = $.java.io.Serializable & CheckResult_S;
            interface CheckResult_C extends CheckResult_ST {
                new():CheckResult;
            }
            interface CheckResult$ {
                /**
                 * �Ƿ���ɹ�, ������ɹ��������ṩ����ҳ����ͻ�����
                 */
                setIsSuccess(success:boolean):void;
                /**
                 * ���ִ�й����з��ص���Ϣ�б�
                 */
                setMessages(messages:$.java.util.List):void;
                /**
                 * ����ҳ�����ݹ�������(����), ��ֵ��Ϊ����ҳ����ͼ�Ĺ�����������ȷ�����������������ҳ����ͼ��ƥ���
                 *
                 * �ò����Ŀ���ȡֵ����Ϊ:
                 * 1. �ò�������Ϊ�ⲿURL�Ĳ�ѯ��������<code>onlineViewId</code> ΪURLЭ�鿪ͷʱ�� �ò�����ƴ�ӵ�����棬������������ҳ���
                 * URL�� �μ� kd.bos.ext.fi.fcm.mservice.CheckItemDetail#buildExternalUrl()
                 * 2. �ò������ΪӦ���ڵĹ�����������ΪQFilter�����л��ַ���
                 */
                setOnlineQueryParams(onlineQueryParams:string):void;
                /**
                 * ����ҳ����ͼID, �����ֵΪnull��empty, �������ṩ����ҳ��
                 * �ȿ���ΪӦ���ڲ���ʵ��entityname, Ҳ�������ⲿURL����http:// ����https://��ͷ
                 */
                setOnlineViewId(onlineViewId:string):void;
            }
            type CheckResult_T = $.java.io.Serializable & CheckResult_S & CheckResult$;
            interface CheckResult extends CheckResult_T {
            }
        }
        namespace kd.sdk.fi.fgptas.extpoint.attachment{
            interface IPictureAnalysis_S {
            }
            interface IPictureAnalysis$ {
                /**
                 * ��ͼƬת������ı�ת������Ȼ���ԣ���������ʾ����
                 * @param pictureAnalysisResult
                 * @return
                 */
                toPrompt?(pictureAnalysisResult:string):string;
                /**
                 * ��ͼƬת�����ı�
                 * @param attachInfos ������Ҫ�����ͼƬ��Ϣ<br/>
                 *                    ������Դ���������񣬼�ֵ�Բο�����������ķ���ֵ kd.bos.servicehelper.AttachmentServiceHelper#getAttachments<br/>
                 *                    �ڴ���չ������õ��ļ���relativeUrl/url/previewurl: ���·��/ȫ·��/Ԥ��·��
                 * @return PictureAnalysisResult����
                 *
                 * @see kd.bos.servicehelper.AttachmentServiceHelper#getAttachments(String, Object[], String, boolean)
                 * @see PictureAnalysisResult
                 */
                toText(attachInfos:$.java.util.List):$.java.util.List;
            }
            type IPictureAnalysis_T = IPictureAnalysis_S & IPictureAnalysis$;
            interface IPictureAnalysis extends IPictureAnalysis_T {
            }
            enum AttachmentType {
                PICTURE,
                TEXT
            }
            interface IAttachmentHandler_S {
            }
            interface IAttachmentHandler$ {
                /**
                 * �Ը������з��࣬ʾ��
                 * <pre>
                 *      AttachmentType clarifyAttachmentType(Map<String, Object> attachInfo) {
                 *          if ("txt".equalsIgnoreCase(attachInfo.get("type")) {
                 *               return AttachmentType.TEXT;
                 *           }
                 *           if ("jpg".equalsIgnoreCase(attachInfo.get("type")) {
                 *              return AttachmentType.PICTURE;
                 *           }
                 *           return null;
                 *      }
                 * </pre>
                 * @param attachInfo ͼƬ��Ϣ<br/>
                 *                   ������Դ���������񣬼�ֵ�Բο�����������ķ���ֵ kd.bos.servicehelper.AttachmentServiceHelper#getAttachments<br/>
                 *                   �ڴ���չ������õ��ļ���name/type: ��������/������չ��
                 * @return AttachmentType.PICTURE ���� AttachmentType.TEXT��������������������null
                 * @see AttachmentType
                 */
                clarifyAttachmentType(attachInfo:$.java.util.Map):AttachmentType;
            }
            type IAttachmentHandler_T = IAttachmentHandler_S & IAttachmentHandler$;
            interface IAttachmentHandler extends IAttachmentHandler_T {
            }
        }
        namespace kd.sdk.fi.fr.extpoint{
            interface IBankInfoF7Service_S {
            }
            interface IBankInfoF7Service$ {
                setBankF7Filter(listShowParameter:$.kd.bos.list.ListShowParameter,extArgs:string):$.kd.bos.list.ListShowParameter;
            }
            type IBankInfoF7Service_T = IBankInfoF7Service_S & IBankInfoF7Service$;
            interface IBankInfoF7Service extends IBankInfoF7Service_T {
            }
        }
        namespace kd.sdk.fi.gl.extpoint.amort{
            interface IAmountAllocate_S {
                readonly BIZCODE:string;
            }
            interface IAmountAllocate$ {
                /**
                 * ���ݴ�̯ƾ֤��¼�Զ���ת���ƾ֤��¼
                 * @param destEntries   ת��ƾ֤��¼���ɽ����Զ����޸�
                 * @param targetEntries ��̯ƾ֤��¼��������޸Ľ���Ч
                 * @param schemeDyn     ƾ֤̯���������󣬿������жϲ�����������޸Ľ���Ч
                 *
                 * <pre><code>
                 *  public class AmortExtTest implements IAmountAllocate {
                 *
                 *      public void dealDestEntries(List>DynamicObject< destEntries, List<DynamicObject> targetEntries, DynamicObject schemeDyn) {
                 *          destEntries.forEach(destRow->{
                 *              for (DynamicObject targetRow: targetEntries){
                 *                  if (destRow.getLong("assgrp_id") == targetRow.getLong("assgrp_id")){
                 *                      destRow.set("debitori", targetRow.getBigDecimal("creditori"));
                 *                      destRow.set("debitlocal", targetRow.getBigDecimal("creditlocal"));
                 *                  }
                 *              }
                 *          });
                 *      }
                 *  }
                 * </code></pre>
                 */
                dealDestEntries(destEntries:$.java.util.List,targetEntries:$.java.util.List,schemeDyn:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IAmountAllocate_T = IAmountAllocate_S & IAmountAllocate$;
            interface IAmountAllocate extends IAmountAllocate_T {
            }
        }
        namespace kd.sdk.fi.gl.extpoint.bal{
            interface ICFBalCalculator_S {
                readonly BIZ_CODE:string;
            }
            interface ICFBalCalculator$ {
                /**
                 * ɾ��ʱ�¼�����������
                 * ID startperiod endperiod
                 * 1  120210020   120210040
                 * 2  120210040   120220050
                 * 3  120210050   99999999999 ��ɾ��IDΪ1������ʱ����Ѷ�Ӧ��������ݵĿ�ʼ�ڼ�ͽ����ڼ���Ϊ��������
                 * @param orgId
                 * @param bookTypeId
                 * @param delDemension ��ɾ����ά��
                 */
                deleteBal(orgId:long,bookTypeId:long,delDemension:$.java.util.List):void;
                /**
                 * ��������¼��������˴η������䶯������modifytime��=updateTime
                 * @param orgId
                 * @param bookTypeId
                 * @param upadateTime
                 */
                updateBal(orgId:long,bookTypeId:long,upadateTime:Date):void;
            }
            type ICFBalCalculator_T = ICFBalCalculator_S & ICFBalCalculator$;
            interface ICFBalCalculator extends ICFBalCalculator_T {
            }
            interface IAcctBalCalculator_S {
                readonly BIZ_CODE:string;
            }
            interface IAcctBalCalculator$ {
                /**
                 * ɾ��ʱ�¼�����������
                 * ID startperiod endperiod
                 * 1  120210020   120210040
                 * 2  120210040   120220050
                 * 3  120210050   99999999999 ��ɾ��IDΪ1������ʱ����Ѷ�Ӧ��������ݵĿ�ʼ�ڼ�ͽ����ڼ���Ϊ��������
                 * @param orgId
                 * @param bookTypeId
                 * @param delDemension ��ɾ����ά��
                 */
                deleteBal(orgId:long,bookTypeId:long,delDemension:$.java.util.List):void;
                /**
                 * ��������¼��������˴η������䶯������modifytime��=updateTime
                 * @param orgId
                 * @param bookTypeId
                 * @param upadateTime
                 */
                updateBal(orgId:long,bookTypeId:long,upadateTime:Date):void;
            }
            type IAcctBalCalculator_T = IAcctBalCalculator_S & IAcctBalCalculator$;
            interface IAcctBalCalculator extends IAcctBalCalculator_T {
            }
        }
        namespace kd.sdk.fi.gl.extpoint.notice{
            interface INoticeVoucherIdsProvider_S {
                readonly BIZCODE:string;
            }
            interface INoticeVoucherIdsProvider$ {
                /**
                 * ����Ҫ���ˣ���Ҫ���ز��������voucherIds��
                 * @param voucherIds ��׼��Ʒ��Ҫ����֪ͨ����ƾ֤ids
                 * @return ��չ������˺���Ҫ����֪ͨ����ƾ֤ids
                 * <p>��չʾ������
                 *    <pre><code>
                 *    package kd.sdk.fi.gl.extpoint.notice;
                 *    import java.util.Set;
                 *    public class NoticeVoucherIdsProviderImpl implements INoticeVoucherIdsProvider{
                 *    @Override
                 *    public Set<Long> customFilterVchIds(Set<Long> voucherIds) {
                 *    //�Զ����߼�
                 *    return voucherIds;
                 *    }}
                 *    </code></pre>
                 */
                customFilterVchIds(voucherIds:$.java.util.Set):$.java.util.Set;
            }
            type INoticeVoucherIdsProvider_T = INoticeVoucherIdsProvider_S & INoticeVoucherIdsProvider$;
            interface INoticeVoucherIdsProvider extends INoticeVoucherIdsProvider_T {
            }
            interface INoticeVoucherSourceType_S {
                readonly AUTOTRANS_VALUE:string;
                readonly BIZCODE:string;
                readonly CARRY_OVER:string;
                readonly FROMIMPORT:string;
                readonly HANDCRAFT_VALUE:string;
                readonly MECHANISM_VALUE:string;
                readonly OFFSET:string;
                readonly PERIOD_END_EXCHANGERATE_ADJUSTMENT_VALUE:string;
                readonly PROFIT_AND_LOSS_VALUE:string;
                readonly SCAN_VALUE:string;
                readonly SCHEMA_VALUE:string;
                readonly SYCBOOK:string;
                readonly VOUCHERAMORT_VALUE:string;
                readonly VOUCHER_REF:string;
            }
            interface INoticeVoucherSourceType$ {
                /**
                 * �Զ���У��ӿ�
                 * @return ������֪ͨ����ƾ֤��Դ���ͼ��ϡ�Ŀǰ��׼��Ʒ��ת�������͵�ƾ֤����֪ͨ�������ٿ��ơ�
                 * @throws
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    package kd.sdk.fi.gl.extpoint.notice;
                 *
                 *    import java.util.ArrayList;
                 *    import java.util.List;
                 *
                 *    public class NoticeVoucherSourceTypeCtl implements INoticeVoucherSourceType{
                 *
                 *    @Override
                 *    public List<String> noSendNoticeSourceType() {
                 *    List<String> sourceTypes = new ArrayList<>(6);
                 *    sourceTypes.add(PERIOD_END_EXCHANGERATE_ADJUSTMENT_VALUE);//��Դ����Ϊ��ĩ�����ƾ֤����֪ͨ����
                 *    return sourceTypes;
                 *    }
                 *    }
                 *    </code></pre>
                 */
                noSendNoticeSourceType():$.java.util.List;
            }
            type INoticeVoucherSourceType_T = INoticeVoucherSourceType_S & INoticeVoucherSourceType$;
            interface INoticeVoucherSourceType extends INoticeVoucherSourceType_T {
            }
            interface INoticeCheck_S {
                readonly BIZCODE:string;
            }
            interface INoticeCheck$ {
                /**
                 * �Զ���У��ӿ�
                 * @param sendList ����֪ͨ���б�,receiveList ����֪ͨ���б�
                 * @return �ǣ����ͨ�����񣬼�鲻ͨ��
                 * @throws
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    package hx.fi.gl.extpoint.notice;
                 *    import kd.bos.report.ReportList;
                 *    import kd.sdk.fi.gl.extpoint.notice.INoticeCheck;
                 *
                 *    public class HxNoticeCHeck implements INoticeCheck {
                 *        public boolean extCheck(ReportList sendList, ReportList receiveList) {
                 *            if(sendList ==null||receiveList==null){
                 *                return false;
                 *            }
                 *            ...
                 *            return false;
                 *        }
                 *    }
                 *    </code></pre>
                 */
                extCheck(sendList:$.kd.bos.report.ReportList,receiveList:$.kd.bos.report.ReportList):boolean;
            }
            type INoticeCheck_T = INoticeCheck_S & INoticeCheck$;
            interface INoticeCheck extends INoticeCheck_T {
            }
        }
        namespace kd.sdk.fi.gl.extpoint.report{
            interface IReportQuery_S {
                readonly BIZCODE:string;
            }
            interface IReportQuery$ {
                /**
                 * �������˵���չ
                 */
                acCheck(standardDataSet:$.kd.bos.algo.DataSet,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam,selectedObj:any):$.kd.bos.algo.DataSet;
                /**
                 * ����֯������ϸ����չ
                 */
                auxSubLedger(standardDataSet:$.kd.bos.algo.DataSet,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam,selectedObj:any):$.kd.bos.algo.DataSet;
                /**
                 * ������ϸ����չ
                 * @param standardDataSet ��׼��Ʒ�����ѯ���ݼ���
                 * @param reportQueryParam �����ѯ����
                 * @param selectedObj ���ѡ�ж���(����)
                 * @return ��չ��������ݼ���
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    import kd.bos.algo.DataSet;
                 *    import kd.bos.entity.report.FilterInfo;
                 *    import kd.bos.entity.report.ReportQueryParam;
                 *
                 *    public class ExtReportQuery implements IReportQuery{
                 *
                 *    @Override
                 *    public DataSet subLedger(DataSet standardDataSet, ReportQueryParam reportQueryParam, Object selectedObj) {
                 *            DataSet extDataSet = standardDataSet;
                 *            FilterInfo filter = reportQueryParam.getFilter();
                 *            if(filter.getBoolean("showqty")){
                 *                extDataSet = extDataSet.addField("10L", "cusQty");
                 *            }
                 *            return extDataSet;
                 *        }
                 *
                 *        @Override
                 *        public DataSet auxSubLedger(DataSet standardDataSet, ReportQueryParam reportQueryParam, Object selectedObj) {
                 *            DataSet extDataSet = standardDataSet;
                 *            return extDataSet;
                 *        }
                 *
                 *        @Override
                 *        public DataSet acCheck(DataSet standardDataSet, ReportQueryParam reportQueryParam, Object selectedObj) {
                 *            DataSet extDataSet = standardDataSet;
                 *            return extDataSet;
                 *        }
                 *    }
                 *    </code></pre>
                 */
                subLedger(standardDataSet:$.kd.bos.algo.DataSet,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam,selectedObj:any):$.kd.bos.algo.DataSet;
            }
            type IReportQuery_T = IReportQuery_S & IReportQuery$;
            interface IReportQuery extends IReportQuery_T {
            }
            interface ReportParam_S {
            }
            interface ReportParam_C extends ReportParam_S {
                new(reportType:ReportParam$ReportType,queryParam:$.kd.bos.entity.report.ReportQueryParam):ReportParam;
            }
            interface ReportParam$ {
                /**
                 * @return �����ѯ�Ĳ�ѯ����
                 */
                getQueryParam():$.kd.bos.entity.report.ReportQueryParam;
                /**
                 * @return �������ͣ�����ʶ�������ű���
                 */
                getReportType():ReportParam$ReportType;
            }
            type ReportParam_T = ReportParam_S & ReportParam$;
            interface ReportParam extends ReportParam_T {
            }
            enum ReportParam$ReportType {
                UNSUPPORTED,
                SUB_LEDGER,
                SUBSI_DIARY_LEDGER,
                AUX_SUB_LEDGER,
                GENERAL_LEDGER,
                MULTI_COLUMN_ACCOUNT
            }
            interface IReportRowHideSpi_S {
                readonly BIZCODE:string;
            }
            interface IReportRowHideSpi$ {
                /**
                 * @param param �����ѯ������
                 * @param rowType ������
                 * @return ����Ture�����ظñ����ѯ������ж�ӦrowType��������
                 *
                 * <p>��չʾ������
                 *    <pre><code>
                 *    package kd.sdk.fi.gl.extpoint.report;
                 *
                 *    import kd.bos.algo.DataSet;
                 *    import kd.bos.entity.report.FilterInfo;
                 *
                 *    public class SummaryFilter implements IReportRowHideSpi {
                 *
                 *        @Override
                 *        public Boolean needHide(ReportParam param, RowType rowType) {
                 *            switch (param.getReportType()) {
                 *                case SUB_LEDGER:
                 *                    FilterInfo filter = param.getQueryParam().getFilter();
                 *                    if(!filter.getBoolean("showsummary")) {
                 *                        //��ϸ�����˹��˱��ںϼ�
                 *                        return rowType == RowType.ROW_TYPE_BEGIN;
                 *                    }
                 *                    break;
                 *                case AUX_SUB_LEDGER:
                 *                case SUBSI_DIARY_LEDGER:
                 *                    break;
                 *            }
                 *            return false;
                 *        }
                 *    }
                 *    </code></pre>
                 */
                needHide(param:ReportParam,rowType:RowType):boolean;
            }
            type IReportRowHideSpi_T = IReportRowHideSpi_S & IReportRowHideSpi$;
            interface IReportRowHideSpi extends IReportRowHideSpi_T {
            }
            enum RowType {
                ROW_TYPE_BEGIN,
                ROW_TYPE_LEAF,
                ROW_TYPE_DAILY,
                ROW_TYPE_PERIOD,
                ROW_TYPE_YEAR,
                ROW_TOTAL_SUMMARY
            }
            interface IReportColumnSetting_S {
                readonly BIZCODE:string;
            }
            interface IReportColumnSetting$ {
                /**
                 * ��Ŀ����
                 * @param columns �����м���
                 * @param reportQueryParam �����ѯ����
                 * @return
                 */
                acctBal(columns:$.java.util.List,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam):void;
                /**
                 * ����ά������
                 * @param columns �����м���
                 * @param reportQueryParam �����ѯ����
                 * @return
                 */
                assistBal(columns:$.java.util.List,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam):void;
                /**
                 * �ܷ�����
                 * @param columns �����м���
                 * @param reportQueryParam �����ѯ����
                 * @return
                 */
                generalLedger(columns:$.java.util.List,reportQueryParam:$.kd.bos.entity.report.ReportQueryParam):void;
            }
            type IReportColumnSetting_T = IReportColumnSetting_S & IReportColumnSetting$;
            interface IReportColumnSetting extends IReportColumnSetting_T {
            }
        }
        namespace kd.sdk.fi.gl.extpoint.syncbookvch{
            interface AccountAssgrpMappingParam_S {
            }
            interface AccountAssgrpMappingParam_C extends AccountAssgrpMappingParam_S {
                new(srcBookId:long,tarBookId:long):AccountAssgrpMappingParam;
            }
            interface AccountAssgrpMappingParam$ {
                getSrcBookId():long;
                getTarBookId():long;
            }
            type AccountAssgrpMappingParam_T = AccountAssgrpMappingParam_S & AccountAssgrpMappingParam$;
            interface AccountAssgrpMappingParam extends AccountAssgrpMappingParam_T {
            }
            interface IAccountAssgrpMapping_S {
                readonly BIZ_CODE:string;
            }
            interface IAccountAssgrpMapping$ {
                /**
                 * @param param ӳ���ϵ�������Ĳ���
                 * @return �����Զ���Ŀ�Ŀӳ���ϵList
                 */
                dealMapping(param:AccountAssgrpMappingParam):$.java.util.List;
            }
            type IAccountAssgrpMapping_T = IAccountAssgrpMapping_S & IAccountAssgrpMapping$;
            interface IAccountAssgrpMapping extends IAccountAssgrpMapping_T {
            }
        }
    }
}
export {};