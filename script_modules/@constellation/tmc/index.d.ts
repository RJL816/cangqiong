/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.sdk.tmc{
            interface SdkTmcModule_S {
            }
            type SdkTmcModule_ST = $.kd.sdk.module.Module & SdkTmcModule_S;
            interface SdkTmcModule_C extends SdkTmcModule_ST {
                new():SdkTmcModule;
            }
            interface SdkTmcModule$ {
            }
            type SdkTmcModule_T = $.kd.sdk.module.Module & SdkTmcModule_S & SdkTmcModule$;
            interface SdkTmcModule extends SdkTmcModule_T {
            }
        }
        namespace kd.sdk.tmc.am.extpoint.bankacct{
            interface IBankAccountFilter_S {
            }
            interface IBankAccountFilter$ {
                /**
                 * �����˻����ӡ��Ƿ������˻����ֶη���1
                 * @param args  ҳ��Ĺ�������
                 * @param formView  ҳ��Ĳ���
                 * @return void
                 *
                 * <p>��չʾ������
                 *     <pre><code>
                 *     import kd.bos.form.IFormView;
                 *     import kd.bos.form.events.FilterContainerInitArgs;
                 *
                 *     public class BankAccountFilter implements IBankAccountFilter {
                 *
                 *         public void addIFilterColumn(FilterContainerInitArgs args, IFormView formView) {
                 *
                 *         }
                 *     }
                 *     </code></pre>
                 */
                addIFilterColumn?(args:$.kd.bos.form.events.FilterContainerInitArgs,formView:$.kd.bos.form.IFormView):void;
                /**
                 * �����˻����ӡ��Ƿ������˻����ֶη���2
                 * @param e  ҳ����¼�
                 * @param formView  ҳ��Ĳ���
                 * @return void
                 *
                 * <p>��չʾ������
                 *     <pre><code>
                 *     import kd.bos.form.IFormView;
                 *     import kd.bos.form.events.SetFilterEvent;
                 *
                 *     public class BankAccountFilter implements IBankAccountFilter {
                 *
                 *        public void setIFilters(SetFilterEvent e, IFormView formView) {
                 *
                 *         }
                 *     }
                 *     </code></pre>
                 */
                setIFilters?(e:$.kd.bos.form.events.SetFilterEvent,formView:$.kd.bos.form.IFormView):void;
            }
            type IBankAccountFilter_T = IBankAccountFilter_S & IBankAccountFilter$;
            interface IBankAccountFilter extends IBankAccountFilter_T {
            }
        }
        namespace kd.sdk.tmc.am.extpoint.report{
            interface IDormantFormListFilter_S {
            }
            interface IDormantFormListFilter$ {
                /**
                 * ��������ѯ���ӹ��������ɡ��Ƿ�������⻧��
                 * @param qFilters ҳ��Ĺ�������
                 * @param filter ���ݵĲ���
                 * @return void
                 *
                 * <p>��չʾ������
                 *     <pre><code>
                 *     import kd.bos.entity.report.FilterInfo;
                 *     import kd.bos.orm.query.QFilter;
                 *
                 *     import java.util.List;
                 *
                 *     public class DormantFormListFilter implements IDormantFormListFilter {
                 *
                 *        public void setIFilters(List<QFilter> qFilters, FilterInfo filter) {
                 *            qFilters.add(new QFilter("isinclude", QCP.equals, filter.getString("isinclude")));
                 *            qFilters.add(new QFilter("name", QCP.equals, filter.getString("name")));
                 *        }
                 *     }
                 *     </code></pre>
                 */
                setIFilters?(qFilters:$.java.util.List,filter:$.kd.bos.entity.report.FilterInfo):void;
            }
            type IDormantFormListFilter_T = IDormantFormListFilter_S & IDormantFormListFilter$;
            interface IDormantFormListFilter extends IDormantFormListFilter_T {
            }
        }
        namespace kd.sdk.tmc.bei.extpoint.balance{
            interface IFillBankBalance_S {
            }
            interface IFillBankBalance$ {
                /**
                 * ͬ����������ֶ�֧�ֶ�����չ
                 * @param bankBalance         ������������
                 * @param balanceString       �����Ʒ��ص��������
                 *
                 * <p>��չʾ������
                 * <pre><code>
                 *
                 *  package kd.sdk.tmc.bei.extpoint.balance;
                 *
                 * import com.alibaba.fastjson.JSON;
                 * import com.alibaba.fastjson.JSONObject;
                 * import kd.bos.dataentity.entity.DynamicObject;
                 *
                 * public class FillBankBalanceExt implements IFillBankBalance {
                 *
                 *     public void fillExtBankBalance(DynamicObject bankBalance, String balanceString) {
                 *         JSONObject jsonObject = JSON.parseObject(balanceString);
                 *         bankBalance.set("", jsonObject.getString(""));
                 *     }
                 *
                 * }
                 * </code></pre>
                 */
                fillExtBankBalance(bankBalance:$.kd.bos.dataentity.entity.DynamicObject,balanceString:string):void;
            }
            type IFillBankBalance_T = IFillBankBalance_S & IFillBankBalance$;
            interface IFillBankBalance extends IFillBankBalance_T {
            }
            interface IGenHistoryBalanceInterface_S {
            }
            interface IGenHistoryBalanceInterface$ {
                /**
                 *  ���ڻ�ȡ��������ִ���Զ�������ʷ��������ֱ���˻�������ID
                 *  @return  ����ֱ���˻�������ID
                 *
                 *  <p>��չʾ������
                 *  <pre><code>
                 *  package kd.sdk.tmc.bei.extpoint.balance;
                 *
                 * import java.util.HashSet;
                 * import java.util.Set;
                 *
                 * public class GenHistoryBalanceInterfaceExt implements IGenHistoryBalanceInterface {
                 *
                 *     public Set<Long> getExtAccountBankIds() {
                 *         HashSet<Long> bankAccountIds = new HashSet<>();
                 *         // ������Ҫ��չ����������˻�ID
                 *         bankAccountIds.add(1L);
                 *         return bankAccountIds;
                 *     }
                 * }
                 * </code></pre>
                 */
                getExtAccountBankIds():$.java.util.Set;
            }
            type IGenHistoryBalanceInterface_T = IGenHistoryBalanceInterface_S & IGenHistoryBalanceInterface$;
            interface IGenHistoryBalanceInterface extends IGenHistoryBalanceInterface_T {
            }
            interface IBalanceReportInterface_S {
            }
            interface IBalanceReportInterface$ {
                /**
                 * ��������˻��ֶ���չ��
                 * @return ��Ҫ��չ���ֶ�
                 * <p>��չʾ������
                 *
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.balance;
                 *
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 *
                 * public class BalanceReportExt implements IBalanceReportInterface{
                 *
                 *     public String getAccountFields() {
                 *         // ��Ҫ��ѯ���ֶ����������չ������ͬ�������Ƶ���
                 *         return "acctstatus,defaultcurrency";
                 *     }
                 * }</code></pre>
                 */
                getAccountFields():string;
                /**
                 * ��������������չ��
                 * @param qFilter ��ѯ����
                 * @return ��ѯ����
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.balance;
                 *
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 *
                 * public class BalanceReportExt implements IBalanceReportInterface{
                 *
                 *     public QFilter getAccountFilter(QFilter qFilter) {
                 *
                 *         // �����˻���������
                 *         qFilter.and("bankaccountnumber", QCP.equals, "FI-00000000000CNY44");
                 *         return qFilter;
                 *     }
                 * }</code></pre>
                 */
                getAccountFilter(qFilter:$.kd.bos.orm.query.QFilter):$.kd.bos.orm.query.QFilter;
            }
            type IBalanceReportInterface_T = IBalanceReportInterface_S & IBalanceReportInterface$;
            interface IBalanceReportInterface extends IBalanceReportInterface_T {
            }
        }
        namespace kd.sdk.tmc.bei.extpoint.bankpay{
            interface IAfterBankPayQueryExt_S {
            }
            interface IAfterBankPayQueryExt$ {
                /**
                 * ��ȡ����ͬ������״̬�ӿڱ����ֶζ�Ӧ���и�������ֶα�ʶ
                 *
                 * ����ͬ������״̬�ӿڱ����ֶα�ʶ
                 * String reversed1;
                 * String reversed2;
                 * String reversed3;
                 * String reversed4;
                 *
                 * @return Map<String, String>   key: ����ͬ������״̬�ӿڱ����ֶα�ʶ   value: �����ֶζ�Ӧ�����и�������ֶα�ʶ
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.bankpay;
                 *
                 * import java.util.HashMap;
                 * import java.util.Map;
                 * import kd.sdk.tmc.bei.extpoint.bankpay.IAfterBankPayQueryExt;
                 *
                 * public class BankPayQueryServiceExtPlugin implements IAfterBankPayQueryExt {
                 *
                 *     public Map<String, String> getExtReversedFields() {
                 *         Map<String, String> extFieldsMap = new HashMap<>(4);
                 *         extFieldsMap.put("reversed1", "kdext_field1");
                 *         extFieldsMap.put("reversed2", "kdext_field2");
                 *         extFieldsMap.put("reversed3", "kdext_field3");
                 *         extFieldsMap.put("reversed4", "kdext_field4");
                 *         return extFieldsMap;
                 *     }
                 *
                 * }</code></pre>
                 */
                getExtReversedFields?():$.java.util.Map;
            }
            type IAfterBankPayQueryExt_T = IAfterBankPayQueryExt_S & IAfterBankPayQueryExt$;
            interface IAfterBankPayQueryExt extends IAfterBankPayQueryExt_T {
            }
        }
        namespace kd.sdk.tmc.bei.extpoint.claim{
            interface INoticeClaimSchemeInterface_S {
            }
            interface INoticeClaimSchemeInterface$ {
                /**
                 * ȡ��֪ͨ���������չ
                 * ��ȡ��֪ͨ���족����ʱ������չ��
                 *
                 * @param noticeObjectMap "billid"  ������ϸID
                 *                        "ruleentryid"  ֪ͨ����ID
                 *                        "isneednotice"  �Ƿ���֪ͨ��Ĭ��Ϊtrue
                 * @return Map<String, Object> key:"userids", value:userIdList
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.tmc.bei.business;
                 *
                 * import kd.sdk.tmc.bei.extpoint.claim.INoticeClaimSchemeInterface;
                 *
                 * import java.util.ArrayList;
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class NoticeClaimSchemesDefaultExt implements INoticeClaimSchemeInterface {
                 *
                 *     public Map<String, Object> cancelNoticeObjectExt(Map<String, Object> noticeObjectMap) {
                 *         // ��ȡ������ϸID
                 *         Long billId = (Long) noticeObjectMap.get("billid");
                 *         // ��ȡ֪ͨ�����¼ID
                 *         Long ruleEntryId = (Long) noticeObjectMap.get("ruleentryid");
                 *
                 *         // �Ƿ���֪ͨ��Ĭ��Ϊtrue
                 *         noticeObjectMap.put("isneednotice", false);
                 *
                 *         return noticeObjectMap;
                 *     }
                 * }</code></pre>
                 */
                cancelNoticeObjectExt?(noticeObjectMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ֪ͨ���������չ
                 * ��չ����ʱ������֪ͨ���족����ƥ�䵽֪ͨ�������ڡ�֪ͨ���򡿽���ѡ����ǡ��Զ��塱ʱ������չ
                 * ע������չ�˳���ʱ�Ḳ�� kd.sdk.fi.cas.extpoint.noticeclaim.INoticeClaimSchemeInterface.noticeObjectExt ��չ����
                 *
                 * @param noticeObjectMap "billid"  ������ϸID
                 *                        "ruleentryid"  ֪ͨ����ID
                 *                        "isneednotice"  �Ƿ���֪ͨ��Ĭ��Ϊtrue
                 * @return Map<String, Object> key:"userids", value:userIdList
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.tmc.bei.business;
                 *
                 * import kd.sdk.tmc.bei.extpoint.claim.INoticeClaimSchemeInterface;
                 *
                 * import java.util.ArrayList;
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class NoticeClaimSchemesDefaultExt implements INoticeClaimSchemeInterface {
                 *
                 *     public Map<String, Object> noticeObjectExtByRule(Map<String, Object> noticeObjectMap) {
                 *         // ��ȡ������ϸID
                 *         Long billId = (Long) noticeObjectMap.get("billid");
                 *         // ��ȡ֪ͨ�����¼ID
                 *         Long ruleEntryId = (Long) noticeObjectMap.get("ruleentryid");
                 *
                 *         // �Զ���֪ͨ�����û�ID
                 *         List<Object> userIds = new ArrayList<>(2);
                 *         userIds.add(1540672005563544576L);
                 *         noticeObjectMap.put("userids", userIds);
                 *
                 *         // �Ƿ���֪ͨ��Ĭ��Ϊtrue
                 *         noticeObjectMap.put("isneednotice", false);
                 *
                 *         return noticeObjectMap;
                 *     }
                 * }</code></pre>
                 */
                noticeObjectExtByRule?(noticeObjectMap:$.java.util.Map):$.java.util.Map;
            }
            type INoticeClaimSchemeInterface_T = INoticeClaimSchemeInterface_S & INoticeClaimSchemeInterface$;
            interface INoticeClaimSchemeInterface extends INoticeClaimSchemeInterface_T {
            }
        }
        namespace kd.sdk.tmc.bei.extpoint.receipt{
            interface IAfterReceiptRecognition_S {
            }
            interface IAfterReceiptRecognition$ {
                /**
                 * ����OCRʶ����������Ϣ���ÿ��ƻ�����
                 * @param recognizeDetailJson JsonString ���ӻص�ocrʶ�������л����� kd.tmc.bei.common.constants.ReceiptRecongnizeDetail
                 * @return JsonString ����������ʶ�������л�����
                 *
                 * ���ӻص�ʶ����ϸ���� - kd.tmc.bei.common.constants.ReceiptRecongnizeDetail
                 *
                 * �������ԣ�
                 *
                 * ��������
                 * String ftradeDate;
                 * �տ���&�����������˻���Ϣ
                 * ����
                 * String fpayeeName;
                 * String fpaymentName;
                 * �����˺�
                 * String fpayeeAccount;
                 * String fpaymentAccount;
                 * ������
                 * String fpayeeBank;
                 * String fpaymentBank;
                 * ���
                 * String famount;
                 * �ұ�
                 * String fcurrency;
                 * ������ ��-�� ��-��
                 * String ftradeType;
                 * ������ˮ��
                 * String ftradeId;
                 * ҵ��ο���
                 * String ftradeNumber;
                 * String fabstract;
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.receipt;
                 *
                 * import kd.bos.dataentity.serialization.SerializationUtils;
                 * import kd.bos.logging.Log;
                 * import kd.bos.logging.LogFactory;
                 * import kd.bos.util.ExceptionUtils;
                 * import kd.sdk.tmc.bei.extpoint.receipt.IAfterReceiptRecognition;
                 * import kd.tmc.bei.common.constants.ReceiptRecongnizeDetail;
                 * import kd.tmc.bei.common.enums.LendingDirectionEnum;
                 *
                 * public class ReceiptRecognitionResultExtPlugin implements IAfterReceiptRecognition {
                 * private static final Log logger = LogFactory.getLog(ReceiptRecognitionResultExtPlugin.class);
                 *
                 *     public String fillRecognitionResult(String recognizeDetailJson) {
                 *         try {
                 *             //�����л�����
                 *             ReceiptRecongnizeDetail recognizeDetail = SerializationUtils.fromJsonString(recognizeDetailJson, ReceiptRecongnizeDetail.class);
                 *             recognizeDetail.setFpaymentAccount("ABC777");
                 *             recognizeDetail.setFcurrency("CNY");
                 *             //��������漰������ ����ʹ��ö�ٸ�ֵ
                 *             recognizeDetail.setFtradeType(LendingDirectionEnum.OUT.getDirect());
                 *             //��������л�����
                 *             recognizeDetailJson = SerializationUtils.toJsonString(recognizeDetail);
                 *         } catch (Exception e) {
                 *             logger.warn("���ӻص�ʶ�� -- ��������ʶ�������쳣��" + ExceptionUtils.getExceptionStackTraceMessage(e));
                 *         }
                 *         return recognizeDetailJson;
                 *     }
                 * }</code></pre>
                 */
                fillRecognitionResult?(recognizeDetailJson:string):string;
            }
            type IAfterReceiptRecognition_T = IAfterReceiptRecognition_S & IAfterReceiptRecognition$;
            interface IAfterReceiptRecognition extends IAfterReceiptRecognition_T {
            }
            interface IReceiptMatchTransDetail_S {
            }
            interface IReceiptMatchTransDetail$ {
                /**
                 * ���ӻص�ƥ�佻����ϸ�󣬵��ӻص���������ϸ��ֵ�߼�������չ
                 * @param matchRel ���ӻص���������ϸ��ϵ��one-one��one-many��many-one
                 * @param receipts ���ӻص�������Ϣ
                 * @param details  ������ϸ������Ϣ
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.receipt;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import java.util.List;
                 *
                 * public class ReceiptMatchTransDetail implements IReceiptMatchTransDetail{
                 *
                 *     public void afterMatchFieldValueCover(String matchRel, List<DynamicObject> receipts, List<DynamicObject> details) {
                 *         switch (matchRel){
                 *             case "one-one"://һ��һ
                 *                 DynamicObject receipt = receipts.get(0);
                 *                 receipt.set("keyField", "value");
                 *                 DynamicObject detail = details.get(0);
                 *                 detail.set("keyField", "value");
                 *                 break;
                 *             case "one-many"://һ�Զ�
                 *                 DynamicObject receipt1 = receipts.get(0);
                 *                 receipt1.set("keyField", "value");
                 *                 for (DynamicObject detail1 : details) {
                 *                     detail1.set("keyField", "value");
                 *                 }
                 *                 break;
                 *             case "many-one"://���һ
                 *                 for (DynamicObject receipt2 : receipts) {
                 *                     receipt2.set("keyField", "value");
                 *                 }
                 *                 DynamicObject detail2 = details.get(0);
                 *                 detail2.set("keyField", "value");
                 *                 break;
                 *             default:
                 *                 break;
                 *         }
                 *     }
                 * }
                 * </code></pre>
                 */
                afterMatchFieldValueCover(matchRel:string,receipts:$.java.util.List,details:$.java.util.List):void;
            }
            type IReceiptMatchTransDetail_T = IReceiptMatchTransDetail_S & IReceiptMatchTransDetail$;
            interface IReceiptMatchTransDetail extends IReceiptMatchTransDetail_T {
            }
        }
        namespace kd.sdk.tmc.bei.extpoint.transdetail{
            interface IDeleteTransDetail_S {
            }
            interface IDeleteTransDetail$ {
                /**
                 * �������ɾ������������Խ�����ϸʵ��ӵ�е����ԣ�
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.transdetail;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import kd.bos.orm.query.QFilter;
                 *
                 * public class DeleteTransDetail implements IDeleteTransDetail{
                 *
                 *     public void getQfilterCanDelete() {
                 *         // �ڽ�����ϸ�����˶����ֶ���Ϊ��ҵ����ƣ������ڴ˴��������ƽ�����ϸ��Щ�ܱ�ɾ�������⽻����ϸ����׼����ɾ��
                 *         return new QFilter("��������", QFilter.equals, "����ɾ��������");
                 *     }
                 * }</code></pre>
                 */
                getQfilterCanDelete():$.kd.bos.orm.query.QFilter;
            }
            type IDeleteTransDetail_T = IDeleteTransDetail_S & IDeleteTransDetail$;
            interface IDeleteTransDetail extends IDeleteTransDetail_T {
            }
            interface IFillTransDetail_S {
            }
            interface IFillTransDetail$ {
                /**
                 * �ύ���󣬵����������е��ݣ����ڶ����ֶ��������
                 * @param info ������ϸ
                 * @param extData ������ϸ��չ�ֶ���Ϣ
                 *
                 * <p>��չʾ������
                 * <pre><code>package kd.sdk.tmc.bei.extpoint.transdetail;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import com.alibaba.fastjson.JSON;
                 * import com.alibaba.fastjson.JSONObject;
                 *
                 * public class FillTransDetail implements IFillTransDetail{
                 *
                 *     public void fillExtData(DynamicObject info,String extData) {
                 *         JSONObject jsonObject = JSON.parseObject(extData);
                 *         info.setString("",jsonObject.getString(""));
                 *     }
                 * }</code></pre>
                 */
                fillExtData(info:$.kd.bos.dataentity.entity.DynamicObject,extData:string):void;
            }
            type IFillTransDetail_T = IFillTransDetail_S & IFillTransDetail$;
            interface IFillTransDetail extends IFillTransDetail_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.confirm{
            interface IConfirmListInterface_S {
            }
            interface IConfirmListInterface$ {
                /**
                 * @param dataSource ���ȷ��=invest, ����ȷ��=cfm
                 * @return �������ӵ�����
                 *
                 * <pre>
                 * {@code
                 *     @Override
                 *     public String[] columnsName(String dataSource) {
                 *         if ("cfm".equals(dataSource)) {
                 *             return new String[]{"payintdate"};
                 *         }
                 *         return new String[0];
                 *     }
                 *  }
                 * </pre>
                 */
                columnsName?(dataSource:string):string[];
                /**
                 * @param dataSource ���ȷ��=invest, ����ȷ��=cfm
                 * @param row ��ѯ�����ĵ�������
                 * @param objectArr �б������󣬸��� objectArr[2] ���ж������ݵ�ҵ��ȷ������
                 *
                 * @return �б�������
                 *
                 * <pre>
                 * {@code
                 *     @Override
                 *     public Object[] resultObject(String dataSource, DynamicObject row, Object[] objectArr) {
                 *         if (!"cfm".equals(dataSource)) {
                 *             return objectArr;
                 *         }
                 *         Object[] objects = Arrays.copyOf(objectArr, objectArr.length+1);
                 *         if ("interest".equals(objects[2])) {
                 *             objects[objectArr.length] = row.get("bizdate");
                 *         } else {
                 *             objects[objectArr.length] = null;
                 *         }
                 *         return objects;
                 *     }
                 *  }
                 * </pre>
                 */
                resultObject?(dataSource:string,row:$.kd.bos.dataentity.entity.DynamicObject,objectArr:any[]):any[];
            }
            type IConfirmListInterface_T = IConfirmListInterface_S & IConfirmListInterface$;
            interface IConfirmListInterface extends IConfirmListInterface_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.extapply{
            interface IExtApplyBillSecondDevFields_S {
            }
            interface IExtApplyBillSecondDevFields$ {
                /**
                 * @Description: չ������֧�����Ʒ�װ�����ֶ���չ��� Map<String, Object> ������
                 * @param extApplyBill չ�����뵥��
                 * @return java.util.Map<java.lang.String,java.lang.Object> ���ط�װ�õĶ����ֶμ���; key:Ŀ�굥�����ֶα�ʶ, value: ��ӦԴ�������ֶ���Դ���ϰ󶨵�ֵ
                 *
                 * <pre>
                 *     <code>
                 *         public class extApplyBillSecondDevFields implements IExtApplyBillSecondDevFields {
                 *
                 *                  public Map< String, Object> extApplyBillSecondDevFields(DynamicObject extApplyBill) {
                 *                  //ͨ��extApplyBill��ѯ��Ӧ���ֶ�����
                 *                  Map< String, Object> fieldMap = new HashMap<>(16);
                 *                  //�����ֶ�
                 *                  fieldMap.put("tarprop", extApplyBill.get("srcprop"));
                 *                  //��������
                 *                  fieldMap.put("tarbanksdk", extApplyBill.getDynamicObject("scrbanksdk").getPkValue());
                 *                  //��ѡ��������
                 *                  DynamicObjectCollection scrMulSdk = extApplyBill.getDynamicObjectCollection("scrmulsdk");
                 *                  fieldMap.put("tarmulsdk", scrMulSdk.stream().map(o -> o.getDynamicObject("fbasedataid").getPkValue()).collect(Collectors.toList()));
                 *                  return fieldMap;
                 *                  }
                 *              }
                 *     </code>
                 * </pre>
                 */
                extApplyBillSecondDevFields?(extApplyBill:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            type IExtApplyBillSecondDevFields_T = IExtApplyBillSecondDevFields_S & IExtApplyBillSecondDevFields$;
            interface IExtApplyBillSecondDevFields extends IExtApplyBillSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.init{
            interface IInitBillSecondDevFields_S {
            }
            interface IInitBillSecondDevFields$ {
                /**
                 * @Description: �����ʼ�����ݵ��������ʼ������֧�ֶ����ֶδ�����ͬ������չ���
                 * @param initBill ��ʼ������
                 * @param targetBill Ŀ�굥--��ͬ/ծȯ���мƻ���
                 *
                 * <pre>
                 * {@code
                 *    public class InitBillSecondDevFields implements IInitBillSecondDevFields {
                 *
                 *        public void initBillSecondDevFields(DynamicObject initBill, DynamicObject targetBill){
                 *            // �����ֶ�
                 *            boolean extIsPay = initBill.getBoolean("ext_ispay");
                 *            targetBill.set("ext_ispay", extIsPay);
                 *            // ��������
                 *            DynamicObject extPaycurrency = initBill.getDynamicObject("ext_paycurrency");
                 *            targetBill.set("ext_paycurrency", extPaycurrency);
                 *        }
                 *    }
                 *  }
                 * </pre>
                 */
                initBillSecondDevFields?(initBill:$.kd.bos.dataentity.entity.DynamicObject,targetBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IInitBillSecondDevFields_T = IInitBillSecondDevFields_S & IInitBillSecondDevFields$;
            interface IInitBillSecondDevFields extends IInitBillSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.interestbill{
            interface ILoanIntBillBatchSecondDevFields_S {
            }
            interface ILoanIntBillBatchSecondDevFields$ {
                /**
                 * @Description: �����Ϣ����������˳����¶�������targetIntBill����
                 * @param batchIntBill ������Ϣ���� - ������
                 * @param loanBillEntry �ſ�� - ��¼�еĵ���
                 * @param targetIntBill ��Ϣ�� - Ŀ�굥��
                 *
                 * <pre>
                 * {@code
                 *    public class LoanIntBillBatchSecondDevFields implements ILoanIntBillBatchSecondDevFields {
                 *
                 *        public void loanIntBillBatchSecondDevFields(DynamicObject batchIntBill, DynamicObject loanBill, DynamicObject targetIntBill) {
                 *            // �����ֶ�
                 *            boolean extIsPay = loanBill.getBoolean("ext_ispay");
                 *            targetIntBill.set("ext_ispay", extIsPay);
                 *
                 *            // ��������
                 *            DynamicObject extPaycurrency = loanBill.getDynamicObject("ext_paycurrency");
                 *            targetIntBill.set("ext_paycurrency", extPaycurrency);
                 *        }
                 *    }
                 *  }
                 * </pre>
                 */
                loanIntBillBatchSecondDevFields?(batchIntBill:$.kd.bos.dataentity.entity.DynamicObject,loanBillEntry:$.kd.bos.dataentity.entity.DynamicObject,targetIntBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type ILoanIntBillBatchSecondDevFields_T = ILoanIntBillBatchSecondDevFields_S & ILoanIntBillBatchSecondDevFields$;
            interface ILoanIntBillBatchSecondDevFields extends ILoanIntBillBatchSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.preinst{
            interface IPreIntBillBatchSecondDevFields_S {
            }
            interface IPreIntBillBatchSecondDevFields$ {
                /**
                 * @Description: ��ϢԤ������������˳����¶�������targetPreIntBill����
                 * @param batchPreIntBill ��ϢԤ���������� - ������
                 * @param loanBillEntry �ſ�� - ��¼�еĵ���
                 * @param targetPreIntBill Ԥ�ᵥ - Ŀ�굥��
                 *
                 * <pre>
                 * {@code
                 *    public class PreIntBillBatchSecondDevFields implements IPreIntBillBatchSecondDevFields {
                 *
                 *        public void preIntBillBatchSecondDevFields(DynamicObject batchPreIntBill, DynamicObject loanBill, DynamicObject targetPreIntBill) {
                 *            // �����ֶ�
                 *            boolean extIsPay = loanBill.getBoolean("ext_ispay");
                 *            targetPreIntBill.set("ext_ispay", extIsPay);
                 *
                 *            // ��������
                 *            DynamicObject extPaycurrency = loanBill.getDynamicObject("ext_paycurrency");
                 *            targetPreIntBill.set("ext_paycurrency", extPaycurrency);
                 *        }
                 *    }
                 *  }
                 * </pre>
                 */
                preIntBillBatchSecondDevFields?(batchPreIntBill:$.kd.bos.dataentity.entity.DynamicObject,loanBillEntry:$.kd.bos.dataentity.entity.DynamicObject,targetPreIntBill:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IPreIntBillBatchSecondDevFields_T = IPreIntBillBatchSecondDevFields_S & IPreIntBillBatchSecondDevFields$;
            interface IPreIntBillBatchSecondDevFields extends IPreIntBillBatchSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.repay{
            interface IRepayBillSecondDevFields_S {
            }
            interface IRepayBillSecondDevFields$ {
                /**
                 * Description: �����Ļ�����Ϣ�����¶����ֶη�װ�� Map<String, Object> ������
                 * @param repayBill ���
                 * @return java.util.Map<java.lang.String,java.lang.Object> ���ط�װ�õĶ����ֶμ���; key:Ŀ�굥�����ֶα�ʶ, value: ��ӦԴ�������ֶ���Դ���ϰ󶨵�ֵ
                 *
                 * <pre>
                 *     <code>
                 *         public class RepayBillSecondDevFields implements IRepayBillSecondDevFields {
                 *
                 *                  public Map< String, Object> repayBillSecondDevFields(DynamicObject repayBill) {
                 *                  //ͨ��repayBill��ѯ��Ӧ���ֶ�����
                 *                  Map< String, Object> fieldMap = new HashMap<>(16);
                 *                  //�����ֶ�
                 *                  fieldMap.put("tarprop", repayBill.get("srcprop"));
                 *                  //��������
                 *                  fieldMap.put("tarbanksdk", repayBill.getDynamicObject("scrbanksdk").getPkValue());
                 *                  //��ѡ��������
                 *                  DynamicObjectCollection scrMulSdk = repayBill.getDynamicObjectCollection("scrmulsdk");
                 *                  fieldMap.put("tarmulsdk", scrMulSdk.stream().map(o -> o.getDynamicObject("fbasedataid").getPkValue()).collect(Collectors.toList()));
                 *                  return fieldMap;
                 *                  }
                 *              }
                 *     </code>
                 * </pre>
                 */
                repayBillSecondDevFields?(repayBill:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            type IRepayBillSecondDevFields_T = IRepayBillSecondDevFields_S & IRepayBillSecondDevFields$;
            interface IRepayBillSecondDevFields extends IRepayBillSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.extpoint.repayapply{
            interface IRepayApplyBillSecondDevFields_S {
            }
            interface IRepayApplyBillSecondDevFields$ {
                /**
                 * Description: ��������֧�����Ʒ�װ�����ֶ���չ��� Map<String, Object> ������
                 * @param repayApplyBill �������뵥��
                 * @return java.util.Map<java.lang.String,java.lang.Object> ���ط�װ�õĶ����ֶμ���; key:Ŀ�굥�����ֶα�ʶ, value: ��ӦԴ�������ֶ���Դ���ϰ󶨵�ֵ
                 *
                 * <pre>
                 *     <code>
                 *         public class repayApplyBillSecondDevFields implements IRepayApplyBillSecondDevFields {
                 *
                 *                  public Map< String, Object> repayApplyBillSecondDevFields(DynamicObject repayApplyBill) {
                 *                  //ͨ��repayApplyBill��ѯ��Ӧ���ֶ�����
                 *                  Map< String, Object> fieldMap = new HashMap<>(16);
                 *                  //�����ֶ�
                 *                  fieldMap.put("tarprop", repayApplyBill.get("srcprop"));
                 *                  //��������
                 *                  fieldMap.put("tarbanksdk", repayApplyBill.getDynamicObject("scrbanksdk").getPkValue());
                 *                  //��ѡ��������
                 *                  DynamicObjectCollection scrMulSdk = repayApplyBill.getDynamicObjectCollection("scrmulsdk");
                 *                  fieldMap.put("tarmulsdk", scrMulSdk.stream().map(o -> o.getDynamicObject("fbasedataid").getPkValue()).collect(Collectors.toList()));
                 *                  return fieldMap;
                 *                  }
                 *              }
                 *     </code>
                 * </pre>
                 */
                repayApplyBillSecondDevFields?(repayApplyBill:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            type IRepayApplyBillSecondDevFields_T = IRepayApplyBillSecondDevFields_S & IRepayApplyBillSecondDevFields$;
            interface IRepayApplyBillSecondDevFields extends IRepayApplyBillSecondDevFields_T {
            }
        }
        namespace kd.sdk.tmc.cfm.util{
            interface FeeCostParam_S {
                getSerialVersionUID():long;
            }
            type FeeCostParam_ST = $.java.io.Serializable & FeeCostParam_S;
            interface FeeCostParam_C extends FeeCostParam_ST {
                new():FeeCostParam;
            }
            interface FeeCostParam$ {
                getAmount():$.java.math.BigDecimal;
                getAmtPrecision():number;
                getBasis():string;
                getEndDate():Date;
                getFeeAmount():$.java.math.BigDecimal;
                getHtRule():string;
                getLoanRate():$.java.math.BigDecimal;
                getShareFrequency():string;
                getShareType():string;
                getStartDate():Date;
                setAmount(amount:$.java.math.BigDecimal):void;
                setAmtPrecision(amtPrecision:number):void;
                setBasis(basis:string):void;
                setEndDate(endDate:Date):void;
                setFeeAmount(feeAmount:$.java.math.BigDecimal):void;
                setHtRule(htRule:string):void;
                setLoanRate(loanRate:$.java.math.BigDecimal):void;
                setShareFrequency(shareFrequency:string):void;
                setShareType(shareType:string):void;
                setStartDate(startDate:Date):void;
            }
            type FeeCostParam_T = $.java.io.Serializable & FeeCostParam_S & FeeCostParam$;
            interface FeeCostParam extends FeeCostParam_T {
            }
            interface CostShareUtil_S {
                /**
                 * ��ȡ̯����ϸ
                 * @param param ̯�����ݶ���
                 * @return  ̯����ϸ
                 * @throws KDBizException
                 * <pre>
                 *     <code>
                 *     ����ʾ��:
                 *     FeeCostParam param = new kd.sdk.tmc.cfm.util.FeeCostParam();
                 *     //ҵ����
                 *     param.setAmount(amount);
                 *     //ҵ����-�����ܶ��ұ���ã���Ҫ������ת��ҵ��ұ�
                 *     param.setInitCcbAmt(initCcbAmt);
                 *     //ϢƱ��
                 *     param.setLoanRate(loanRate);
                 *     //��Ϣ��׼��Ĭ����ͷ����β-headnotail/��β����ͷ-noheadtail/��ͷ����β-headtail/ͷβ������-noheadnotail
                 *     param.setBasis(basisEnum.getValue());
                 *     //�ұ𾫶�
                 *     param.setAmtPrecision(amtPrecision);
                 *     //̯����ʽ��ʵ�����ʷ�-1 ֱ�߷�-2
                 *     param.setShareType(shareType);
                 *     //ͷβ����Ĭ����ͷ����β-headnotail/��β����ͷ-noheadtail/��ͷ����β-headtail/ͷβ������-noheadnotail
                 *     param.setHtRule("");
                 *     //��ʼ����
                 *     param.setStartDate(DateUtils.stringToDate("2024-05-29", DateUtils.FORMAT_YMD));
                 *     //��������
                 *     param.setEndDate(DateUtils.stringToDate("2026-04-09", DateUtils.FORMAT_YMD));
                 *     //̯��Ƶ�ʣ�ÿ��-day/ÿ��-month/ÿ����-quarter/ÿ����-halfyear/ÿ��-year
                 *     param.setShareFrequency("month");
                 *     List<FeeCostShareInfo> costShareList =  kd.sdk.tmc.cfm.util.CostShareUtil#getCostShareList(param)
                 *     </code>
                 * </pre>
                 */
                getCostShareList(param:FeeCostParam):$.java.util.List;
            }
            interface CostShareUtil_C extends CostShareUtil_S {
                new():CostShareUtil;
            }
            interface CostShareUtil$ {
            }
            type CostShareUtil_T = CostShareUtil_S & CostShareUtil$;
            interface CostShareUtil extends CostShareUtil_T {
            }
        }
        namespace kd.sdk.tmc.cim.extpoint{
            interface IReleasePushDptRevenue_S {
            }
            interface IReleasePushDptRevenue$ {
                /**
                 * ��֧�����ƽ�����͵����浥��װ�����ֶ���չ��� Map<String, Object> ������
                 * �ڲ�����OperateOption option�е�key= SecondDevFieldVal��ȡ������ Map secondDevFieldVal = JSON.parseObject("SecondDevFieldVal", Map.class)�õ��˷�������map
                 * @param releaseBill ��
                 * @return ���ط�װ�õĶ����ֶμ���; key:Ŀ�굥�����ֶα�ʶ, value: �����ֶ���Դ���ϰ󶨵�ֵ
                 *
                 * <pre>
                 *     <code>
                 *           public class DepositReleasePushDptRevenue implements IReleasePushDptRevenue{
                 *               @Override
                 *               public Map<String, Object> getReleaseBillSecondFields(DynamicObject releaseBill) {
                 *                   Map<String, Object> map = new HashMap<>();
                 *                   //�����ֶΣ��ǻ������ϣ�
                 *                   map.put("ltg_text", releaseBill.get("ltg_text"));
                 *                   //��������
                 *                   map.put("ltg_base", releaseBill.getDynamicObject("ltg_base").getPkValue());
                 *                   return map;
                 *               }
                 *           }
                 *     </code>
                 * </pre>
                 */
                getReleaseBillSecondFields?(releaseBill:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            type IReleasePushDptRevenue_T = IReleasePushDptRevenue_S & IReleasePushDptRevenue$;
            interface IReleasePushDptRevenue extends IReleasePushDptRevenue_T {
            }
        }
        namespace kd.sdk.tmc.creditm.util.creditlimit{
            interface CreditLimitServiceUtil_S {
                /**
                 * ȡ��ռ������
                 *
                 * @param info SerializationUtils.toJsonString(CreditLimitInfo.class) ���Ŷ���
                 * @return SerializationUtils.toJsonString(CreditLimitInfo.class) ���Ŷ���
                 * @throws KDBizException ȡ��ռ�����ŵ����쳣
                 *
                 *             <pre>
                 * <code>
                 *     ����ʾ��:
                 *     CreditLimitInfo info = new CreditLimitInfo();
                 *     info.setXXX(XXX);
                 *     ...
                 *     kd.sdk.tmc.creditm.util.creditlimit.CreditLimitServiceUtil.cancelCreditLimit(SerializationUtils.toJsonString(info));
                 * </code>
                 *             </pre>
                 */
                cancelCreditLimit(info:string):string;
                /**
                 * ȡ����������
                 *
                 * @param info SerializationUtils.toJsonString(ReturnCreditLimitInfo.class) �������Ŷ���
                 * @return SerializationUtils.toJsonString(ReturnCreditLimitInfo.class) �������Ŷ���
                 * @throws KDBizException ȡ���������ŵ����쳣
                 *
                 *             <pre>
                 * <code>
                 *     ����ʾ��:
                 *     ReturnCreditLimitInfo info = new ReturnCreditLimitInfo();
                 *     info.setXXX(XXX);
                 *     ...
                 *     kd.sdk.tmc.creditm.util.creditlimit.CreditLimitServiceUtil.cancelReturnCreditLimit(SerializationUtils.toJsonString(info));
                 * </code>
                 *             </pre>
                 */
                cancelReturnCreditLimit(info:string):string;
                /**
                 * ȷ��ռ������
                 *
                 * @param  info SerializationUtils.toJsonString(CreditLimitInfo.class) ���Ŷ���
                 * @return SerializationUtils.toJsonString(CreditLimitInfo.class) ���Ŷ���
                 * @throws KDBizException ȷ��ռ�����ŵ����쳣
                 *
                 *             <pre>
                 * <code>
                 *     ����ʾ��:
                 *     CreditLimitInfo info = new CreditLimitInfo();
                 *     info.setXXX(XXX);
                 *     ...
                 *     kd.sdk.tmc.creditm.util.creditlimit.CreditLimitServiceUtil.confirmCreditLimit(SerializationUtils.toJsonString(info));
                 * </code>
                 *             </pre>
                 */
                confirmCreditLimit(info:string):string;
                /**
                 * ��������
                 *
                 * @param info SerializationUtils.toJsonString(ReturnCreditLimitInfo.class) �������Ŷ���
                 * @return SerializationUtils.toJsonString(ReturnCreditLimitInfo.class) �������Ŷ���
                 * @throws KDBizException �������ŵ����쳣
                 *
                 *             <pre>
                 * <code>
                 *     ����ʾ��:
                 *     ReturnCreditLimitInfo info = new ReturnCreditLimitInfo();
                 *     info.setXXX(XXX);
                 *     ...
                 *     kd.sdk.tmc.creditm.util.creditlimit.CreditLimitServiceUtil.returnCreditLimit(SerializationUtils.toJsonString(info));
                 * </code>
                 *             </pre>
                 */
                returnCreditLimit(info:string):string;
                /**
                 * �ͷ����Ÿ���ָ�����
                 *
                 * @param info SerializationUtils.toJsonString(CreditLimitUseBean.class) ���Ŷ���
                 * @return SerializationUtils.toJsonString(CreditLimitUseBean.class) ���Ŷ���
                 * @throws KDBizException �ͷ����Ÿ���ָ���������쳣
                 *
                 *             <pre>
                 * <code>
                 *     ����ʾ��:
                 *     CreditLimitUseBean info = new CreditLimitUseBean();
                 *     info.setXXX(XXX);
                 *     ...
                 *     kd.sdk.tmc.creditm.util.creditlimit.CreditLimitServiceUtil.updateCreditLimitUse(SerializationUtils.toJsonString(info));
                 * </code>
                 *             </pre>
                 */
                updateCreditLimitUse(info:string):string;
            }
            interface CreditLimitServiceUtil_C extends CreditLimitServiceUtil_S {
                new():CreditLimitServiceUtil;
            }
            interface CreditLimitServiceUtil$ {
            }
            type CreditLimitServiceUtil_T = CreditLimitServiceUtil_S & CreditLimitServiceUtil$;
            interface CreditLimitServiceUtil extends CreditLimitServiceUtil_T {
            }
        }
        namespace kd.sdk.tmc.ext.extpoint.committobe{
            interface IGenBankBillSDKService_S {
            }
            interface IGenBankBillSDKService$ {
                /**
                 * �ύ���󣬵����������е��ݣ����ڶ����ֶ��������
                 * @param entityName ����ʵ����
                 * @param billList ���ݼ���
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
        }
        namespace kd.sdk.tmc.fbp.extpoint{
            interface IFeeDetailSaveAndSubmitAddFields_S {
            }
            interface IFeeDetailSaveAndSubmitAddFields$ {
                /**
                 * @param feeBill ������ϸ����
                 * @param row ������ϸ���ݵķ�¼��
                 * @param feeDetailRow ҵ�񵥾ݵķ�����ϸҳǩ��Ҫ�������
                 *
                 * <pre>
                 *      <code>
                 *            public class FeeDetailSecondDevFields implements IFeeDetailSaveAndSubmitAddFields {
                 *
                 *              public void feeDetailSaveAndSubmitAddFields(DynamicObject feeBill,DynamicObject row, DynamicObject feeDetailRow) {
                 *                   //��ͷ
                 *                   feeBill.set("test",feeDetailRow.get("test"));
                 *                  //��¼
                 *                  row.set("test",feeDetailRow.get("test"));
                 *              }
                 *            }
                 *      </code>
                 * </pre>
                 */
                feeDetailSaveAndSubmitAddFields?(feeBill:$.kd.bos.dataentity.entity.DynamicObject,row:$.kd.bos.dataentity.entity.DynamicObject,feeDetailRow:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IFeeDetailSaveAndSubmitAddFields_T = IFeeDetailSaveAndSubmitAddFields_S & IFeeDetailSaveAndSubmitAddFields$;
            interface IFeeDetailSaveAndSubmitAddFields extends IFeeDetailSaveAndSubmitAddFields_T {
            }
        }
        namespace kd.sdk.tmc.fca.extpoint{
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
                 *    import kd.sdk.tmc.fca.extpoint.ITranSupBillVoucher;
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
            interface IBalanceService_S {
            }
            interface IBalanceService$ {
                /**
                 * <p>Title: BalanceService.java </p>
                 * <pre>Description: �ʽ���ȼ��㻮������ʱ��������չ </pre>
                 *
                 * @param transferType �������� UP�ϻ���DOWN �²�
                 * @param strategyId   ��������ID
                 * @param accountId    �˻�ID
                 * @param currencyId   �ұ�ID
                 * @return �˻����
                 * <pre>
                 *      <code>
                 *            public class BalanceService implements IBalanceService {
                 *              @Override
                 *              public BigDecimal getBalanceAmount(String transferType, Long strategyId, Long accountId, Long currencyId) {
                 *                   return BigDecimal.ONE
                 *              }
                 *            }
                 *      </code>
                 * </pre>
                 */
                getBalanceAmount(transferType:string,strategyId:long,accountId:long,currencyId:long):$.java.math.BigDecimal;
            }
            type IBalanceService_T = IBalanceService_S & IBalanceService$;
            interface IBalanceService extends IBalanceService_T {
            }
        }
        namespace kd.sdk.tmc.fcs.extpoint.paymonitor{
            interface IRelationShipJob_S {
            }
            interface IRelationShipJob$ {
                /**
                 * @param srcObj Դ����ѯ����
                 * @param destObj Ŀ�굥��ѯ���󣺲�ѯ�����ϵʱ��ֵ����ѯ�ⲿ��ϵ��ֵ
                 * @param flag �޹�����ϵ�����ǩ��"NotLink"-û�в鵽searchA�Ĺ������ݣ�"HasLinkButNotFound"-�в鵽�������ݣ�����û�з���searchA��searchB���ڹ�ϵ
                 */
                doExt(srcObj:string,destObj:string,flag:string):void;
            }
            type IRelationShipJob_T = IRelationShipJob_S & IRelationShipJob$;
            interface IRelationShipJob extends IRelationShipJob_T {
            }
        }
        namespace kd.sdk.tmc.ifm.expoint{
            interface IInstBalanceCalcSecondDev_S {
            }
            interface IInstBalanceCalcSecondDev$ {
                /**
                 * ���ڼ�Ϣ��Ϣ��������װ��������
                 * @param innerAcct �����Ϣ�б�
                 * @param currency �ұ�
                 * @param beginDate ��ʼ����
                 * @param endDate ��������
                 *
                 * <pre>
                 * {@code
                 *   public class InstBalanceCalcSecondDev implements IInstBalanceCalcSecondDev {
                 *       @Override
                 *       public List<ExtPlanCallResult> getExtInstBalance(DynamicObject innerAcct, DynamicObject currency,
                 *                                                          Date beginDate, Date endDate) {
                 *           List<ExtPlanCallResult> results = new ArrayList<>();
                 *           results.add(new ExtPlanCallResult(new Date(), new BigDecimal(100)));
                 *           return results;
                 *       }
                 *   }
                 * </pre>
                 */
                getExtInstBalance?(innerAcct:$.kd.bos.dataentity.entity.DynamicObject,currency:$.kd.bos.dataentity.entity.DynamicObject,beginDate:Date,endDate:Date):$.java.util.List;
            }
            type IInstBalanceCalcSecondDev_T = IInstBalanceCalcSecondDev_S & IInstBalanceCalcSecondDev$;
            interface IInstBalanceCalcSecondDev extends IInstBalanceCalcSecondDev_T {
            }
        }
        namespace kd.sdk.tmc.mon.extpoint.mobile{
            interface IMobileSecondaryDevCard_S {
            }
            interface IMobileSecondaryDevCard$ {
                /**
                 * ���� �Զ�����ҳ��Ƭ��Ϣ
                 *
                 * @param cardMap ����ǰ��Ƭ��Ϣ
                 * @return ������Ƭ key:��ƬԪ���ݱ�ʶ value:����
                 *
                 * <p> ��չʾ������ </p>
                 * <pre>
                 *     <code>
                 *         public class MonMobileSecondaryDevCardTest implements IMobileSecondaryDevCard {
                 *
                 *              @Override
                 *              public Map<String, String> adjustCard(Map<String, String> cardMap) {
                 *                  cardMap.put("ssc_inte_audit_card_m", "�������ʿ�Ƭ");
                 *                  return cardMap;
                 *              }
                 *
                 *        }
                 *     </code>
                 * </pre>
                 */
                adjustCard?(cardMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ���� ��ƬȨ��
                 *
                 * @param permMap ����ǰ ��ƬȨ����Ϣ
                 * @return ������ƬȨ����Ϣ key:��ƬԪ���ݱ�ʶ value:Ȩ����
                 *
                 * <p> ��չʾ������ </p>
                 * <pre>
                 *     <code>
                 *         public class MonMobileSecondaryDevCardTest implements IMobileSecondaryDevCard {
                 *
                 *                  @Override
                 *                  public Map<String, String> adjustCardPerm(Map<String, String> permMap) {
                 *                      permMap.remove("mon_business_monitoring_m");
                 *                      return permMap;
                 *                  }
                 *
                 *        }
                 *     </code>
                 * </pre>
                 */
                adjustCardPerm?(permMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ���� ���� ��Ƭ
                 *
                 * @param subject �����ʶ @see kd.tmc.mon.formplugin.mobile.card.SubjectEnum
                 * @param cards   ��Ƭ����
                 * @return <p> ��չʾ������ </p>
                 * <pre>
                 *     <code>
                 *         public class MonMobileSecondaryDevCardTest implements IMobileSecondaryDevCard {
                 *
                 *                      @Override
                 *                      public List<String> adjustSubject(String subject, List<String> cards) {
                 *                          if ("STOCKANALYSIS".equals(subject)) {
                 *                              cards.add("mon_incexprank_card");
                 *                           }
                 *                          return cards;
                 *                      }
                 *
                 *        }
                 *     </code>
                 * </pre>
                 */
                adjustSubject?(subject:string,cards:$.java.util.List):$.java.util.List;
            }
            type IMobileSecondaryDevCard_T = IMobileSecondaryDevCard_S & IMobileSecondaryDevCard$;
            interface IMobileSecondaryDevCard extends IMobileSecondaryDevCard_T {
            }
        }
        namespace kd.sdk.tmc.psd.extpoint{
            interface IPayScheduleSelectBill_S {
            }
            interface IPayScheduleSelectBill$ {
                /**
                 * �ų�ѡƱ
                 * ѡƱʱ��-���鸶��ڱ�Ʒ�Զ���Ʊ����֮������Զ���ѡƱ�߼�
                 * ���裺
                 * 1�����㷽ʽ�����ұ�Ʊ�ݵ����ա��Ƿ�ֱ��Ʊ�ݹ��ˣ�
                 * 2������1�Ľ������selectBills����ȡ�ӿڷ��صĽ��
                 * 3������2�Ľ����������ѡƱ���������/�������������
                 * @param selectBillParam ѡƱ���
                 * @return Ʊ��id����
                 */
                selectBills?(selectBillParam:kd.sdk.tmc.psd.extpoint.param.SelectBillParam):$.java.util.Set;
            }
            type IPayScheduleSelectBill_T = IPayScheduleSelectBill_S & IPayScheduleSelectBill$;
            interface IPayScheduleSelectBill extends IPayScheduleSelectBill_T {
            }
        }
        namespace kd.sdk.tmc.psd.extpoint.param{
            interface SelectBillParam_S {
            }
            type SelectBillParam_ST = $.java.io.Serializable & SelectBillParam_S;
            interface SelectBillParam_C extends SelectBillParam_ST {
                new(payScheduleInfo:PayScheduleInfo):SelectBillParam;
            }
            interface SelectBillParam$ {
                getMergeScheduleList():$.java.util.List;
                getPayScheduleInfo():PayScheduleInfo;
                getSelectBillIds():$.java.util.Set;
                setMergeScheduleList(mergeScheduleList:$.java.util.List):void;
                setPayScheduleInfo(payScheduleInfo:PayScheduleInfo):void;
                setSelectBillIds(selectBillIds:$.java.util.Set):void;
            }
            type SelectBillParam_T = $.java.io.Serializable & SelectBillParam_S & SelectBillParam$;
            interface SelectBillParam extends SelectBillParam_T {
            }
            interface PayScheduleInfo_S {
            }
            type PayScheduleInfo_ST = $.java.io.Serializable & PayScheduleInfo_S;
            interface PayScheduleInfo_C extends PayScheduleInfo_ST {
                new(dataMap:$.java.util.Map):PayScheduleInfo;
            }
            interface PayScheduleInfo$ {
                getCalcProp(scheduleCalcProp:string):PaySchedulePropVal;
                getCalcPropVal(scheduleCalcProp:string):any;
                getDataMap():$.java.util.Map;
            }
            type PayScheduleInfo_T = $.java.io.Serializable & PayScheduleInfo_S & PayScheduleInfo$;
            interface PayScheduleInfo extends PayScheduleInfo_T {
            }
            interface PaySchedulePropVal_S {
            }
            type PaySchedulePropVal_ST = $.java.io.Serializable & PaySchedulePropVal_S;
            interface PaySchedulePropVal_C extends PaySchedulePropVal_ST {
                new():PaySchedulePropVal;
            }
            interface PaySchedulePropVal$ {
                getData():any;
                getPayScheDataSetting():string;
                getScheCalcProp():string;
                getScheProp():string;
                isCombineUnique():boolean;
                isEditable():boolean;
                isVisible():boolean;
                setCombineUnique(combineUnique:boolean):void;
                setData(arg0:any):void;
                setEditable(editable:boolean):void;
                setPayScheDataSetting(payScheDataSetting:string):void;
                setScheCalcProp(scheCalcProp:string):void;
                setScheProp(scheProp:string):void;
                setVisible(visible:boolean):void;
            }
            type PaySchedulePropVal_T = $.java.io.Serializable & PaySchedulePropVal_S & PaySchedulePropVal$;
            interface PaySchedulePropVal extends PaySchedulePropVal_T {
            }
        }
        namespace kd.sdk.tmc.psd.extpoint.task{
            interface IAssemblySecondaryDevFields_S {
            }
            interface IAssemblySecondaryDevFields$ {
                /**
                 * �ų̴��������ֶη�װ�� Map<String, Object> ������
                 * @param schebill �ų̴�����̬����
                 * @return java.util.Map<java.lang.String,java.lang.Object> ���ط�װ�õĶ����ֶμ���; key:�����ֶα�ʶ, value: ��Ӧ�����ֶΰ󶨵�ֵ
                 *
                 * <p>��չʾ������
                 *        <pre><code>
                 *        import kd.bos.dataentity.entity.DynamicObject;
                 *        import java.util.HashMap;
                 *        import java.util.Map;
                 *
                 *        public class AssemblySecondaryDevFields_Demo implements IAssemblySecondaryDevFields {
                 *
                 *            public Map<String, Object> assemblySecondaryDevFields(DynamicObject schebill) {
                 *                Map<String, Object> fieldMap = new HashMap<>(16);
                 *                fieldMap.put("a1", schebill.getString("xxxx1"));
                 *                fieldMap.put("a2", schebill.getString("xxxx2"));
                 *                fieldMap.put("a3", schebill.getString("xxxx3"));
                 *                return fieldMap;
                 *            }
                 *        }
                 *
                 *        </code></pre>
                 */
                assemblySecondaryDevFields?(schebill:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
            }
            type IAssemblySecondaryDevFields_T = IAssemblySecondaryDevFields_S & IAssemblySecondaryDevFields$;
            interface IAssemblySecondaryDevFields extends IAssemblySecondaryDevFields_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.arap{
            interface IArApTopCustSuppInterface_S {
            }
            interface IArApTopCustSuppInterface$ {
                /**
                 * @param propertyName �ͻ���customername  ��Ӧ�̣�suppliername
                 * @return ������
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.arap.extpoint;
                 *
                 * import kd.bos.algo.FilterFunction;
                 * import kd.bos.algo.Row;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.sdk.tmc.tda.extpoint.arap.IArApTopCustSuppInterface;
                 *
                 * public class ArApTopCustSuppDefaultExt implements IArApTopCustSuppInterface {
                 *
                 *     // �ͻ������ֶ�
                 *     private static final String CUSTOMER_FIELD = "customername";
                 *     // ��Ӧ�������ֶ�
                 *     private static final String SUPPLIER_FIELD = "suppliername";
                 *
                 *     public FilterFunction buildExtendFilter(String propertyName) {
                 *         return new FilterFunction() {
                 *
                 *            public boolean test(Row row) {
                 *                 String customerName = row.getString(propertyName);
                 *                 // �޳����������ַ��Ŀͻ�
                 *                 if (customerName != null && CUSTOMER_FIELD.equals(propertyName)) {
                 *                     return !customerName.contains(getSpecialChar0()) && !customerName.contains(getSpecialChar1()) &&
                 *                             !customerName.contains(getSpecialChar2()) && !customerName.contains(getSpecialChar3()) &&
                 *                             !customerName.contains(getSpecialChar5());
                 *                 } else if (customerName != null && SUPPLIER_FIELD.equals(propertyName)) {   // �޳����������ַ��Ĺ�Ӧ��
                 *                     return !customerName.contains(getSpecialChar0()) && !customerName.contains(getSpecialChar1()) &&
                 *                             !customerName.contains(getSpecialChar2()) && !customerName.contains(getSpecialChar3()) &&
                 *                             !customerName.contains(getSpecialChar4());
                 *                 }
                 *                 return false;
                 *             }
                 *         };
                 *     }
                 *
                 *     private String getSpecialChar0() {
                 *         return ResManager.loadKDString("0��", "ArApTopCustSuppDefaultExt_0", "tmc-tda-report");
                 *     }
                 *
                 *     private String getSpecialChar1() {
                 *         return ResManager.loadKDString("����", "ArApTopCustSuppDefaultExt_1", "tmc-tda-report");
                 *     }
                 *
                 *     private String getSpecialChar2() {
                 *         return ResManager.loadKDString("�ⲿ", "ArApTopCustSuppDefaultExt_2", "tmc-tda-report");
                 *     }
                 *
                 *     private String getSpecialChar3() {
                 *         return ResManager.loadKDString("�ͻ�", "ArApTopCustSuppDefaultExt_3", "tmc-tda-report");
                 *     }
                 *
                 *     private String getSpecialChar4() {
                 *         return ResManager.loadKDString("��Ӧ��", "ArApTopCustSuppDefaultExt_4", "tmc-tda-report");
                 *     }
                 *
                 *     private String getSpecialChar5() {
                 *         return ResManager.loadKDString("����", "ArApTopCustSuppDefaultExt_5", "tmc-tda-report");
                 *     }
                 *
                 * }
                 *
                 * </pre></code>
                 * </p>
                 */
                buildExtendFilter(propertyName:string):$.kd.bos.algo.FilterFunction;
            }
            type IArApTopCustSuppInterface_T = IArApTopCustSuppInterface_S & IArApTopCustSuppInterface$;
            interface IArApTopCustSuppInterface extends IArApTopCustSuppInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.bankacct{
            interface IBankAcctByBankInterfaceRPA_S {
            }
            interface IBankAcctByBankInterfaceRPA$ {
                /**
                 * ͨ�������˻�ID��ѯ��Ӧ�˻���RPA����
                 *
                 * @param param Map<Sting,Object> key��acctIds��value����Ҫ��ѯ�������˻�ID����
                 * @return DataSet�������У���������Ϊ��acct_id�������˻�ID����rpa_count��RPA������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.bos.servicehelper.QueryServiceHelper;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctByBankInterfaceRPA;
                 *
                 * import java.util.List;
                 * import java.util.Map;
                 *
                 * public class BankInterfaceRPATestExt implements IBankAcctByBankInterfaceRPA {
                 *
                 *     public DataSet queryRPADataSet(Map<String, Object> param) {
                 *         List<Long> acctIds = (List<Long>) param.get("acctIds");
                 *
                 *         // Ĭ��ͨ��������¼��Ϣά�������˻�RPA���ݣ����ѯԪ���ݱ�ʶ bcr_bankudset
                 *         DataSet rpaDataSet = QueryServiceHelper.queryDataSet("BankAcctByBankInterfaceSum", "bcr_bankudset",
                 *                 "entry.acctbank acct_id", new QFilter[]{new QFilter("entry.acctbank", QCP.in, acctIds)}, null);
                 *         DataSet rpaCountSet = rpaDataSet.groupBy(new String[]{"acct_id"}).countDistinct(new String[]{"acct_id"}, "rpa_count").finish();
                 *         return rpaCountSet;
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                queryRPADataSet(param:$.java.util.Map):$.kd.bos.algo.DataSet;
            }
            type IBankAcctByBankInterfaceRPA_T = IBankAcctByBankInterfaceRPA_S & IBankAcctByBankInterfaceRPA$;
            interface IBankAcctByBankInterfaceRPA extends IBankAcctByBankInterfaceRPA_T {
            }
            interface IParentAcctInterface_S {
            }
            interface IParentAcctInterface$ {
                /**
                 * ͨ����֯��ͼ��ȡ����ĸ�˻�id
                 *
                 * @param param Map<Sting,Object> key��orgview��value����֯��ͼ����
                 * @return List<Long>���е�ĸ�˻�id����
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import java.util.ArrayList;
                 * import java.util.Arrays;
                 * import java.util.Collections;
                 * import java.util.List;
                 * import java.util.Map;
                 * import java.util.stream.Collectors;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.tmc.fbp.common.helper.TmcDataServiceHelper;
                 * import kd.tmc.fbp.common.helper.TmcOrgDataHelper;
                 * import kd.tmc.fbp.common.util.EmptyUtil;
                 * import kd.tmc.tda.common.propertys.DecisionAnlsVersionProp;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IParentAcctInterface;
                 *
                 * public class ParentAcctDefaultExt implements IParentAcctInterface {
                 *
                 * 	public List<Long> getParentAcct(Map<String, Object> paramMap) {
                 * 		List<Long> acctIds = new ArrayList<>();
                 * 		Long orgviewId = ((DynamicObject) paramMap.get(DecisionAnlsVersionProp.ORGVIEW)).getLong("id");
                 *         Long orgId = ((DynamicObject) paramMap.get(DecisionAnlsVersionProp.ORG)).getLong("id");
                 *         List<Long> orgIds =  TmcOrgDataHelper.getAllSubordinateOrgs(orgviewId, Collections.singletonList(orgId), true);
                 * 		QFilter filter = new QFilter("company", QCP.in, orgIds);
                 * 		DynamicObject[] accts = TmcDataServiceHelper.load("fca_acctgroup","id",filter.toArray());
                 * 		if(EmptyUtil.isNoEmpty(accts)) {//�����֯��ͼ�µ�����ĸ�˻�
                 *             acctIds = Arrays.stream(accts).map(p->p.getLong("id")).collect(Collectors.toList());
                 *         }
                 * 		return acctIds;
                 * 	}
                 * }
                 * </pre></code>
                 * </p>
                 */
                getParentAcct(param:$.java.util.Map):$.java.util.List;
            }
            type IParentAcctInterface_T = IParentAcctInterface_S & IParentAcctInterface$;
            interface IParentAcctInterface extends IParentAcctInterface_T {
            }
            interface IBankAcctInterface_S {
            }
            interface IBankAcctInterface$ {
                /**
                 * �˻���ϸ���ֶ�����չ
                 * ��չ�����У�����fieldKey����ϸDataSet��fieldname���Ӧ��������Ϊ�������ı����ɸ�����Ҫ��������������
                 *
                 * @param fieldColumns
                 * @return ��չ�����ϸ������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.dataentity.entity.LocaleString;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.bos.entity.report.AbstractReportColumn;
                 * import kd.bos.entity.report.ReportColumn;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctInterface;
                 *
                 * import java.util.List;
                 *
                 * public class BankAcctInterfaceDefaultExt implements IBankAcctInterface {
                 *
                 *     public List<Object[]> detailColumnItemsExt(List<Object[]> fieldColumns) {
                 *         fieldColumns.add(new Object[]{"fieldKey", ResManager.loadKDString("������", "AcctDetailDataListPlugin_20", "tmc-tda-report"), ReportColumn.TYPE_TEXT, false,});
                 *         fieldColumns.add(new Object[]{"fieldKey", ResManager.loadKDString("������", "AcctDetailDataListPlugin_20", "tmc-tda-report"), ReportColumn.TYPE_TEXT, false,});
                 *         return fieldColumns;
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                detailColumnItemsExt?(fieldColumns:$.java.util.List):$.java.util.List;
                /**
                 * �˻���ӪԪ������չ
                 * Ĭ�ϲ�ѯbd_accountbanks�������˻������������˻���ѯ����ʱ���滻Ԫ���ݱ�ʶ���ɡ�
                 *
                 * @return Ԫ���ݱ�ʶ�ַ���
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctInterface;
                 *
                 * public class BankAcctInterfaceDefaultExt implements IBankAcctInterface {
                 *
                 *      public String metadataSignExt() {
                 *  	    // �˻���ѯԪ����
                 *  	    return am_accountbank;
                 *      }
                 * }
                 * </pre></code>
                 * </p>
                 */
                metadataSignExt?():string;
                /**
                 * �˻���ѯ����������չ
                 * ��ԭ��QFilter�Ļ�������չ�Զ���QFilter
                 *
                 * @param qFilter
                 * @return ��չ���qFilter
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.dataentity.entity.LocaleString;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.bos.entity.report.AbstractReportColumn;
                 * import kd.bos.entity.report.ReportColumn;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctInterface;
                 *
                 * import java.util.List;
                 *
                 * public class BankAcctInterfaceDefaultExt implements IBankAcctInterface {
                 *
                 *     public QFilter qFilterExt(QFilter qFilter) {
                 *         return qFilter.and("1", QCP.equals, 1);
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                qFilterExt?(qFilter:$.kd.bos.orm.query.QFilter):$.kd.bos.orm.query.QFilter;
                /**
                 * ��������չ
                 * ���ڶ�̬���������У��б�ʶfieldKey�뱨������DataSet��fieldname���Ӧ
                 *
                 * @param columns
                 * @return ��չ���columns
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.dataentity.entity.LocaleString;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.bos.entity.report.AbstractReportColumn;
                 * import kd.bos.entity.report.ReportColumn;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctInterface;
                 *
                 * import java.util.List;
                 *
                 * public class BankAcctInterfaceDefaultExt implements IBankAcctInterface {
                 *
                 *     public List<AbstractReportColumn> reportColumnsExt(List<AbstractReportColumn> columns) {
                 *         columns.add(createColumn("fieldKey", "��̬������", false));
                 *         return columns;
                 *     }
                 *
                 * 	private ReportColumn createColumn(String fieldKey, String caption, boolean isHide) {
                 *         ReportColumn reportColumn = new ReportColumn();
                 *         // �б�ʶ
                 *         reportColumn.setFieldKey(fieldKey);
                 *         // ��������������
                 *         reportColumn.setFieldType(ReportColumn.TYPE_INTEGER);
                 *         // ��ֵΪ0�Ƿ���ʾ
                 *         reportColumn.setZeroShow(true);
                 *         // ������
                 *         reportColumn.setCaption(new LocaleString(caption));
                 *         // ���Ƿ�����
                 *         reportColumn.setHide(isHide);
                 *         return reportColumn;
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                reportColumnsExt?(columns:$.java.util.List):$.java.util.List;
                /**
                 * @param dataSet
                 * @param queryParam
                 * @return
                 */
                reportDataSetExt?(dataSet:$.kd.bos.algo.DataSet,queryParam:$.kd.bos.entity.report.ReportQueryParam):$.kd.bos.algo.DataSet;
                /**
                 * �˻���ѯ�ֶ���չ
                 * �Զ�����չ�ֶΣ�Ҳ�ɶԲ�ѯ�ֶ������������磺field1 as fd1
                 *
                 * @return ��ѯ�ֶ��ַ�������Ӣ�Ķ��ŷָ�
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.bankacct.extpoint;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.dataentity.entity.LocaleString;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.bos.entity.report.AbstractReportColumn;
                 * import kd.bos.entity.report.ReportColumn;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.bankacct.IBankAcctInterface;
                 *
                 * import java.util.List;
                 *
                 * public class BankAcctInterfaceDefaultExt implements IBankAcctInterface {
                 *
                 *     public String selectFieldsExt() {
                 *         return "field1 as fd1, field2";
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                selectFieldsExt?():string;
            }
            type IBankAcctInterface_T = IBankAcctInterface_S & IBankAcctInterface$;
            interface IBankAcctInterface extends IBankAcctInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.credit{
            interface ICreditGetDataInterface_S {
            }
            interface ICreditGetDataInterface$ {
                /**
                 * ��ѯ���Ŷ���Զ�������
                 *
                 * @return �Զ�������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.credit.extpoint;
                 *
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.credit.ICreditGetDataInterface;
                 *
                 * public class CreditGetDataDefaultExt implements ICreditGetDataInterface {
                 *
                 *     public QFilter getTdaCreditExtendFilter(QFilter qFilter) {
                 *     	 // �����Զ����QFilter
                 *         return qFilter.and("1", QCP.equals, 1);
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                getTdaCreditExtendFilter(qFilter:$.kd.bos.orm.query.QFilter):$.kd.bos.orm.query.QFilter;
            }
            type ICreditGetDataInterface_T = ICreditGetDataInterface_S & ICreditGetDataInterface$;
            interface ICreditGetDataInterface extends ICreditGetDataInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.finance{
            interface IFinanceLeaseSourceInterface_S {
            }
            interface IFinanceLeaseSourceInterface$ {
                /**
                 *  ���߷�����������ȡ��Դ����ʶ��չ
                 *
                 *  @return String ��������ȡ������ʶ
                 *
                 *  <p>Ĭ����չʾ������
                 *  <pre><code>
                 * package kd.tmc.tda.common.extpoint;
                 *
                 * import kd.sdk.tmc.tda.extpoint.finance.IFinanceLeaseSourceInterface;
                 *
                 * public class FinanceLeaseSourceDefaultExt implements IFinanceLeaseSourceInterface {
                 *
                 *    public String getFormId() {
                 *        return "fa_lease_contract";
                 *    }
                 *  }
                 *  </pre></code>
                 *  </p>
                 */
                getFormId():string;
            }
            type IFinanceLeaseSourceInterface_T = IFinanceLeaseSourceInterface_S & IFinanceLeaseSourceInterface$;
            interface IFinanceLeaseSourceInterface extends IFinanceLeaseSourceInterface_T {
            }
            interface IFinanceSourceReBuildInterface_S {
            }
            interface IFinanceSourceReBuildInterface$ {
                /**
                 * ���߷������ʷ��������ڲ���˾���ݺ�������������Դ���·�����չ�ӿ�
                 *
                 * @param sources DataSet[] ��һ��DataSet�ǲ���˾����Դ���ڶ���DataSet���������޷��������Դ
                 *
                 * @return DataSet[] ���·����������һ���ǲ���˾����DataSet�͵ڶ�����������������DataSet
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 *
                 * package kd.sdk.tmc.tda.extpoint.finance;
                 *
                 * import kd.bos.algo.DataSet;
                 *
                 * public class FinanceSourceReBuildDefaultExt implements IFinanceSourceReBuildInterface {
                 *
                 *     public DataSet[] rebuildDataSet(DataSet[] sources) {
                 *         //����˾
                 *         DataSet finComDataSet = sources[0];
                 *         //��������
                 *         DataSet leaseDataSet = sources[1];
                 *         //������˾��Ҫ�Ƶ��������޵����ݷָ���� ("billno = '�������޵��ݱ��'")��������ֳ��Լ�����ҵ��д
                 *         DataSet[] splitDataSet = finComDataSet.splitByFilter(new String[]{"billno = '�������޵��ݱ��'"}, true);
                 *         //�ָ������������������
                 *         DataSet leaseExtDataSet = splitDataSet[0];
                 *         //�ָ��ʣ�µĲ���˾������
                 *         DataSet newFinComDataSet = splitDataSet[1];
                 *         //���ºϲ�������������
                 *         DataSet newLeaseDataSet = leaseDataSet.union(leaseExtDataSet);
                 *         return new DataSet[]{newFinComDataSet, newLeaseDataSet};
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                rebuildDataSet(sources:$.kd.bos.algo.DataSet[]):$.kd.bos.algo.DataSet[];
            }
            type IFinanceSourceReBuildInterface_T = IFinanceSourceReBuildInterface_S & IFinanceSourceReBuildInterface$;
            interface IFinanceSourceReBuildInterface extends IFinanceSourceReBuildInterface_T {
            }
            interface IFinanceDataFilter_S {
            }
            interface IFinanceDataFilter$ {
                /**
                 *  ���߷�������ͳһȡ��������ҵ���
                 *
                 *  @return String dataset��������
                 *
                 *  <p>Ĭ����չʾ������
                 *  <pre><code>
                 * package kd.tmc.tda.common.extpoint;
                 *
                 * import kd.sdk.tmc.tda.extpoint.finance.IFinanceDataFilter;
                 *
                 * public class FinanceDataExcludeCompany implements IFinanceDataFilter {
                 *
                 *    public String getFilter() {
                 *        return "financetype != 2";
                 *    }
                 *  }
                 *  </pre></code>
                 *  </p>
                 */
                getFilter():string;
            }
            type IFinanceDataFilter_T = IFinanceDataFilter_S & IFinanceDataFilter$;
            interface IFinanceDataFilter extends IFinanceDataFilter_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.interloan{
            interface IInterLoanDetailInterface_S {
            }
            interface IInterLoanDetailInterface$ {
                /**
                 * ��ҵ�����ϸ��������չ
                 * ��չ�����У�����fieldKey����ϸDataSet��fieldname���Ӧ��������Ϊ�������ı����ɸ�����Ҫ��������������
                 *
                 * @param fieldColumns
                 * @return ��չ�����ϸ������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.sdk.tmc.tda.extpoint.interloan;
                 *
                 * import kd.bos.algo.DataSet;
                 * import kd.bos.algo.Row;
                 * import kd.bos.dataentity.resource.ResManager;
                 * import kd.bos.entity.report.ReportColumn;
                 * import kd.bos.orm.query.QCP;
                 * import kd.bos.orm.query.QFilter;
                 * import kd.bos.servicehelper.QueryServiceHelper;
                 *
                 * import java.util.HashSet;
                 * import java.util.List;
                 * import java.util.Map;
                 * import java.util.Set;
                 *
                 * public class InterLoanInterfaceDefaultExt implements IInterLoanDetailInterface {
                 *
                 *     public List<Object[]> detailColumnItemsExt(List<Object[]> fieldColumns) {
                 *         fieldColumns.add(new Object[]{"billno", ResManager.loadKDString("���ݱ��", "FinanceDetailDataListPlugin_1", "tmc-tda-report"), ReportColumn.TYPE_TEXT, false});
                 *         fieldColumns.add(new Object[]{"contractno", ResManager.loadKDString("��ͬ���", "FinanceDetailDataListPlugin_2", "tmc-tda-report"), ReportColumn.TYPE_TEXT, false});
                 *         return fieldColumns;
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                detailColumnItemsExt?(fieldColumns:$.java.util.List):$.java.util.List;
                /**
                 * @param dataSet
                 * @param paramMap
                 * @return
                 */
                detailDataSetExt?(dataSet:$.kd.bos.algo.DataSet,paramMap:$.java.util.Map):$.kd.bos.algo.DataSet;
            }
            type IInterLoanDetailInterface_T = IInterLoanDetailInterface_S & IInterLoanDetailInterface$;
            interface IInterLoanDetailInterface extends IInterLoanDetailInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.liquidity{
            interface ILiquidityCalculateInterface_S {
            }
            interface ILiquidityCalculateInterface$ {
                /**
                 * ��������������ָ����㹫ʽ
                 *
                 * @return �����Զ���
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.sdk.tmc.tda.extpoint.liquidity;
                 *
                 * import kd.bos.dataentity.entity.DynamicObject;
                 * import kd.sdk.tmc.tda.extpoint.liquidity.ILiquidityCalculateInterface;
                 *
                 * import java.math.BigDecimal;
                 * import java.math.RoundingMode;
                 *
                 * public class LiquidityCalculateDefaultExt implements ILiquidityCalculateInterface {
                 *     private final int DEFAULT_SCALE = 10;
                 *
                 *     public DynamicObject resetCalculationFormula(DynamicObject liquidityBill) {
                 *         // �ʲ�
                 *         BigDecimal assetsAmt = liquidityBill.getBigDecimal(LiquidityBillProp.ASSETSAMT);
                 *         // ��ծ
                 *         BigDecimal debtAmt = liquidityBill.getBigDecimal(LiquidityBillProp.DEBTAMT);
                 *     	   // ��Ϣ��ծ�� = ��Ϣ��ծ/��ծ
                 *         BigDecimal intDebtRate = EmptyUtil.isEmpty(debtAmt) ? BigDecimal.ZERO : intDebtAmt.divide(debtAmt, DEFAULT_SCALE, RoundingMode.HALF_UP);
                 *         liquidityBill.set(LiquidityBillProp.INTDEBTRATE, intDebtRate);
                 *         return liquidityBill;
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                resetCalculationFormula(liquidityBill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
            }
            type ILiquidityCalculateInterface_T = ILiquidityCalculateInterface_S & ILiquidityCalculateInterface$;
            interface ILiquidityCalculateInterface extends ILiquidityCalculateInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.note{
            interface IDraftBillDecisionRptInterface_S {
            }
            interface IDraftBillDecisionRptInterface$ {
                /**
                 * ���߷���Ʊ�ݹ����滻��׼��Ʒ��Ʊ��ʵ��
                 *
                 * @param entityName��ԴƱ������ Ӧ��Ʊ�ݣ�cdm_receivablebill�� Ӧ��Ʊ�ݣ�cdm_payablebill�� ҵ�����ݣ�cdm_drafttradebill
                 * @return ����Ʊ��ʵ������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.report.note.extpoint;
                 *
                 * import kd.sdk.tmc.tda.extpoint.note.IDraftBillDecisionRptInterface;
                 * import kd.tmc.fbp.common.constant.TmcEntityConst;
                 *
                 * public class DraftBillDecisionRptDefaultExt implements IDraftBillDecisionRptInterface {
                 *
                 *      public String getDraftBillEntityName(String entityName) {
                 *          String draftBillEntityName = entityName == null ? "" : entityName;
                 *          switch (draftBillEntityName) {
                 *          case TmcEntityConst.CDM_RECEIVABLEBILL:
                 *               // ��Ʊ�Ǽ�
                 *               draftBillEntityName = TmcEntityConst.CDM_RECEIVABLEBILL;
                 *               break;
                 *          case TmcEntityConst.CDM_PAYABLEBILL:
                 *               // ��Ʊ�Ǽ�
                 *               draftBillEntityName = TmcEntityConst.CDM_PAYABLEBILL;
                 *               break;
                 *          case TmcEntityConst.CDM_DRAFTTRADEBILL:
                 *               // ҵ����
                 *               draftBillEntityName = TmcEntityConst.CDM_DRAFTTRADEBILL;
                 *               break;
                 *           default:
                 *         }
                 *         return draftBillEntityName;
                 *      }
                 * }
                 *
                 * </pre></code>
                 * </p>
                 */
                getDraftBillEntityName(entityName:string):string;
            }
            type IDraftBillDecisionRptInterface_T = IDraftBillDecisionRptInterface_S & IDraftBillDecisionRptInterface$;
            interface IDraftBillDecisionRptInterface extends IDraftBillDecisionRptInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.settle{
            interface IBigAmountDataInterface_S {
            }
            interface IBigAmountDataInterface$ {
                /**
                 * ȡ������ϸ�����Զ�������
                 *
                 * @return �Զ�������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.mservice.settle.extpoint;
                 *
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.settle.IBigAmountDataInterface;
                 *
                 * public class BigAmountDataDefaultExt implements IBigAmountDataInterface {
                 *
                 *     public QFilter getExtendFilter() {
                 *     	   // �����Զ����QFilter
                 *         return QFilter.of("1=1");
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                getExtendFilter():$.kd.bos.orm.query.QFilter;
            }
            type IBigAmountDataInterface_T = IBigAmountDataInterface_S & IBigAmountDataInterface$;
            interface IBigAmountDataInterface extends IBigAmountDataInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.synthesis{
            interface ISynthesisLoadDataInterface_S {
            }
            interface ISynthesisLoadDataInterface$ {
                /**
                 * �ۺϷ�����Ŀ���ƶ�����չ
                 *
                 * @param projectValue
                 * @return �޸ĺ����Ŀ����
                 *      FD: �����ʽ�
                 *      PR: �����ʣ��껯��
                 *      IDA: ������Ϣ��ծ
                 *      FC: ���ʳɱ����껯��
                 *      NA: ���ʲ�
                 *      EA: ���У�Ȩ�湤��
                 *      ADR: �ʲ���ծ��
                 *      IDR: ��Ϣ��ծ��
                 *      IDER: ��Ϣ��ծ�ʣ���Ȩ�湤�ߣ�
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.mservice.synthesis.extpoint;
                 *
                 * import kd.sdk.tmc.tda.extpoint.synthesis.ISynthesisLoadDataInterface;
                 *
                 * public class SynthesisLoadDataDefaultExt implements ISynthesisLoadDataInterface {
                 *
                 *     public String getExtendProjectName(String projectValue) {
                 *     	   // �޸ĺ�����ƣ�ProjectNameEnum���Լ�ʵ��
                 *         return ProjectNameEnum.getName(projectValue);
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                getExtendProjectName(projectValue:string):string;
            }
            type ISynthesisLoadDataInterface_T = ISynthesisLoadDataInterface_S & ISynthesisLoadDataInterface$;
            interface ISynthesisLoadDataInterface extends ISynthesisLoadDataInterface_T {
            }
        }
        namespace kd.sdk.tmc.tda.extpoint.transdetail{
            interface ITransDetailGetDataInterface_S {
            }
            interface ITransDetailGetDataInterface$ {
                /**
                 * ��ѯ������ϸ�Զ�������
                 *
                 * @return �Զ�������
                 *
                 * <p>Ĭ����չʾ������
                 * <pre><code>
                 * package kd.tmc.tda.mservice.detail.extpoint;
                 *
                 * import kd.bos.orm.query.QFilter;
                 * import kd.sdk.tmc.tda.extpoint.transdetail.ITransDetailGetDataInterface;
                 *
                 * public class TransDetailGetDataDefaultExt implements ITransDetailGetDataInterface {
                 *
                 *     public QFilter getExtendFilter() {
                 *     	// �����Զ����QFilter
                 *         return QFilter.of("1=1");
                 *     }
                 * }
                 * </pre></code>
                 * </p>
                 */
                getExtendFilter():$.kd.bos.orm.query.QFilter;
            }
            type ITransDetailGetDataInterface_T = ITransDetailGetDataInterface_S & ITransDetailGetDataInterface$;
            interface ITransDetailGetDataInterface extends ITransDetailGetDataInterface_T {
            }
        }
        namespace kd.sdk.tmc.tmbrm.extpoint{
            interface IFinOrgArchivesAssociatedBillInterface_S {
            }
            interface IFinOrgArchivesAssociatedBillInterface$ {
                /**
                 * ����ҵ�񵥾ݹ���������չ
                 * @param associatedOrg ������֯
                 * @return key-����ҵ�񵥾�ʵ���ʶ��value-���ݹ�������
                 */
                getBillQFilter(associatedOrg:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
                /**
                 * ����ҵ�񵥾�������չ
                 * @return ����ҵ�񵥾�ʵ���ʶ����
                 */
                getBillType():$.java.util.List;
            }
            type IFinOrgArchivesAssociatedBillInterface_T = IFinOrgArchivesAssociatedBillInterface_S & IFinOrgArchivesAssociatedBillInterface$;
            interface IFinOrgArchivesAssociatedBillInterface extends IFinOrgArchivesAssociatedBillInterface_T {
            }
        }
    }
}
export {};