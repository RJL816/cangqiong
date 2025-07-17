/// <reference types="../../@cosmic/bos-script" />
/// <reference types="../../@cosmic/bos-core" />
declare global {
    namespace $ {
        namespace kd.bos.entity.property{
            interface PictureProp_S {
            }
            type PictureProp_ST = kd.bos.mservice.svc.picture.IPictureProp_S & FieldProp_S & PictureProp_S;
            interface PictureProp_C extends PictureProp_ST {
                new():PictureProp;
            }
            interface PictureProp$ {
                getBackgroundImgKey():string;
                getImgSourceNew():number;
                getMaxImgSize():number;
                getThumbnailsParams():$.java.util.List;
                setBackgroundImgKey(arg0:string):void;
                setDefaultImgKey(arg0:string):void;
                setImgSourceNew(arg0:number):void;
                setMaxImgSize(arg0:number):void;
                setThumbnailsParams(arg0:$.java.util.List):void;
            }
            type PictureProp_T = FieldProp & kd.bos.mservice.svc.picture.IPictureProp & PictureProp_S & PictureProp$;
            interface PictureProp extends PictureProp_T {
            }
        }
        namespace kd.bos.form.field{
            interface PictureEdit_S {
            }
            type PictureEdit_ST = FieldEdit_S & $.kd.bos.form.control.events.ISuportClick & PictureEdit_S;
            interface PictureEdit_C extends PictureEdit_ST {
                new():PictureEdit;
            }
            interface PictureEdit$ {
                addWaterMarkListener(arg0:$.kd.bos.form.control.events.WaterMarkListener):void;
                beforeUpload(arg0:$.java.util.List):void;
                click():void;
                getImagePreviewUrl(arg0:$.java.util.List):void;
                getOperationKey():string;
                getOriginalPictrue():string;
                getThumbnailsParams():$.java.util.List;
                getThumbnailsURLs():$.java.util.Map;
                getWaterMarkInfos():void;
                remove(arg0:$.java.util.HashMap):void;
                setOperationKey(arg0:string):void;
                setShowWaterMark(arg0:boolean):void;
                showPic():void;
                uploadResult(arg0:$.java.util.List):void;
            }
            type PictureEdit_T = FieldEdit & $.kd.bos.form.control.events.ISuportClick & PictureEdit_S & PictureEdit$;
            interface PictureEdit extends PictureEdit_T {
            }
        }
        namespace kd.bos.mservice.svc.picture{
            interface IPictureProp_S {
            }
            interface IPictureProp$ {
                getDefaultImgKey?():string;
            }
            type IPictureProp_T = IPictureProp_S & IPictureProp$;
            interface IPictureProp extends IPictureProp_T {
            }
        }
        namespace kd.hr.hbp.business.domain.model.newhismodel{
            interface HisResponse_S {
            }
            interface HisResponse_C extends HisResponse_S {
                new():HisResponse;
            }
            interface HisResponse$ {
                getCode():string;
                getData():any;
                getErrorMessage():string;
                setCode(arg0:string):void;
                setData(arg0:any):void;
                setErrorMessage(arg0:string):void;
            }
            type HisResponse_T = HisResponse_S & HisResponse$;
            interface HisResponse extends HisResponse_T {
            }
        }
        namespace kd.hr.hbp.business.servicehelper{
            interface HRBaseServiceHelper_S {
                create(arg0:string):HRBaseServiceHelper;
            }
            interface HRBaseServiceHelper_C extends HRBaseServiceHelper_S {
                new(arg0:string):HRBaseServiceHelper;
            }
            interface HRBaseServiceHelper$ {
                count(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):number;
                delete(arg0:any[]):void;
                deleteByFilter(arg0:$.kd.bos.orm.query.QFilter[]):number;
                deleteOne(arg0:any):void;
                genEmptyEntryColl(arg0:$.kd.bos.dataentity.entity.DynamicObject,arg1:string):any;
                genEmptyEntryCollWithSize(arg0:$.kd.bos.dataentity.entity.DynamicObject,arg1:string,arg2:number):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                generateDynamicObject(arg0:any,arg1:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateDynamicObject(arg0:$.kd.bos.dataentity.entity.DynamicObject,arg1:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateDynamicObject(arg0:string,arg1:any,arg2:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateDynamicObject(arg0:string,arg1:$.kd.bos.dataentity.entity.DynamicObject,arg2:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateEmptyDynamicObject():$.kd.bos.dataentity.entity.DynamicObject;
                generateEmptyDynamicObject(arg0:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateEmptyEntryCollection(arg0:$.kd.bos.dataentity.entity.DynamicObject,arg1:string):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                generateEmptyEntryDynamicObject(arg0:string):$.kd.bos.dataentity.entity.DynamicObject;
                generateEmptyEntryDynamicObject(arg0:string,arg1:string):$.kd.bos.dataentity.entity.DynamicObject;
                getEntityName():string;
                isExists(arg0:any):boolean;
                isExists(arg0:$.kd.bos.orm.query.QFilter[]):boolean;
                isExists(arg0:$.kd.bos.orm.query.QFilter):boolean;
                loadDynamicObject(arg0:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject;
                loadDynamicObject(arg0:$.kd.bos.orm.query.QFilter):$.kd.bos.dataentity.entity.DynamicObject;
                loadDynamicObjectArray(arg0:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject[];
                loadDynamicObjectArray(arg0:any[]):$.kd.bos.dataentity.entity.DynamicObject[];
                loadDynamicObjectArray(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject[];
                loadDynamicObjectArray(arg0:string,arg1:any[]):$.kd.bos.dataentity.entity.DynamicObject[];
                loadSingle(arg0:any):$.kd.bos.dataentity.entity.DynamicObject;
                loadSingle(arg0:string,arg1:any):$.kd.bos.dataentity.entity.DynamicObject;
                query(arg0:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject[];
                query(arg0:$.kd.bos.orm.query.QFilter[],arg1:string):$.kd.bos.dataentity.entity.DynamicObject[];
                query(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject[];
                query(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string):$.kd.bos.dataentity.entity.DynamicObject[];
                query(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string,arg3:number):$.kd.bos.dataentity.entity.DynamicObject[];
                queryDataSet(arg0:string,arg1:string):$.kd.bos.algo.DataSet;
                queryDataSet(arg0:string,arg1:string,arg2:$.kd.bos.orm.query.QFilter[]):$.kd.bos.algo.DataSet;
                queryDataSet(arg0:string,arg1:string,arg2:string):$.kd.bos.algo.DataSet;
                queryDataSet(arg0:string,arg1:string,arg2:$.kd.bos.orm.query.QFilter[],arg3:string):$.kd.bos.algo.DataSet;
                queryDataSet(arg0:string,arg1:string,arg2:$.kd.bos.orm.query.QFilter[],arg3:string,arg4:number):$.kd.bos.algo.DataSet;
                queryMultiEntityDataSet(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string,arg3:boolean,arg4:number,arg5:number):$.kd.bos.algo.DataSet;
                queryOne(arg0:any):$.kd.bos.dataentity.entity.DynamicObject;
                queryOne(arg0:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject;
                queryOne(arg0:string,arg1:any):$.kd.bos.dataentity.entity.DynamicObject;
                queryOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject;
                queryOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter):$.kd.bos.dataentity.entity.DynamicObject;
                queryOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalArray(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject[];
                queryOriginalArray(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string):$.kd.bos.dataentity.entity.DynamicObject[];
                queryOriginalCollection(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                queryOriginalCollection(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                queryOriginalOne(arg0:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalOne(arg0:$.kd.bos.orm.query.QFilter):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalOne(arg0:string,arg1:any):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter[]):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter):$.kd.bos.dataentity.entity.DynamicObject;
                queryOriginalOne(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string):$.kd.bos.dataentity.entity.DynamicObject;
                queryTranPropList(arg0:string,arg1:$.kd.bos.orm.query.QFilter[],arg2:string,arg3:$.java.lang.Class):$.java.util.List;
                save(arg0:$.kd.bos.dataentity.entity.DynamicObject[]):any[];
                save(arg0:$.kd.bos.dataentity.entity.DynamicObjectCollection):any[];
                saveOne(arg0:$.kd.bos.dataentity.entity.DynamicObject):any;
                setEntityName(arg0:string):void;
                update(arg0:$.kd.bos.dataentity.entity.DynamicObject[]):any[];
                updateDataOne(arg0:$.kd.bos.dataentity.entity.DynamicObject):void;
                updateDatas(arg0:$.kd.bos.dataentity.entity.DynamicObject[]):void;
                updateMultDynObjColl(arg0:string,arg1:kd.hr.hbp.common.function_.DynCollHandler,...arg2:string[]):any;
                updateOne(arg0:$.kd.bos.dataentity.entity.DynamicObject):any;
                updateSingleDynObjColl(arg0:string,arg1:string,arg2:kd.hr.hbp.common.function_.DynCollHandler):any;
            }
            type HRBaseServiceHelper_T = HRBaseServiceHelper_S & HRBaseServiceHelper$;
            interface HRBaseServiceHelper extends HRBaseServiceHelper_T {
            }
        }
        namespace kd.hr.hbp.common.function_{
            interface DynCollHandler_S {
                readonly MAIN_ENTITY_PARAMS_KEY:string;
            }
            interface DynCollHandler$ {
                buildDelEntryCollection?(arg0:$.kd.bos.dataentity.entity.DynamicObjectCollection,arg1:$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType):void;
                buildEntryCollection?(arg0:$.kd.bos.dataentity.entity.DynamicObjectCollection,arg1:$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType,arg2:$.java.util.List):void;
                getParams():any;
                setMainEntityVal?(arg0:$.kd.bos.dataentity.entity.DynamicObject,arg1:$.java.util.List):void;
            }
            type DynCollHandler_T = DynCollHandler_S & DynCollHandler$;
            interface DynCollHandler extends DynCollHandler_T {
            }
        }
        namespace kd.hr.hbp.common.model{
            interface DimValueResult_S {
            }
            type DimValueResult_ST = $.java.io.Serializable & DimValueResult_S;
            interface DimValueResult_C extends DimValueResult_ST {
                new():DimValueResult;
                new(arg0:boolean):DimValueResult;
                new(arg0:boolean,arg1:$.java.util.Set):DimValueResult;
            }
            interface DimValueResult$ {
                getDimValueIds():$.java.util.Set;
                isAll():boolean;
                setAll(arg0:boolean):void;
                setDimValueIds(arg0:$.java.util.Set):void;
            }
            type DimValueResult_T = $.java.io.Serializable & DimValueResult_S & DimValueResult$;
            interface DimValueResult extends DimValueResult_T {
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
        namespace kd.hr.hbp.common.util{
            interface HRDateTimeUtils_S {
                readonly YYYY_MM_DD:string;
                readonly YYYY_MM_DD_HH_MM_SS:string;
                addDate(arg0:Date,arg1:Date):Date;
                addDay(arg0:Date,arg1:long):Date;
                addDays(arg0:number,arg1:Date):Date;
                addDuration(arg0:Date,arg1:number,arg2:number):Date;
                addDuration(arg0:Date,arg1:number,arg2:number,arg3:number):Date;
                addDuration(arg0:Date,arg1:number,arg2:number,arg3:number,arg4:number):Date;
                addDuration(arg0:Date,arg1:number,arg2:number,arg3:number,arg4:number,arg5:number):Date;
                addDuration(arg0:Date,arg1:number,arg2:number,arg3:number,arg4:number,arg5:number,arg6:number):Date;
                addHour(arg0:Date,arg1:long):Date;
                addMinute(arg0:Date,arg1:long):Date;
                addMonth(arg0:Date,arg1:number):Date;
                addSecond(arg0:Date,arg1:long):Date;
                addYear(arg0:Date,arg1:number):Date;
                convertAfter1YearDate(arg0:long):Date;
                convertBefore1YearDate(arg0:long):Date;
                convertBefore365DayDate(arg0:long):Date;
                convertDate(arg0:long):Date;
                curAfter1YearDate():Date;
                curAfter365DayDate():Date;
                curDate():Date;
                curUserDateBos(arg0:long):Date;
                dateDiff(arg0:Date,arg1:Date):long;
                dateDiff(arg0:string,arg1:Date,arg2:Date):long;
                dateFormatDate(arg0:Date):Date;
                dateToGMT(arg0:Date,arg1:string):string;
                dateToSQL(arg0:Date):string;
                dayAfter(arg0:Date,arg1:Date):boolean;
                dayBefore(arg0:Date,arg1:Date):boolean;
                dayEquals(arg0:Date,arg1:Date):boolean;
                daysOfMonth(arg0:number,arg1:number):number;
                defaultDateString(arg0:Date):string;
                defaultDateString(arg0:Date,arg1:$.java.util.TimeZone):string;
                emailDate(arg0:Date):string;
                emailDate(arg0:Date,arg1:$.java.util.TimeZone):string;
                format(arg0:Date):string;
                format(arg0:Date,arg1:string):string;
                format(arg0:Date,arg1:$.java.util.TimeZone):string;
                format(arg0:Date,arg1:string,arg2:$.java.util.TimeZone):string;
                format(arg0:Date,arg1:string,arg2:$.java.util.TimeZone,arg3:$.java.util.Locale):string;
                formatDate(arg0:Date):string;
                formatDate(arg0:Date,arg1:$.java.util.TimeZone):string;
                formatTime(arg0:Date):string;
                formatTime(arg0:Date,arg1:$.java.util.TimeZone):string;
                formatUserSettingFromDate(arg0:Date):string;
                formatUserSettingFromString(arg0:string):string;
                geTimeZoneToday(arg0:$.java.util.TimeZone):Date;
                getBeforeDay(arg0:Date):Date;
                getCoarseDuration(arg0:Date,arg1:Date):string;
                getCurrentMonthDays():number;
                getCurrentQuarterDate():$.java.util.List;
                getCurrentYearDays():number;
                getDateScope(arg0:number,arg1:$.java.util.Calendar,arg2:number,arg3:number):$.java.util.List;
                getDateStrWithoutMin(arg0:Date):string;
                getDateStrWithoutMinTs(arg0:Date):string;
                getDay(arg0:Date):number;
                getDayName(arg0:number):string;
                getDayName(arg0:Date):string;
                getDurationToDatabase(arg0:Date,arg1:Date):long;
                getElapsedTime(arg0:Date,arg1:Date,arg2:Date):number;
                getFirstDayOfCurrentMonth():Date;
                getFirstDayOfCurrentYear():Date;
                getGMTDate():Date;
                getGMTHour():number;
                getGMTOffset(arg0:Date):long;
                getMonth(arg0:Date):number;
                getMonthName(arg0:number):string;
                getMonthName(arg0:Date):string;
                getNextDay(arg0:Date):Date;
                getNowDate():Date;
                getNowDateTime():Date;
                getPreciseDuration(arg0:Date,arg1:Date):string;
                getQuarter(arg0:Date):number;
                getRemainTime(arg0:Date):$.java.util.Map;
                getServerGMTOffset():number;
                getServerTimeZone():string;
                getSysMaxDate():Date;
                getSysTimeZoneToday():Date;
                getTrancateDateFromDate(arg0:Date):string;
                getTrancateDateFromTimestamp(arg0:Date):string;
                getUserSettingFormat():$.java.text.SimpleDateFormat;
                getUserTimeZoneToday():Date;
                getWeek(arg0:Date):number;
                getWeekDay(arg0:Date):number;
                getYear(arg0:Date):number;
                gmtToDate(arg0:string):Date;
                isAfterNow(arg0:Date):boolean;
                isBeforeNow(arg0:Date):boolean;
                isBeforeOrEqualNow(arg0:Date):boolean;
                isLeap(arg0:number):boolean;
                localDate2Date(arg0:$.java.time.LocalDate):Date;
                localDateTime2Date(arg0:$.java.time.LocalDateTime):Date;
                localDateTranDate(arg0:$.java.time.LocalDate):Date;
                parseDate(arg0:string):Date;
                parseDate(arg0:string,arg1:$.java.util.TimeZone):Date;
                parseDate(arg0:string,arg1:string):Date;
                parseDate(arg0:string,arg1:string,arg2:$.java.util.TimeZone):Date;
                parseDate(arg0:string,arg1:string,arg2:$.java.util.TimeZone,arg3:$.java.util.Locale):Date;
                parseDateIncludeZhCN(arg0:string):Date;
                parseDateLocal(arg0:string):Date;
                parseDateLocal(arg0:string,arg1:string):Date;
                parseDateLocal(arg0:string,arg1:string,arg2:$.java.util.TimeZone):Date;
                parseDefaultDate(arg0:string):Date;
                parseEmailDate(arg0:string):Date;
                secondsTo(arg0:long):Date;
                splitYYYY_MM_DD(arg0:Date):Date;
                subDate(arg0:Date,arg1:Date):Date;
                sysDateToUserDate():Date;
                truncateDate(arg0:Date):Date;
            }
            interface HRDateTimeUtils_C extends HRDateTimeUtils_S {
                new():HRDateTimeUtils;
            }
            interface HRDateTimeUtils$ {
            }
            type HRDateTimeUtils_T = HRDateTimeUtils_S & HRDateTimeUtils$;
            interface HRDateTimeUtils extends HRDateTimeUtils_T {
            }
        }
        namespace kd.hr.hbp.formplugin.web{
            interface HRDataBaseEdit_S {
            }
            type HRDataBaseEdit_ST = $.kd.bos.base.AbstractBasePlugIn & HRDataBaseEdit_S;
            interface HRDataBaseEdit_C extends HRDataBaseEdit_ST {
                new():HRDataBaseEdit;
            }
            interface HRDataBaseEdit$ {
                getModelVal(arg0:string):any;
                getModelValStr(arg0:string):string;
                hide(arg0:string):void;
                obtainModel():$.kd.bos.entity.datamodel.IDataModel;
                obtainView():$.kd.bos.form.IFormView;
                setModelEmptyVal(arg0:string):void;
                setModelNullVal(arg0:string):void;
                setModelVal(arg0:string,arg1:any):void;
                setMustInput(arg0:$.kd.bos.form.field.BasedataEdit):void;
                setNotMustInput(arg0:$.kd.bos.form.field.BasedataEdit):void;
                show(arg0:string):void;
            }
            type HRDataBaseEdit_T = $.kd.bos.base.AbstractBasePlugIn & HRDataBaseEdit_S & HRDataBaseEdit$;
            interface HRDataBaseEdit extends HRDataBaseEdit_T {
            }
        }
        namespace kd.sdk.hr.hdm{
            interface SdkHRHdmModule_S {
            }
            type SdkHRHdmModule_ST = $.kd.sdk.module.Module & SdkHRHdmModule_S;
            interface SdkHRHdmModule_C extends SdkHRHdmModule_ST {
                new():SdkHRHdmModule;
            }
            interface SdkHRHdmModule$ {
            }
            type SdkHRHdmModule_T = $.kd.sdk.module.Module & SdkHRHdmModule_S & SdkHRHdmModule$;
            interface SdkHRHdmModule extends SdkHRHdmModule_T {
            }
        }
        namespace kd.sdk.hr.hdm.business.mservice.helper{
            interface HDMTransferServiceHelper_S {
                /**
                 * ��Ա��ְ����
                 *
                 * @param quitInfo ��ְ����
                 * @return success true|false ; msg null|"desc ..."
                 */
                dealPersonQuit(quitInfo:$.java.util.Map):$.java.util.Map;
            }
            interface HDMTransferServiceHelper_C extends HDMTransferServiceHelper_S {
                new():HDMTransferServiceHelper;
            }
            interface HDMTransferServiceHelper$ {
            }
            type HDMTransferServiceHelper_T = HDMTransferServiceHelper_S & HDMTransferServiceHelper$;
            interface HDMTransferServiceHelper extends HDMTransferServiceHelper_T {
            }
            interface HDMRegBillServiceHelper_S {
                /**
                 * ��ְ��Ч����RPC�ӿڴ���������ҵ��
                 * @param personQuitMessage ��ְԱ����Ϣ��װ
                 * @return success true|false ; msg null|"desc ..."
                 */
                executePersonQuitEffect(personQuitMessage:$.java.util.Map):$.java.util.Map;
                /**
                 * ��������id��ȡת����
                 * @param billPKId ��������
                 * @return ת������Ϣ
                 */
                getRegBillById(billPKId:long):$.java.util.Map;
            }
            interface HDMRegBillServiceHelper_C extends HDMRegBillServiceHelper_S {
                new():HDMRegBillServiceHelper;
            }
            interface HDMRegBillServiceHelper$ {
            }
            type HDMRegBillServiceHelper_T = HDMRegBillServiceHelper_S & HDMRegBillServiceHelper$;
            interface HDMRegBillServiceHelper extends HDMRegBillServiceHelper_T {
            }
            interface HDMPartBillServiceHelper_S {
                /**
                 * ��ѯ��ְ��λ����׼��λ��Ϣ<br/>
                 * <b>��ְ���뵥�� ��λ��ְλ��1128�汾�Ѿ��л�Ϊ����ʷ�汾�Ļ������Ͽؼ� ����ȡ�����Ķ�������Ҫ��fboid����ֱ��fid ��Ҫ��Ʒ��������</b>
                 * @since V2022/11/28
                 * @param billPKId ��ְ���뵥id
                 * @return key -> positiontype(�θ�ģʽ��1-��λ��0-��׼��λ, 2-ְλ)��position����ְ��λ����stdposition����ְ��׼��λ�� . job(��ְְλ) adminorg(��ְ����)
                 */
                queryPositionInfoById(billPKId:long):$.java.util.Map;
                /**
                 * ��ְ֪ͨ
                 * @param quitInfo ��ְ����
                 * @return success true|false ; msg null|"desc ..."
                 */
                quitNotice(quitInfo:$.java.util.Map):$.java.util.Map;
            }
            interface HDMPartBillServiceHelper_C extends HDMPartBillServiceHelper_S {
                new():HDMPartBillServiceHelper;
            }
            interface HDMPartBillServiceHelper$ {
            }
            type HDMPartBillServiceHelper_T = HDMPartBillServiceHelper_S & HDMPartBillServiceHelper$;
            interface HDMPartBillServiceHelper extends HDMPartBillServiceHelper_T {
            }
            interface HDMTransferQueryHelper_S {
                /**
                 * ���ݵ�����ID ������ѯ������
                 *
                 * @param id ������ID
                 * @return ��������Ϣ
                 */
                getTranserBillById(id:long):$.java.util.Map;
                /**
                 * ��������id ��ѯ��������Ϣ
                 *
                 * @param id ������ID
                 * @return ������������Ϣ
                 */
                listTranserBillById(ids:$.java.util.List):$.java.util.Map;
            }
            interface HDMTransferQueryHelper_C extends HDMTransferQueryHelper_S {
                new():HDMTransferQueryHelper;
            }
            interface HDMTransferQueryHelper$ {
            }
            type HDMTransferQueryHelper_T = HDMTransferQueryHelper_S & HDMTransferQueryHelper$;
            interface HDMTransferQueryHelper extends HDMTransferQueryHelper_T {
            }
        }
        namespace kd.sdk.hr.hlcm{
            interface SdkHRHlcmModule_S {
            }
            type SdkHRHlcmModule_ST = $.kd.sdk.module.Module & SdkHRHlcmModule_S;
            interface SdkHRHlcmModule_C extends SdkHRHlcmModule_ST {
                new():SdkHRHlcmModule;
            }
            interface SdkHRHlcmModule$ {
            }
            type SdkHRHlcmModule_T = $.kd.sdk.module.Module & SdkHRHlcmModule_S & SdkHRHlcmModule$;
            interface SdkHRHlcmModule extends SdkHRHlcmModule_T {
            }
        }
        namespace kd.sdk.hr.hlcm.business{
            interface SdkHRHlcmModule_S {
            }
            type SdkHRHlcmModule_ST = $.kd.sdk.module.Module & SdkHRHlcmModule_S;
            interface SdkHRHlcmModule_C extends SdkHRHlcmModule_ST {
                new():SdkHRHlcmModule;
            }
            interface SdkHRHlcmModule$ {
            }
            type SdkHRHlcmModule_T = $.kd.sdk.module.Module & SdkHRHlcmModule_S & SdkHRHlcmModule$;
            interface SdkHRHlcmModule extends SdkHRHlcmModule_T {
            }
        }
        namespace kd.sdk.hr.hlcm.business.mservice.helper{
            interface ContractServiceHelper_S {
                /**
                 * ���ɵ����ӿ�
                 *
                 * @param dynamicObjects
                 */
                generateContract(dynamicObjects:$.java.util.List):$.java.util.Map;
                /**
                 * ��ͬģ���滻��SDK
                 *
                 * @param signBillId      ǩ�𵥾�ID
                 * @param index           ģ������
                 * @param isAlterFileName �Ƿ��޸��ļ�����
                 * @param isToPdf         �Ƿ���Ҫ���滻����ļ�ת����PDF
                 * @return URL �滻�����ɵ��ļ���URL
                 */
                replaceKeywordGenFile(signBillId:long,index:number,isAlterFileName:boolean,isToPdf:boolean):$.java.util.Map;
            }
            interface ContractServiceHelper_C extends ContractServiceHelper_S {
                new():ContractServiceHelper;
            }
            interface ContractServiceHelper$ {
            }
            type ContractServiceHelper_T = ContractServiceHelper_S & ContractServiceHelper$;
            interface ContractServiceHelper extends ContractServiceHelper_T {
            }
        }
        namespace kd.sdk.hr.hom{
            interface SdkHRHomModule_S {
            }
            type SdkHRHomModule_ST = $.kd.sdk.module.Module & SdkHRHomModule_S;
            interface SdkHRHomModule_C extends SdkHRHomModule_ST {
                new():SdkHRHomModule;
            }
            interface SdkHRHomModule$ {
            }
            type SdkHRHomModule_T = $.kd.sdk.module.Module & SdkHRHomModule_S & SdkHRHomModule$;
            interface SdkHRHomModule extends SdkHRHomModule_T {
            }
        }
        namespace kd.sdk.hr.hom.business.mservice.helper{
            interface HOMLoginServiceHelper_S {
                /**
                 * У���û�ID���ֻ����Ƿ�ƥ��
                 *
                 * @param userId �û�ID����ְ��Ӧ���Ǻ�ѡ��ID��
                 * @param phone  �ֻ���
                 * @return boolean ��ѡ��ID���ֻ����Ƿ�ƥ��
                 */
                checkUserIdAndPhone(userId:string,phone:string):boolean;
            }
            interface HOMLoginServiceHelper_C extends HOMLoginServiceHelper_S {
                new():HOMLoginServiceHelper;
            }
            interface HOMLoginServiceHelper$ {
            }
            type HOMLoginServiceHelper_T = HOMLoginServiceHelper_S & HOMLoginServiceHelper$;
            interface HOMLoginServiceHelper extends HOMLoginServiceHelper_T {
            }
        }
        namespace kd.sdk.hr.hom.business.onbrd{
            interface IConfirmOnbrdService_S {
            }
            interface IConfirmOnbrdService$ {
                /**
                 * ȷ����ְ֮ǰִ�е���չ����
                 *
                 * @param onbrdIds ��ְ��
                 * @return boolean
                 */
                beforeConfirmOnbrds(...onbrdIds:any[]):void;
                /**
                 * �Զ���ȷ����ְ�Ĵ�����ʾ��Ϣ
                 *
                 * @param errMsglist          ������Ϣ
                 * @param emptyFileds         ���ֶα�ʶ
                 * @param operateKey          ������ť
                 * @param isMobile            �Ƿ��ƶ���
                 * @param onbrdBillDetailInfo ��ְ��������
                 * @return true/false ��������Ĭ��false
                 */
                tpiInfo(errMsglist:$.java.util.List,emptyFileds:$.java.util.List,operateKey:string,isMobile:boolean,onbrdBillDetailInfo:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            type IConfirmOnbrdService_T = IConfirmOnbrdService_S & IConfirmOnbrdService$;
            interface IConfirmOnbrdService extends IConfirmOnbrdService_T {
            }
            interface IOnbrdService_S {
            }
            interface IOnbrdService$ {
                /**
                 * ��ʵ�嵼��-ʵ���Զ��帳ֵ���磺��ѡ�˱��
                 *
                 * @param rowdatas        rowdatas
                 * @param importLoggerMap importLoggerMap
                 * @param optionCode      optionCode
                 */
                beforeWrapOriginalJson(rowdatas:$.java.util.List,importLoggerMap:$.java.util.Map,optionCode:string):void;
                /**
                 * @param dynamicObject ��ְ��
                 * @param initType      ö������InitTypeEnum����ʼ������
                 * @return ����ֵ
                 */
                setEmployeeNo(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject,initType:string):string;
            }
            type IOnbrdService_T = IOnbrdService_S & IOnbrdService$;
            interface IOnbrdService extends IOnbrdService_T {
            }
            interface IShareTaskService_S {
            }
            interface IShareTaskService$ {
                /**
                 * ����������
                 *
                 * @param operationType ��������  confirm-ȷ��  breakup-��ֹ
                 * @param entityName    ʵ������
                 * @param ids           ҵ��IDs
                 */
                dealShareTask(operationType:string,entityName:string,ids:$.java.util.List):void;
            }
            type IShareTaskService_T = IShareTaskService_S & IShareTaskService$;
            interface IShareTaskService extends IShareTaskService_T {
            }
            interface IPerChgBizParam_S {
            }
            interface IPerChgBizParam$ {
                /**
                 * ���ò���
                 *
                 * @param onbrdBillInfo ��ְ����Ϣȷ����ְ���
                 * @param dataRow       ������Ϣ��keyΪҳ���ʶ��valueΪ����id
                 */
                setPerChgBizParam(onbrdBillInfo:$.kd.bos.dataentity.entity.DynamicObject,dataRow:$.java.util.Map):void;
            }
            type IPerChgBizParam_T = IPerChgBizParam_S & IPerChgBizParam$;
            interface IPerChgBizParam extends IPerChgBizParam_T {
            }
        }
        namespace kd.sdk.hr.hom.business.personinfo{
            interface IBaseInfoService_S {
            }
            interface IBaseInfoService$ {
            }
            type IBaseInfoService_T = IHcfInfoPageService & IBaseInfoService_S & IBaseInfoService$;
            interface IBaseInfoService extends IBaseInfoService_T {
            }
            interface ILanguageSkillService_S {
            }
            interface ILanguageSkillService$ {
                /**
                 * ������Ҫչʾ���е��ֶα�ʶ
                 *
                 * @return �ֶα�ʶ���Զ�������
                 */
                getExtShowField():string;
            }
            type ILanguageSkillService_T = ITableValueInfoService & ILanguageSkillService_S & ILanguageSkillService$;
            interface ILanguageSkillService extends ILanguageSkillService_T {
            }
            interface IPreviousWorkExpService_S {
            }
            interface IPreviousWorkExpService$ {
            }
            type IPreviousWorkExpService_T = ITableValueInfoService & IPreviousWorkExpService_S & IPreviousWorkExpService$;
            interface IPreviousWorkExpService extends IPreviousWorkExpService_T {
            }
            interface ICertificateInfoService_S {
            }
            interface ICertificateInfoService$ {
                /**
                 * ֤��������չ�ֶ�
                 *
                 * @return ��չ���ֶ�
                 */
                getCertExtProperties():$.java.util.Set;
                /**
                 * ���ò�֤ͬ������չʾ���ֶ�
                 *
                 * @return String Ҫ��ѯ������
                 */
                getExtPropertiesByCertID?():$.java.util.Map;
            }
            type ICertificateInfoService_T = ICertificateInfoService_S & ICertificateInfoService$;
            interface ICertificateInfoService extends ICertificateInfoService_T {
            }
            interface ICancontactService_S {
            }
            interface ICancontactService$ {
            }
            type ICancontactService_T = IBasePeronInfoService & ICancontactService_S & ICancontactService$;
            interface ICancontactService extends ICancontactService_T {
            }
            interface IBasePeronInfoService_S {
            }
            interface IBasePeronInfoService$ {
                /**
                 * ������Ҫչʾ���е��ֶα�ʶ
                 *
                 * @return �ֶα�ʶ���Զ�������
                 */
                getExtProperties():string;
                /**
                 * ���õ���ֵ
                 *
                 * @param customParamsmap ����
                 * @param canFamilyInfo   ��Ϣ�����ֵ
                 */
                setCustomParamsMap(customParamsmap:$.java.util.Map,canFamilyInfo:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ����ҳ��ֵ
                 *
                 * @param personBaseDy ҳ��ʵ��
                 * @param dataModel    ����ֵ
                 */
                setDataModel(personBaseDy:$.kd.bos.dataentity.entity.DynamicObject,dataModel:$.kd.bos.entity.datamodel.IDataModel):void;
                /**
                 * ����ҳ��ֵ
                 *
                 * @param dataModel       ҳ��ʵ��
                 * @param customParamsmap ����ֵ
                 */
                setViewModel(dataModel:$.kd.bos.entity.datamodel.IDataModel,customParamsmap:$.java.util.Map):void;
            }
            type IBasePeronInfoService_T = IBasePeronInfoService_S & IBasePeronInfoService$;
            interface IBasePeronInfoService extends IBasePeronInfoService_T {
            }
            interface IContactInfoService_S {
            }
            interface IContactInfoService$ {
                /**
                 * ��ȡ��ַ����չ�ֶα�ʶ���ϣ������ʶ��Ӣ�Ķ��ŷָ���
                 *
                 * @return String Ҫ��ѯ������
                 */
                getExtPropertiesWithAddress():string;
                /**
                 * ��ʼ��ҳ�棬��ҳ��ĵ�ַ��Ϣ�ֶθ�ֵ
                 *
                 * @param formView       ҳ����ͼ
                 * @param hcfAddressList ��ѡ�˵�ַ��Ϣ
                 */
                initViewWithAddress(formView:$.kd.bos.form.IFormView,hcfAddressList:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * �ڱ���֮ǰ������ַ��Ϣ��չ�ֶθ�ֵ
                 *
                 * @param formView       ҳ����ͼ
                 * @param hcfAddressList ��ѡ�˵�ַ��Ϣ
                 */
                setValueBeforeSaveAddress(formView:$.kd.bos.form.IFormView,hcfAddressList:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
            }
            type IContactInfoService_T = IHcfInfoPageService & IContactInfoService_S & IContactInfoService$;
            interface IContactInfoService extends IContactInfoService_T {
            }
            interface IEducationExpService_S {
            }
            interface IEducationExpService$ {
                /**
                 * ��ȡ����֤������չ�ֶα�ʶ���ϣ������ʶ��Ӣ�Ķ��ŷָ�
                 *
                 * @return String Ҫ��ѯ������
                 */
                getExtPropertiesForCert():string;
                /**
                 * ��ȡ��������������Ϣ����չ�ֶα�ʶ���ϣ������ʶ��Ӣ�Ķ��ŷָ�
                 *
                 * @return String Ҫ��ѯ������
                 */
                getExtPropertiesForExp():string;
                /**
                 * ��ʼ��ҳ�棬��ҳ�����չ�ֶθ�ֵ
                 *
                 * @param formView            ҳ����ͼ
                 * @param currentEduInfo      ��������������Ϣ
                 * @param currentEduCertInfos ��������֤����Ϣ
                 */
                initViewForExt(formView:$.kd.bos.form.IFormView,currentEduInfo:$.kd.bos.dataentity.entity.DynamicObject,currentEduCertInfos:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * �ڱ���֮ǰ��������֤����չ�ֶθ�ֵ
                 *
                 * @param formView           ҳ����ͼ
                 * @param eduCertCollectiont ��ѡ�˽���֤��
                 */
                setValueBeforeSaveEduCert(formView:$.kd.bos.form.IFormView,eduCertCollectiont:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * �ڱ���֮ǰ������������������չ�ֶθ�ֵ
                 *
                 * @param formView   ҳ����ͼ
                 * @param eduExpInfo ��ѡ�˽�������������Ϣ
                 */
                setValueBeforeSaveEduExp(formView:$.kd.bos.form.IFormView,eduExpInfo:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IEducationExpService_T = IEducationExpService_S & IEducationExpService$;
            interface IEducationExpService extends IEducationExpService_T {
            }
            interface ICanFamilyService_S {
            }
            interface ICanFamilyService$ {
                /**
                 * ��ͥ��Ա��չ�ֶ�
                 *
                 * @return ��չ���ֶ�
                 */
                getCanFamilyExtProperties():string;
            }
            type ICanFamilyService_T = IBasePeronInfoService & ICanFamilyService_S & ICanFamilyService$;
            interface ICanFamilyService extends ICanFamilyService_T {
            }
            interface IBankCardService_S {
            }
            interface IBankCardService$ {
            }
            type IBankCardService_T = IBasePeronInfoService & IBankCardService_S & IBankCardService$;
            interface IBankCardService extends IBankCardService_T {
            }
            interface IHcfInfoPageService_S {
            }
            interface IHcfInfoPageService$ {
                /**
                 * ��ȡ��չ���ֶα�ʶ���ϣ������ʶ��Ӣ�Ķ��ŷָ�
                 *
                 * @return String Ҫ��ѯ������
                 */
                getExtProperties():string;
                /**
                 * ��ʼ��ҳ�棬��ҳ�����չ�ֶθ�ֵ
                 *
                 * @param formView  ҳ����ͼ
                 * @param hcfInfoDy ��ѡ����Ϣ
                 */
                initViewForExt(formView:$.kd.bos.form.IFormView,hcfInfoDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * �ڱ���֮ǰ������չ�ֶθ�ֵ
                 *
                 * @param formView  ҳ����ͼ
                 * @param hcfInfoDy ��ѡ����Ϣ
                 */
                setValueBeforeSave(formView:$.kd.bos.form.IFormView,hcfInfoDy:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type IHcfInfoPageService_T = IHcfInfoPageService_S & IHcfInfoPageService$;
            interface IHcfInfoPageService extends IHcfInfoPageService_T {
            }
            interface IRsmpatinvService_S {
            }
            interface IRsmpatinvService$ {
            }
            type IRsmpatinvService_T = ITableValueInfoService & IRsmpatinvService_S & IRsmpatinvService$;
            interface IRsmpatinvService extends IRsmpatinvService_T {
            }
            interface ITableValueInfoService_S {
            }
            interface ITableValueInfoService$ {
                /**
                 * ����tableֵ
                 *
                 * @param vs            table����
                 * @param indexRow      �Ǳ�
                 * @param dynamicObject ����ֵ
                 */
                setTableValue(vs:$.kd.bos.entity.datamodel.TableValueSetter,indexRow:number,dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            type ITableValueInfoService_T = IBasePeronInfoService & ITableValueInfoService_S & ITableValueInfoService$;
            interface ITableValueInfoService extends ITableValueInfoService_T {
            }
        }
        namespace kd.sdk.hr.hom.mservice.helper{
            interface HOMServiceHelper_S {
                /**
                 * ������ְ��
                 *
                 * @param requestMap ��ְ������
                 * @return ���
                 */
                createOnboardBill(requestMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ͨ����ѡ��id��ѯ��ְ��
                 *
                 * @param candidateId ��ѡ��id
                 * @return ��ְ��
                 */
                getOnbrdBillByCandidateId(candidateId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������ְ
                 *
                 * @param onboardIds ��ְ��ID
                 * @return У����
                 */
                startOnboardBill(onboardIds:$.java.util.List):$.kd.bos.entity.operate.result.OperationResult;
            }
            interface HOMServiceHelper_C extends HOMServiceHelper_S {
                new():HOMServiceHelper;
            }
            interface HOMServiceHelper$ {
            }
            type HOMServiceHelper_T = HOMServiceHelper_S & HOMServiceHelper$;
            interface HOMServiceHelper extends HOMServiceHelper_T {
            }
        }
        namespace kd.sdk.hr.hom.service{
            interface IHOMLoginService_S {
            }
            interface IHOMLoginService$ {
                /**
                 * У���û�id���ֻ���
                 *
                 * @param userId ��ѡ��id
                 * @param phone  �ֻ���
                 * @return ���ؽ��
                 */
                checkUserIdAndPhone(userId:string,phone:string):boolean;
            }
            type IHOMLoginService_T = IHOMLoginService_S & IHOMLoginService$;
            interface IHOMLoginService extends IHOMLoginService_T {
            }
            interface IOnbrdInfoService_S {
            }
            interface IOnbrdInfoService$ {
                /**
                 * ��ְ�����ɹ���
                 *
                 * @param dy         ��ְ��
                 * @param numberList ����
                 * @param count      ����
                 * @param expectNum  ��������
                 */
                createCodeRuleHandler(dy:$.kd.bos.dataentity.entity.DynamicObject,numberList:$.java.util.List,count:number,expectNum:number):void;
                /**
                 * У���ֶα���
                 *
                 * @param view ҳ��view
                 * @return У����
                 */
                validateFieldMandatory(view:$.kd.bos.form.IFormView):$.java.util.Optional;
                /**
                 * ��ʵ������У�����
                 *
                 * @param entityName       ʵ������
                 * @param optionCode       ��������
                 * @param sheetRowDataList ����
                 * @param importLogger     ��־
                 */
                validateMultiOnbrd?(entityName:string,optionCode:string,sheetRowDataList:$.java.util.List,importLogger:$.kd.bos.entity.plugin.ImportLogger):void;
            }
            type IOnbrdInfoService_T = IOnbrdInfoService_S & IOnbrdInfoService$;
            interface IOnbrdInfoService extends IOnbrdInfoService_T {
            }
        }
        namespace kd.sdk.hr.hpfs{
            interface SdkHRHpfsModule_S {
            }
            type SdkHRHpfsModule_ST = $.kd.sdk.module.Module & SdkHRHpfsModule_S;
            interface SdkHRHpfsModule_C extends SdkHRHpfsModule_ST {
                new():SdkHRHpfsModule;
            }
            interface SdkHRHpfsModule$ {
            }
            type SdkHRHpfsModule_T = $.kd.sdk.module.Module & SdkHRHpfsModule_S & SdkHRHpfsModule$;
            interface SdkHRHpfsModule extends SdkHRHpfsModule_T {
            }
        }
        namespace kd.sdk.hr.hpfs.business.file{
            interface MultiViewTempService_S {
                getInstance():MultiViewTempService;
                /**
                 * ��֤Ȩ��
                 *
                 * @param entityName ʵ����
                 * @param permItemId Ȩ��
                 * @return �Ƿ���Ȩ��
                 */
                hasPerm(entityName:string,permItemId:string):boolean;
                /**
                 * �Ƿ��ǵ��и���
                 *
                 * @param pageNumber Ԫ���ݱ�ʶ
                 * @return �Ƿ�
                 */
                isSingleRowTpl(pageNumber:string):boolean;
                /**
                 *  �Ƿ������м��
                 *
                 * @return ��/��
                 */
                isSkipMiddleLevel():boolean;
            }
            interface MultiViewTempService_C extends MultiViewTempService_S {
                new():MultiViewTempService;
            }
            interface MultiViewTempService$ {
                /**
                 * �ұ���Ϣ
                 *
                 * @param infoGroupConfig ������Ϣ
                 * @return flex
                 */
                buildRightPanelAp(infoGroupConfig:$.java.util.Map):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ����form
                 *
                 * @param formShowParameter formShowParameter
                 * @param formId            formId
                 * @param targetKey         Ŀ��
                 * @param showType          ����
                 */
                commonForm(formShowParameter:$.kd.bos.form.FormShowParameter,formId:string,targetKey:string,showType:$.kd.bos.form.ShowType):void;
                /**
                 * ��̬��������������
                 *
                 * @param showParameter   showParameter
                 * @return ���
                 */
                createMainPanelAp(showParameter:$.kd.bos.form.FormShowParameter):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��̬��������������
                 *
                 * @param cnfId   ���÷���id
                 * @param preView Ԥ��
                 * @return ���
                 */
                createMainPanelAp(cnfId:long,preView:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��������̬���
                 *
                 * @param tabList   tabList
                 * @return flex
                 */
                createTabPageInfoPanelAp(tabList:$.java.util.List):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��������Ȩ�޽ӿ�
                 * @param infoGroupConfig ����ͼ��Ϣ
                 */
                getInfoGroupAuthList(infoGroupConfig:$.java.util.Map):void;
                /**
                 * ��������Ȩ�޽ӿ�
                 * @param infoGroupConfig ����ͼ��Ϣ
                 */
                getInfoGroupAuthListByAppId(infoGroupConfig:$.java.util.Map,formShowParameter:$.kd.bos.form.FormShowParameter):void;
                /**
                 * ����ҳǩ����
                 *
                 * @param event event
                 * @param pre pre
                 */
                openFormPre(event:$.kd.bos.form.events.PreOpenFormEventArgs,pre:string):void;
                /**
                 * �蹫������
                 *
                 * @param formShowParameter form
                 * @param view ��ͼ
                 */
                setCommonCustomParam(formShowParameter:$.kd.bos.form.FormShowParameter,view:$.kd.bos.form.IFormView):void;
                /**
                 * ���ñ�ǩ���
                 *
                 * @param args     args
                 * @param formView formView
                 * @param plugin   plugin
                 * @param param
                 */
                setLabelClick(args:$.kd.bos.form.events.OnGetControlArgs,formView:$.kd.bos.mvc.form.FormView,plugin:$.kd.bos.form.plugin.AbstractFormPlugin,param:string):void;
                /**
                 * ���ñ�ǩ�¼�
                 *
                 * @param args          args
                 * @param formView      ��ͼ
                 * @param plugin        ���
                 * @param mainEntryList ����
                 */
                setLabelEvent(args:$.kd.bos.form.events.OnGetControlArgs,formView:$.kd.bos.mvc.form.FormView,plugin:$.kd.bos.form.plugin.AbstractFormPlugin,mainEntryList:$.java.util.List):void;
                /**
                 * ����ѡ�е���ʽ
                 *
                 * @param currNumber ѡ�е�
                 * @param view       ��ͼ
                 */
                setSelectStyle(currNumber:string,view:$.kd.bos.form.IFormView):void;
                /**
                 * ������
                 *
                 * @param pageType pageType
                 * @return form
                 */
                showFormType(pageType:string):$.kd.bos.form.FormShowParameter;
                /**
                 * showҳ��
                 *
                 * @param dyFrom        form
                 * @param headEntryList ����
                 * @param plugin        ���
                 * @param targetKey     ģ��ҳ
                 * @param view          view
                 */
                showHeadFrom(dyFrom:$.kd.bos.form.FormShowParameter,headEntryList:$.java.util.List,plugin:$.kd.bos.form.plugin.AbstractFormPlugin,targetKey:string,view:$.kd.bos.form.IFormView):void;
            }
            type MultiViewTempService_T = MultiViewTempService_S & MultiViewTempService$;
            interface MultiViewTempService extends MultiViewTempService_T {
            }
        }
        namespace kd.sdk.hr.hpfs.business.mservice.helper{
            interface HPFSPersonChgServiceHelper_S {
                /**
                 * ���񽻲�У�������
                 *
                 * @param params ����
                 * @return ����У����
                 */
                crossValidate(params:$.java.util.Map):$.java.util.Map;
                /**
                 * �������񽻲�У��ӿ�
                 *
                 * @param params �������
                 * @return ����У����
                 */
                crossValidateBatch(params:$.java.util.List):$.java.util.Map;
                /**
                 * ������������Ч�ӿ�
                 *
                 * @param params ��Ч����
                 * @return ����ִ�н��
                 */
                executeActionPersonalChange(params:$.java.util.Map):$.java.util.Map;
                /**
                 * �������������ò�ѯ�ӿ�
                 *
                 * @param params ��ѯ����
                 * @return ���ý��
                 */
                getActionPersonalChange(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ����ҳ���ʶ��ȡ���õı䶯����id����
                 *
                 * @param entityName Ԫ����ҳ���ʶ
                 * @return �䶯����id����
                 */
                getActionResByBill(entityName:string):$.java.util.Map;
                /**
                 * ���ݱ䶯��¼id��ѯ�䶯��¼�Ĳ�����Ϣ
                 *
                 * @param recordId �䶯��¼id
                 * @return �䶯��¼�Ĳ�����Ϣ
                 */
                getChgInfoByRecordId(recordId:long):$.java.util.Map;
                /**
                 * ���ݱ䶯��¼id��ѯ�䶯��¼����
                 *
                 * @param recordId �䶯��¼id
                 * @return �䶯��¼����
                 */
                getChgInfoDetailByRecordId(recordId:long):$.java.util.Map;
                /**
                 * ���ݱ䶯������ȡ�䶯�����ƶ��ֶε����ݷ�Χ
                 * Ŀǰ��Χ���ù���ϵ���͡��ù���ϵ״̬����ְ���͡���ְ״̬
                 *
                 * @param actionIds �䶯����id����
                 * @return key->�ֶΣ�value->�̶�ֵ����ȡֵ��Χ
                 */
                getChgRuleByActionIds(actionIds:$.java.util.List):$.java.util.Map;
                /**
                 * ��ѯ����䶯����У�鵥�ݽӿ�
                 *
                 * @param params ����
                 * @return ������Ϣ
                 */
                getCrossValidateBills(params:$.java.util.Map):$.java.util.Map;
            }
            interface HPFSPersonChgServiceHelper_C extends HPFSPersonChgServiceHelper_S {
                new():HPFSPersonChgServiceHelper;
            }
            interface HPFSPersonChgServiceHelper$ {
            }
            type HPFSPersonChgServiceHelper_T = HPFSPersonChgServiceHelper_S & HPFSPersonChgServiceHelper$;
            interface HPFSPersonChgServiceHelper extends HPFSPersonChgServiceHelper_T {
            }
            interface HPFSPersonFlowServiceHelper_S {
                /**
                 * ��������������¼
                 *
                 * @param params params
                 * @return Tuple
                 */
                generatePersonFlow(params:$.java.util.Map):$.kd.bos.dataentity.Tuple;
            }
            interface HPFSPersonFlowServiceHelper_C extends HPFSPersonFlowServiceHelper_S {
                new():HPFSPersonFlowServiceHelper;
            }
            interface HPFSPersonFlowServiceHelper$ {
            }
            type HPFSPersonFlowServiceHelper_T = HPFSPersonFlowServiceHelper_S & HPFSPersonFlowServiceHelper$;
            interface HPFSPersonFlowServiceHelper extends HPFSPersonFlowServiceHelper_T {
            }
        }
        namespace kd.sdk.hr.hpfs.business.perchg.bizentity{
            interface PerChgBizResult_S {
                /**
                 * ����ʧ��
                 *
                 * @param billId     {@link PerChgBizResult#billId}
                 * @param billSource {@link PerChgBizResult#billSource}
                 * @param errMsg     {@link PerChgBizResult#errMsg}
                 * @return PerChgBizResult
                 */
                fail(billId:long,billSource:string,errMsg:string):PerChgBizResult;
                /**
                 * ���سɹ�
                 *
                 * @param bizInfo bizInfo
                 * @return PerChgBizResult
                 */
                success(bizInfo:PerChgBizInfo):PerChgBizResult;
                /**
                 * ����ʧ��
                 *
                 * @param billId     {@link PerChgBizResult#billId}
                 * @param billSource {@link PerChgBizResult#billSource}
                 * @param errMsg     {@link PerChgBizResult#errMsg}
                 * @return PerChgBizResult
                 */
                success(billId:long,billSource:string):PerChgBizResult;
                /**
                 * ���سɹ�
                 *
                 * @param billId     {@link PerChgBizResult#billId}
                 * @param billSource {@link PerChgBizResult#billSource}
                 * @return PerChgBizResult
                 */
                success(billId:long,billSource:string,recordId:long):PerChgBizResult;
                /**
                 * ���سɹ�
                 *
                 * @param billId        {@link PerChgBizResult#billId}
                 * @param billSource    {@link PerChgBizResult#billSource}
                 * @param recordId      {@link PerChgBizResult#recordId}
                 * @param newPersonId   {@link PerChgBizResult#newPersonId}
                 * @param newEmployeeId {@link PerChgBizResult#newEmployeeId}
                 * @param newComEmpId   {@link PerChgBizResult#newComEmpId}
                 * @param newDepEmpId   {@link PerChgBizResult#newDepEmpId}
                 * @param newErfileId   {@link PerChgBizResult#newErfileId}
                 * @return PerChgBizResult
                 */
                success(billId:long,billSource:string,recordId:long,newPersonId:long,newEmployeeId:long,newComEmpId:long,newDepEmpId:long,newErfileId:long):PerChgBizResult;
            }
            type PerChgBizResult_ST = $.java.io.Serializable & PerChgBizResult_S;
            interface PerChgBizResult_C extends PerChgBizResult_ST {
                new():PerChgBizResult;
            }
            interface PerChgBizResult$ {
                /**
                 * @return {@link PerChgBizResult#billId}
                 */
                getBillId():long;
                /**
                 * @return {@link PerChgBizResult#billSource}
                 */
                getBillSource():string;
                /**
                 * @return {@link PerChgBizResult#errMsg}
                 */
                getErrMsg():string;
                /**
                 * @return {@link PerChgBizResult#msgSynActionId}
                 */
                getMsgSynActionId():long;
                /**
                 * @return {@link PerChgBizResult#newComEmpId}
                 */
                getNewComEmpId():long;
                /**
                 * @return {@link PerChgBizResult#newDepEmpId}
                 */
                getNewDepEmpId():long;
                /**
                 * @return {@link PerChgBizResult#newEmployeeId}
                 */
                getNewEmployeeId():long;
                /**
                 * @return {@link PerChgBizResult#newErfileId}
                 */
                getNewErfileId():long;
                /**
                 * @return {@link PerChgBizResult#newPersonId}
                 */
                getNewPersonId():long;
                /**
                 * @return {@link PerChgBizResult#recordId}
                 */
                getRecordId():long;
                /**
                 * @return {@link PerChgBizResult#success}
                 */
                getSuccess():boolean;
                /**
                 * @return {@link PerChgBizResult#systemTag}
                 */
                getSystemTag():string;
                /**
                 * @param billId {@link PerChgBizResult#billId}
                 */
                setBillId(billId:long):void;
                /**
                 * @param billSource {@link PerChgBizResult#billSource}
                 */
                setBillSource(billSource:string):void;
                /**
                 * @param errMsg {@link PerChgBizResult#errMsg}
                 */
                setErrMsg(errMsg:string):void;
                /**
                 * @param msgSynActionId {@link PerChgBizResult#msgSynActionId}
                 */
                setMsgSynActionId(msgSynActionId:long):void;
                /**
                 * @param newComEmpId {@link PerChgBizResult#newComEmpId}
                 */
                setNewComEmpId(newComEmpId:long):void;
                /**
                 * @param newDepEmpId {@link PerChgBizResult#newDepEmpId}
                 */
                setNewDepEmpId(newDepEmpId:long):void;
                /**
                 * @param newEmployeeId {@link PerChgBizResult#newEmployeeId}
                 */
                setNewEmployeeId(newEmployeeId:long):void;
                /**
                 * @param newErfileId {@link PerChgBizResult#newErfileId}
                 */
                setNewErfileId(newErfileId:long):void;
                /**
                 * @param newPersonId {@link PerChgBizResult#newPersonId}
                 */
                setNewPersonId(newPersonId:long):void;
                /**
                 * @param recordId {@link PerChgBizResult#recordId}
                 */
                setRecordId(recordId:long):void;
                /**
                 * @param success {@link PerChgBizResult#success}
                 */
                setSuccess(success:boolean):void;
                /**
                 * @param systemTag {@link PerChgBizResult#systemTag}
                 */
                setSystemTag(systemTag:string):void;
            }
            type PerChgBizResult_T = $.java.io.Serializable & PerChgBizResult_S & PerChgBizResult$;
            interface PerChgBizResult extends PerChgBizResult_T {
            }
            interface PerChgAttachment_S {
            }
            type PerChgAttachment_ST = $.java.io.Serializable & PerChgAttachment_S;
            interface PerChgAttachment_C extends PerChgAttachment_ST {
                new():PerChgAttachment;
            }
            interface PerChgAttachment$ {
                /**
                 * getAliasfileName
                 *
                 * @return aliasfileName
                 */
                getAliasfileName():string;
                /**
                 * getAttachmentName
                 *
                 * @return attachmentName
                 */
                getAttachmentName():string;
                /**
                 * getAttachmentPanel
                 *
                 * @return attachmentPanel
                 */
                getAttachmentPanel():string;
                /**
                 * getAttachmentSize
                 *
                 * @return attachmentSize
                 */
                getAttachmentSize():string;
                /**
                 * getBillType
                 *
                 * @return billType
                 */
                getBillType():string;
                /**
                 * getDescription
                 *
                 * @return description
                 */
                getDescription():string;
                /**
                 * getDocVersion
                 *
                 * @return docVersion
                 */
                getDocVersion():string;
                /**
                 * getDocrelativepath
                 *
                 * @return docrelativepath
                 */
                getDocrelativepath():string;
                /**
                 * getExtName
                 *
                 * @return extName
                 */
                getExtName():string;
                /**
                 * getInterId
                 *
                 * @return interId
                 */
                getInterId():string;
                /**
                 * getNumber
                 *
                 * @return number
                 */
                getNumber():string;
                /**
                 * getShare
                 *
                 * @return share
                 */
                getShare():string;
                /**
                 * setAliasfileName
                 *
                 * @param aliasfileName aliasfileName
                 */
                setAliasfileName(aliasfileName:string):void;
                /**
                 * setAttachmentName
                 *
                 * @param attachmentName attachmentName
                 */
                setAttachmentName(attachmentName:string):void;
                /**
                 * setAttachmentPanel
                 *
                 * @param attachmentPanel attachmentPanel
                 */
                setAttachmentPanel(attachmentPanel:string):void;
                /**
                 * setAttachmentSize
                 *
                 * @param attachmentSize attachmentSize
                 */
                setAttachmentSize(attachmentSize:string):void;
                /**
                 * setBillType
                 *
                 * @param billType billType
                 */
                setBillType(billType:string):void;
                /**
                 * setDescription
                 *
                 * @param description description
                 */
                setDescription(description:string):void;
                /**
                 * setDocVersion
                 *
                 * @param docVersion docVersion
                 */
                setDocVersion(docVersion:string):void;
                /**
                 * setDocrelativepath
                 *
                 * @param docrelativepath docrelativepath
                 */
                setDocrelativepath(docrelativepath:string):void;
                /**
                 * setExtName
                 *
                 * @param extName extName
                 */
                setExtName(extName:string):void;
                /**
                 * setInterId
                 *
                 * @param interId interId
                 */
                setInterId(interId:string):void;
                /**
                 * setNumber
                 *
                 * @param number number
                 */
                setNumber(number_arg:string):void;
                /**
                 * setShare
                 *
                 * @param share share
                 */
                setShare(share:string):void;
            }
            type PerChgAttachment_T = $.java.io.Serializable & PerChgAttachment_S & PerChgAttachment$;
            interface PerChgAttachment extends PerChgAttachment_T {
            }
            interface PerChgBizInfo_S {
            }
            type PerChgBizInfo_ST = $.java.io.Serializable & PerChgBizInfo_S;
            interface PerChgBizInfo_C extends PerChgBizInfo_ST {
                new():PerChgBizInfo;
            }
            interface PerChgBizInfo$ {
                addPluginEntry(plugin:$.kd.bos.dataentity.entity.DynamicObject):void;
                addPluginEntry(pluginEntry:$.java.util.List):void;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#actionId}
                 */
                getActionId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#attachmentData}
                 */
                getAttachmentData():$.java.util.Map;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billId}
                 */
                getBillId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billNo}
                 */
                getBillNo():string;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billSource}
                 */
                getBillSource():string;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#bsed}
                 */
                getBsed():Date;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgEventId}
                 */
                getChgEventId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgRule}
                 */
                getChgRule():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgrecordId}
                 */
                getChgrecordId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#customParams}
                 */
                getCustomParams():$.java.util.Map;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#dataRow}
                 */
                getDataRow():$.java.util.Map;
                /**
                 * ��ȡУ�鱨����Ҫ�жϵ�Ԫ����ҳ���ʶ
                 * Ϊ��ֹ��ָ�룬�ڲ�ѯ��ʱ�����Ϊnull��newһ���µ�list
                 *
                 * @return entityName2ErrorIfVerificationFail
                 */
                getEntityName2ErrorIfVerificationFail():$.java.util.Set;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#eventEntity}
                 */
                getEventEntity():string;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#eventId}
                 */
                getEventId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#idsRecord}
                 */
                getIdsRecord():$.java.util.Map;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#logEntryMap}
                 */
                getLogEntryMap():$.java.util.Map;
                getNewAppointremoverel():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newComempId}
                 */
                getNewComempId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newDepempId}
                 */
                getNewDepempId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmpEntRel}
                 */
                getNewEmpEntRel():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmpPosOrgRel}
                 */
                getNewEmpPosOrgRel():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmployeeId}
                 */
                getNewEmployeeId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newErfileId}
                 */
                getNewErfileId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newPerNonTSProp}
                 */
                getNewPerNonTSProp():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newPersonId}
                 */
                getNewPersonId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldComempId}
                 */
                getOldComempId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldDepempId}
                 */
                getOldDepempId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldEmployeeId}
                 */
                getOldEmployeeId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldErfileId}
                 */
                getOldErfileId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldPersonId}
                 */
                getOldPersonId():long;
                /**
                 * ����Ԫ����ҳ���ȡ�ɵ��Ĳ�������
                 *
                 * @param entityName Ԫ����ҳ��
                 * @return id
                 */
                getOldPersonModelId(entityName:string):long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#perEduExpIds}
                 */
                getPerEduExpIds():$.java.util.Map;
                getPluginEntry():$.java.util.List;
                getPluginResMap():$.java.util.Map;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#ruleId}
                 */
                getRuleId():long;
                /**
                 * @return {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#tacticFlowTypeMap}
                 */
                getTacticFlowTypeMap():$.java.util.Map;
                getValueMap():$.java.util.Map;
                putPluginResMap(pluginNumber:string,errorMsg:string):void;
                /**
                 * @param actionId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#actionId}
                 */
                setActionId(actionId:long):void;
                /**
                 * @param attachmentData {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#attachmentData}
                 */
                setAttachmentData(attachmentData:$.java.util.Map):void;
                /**
                 * @param billId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billId}
                 */
                setBillId(billId:long):void;
                /**
                 * @param billNo {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billNo}
                 */
                setBillNo(billNo:string):void;
                /**
                 * @param billSource {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#billSource}
                 */
                setBillSource(billSource:string):void;
                /**
                 * @param bsed {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#bsed}
                 */
                setBsed(bsed:Date):void;
                /**
                 * @param chgEventId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgEventId}
                 */
                setChgEventId(chgEventId:long):void;
                /**
                 * @param chgRule {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgRule}
                 */
                setChgRule(chgRule:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * @param chgrecordId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#chgrecordId}
                 */
                setChgrecordId(chgrecordId:long):void;
                /**
                 * @param customParams {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#customParams}
                 */
                setCustomParams(customParams:$.java.util.Map):void;
                /**
                 * @param dataRow {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#dataRow}
                 */
                setDataRow(dataRow:$.java.util.Map):void;
                /**
                 * @param entityName2ErrorIfVerificationFail {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#entityName2ErrorIfVerificationFail}
                 */
                setEntityName2ErrorIfVerificationFail(entityName2ErrorIfVerificationFail:$.java.util.Set):void;
                /**
                 * @param eventEntity {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#eventEntity}
                 */
                setEventEntity(eventEntity:string):void;
                /**
                 * @param eventId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#eventId}
                 */
                setEventId(eventId:long):void;
                /**
                 * setIdsRecord
                 *
                 * @param entityName entityName
                 * @param chgRecord  chgRecord
                 */
                setIdsRecord(entityName:string,chgRecord:kd.sdk.hr.hpfs.business.perchg.executor.model.ChgRecordEntryDto):void;
                /**
                 * setLogEntryMap
                 *
                 * @param entityName  entityName
                 * @param id          id
                 * @param chgLogEntry chgLogEntry
                 */
                setLogEntryMap(entityName:string,id:long,chgLogEntry:kd.sdk.hr.hpfs.business.perchg.executor.model.ChgLogEntryDto):void;
                setNewAppointremoverel(newAppointremoverel:long):void;
                /**
                 * @param newComempId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newComempId}
                 */
                setNewComempId(newComempId:long):void;
                /**
                 * @param newDepempId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newDepempId}
                 */
                setNewDepempId(newDepempId:long):void;
                /**
                 * @param newEmpEntRel {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmpEntRel}
                 */
                setNewEmpEntRel(newEmpEntRel:long):void;
                /**
                 * @param newEmpPosOrgRel {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmpPosOrgRel}
                 */
                setNewEmpPosOrgRel(newEmpPosOrgRel:long):void;
                /**
                 * @param newEmployeeId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newEmployeeId}
                 */
                setNewEmployeeId(newEmployeeId:long):void;
                /**
                 * @param newErfileId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newErfileId}
                 */
                setNewErfileId(newErfileId:long):void;
                /**
                 * @param newPerNonTSProp {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newPerNonTSProp}
                 */
                setNewPerNonTSProp(newPerNonTSProp:long):void;
                /**
                 * @param newPersonId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#newPersonId}
                 */
                setNewPersonId(newPersonId:long):void;
                /**
                 * @param oldComempId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldComempId}
                 */
                setOldComempId(oldComempId:long):void;
                /**
                 * @param oldDepempId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldDepempId}
                 */
                setOldDepempId(oldDepempId:long):void;
                /**
                 * @param oldEmployeeId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldEmployeeId}
                 */
                setOldEmployeeId(oldEmployeeId:long):void;
                /**
                 * @param oldErfileId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldErfileId}
                 */
                setOldErfileId(oldErfileId:long):void;
                /**
                 * @param oldPersonId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#oldPersonId}
                 */
                setOldPersonId(oldPersonId:long):void;
                /**
                 * setPerEduExpIds
                 *
                 * @param beforeId beforeId
                 * @param afterId  afterId
                 */
                setPerEduExpIds(beforeId:long,afterId:long):void;
                setPluginEntry(pluginEntry:$.java.util.List):void;
                setPluginResMap(pluginResMap:$.java.util.Map):void;
                /**
                 * @param ruleId {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#ruleId}
                 */
                setRuleId(ruleId:long):void;
                /**
                 * @param tacticFlowTypeMap {@link kd.sdk.hr.hpfs.business.perchg.bizentity.PerChgBizInfo#tacticFlowTypeMap}
                 */
                setTacticFlowTypeMap(tacticFlowTypeMap:$.java.util.Map):void;
                setValueMap(valueMap:$.java.util.Map):void;
            }
            type PerChgBizInfo_T = $.java.io.Serializable & PerChgBizInfo_S & PerChgBizInfo$;
            interface PerChgBizInfo extends PerChgBizInfo_T {
            }
        }
        namespace kd.sdk.hr.hpfs.business.perchg.executor.enums{
            enum ChgLogEntryStatusEnum {
                SUCCESS,
                FAIL,
                SKIP
            }
            enum ChgFlowTypeEnum {
                FLOW_UNRELATED,
                FLOW_IN,
                FLOW_OUT
            }
            enum ChgModeEnum {
                ADD_NEW,
                MODIFY,
                INVALID,
                DELETE,
                UNCHANGED
            }
        }
        namespace kd.sdk.hr.hpfs.business.perchg.executor.model{
            interface ChgRecordEntryDto_S {
                /**
                 * ��װ�����ı䶯��¼
                 *
                 * @param idAfter  ������boid
                 * @param flowType �������� {@link ChgFlowTypeEnum}
                 * @return �����ı䶯��¼
                 */
                formatNewRecord(idAfter:long,flowType:string):ChgRecordEntryDto;
                /**
                 * ��װ�����ı䶯��¼
                 *
                 * @param idAfter  ������boid
                 * @param flowType �������� {@link ChgFlowTypeEnum}
                 * @return �����ı䶯��¼
                 */
                formatNewRecord(idAfter:long,flowType:string,dataDy:$.kd.bos.dataentity.entity.DynamicObject):ChgRecordEntryDto;
                /**
                 * ��װ�䶯��¼
                 *
                 * @param idBefore  ǰbois
                 * @param vidBefore ǰvid
                 * @param idAfter   ��boid
                 * @param vidAfter  ��vid
                 * @param chgMode   �䶯��ʽ {@link ChgModeEnum}
                 * @param flowType  �������� {@link ChgFlowTypeEnum}
                 * @return �䶯��¼
                 */
                formatRecord(idBefore:long,vidBefore:long,idAfter:long,vidAfter:long,chgMode:string,flowType:string):ChgRecordEntryDto;
                /**
                 * ��װ�䶯��¼
                 *
                 * @param idBefore  ǰbois
                 * @param vidBefore ǰvid
                 * @param idAfter   ��boid
                 * @param vidAfter  ��vid
                 * @param chgMode   �䶯��ʽ {@link ChgModeEnum}
                 * @param flowType  �������� {@link ChgFlowTypeEnum}
                 * @param dataDy    ����dy
                 * @return �䶯��¼
                 */
                formatRecord(idBefore:long,vidBefore:long,idAfter:long,vidAfter:long,chgMode:string,flowType:string,dataDy:$.kd.bos.dataentity.entity.DynamicObject):ChgRecordEntryDto;
                /**
                 * dtoд��dyn
                 *
                 * @param dynNew     dyn����
                 * @param entityName Ԫ����ҳ���ʶ
                 * @param chgRecord  ��¼��¼dto
                 */
                recordEntrySetValue(dynNew:$.kd.bos.dataentity.entity.DynamicObject,entityName:string,chgRecord:ChgRecordEntryDto):void;
            }
            type ChgRecordEntryDto_ST = $.java.io.Serializable & ChgRecordEntryDto_S;
            interface ChgRecordEntryDto_C extends ChgRecordEntryDto_ST {
                new():ChgRecordEntryDto;
            }
            interface ChgRecordEntryDto$ {
                /**
                 * @return {@link ChgRecordEntryDto#chgMode}
                 */
                getChgMode():string;
                getDataDy():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * @return {@link ChgRecordEntryDto#flowType}
                 */
                getFlowType():string;
                /**
                 * @return {@link ChgRecordEntryDto#idAfter}
                 */
                getIdAfter():long;
                /**
                 * @return {@link ChgRecordEntryDto#idBefore}
                 */
                getIdBefore():long;
                /**
                 * @return {@link ChgRecordEntryDto#vidAfter}
                 */
                getVidAfter():long;
                /**
                 * @return {@link ChgRecordEntryDto#vidBefore}
                 */
                getVidBefore():long;
                /**
                 * @param chgMode {@link ChgRecordEntryDto#chgMode}
                 */
                setChgMode(chgMode:string):void;
                setDataDy(dataDy:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * @param flowType {@link ChgRecordEntryDto#flowType}
                 */
                setFlowType(flowType:string):void;
                /**
                 * @param idAfter {@link ChgRecordEntryDto#idAfter}
                 */
                setIdAfter(idAfter:long):void;
                /**
                 * @param idBefore {@link ChgRecordEntryDto#idBefore}
                 */
                setIdBefore(idBefore:long):void;
                /**
                 * @param vidAfter {@link ChgRecordEntryDto#vidAfter}
                 */
                setVidAfter(vidAfter:long):void;
                /**
                 * @param vidBefore {@link ChgRecordEntryDto#vidBefore}
                 */
                setVidBefore(vidBefore:long):void;
                /**
                 * ���ض�����Ϣ
                 *
                 * @return ������Ϣ
                 */
                toPrintString():string;
            }
            type ChgRecordEntryDto_T = $.java.io.Serializable & ChgRecordEntryDto_S & ChgRecordEntryDto$;
            interface ChgRecordEntryDto extends ChgRecordEntryDto_T {
            }
            interface ChgExternalDataEntryDto_S {
            }
            type ChgExternalDataEntryDto_ST = ChgRecordEntryDto_S & ChgExternalDataEntryDto_S;
            interface ChgExternalDataEntryDto_C extends ChgExternalDataEntryDto_ST {
                new():ChgExternalDataEntryDto;
            }
            interface ChgExternalDataEntryDto$ {
            }
            type ChgExternalDataEntryDto_T = ChgRecordEntryDto & ChgExternalDataEntryDto_S & ChgExternalDataEntryDto$;
            interface ChgExternalDataEntryDto extends ChgExternalDataEntryDto_T {
            }
            interface ChgLogEntryDto_S {
                /**
                 * ���� ChgLogEntryDto
                 *
                 * @param entityName  Ԫ����ҳ���ʶ
                 * @param chgTacticId ��Ϣ�����id
                 * @param dataId      ����id
                 * @return ChgLogEntryDto
                 */
                init(entityName:string,chgTacticId:long,dataId:long):ChgLogEntryDto;
            }
            interface ChgLogEntryDto_C extends ChgLogEntryDto_S {
                new():ChgLogEntryDto;
            }
            interface ChgLogEntryDto$ {
                /**
                 * @return {@link ChgLogEntryDto#chgObject}
                 */
                getChgObject():string;
                /**
                 * @return {@link ChgLogEntryDto#chgTacticId}
                 */
                getChgTacticId():long;
                /**
                 * @return {@link ChgLogEntryDto#dataId}
                 */
                getDataId():long;
                /**
                 * @return {@link ChgLogEntryDto#errorMsg}
                 */
                getErrorMsg():string;
                /**
                 * @return {@link ChgLogEntryDto#saveStatus}
                 */
                getSaveStatus():string;
                /**
                 * @return {@link ChgLogEntryDto#validStatus}
                 */
                getValidStatus():string;
                /**
                 * @param chgObject {@link ChgLogEntryDto#chgObject}
                 */
                setChgObject(chgObject:string):void;
                /**
                 * @param chgTacticId {@link ChgLogEntryDto#chgTacticId}
                 */
                setChgTacticId(chgTacticId:long):void;
                /**
                 * @param dataId {@link ChgLogEntryDto#dataId}
                 */
                setDataId(dataId:long):void;
                /**
                 * @param errorMsg {@link ChgLogEntryDto#errorMsg}
                 */
                setErrorMsg(errorMsg:string):void;
                /**
                 * @param saveStatus {@link ChgLogEntryDto#saveStatus}
                 */
                setSaveStatus(saveStatus:string):void;
                /**
                 * @param validStatus {@link ChgLogEntryDto#validStatus}
                 */
                setValidStatus(validStatus:string):void;
            }
            type ChgLogEntryDto_T = ChgLogEntryDto_S & ChgLogEntryDto$;
            interface ChgLogEntryDto extends ChgLogEntryDto_T {
            }
        }
        namespace kd.sdk.hr.hpfs.formplugin.file{
            interface DynFilePagePlugin_S {
            }
            type DynFilePagePlugin_ST = $.kd.bos.form.plugin.AbstractFormPlugin & DynFilePagePlugin_S;
            interface DynFilePagePlugin_C extends DynFilePagePlugin_ST {
                new():DynFilePagePlugin;
            }
            interface DynFilePagePlugin$ {
            }
            type DynFilePagePlugin_T = $.kd.bos.form.plugin.AbstractFormPlugin & DynFilePagePlugin_S & DynFilePagePlugin$;
            interface DynFilePagePlugin extends DynFilePagePlugin_T {
            }
            interface MultiViewTemplatePlugin_S {
            }
            type MultiViewTemplatePlugin_ST = $.kd.bos.form.plugin.AbstractFormPlugin & MultiViewTemplatePlugin_S;
            interface MultiViewTemplatePlugin_C extends MultiViewTemplatePlugin_ST {
                new():MultiViewTemplatePlugin;
            }
            interface MultiViewTemplatePlugin$ {
            }
            type MultiViewTemplatePlugin_T = $.kd.bos.form.plugin.AbstractFormPlugin & MultiViewTemplatePlugin_S & MultiViewTemplatePlugin$;
            interface MultiViewTemplatePlugin extends MultiViewTemplatePlugin_T {
            }
        }
        namespace kd.sdk.hr.hspm{
            interface SdkHRHspmModule_S {
            }
            type SdkHRHspmModule_ST = $.kd.sdk.module.Module & SdkHRHspmModule_S;
            interface SdkHRHspmModule_C extends SdkHRHspmModule_ST {
                new():SdkHRHspmModule;
            }
            interface SdkHRHspmModule$ {
            }
            type SdkHRHspmModule_T = $.kd.sdk.module.Module & SdkHRHspmModule_S & SdkHRHspmModule$;
            interface SdkHRHspmModule extends SdkHRHspmModule_T {
            }
        }
        namespace kd.sdk.hr.hspm.business.helper{
            interface BasedataHelper_S {
                /**
                 * �������� ��ѯ����˵Ļ�������
                 * @param entityName ��������ʵ��
                 * @param name ����
                 * @return �����������ϵ�����
                 */
                getAuditBaseDataByName(entityName:string,name:string):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ѯ��������
                 *
                 * @param entityName ��������ʵ��
                 * @param pkId ����
                 * @return �����������ϵ�����
                 */
                getBasedataById(entityName:string,pkId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ѯ����֤��
                 *
                 * @param languagetypeId ��������ID
                 * @return �����������ϵ�����
                 */
                getLanguagecertByLanguagetype(languagetypeId:long):$.java.util.Map;
                /**
                 * ��ѯ����˵Ļ������ϵ�ID����
                 *
                 * @return ��������ID����
                 */
                queryAudisBasedataIdList(entityName:string):$.java.util.List;
                /**
                 * ����initstatus��ʼ��״̬
                 *
                 * @param desDy ��̬����
                 * @return ����
                 */
                setInitData(desDy:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
            }
            interface BasedataHelper_C extends BasedataHelper_S {
                new():BasedataHelper;
            }
            interface BasedataHelper$ {
            }
            type BasedataHelper_T = BasedataHelper_S & BasedataHelper$;
            interface BasedataHelper extends BasedataHelper_T {
            }
            interface HpfsChgexternalrecordQueueHelper_S {
                /**
                 * ��ʱ���ɾ���ɹ�������������Ϣ
                 * ��ȡ������䶯������Ϣͬ������
                 *
                 * @param dataEntities ��ʱ���ɾ����ʵ�弯��
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 * @return ������䶯������Ϣͬ������
                 */
                createBatchHisNonLineDeleteMsg(dataEntities:$.kd.bos.dataentity.entity.DynamicObject[],entityNumber:string,sourceNumber:string):$.java.util.Map;
                /**
                 * ��ʱ�����³ɹ�������������Ϣ�����ƣ�
                 * ����������䶯������Ϣͬ������
                 *
                 * @param personId      ��Ȼ��ID
                 * @param paramMap      ���ͱ�������
                 * @param operateResult ������ʷģ�ͽӿڷ��ذ�װ��
                 * @param sourceEntity  ʵ��
                 * @return ������䶯������Ϣͬ������
                 */
                createBatchHisNonLineInsertOrUpdateMsg(personId:long,paramMap:$.java.util.Map,operateResult:kd.sdk.hr.hspm.common.result.HrpiServiceOperateResult,sourceEntity:string):kd.sdk.hr.hspm.common.dto.HpfsChgexternalrecordQueueDto;
                /**
                 * �����б�ķ�ʱ��������޸ģ�ͬ��hrpi_person�����ƣ�
                 * ����������䶯������Ϣͬ������
                 *
                 * @param personId      ��Ȼ��ID
                 * @param paramMap      ���ͱ�������
                 * @param sourceEntity  ʵ��
                 * @return ������䶯������Ϣͬ������
                 */
                createNoPropInsertOrUpdateMsg(personId:long,paramMap:$.java.util.Map,sourceEntity:string):void;
                /**
                 * ��ʼ�����Ĳ�������
                 *
                 * @param personId     ��Ȼ��ID
                 * @param sourceNumber ʵ��
                 * @return ���Ĳ���
                 */
                initHpfsChgexternalrecordQueueDto(personId:long,sourceNumber:string):kd.sdk.hr.hspm.common.dto.HpfsChgexternalrecordQueueDto;
                /**
                 * ������Ϣ���»�ɾ����ɺ󣬺ϲ����Ĳ����ͱ��ģ����ƣ�
                 * ����������䶯������Ϣͬ��
                 *
                 * @param pereduexpHpfsChgexternalrecordQueueDtoMap ������������/ɾ�������Ѿ������ı���
                 * @param pereduexpcertBatchHisNonLineDeleteMsg     ����֤��ɾ�������Ѿ������ı���
                 */
                mergeRecordAndSend(pereduexpHpfsChgexternalrecordQueueDtoMap:$.java.util.Map,pereduexpcertBatchHisNonLineDeleteMsg:$.java.util.Map):void;
                /**
                 * ��ʱ���ɾ���ɹ�������������Ϣ
                 * ����������䶯������Ϣͬ��
                 *
                 * @param dataEntities ��ʱ���ɾ����ʵ�弯��
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 */
                sendBatchHisNonLineDeleteMsg(dataEntities:$.kd.bos.dataentity.entity.DynamicObject[],entityNumber:string,sourceNumber:string):void;
                /**
                 * ��ʱ��������ɹ�������������Ϣ
                 * ����������䶯������Ϣͬ��
                 *
                 * @param dataEntities ʵ��Ķ�̬���ݶ���
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 */
                sendBatchHisNonLineInsertMsg(dataEntities:$.kd.bos.dataentity.entity.DynamicObject[],entityNumber:string,sourceNumber:string):void;
                /**
                 * ��ʱ�����³ɹ�������������Ϣ�����ƣ�
                 * ����������䶯������Ϣͬ��
                 *
                 * @param personId      ��Ȼ��ID
                 * @param paramMap      ���ͱ�������
                 * @param operateResult ������ʷģ�ͽӿڷ��ذ�װ��
                 * @param sourceEntity  ʵ��
                 */
                sendBatchHisNonLineInsertOrUpdateMsg(personId:long,paramMap:$.java.util.Map,operateResult:kd.sdk.hr.hspm.common.result.HrpiServiceOperateResult,sourceEntity:string):void;
                /**
                 * ��ʱ�����³ɹ�������������Ϣ
                 * ����������䶯������Ϣͬ��
                 *
                 * @param dataEntities ʵ��Ķ�̬���ݶ���
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 */
                sendBatchHisNonLineUpdateMsg(dataEntities:$.kd.bos.dataentity.entity.DynamicObject[],entityNumber:string,sourceNumber:string):void;
                /**
                 * ������Ϣ�����ɹ���������Ϣ�����ƣ�
                 * ����������䶯������Ϣͬ��
                 *
                 * @param personId                  ��Ȼ��ID
                 * @param paramMap                  ���ͱ�������
                 * @param pereduexpcertDyCollection ����֤��������������
                 * @param operateResult             ������ʷģ�ͽӿڷ��ذ�װ��
                 */
                sendCustomerHisNonLineMsgBySavePereduexpinfo(personId:long,paramMap:$.java.util.Map,pereduexpcertDyCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection,operateResult:kd.sdk.hr.hspm.common.result.HrpiServiceOperateResult):void;
                /**
                 * ���˻�����Ϣ����³ɹ���������Ϣ�����ƣ�
                 * ����������䶯������Ϣͬ��
                 *
                 * @param personId        ��Ȼ��ID
                 * @param paramMap        ���ͱ�������
                 * @param hrpiPertspropDy ʱ���Ա����ݱ���ǰ�����¼�¼
                 * @param ermanFileDbMap  ����޸�ǰ����ҵ�񵵰����ݵļ���
                 * @param operateResult   ������ʷģ�ͽӿڷ��ذ�װ��
                 */
                sendCustomerHisNonLineUpdateMsgByPersoninfo(personId:long,paramMap:$.java.util.Map,hrpiPertspropDy:$.kd.bos.dataentity.entity.DynamicObject,ermanFileDbMap:$.java.util.Map,operateResult:kd.sdk.hr.hspm.common.result.HrpiServiceOperateResult):void;
                /**
                 * ��ʱ��������ɹ���������Ϣ
                 * ����������䶯������Ϣͬ��
                 *
                 * @param dataEntity   ʵ��Ķ�̬���ݶ���
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 */
                sendHisNonLineInsertMsg(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,entityNumber:string,sourceNumber:string):void;
                /**
                 * ��ʱ�����³ɹ���������Ϣ
                 * ����������䶯������Ϣͬ��
                 *
                 * @param dataEntity   ʵ��Ķ�̬���ݶ���
                 * @param entityNumber ʵ�����
                 * @param sourceNumber ����ʵ��
                 */
                sendHisNonLineUpdateMsg(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,entityNumber:string,sourceNumber:string):void;
                /**
                 * ������Ϣ
                 *
                 * @param hpfsChgexternalrecordQueueDto ���Ĳ���
                 */
                sendMsg(hpfsChgexternalrecordQueueDto:kd.sdk.hr.hspm.common.dto.HpfsChgexternalrecordQueueDto):void;
            }
            interface HpfsChgexternalrecordQueueHelper_C extends HpfsChgexternalrecordQueueHelper_S {
                new():HpfsChgexternalrecordQueueHelper;
            }
            interface HpfsChgexternalrecordQueueHelper$ {
            }
            type HpfsChgexternalrecordQueueHelper_T = HpfsChgexternalrecordQueueHelper_S & HpfsChgexternalrecordQueueHelper$;
            interface HpfsChgexternalrecordQueueHelper extends HpfsChgexternalrecordQueueHelper_T {
            }
            interface InfoGroupHelper_S {
                /**
                 * SubEntryProp list�б�ת��map
                 *
                 * @param subEntryProps �ӷ�¼
                 * @return map
                 */
                changeToSubEntryPropsMap(subEntryProps:$.java.util.List):$.java.util.Map;
                /**
                 * �ر�ָ������
                 *
                 * @param view ����ͼ������ͼ
                 */
                closeGuideFlex(view:$.kd.bos.form.IFormView):void;
                /**
                 * ɾ�������Ķ����˵�
                 *
                 * @param view    ����ͼ����view
                 * @param groupId ɾ������Ϣ��id
                 */
                delRelationMultiLevelMenu(view:$.kd.bos.form.IFormView,groupId:string):void;
                /**
                 *  �Ƿ����˶༶�˵�
                 *
                 * @return ��/��
                 */
                enableMultiLevelMenu():boolean;
                /**
                 * �Ƿ���Ĭ����
                 *
                 * @param dynamicObjectCollection ��¼����
                 * @return �Ƿ�
                 */
                existDefaultRow(dynamicObjectCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):boolean;
                /**
                 * ��ȡҵ������
                 *
                 * @param view ����ͼ������ͼ
                 * @return ҵ�����͹���
                 */
                getBusinessTypeFilter(view:$.kd.bos.form.IFormView):$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ��������
                 *
                 * @param isMainArea �Ƿ�����ҳ����
                 * @return ��������
                 */
                getConfigArea(isMainArea:boolean):kd.sdk.hr.hspm.common.enums.ConfigAreaEnum;
                /**
                 * ��ȡ��ǰ��Ϣ���¼��
                 *
                 * @param isMainArea �Ƿ�����ҳ����
                 * @return ��ǰ��Ϣ���¼��
                 */
                getCurrentEntityKey(isMainArea:boolean):string;
                /**
                 * �������ѡ�е��ֶΣ�ȷ�ϰ󶨵���
                 *
                 * @param dynamicObjects ��Ϣ��
                 * @param nodeId         �ڵ�ID
                 * @return ��/��
                 */
                getCurrentGroup(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObjectCollection,nodeId:string):long;
                /**
                 * ��ȡ�ӷ�¼����
                 *
                 * @param properties ����
                 * @return �ӷ�¼
                 */
                getSubEntryProp(properties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection):$.java.util.List;
                /**
                 * ��ȡ����id����
                 *
                 * @param dynamicObjects ��¼
                 * @param nodeId         ����ڵ�
                 * @return ����id����
                 */
                getSubGroupIds(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObjectCollection,nodeId:string):$.java.util.List;
                /**
                 * ��ȡtab��text
                 *
                 * @param tabKey tabkey
                 * @return tab��text
                 */
                getTabText(tabKey:string):string;
                /**
                 * �Ƿ��ǽ�������
                 *
                 * @param mappingFormId ��ʶ
                 * @return ��/��
                 */
                isEduPage(mappingFormId:string):boolean;
                /**
                 * �Ƿ���Ա����
                 *
                 * @return �Ƿ�
                 */
                isEmployee(model:$.kd.bos.entity.datamodel.IDataModel):boolean;
                /**
                 * �жϸ���Ϣ���Ƿ�����ֶ�
                 *
                 * @param group ��Ϣ��
                 * @return �Ƿ�
                 */
                isExistField(group:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * ���ݷ�¼�����ж��Ƿ�����ҳ����
                 *
                 * @param key ����
                 * @return �Ƿ�����ҳ��������
                 */
                isMainArea(key:string):boolean;
                /**
                 * �Ƿ��ǵ��и���
                 *
                 * @param pageNumber Ԫ���ݱ�ʶ
                 * @return �Ƿ�
                 */
                isSingleRowTpl(pageNumber:string):boolean;
                /**
                 * ȥ��̨��ѯ��ʾ��
                 *
                 * @param view ����ͼ������ͼ
                 * @param key �ؼ���ʶ
                 * @return ��ʾ��
                 */
                queryPromptForString(view:$.kd.bos.form.IFormView,key:string):string;
                /**
                 * ���Ĭ���д��ڣ���ɾ��Ĭ����
                 *
                 * @param dynamicObjectCollection ��¼����
                 */
                removeDefaultRowIFAbsent(dynamicObjectCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * �����������ť�Ƿ�����
                 *
                 * @param view ����ͼ������ͼ
                 * @param pageNumber ��Ϣ���ʶ
                 * @param prefix ǰ׺
                 */
                setGroupOpEnable(view:$.kd.bos.form.IFormView,pageNumber:string,prefix:string):void;
                /**
                 *  ��ʾ��
                 *
                 * @param view ����ͼ������ͼ
                 */
                showHint(view:$.kd.bos.form.IFormView):void;
                /**
                 * Ԥ������
                 *
                 * @param pkId ���÷���ID
                 * @param view view
                 */
                showPreview(pkId:any,view:$.kd.bos.form.IFormView):void;
            }
            interface InfoGroupHelper_C extends InfoGroupHelper_S {
                new():InfoGroupHelper;
            }
            interface InfoGroupHelper$ {
            }
            type InfoGroupHelper_T = InfoGroupHelper_S & InfoGroupHelper$;
            interface InfoGroupHelper extends InfoGroupHelper_T {
            }
            interface ApprovalHelper_S {
                readonly KEY_APPROVAL_SUMBIT_CALLBACK:string;
                readonly KEY_HOMEPAGE_CLOSE_CALLBACK:string;
                readonly PERM_SUBMIT_ID:string;
                /**
                 * ɾ������ʱ���洦��
                 *
                 * @param view
                 * @param entityName
                 * @param pk
                 * @param dyArr
                 * @param tabList
                 * @return
                 */
                dealApprovalCacheForDel(view:$.kd.bos.form.IFormView,entityName:string,pk:long,dyArr:$.kd.bos.dataentity.entity.DynamicObject,tabList:$.java.util.Map):boolean;
                /**
                 * @param view
                 * @param entityName
                 * @param pk
                 * @param dyArr
                 * @param tabList
                 * @return
                 */
                dealAuditBeforeDel(view:$.kd.bos.form.IFormView,entityName:string,pk:long,dyArr:$.kd.bos.dataentity.entity.DynamicObject,tabList:$.java.util.Map):boolean;
                /**
                 * ɾ������
                 *
                 * @param view ��ͼ
                 */
                delCacheData(view:$.kd.bos.form.IFormView):void;
                /**
                 * �Ƿ���������Ϣ
                 *
                 * @param view ��ҳivew
                 * @return �Ƿ���������Ϣ
                 */
                existAuditInfo(view:$.kd.bos.form.IFormView):boolean;
                /**
                 * ��ȡ����ֶ���Ϣ
                 *
                 * @param view ��ҳivew
                 * @return ����ֶ���Ϣ
                 */
                getAuditFieldMap(view:$.kd.bos.form.IFormView):$.java.util.Map;
                /**
                 * �ı䵯����ť����
                 *
                 * @return
                 */
                getChangeBtnNameMaps():$.java.util.HashMap;
                getFullKey(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):string;
                /**
                 * �������еĹ�������Ӧ�ĵ���
                 *
                 * @param personId ��ԱId
                 * @return �������еĹ�������Ӧ�ĵ���
                 */
                getInProcessWorkFlowBill(personId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * �����ύ��˰�ť�Ƿ���ʾ
                 *
                 * @param view �ƶ�����ҳview
                 */
                handleSubmitButtonVisible(view:$.kd.bos.form.IFormView):void;
                /**
                 * ��ȡ����������key
                 *
                 * @param entityName ������
                 * @param dataId     ����Id
                 * @return
                 */
                hasAbandonButton(view:$.kd.bos.form.IFormView,entityName:string,dataId:long):boolean;
                /**
                 * �Ƿ���Գ���
                 *
                 * @param bill ��������
                 * @return ��/��
                 */
                isCanWithDraw(bill:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �ж��Ƿ���Ϊ�������ض�����ɾ����ť
                 *
                 * @param view
                 * @param dataId
                 * @return
                 */
                isHideDelBtnForAdd(view:$.kd.bos.form.IFormView,dataId:string):boolean;
                /**
                 * �ж��Ƿ���Ϊɾ����������
                 *
                 * @param view
                 * @param dataId
                 * @return
                 */
                isHideDelBtnForDel(view:$.kd.bos.form.IFormView,dataId:string):boolean;
                /**
                 * ����Ϣ���Ƿ��б����ص��ֶ�(isNotPasss���������ķ����Ѿ���������ĿǰӦ�û��ж����õ���飬Ϊ�˹��������������÷���)
                 *
                 * @param view      �ҵĵ�����ҳview
                 * @param regNumber ��Ϣ��ҳ��ע�����
                 * @return
                 */
                isNotPasss(view:$.kd.bos.form.IFormView,regNumber:string):boolean;
                /**
                 * ����Ϣ���Ƿ��б����ص��ֶ�
                 *
                 * @param view      �ҵĵ�����ҳview
                 * @param regNumber ��Ϣ��ҳ��ע�����
                 * @param groupName ��Ϣ����
                 * @return
                 */
                isNotPasss(view:$.kd.bos.form.IFormView,regNumber:string,groupName:string):boolean;
                /**
                 * �Ƿ���Ҫ���
                 *
                 * @param view      ��ǰҳ��
                 * @param pkStr     ����id
                 * @param curEntity ��ǰҳ���Ӧʵ��
                 * @return
                 */
                noNeedDelAudit(view:$.kd.bos.form.IFormView,pkStr:string,curEntity:string):boolean;
                /**
                 * ɾ���ɰ汾��������
                 *
                 * @param view �ƶ�����ҳview
                 * @return �Ƿ���ھɰ汾����
                 */
                removeOldVersonData(view:$.kd.bos.form.IFormView):boolean;
                /**
                 * �����ύ��˰�ť�Ƿ���ʾ����
                 *
                 * @param view     �ҵĵ�����ҳview
                 * @param listener Progresss����
                 */
                setSubmitButtonVisibleListener(view:$.kd.bos.form.IFormView,listener:$.kd.bos.form.control.events.ProgresssListener):void;
                showConfirmWhenFirstOpen(isClick:boolean,view:$.kd.bos.form.IFormView):void;
                /**
                 * չʾɾ��������ͨ������Ϣ
                 *
                 * @param view
                 */
                showNoPassInfoForDelOP(view:$.kd.bos.form.IFormView):void;
                /**
                 * ��ʾ����ͨ����Ϣ
                 *
                 * @param view
                 * @param entityName
                 * @param pkId
                 */
                showNotPassInfoComfirm(view:$.kd.bos.form.IFormView,key:string,entityName:string,pkId:string):void;
                /**
                 * �ύ��Ϣ��Ϣ�������
                 *
                 * @param view ��ҳivew
                 */
                submit(view:$.kd.bos.form.IFormView):void;
                /**
                 * �ύȷ��
                 *
                 * @param view ��ҳivew
                 */
                submitConfirm(view:$.kd.bos.form.IFormView,formPlugin:$.kd.bos.form.plugin.IFormPlugin):void;
                /**
                 * �־û���ҳ����
                 *
                 * @param view
                 */
                updateSyncCacheToDataBase(view:$.kd.bos.form.IFormView):void;
                /**
                 * �鿴������¼
                 *
                 * @param view �ҵĵ�����ҳview
                 */
                viewAuditRecord(view:$.kd.bos.form.IFormView):void;
                /**
                 * �鿴�޸ļ�¼
                 *
                 * @param view �ƶ�����ҳview
                 */
                viewChangeRecord(view:$.kd.bos.form.IFormView):void;
                /**
                 * ��������
                 *
                 * @param bill ������Ϣ
                 * @return �Ƿ�ɹ�
                 */
                widthDraw(bill:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.Tuple;
            }
            interface ApprovalHelper_C extends ApprovalHelper_S {
                new():ApprovalHelper;
            }
            interface ApprovalHelper$ {
            }
            type ApprovalHelper_T = ApprovalHelper_S & ApprovalHelper$;
            interface ApprovalHelper extends ApprovalHelper_T {
            }
            interface HSPMBusinessDataServiceHelper_S {
                /**
                 * ��ҳ��ѯ������ƽ̨�ķ�ҳ��ѯ������������һЩ�Ż�
                 * {@link BusinessDataServiceHelper#load(String, String, QFilter[], String, int, int)}
                 *
                 * @param entityName       ʵ������
                 * @param selectProperties ��ѯ�ֶ�
                 * @param filters          ��ѯ����
                 * @param orderBy          ��ѯ����
                 * @param top              ��ҳ��С
                 * @return ��ѯ����
                 */
                load(entityName:string,selectProperties:string,filters:$.kd.bos.orm.query.QFilter[],orderBy:string,top:number):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ҳ��ѯ������ƽ̨�ķ�ҳ��ѯ������������һЩ�Ż�
                 * {@link BusinessDataServiceHelper#load(String, String, QFilter[], String, int, int)}
                 *
                 * @param entityName       ʵ������
                 * @param selectProperties ��ѯ�ֶ�
                 * @param filters          ��ѯ����
                 * @param orderBy          ��ѯ����
                 * @param pageIndex        ��ʼҳ
                 * @param pagesize         ��ҳ��С
                 * @return ��ѯ����
                 */
                load(entityName:string,selectProperties:string,filters:$.kd.bos.orm.query.QFilter[],orderBy:string,pageIndex:number,pagesize:number):$.kd.bos.dataentity.entity.DynamicObject[];
                loadData(type_arg:$.kd.bos.dataentity.metadata.dynamicobject.DynamicObjectType,idList:$.java.util.List,ds:$.kd.bos.algo.DataSet):$.kd.bos.dataentity.entity.DynamicObject[];
            }
            interface HSPMBusinessDataServiceHelper_C extends HSPMBusinessDataServiceHelper_S {
                new():HSPMBusinessDataServiceHelper;
            }
            interface HSPMBusinessDataServiceHelper$ {
            }
            type HSPMBusinessDataServiceHelper_T = HSPMBusinessDataServiceHelper_S & HSPMBusinessDataServiceHelper$;
            interface HSPMBusinessDataServiceHelper extends HSPMBusinessDataServiceHelper_T {
            }
            interface CommonQFilterHelper_S {
                /**
                 * ��ȡ ��ҵ�񵵰�������ְ������,���ݵ������� QFilter
                 *
                 * @param selectProperty ��ѯ��
                 * @return QFilter
                 */
                getAllErfiletypeMainErfiletypeassign(selectProperty:string):$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ ��ʼ�������� QFilter(����ְ����ְ)
                 *
                 * @param selectProperty ��ѯ��
                 * @return QFilter
                 */
                getErfiletypeInitErfiletypeassign(selectProperty:string):$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ ��ҵ�񵵰���������ְ���������� QFilter
                 *
                 * @param selectProperty ��ѯ��
                 * @return QFilter
                 */
                getErfiletypeMainErfiletypeassign(selectProperty:string):$.kd.bos.orm.query.QFilter;
                /**
                 * �����ù���ϵ״̬�����ѯ�ù���ϵ״̬
                 *
                 * @param selectProperty ��ѯ�ֶ�
                 * @param labrelstatusclsList �ù���ϵ״̬����
                 * @return QFilter
                 */
                getLaborrelstatusByClsList(selectProperty:string,labrelstatusclsList:$.java.util.List):$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ ��ְ״̬�� QFilter
                 *
                 * @param selectProperty ��ѯ��
                 * @return QFilter
                 */
                getLaborrelstatusWorkingState(selectProperty:string):$.kd.bos.orm.query.QFilter;
                /**
                 * �����ù���ϵ���ͷ����ѯ�ù���ϵ����
                 *
                 * @param selectProperty ��ѯ�ֶ�
                 * @param labreltypeclsList �ù���ϵ���ͷ���
                 * @return QFilter
                 */
                getLaborreltypeByClsList(selectProperty:string,labreltypeclsList:$.java.util.List):$.kd.bos.orm.query.QFilter;
            }
            interface CommonQFilterHelper_C extends CommonQFilterHelper_S {
                new():CommonQFilterHelper;
            }
            interface CommonQFilterHelper$ {
            }
            type CommonQFilterHelper_T = CommonQFilterHelper_S & CommonQFilterHelper$;
            interface CommonQFilterHelper extends CommonQFilterHelper_T {
            }
        }
        namespace kd.sdk.hr.hspm.business.mservice.helper{
            interface HSPMServiceHelper_S {
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч�ĵ�������
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @return ��Ч�ĵ�������
                 */
                countErmanFilesByTypeclsAndStatuscls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List):number;
                /**
                 * ��ȡ��Ա��Ƭͷ����Ϣ
                 *
                 * @param ermanfileId ����id
                 * @return ������Ϣ
                 */
                getCardFields(ermanfileId:$.java.util.List):$.java.util.List;
                /**
                 * ������֯�˻�ȡ������Ϣ
                 *
                 * @param depempIds ������id
                 * @return ������Ϣ
                 */
                getErmanFileByDepempId(depempIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ������ְ��Ϣ��ȡ����ID
                 *
                 * @param importList ��ְ��Ϣ
                 * @return ������Ϣ
                 */
                getErmanFileIdByEmporgRel(importList:$.java.util.List):$.java.util.List;
                /**
                 * ���ݵ���ID��ȡ������Ϣ
                 *
                 * @param ermanfileId ����id
                 * @return ������Ϣ
                 */
                getErmanfile(ermanfileId:long):$.java.util.Map;
                /**
                 * ��ȡ����ͼ������Ϣ
                 *
                 * @param cnfId   ��������
                 * @param preView �Ƿ�Ԥ��
                 */
                getInfoGroupConfig(cnfId:long,preView:string):$.java.util.Map;
                /**
                 * ������Ȼ��ID��ȡ��������Ϣ
                 *
                 * @param personId ��Ȼ��id
                 * @return ��������Ϣ
                 */
                getPrimaryErmanfFile(personId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ���ݹ��������ȡ��������ͼ������ת��������
                 *
                 * @param erFileId   ����id
                 * @param listFormId �б��ʶ
                 * @return formShowParameter
                 */
                jumpErManFileDetail(erFileId:long,listFormId:string):$.java.util.Map;
                /**
                 * ͨ����������ID��ȡ����
                 *
                 * @param pkIds ����
                 * @return ������Ϣ
                 */
                listErManFilesByPkIds(pkIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч�ĵ�����Ϣ
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @param selectProperties    ��ѯ�ֶΣ�����ο�hspm_ermanfileԪ���ݣ�
                 * @param id                 ID�Ĵ�������
                 * @param top                 ��ѯ����
                 * @return ��Ч�ĵ�����Ϣ
                 */
                listErmanFilesByTypeclsAndStatuscls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List,selectProperties:string,id:long,top:number):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ������Ȼ��ID������ȡ��������Ϣ
                 *
                 * @param personIds ��Ȼ��Id
                 * @return ������Ϣ
                 */
                listPrimaryErmanFile(personIds:$.java.util.List):$.java.util.Map;
                /**
                 * ���ݹ��Ż�ȡ����ְ����������Ϣ
                 *
                 * @param empnumberList �����б�
                 * @return ��������Ϣ
                 */
                listPrimaryErmanFilesByEmpnumber(empnumberList:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
            }
            interface HSPMServiceHelper_C extends HSPMServiceHelper_S {
                new():HSPMServiceHelper;
            }
            interface HSPMServiceHelper$ {
            }
            type HSPMServiceHelper_T = HSPMServiceHelper_S & HSPMServiceHelper$;
            interface HSPMServiceHelper extends HSPMServiceHelper_T {
            }
        }
        namespace kd.sdk.hr.hspm.business.repository{
            interface ErmanFileRepository_S {
                readonly QUIT_FILETYPE_CLS:long;
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч�ĵ�������
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @return ��Ч�ĵ�������
                 */
                countErmanFilesByTypeclsAndStatuscls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List):number;
                generateDynamic():$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������ְ��Ϣ��ȡ�������Ͷ���ͬ��ʼ�������볡������Ա��ְ���µ���
                 *
                 * @Param [numbers, orgNums, positionNums, stdPositionNums, jobNums] ���
                 * @return kd.bos.dataentity.entity.DynamicObject[] ��Ա�������
                 */
                getAllErmanFileIdByEmporgRel(numbers:$.java.util.Set,orgNums:$.java.util.Set,positionNums:$.java.util.Set,stdPositionNums:$.java.util.Set,jobNums:$.java.util.Set):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ����personId��ȡ����
                 *
                 * @param personId ��Ȼ��ID
                 * @return ������Ϣ
                 */
                getErmanFile(personId:long):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ����personId��ȡ������
                 *
                 * @param personId ��Ȼ��id
                 * @return ������Ϣ
                 */
                getErmanFileByPersonIdAndPostypeId(personId:long,postypeId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������ְ��Ϣ��ȡ
                 */
                getErmanFileIdByEmporgRel(numbers:$.java.util.Set,orgNums:$.java.util.Set,positionNums:$.java.util.Set,stdPositionNums:$.java.util.Set,jobNums:$.java.util.Set):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * @param ermanFileId ����id
                 * @return ������Ϣ
                 */
                getErmanfile(ermanFileId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * @param ermanFileId ����id
                 * @return ������Ϣ
                 */
                getErmanfileInfo(ermanFileId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ�ù�״ֵ̬
                 *
                 * @return
                 */
                getLaborrelStatus():$.java.util.Map;
                /**
                 * ��ȡ�ù�����
                 *
                 * @return
                 */
                getLaborrelType():$.java.util.Map;
                /**
                 * ����personId��ȡ��ʱ����
                 *
                 * @param personId ��Ȼ��id
                 * @return ��ʱ����Ϣ
                 */
                getNonProp(personId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ����personId��ȡ������
                 *
                 * @param personId ��Ȼ��id
                 * @return ������Ϣ
                 */
                getPrimaryErmanFile(personId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ����personId��ȡ������
                 *
                 * @param employeeId ��Ȼ��id
                 * @return ������Ϣ
                 */
                getPrimaryErmanFileByEmployeeId(employeeId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ������ְ��Ϣ��ȡlistEmpposorgrels
                 */
                getPrimaryErmanFileIdByEmployeeId(employeeIdList:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ����������ȡ����
                 *
                 * @param pkIds ����
                 * @return ������Ϣ
                 */
                listErManFilesByPkIds(pkIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ѯ����������Ϣ
                 *
                 * @param ermanFileIds ����id
                 * @return ������Ϣ
                 */
                listErmanDepempfiles(ermanFileIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ������֯�˻�ȡ������Ϣ
                 *
                 * @param depempIds ��֯��id
                 * @return ������Ϣ
                 */
                listErmanFilesByDepempId(depempIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч�ĵ�����Ϣ
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @param selectProperties    ��ѯ�ֶΣ�����ο�hspm_ermanfileԪ���ݣ�
                 * @param start               ��ҳ����
                 * @param limit               ��ҳ����
                 * @return ��Ч�ĵ�����Ϣ
                 */
                listErmanFilesByTypeclsAndStatuscls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List,selectProperties:string,start:number,limit:number):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * �����ù���ϵ���ͷ�����ù���ϵ״̬�����ѯ��Ч�ĵ�����Ϣ
                 *
                 * @param labreltypeclsList   �ù���ϵ���ͷ���ID�б����
                 * @param labrelstatusclsList �ù���ϵ״̬����ID�б����
                 * @param selectProperties    ��ѯ�ֶΣ�����ο�hspm_ermanfileԪ���ݣ�
                 * @param id                  ��ѯ���������ID��
                 * @param top                 ��ѯ��������
                 * @return ��Ч�ĵ�����Ϣ
                 */
                listErmanFilesByTypeclsAndStatuscls(labreltypeclsList:$.java.util.List,labrelstatusclsList:$.java.util.List,selectProperties:string,id:long,top:number):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ������Ϣ
                 * @param ermanFileIds ����id
                 * @return ������Ϣ
                 */
                listErmanfiles(ermanFileIds:$.java.util.Collection):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ���ݹ��Ż�ȡ����ְ����������Ϣ
                 *
                 * @param empnumberList �����б�
                 * @return ������Ϣ
                 */
                listPrimaryErmanFilesByEmpnumber(empnumberList:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ����personId��ȡ������
                 *
                 * @param personIds ��Ȼ��id
                 * @return ������Ϣ
                 */
                listPrimaryErmanfFile(personIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ����employeeIds��ȡ������
                 *
                 * @param employeeIds ��ҵ��id����
                 * @return ������Ϣ
                 */
                listPrimaryErmanfFileByEmployeeIds(employeeIds:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ������Ϣ���������������ϣ�
                 * @param ermanFileIds ����id
                 * @return ������Ϣ
                 */
                loadOriginalErmanfiles(ermanFileIds:$.java.util.Collection):$.kd.bos.dataentity.entity.DynamicObject[];
            }
            interface ErmanFileRepository_C extends ErmanFileRepository_S {
                new():ErmanFileRepository;
            }
            interface ErmanFileRepository$ {
            }
            type ErmanFileRepository_T = ErmanFileRepository_S & ErmanFileRepository$;
            interface ErmanFileRepository extends ErmanFileRepository_T {
            }
        }
        namespace kd.sdk.hr.hspm.business.service{
            interface PageRegConfigService_S {
                /**
                 *  ��ȡ����ͼ��������key
                 *
                 * @param source   �ͻ�������
                 * @param cnfId    ����ͼ����id
                 * @param modTime  ����ͼ�����޸�ʱ��
                 * @param lang     ����
                 * @return ����ͼ��������key
                 */
                getConfCacheKey(source:string,cnfId:long,modTime:string,lang:$.kd.bos.lang.Lang):string;
                getInstance():PageRegConfigService;
            }
            interface PageRegConfigService_C extends PageRegConfigService_S {
                new():PageRegConfigService;
            }
            interface PageRegConfigService$ {
                /**
                 * ��ȡ���÷���
                 *
                 * @param cnfId ����id
                 * @param source ��Դ
                 * @param preView Ԥ��
                 * @return ��������
                 */
                getInfoGroupConfig(cnfId:long,source:string,preView:string):$.java.util.Map;
                /**
                 * �蹫������
                 *
                 * @param formShowParameter form
                 * @param view ��ͼ
                 */
                setCommonCustomParam(formShowParameter:$.kd.bos.form.FormShowParameter,view:$.kd.bos.form.IFormView):void;
            }
            type PageRegConfigService_T = PageRegConfigService_S & PageRegConfigService$;
            interface PageRegConfigService extends PageRegConfigService_T {
            }
            interface AttacheHandlerService_S {
                /**
                 * �ж�ҳ���Ƿ��ҳ��
                 *
                 * @param view        ��ͼ
                 * @param contentName �����
                 */
                containFlex(view:$.kd.bos.form.IFormView,contentName:string):void;
                getInstance():AttacheHandlerService;
                /**
                 * ����api�Ƿ�ɹ�
                 *
                 * @param resultMap api���ؽ��
                 * @return �Ƿ�ɹ�
                 */
                isSuccess(resultMap:$.java.util.Map):boolean;
            }
            interface AttacheHandlerService_C extends AttacheHandlerService_S {
                new():AttacheHandlerService;
            }
            interface AttacheHandlerService$ {
                /**
                 * �ı��ʵ���ҳ���ʶ
                 *
                 * @param formShowParameter formShowParameter
                 * @param entityId          ʵ��
                 * @return �޸�����
                 */
                buildUniqueParam(formShowParameter:$.kd.bos.form.FormShowParameter,entityId:string):$.java.util.Map;
                /**
                 * У��ذ��ı����ԡ����ȡ��Ƿ��ַ� ��У��
                 *
                 * @param view
                 * @param model
                 * @param drawFormFields
                 * @param ignoreField    ���˲�������ֶ�
                 * @param acrossEntity
                 * @return
                 */
                checkIllegalInput(view:$.kd.bos.form.IFormView,model:$.kd.bos.entity.datamodel.IDataModel,drawFormFields:$.java.util.List,ignoreField:$.java.util.Set,acrossEntity:string):string;
                /**
                 * У������
                 *
                 * @param view     ��ͼ
                 * @param pKId     ���������
                 * @param cacheKey ��ʶ
                 * @return �Ƿ�
                 */
                checkPkId(view:$.kd.bos.form.IFormView,pKId:long,cacheKey:string):boolean;
                /**
                 * �ر�ҳ��
                 *
                 * @param view       view
                 * @param resultMap  resultMap
                 * @param parentView parentView
                 */
                closeView(view:$.kd.bos.form.IFormView,resultMap:$.java.util.Map,parentView:$.kd.bos.form.IFormView):void;
                /**
                 * ������ťע��
                 *
                 * @param view    view
                 * @param thisObj thisObj
                 */
                commonBtnReg(view:$.kd.bos.form.IFormView,thisObj:kd.hr.hbp.formplugin.web.HRDataBaseEdit):void;
                /**
                 * ְ��ְ�ȵı������������������䶯������������Ч�ӿ�
                 *
                 * @return java.util.Map<java.lang.String, java.lang.Object> ����
                 * @Param [params]  ���
                 */
                executeActionPersonalChange(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ְ��ְ��ҳ���������ְ��ְ�ȵ�����ť�������ʾ����ǰ�Ĵ�����������䶯�����������ѯ�ӿ�
                 * Ŀ�ģ���ְ��ְ�ȵ������ֶ���ѡ������
                 *
                 * @return java.util.Map<java.lang.String, java.lang.Object> ���ý��
                 * @Param [params]  ���
                 */
                getActionPersonalChange(params:$.java.util.Map):$.java.util.Map;
                /**
                 * ͨ��֤������ ��ȡ��Ӧ����
                 *
                 * @param imageStr    ͼƬ��ַ
                 * @param displayName ��ʾ����
                 * @param type        ����id
                 * @return true
                 */
                getCardCNByEN(imageStr:string,displayName:string,type_arg:long):$.kd.bos.dataentity.Tuple;
                /**
                 * ��ȡ����id
                 *
                 * @param responseMap responseMap
                 * @param relFormId   relFormId
                 * @param type        ����
                 * @return �Ƿ���Ĭ��
                 */
                getCnfId(responseMap:$.java.util.Map,relFormId:string,type_arg:string):$.kd.bos.dataentity.Tuple;
                /**
                 * ѭ����ʹ��count���� �޷�������� ����ʹ��һ������Ƕ�׳��Ի��ȥ Ϊ�˽��sonar��ɨ������
                 *
                 * @return ORM����
                 */
                getORMHelper():$.kd.bos.orm.ORM;
                /**
                 * ��ȡ���ò���
                 *
                 * @param formShowParameter formShowParameter
                 * @param entityId          entityId
                 * @return map
                 */
                getPageCustomParam(formShowParameter:$.kd.bos.form.FormShowParameter,entityId:string):$.java.util.Map;
                getRealFormId(view:$.kd.bos.form.IFormView,dialogPageNumber:string,viewFlag:boolean):string;
                /**
                 * ��ȡС�������뷽ʽ��������ô������
                 * @param fieldKey �ֶοؼ�����
                 * @return ���뷽ʽ
                 */
                getRoundingMode(fieldKey:string):$.java.math.RoundingMode;
                /**
                 * �����������
                 *
                 * @param view      ��ͼ
                 * @param erFileId  ����id
                 * @param erFileDy  ����
                 * @param relFormId ��ʶ
                 * @param type      ����
                 * @param rpcType   rpcType
                 * @return ����id
                 */
                handleRuleEngine(view:$.kd.bos.form.IFormView,erFileId:long,erFileDy:$.kd.bos.dataentity.entity.DynamicObject,relFormId:string,type_arg:string,rpcMap:$.java.util.Map,rpcType:boolean):$.kd.bos.dataentity.Tuple;
                handlerFieldValueChange(view:$.kd.bos.form.IFormView,attachMap:$.java.util.Map,acrossEntity:string):$.java.util.Map;
                /**
                 * ��������
                 *
                 * @param formId        ʵ������
                 * @param pkId          ����
                 * @param appId         appid
                 * @param attachmentMap ������Ϣ
                 * @return
                 */
                invokeAttachment(formId:string,pkId:any,appId:string,attachmentMap:$.java.util.Map):$.kd.bos.dataentity.entity.DynamicObjectCollection;
                /**
                 * ����ԺУ���ڹ���/�����Ĺ�������
                 *
                 * @param erFileDy       erFileDy
                 * @param collegeCountry ԺУ���ڹ���/����
                 * @param sceneNumber    sceneNumber
                 * @return map
                 */
                invokeCollegeCountryRuleEngine(nonProp:$.kd.bos.dataentity.entity.DynamicObject,erFileDy:$.kd.bos.dataentity.entity.DynamicObject,collegeCountry:$.kd.bos.dataentity.entity.DynamicObject,sceneNumber:string):$.java.util.Map;
                /**
                 * ɾ��
                 *
                 * @param pkIdList   ɾ��������
                 * @param entityName ʵ������
                 * @param delBoFlag  ɾ����ʷ�����󡢸���boɾ��������ֻ����fidɾ
                 * @return �ɹ�����ʧ��
                 */
                invokeDel(pkIdList:$.java.util.List,entityName:string,delBoFlag:boolean):$.java.util.Map;
                /**
                 * ����
                 *
                 * @param attachMap �������BOID
                 * @return �ɹ�����ʧ��
                 */
                invokeDiscardBO(attachMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ��ʷģ������
                 * ����ʱ��Ҫ��֤���е��������ݾ���ͬһ������������������Ҫ����ͬһ��eventId
                 *
                 * @param attachMap �����������
                 * @param eventId   ����ID,ͬһ��excel��������Ҫ��ͬһ��eventId
                 * @return �ӿڷ��ؽ��
                 */
                invokeHisImportDataByBatchEventid(attachMap:$.java.util.Map,eventId:long):$.java.util.Map;
                /**
                 * ��ʱ��������
                 *
                 * @param importtype    ��������
                 * @param importSaveDys �������ݼ�
                 * @return �ӿڷ��ؽ��
                 */
                invokeHisNonLineImportData(importtype:string,importSaveDys:$.kd.bos.dataentity.entity.DynamicObject[]):$.java.util.Map;
                /**
                 * ����ɾ��
                 *
                 * @param formId  ʵ������
                 * @param pkId    ����
                 * @param fileUid Ӧ����ɾ���ĸ���id
                 */
                invokeRemoveAttachment(formId:string,pkId:any,fileUid:any):void;
                /**
                 * �޶�
                 *
                 * @param attachMap �����������
                 * @return �ɹ�����ʧ��
                 */
                invokeReviseVersion(attachMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ���ù�������
                 *
                 * @param erFileDy    erFileDy
                 * @param source      source
                 * @param sceneNumber sceneNumber
                 * @return map
                 */
                invokeRuleEngine(erFileDy:$.kd.bos.dataentity.entity.DynamicObject,source:string,sceneNumber:string):$.java.util.Map;
                /**
                 * �޶�
                 *
                 * @param attachMap �����������
                 * @return �ɹ�����ʧ��
                 */
                invokeSaveBatch(attachMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ����͸���
                 *
                 * @param attachMap �����������
                 * @return �ɹ�����ʧ��
                 */
                invokeSaveOrUpdate(attachMap:$.java.util.Map):$.java.util.Map;
                /**
                 * ������������
                 *
                 * @param view       view
                 * @param attachMap  ������Ϣ
                 * @param closeView  �Ƿ�ر�ҳ��
                 * @param entityName ʵ����
                 * @param type       -1:Ŀǰ��ְָ��ְ�ȵ���,1:����, 0:��ʵ���޸�,2:��ʵ���޸�
                 * @return ��Ϣ
                 */
                invokeSaveOrUpdate(view:$.kd.bos.form.IFormView,attachMap:$.java.util.Map,closeView:boolean,entityName:string,type_arg:string):$.java.util.Map;
                /**
                 * �ж�����ҳ���ǲ����
                 *
                 * @param formShowParameter form
                 * @return ��ҳΪ true
                 */
                judgeIsMain(formShowParameter:$.kd.bos.form.FormShowParameter):boolean;
                /**
                 * ����ɾ��
                 *
                 * @param formId ʵ������
                 * @param dataId ��������id
                 */
                removeAllAttachment(formId:string,dataId:any):void;
                /**
                 * ����ͷ�� hrpi_person ��hrpi_pernontsprop��Ҫ����
                 *
                 * @param personId ��Աid
                 * @param newValue ͷ��ͼƬ��ַ
                 */
                saveHeadsCulpture(personId:string,newValue:any):void;
                /**
                 * У���ֶ��Ƿ�仯����Ҫ����ͬ��ƽ̨������������δ���ʱ�����
                 *
                 * @param personId ��Ȼ��id
                 * @return yes
                 */
                sendChangeInfoSyncToSysUser(personId:$.java.util.List):void;
                /**
                 * ɾ��������������䶯
                 *
                 * @param dyArr      ����
                 * @param entityName ʵ������
                 * @param formId     ����ҳ��
                 */
                sendHpfsChgDeleteRecord(dyArr:$.kd.bos.dataentity.entity.DynamicObject[],entityName:string,formId:string):void;
                /**
                 * �������޸Ĳ�����������䶯��¼
                 *
                 * @param attachMap  ������Ϣ
                 * @param updateBoId ���µ�boid
                 * @param formId     ����ҳ��
                 */
                sendHpfsChgSaveOrUpdateRecord(attachMap:$.java.util.Map,updateBoId:$.java.util.Set,formId:string):void;
                /**
                 * �������setBorder
                 *
                 * @param mainSubAp ���
                 * @param top       top
                 * @param bot       bot
                 * @param left      left
                 * @param right     right
                 * @return style
                 */
                setBorder(mainSubAp:$.kd.bos.metadata.form.container.FlexPanelAp,top:string,bot:string,left:string,right:string):$.kd.bos.metadata.form.Style;
                /**
                 * �������ҳ ��ť�޸�Ϊ������ʽ
                 *
                 * @param view view
                 */
                setMainPageStyle(view:$.kd.bos.form.IFormView):void;
                /**
                 * �������margin
                 *
                 * @param centerMainAp ���
                 * @param top          top
                 * @param bot          bot
                 * @param left         left
                 * @param right        right
                 * @return style
                 */
                setMargin(centerMainAp:$.kd.bos.metadata.form.container.FlexPanelAp,top:string,bot:string,left:string,right:string):$.kd.bos.metadata.form.Style;
                /**
                 * �������setPadding
                 *
                 * @param centerMainAp ���
                 * @param top          top
                 * @param bot          bot
                 * @param left         left
                 * @param right        right
                 * @return style
                 */
                setPadding(centerMainAp:$.kd.bos.metadata.form.container.FlexPanelAp,top:string,bot:string,left:string,right:string):$.kd.bos.metadata.form.Style;
                /**
                 * ��������boolea ת����
                 *
                 * @param beforeCreatVo beforeCreatVo
                 * @return true false
                 */
                transferBoolType(beforeCreatVo:kd.sdk.hr.hspm.common.vo.BeforeCreatVo):boolean;
                /**
                 * У���ֶ��Ƿ�仯����Ҫ����ͬ��ƽ̨������������δ���ʱ�����
                 *
                 * @param entityName   ���б�ʵ����
                 * @param dataEntities ���б����ݼ�
                 * @return yes
                 */
                validateSyncFieldsDelChange(entityName:string,dataEntities:$.kd.bos.dataentity.entity.DynamicObject[]):$.java.util.List;
                /**
                 * У���ֶ��Ƿ�仯����Ҫ����ͬ��ƽ̨������������δ���ʱ�����
                 *
                 * @param entityName    ���б�ʵ����
                 * @param pkPersonIdMap ���б�������personId
                 * @return yes
                 */
                validateSyncFieldsDelChange(entityName:string,pkPersonIdMap:$.java.util.Map):$.java.util.List;
                /**
                 * У���ֶ��Ƿ�仯����Ҫ����ͬ��ƽ̨������������δ���ʱ�����
                 *
                 * @param datas    У������ key ʵ�����ƣ�value ҳ������
                 * @param personId ��Ȼ��id
                 * @param validDb  �Ƿ�У�����ݿ� false ��У�飨�ݴ�������ʱ�� true У��
                 * @return yes
                 */
                validateSyncFieldsUpdateChange(datas:$.java.util.Map,personId:long,validDb:boolean):boolean;
                /**
                 * У���ֶ��Ƿ�仯����Ҫ����ͬ��ƽ̨������������δ���ʱ�����
                 *
                 * @param entityName   ʵ�����
                 * @param dataEntities ʵ������
                 * @param personId     ��Ȼ��id
                 * @return yes
                 */
                validateSyncFieldsUpdateChange(entityName:string,dataEntities:$.kd.bos.dataentity.entity.DynamicObject[],personId:long):boolean;
                /**
                 * �����������
                 *
                 * @param view       ��ͼ
                 * @param erFileId   ����id
                 * @param listFormId ��ʶ
                 * @param type       ����
                 * @param rpcType    �Ƿ�ΪRPC����
                 * @return formShowParameter
                 */
                wrapHandleRuleEngine(view:$.kd.bos.form.IFormView,erFileId:long,listFormId:string,type_arg:string,rpcType:boolean):$.java.util.Map;
            }
            type AttacheHandlerService_T = AttacheHandlerService_S & AttacheHandlerService$;
            interface AttacheHandlerService extends AttacheHandlerService_T {
            }
            interface MultiViewTemplateService_S {
                getInstance():MultiViewTemplateService;
            }
            interface MultiViewTemplateService_C extends MultiViewTemplateService_S {
                new():MultiViewTemplateService;
            }
            interface MultiViewTemplateService$ {
                /**
                 * ����form
                 *
                 * @param formShowParameter formShowParameter
                 * @param formId            formId
                 * @param targetKey         Ŀ��
                 * @param showType          ����
                 */
                commonForm(formShowParameter:$.kd.bos.form.FormShowParameter,formId:string,targetKey:string,showType:$.kd.bos.form.ShowType):void;
                /**
                 * ���õ�ҳ��
                 *
                 * @param contentAp contentAp
                 * @param apStr     apStr
                 * @param view      view
                 */
                setApToView(contentAp:$.kd.bos.metadata.form.container.FlexPanelAp,apStr:string,view:$.kd.bos.form.IFormView):void;
                /**
                 * ���ñ�ǩ���
                 *
                 * @param args     args
                 * @param formView formView
                 * @param plugin   plugin
                 * @param param
                 */
                setLabelClick(args:$.kd.bos.form.events.OnGetControlArgs,formView:$.kd.bos.mvc.form.FormView,plugin:$.kd.bos.form.plugin.AbstractFormPlugin,param:string):void;
                /**
                 * ���ñ�ǩ�¼�
                 *
                 * @param args          args
                 * @param formView      ��ͼ
                 * @param plugin        ���
                 * @param mainEntryList ����
                 */
                setLabelEvent(args:$.kd.bos.form.events.OnGetControlArgs,formView:$.kd.bos.mvc.form.FormView,plugin:$.kd.bos.form.plugin.AbstractFormPlugin,mainEntryList:$.java.util.List):void;
                /**
                 * ������
                 *
                 * @param pageType pageType
                 * @return form
                 */
                showFormType(pageType:string):$.kd.bos.form.FormShowParameter;
            }
            type MultiViewTemplateService_T = MultiViewTemplateService_S & MultiViewTemplateService$;
            interface MultiViewTemplateService extends MultiViewTemplateService_T {
            }
            interface ErManFileQfilter_S {
                /**
                 * ��֯F7��Ȩ
                 *
                 * @param entityName ��Ȩʵ��
                 * @param permEntityName ��Ȩ�ֶ�
                 * @return AuthorizedOrgResult
                 */
                getAdminOrgAuth(entityName:string,permEntityName:string):kd.hr.hbp.common.model.AuthorizedOrgResult;
                /**
                 * ҵ�����ά��ӳ��
                 *
                 * @return
                 */
                getFieldMapQFilter(entityName:string,permEntityName:string):kd.hr.hbp.common.model.DimValueResult;
                /**
                 * ����ҵ����֯F7����
                 *
                 * @return
                 */
                getOrgPermQfilter():$.kd.bos.orm.query.QFilter;
                /**
                 * ����ά�ȹ���
                 *
                 * @return
                 */
                getPermQFilter():$.kd.bos.orm.query.QFilter;
                /**
                 * �Ƿ���ҵ�񵵰���Ȩ��
                 *
                 * @return
                 */
                hasPermission():boolean;
            }
            interface ErManFileQfilter_C extends ErManFileQfilter_S {
                new():ErManFileQfilter;
            }
            interface ErManFileQfilter$ {
            }
            type ErManFileQfilter_T = ErManFileQfilter_S & ErManFileQfilter$;
            interface ErManFileQfilter extends ErManFileQfilter_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.constants{
            interface MultiViewConfigConstants_S {
                readonly ALL_ISAUDIT:string;
                readonly ALL_ISEDIT:string;
                readonly ALL_ISREQUIRED:string;
                readonly BOS_LISTF7:string;
                readonly BTN_PREVIEW:string;
                readonly BUSINESS_TYPE:string;
                readonly CATEGORY:string;
                readonly CONFIGAREA:string;
                readonly CUS_ADDNEW:string;
                readonly CUS_EDIT:string;
                readonly CUS_EXPIRE:string;
                readonly CUS_STAUTS:string;
                readonly CUS_VIEW:string;
                readonly DEFAULT_FIELD:string;
                readonly EMPLOYEE:string;
                readonly ENABLE_MULTILEVELMENU:string;
                readonly ENTITY:string;
                readonly ENTITY_FIELDNAME:string;
                readonly ERFILETYPE:string;
                readonly EXPIRATION_DATE:string;
                readonly FIELD:string;
                readonly FIELD_ISREQUIRED:string;
                readonly FIELD_MAX:string;
                readonly FIELD_MAXCOUNT:string;
                readonly FIELD_MIN:string;
                readonly FIELD_PAGEINFO:string;
                readonly FIELD_PAGEINFONUMBER:string;
                readonly FIELD_PRECISION:string;
                readonly FIELD_SCALE:string;
                readonly FIELD_TYPE:string;
                readonly FILTER_FIELDS:string;
                readonly GROUP_CONCAT_KEY:string;
                readonly GROUP_ENTITY:string;
                readonly GROUP_ID:string;
                readonly GROUP_NAME:string;
                readonly GUIDE_FLEX:string;
                readonly G_ID:string;
                readonly HEAD_ENTITY:string;
                readonly INFOGROUP_NAME:string;
                readonly IS_ALLOW_ADD:string;
                readonly IS_EDIT:string;
                readonly IS_MAINAREA:string;
                readonly IS_NOFIXEDTERM:string;
                readonly KEY_BTNOK:string;
                readonly KEY_CONFIGURABLE:string;
                readonly KEY_FIELDNAME:string;
                readonly KEY_ISTAGSHOW:string;
                readonly KEY_OP:string;
                readonly KEY_SELECTHEADFIELD:string;
                readonly KEY_SELECTINFOGROP:string;
                readonly KEY_SELECTINFOGROPFIELD:string;
                readonly KEY_SELECTINFOGROPFIELD_SIDE:string;
                readonly KEY_SELECTINFOGROP_SIDE:string;
                readonly MAINTAB:string;
                readonly MAIN_CONFIGAREA:string;
                readonly MAIN_ENTITY:string;
                readonly MAIN_FIELDNAMETEXT:string;
                readonly MAIN_ISALLOWADD:string;
                readonly MAIN_ISAUDITTEXT:string;
                readonly MAIN_ISAUDIT_ALL:string;
                readonly MAIN_ISEDITTEXT:string;
                readonly MAIN_ISEDIT_ALL:string;
                readonly MAIN_ISREQUIRED_ALL:string;
                readonly MULTI_LEVELMENU:string;
                readonly MULTI_LEVELMENUENTITY:string;
                readonly MULTI_LEVELMENUFLEX:string;
                readonly MULTI_LEVELMENU_STATUS:string;
                readonly NODE_PARENTID:string;
                readonly NOTEDITABLE_FIELDS:string;
                readonly ONE_LEVELMENU:string;
                readonly OP_KEY:string;
                readonly PAGE_HSPM_ADDSUBINFOGROUP_POP:string;
                readonly PAGE_HSPM_INFOGROUPEDIT_POP:string;
                readonly PAGE_INFOGROUPFIELD:string;
                readonly PARENT_GROUP_ID:string;
                readonly PRE_SET:string;
                readonly REF_FIELD:number;
                readonly REF_KEY:string;
                readonly RELATION:string;
                readonly REQUIRED_FIELDS:string;
                readonly ROOT_TREE:string;
                readonly SIDE_ENTITY:string;
                readonly SIDE_ISALLOWADD:string;
                readonly SIDE_ISAUDIT_ALL:string;
                readonly SIDE_ISEDIT_ALL:string;
                readonly SIDE_ISREQUIRED_ALL:string;
                readonly SIDE_TAB:string;
                readonly SUBGROUPID_PREX:string;
                readonly TABLE_NAME:string;
                readonly TABTOOL_BAR:string;
                readonly TAB_DELETE:string;
                readonly TAB_MOVEDOWN:string;
                readonly TAB_MOVEUP:string;
                readonly TAB:string;
                readonly TBMAIN:string;
                readonly TOTAL_GROUP:string;
                readonly TREEVIEW:string;
                readonly TWO_LEVELMENU:string;
                readonly VIEWLOCATION:string;
            }
            interface MultiViewConfigConstants$ {
            }
            type MultiViewConfigConstants_T = MultiViewConfigConstants_S & MultiViewConfigConstants$;
            interface MultiViewConfigConstants extends MultiViewConfigConstants_T {
            }
            interface MobileDrawConstants_S {
                readonly BRACKET_ROW_TAG:string;
                readonly CARD:string;
                readonly CARDOP_CACHE_PREFIX:string;
                readonly CARD_ADD_SUFFIX:string;
                readonly CARD_CONTENT:string;
                readonly CARD_GROW:string;
                readonly CLICK:string;
                readonly CLICK_DDIT:string;
                readonly CONTENT_FLEX:string;
                readonly CONTENT_ROW:string;
                readonly CUR_TABKEY:string;
                readonly DATA_IDS:string;
                readonly DEL_FLEX:string;
                readonly DEL_OP:string;
                readonly ENABLE_ENTERDETAIL:string;
                readonly FILTER_PARAM:string;
                readonly FIRST_DATAID:string;
                readonly GROUP_NAME:string;
                readonly HAS_ADDOPERATE:string;
                readonly HAS_DELETEOPERATE:string;
                readonly INFO_GROUP_CARD:string;
                readonly LEFTBRACKET_ROW_TAG:string;
                readonly LIMIT_PARAM:string;
                readonly MDG_SUFFIX:string;
                readonly MDV_SUFFIX:string;
                readonly MOBILEHOMEVECTOR_DATA:string;
                readonly MULTITABADDCHECK_MAP:string;
                readonly MULTI_IDS:string;
                readonly RIGHTBRACKET_ROW_TAG:string;
                readonly SELECT_INFOGROUP:string;
                readonly SELECT_INFOGROUPNUMBER:string;
                readonly TAB:string;
                readonly TITLE_ROW:string;
                readonly TITLE_ROW_FIELD:string;
                readonly TITLE_ROW_TAG:string;
                readonly VIEWDETAILOP_PREFIX:string;
            }
            interface MobileDrawConstants$ {
            }
            type MobileDrawConstants_T = MobileDrawConstants_S & MobileDrawConstants$;
            interface MobileDrawConstants extends MobileDrawConstants_T {
            }
            interface ScheduleDrawConstants_S {
                readonly ENTRY_AP_NAME:string;
                readonly FLEX_NAME:string;
                readonly FLEX_NUMBER:string;
                readonly GROUP_AP_NAME:string;
            }
            interface ScheduleDrawConstants$ {
            }
            type ScheduleDrawConstants_T = ScheduleDrawConstants_S & ScheduleDrawConstants$;
            interface ScheduleDrawConstants extends ScheduleDrawConstants_T {
            }
            interface ReportDisplayPageConstants_S {
                readonly CACHE_CHECK:string;
                readonly KEY_ENTRY_ENTITY:string;
                readonly KEY_SHOWNODEID1:string;
                readonly KEY_SYSTEMALIAS1:string;
                readonly KEY_TREEVIEW:string;
                readonly LBL_TOTAL:string;
                readonly OP_ENTRYDEL:string;
                readonly PAGE_EMP_MAIN:string;
                readonly PAGE_EMP_QUERY:string;
                readonly PAGE_QUITEMP_QUERY:string;
                readonly PERSON_NAME:string;
                readonly PERSON_NUMBER:string;
            }
            interface ReportDisplayPageConstants$ {
            }
            type ReportDisplayPageConstants_T = ReportDisplayPageConstants_S & ReportDisplayPageConstants$;
            interface ReportDisplayPageConstants extends ReportDisplayPageConstants_T {
            }
            interface InfoClassifyCommonConstant_S {
                readonly CACHE_TIME:string;
                readonly DATA_NO_CHANGED:string;
                readonly DEFAULT_IMPORT_TYPE:string;
                readonly DEFAULT_LOCK_UIS:string;
                readonly FORM_KEY:string;
                readonly HRPI_EMPPROEXP:string;
                readonly HRPI_EMPTRAINFILE:string;
                readonly HRPI_EMRGCONTACT:string;
                readonly HRPI_FAMILYMEMB:string;
                readonly HRPI_FERTILITYINFO:string;
                readonly HRPI_LANGUAGESKILLS:string;
                readonly HRPI_PERADDRESS:string;
                readonly HRPI_PERCONTACT:string;
                readonly HRPI_PERCRE:string;
                readonly HRPI_PEREDUEXP:string;
                readonly HRPI_PERHOBBY:string;
                readonly HRPI_PERNONTSPROP:string;
                readonly HRPI_PEROCPQUAL:string;
                readonly HRPI_PERPRACTQUAL:string;
                readonly HRPI_PERPROTITLE:string;
                readonly HRPI_PERRPRECORD:string;
                readonly HRPI_PREWORKEXP:string;
                readonly HRPI_RSMPATINV:string;
                readonly HRPI_RSMPROSKL:string;
                readonly HSPM_EMPPROEXP:string;
                readonly HSPM_EMPTRAINFILE:string;
                readonly HSPM_EMRGCONTACT:string;
                readonly HSPM_FAMILYMEMB:string;
                readonly HSPM_FERTILITYINFO:string;
                readonly HSPM_INFOCLASSIFYCNF:string;
                readonly HSPM_LANGUAGESKILLS:string;
                readonly HSPM_PERADDRESS:string;
                readonly HSPM_PERCONTACT:string;
                readonly HSPM_PERCRE:string;
                readonly HSPM_PEREDUEXPINFO:string;
                readonly HSPM_PERHOBBY:string;
                readonly HSPM_PEROCPQUAL:string;
                readonly HSPM_PERPRACTQUAL:string;
                readonly HSPM_PERPROTITLE:string;
                readonly HSPM_PERRPRECORD:string;
                readonly HSPM_PERSONINFO:string;
                readonly HSPM_PREWORKEXP:string;
                readonly HSPM_RSMPATINV:string;
                readonly HSPM_RSMPROSKL:string;
                readonly IMPORT_PLUGIN:string;
                readonly INFO_CACHE_KEY:string;
                readonly LIST_KEY:string;
                readonly LOG_VALIDATE:string;
                readonly QUERY_KEY:string;
                readonly SOURCE_KEY:string;
                readonly SUCCESS_CODE:string;
                readonly TAB_KEY:string;
                readonly TYPE:string;
            }
            interface InfoClassifyCommonConstant$ {
            }
            type InfoClassifyCommonConstant_T = InfoClassifyCommonConstant_S & InfoClassifyCommonConstant$;
            interface InfoClassifyCommonConstant extends InfoClassifyCommonConstant_T {
            }
            interface DynConfigConstants_S {
                readonly ACROSS_ENTITY:string;
                readonly BASE_INFOPANEL:string;
                readonly CNF_ID:string;
                readonly CONGIF_JSON:string;
                readonly CURR_PAGE:string;
                readonly DEFAULT_RULE:string;
                readonly DIALOG_MOBILE:string;
                readonly DIALOG_PAGENUMBER:string;
                readonly DIALOG_PC:string;
                readonly DIA_LOG:string;
                readonly DIS_PLAYNAME:string;
                readonly DYNFILE_HEAD:string;
                readonly DYN_GLOBALPANEL:string;
                readonly DY_VIEW:string;
                readonly DY_VIEW_MOBILE:string;
                readonly DY_VIEW_PC:string;
                readonly EDIT_UPDATE:string;
                readonly ER_FILE_ID:string;
                readonly FIELD:string;
                readonly FIELDS:string;
                readonly FIELD_ENTITY:string;
                readonly FIELD_LIST:string;
                readonly FILE:string;
                readonly FLEX_PANELRELATEINFO:string;
                readonly FLEX_PANEL_RELATEINFO:string;
                readonly FORMID:string;
                readonly GROUPS:string;
                readonly GROUP_NAME:string;
                readonly G_NAME:string;
                readonly HEAD_ENTITY:string;
                readonly HEAD_ENTRY:string;
                readonly HEAD_ENTRY_PARAM:string;
                readonly HEAD_PANELAP:string;
                readonly IS_AUDIT:string;
                readonly IS_DIA:string;
                readonly IS_EDIT:string;
                readonly IS_FIRST:string;
                readonly IS_REQUIRED:string;
                readonly ITEM_MODIFY:string;
                readonly MAIN_ENTRY:string;
                readonly MAIN_PAGEPANEL:string;
                readonly MAIN_TYPE:string;
                readonly MAPPING_FORMID:string;
                readonly MDV_VIEW:string;
                readonly ORIG_FIELD:string;
                readonly PAGE_NUMBER:string;
                readonly PAGE_TYPE:string;
                readonly PANEL_DYNPANELAP:string;
                readonly PARAMS:string;
                readonly PKID:string;
                readonly PNUMBER:string;
                readonly PRE_VIEW:string;
                readonly P_NAME:string;
                readonly REGIONS_SCOPE:string;
                readonly RIGHT_PANELAP:string;
                readonly SEQ:string;
                readonly SINGLE:string;
                readonly SOURCE:string;
                readonly TAB_ENTRY:string;
                readonly TAB_ENTRY_PARAM:string;
                readonly TARGET_KEY:string;
                readonly TYPE:string;
                readonly VIRTURAL_PREVIEW_USER:long;
            }
            interface DynConfigConstants$ {
            }
            type DynConfigConstants_T = DynConfigConstants_S & DynConfigConstants$;
            interface DynConfigConstants extends DynConfigConstants_T {
            }
            interface HSPMFieldConstants_S {
                readonly ADJUST_COM_TIME:string;
                readonly ADJUST_WORK_AGE:string;
                readonly ADJUST_WORK_TIME:string;
                readonly ADMINORG:string;
                readonly ADMINORGID:string;
                readonly ADMINORG_NAME:string;
                readonly AGE:string;
                readonly APOSITIONTYPE:string;
                readonly APOSITIONTYPEDESC:string;
                readonly AWARD_TIME:string;
                readonly BEGIN_SERVICE_DATE:string;
                readonly BIRTHDAY:string;
                readonly BUSINESSSTATUS:string;
                readonly CERT_ISSUE_DATE:string;
                readonly CHILDREN_NUMBER:string;
                readonly CMPEMP:string;
                readonly CMPEMPID:string;
                readonly COMPANY:string;
                readonly CREDENTIALSTYPE:string;
                readonly CREDENTIALSTYPEID:string;
                readonly DARKPOSITION_ID:string;
                readonly DATASTATUS:string;
                readonly DEPEMP:string;
                readonly DEPEMPID:string;
                readonly DESCRIPTION:string;
                readonly EMAIL:string;
                readonly EMPLOYEE:string;
                readonly EMPLOYEEID:string;
                readonly EMPLOYEE_MID:string;
                readonly EMP_NUMBER:string;
                readonly ENDDATE:string;
                readonly END_DATE:string;
                readonly ENTERPRISE:string;
                readonly ENTSERVICELEN:string;
                readonly EXPIRATION_DATE:string;
                readonly FILETYPE:string;
                readonly FILE_BUSINESS_STATUS:string;
                readonly FILE_END_DATE:string;
                readonly FIRST_TIME:string;
                readonly FOLK:string;
                readonly GENDER:string;
                readonly GENDERID:string;
                readonly GET_TIME:string;
                readonly GRADUTION_DATE:string;
                readonly HEADSCULPTURE:string;
                readonly HR_BU:string;
                readonly ISCURRENTVERSION:string;
                readonly ISMANAGED:string;
                readonly ISPRIMARY:string;
                readonly ISSUE_DATE:string;
                readonly IS_IDENTITY:string;
                readonly IS_MAJOR:string;
                readonly IS_UNTIL_NOW:string;
                readonly JOB:string;
                readonly JOBGRADE:string;
                readonly JOBGRADE_SCM:string;
                readonly JOBLEVEL:string;
                readonly JOBLEVEL_SCM:string;
                readonly JOB_CLASS:string;
                readonly JOB_FAMILY:string;
                readonly JOB_SCM:string;
                readonly JOB_SEQ:string;
                readonly JOIN_PARTY_DATE:string;
                readonly JOIN_WORK_TIME:string;
                readonly LABORREL_STATUS:string;
                readonly LABORREL_STATUS_ID:string;
                readonly LABORREL_TYPE:string;
                readonly LABORREL_TYPECLS:string;
                readonly LABORREL_TYPECLS_ID:string;
                readonly LABORREL_TYPECLS_NUMBER:string;
                readonly LABORREL_TYPE_ID:string;
                readonly LABREL_STATUSCLS:string;
                readonly LABREL_STATUSCLS_ID:string;
                readonly LABREL_STATUSCLS_NUMBER:string;
                readonly LABREL_STATUSPRD:string;
                readonly LABREL_STATUSPRD_ID:string;
                readonly LABREL_STATUSPRD_NUMBER:string;
                readonly LASTWORKDATE:string;
                readonly LOCATION:string;
                readonly MAINPEOINCHARGE:string;
                readonly MANAGINGSCOPE:string;
                readonly MARRIAGE_REGIST_DATE:string;
                readonly MID:string;
                readonly NATIONALITY:string;
                readonly ORG:string;
                readonly PEREMAIL:string;
                readonly PERSON:string;
                readonly PERSONID:string;
                readonly PERSONINDEXID:string;
                readonly PERSON_ID:string;
                readonly PERSON_PERSONINDEXID:string;
                readonly PER_EDUEXP:string;
                readonly PHONE:string;
                readonly POSITION:string;
                readonly POSITIONID:string;
                readonly POSITIONNAME:string;
                readonly POSSTATUS:string;
                readonly POSTYPE:string;
                readonly POSTYPEID:string;
                readonly REGISTRATE_DATE:string;
                readonly ROLE:string;
                readonly SECOND_TIME:string;
                readonly SERVICELEN:string;
                readonly SERVICELENGTH:string;
                readonly SERVICE_LEN:string;
                readonly SOCIAL_WORKAGE:string;
                readonly STARTDATE:string;
                readonly START_DATE:string;
                readonly STDPOSITION:string;
                readonly SYSENDDATE:string;
                readonly SYS_END_DATE:string;
                readonly VARIATIONTYPE:string;
                readonly WORK_YEAR:string;
            }
            interface HSPMFieldConstants$ {
            }
            type HSPMFieldConstants_T = HSPMFieldConstants_S & HSPMFieldConstants$;
            interface HSPMFieldConstants extends HSPMFieldConstants_T {
            }
            interface ImportTypeConstant_S {
                readonly IMPORTTYPE:string;
                readonly NEW:string;
                readonly NEW_RADIOFIELD:string;
                readonly ONLY_NEW:$.java.util.List;
                readonly ONLY_OVERRIDE:$.java.util.List;
                readonly ONLY_OVERRIDENEW:$.java.util.List;
                readonly OVERRIDE:string;
                readonly OVERRIDENEW:string;
                readonly OVERRIDENEW_RADIOFIELD:string;
                readonly OVERRIDE_RADIOFIELD:string;
            }
            interface ImportTypeConstant$ {
            }
            type ImportTypeConstant_T = ImportTypeConstant_S & ImportTypeConstant$;
            interface ImportTypeConstant extends ImportTypeConstant_T {
            }
            interface MyErManFileConstants_S {
                readonly ERFILE_ID:string;
                readonly HSSC_APPKEY:string;
            }
            interface MyErManFileConstants$ {
            }
            type MyErManFileConstants_T = MyErManFileConstants_S & MyErManFileConstants$;
            interface MyErManFileConstants extends MyErManFileConstants_T {
            }
            interface AttachConstants_S {
                readonly ATTACH:string;
                readonly ATTACH_NAME:string;
                readonly BACKCOLOR:string;
                readonly BIG_LEFT_SUBPANELAP:string;
                readonly BIZAPP:string;
                readonly BOT_MAIN_PANELAP:string;
                readonly BO_ID:string;
                readonly BUSINESSSTATUS:string;
                readonly BUT_LAB:string;
                readonly BU_NUMBER:string;
                readonly CACHE_IGN_FEILD:string;
                readonly CACHE_IGN_SET:string;
                readonly CARD:string;
                readonly CARD_ENWIDTH:string;
                readonly CARD_WIDTH:string;
                readonly CEN_MAIN_PANELAP:string;
                readonly CHANGE:string;
                readonly CHECK_PK_ID:string;
                readonly CHILDSUB_CONTENT_PANELAP:string;
                readonly CHILD_CONTENT_PANELAP:string;
                readonly CLICK_SAVE:string;
                readonly CODE:string;
                readonly CONTENT:string;
                readonly CONTENT_BIG:string;
                readonly CONTENT_BIGONEAP:string;
                readonly CONTENT_MARGIN:string;
                readonly COUNT_TIMEIN_BUT:string;
                readonly CUS_HEAD:string;
                readonly CUS_LEFT_HEAD:string;
                readonly CUS_RIGHT_HEAD:string;
                readonly CUT:string;
                readonly DATA:string;
                readonly DATASTATUS:string;
                readonly DEFALUR_BU:string;
                readonly DEL:string;
                readonly DELETE_INFO:string;
                readonly DEL_ATTACH:string;
                readonly DEL_ATTACH_FORM:string;
                readonly DETAIL_PANELAP:string;
                readonly DISCARD_BATCH:string;
                readonly DO_ABANDON:string;
                readonly DO_ADD:string;
                readonly DO_DEL:string;
                readonly DO_EDIT:string;
                readonly DO_EXPIRE:string;
                readonly DO_SPLIT:string;
                readonly DO_VIEW_CONTRACT:string;
                readonly DY_FIELD:string;
                readonly EDIT:string;
                readonly EMPNEW_RECORD:string;
                readonly EMPNEW_RECORD_HIND:string;
                readonly EMPTY_DEL:string;
                readonly EMPTY_EDIT:string;
                readonly EMPTY_EXPIRE:string;
                readonly ENDDATE:string;
                readonly ENTRY_ENTITY:string;
                readonly ERROR_MSG:string;
                readonly EXECUTE_ACTION_PERSONAL_CHANGE:string;
                readonly EXPIRE:string;
                readonly FIX_ID:string;
                readonly FIX_TIME_ID:string;
                readonly FORCOLOR:string;
                readonly FORM_ID_SET:string;
                readonly GET_ACTION_PERSONAL_CHANGE:string;
                readonly HEADDY_PANELAP:string;
                readonly HEAD_BUT:string;
                readonly HEAD_LEFT_PANELAP:string;
                readonly HEAD_PANELAP:string;
                readonly HEAD_RIGHT_PANELAP:string;
                readonly HIDE_EIDT:string;
                readonly HPFS_SERVICE:string;
                readonly HRPI_GENERIC_SERVICE:string;
                readonly HRPI_SERVICE:string;
                readonly HSPM_EMPSUPREL_DG:string;
                readonly HSPM_PERCRE_DV:string;
                readonly IDCARD_VIEW:string;
                readonly IMAGE:string;
                readonly IMAGE_TYPE_BACK:string;
                readonly IMAGE_TYPE_FACE:string;
                readonly INIT:string;
                readonly INPUT_PARAMS:string;
                readonly ISCURRENT_VERSION:string;
                readonly ISEXISTPROBATION:string;
                readonly ISLATESTRECORD:string;
                readonly ISPRIMARY:string;
                readonly ISPRIMARYSCOPE:string;
                readonly ITEM_DELETE:string;
                readonly ITEM_EXPIRE:string;
                readonly ITEM_MODIFY:string;
                readonly ITEM_VIEW_CONTRACT:string;
                readonly KD_EDC_BA:string;
                readonly LABORREL_TYPE:string;
                readonly LABORRE_LSTATUS:string;
                readonly LETTER_PIC:string;
                readonly LETTER_PIC_AP:string;
                readonly MAP_NEW_VERSION:string;
                readonly MARGIN_TOP:string;
                readonly MESSAGE:string;
                readonly NAME_FIELD:string;
                readonly NEST:string;
                readonly NEW_FORM_VERSION:string;
                readonly NEW_SPECIAL_CARD:string;
                readonly NEW_SUPERIOR:string;
                readonly NEW_SUPERIOR_1010:string;
                readonly NEW_VERSION:string;
                readonly PATH:string;
                readonly PER_ATTACH:string;
                readonly PER_FIELD:string;
                readonly PER_HALF:string;
                readonly PER_ROOT:string;
                readonly PER_THE:string;
                readonly PER_TWO:string;
                readonly PER_TYPE:string;
                readonly PKID_SET:string;
                readonly PLEAN_WIDTH:string;
                readonly POSTYPE:string;
                readonly POSTYPT_ALL:string;
                readonly POSTYPT_OUT:string;
                readonly POSTYPT_PART:string;
                readonly P_NUMBER:string;
                readonly RECORD_FILTER:string;
                readonly REMOVE_TEMP_ATTACHMENTS:string;
                readonly REPORT_TYPE:string;
                readonly RESET_AP:string;
                readonly RESPONSE_CODE:string;
                readonly RESULT:string;
                readonly REVISE_VERSION_BATCH:string;
                readonly SAVEOR_UPDATEINFO:string;
                readonly SAVE_BATCH:string;
                readonly SAVE_TEMP_ATTACHMENTS:string;
                readonly SCENE_NUMBER:string;
                readonly SCOPE_NON_PRIMARY:long;
                readonly SCOPE_PRIMARY:long;
                readonly SCPNEW_RECORD:string;
                readonly SHAME:string;
                readonly SHOW_CARD_ADD:string;
                readonly SHOW_CARD_CHG:string;
                readonly SHOW_FORM_LOSE:string;
                readonly SIGN:string;
                readonly SIGN_CHAR:string;
                readonly SOLID:string;
                readonly SPACE:string;
                readonly SPECIAL_ATTMENT:string;
                readonly SPECIAL_CARD:string;
                readonly START_DATE:string;
                readonly STR_TWO:string;
                readonly SUCCESS:string;
                readonly SUPERIOR:string;
                readonly SUPERIOR_1010:string;
                readonly SUPERIOR_IMAGE:string;
                readonly SUPERIOR_SUFFIX:string;
                readonly SYS_ENDDATE:string;
                readonly TIME_BUT:string;
                readonly TIME_FLEX:string;
                readonly TIME_FLEX_BUT:string;
                readonly TIME_OUT_BUT:string;
                readonly TOPONE_MAIN_PANELAP:string;
                readonly TOPOP_PANELAP:string;
                readonly TOPTWO_MAIN_PANELAP:string;
                readonly TOP_MAIN_PANELAP:string;
                readonly TYPE_ALL:string;
                readonly TYPE_ATTACH:string;
                readonly TYPE_CONTENT:string;
                readonly TYPE_HEAD:string;
                readonly TYPE_NUMBER:string;
                readonly TYPE_OP:string;
                readonly TYPE_SPICE:string;
                readonly TYPE_TEXT:string;
                readonly TYPE_TIME:string;
                readonly TYPE_TOP:string;
                readonly URL:string;
                readonly VIEW_CONTRACT:string;
                readonly VIEW_MAP_CONTRACT:string;
                readonly VIEW_SHOW_DIALOG:string;
            }
            interface AttachConstants$ {
            }
            type AttachConstants_T = AttachConstants_S & AttachConstants$;
            interface AttachConstants extends AttachConstants_T {
            }
            interface ApprovalConstants_S {
                readonly AUDIT_RECORD:string;
                readonly CHANGE:string;
                readonly CHANGE_RECORD:string;
                readonly DATA_ID:string;
                readonly EDUEXP_NAME:string;
                readonly ENTITY_NAME:string;
                readonly EXTRA_INFO:string;
                readonly FIELD_NAME:string;
                readonly FIELD_TYPE:string;
                readonly FIRST_GROUP:string;
                readonly FIRST_GROUPNUM:string;
                readonly GROUPFIELD_CACHE_ENDS:string;
                readonly GROUP_CONCAT_KEY:string;
                readonly G_ATTACHMENT:string;
                readonly G_TEXT:string;
                readonly HEAD_NUM:string;
                readonly INFOGROUP_SHOW:string;
                readonly IS_DEL:string;
                readonly IS_MYINFOAPPROVAL:string;
                readonly IS_NEW:string;
                readonly IS_NEW_MODIFY:string;
                readonly NEW_VALUE:string;
                readonly OLD_VALUE:string;
                readonly REASON:string;
                readonly RESULT:string;
                readonly SECONDGROUP:string;
                readonly STATUS:string;
                readonly SUBMIT_VERSON:string;
            }
            interface ApprovalConstants$ {
            }
            type ApprovalConstants_T = ApprovalConstants_S & ApprovalConstants$;
            interface ApprovalConstants extends ApprovalConstants_T {
            }
            interface HspmCommonConstants_S {
                readonly ADD_SUPERIOR:string;
                readonly ADJUST_LENGTH:string;
                readonly AFTER:string;
                readonly AMOUNT_PROP:string;
                readonly APP_BUSINESS:string;
                readonly APP_COMMON:string;
                readonly APP_FORMPLUGIN:string;
                readonly APP_ID:string;
                readonly APP_KEY:string;
                readonly APP_OPPLUGIN:string;
                readonly APP_SDK_HR:string;
                readonly ATTACHMENT_PANEL_AP:string;
                readonly ATTACHMENT_PROP:string;
                readonly ATTACH_PARAMS:string;
                readonly ATTACH_VISIBLE_PARAMS:string;
                readonly AUDIT_RECORD_LBL:string;
                readonly AUDIT_RECORD_VEC:string;
                readonly AUTHCERTNUMBER:string;
                readonly BD_CURRENCY:string;
                readonly BEFORE:string;
                readonly BILLSTATUS_WAIT_RESUBMIT:string;
                readonly BILL_STATUS:string;
                readonly BLANK:string;
                readonly BO_ID:string;
                readonly BUSINESSSTATUS_EFFECT:string;
                readonly BUSINESSSTATUS_LOSE:string;
                readonly BUSINESS_STATUS:string;
                readonly BUTTON_ADD:string;
                readonly CERT_TYPE:string;
                readonly CHANGE_RECORD_LBL:string;
                readonly CHANGE_RECORD_VEC:string;
                readonly CHG_EMP_JOB:string;
                readonly CHG_MODE_DEL:string;
                readonly CHG_MODE_NO:string;
                readonly CLOSEPANEL:string;
                readonly CMPEMP:string;
                readonly CMPEMP_ID:string;
                readonly COLLEGE_COUNTRY:string;
                readonly CONFIRM:string;
                readonly CONTACTADDR:string;
                readonly CONTAIN_HRPI:string;
                readonly CONTAIN_HSPM:string;
                readonly COUNTRY:string;
                readonly CREDENTIALS_TYPE:string;
                readonly CURRENCY_VALUE:string;
                readonly DATA_ID:string;
                readonly DEFAULT_EMPTY:string;
                readonly DEFAULT_IMG:string;
                readonly DEFAULT_PREFIX:string;
                readonly DEFAULT_SORT:number;
                readonly DEGREE_CERT:string;
                readonly DEGREE_CERT_ID:long;
                readonly DEGREE_CERT_NUMBER:string;
                readonly DEGREE_CERT_OCR_TEMP_NUMBER:string;
                readonly DEGREE_RECORD_CERT:string;
                readonly DEGREE_RECORD_CERT_ID:long;
                readonly DEGREE_RECORD_CERT_NUMBER:string;
                readonly DEGREE_RECORD_CERT_OCR_TEMP_NUMBER:string;
                readonly DEGREE_REG_CERT:string;
                readonly DEGREE_REG_CERT_ID:long;
                readonly DEGREE_REG_CERT_NUMBER:string;
                readonly DEGREE_REG_CERT_OCR_TEMP_NUMBER:string;
                readonly DEL_SUPERIOR:string;
                readonly DEPEMP:string;
                readonly DEPEMP_ID:string;
                readonly DESCRIPTION:string;
                readonly EMPENTREL:string;
                readonly EMPLOYEE:string;
                readonly EMPLOYEE_ID:string;
                readonly EMPTY:string;
                readonly ENTITY_NAME:string;
                readonly ENTRY_CACHE:string;
                readonly ENTRY_ICON:string;
                readonly ENTRY_NAME:string;
                readonly ERFILEID:string;
                readonly ERMANFILE_MOBILE_SCENE:string;
                readonly ERMANFILE_PC_SCENE:string;
                readonly EXPIRE_SUPERIOR:string;
                readonly EXP_PARAMS:string;
                readonly FACE_IMAGE:string;
                readonly FAMILYMEMBSHIP:string;
                readonly FIELD_EMPPOSREL:string;
                readonly FIELD_NAME:string;
                readonly FIELD_TYPE:string;
                readonly FIRST_GROUPNUM:string;
                readonly FOREIGN_DEGREE_RECORD_CERT:string;
                readonly FOREIGN_DEGREE_RECORD_CERT_ID:long;
                readonly FOREIGN_DEGREE_RECORD_CERT_NUMBER:string;
                readonly FOREIGN_DEGREE_RECORD_CERT_OCR_TEMP_NUMBER:string;
                readonly FULL_PIN_YIN:string;
                readonly GET_PLAINTEXT:string;
                readonly GRADUATE_CERT:string;
                readonly GRADUATE_CERT_ID:long;
                readonly GRADUATE_CERT_NUMBER:string;
                readonly GRADUATE_CERT_OCR_TEMP_NUMBER:string;
                readonly GRADUATE_SCHOOL:string;
                readonly GROUP_NUMBER:string;
                readonly HAS_ATTACH_CHANGE:string;
                readonly HAS_FIELD_CHANGE:string;
                readonly HBPM_POSITIONHR:string;
                readonly HBSS_COLLEGE:string;
                readonly HBSS_DEGREE:string;
                readonly HBSS_DIPLOMA:string;
                readonly HBSS_LABORRELSTATUS:string;
                readonly HBSS_LABORRELTYPE:string;
                readonly HBSS_POSTYPE:string;
                readonly HEADS_CULPTURE:string;
                readonly HEAD_TIPS_PANEL:string;
                readonly HOBBY:string;
                readonly HPFS:string;
                readonly HR:string;
                readonly HRCS_KEY:string;
                readonly HRPI:string;
                readonly HRPI_ATTACHREVISECON:string;
                readonly HRPI_BASELOCATION:string;
                readonly HRPI_CMPEMP:string;
                readonly HRPI_CONTRWORKLOC:string;
                readonly HRPI_DEPEMP:string;
                readonly HRPI_EMPEJOBREL:string;
                readonly HRPI_EMPENTREL:string;
                readonly HRPI_EMPLOYEE:string;
                readonly HRPI_EMPNONENTREL:string;
                readonly HRPI_EMPORGRELALL:string;
                readonly HRPI_EMPPOSORGREL:string;
                readonly HRPI_EMPPROEXP:string;
                readonly HRPI_EMPSUPREL:string;
                readonly HRPI_EMPTRAINFILE:string;
                readonly HRPI_EMPTUTOR:string;
                readonly HRPI_EMRGCONTACT:string;
                readonly HRPI_ERMANFILE:string;
                readonly HRPI_FAMILYMEMB:string;
                readonly HRPI_FERTILITYINFO:string;
                readonly HRPI_LABORRELRECORD:string;
                readonly HRPI_LANGUAGESKILLS:string;
                readonly HRPI_MANAGINGSCOPE:string;
                readonly HRPI_PERADDRESS:string;
                readonly HRPI_PERCONTACT:string;
                readonly HRPI_PERCONTACT_DV:string;
                readonly HRPI_PERCRE:string;
                readonly HRPI_PEREDUEXPCERT:string;
                readonly HRPI_PERHOBBY:string;
                readonly HRPI_PERNONTSPROP:string;
                readonly HRPI_PEROCPQUAL:string;
                readonly HRPI_PERPRACTQUAL:string;
                readonly HRPI_PERPROTITLE:string;
                readonly HRPI_PERREGION:string;
                readonly HRPI_PERRPRECORD:string;
                readonly HRPI_PERSERLEN:string;
                readonly HRPI_PERSON:string;
                readonly HRPI_PERSONENTITYCONF:string;
                readonly HRPI_PERSONF7QUERY:string;
                readonly HRPI_PERSONROLEREL:string;
                readonly HRPI_PERTSPROP:string;
                readonly HRPI_PREWORKEXP:string;
                readonly HRPI_RSMPATINV:string;
                readonly HRPI_RSMPROSKL:string;
                readonly HRPI_TRIALPERIOD:string;
                readonly HRPI_TRIALPERIODRST:string;
                readonly HRPI_WORKCALENREL:string;
                readonly HR_COULD_ID:string;
                readonly HR_HSPM_FORMPLUGIN:string;
                readonly HSPM_APPROVALHEAD:string;
                readonly HSPM_APPROVALSUCCESS:string;
                readonly HSPM_APPROVAL_ATTACHMENT:string;
                readonly HSPM_ATTACHMENTAPPROVAL:string;
                readonly HSPM_BASICINFO:string;
                readonly HSPM_CHANGERECORD:string;
                readonly HSPM_DYNFILEHEAD:string;
                readonly HSPM_DYNFILEPAGE:string;
                readonly HSPM_EMPJOBREL_DG:string;
                readonly HSPM_EMPSUPREL_DV:string;
                readonly HSPM_ERFILEQUERYMULTIVIEW:string;
                readonly HSPM_ERMANFILE:string;
                readonly HSPM_ERMANFILE_OPENDEFAULTORDER:string;
                readonly HSPM_GROUPFIELDAPPROVAL:string;
                readonly HSPM_INFOAPPROVAL:string;
                readonly HSPM_INFOGROUP_FIELD:string;
                readonly HSPM_INFOGROUP_PAGEREG:string;
                readonly HSPM_MOBERHOME:string;
                readonly HSPM_MULTIVIEW_CONFIG:string;
                readonly HSPM_MULTIVIEW_CONFIG_EMP:string;
                readonly HSPM_MYERMANFILE:string;
                readonly HSPM_PERCRE:string;
                readonly HSPM_PEREDUEXP:string;
                readonly HSPM_PEREDUEXP_MDG:string;
                readonly HSPM_RELATEDCONFIG:string;
                readonly HSS_BUSINESSOFFICE:string;
                readonly ID_AND_INDEX_MAP_STR:string;
                readonly IHRPI_WORKROLE_SERVICE:string;
                readonly INITBATCH:string;
                readonly INITSTATUS:string;
                readonly INITSTATUS_FINISH:string;
                readonly INTEREST:string;
                readonly INT_FIVE:number;
                readonly ISAUTHENTICATED:string;
                readonly ISNOFIXEDTERM_AUDIT:string;
                readonly IS_AUDIT:string;
                readonly IS_CURRENTVERSION:string;
                readonly IS_FROM_INIT_OPEN:string;
                readonly IS_FULLTIME:string;
                readonly IS_HIGHEST_DEGREE:string;
                readonly IS_MAINWORK:string;
                readonly IS_NEW:string;
                readonly IS_NO_FIXED_TERM:string;
                readonly IS_OVERSEAS:string;
                readonly IS_PREVIEW:string;
                readonly JOB_ACTION_ID:long;
                readonly KEY_FBASEDATAID:string;
                readonly LABELAP_AUDIT:string;
                readonly LABELAP_AUDIT_VIEW:string;
                readonly LABEL_AP:string;
                readonly LANGUAGE:string;
                readonly LANGUAGECERT:string;
                readonly LANGUAGESKILLS_LANGUAGE:string;
                readonly LETTER:string;
                readonly MOBILEPHONE:string;
                readonly MTOOLBARAP:string;
                readonly NEW_VALUE:string;
                readonly NO:string;
                readonly NOTPASSINFO:string;
                readonly NOTPASSPANEL:string;
                readonly NOT_PASS_VECTOR:string;
                readonly NUMBER:string;
                readonly NUMBER_1010_ID:long;
                readonly NUMBER_1010_S:string;
                readonly NUMBER_1020_ID:long;
                readonly NUMBER_1020_S:string;
                readonly NUMBER_1030_ID:long;
                readonly NUMBER_1030_S:string;
                readonly NUMBER_1040_ID:long;
                readonly NUMBER_1040_S:string;
                readonly NUMBER_1050_ID:long;
                readonly NUMBER_1050_S:string;
                readonly NUMBER_1060_ID:long;
                readonly NUMBER_1060_S:string;
                readonly NUMBER_1070_ID:long;
                readonly NUMBER_1070_S:string;
                readonly NUMBER_1080_ID:long;
                readonly NUMBER_1080_S:string;
                readonly NUMBER_1090_ID:long;
                readonly NUMBER_1090_S:string;
                readonly NUMBER_1100_ID:long;
                readonly NUMBER_1100_S:string;
                readonly NUMBER_1110_ID:long;
                readonly NUMBER_1110_S:string;
                readonly NUMBER_1120_ID:long;
                readonly NUMBER_1120_S:string;
                readonly NUMBER_1130_ID:long;
                readonly NUMBER_1130_S:string;
                readonly NUMBER_1140_ID:long;
                readonly NUMBER_1140_S:string;
                readonly NUMBER_1150_ID:long;
                readonly NUMBER_1150_S:string;
                readonly NUMBER_1190_S:string;
                readonly OLD_DB_DATA:string;
                readonly OLD_HEAD_PIC:string;
                readonly OLD_VALUE:string;
                readonly OPENMOREPANEL:string;
                readonly OP_SAVE:string;
                readonly OTHERLANGUAGECERT:string;
                readonly OTHER_CERT_NUMBER:string;
                readonly OTHER_LANGUAGECERT_ID:long;
                readonly OTHER_SCHOOL_BOID:long;
                readonly PAGETYPE_CARDVIEW:string;
                readonly PAGETYPE_DATABASE:string;
                readonly PAGETYPE_DYBASE:string;
                readonly PAGETYPE_LIST:string;
                readonly PAGE_DISPLAY_CONFIG:string;
                readonly PAGE_DISPLAY_PLAN:string;
                readonly PAGE_DISPLAY_PLAN_CONFIG:string;
                readonly PAGE_EMP_REPORT:string;
                readonly PAGE_HBSS_EDUCERTTYPE:string;
                readonly PAGE_HBSS_LANGUAGECERT:string;
                readonly PAGE_HRPI_PEREDUEXP:string;
                readonly PAGE_HRPI_PEREDUEXPCERT:string;
                readonly PAGE_HSPM_PEREDUEXP_DG:string;
                readonly PAGE_PEREDUEXP_MDG:string;
                readonly PAGE_PEREDUEXP_PDG:string;
                readonly PAGE_QUITEMP_REPORT:string;
                readonly PAGE_QUITREPORT_QUERY:string;
                readonly PAGE_REPORT_PLAN:string;
                readonly PAGE_REPORT_QUERY:string;
                readonly PAGE_TRANSACTION_PLAN:string;
                readonly PAGE_TRANSACTION_REPORT:string;
                readonly PDG:string;
                readonly PDV:string;
                readonly PEREDUEXP:string;
                readonly PERSON:string;
                readonly PERSON_HPFSTOHRMP_ACTION_ID:long;
                readonly PERSON_HPFS_ACTION_ID:long;
                readonly PERSON_ID:string;
                readonly PERSON_ID_REL:string;
                readonly PERSON_MSGPUBNO:string;
                readonly PICTURE_FIELD:string;
                readonly PICTURE_PROP:string;
                readonly POSTYPE:string;
                readonly PREGETTIME:string;
                readonly PRE_MAJOR_ID:string;
                readonly QUERY_FIELDS:string;
                readonly REASON:string;
                readonly REJECTRECORD:string;
                readonly SCHOOL_RECORD:string;
                readonly SCHOOL_RECORD_ID:long;
                readonly SCHOOL_RECORD_NUMBER:string;
                readonly SERVICE_AGE_SCHEME:string;
                readonly SHOW_LIST:string;
                readonly SORT:string;
                readonly SOURCE_VID:string;
                readonly STR_FIVE:string;
                readonly STR_FOUR:string;
                readonly STR_IN_EFFECTIVE:string;
                readonly STR_MINUS_ONE:string;
                readonly STR_NTHREE:string;
                readonly SUCCESS:string;
                readonly SWITCHTOHOME:string;
                readonly TEXT_PROP:string;
                readonly TUTOR:string;
                readonly TUTOR_ID:string;
                readonly UNABLE_DELETE:string;
                readonly UPDATE_SUPERIOR:string;
                readonly VARIATION_TYPE:string;
                readonly VARIATION_TYPE_101240:long;
                readonly WITHDRAW:string;
                readonly WORKUNIT:string;
                readonly YES:string;
                readonly YMD:string;
                readonly YMD_HMS:string;
                readonly label:string;
            }
            interface HspmCommonConstants$ {
            }
            type HspmCommonConstants_T = HspmCommonConstants_S & HspmCommonConstants$;
            interface HspmCommonConstants extends HspmCommonConstants_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.dto{
            interface ChangeDto_S {
            }
            interface ChangeDto_C extends ChangeDto_S {
                new():ChangeDto;
                new(fieldName:string,fieldType:kd.sdk.hr.hspm.common.enums.FieldTypeEnum):ChangeDto;
                new(fieldName:string,fieldType:kd.sdk.hr.hspm.common.enums.FieldTypeEnum,fieldKey:string):ChangeDto;
            }
            interface ChangeDto$ {
                getAfterValue():string;
                getBeforeValue():string;
                getFieldKey():string;
                getFieldName():string;
                getFieldType():kd.sdk.hr.hspm.common.enums.FieldTypeEnum;
                setAfterValue(afterValue:string):void;
                setBeforeValue(beforeValue:string):void;
                setFieldKey(fieldKey:string):void;
                setFieldName(fieldName:string):void;
                setFieldType(fieldType:kd.sdk.hr.hspm.common.enums.FieldTypeEnum):void;
            }
            type ChangeDto_T = ChangeDto_S & ChangeDto$;
            interface ChangeDto extends ChangeDto_T {
            }
            interface HpfsChgexternalrecordQueueDto_S {
                /**
                 * ����ӿڴ��ζ���
                 *
                 * @param personId    ��Ȼ��ID
                 * @param ermanFileDy ����ҵ�񵵰���̬����
                 * @return ��Աģ�Ͷ���
                 */
                build(personId:long,ermanFileDy:$.kd.bos.dataentity.entity.DynamicObject):HpfsChgexternalrecordQueueDto;
                /**
                 * ʱ���� ����:
                 * "idBefore": 0,
                 * "vidBefore": 0,
                 * "idAfter": �����ӿڷ���ID=fboid,
                 * "vidAfter": �����ӿڷ��ص���ʷID,
                 *
                 * @param idAfter  �����ӿڷ���ID=fboid
                 * @param vidAfter �����ӿڷ��ص���ʷID
                 * @return �����е�datarow�е�����
                 */
                buildDataRowEntityForHisLineInsert(idAfter:long,vidAfter:long):HpfsChgexternalrecordQueueDto$DataRowEntity;
                /**
                 * ʱ���� ����:
                 * "idBefore": ��ǰ��¼����ǰ��fboid,
                 * "vidBefore": ��ǰ��¼����ǰ��fsourcevid,
                 * "idAfter": �����ӿڷ���ID=fboid,
                 * "vidAfter": �����ӿڷ��ص���ʷID,
                 *
                 * @param idBefore  ��ǰ��¼����ǰ��fboid
                 * @param vidBefore  ��ǰ��¼����ǰ��fsourcevid
                 * @param idAfter  �����ӿڷ���ID=fboid
                 * @param vidAfter �����ӿڷ��ص���ʷID
                 * @return �����е�datarow�е�����
                 */
                buildDataRowEntityForHisLineUpdate(idBefore:long,vidBefore:long,idAfter:long,vidAfter:long):HpfsChgexternalrecordQueueDto$DataRowEntity;
                /**
                 * ��ʱ�� ɾ��:
                 * "idBefore": fboid,
                 * "vidBefore": ��ǰ��¼ɾ��ǰ��fsourcevid,
                 * "idAfter": 0,
                 * "vidAfter":0,
                 *
                 * @param idBefore  ��ǰ��¼����ǰ��fboid
                 * @param vidBefore ��ǰ��¼����ǰ��fsourcevid
                 * @return �����е�datarow�е�����
                 */
                buildDataRowEntityForHisNonLineDelete(idBefore:long,vidBefore:long):HpfsChgexternalrecordQueueDto$DataRowEntity;
                /**
                 * ��ʱ�� ����:
                 * "idBefore":0,
                 * "vidBefore":0,
                 * "idAfter":�����ӿڷ���ID=fboid,
                 * "vidAfter":0,
                 *
                 * @param idAfter �����ӿڷ���ID
                 * @return �����е�datarow�е�����
                 */
                buildDataRowEntityForHisNonLineInsert(idAfter:long):HpfsChgexternalrecordQueueDto$DataRowEntity;
                /**
                 * ��ʱ�� ����:
                 * "idBefore": fboid,
                 * "vidBefore": ��ǰ��¼����ǰ��fsourcevid,
                 * "idAfter": fboid,
                 * "vidAfter":0,
                 *
                 * @param idBefore  ��ǰ��¼����ǰ��fboid
                 * @param vidBefore ��ǰ��¼����ǰ��fsourcevid
                 * @param idAfter   fboid
                 * @return �����е�datarow�е�����
                 */
                buildDataRowEntityForHisNonLineUpdate(idBefore:long,vidBefore:long,idAfter:long):HpfsChgexternalrecordQueueDto$DataRowEntity;
            }
            type HpfsChgexternalrecordQueueDto_ST = $.java.io.Serializable & HpfsChgexternalrecordQueueDto_S;
            interface HpfsChgexternalrecordQueueDto_C extends HpfsChgexternalrecordQueueDto_ST {
                new():HpfsChgexternalrecordQueueDto;
            }
            interface HpfsChgexternalrecordQueueDto$ {
                /**
                 * ��ӱ���������
                 *
                 * @param entityNumber ʵ�����
                 * @param consumer ���������ṩ��
                 * @return HpfsChgexternalrecordQueueDto
                 */
                addDataRow(entityNumber:string,consumer1:(t:any)=>void):this;
                getDataRow():$.java.util.List;
                /**
                 * ת��Ϊ������JSON
                 *
                 * @return json�ַ���
                 */
                request():string;
                setBillNo(billNo:string):this;
                setBillSource(billSource:string):this;
                setBsed(bsed:long):this;
                setResultCallBackQueue(resultCallBackQueue:string):this;
            }
            type HpfsChgexternalrecordQueueDto_T = $.java.io.Serializable & HpfsChgexternalrecordQueueDto_S & HpfsChgexternalrecordQueueDto$;
            interface HpfsChgexternalrecordQueueDto extends HpfsChgexternalrecordQueueDto_T {
            }
            interface PereduexpcertDynDto_S {
            }
            interface PereduexpcertDynDto_C extends PereduexpcertDynDto_S {
                new(certtype:long,name:string,certFieldList:$.java.util.List):PereduexpcertDynDto;
            }
            interface PereduexpcertDynDto$ {
                getCertFieldList():$.java.util.List;
                getCerttype():long;
                getName():string;
                setCertFieldList(certFieldList:$.java.util.List):void;
            }
            type PereduexpcertDynDto_T = PereduexpcertDynDto_S & PereduexpcertDynDto$;
            interface PereduexpcertDynDto extends PereduexpcertDynDto_T {
            }
            interface PersonModelDto_S {
                /**
                 * ������Աģ�Ͷ���
                 *
                 * @param personId   ��Ȼ��ID
                 * @param ermanFileDy ����ҵ�񵵰���̬����
                 * @return ��Աģ�Ͷ���
                 */
                build(personId:long,ermanFileDy:$.kd.bos.dataentity.entity.DynamicObject):PersonModelDto;
            }
            interface PersonModelDto_C extends PersonModelDto_S {
                new(personId:long):PersonModelDto;
            }
            interface PersonModelDto$ {
                getCmpEmpId():long;
                getDepEmpId():long;
                getEmployeeId():long;
                getPersonId():long;
            }
            type PersonModelDto_T = PersonModelDto_S & PersonModelDto$;
            interface PersonModelDto extends PersonModelDto_T {
            }
            interface DrawFormFieldDto_S {
            }
            type DrawFormFieldDto_ST = $.java.lang.Cloneable & DrawFormFieldDto_S;
            interface DrawFormFieldDto_C extends DrawFormFieldDto_ST {
                new():DrawFormFieldDto;
            }
            interface DrawFormFieldDto$ {
                clone():this;
                getAlias():string;
                getBaseEntityId():string;
                getClassSimpleName():string;
                getComboItemList():$.java.util.List;
                getDisplayStyle():number;
                getField():string;
                getHeight():string;
                getLock():string;
                getMaxCount():number;
                getMaxSize():string;
                getMinSize():string;
                getName():string;
                getOrigPageId():string;
                getPrecision():number;
                getScale():number;
                getTableName():string;
                getWidth():string;
                hasEmptyText():boolean;
                isFireUptEvt():boolean;
                isFullLine():boolean;
                isHidden():boolean;
                isIsAudit():boolean;
                isMustInput():boolean;
                /**
                 * ����alias
                 *
                 * @param alias alias
                 * @return ��ǰ����
                 */
                setAlias(alias:string):this;
                /**
                 * ����baseEntityId
                 *
                 * @param baseEntityId baseEntityId
                 * @return ��ǰ����
                 */
                setBaseEntityId(baseEntityId:string):this;
                /**
                 * ����classSimpleName
                 *
                 * @param classSimpleName classSimpleName
                 * @return ��ǰ����
                 */
                setClassSimpleName(classSimpleName:string):this;
                /**
                 * ����comboItemList
                 *
                 * @param comboItemList comboItemList
                 * @return ��ǰ����
                 */
                setComboItemList(comboItemList:$.java.util.List):this;
                /**
                 * ����displayStyle
                 *
                 * @param displayStyle displayStyle
                 * @return ��ǰ����
                 */
                setDisplayStyle(displayStyle:number):this;
                /**
                 * ����field
                 *
                 * @param field field
                 * @return ��ǰ����
                 */
                setField(field:string):this;
                /**
                 * ����fireUptEvt
                 *
                 * @param fireUptEvt fireUptEvt
                 * @return ��ǰ����
                 */
                setFireUptEvt(fireUptEvt:boolean):this;
                /**
                 * ����fullLine
                 *
                 * @param fullLine fullLine
                 * @return ��ǰ����
                 */
                setFullLine(fullLine:boolean):this;
                /**
                 * �Ƿ�Ϊ����ʾ
                 *
                 * @param hasEmptyText �Ƿ�Ϊ����ʾ
                 * @return ��ǰ����
                 */
                setHasEmptyText(hasEmptyText:boolean):this;
                setHeight(height:string):void;
                /**
                 * ����hidden
                 *
                 * @param hidden hidden
                 * @return ��ǰ����
                 */
                setHidden(hidden:boolean):this;
                /**
                 * �Ƿ�༭���
                 *
                 * @param isAudit �Ƿ�
                 * @return ��ǰ����
                 */
                setIsAudit(isAudit:boolean):this;
                /**
                 * ����isedit
                 *
                 * @param isedit isedit
                 * @return ��ǰ����
                 */
                setLock(isedit:boolean):this;
                /**
                 * ����lock
                 *
                 * @param lock lock
                 * @return ��ǰ����
                 */
                setLock(lock:string):this;
                /**
                 * ����maxCount
                 *
                 * @param maxCount maxCount
                 * @return ��ǰ����
                 */
                setMaxCount(maxCount:number):this;
                /**
                 * ����maxSize
                 *
                 * @param maxSize maxSize
                 * @return ��ǰ����
                 */
                setMaxSize(maxSize:string):this;
                /**
                 * ����minSize
                 *
                 * @param minSize minSize
                 * @return ��ǰ����
                 */
                setMinSize(minSize:string):this;
                /**
                 * ����mustInput
                 *
                 * @param mustInput mustInput
                 * @return ��ǰ����
                 */
                setMustInput(mustInput:boolean):this;
                /**
                 * ����name
                 *
                 * @param name name
                 * @return ��ǰ����
                 */
                setName(name:string):this;
                /**
                 * ����pageId
                 *
                 * @param origPageId pageId
                 * @return ��ǰ����
                 */
                setOrigPageId(origPageId:string):this;
                /**
                 * ����precision
                 *
                 * @param precision precision
                 * @return ��ǰ����
                 */
                setPrecision(precision:number):this;
                /**
                 * ����scale
                 *
                 * @param scale scale
                 * @return ��ǰ����
                 */
                setScale(scale:number):this;
                setTableName(tableName:string):this;
                setWidth(width:string):void;
            }
            type DrawFormFieldDto_T = $.java.lang.Cloneable & DrawFormFieldDto_S & DrawFormFieldDto$;
            interface DrawFormFieldDto extends DrawFormFieldDto_T {
            }
            interface InfoClassifyEntityKeyDTO_S {
                /**
                 * ���� ����ʶ ����ö��
                 *
                 * @param formKey �б��ʶ
                 * @return ö�ٶ���
                 */
                getEntityKeyEnumByFormKey(formKey:string):InfoClassifyEntityKeyDTO;
                /**
                 * ���� �б��ʶ ����ö��
                 *
                 * @param listKey �б��ʶ
                 * @return ö�ٶ���
                 */
                getEntityKeyEnumByListKey(listKey:string):InfoClassifyEntityKeyDTO;
                /**
                 * ���� ��ѯ��ʶ ����ö��
                 *
                 * @param queryKey ��ѯ��ʶ
                 * @return ö�ٶ���
                 */
                getEntityKeyEnumByQueryKey(queryKey:string):InfoClassifyEntityKeyDTO;
                /**
                 * ��ʼ������
                 */
                initCacheMap():void;
            }
            type InfoClassifyEntityKeyDTO_ST = $.java.io.Serializable & InfoClassifyEntityKeyDTO_S;
            interface InfoClassifyEntityKeyDTO_C extends InfoClassifyEntityKeyDTO_ST {
                new():InfoClassifyEntityKeyDTO;
            }
            interface InfoClassifyEntityKeyDTO$ {
                getDefaultImportType():string;
                getDefaultLockUIs():$.java.util.List;
                getFormKey():string;
                getImportPlugin():string;
                getListKey():string;
                getQueryKey():string;
                getSourceKey():string;
                getTabKey():string;
                setDefaultImportType(defaultImportType:string):void;
                setDefaultLockUIs(defaultLockUIs:$.java.util.List):void;
                setFormKey(formKey:string):void;
                setImportPlugin(importPlugin:string):void;
                setListKey(listKey:string):void;
                setQueryKey(queryKey:string):void;
                setSourceKey(sourceKey:string):void;
                setTabKey(tabKey:string):void;
            }
            type InfoClassifyEntityKeyDTO_T = $.java.io.Serializable & InfoClassifyEntityKeyDTO_S & InfoClassifyEntityKeyDTO$;
            interface InfoClassifyEntityKeyDTO extends InfoClassifyEntityKeyDTO_T {
            }
            interface HpfsChgexternalrecordQueueDto$DataRowEntity_S {
            }
            type HpfsChgexternalrecordQueueDto$DataRowEntity_ST = $.java.io.Serializable & HpfsChgexternalrecordQueueDto$DataRowEntity_S;
            interface HpfsChgexternalrecordQueueDto$DataRowEntity_C extends HpfsChgexternalrecordQueueDto$DataRowEntity_ST {
                new():HpfsChgexternalrecordQueueDto$DataRowEntity;
            }
            interface HpfsChgexternalrecordQueueDto$DataRowEntity$ {
                setChgMode(arg0:string):this;
                setFlowType(arg0:string):this;
                setIdAfter(arg0:long):this;
                setIdBefore(arg0:long):this;
                setVidAfter(arg0:long):this;
                setVidBefore(arg0:long):this;
            }
            type HpfsChgexternalrecordQueueDto$DataRowEntity_T = $.java.io.Serializable & HpfsChgexternalrecordQueueDto$DataRowEntity_S & HpfsChgexternalrecordQueueDto$DataRowEntity$;
            interface HpfsChgexternalrecordQueueDto$DataRowEntity extends HpfsChgexternalrecordQueueDto$DataRowEntity_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.entity{
            interface InfoclassifyPercreField_S {
            }
            type InfoclassifyPercreField_ST = PercreField_S & InfoclassifyPercreField_S;
            interface InfoclassifyPercreField_C extends InfoclassifyPercreField_ST {
                new(faceUrl:string,reverseUrl:string,fieldSet:$.java.util.Set):InfoclassifyPercreField;
            }
            interface InfoclassifyPercreField$ {
            }
            type InfoclassifyPercreField_T = PercreField & InfoclassifyPercreField_S & InfoclassifyPercreField$;
            interface InfoclassifyPercreField extends InfoclassifyPercreField_T {
            }
            interface PercreField_S {
            }
            interface PercreField_C extends PercreField_S {
                new(faceUrl:string,reverseUrl:string,fieldSet:$.java.util.Set):PercreField;
                new(faceUrl:string,reverseUrl:string,mobileFaceUrl:string,mobileReverseUrl:string,fieldSet:$.java.util.Set):PercreField;
            }
            interface PercreField$ {
                getFaceUrl():string;
                getFieldSet():$.java.util.Set;
                getMobileFaceUrl():string;
                getMobileReverseUrl():string;
                getReverseUrl():string;
            }
            type PercreField_T = PercreField_S & PercreField$;
            interface PercreField extends PercreField_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.enums{
            enum BusinessTypeEnum {
                ADMIN,
                EMPLOYEE,
                COMMON
            }
            enum ConfigAreaEnum {
                MAIN,
                SIDE,
                COMMON
            }
            enum InfoClassifyEntityKeyEnum {
                HSPM_PERSONINFO,
                HSPM_PEREDUEXPINFO,
                HSPM_EMPPROEXP,
                HSPM_PREWORKEXP,
                HSPM_EMPTRAINFILE,
                HSPM_PEROCPQUAL,
                HSPM_PERPRACTQUAL,
                HSPM_PERPROTITLE,
                HSPM_LANGUAGESKILLS,
                HSPM_RSMPROSKL,
                HSPM_RSMPATINV,
                HSPM_PERRPRECORD,
                HSPM_PERHOBBY,
                HSPM_PERCONTACT,
                HSPM_PERADDRESS,
                HSPM_FAMILYMEMB,
                HSPM_FERTILITYINFO,
                HSPM_EMRGCONTACT,
                HSPM_PERCRE
            }
            enum InfoGroupFieldCategroyEnum {
                TEXT,
                IMG,
                ATTACH
            }
            enum PereduexpinfoFieldEnum {
                HRPI_PEREDUEXP,
                HRPI_PEREDUEXPCERT
            }
            enum InfoClassifyImportOperateEnum {
                HSPM_PERSONINFO,
                HSPM_PEREDUEXPINFO,
                HSPM_EMPPROEXP,
                HSPM_PREWORKEXP,
                HSPM_EMPTRAINFILE,
                HSPM_PEROCPQUAL,
                HSPM_PERPRACTQUAL,
                HSPM_PERPROTITLE,
                HSPM_LANGUAGESKILLS,
                HSPM_RSMPROSKL,
                HSPM_RSMPATINV,
                HSPM_PERRPRECORD,
                HSPM_PERHOBBY,
                HSPM_PERCONTACT,
                HSPM_PERADDRESS,
                HSPM_FAMILYMEMB,
                HSPM_FERTILITYINFO,
                HSPM_EMRGCONTACT,
                HSPM_PERCRE
            }
            enum FieldTypeEnum {
                MULILANG_TEXT,
                TEXT,
                COMBO,
                DATE,
                CREATE_DATE,
                MODIFY_DATE,
                DATE_TIME,
                BOOLEAN,
                DECIMAL,
                BIG_INT,
                LONG,
                ATTACHMENT_COUNT,
                INTEGER,
                BASE_DATA,
                CREATER,
                MODIFIER,
                PICTURE,
                BILL_STATUS,
                USER,
                CITY,
                ADMIN_DIVISION,
                MAIN_ORG,
                ATTACHMENT,
                TEXTAREA,
                Currency,
                ORGPROP,
                QueryProp,
                I18NNAMEPROP,
                ADDRESSPROP,
                MULBASEDATAPROP,
                MULQUERYPROP,
                AMOUNTPROP,
                HISMODELBASEDATAPROP
            }
            enum PersonModelClassificationEnum {
                PERSONMODEL,
                PERATTACHED,
                EMPATTACHED,
                CMPEMPATTACHED,
                DEPEMPATTACHED
            }
            enum BaseRefEnum {
                CMP_EMP
            }
            enum PereduexpcerttypeFieldEnum {
                GRADUATE_CERT_ID,
                DEGREE_CERT_ID,
                FOREIGN_DEGREE_RECORD_CERT_ID,
                DEGREE_REG_CERT_ID,
                DEGREE_RECORD_CERT_ID,
                OTHER
            }
            enum InfoClassifyFormOperateEnum {
                FORM_BTN_SAVE,
                FORM_BTN_DO_SAVE,
                FORM_BTN_UPDATE,
                FORM_BTN_DELETE,
                FORM_BTN_SAVEIMPORT,
                FORM_BTN_CANCEL,
                FORM_BTN_HISINFO,
                FORM_BTN_IMPORTDATA,
                FORM_BTN_IMPORTDETAILS,
                FORM_BTN_EXPORTLIST_EXPT,
                FORM_BTN_EXPORTLIST,
                FORM_BTN_EXPORTLISTBYSELECTFIELDS,
                FORM_BTN_EXPORTDETAILS
            }
            enum ReportTypeEnum {
                EMP,
                TRANSACTION,
                QUITEMP
            }
            enum ClientTypeEnum {
                PC,
                EMPLOYEE_MOBILE,
                EMPLOYEE_PC
            }
            enum InfoClassifyListOperateEnum {
                LIST_BTN_NEW,
                LIST_BTN_DELETE,
                LIST_BTN_REFRESH,
                LIST_BTN_HISINFO,
                LIST_BTN_IMPORT,
                LIST_BTN_IMPORTDETAILS,
                LIST_BTN_EXPORTLIST_EXPT,
                LIST_BTN_EXPORTLIST,
                LIST_BTN_EXPORTLISTBYSELECTFIELDS,
                LIST_BTN_EXPORTDETAILS,
                LIST_BTN_CLOSE
            }
            enum PersoninfoFieldEnum {
                HRPI_PERNONTSPROP,
                HRPI_PERTSPROP,
                HRPI_PERREGION,
                HRPI_PERSON,
                HSPM_ERMANFILE,
                HRPI_PERSERLEN
            }
        }
        namespace kd.sdk.hr.hspm.common.ext.file{
            interface QuitEmpReportExtColumnDTO_S {
            }
            type QuitEmpReportExtColumnDTO_ST = EmpReportExtColumnDTO_S & QuitEmpReportExtColumnDTO_S;
            interface QuitEmpReportExtColumnDTO_C extends QuitEmpReportExtColumnDTO_ST {
                new():QuitEmpReportExtColumnDTO;
                new(column:$.kd.bos.entity.report.ReportColumn,entityItem:$.kd.bos.metadata.entity.EntityItem,mapKey:string,mapValue:$.kd.bos.dataentity.entity.DynamicObject):QuitEmpReportExtColumnDTO;
            }
            interface QuitEmpReportExtColumnDTO$ {
            }
            type QuitEmpReportExtColumnDTO_T = EmpReportExtColumnDTO & QuitEmpReportExtColumnDTO_S & QuitEmpReportExtColumnDTO$;
            interface QuitEmpReportExtColumnDTO extends QuitEmpReportExtColumnDTO_T {
            }
            interface EmpReportExtColumnDTO_S {
            }
            interface EmpReportExtColumnDTO_C extends EmpReportExtColumnDTO_S {
                new():EmpReportExtColumnDTO;
                new(column:$.kd.bos.entity.report.ReportColumn,entityItem:$.kd.bos.metadata.entity.EntityItem,mapKey:string,mapValue:$.kd.bos.dataentity.entity.DynamicObject):EmpReportExtColumnDTO;
            }
            interface EmpReportExtColumnDTO$ {
                getColumn():$.kd.bos.entity.report.ReportColumn;
                getEntityItem():$.kd.bos.metadata.entity.EntityItem;
                getMapKey():string;
                getMapValue():$.kd.bos.dataentity.entity.DynamicObject;
            }
            type EmpReportExtColumnDTO_T = EmpReportExtColumnDTO_S & EmpReportExtColumnDTO$;
            interface EmpReportExtColumnDTO extends EmpReportExtColumnDTO_T {
            }
            interface EmpSupRelDTO_S {
            }
            interface EmpSupRelDTO_C extends EmpSupRelDTO_S {
                new():EmpSupRelDTO;
                new(delSuperior:$.java.util.Map):EmpSupRelDTO;
            }
            interface EmpSupRelDTO$ {
                getDelSuperior():$.java.util.Map;
                setDelSuperior(delSuperior:$.java.util.Map):void;
            }
            type EmpSupRelDTO_T = EmpSupRelDTO_S & EmpSupRelDTO$;
            interface EmpSupRelDTO extends EmpSupRelDTO_T {
            }
            interface QuitEmpReportExtQueryFieldsDTO_S {
            }
            type QuitEmpReportExtQueryFieldsDTO_ST = EmpReportExtQueryFieldsDTO_S & QuitEmpReportExtQueryFieldsDTO_S;
            interface QuitEmpReportExtQueryFieldsDTO_C extends QuitEmpReportExtQueryFieldsDTO_ST {
                new():QuitEmpReportExtQueryFieldsDTO;
                new(queryFieldSet:$.java.util.Set):QuitEmpReportExtQueryFieldsDTO;
            }
            interface QuitEmpReportExtQueryFieldsDTO$ {
            }
            type QuitEmpReportExtQueryFieldsDTO_T = EmpReportExtQueryFieldsDTO & QuitEmpReportExtQueryFieldsDTO_S & QuitEmpReportExtQueryFieldsDTO$;
            interface QuitEmpReportExtQueryFieldsDTO extends QuitEmpReportExtQueryFieldsDTO_T {
            }
            interface QuitEmpReportExtReletionFilterDTO_S {
            }
            type QuitEmpReportExtReletionFilterDTO_ST = EmpReportExtReletionFilterDTO_S & QuitEmpReportExtReletionFilterDTO_S;
            interface QuitEmpReportExtReletionFilterDTO_C extends QuitEmpReportExtReletionFilterDTO_ST {
                new():QuitEmpReportExtReletionFilterDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo,reletionMap:$.java.util.Map):QuitEmpReportExtReletionFilterDTO;
            }
            interface QuitEmpReportExtReletionFilterDTO$ {
            }
            type QuitEmpReportExtReletionFilterDTO_T = EmpReportExtReletionFilterDTO & QuitEmpReportExtReletionFilterDTO_S & QuitEmpReportExtReletionFilterDTO$;
            interface QuitEmpReportExtReletionFilterDTO extends QuitEmpReportExtReletionFilterDTO_T {
            }
            interface QuitEmpReportExtHisQueryDateDTO_S {
            }
            interface QuitEmpReportExtHisQueryDateDTO_C extends QuitEmpReportExtHisQueryDateDTO_S {
                new():QuitEmpReportExtHisQueryDateDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo):QuitEmpReportExtHisQueryDateDTO;
            }
            interface QuitEmpReportExtHisQueryDateDTO$ {
                /**
                 * ��ȡ��ѯ������ϸ��Ϣ
                 *
                 * @return filterInfo
                 */
                getFilterInfo():$.kd.bos.entity.report.FilterInfo;
            }
            type QuitEmpReportExtHisQueryDateDTO_T = QuitEmpReportExtHisQueryDateDTO_S & QuitEmpReportExtHisQueryDateDTO$;
            interface QuitEmpReportExtHisQueryDateDTO extends QuitEmpReportExtHisQueryDateDTO_T {
            }
            interface QuitEmpReportExtQueryFilterDTO_S {
            }
            type QuitEmpReportExtQueryFilterDTO_ST = EmpReportExtQueryFilterDTO_S & QuitEmpReportExtQueryFilterDTO_S;
            interface QuitEmpReportExtQueryFilterDTO_C extends QuitEmpReportExtQueryFilterDTO_ST {
                new():QuitEmpReportExtQueryFilterDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo,filter:$.kd.bos.orm.query.QFilter):QuitEmpReportExtQueryFilterDTO;
            }
            interface QuitEmpReportExtQueryFilterDTO$ {
            }
            type QuitEmpReportExtQueryFilterDTO_T = EmpReportExtQueryFilterDTO & QuitEmpReportExtQueryFilterDTO_S & QuitEmpReportExtQueryFilterDTO$;
            interface QuitEmpReportExtQueryFilterDTO extends QuitEmpReportExtQueryFilterDTO_T {
            }
            interface CardBindDataDTO_S {
            }
            interface CardBindDataDTO_C extends CardBindDataDTO_S {
                new():CardBindDataDTO;
                new(queryDbVo:kd.sdk.hr.hspm.common.vo.QueryDbVo,dataList:$.java.util.List):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,afterCreatVo:kd.sdk.hr.hspm.common.vo.AfterCreatVo):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,eventObject:$.java.util.EventObject,timeMap:$.java.util.Map):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,beforeCreatVo:kd.sdk.hr.hspm.common.vo.BeforeCreatVo,drawFlag:boolean):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,eventObject:$.java.util.EventObject,compareVo:kd.sdk.hr.hspm.common.vo.CardViewCompareVo,timeMap:$.java.util.Map):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,eventObject:$.java.util.EventObject,compareVo:kd.sdk.hr.hspm.common.vo.CardViewCompareVo,timeMap:$.java.util.Map,queryDbVo:kd.sdk.hr.hspm.common.vo.QueryDbVo):CardBindDataDTO;
                new(model:$.kd.bos.entity.datamodel.IDataModel,view:$.kd.bos.form.IFormView,eventObject:$.java.util.EventObject,compareVo:kd.sdk.hr.hspm.common.vo.CardViewCompareVo,beforeCreatVo:kd.sdk.hr.hspm.common.vo.BeforeCreatVo,afterCreatVo:kd.sdk.hr.hspm.common.vo.AfterCreatVo,drawFlag:boolean,timeMap:$.java.util.Map):CardBindDataDTO;
            }
            interface CardBindDataDTO$ {
                getAfterCreatVo():kd.sdk.hr.hspm.common.vo.AfterCreatVo;
                getBeforeCreatVo():kd.sdk.hr.hspm.common.vo.BeforeCreatVo;
                getCompareVo():kd.sdk.hr.hspm.common.vo.CardViewCompareVo;
                getDataList():$.java.util.List;
                getEventObject():$.java.util.EventObject;
                getModel():$.kd.bos.entity.datamodel.IDataModel;
                getQueryDbVo():kd.sdk.hr.hspm.common.vo.QueryDbVo;
                getTimeMap():$.java.util.Map;
                getTopLeftMainAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                getView():$.kd.bos.form.IFormView;
                isDrawFlag():boolean;
                setAfterCreatVo(afterCreatVo:kd.sdk.hr.hspm.common.vo.AfterCreatVo):void;
                setBeforeCreatVo(beforeCreatVo:kd.sdk.hr.hspm.common.vo.BeforeCreatVo):void;
                setCompareVo(compareVo:kd.sdk.hr.hspm.common.vo.CardViewCompareVo):void;
                setDataList(dataList:$.java.util.List):void;
                setDrawFlag(drawFlag:boolean):void;
                setEventObject(eventObject:$.java.util.EventObject):void;
                setModel(model:$.kd.bos.entity.datamodel.IDataModel):void;
                setQueryDbVo(queryDbVo:kd.sdk.hr.hspm.common.vo.QueryDbVo):void;
                setTimeMap(timeMap:$.java.util.Map):void;
                setTopLeftMainAp(topLeftMainAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type CardBindDataDTO_T = CardBindDataDTO_S & CardBindDataDTO$;
            interface CardBindDataDTO extends CardBindDataDTO_T {
            }
            interface DialogBindDataDTO_S {
            }
            interface DialogBindDataDTO_C extends DialogBindDataDTO_S {
                /**
                 * �޲ι���
                 */
                new():DialogBindDataDTO;
                new(view:$.kd.bos.form.IFormView,diffMap:$.java.util.Map,entityId:string):DialogBindDataDTO;
                /**
                 * �вι���
                 *
                 * @param view view
                 * @param drawFormFieldDto drawFormFieldDto
                 * @param fieldsetPanelAp fieldsetPanelAp
                 * @param diffMap diffMap
                 * @param flexAp flexAp
                 * @param totalFieldsetPanelAp totalFieldsetPanelAp
                 * @param style style
                 * @param padding padding
                 * @param margin margin
                 * @param fieldAp fieldAp
                 */
                new(view:$.kd.bos.form.IFormView,drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto,fieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp,diffMap:$.java.util.Map,flexAp:$.kd.bos.metadata.form.container.FlexPanelAp,totalFieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp,style:$.kd.bos.metadata.form.Style,padding:$.kd.bos.metadata.form.Padding,margin:$.kd.bos.metadata.form.Margin,fieldAp:$.kd.bos.metadata.form.control.FieldAp):DialogBindDataDTO;
            }
            interface DialogBindDataDTO$ {
                /**
                 * ��ȡmmp
                 *
                 * @return map
                 */
                getDiffMap():$.java.util.Map;
                /**
                 * ��ȡdto
                 *
                 * @return dto
                 */
                getDrawFormFieldDto():kd.sdk.hr.hspm.common.dto.DrawFormFieldDto;
                getEntityId():string;
                /**
                 * ��ȡFieldAp
                 *
                 * @return FieldAp
                 */
                getFieldAp():$.kd.bos.metadata.form.control.FieldAp;
                /**
                 * ��ȡ���
                 *
                 * @return ���
                 */
                getFieldsetPanelAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��ȡ���
                 *
                 * @return ���
                 */
                getFlexAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��ȡMargin
                 *
                 * @return Margin
                 */
                getMargin():$.kd.bos.metadata.form.Margin;
                /**
                 * ��ȡPadding
                 *
                 * @return Padding
                 */
                getPadding():$.kd.bos.metadata.form.Padding;
                /**
                 * ��ȡ��ʽ
                 *
                 * @return Style
                 */
                getStyle():$.kd.bos.metadata.form.Style;
                /**
                 * ��ȡ���
                 *
                 * @return ���
                 */
                getTotalFieldsetPanelAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��ȡview
                 *
                 * @return view
                 */
                getView():$.kd.bos.form.IFormView;
                /**
                 * ����map
                 *
                 * @param diffMap diffMap
                 */
                setDiffMap(diffMap:$.java.util.Map):void;
                /**
                 * ����dto
                 *
                 * @param drawFormFieldDto drawFormFieldDto
                 */
                setDrawFormFieldDto(drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):void;
                setEntityId(entityId:string):void;
                /**
                 * ����FieldAp
                 *
                 * @param fieldAp
                 */
                setFieldAp(fieldAp:$.kd.bos.metadata.form.control.FieldAp):void;
                setFieldsetPanelAp(fieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                /**
                 * ����flexAp
                 *
                 * @param flexAp flexAp
                 */
                setFlexAp(flexAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                /**
                 * ����margin
                 *
                 * @param margin
                 */
                setMargin(margin:$.kd.bos.metadata.form.Margin):void;
                /**
                 * ����padding
                 *
                 * @param padding
                 */
                setPadding(padding:$.kd.bos.metadata.form.Padding):void;
                /**
                 * ����style
                 *
                 * @param style
                 */
                setStyle(style:$.kd.bos.metadata.form.Style):void;
                /**
                 * ����totalFieldsetPanelAp
                 *
                 * @param totalFieldsetPanelAp totalFieldsetPanelAp
                 */
                setTotalFieldsetPanelAp(totalFieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                /**
                 * ����view
                 * @param view viw
                 */
                setView(view:$.kd.bos.form.IFormView):void;
            }
            type DialogBindDataDTO_T = DialogBindDataDTO_S & DialogBindDataDTO$;
            interface DialogBindDataDTO extends DialogBindDataDTO_T {
            }
            interface EmpReportExtReletionFilterDTO_S {
            }
            interface EmpReportExtReletionFilterDTO_C extends EmpReportExtReletionFilterDTO_S {
                new():EmpReportExtReletionFilterDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo,reletionMap:$.java.util.Map):EmpReportExtReletionFilterDTO;
            }
            interface EmpReportExtReletionFilterDTO$ {
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
            type EmpReportExtReletionFilterDTO_T = EmpReportExtReletionFilterDTO_S & EmpReportExtReletionFilterDTO$;
            interface EmpReportExtReletionFilterDTO extends EmpReportExtReletionFilterDTO_T {
            }
            interface EmpReportExtQueryFieldsDTO_S {
            }
            interface EmpReportExtQueryFieldsDTO_C extends EmpReportExtQueryFieldsDTO_S {
                new():EmpReportExtQueryFieldsDTO;
                new(queryFieldSet:$.java.util.Set):EmpReportExtQueryFieldsDTO;
            }
            interface EmpReportExtQueryFieldsDTO$ {
                /**
                 * ��ȡ��ѯ��
                 *
                 * @return queryFieldSet
                 */
                getQueryFieldSet():$.java.util.Set;
            }
            type EmpReportExtQueryFieldsDTO_T = EmpReportExtQueryFieldsDTO_S & EmpReportExtQueryFieldsDTO$;
            interface EmpReportExtQueryFieldsDTO extends EmpReportExtQueryFieldsDTO_T {
            }
            interface QuitEmpReportExtCalculateDTO_S {
            }
            type QuitEmpReportExtCalculateDTO_ST = EmpReportExtCalculateDTO_S & QuitEmpReportExtCalculateDTO_S;
            interface QuitEmpReportExtCalculateDTO_C extends QuitEmpReportExtCalculateDTO_ST {
                new():QuitEmpReportExtCalculateDTO;
                new(dataSet:$.kd.bos.algo.DataSet,filterInfo:$.kd.bos.entity.report.FilterInfo,queryFieldSet:$.java.util.Set):QuitEmpReportExtCalculateDTO;
            }
            interface QuitEmpReportExtCalculateDTO$ {
            }
            type QuitEmpReportExtCalculateDTO_T = EmpReportExtCalculateDTO & QuitEmpReportExtCalculateDTO_S & QuitEmpReportExtCalculateDTO$;
            interface QuitEmpReportExtCalculateDTO extends QuitEmpReportExtCalculateDTO_T {
            }
            interface MobileHomeVectorDTO_S {
            }
            interface MobileHomeVectorDTO_C extends MobileHomeVectorDTO_S {
                new():MobileHomeVectorDTO;
            }
            interface MobileHomeVectorDTO$ {
                getColorAndSizeMap():$.java.util.Map;
                getDefaultVetor():string;
                getEnable():boolean;
                getVectorMap():$.java.util.Map;
                getVectorStyleMap():$.java.util.Map;
                setColorAndSizeMap(colorAndSizeMap:$.java.util.Map):void;
                setDefaultVetor(defaultVetor:string):void;
                setEnable(enable:boolean):void;
                setVectorMap(vectorMap:$.java.util.Map):void;
                setVectorStyleMap(vectorStyleMap:$.java.util.Map):void;
            }
            type MobileHomeVectorDTO_T = MobileHomeVectorDTO_S & MobileHomeVectorDTO$;
            interface MobileHomeVectorDTO extends MobileHomeVectorDTO_T {
            }
            interface SideBarDataDTO_S {
            }
            interface SideBarDataDTO_C extends SideBarDataDTO_S {
                /**
                 * �޲ι���
                 */
                new():SideBarDataDTO;
                new(infoGroupConfig:$.java.util.Map):SideBarDataDTO;
                new(infoGroupConfig:$.java.util.Map,showParameter:$.kd.bos.form.FormShowParameter):SideBarDataDTO;
            }
            interface SideBarDataDTO$ {
                getInfoGroupConfig():$.java.util.Map;
                getShowParameter():$.kd.bos.form.FormShowParameter;
                setInfoGroupConfig(infoGroupConfig:$.java.util.Map):void;
                setShowParameter(showParameter:$.kd.bos.form.FormShowParameter):void;
            }
            type SideBarDataDTO_T = SideBarDataDTO_S & SideBarDataDTO$;
            interface SideBarDataDTO extends SideBarDataDTO_T {
            }
            interface EmpReportExtCalculateDTO_S {
            }
            interface EmpReportExtCalculateDTO_C extends EmpReportExtCalculateDTO_S {
                new():EmpReportExtCalculateDTO;
                new(dataSet:$.kd.bos.algo.DataSet,filterInfo:$.kd.bos.entity.report.FilterInfo,queryFieldSet:$.java.util.Set):EmpReportExtCalculateDTO;
            }
            interface EmpReportExtCalculateDTO$ {
                /**
                 * ��ȡ���ݼ�
                 *
                 * @return dataSet
                 */
                getDataSet():$.kd.bos.algo.DataSet;
                /**
                 * ��ȡ��ѯ������ϸ��Ϣ
                 *
                 * @return filterInfo
                 */
                getFilterInfo():$.kd.bos.entity.report.FilterInfo;
                /**
                 * ��ȡ��ѯ��
                 *
                 * @return queryFieldSet
                 */
                getQueryFieldSet():$.java.util.Set;
                /**
                 * �����µ����ݼ�
                 *
                 * @param dataSet dataSet
                 */
                setDataSet(dataSet:$.kd.bos.algo.DataSet):void;
            }
            type EmpReportExtCalculateDTO_T = EmpReportExtCalculateDTO_S & EmpReportExtCalculateDTO$;
            interface EmpReportExtCalculateDTO extends EmpReportExtCalculateDTO_T {
            }
            interface EmpReportExtQueryFilterDTO_S {
            }
            interface EmpReportExtQueryFilterDTO_C extends EmpReportExtQueryFilterDTO_S {
                new():EmpReportExtQueryFilterDTO;
                new(filterInfo:$.kd.bos.entity.report.FilterInfo,filter:$.kd.bos.orm.query.QFilter):EmpReportExtQueryFilterDTO;
            }
            interface EmpReportExtQueryFilterDTO$ {
                /**
                 * ��ȡfilter
                 *
                 * @return filter
                 */
                getFilter():$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ��ѯ������ϸ��Ϣ
                 *
                 * @return filterInfo
                 */
                getFilterInfo():$.kd.bos.entity.report.FilterInfo;
            }
            type EmpReportExtQueryFilterDTO_T = EmpReportExtQueryFilterDTO_S & EmpReportExtQueryFilterDTO$;
            interface EmpReportExtQueryFilterDTO extends EmpReportExtQueryFilterDTO_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.model{
            interface FileRelationModel_S {
            }
            interface FileRelationModel_C extends FileRelationModel_S {
                new():FileRelationModel;
                new(superList:$.java.util.List,depChargeInfoList:$.java.util.List):FileRelationModel;
            }
            interface FileRelationModel$ {
                getDepChargeInfoList():$.java.util.List;
                getSuperList():$.java.util.List;
                setDepChargeInfoList(depChargeInfoList:$.java.util.List):void;
                setSuperList(superList:$.java.util.List):void;
            }
            type FileRelationModel_T = FileRelationModel_S & FileRelationModel$;
            interface FileRelationModel extends FileRelationModel_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.result{
            interface HrpiServiceOperateResult_S {
                /**
                 * �������İ�װ����
                 *
                 * @param resultMap ���ر���
                 * @return ���İ�װ����
                 */
                build(resultMap:$.java.util.Map):HrpiServiceOperateResult;
                /**
                 * �������İ�װ����
                 *
                 * @param success �Ƿ�ɹ�
                 * @param message ������Ϣ
                 * @return ���İ�װ����
                 */
                build(success:boolean,message:string):HrpiServiceOperateResult;
                /**
                 * У�鷵�ر���
                 * �������ʧ�����׳��쳣
                 */
                validate(resultMap:$.java.util.Map):void;
                validate(resultMap:$.java.util.Map,errorCode:$.kd.bos.exception.ErrorCode,errorMsg:string):void;
                /**
                 * У�鷵�ر���
                 * �������ʧ�����׳��쳣
                 *
                 * @param resultMap ���ر���
                 * @return ���İ�װ����
                 */
                validateAfterBuild(resultMap:$.java.util.Map):HrpiServiceOperateResult;
                /**
                 * У�鷵�ر���
                 * �������ʧ�����׳��쳣
                 *
                 * @param resultMap ���ر���
                 * @param errorCode �쳣��
                 * @param errorMsg  �쳣ԭ��
                 * @return ���İ�װ����
                 */
                validateAfterBuild(resultMap:$.java.util.Map,errorCode:$.kd.bos.exception.ErrorCode,errorMsg:string):HrpiServiceOperateResult;
            }
            interface HrpiServiceOperateResult_C extends HrpiServiceOperateResult_S {
                new():HrpiServiceOperateResult;
            }
            interface HrpiServiceOperateResult$ {
                /**
                 * deleteInfo �ɹ��󷵻ؽ��
                 *
                 * @return count
                 */
                getCount():number;
                /**
                 * saveOrUpdateInfo �ɹ����ȡ�ӿڷ��ص�data����
                 *
                 * @return data����
                 */
                getData():$.java.util.List;
                /**
                 * �ɹ��󷵻صĶ���map����
                 * Ĭ�Ͻ���data�еĵ�һ��list����
                 *
                 * @return ����entitynumber
                 */
                getDataMapForEntitynumber():string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param dataMap ����map
                 * @return ����entitynumber
                 */
                getDataMapForEntitynumber(dataMap:$.java.util.Map):string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param index data��������
                 * @return ����entitynumber
                 */
                getDataMapForEntitynumber(index:number):string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 * Ĭ�Ͻ���data�еĵ�һ��list����
                 *
                 * @return ����eventid
                 */
                getDataMapForEventid():string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param dataMap ����map
                 * @return ����eventid
                 */
                getDataMapForEventid(dataMap:$.java.util.Map):string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param index data��������
                 * @return ����eventid
                 */
                getDataMapForEventid(index:number):string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 * Ĭ�Ͻ���data�еĵ�һ��list����
                 *
                 * @return ����ids
                 */
                getDataMapForIds():$.java.util.List;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param dataMap ����map
                 * @return ����ids
                 */
                getDataMapForIds(dataMap:$.java.util.Map):$.java.util.List;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param index data��������
                 * @return ����ids
                 */
                getDataMapForIds(index:number):$.java.util.List;
                /**
                 * �ɹ��󷵻صĶ���map����
                 * Ĭ�Ͻ���data�еĵ�һ��list����
                 *
                 * @return ����importtype
                 */
                getDataMapForImporttype():string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param dataMap ����map
                 * @return ����ids
                 */
                getDataMapForImporttype(dataMap:$.java.util.Map):string;
                /**
                 * �ɹ��󷵻صĶ���map����
                 *
                 * @param index data��������
                 * @return ����importtype
                 */
                getDataMapForImporttype(index:number):string;
                /**
                 * ���ش�����Ϣ
                 *
                 * @return message
                 */
                getMessage():string;
                getSyncPersonIdList():$.java.util.List;
                /**
                 * �Ƿ�ɹ�
                 *
                 * @return �Ƿ�ɹ�
                 */
                isSuccess():boolean;
                isSyncFlag():boolean;
                /**
                 * ���ô�����Ϣ
                 *
                 * @param message
                 */
                setMessage(message:string):void;
                /**
                 * �����Ƿ�ɹ�
                 *
                 * @param success �Ƿ�ɹ�
                 */
                setSuccess(success:boolean):void;
                setSyncFlag(syncFlag:boolean):void;
                setSyncPersonIdList(syncPersonIdList:$.java.util.List):void;
            }
            type HrpiServiceOperateResult_T = HrpiServiceOperateResult_S & HrpiServiceOperateResult$;
            interface HrpiServiceOperateResult extends HrpiServiceOperateResult_T {
            }
            interface PerChgSend_S {
                readonly HSPM_CHGEXTERNALRECORD_RESULT_QUEUE:string;
                /**
                 * ���Ͷ���
                 *
                 * @param msg ������Ϣ
                 */
                sendMsg(msg:string):void;
            }
            interface PerChgSend_C extends PerChgSend_S {
                new():PerChgSend;
            }
            interface PerChgSend$ {
            }
            type PerChgSend_T = PerChgSend_S & PerChgSend$;
            interface PerChgSend extends PerChgSend_T {
            }
            interface HisResponseParse_S {
                getFail(message:string):$.java.util.Map;
                getResult(flag:boolean,message:string,data:any):$.java.util.Map;
                getSuccess(data:any):$.java.util.Map;
                /**
                 * ����������������ӿڵķ�������
                 *
                 * @param response ��������
                 * @return �������
                 */
                parseBatchVersionChangeRespData(response:kd.hr.hbp.business.domain.model.newhismodel.HisResponse):$.java.util.Map;
                /**
                 * �������÷�ʱ������ӿڵķ�������
                 *
                 * @param response ��������
                 * @return �������
                 */
                parseImportRespData(response:kd.hr.hbp.business.domain.model.newhismodel.HisResponse):$.java.util.Map;
            }
            interface HisResponseParse_C extends HisResponseParse_S {
                new():HisResponseParse;
            }
            interface HisResponseParse$ {
            }
            type HisResponseParse_T = HisResponseParse_S & HisResponseParse$;
            interface HisResponseParse extends HisResponseParse_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.utils{
            interface InfoGroupApprovalUtil_S {
                /**
                 * ������ص��������ֶ�
                 *
                 * @param dynamicObjects ���������ֶ�
                 * @param dataRefId      ��ǰ�����ķ���ID
                 * @return �������ֶ�
                 */
                findDynamicObjects(dynamicObjects:$.kd.bos.dataentity.entity.DynamicObjectCollection,dataRefId:long):$.java.util.List;
                /**
                 * ��ȡ�������
                 *
                 * @param status
                 * @return
                 */
                getAuditResult(status:boolean):string;
                /**
                 * �Ƿ����ı��ֶ�
                 *
                 * @param dynamicObject �����ֶ���Ϣ
                 * @return true/false
                 */
                isAttach(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �Ƿ����ı��ֶ�
                 *
                 * @param dynamicObject �����ֶ���Ϣ
                 * @return true/false
                 */
                isText(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject):boolean;
            }
            interface InfoGroupApprovalUtil_C extends InfoGroupApprovalUtil_S {
                new():InfoGroupApprovalUtil;
            }
            interface InfoGroupApprovalUtil$ {
            }
            type InfoGroupApprovalUtil_T = InfoGroupApprovalUtil_S & InfoGroupApprovalUtil$;
            interface InfoGroupApprovalUtil extends InfoGroupApprovalUtil_T {
            }
            interface CommonUtil_S {
                /**
                 * �Ƿ����
                 *
                 * @param obj1 obj
                 * @param obj2 obj
                 * @param dateFormat form
                 * @return �Ƿ�
                 * @throws Exception �쳣
                 */
                customObjectEquals(obj1:any,obj2:any,dateFormat:string):boolean;
                /**
                 * �Ƿ�������ύ�������еĵ���
                 * @param view
                 * @return
                 */
                existAuditingEntry(view:$.kd.bos.form.IFormView):boolean;
                /**
                 * ����ռ�����ֶ�
                 *
                 * @return ռ�����ֶ�
                 */
                fullLineField():$.java.util.Set;
                /**
                 * �������֤�ĺ��������ǰ���֤�����ߵ�����
                 *
                 * @param
                 * @return -1(��ʾ�쳣) 0 (���֤����Ϊ��)
                 * @throws Exception
                 */
                getAgeForIdCard(idcard:string):number;
                /**
                 * �ж��ֶ��Ƿ���ڣ���������������ֶ�ֵ�㣬����ȥ0
                 *
                 * @param model model
                 * @param key ��ʶ
                 * @return BigDecimal
                 */
                getBigDecimalIfExist(model:$.kd.bos.entity.datamodel.IDataModel,key:string):$.java.math.BigDecimal;
                /**
                 * �ж��ֶ��Ƿ���ڣ���������������ֶ�ֵ�㣬����ȥ0
                 *
                 * @param model model
                 * @param key ��ʶ
                 * @param personId ��Աid
                 * @return BigDecimal
                 */
                getBigDecimalIfExist(model:$.kd.bos.entity.datamodel.IDataModel,key:string,personId:long,selProp:string):$.java.math.BigDecimal;
                /**
                 * ��ȡ��������
                 *
                 * @return �������ڸ�ʽ
                 */
                getBirthDayFromIdCard(idCard:string):Date;
                /**
                 * ��ȡ�û����ύ���Ѳ��ء������еĵ���
                 * @param personId
                 * @return
                 */
                getCurrentEntry(personId:long):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * ��ȡ�û����ύ���Ѳ��ء������еĵ���
                 * @param view
                 * @return
                 */
                getCurrentEntry(view:$.kd.bos.form.IFormView):$.kd.bos.dataentity.entity.DynamicObject[];
                /**
                 * �ж��Ƿ�Ϊ�������
                 *
                 * @param endDate ����
                 * @return �Ƿ����
                 */
                getMaxDate(endDate:Date):boolean;
                /**
                 * ��ȡ�Ա�
                 * 0=δ֪���Ա�,9=δ˵�����Ա�,2=Ů��,1=����
                 *
                 * @return int
                 */
                getSexFromIdCard(idCard:string):number;
                /**
                 * �ж��û��Ƿ�ӵ��ָ��ʵ��ָ��Ȩ����(ְ������/������ͼΪHR)
                 *
                 * @param entityName ʵ��
                 * @param permItemId Ȩ����ID
                 * @return ��֤��Ȩ��Ϊtrue ������Ϊfalse
                 * @description �Ƽ�ʹ�� ���Ƽ�����ָ����Ӧ��ID��Ȩ����ID
                 */
                hasPerm(entityName:string,permItemId:string):boolean;
                /**
                 * �ж��û��Ƿ�ӵ��ָ��ʵ��ָ��Ȩ����(ְ������/������ͼΪHR)
                 *
                 * @param entityName ʵ��
                 * @param permItemId Ȩ����ID
                 * @param appId      Ӧ��ID
                 * @return ��֤��Ȩ��Ϊtrue ������Ϊfalse
                 */
                hasPerm(entityName:string,permItemId:string,appId:string):boolean;
                /**
                 * �ж��û��Ƿ�ӵ��ָ��ʵ��ָ��Ȩ����(ְ������/������ͼΪHR)
                 *
                 * @param entityName ʵ��
                 * @param permItemId Ȩ����ID
                 * @param appId      ���IFormView���õ�APPID�����õ���Ϊ׼���ò�����appId
                 * @return ��֤��Ȩ��Ϊtrue ������Ϊfalse
                 */
                hasPerm(entityName:string,permItemId:string,appId:string,view:$.kd.bos.form.IFormView):boolean;
                /**
                 * �Ƿ��ǻ�����������
                 *
                 * @param baseDataClass   ������������
                 * @param classSimpleName ���ͼ��
                 * @return �Ƿ��ǻ�����������
                 */
                isBaseDataType(baseDataClass:$.java.lang.Class,classSimpleName:string):boolean;
                /**
                 * ��ǰ�����Ƿ���������
                 *
                 * @param tabList ��Ϣ���ֶ�
                 * @param view    ҳ��
                 * @return
                 */
                isCurrentDataExistBill(tabList:$.java.util.Map,view:$.kd.bos.form.IFormView):boolean;
                /**
                 * ��������ʽ�ж��ַ����Ƿ�ΪС��
                 *
                 * @param str
                 * @return
                 */
                isDecimal(str:string):boolean;
                /**
                 * �ֶ��Ƿ����
                 * @param key
                 * @return boolean
                 */
                isFieldExist(model:$.kd.bos.entity.datamodel.IDataModel,key:string):boolean;
                /**
                 * ��������ʽ�ж��ַ����Ƿ�Ϊ����
                 *
                 * @param str
                 * @return
                 */
                isNumeric(str:string):boolean;
                /**
                 * �����б��Ƿ����
                 *
                 * @param list1 ����
                 * @param list2 ����
                 * @return ���
                 */
                listEquals(list1:$.java.util.List,list2:$.java.util.List):boolean;
                /**
                 * listתstring
                 *
                 * @param list list
                 * @param separator �ָ�
                 * @return string
                 */
                listToString(list:$.java.util.List,separator:string):string;
                /**
                 * ����Ϊ��
                 *
                 * @param obj
                 * @return
                 */
                objIsEmpty(obj:any):boolean;
                /**
                 * �ж��û��Ƿ�ӵ��ָ��ʵ��ָ��Ȩ����(ְ������/������ͼΪHR)
                 *
                 * @param view ʵ��
                 * @param permItemId Ȩ����ID
                 * @param evt evt
                 * @param currentPage 2���и�ҳ�� 1���ǵ�ǰҳ�� 0 ��û�е���ĵ�ǰҳ��
                 * @return ��֤��Ȩ��Ϊtrue ������Ϊfalse
                 */
                permShowClickError(view:$.kd.bos.form.IFormView,permItemId:string,evt:$.kd.bos.form.control.events.BeforeClickEvent,currentPage:string):boolean;
            }
            interface CommonUtil_C extends CommonUtil_S {
                new():CommonUtil;
            }
            interface CommonUtil$ {
            }
            type CommonUtil_T = CommonUtil_S & CommonUtil$;
            interface CommonUtil extends CommonUtil_T {
            }
            interface IDCardUtils_S {
                /**
                 * checkIDCard
                 *
                 * @param idCardNo idCardNo
                 * @return boolean
                 */
                checkIDCard(idCardNo:string):boolean;
                /**
                 * ��18λ/17λ���֤�����У��λ
                 *
                 * @param idCardNO idCardNO
                 * @return String
                 */
                getCheckDigit18(idCardNO:string):string;
                /**
                 * verify18
                 *
                 * @param idCardNo idCardNo
                 * @return boolean
                 */
                verify18(idCardNo:string):boolean;
            }
            interface IDCardUtils_C extends IDCardUtils_S {
                new():IDCardUtils;
            }
            interface IDCardUtils$ {
            }
            type IDCardUtils_T = IDCardUtils_S & IDCardUtils$;
            interface IDCardUtils extends IDCardUtils_T {
            }
            interface ComboItemUtil_S {
                /**
                 *  ValueMapItem ת�� ComboItem
                 *
                 * @param list ValueMapItem���󼯺�
                 * @return ComboItem���󼯺�
                 */
                changeToComboItem(list:$.java.util.List):$.java.util.List;
                /**
                 * ͨ��value����������ѡ��
                 * @param pageNumber   ҳ��Ԫ��
                 * @param field        �ֶ���
                 * @param value         ֵ
                 * @return
                 */
                findByVaue(pageNumber:string,field:string,value:string):$.kd.bos.metadata.entity.commonfield.ComboItem;
                /**
                 *  ��ȡ�������ȫ��ֵ
                 *
                 * @param pageNumber ҳ��Ԫ��
                 * @param field �ֶ���
                 * @return ����ֵitem
                 */
                getComboItem(pageNumber:string,field:string):$.java.util.List;
            }
            interface ComboItemUtil_C extends ComboItemUtil_S {
                new():ComboItemUtil;
            }
            interface ComboItemUtil$ {
            }
            type ComboItemUtil_T = ComboItemUtil_S & ComboItemUtil$;
            interface ComboItemUtil extends ComboItemUtil_T {
            }
            interface PropertyHelper_S {
                /**
                 * �����Ƿ��������
                 *
                 * @param obj obj
                 * @param key key
                 * @return boolean
                 */
                existProperty(obj:$.kd.bos.dataentity.entity.DynamicObject,key:string):boolean;
                /**
                 * �����Ƿ��������
                 *
                 * @param pageNumber ҳ���ʶ
                 * @param key key
                 * @return boolean
                 */
                existProperty(pageNumber:string,key:string):boolean;
                /**
                 * ��ȡԭʼҳ����ֶοؼ�
                 *
                 * @param drawFormField ҳ��滭�ֶζ���
                 * @return Fieldԭʼҳ����ֶοؼ�
                 */
                getField(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.entity.commonfield.Field;
                /**
                 * ��ȡ������ֵ
                 *
                 * @param dy        ��̬����
                 * @param fieldName �ֶ���
                 * @return
                 */
                getMultiLanguageValue(dy:$.kd.bos.dataentity.entity.DynamicObject,fieldName:string):string;
                /**
                 * ��ȡֵ
                 *
                 * @param obj obj
                 * @param key key
                 * @return ֵ
                 */
                getProperty(obj:$.kd.bos.dataentity.entity.DynamicObject,key:string):any;
                /**
                 * ���ö������ֶ�
                 *
                 * @param cnfDy ��������������
                 * @param langDbField �������ֶ�
                 * @param langField �������ֶε�����
                 */
                setLanguage(cnfDy:$.kd.bos.dataentity.entity.DynamicObject,langDbField:string,langField:string):string;
                /**
                 * ���ö������ֶ�
                 *
                 * @param cnfDy ��������������
                 * @param langDbField �������ֶ�
                 */
                setLanguageField(cnfDy:$.kd.bos.dataentity.entity.DynamicObject,langDbField:string):string;
            }
            interface PropertyHelper_C extends PropertyHelper_S {
                new():PropertyHelper;
            }
            interface PropertyHelper$ {
            }
            type PropertyHelper_T = PropertyHelper_S & PropertyHelper$;
            interface PropertyHelper extends PropertyHelper_T {
            }
            interface HrpiServiceOperateParam_S {
                /**
                 * ƴ����������
                 *
                 * @param serviceHelper           ʵ��������������
                 * @param dataEntity              ������
                 * @param dynamicObjectCollection ��װ���ݼ�
                 */
                getInvokeSave(serviceHelper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dynamicObjectCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * ƴ�Ӹ�������
                 *
                 * @param serviceHelper           ʵ��������������
                 * @param dataEntity              ������
                 * @param dbDy                    ���ݿ�����
                 * @param dynamicObjectCollection ��װ���ݼ�
                 */
                getInvokeUpdate(serviceHelper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject,dynamicObjectCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * ��������ʱʹ�õ�����
                 *
                 * @param serviceHelper ʵ��������������
                 * @param dataEntity    ������
                 * @return ʵ������
                 */
                getSaveDy(serviceHelper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,dataEntity:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ����༭ʱʹ�õ�����
                 *
                 * @param serviceHelper ʵ��������������
                 * @param dataEntity    ������
                 * @param dbDy          ���ݿ�����
                 * @return ʵ������
                 */
                getUpdateDy(serviceHelper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
            }
            interface HrpiServiceOperateParam_C extends HrpiServiceOperateParam_S {
                new():HrpiServiceOperateParam;
            }
            interface HrpiServiceOperateParam$ {
            }
            type HrpiServiceOperateParam_T = HrpiServiceOperateParam_S & HrpiServiceOperateParam$;
            interface HrpiServiceOperateParam extends HrpiServiceOperateParam_T {
            }
            interface BusinessUtils_S {
                /**
                 * ���������ѧ���л�
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                addHighestDegree(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection,old:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ��������֤��
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                addMajorDegree(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection,old:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * ͷ�񻺴����
                 *
                 * @param pkId
                 * @param attachKey
                 * @param newValue
                 * @param oldValue
                 * @param collection
                 * @param entityName
                 */
                addMapToCollect(view:$.kd.bos.form.IFormView,pkId:long,attachKey:string,newValue:any,oldValue:any,collection:$.java.util.List,entityName:string):void;
                /**
                 * ���ݸ����ֶ����ݹ��츽���������
                 *
                 * @param entityNum Ԫ���ݱ�ʶ
                 * @param attachObj    �����ֶ�����
                 * @return List<Map < String, Object>> �����������
                 */
                buildAttachmentDataFromEdit(entityNum:string,attachObj:$.java.util.Map):$.java.util.List;
                /**
                 * ������
                 *
                 * @param dateO
                 * @param dateT
                 * @return
                 */
                calcYearsDiff(dateO:Date,dateT:Date):$.java.math.BigDecimal;
                /**
                 * �������ޣ�����˾��ͬ��
                 * @param dbDy
                 * @param entityName
                 * @param saveOrUpdateMap
                 */
                changeAdjustTime(dbDy:$.kd.bos.dataentity.entity.DynamicObject,entityName:string,saveOrUpdateMap:$.java.util.Map,view:$.kd.bos.form.IFormView,isAdComTimeAudit:boolean,isAdWorkTimeAudit:boolean,isJoinWorkTimeAudit:boolean):void;
                /**
                 * ������Ϣ���μӹ�������ͬ��
                 * @param dbDy
                 * @param entityName
                 * @param saveOrUpdateMap
                 */
                changeBeginServiceDate(dbDy:$.kd.bos.dataentity.entity.DynamicObject,entityName:string,saveOrUpdateMap:$.java.util.Map,view:$.kd.bos.form.IFormView,audit:boolean):void;
                /**
                 * ������Ϣ���μӹ�������ͬ��(����ͨ����)
                 * @param dbDy ��ʱ��ʵ������
                 * @param newDy ��ʱ��ʵ������-������
                 * @param saveOrUpdateMap
                 * @param field ���ݷ�¼������
                 */
                changeBeginServiceDateAfterAudit(dbDy:$.kd.bos.dataentity.entity.DynamicObject,newDy:$.kd.bos.dataentity.entity.DynamicObject,saveOrUpdateMap:$.java.util.Map,field:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * У�������Ϣ���գ�����������Ϣ���ƶ��˺�PC��ͨ��
                 *
                 * @param view   ��ǰҳ��
                 * @param setAge �Ƿ�ͬ���޸�����
                 * @return
                 */
                checkBirthday(view:$.kd.bos.form.IFormView,setAge:boolean):boolean;
                checkHeight(view:$.kd.bos.form.IFormView):boolean;
                /**
                 * У������˵��ù�״̬��������ù���ֹ������true,����false
                 *
                 * @param personId ��Աid
                 * @return
                 */
                checkPersonLabrelstatus(personId:long):boolean;
                checkWorkage(startDateField:string,view:$.kd.bos.form.IFormView):boolean;
                /**
                 * ���ѧ���л�
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                closeHighestDegree(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection,old:$.kd.bos.dataentity.entity.DynamicObject):void;
                /**
                 * �ر���֤��
                 *
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                closeMajor(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * ��������ͷ��
                 *
                 * @param name
                 * @return
                 */
                createAvatar(name:string):string;
                /**
                 * �Ƿ�����Ч����Ч�����ֶ�����
                 *
                 * @param view          ҳ��view
                 * @param selectedField �Ƿ�����Чkey
                 * @param dateField     ��Ч����key
                 * @param isEditView    �Ƿ�༭�鿴ҳ�����ʱ��
                 */
                dateChangedAfterSelected(view:$.kd.bos.form.IFormView,selectedField:string,dateField:string,isEditView:boolean):void;
                /**
                 * ɾ������֤�����ݺ�Ĵ���
                 *
                 * @param entityName Ԫ����
                 * @param pk         ����
                 * @param view       ҳ��
                 * @return
                 */
                delData(entityName:string,pk:long,view:$.kd.bos.form.IFormView):void;
                /**
                 * ��������ɾ��֤��ʱɾ����������
                 *
                 * @param entityName ������
                 * @param id         ����ID
                 */
                deleteApprovalCache(entityName:string,id:long,view:$.kd.bos.form.IFormView):void;
                /**
                 * ���ݷ�¼ɾ��
                 *
                 * @param pkid ����
                 * @param view ҳ��
                 */
                deleteEntryEntity(pkid:long,view:$.kd.bos.form.IFormView):void;
                /**
                 * ���������ֶΣ�����Ϊ����̬,
                 *
                 * @param drawFormField ���ƶ���
                 * @return �Ƿ�����
                 */
                endDateEditLock(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):boolean;
                /**
                 * ��ȡ����˾���ҵ�����޵����뷽ʽ
                 * @return ���뷽ʽ
                 */
                getBusiYearRoundingMode():$.java.math.RoundingMode;
                /**
                 * ��ȡ�������¿���������
                 *
                 * @param key ҵ������
                 * @return ���ؽ��
                 */
                getBusinessValueByKey(key:string):string;
                /**
                 * ��ȡ����֤��id
                 *
                 * @param view
                 * @param pkid
                 * @return
                 */
                getCertIds(view:$.kd.bos.form.IFormView,pkid:long):$.java.util.List;
                /**
                 * �ļ���ʱ����ת��������
                 *
                 * @param attachObj ����
                 * @return url
                 */
                getDownUrl(attachObj:$.kd.bos.dataentity.entity.DynamicObject):string;
                /**
                 * ���ݽ���id��ȡ����֤��ID
                 *
                 * @param eduId ��������id
                 * @return
                 */
                getEduCertIdByEduId(eduId:long):$.java.util.List;
                /**
                 * ���ݽ���id��ȡ����֤��ID
                 *
                 * @param eduIdList ��������id����
                 * @return
                 */
                getEduCertIdByEduId(eduIdList:$.java.util.List):$.java.util.List;
                /**
                 * ���ݽ���֤��id��ȡ��������
                 *
                 * @param eduCertId ����֤��id
                 * @return
                 */
                getEduexpByEduCertId(eduCertId:long):long;
                /**
                 * ��ȡ��ʷ���ŷ������ޣ��������ְ����
                 *
                 * @param personId ��Աid
                 * @return
                 */
                getHisComserCount(personId:long):$.java.math.BigDecimal;
                /**
                 * �л�����䶯�˵������� 0:��ʾ�ɵģ� 1:��ʾ�µģ� 2:����ʾ
                 * @return �Ƿ���ʾ
                 */
                getHpfsMenuConfig():string;
                /**
                 * ��ȡ�����ֶ�
                 *
                 * @return �����ֶμ���
                 */
                getIgnoreField():$.java.util.Set;
                /**
                 * ������dy
                 *
                 * @param helper
                 * @param oldDy
                 * @return
                 */
                getNewDynamicObject(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,oldDy:$.kd.bos.dataentity.entity.DynamicObject):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ѯ��Ա��ʱ������Ṥ���ֶ�
                 *
                 * @param personId ��Աid
                 * @return DynamicObject
                 */
                getPerserlen(personId:long):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡ������������ֶ�
                 *
                 * @param personId personid
                 * @param keyName ��ȡ���ֶ�
                 * @return BigDecimal
                 */
                getPerserlenByPersonId(personId:long,keyName:string):$.java.math.BigDecimal;
                /**
                 * ��ȡ������������ֶ�
                 *
                 * @param personId personid
                 * @param keyName ��ȡ���ֶ�
                 * @return BigDecimal
                 */
                getPerserlenDateByPersonId(personId:long,keyName:string):Date;
                getReviseButtonVisible(view:$.kd.bos.form.IFormView):boolean;
                /**
                 * ��ȡ��Ա�����ϵ��޶���ť������
                 * @return �Ƿ���ʾ
                 */
                getReviseButtonVisibleForErmanFile():boolean;
                /**
                 * ��ְӦ��/��ְӦ���µĵ����Ƿ�չʾ�޶���ť�Ĳ���
                 * @return �Ƿ���ʾ
                 */
                getReviseButtonVisibleInOtherAppId():boolean;
                /**
                 * �޶�����֧�ֵ�ʵ��
                 *
                 * @return ֧�ֵ�ʵ��List
                 */
                getReviseSupportEntityNumberList():$.java.util.List;
                /**
                 * �㱨��ϵ��ʾ��
                 *
                 * @return ��̨��ʾ������
                 */
                getSuperiorHint():string;
                /**
                 * ���ݸ����ֶ����ݹ��츽���������
                 *
                 * @param entityNum Ԫ���ݱ�ʶ
                 * @param attachObj    �����ֶ�����
                 * @return List<Map < String, Object>> �����������
                 */
                getTempUrl(entityNum:string,attachObj:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡ��ǰ�����ȫ����boid
                 *
                 * @param attachMap ����
                 * @param genPkId �Ƿ��������I
                 * @return set
                 */
                getUpdateBoIdGenPkId(attachMap:$.java.util.Map,genPkId:boolean):$.java.util.Set;
                /**
                 * ��ȡ��Ա�����ϵ��޸İ�ť������
                 * @return �Ƿ���ʾ
                 */
                getUpdateButtonVisibleForErmanFile():boolean;
                /**
                 * �Ƿ�������ù���ֹ��Ա��������Ϣ����ά��
                 * @return
                 */
                isAllowInfoClassifyEdit():boolean;
                /**
                 * У������
                 *
                 * @param email ����
                 * @return �ɹ���ʧ��
                 */
                isEmail(email:string):boolean;
                /**
                 * �ֶ��Ƿ����
                 *
                 * @param key
                 * @return
                 */
                isFieldExist(view:$.kd.bos.form.IFormView,key:string):boolean;
                /**
                 * �ж�ҳ���Ƿ�ΪPC�˵���ҳ��
                 *
                 * @param pageId
                 * @return
                 */
                isPCFilePage(pageId:string):boolean;
                /**
                 * �ɵ����ѧ����ɷ����ѧ��
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                openHighestDegree(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * ����֤��
                 *
                 * @param helper
                 * @param personId
                 * @param updateCollection
                 */
                openMajor(helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper,personId:long,updateCollection:$.kd.bos.dataentity.entity.DynamicObjectCollection):void;
                /**
                 * ��ѯְ��ְ�ȵ�������䶯���õı䶯����id
                 *
                 * @return ���ò���id
                 */
                queryEmpJobRelActionId():long;
                /**
                 * ����url
                 * @param attachmentFileService attachmentFileService
                 * @param tempFileCache tempFileCache
                 * @param attachment ������Ϣ
                 */
                reSetAttachmentUrl(attachmentFileService:$.kd.bos.fileservice.FileService,tempFileCache:$.kd.bos.cache.TempFileCache,attachment:$.java.util.Map):void;
                /**
                 * �ֶ���������
                 *
                 * @param field             �ֶ�
                 * @param includeCurrentDay �Ƿ������ǰ����
                 * @param isMax             �������/��С����
                 */
                setDateLimit(view:$.kd.bos.form.IFormView,field:string,includeCurrentDay:boolean,isMax:boolean):void;
                /**
                 * �ύ���������ݷ�¼�������valueֵת������
                 *
                 * @param obj
                 * @return
                 */
                typeChange(obj:any):any;
            }
            interface BusinessUtils_C extends BusinessUtils_S {
                new():BusinessUtils;
            }
            interface BusinessUtils$ {
            }
            type BusinessUtils_T = BusinessUtils_S & BusinessUtils$;
            interface BusinessUtils extends BusinessUtils_T {
            }
            interface HspmDateUtils_S {
                /**
                 * ���㴫�������뵱ǰ���ڵĲ�
                 * ��ǰ���ڱȴ������ڴ�
                 *
                 * @param date ����������
                 * @return ��ֵ
                 */
                dateDiff(date:Date):$.java.math.BigDecimal;
                /**
                 * ��ȡ�������һ��
                 * @return
                 */
                getLastSecond():Date;
                /**
                 * ��ȡ���һ��
                 * @param date
                 * @return
                 */
                getLastSecond(date:Date):Date;
                /**
                 * ��ȡ�����������ֵ
                 *
                 * @return �����������ֵ
                 */
                getMaxEndDate():Date;
                /**
                 * ��ȡ�����賿����
                 * @return
                 */
                getMidnight():Date;
                /**
                 * ��ȡ�賿����
                 * @param date
                 * @return
                 */
                getMidnight(date:Date):Date;
            }
            type HspmDateUtils_ST = kd.hr.hbp.common.util.HRDateTimeUtils_S & HspmDateUtils_S;
            interface HspmDateUtils_C extends HspmDateUtils_ST {
                new():HspmDateUtils;
            }
            interface HspmDateUtils$ {
            }
            type HspmDateUtils_T = kd.hr.hbp.common.util.HRDateTimeUtils & HspmDateUtils_S & HspmDateUtils$;
            interface HspmDateUtils extends HspmDateUtils_T {
            }
            interface ParamAnalysisUtil_S {
                /**
                 * ��Ϣ���Ƿ�ͬʱ����ĳЩ�ֶΣ�ֻ֧�ֶ��б�
                 *
                 * @param tabList ����ͼ����
                 * @param fields   �ֶΣ�ȫ����
                 * @return
                 */
                exist(tabList:$.java.util.Map,...fields:string[]):boolean;
                /**
                 * ��ѯ�Ƿ���������ֶ�
                 *
                 * @param tabList ����ͼ����
                 * @return
                 */
                existAuditField(tabList:$.java.util.Map):boolean;
                /**
                 * ��ѯ�Ƿ���������ֶ� ����������
                 *
                 * @param tabList    ����ͼ����
                 * @param entityName ָ��Ԫ����
                 * @return
                 */
                existAuditField(tabList:$.java.util.Map,entityName:string):boolean;
                getDialogPageNumber(fields:$.java.util.List):string;
                getFields(group:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡȫ�ֶ���
                 *
                 * @param field �ֶ���Ϣ
                 * @return ȫ�ֶ���
                 */
                getFullFieldName(field:$.java.util.Map):string;
                /**
                 * ��ȡ��Ϣ������
                 *
                 * @param group ��Ϣ������
                 * @return ��Ϣ������
                 */
                getGroupName(group:$.java.util.Map):string;
                /**
                 * ��ȡָ�������������
                 *
                 * @param tabList    ��Ϣ������
                 * @param entityName ָ��hrpiԪ������
                 * @return ��Ϣ������
                 */
                getGroupName(tabList:$.java.util.Map,entityName:string):string;
                getGroups(tabList:$.java.util.Map):$.java.util.List;
                /**
                 *  ��ȡӳ��ҳ���ʶ
                 *
                 * @param tabList ��Ϣ����Ϣ
                 * @return ӳ��ҳ���ʶ
                 */
                getMappingFormId(tabList:$.java.util.Map):string;
                getPageNumber(fields:$.java.util.List):string;
                /**
                 *  ��ȡparams����
                 *
                 * @param formShowParameter FormShowParameter
                 * @return
                 */
                getParams(formShowParameter:$.kd.bos.form.FormShowParameter):$.java.util.Map;
                /**
                 * ��ȡ�漰����ԭʼҳ��
                 *
                 * @param tabList ��Ϣ����Ϣ
                 * @return ԭʼҳ��
                 */
                getRelateOriginalPage(tabList:$.java.util.Map):$.java.util.Set;
            }
            interface ParamAnalysisUtil_C extends ParamAnalysisUtil_S {
                new():ParamAnalysisUtil;
            }
            interface ParamAnalysisUtil$ {
            }
            type ParamAnalysisUtil_T = ParamAnalysisUtil_S & ParamAnalysisUtil$;
            interface ParamAnalysisUtil extends ParamAnalysisUtil_T {
            }
            interface DynamicPropUtil_S {
                /**
                 * �Ӷ�̬�������ݼ��л�ȡһ�����󣬸����޸�ʱ������ʱ��
                 *
                 * @param dynamicObjectList ��̬�������ݼ�
                 * @return ����ʱ�����Ķ�̬����
                 */
                getByMaxModifytime(dynamicObjectList:$.java.util.List):$.kd.bos.dataentity.entity.DynamicObject;
                /**
                 * ��ȡʵ��Ĳ�ѯ�ֶ�
                 *
                 * @param mainProperties ��ʵ����ֶ����ͼ�
                 * @param properties ʵ����ֶ����ͼ�
                 * @return ʵ��Ĳ�ѯ�ֶ�
                 */
                getSelectProperties(mainProperties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,properties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection):string;
                /**
                 * ��ȡ����ʵ��Ĳ�ѯ�ֶ�
                 *
                 * @param mainProperties ��ʵ����ֶ����ͼ�
                 * @param compareProperties �Ƚ�ʵ����ֶ����ͼ�
                 * @param properties ����ʵ����ֶ����ͼ�
                 * @param extraSelectProperties ����Ҫ��ѯ���ֶ�
                 * @return ����ʵ��Ĳ�ѯ�ֶ�
                 */
                getSelectProperties(mainProperties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,compareProperties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,properties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,extraSelectProperties:string):string;
                /**
                 * ��ȡ����ʵ��Ĳ�ѯ�ֶ�
                 *
                 * @param mainProperties ��ʵ����ֶ����ͼ�
                 * @param compareProperties �Ƚ�ʵ����ֶ����ͼ�
                 * @param properties ����ʵ����ֶ����ͼ�
                 * @param extraSelectProperties ����Ҫ��ѯ���ֶ�
                 * @param excludeProperties ��Ҫ���ų����ֶ�
                 * @return ����ʵ��Ĳ�ѯ�ֶ�
                 */
                getSelectProperties(mainProperties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,compareProperties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,properties:$.kd.bos.dataentity.metadata.clr.DataEntityPropertyCollection,extraSelectProperties:string,excludeProperties:string):string;
                /**
                 * ʱ������ʷģ�������ֶ�
                 *
                 * @return ʱ������ʷģ�������ֶ�
                 */
                hisTimeProperties():string;
            }
            interface DynamicPropUtil_C extends DynamicPropUtil_S {
                new():DynamicPropUtil;
            }
            interface DynamicPropUtil$ {
            }
            type DynamicPropUtil_T = DynamicPropUtil_S & DynamicPropUtil$;
            interface DynamicPropUtil extends DynamicPropUtil_T {
            }
            interface DynamicTransformUtil_S {
                /**
                 * ��ȡʵ������
                 *
                 * @param entityName ʵ������
                 * @return
                 */
                getAllDbPropString(entityName:string):string;
                /**
                 * ��ȡʵ������
                 *
                 * @param entityName ʵ������
                 * @returne
                 */
                getDynamicPropString(entityName:string):string;
                /**
                 * ��ȡʵ������
                 *
                 * @param entityName ʵ������
                 * @param ignoreKey  ��������
                 * @return
                 */
                getDynamicPropString(entityName:string,ignoreKey:$.java.util.Set):string;
                /**
                 * ����ֵ
                 *
                 * @param dataEntityType
                 * @param baseInstance
                 * @param keyValue  ��������ID����ΪLong
                 */
                setLocalProp(dataEntityType:$.kd.bos.entity.MainEntityType,baseInstance:$.kd.bos.dataentity.entity.DynamicObject,keyValue:$.java.util.Map$Entry):void;
            }
            interface DynamicTransformUtil_C extends DynamicTransformUtil_S {
                new():DynamicTransformUtil;
            }
            interface DynamicTransformUtil$ {
            }
            type DynamicTransformUtil_T = DynamicTransformUtil_S & DynamicTransformUtil$;
            interface DynamicTransformUtil extends DynamicTransformUtil_T {
            }
            interface InfoClassifyOpenWindowUtil_S {
                /**
                 * ����̨����ʷģ�͵�ʵ�嵼��ģ��
                 * ��ʱ������ʷ����
                 */
                openWindowForHisNonLineImportStartPage(view:$.kd.bos.mvc.list.ListView,importPlugin:string):$.kd.bos.form.FormShowParameter;
                /**
                 * ����б�������ť������
                 *
                 * @param infoClassifyEntityKeyDTO ҳ���ʶ
                 * @param caption ���������
                 * @return ������
                 */
                openWindowForListBtnNew(infoClassifyEntityKeyDTO:kd.sdk.hr.hspm.common.dto.InfoClassifyEntityKeyDTO,caption:string):$.kd.bos.form.FormShowParameter;
                /**
                 * ����б����ӵ����� --�༭
                 *
                 * @param pkId ����ID
                 * @param infoClassifyEntityKeyDTO ҳ���ʶ
                 * @param caption ���������
                 * @return ������
                 */
                openWindowForListHyperLink(pkId:long,infoClassifyEntityKeyDTO:kd.sdk.hr.hspm.common.dto.InfoClassifyEntityKeyDTO,caption:string):$.kd.bos.base.BaseShowParameter;
            }
            interface InfoClassifyOpenWindowUtil_C extends InfoClassifyOpenWindowUtil_S {
                new():InfoClassifyOpenWindowUtil;
            }
            interface InfoClassifyOpenWindowUtil$ {
            }
            type InfoClassifyOpenWindowUtil_T = InfoClassifyOpenWindowUtil_S & InfoClassifyOpenWindowUtil$;
            interface InfoClassifyOpenWindowUtil extends InfoClassifyOpenWindowUtil_T {
            }
            interface InfoClassifyPercreFieldUtil_S {
                readonly DEFAULT_OTHER_FIELD_LIST:$.java.util.List;
                readonly DEFAULT_SHOW:$.java.util.Set;
                readonly DEFAULT_TYPE_FIELD_MAP:$.java.util.Map;
                /**
                 * ʵʱ�����ֶμ�
                 *
                 * @return �ֶμ�
                 */
                buildFieldMap():$.java.util.Map;
                /**
                 * ʵʱ��ȡ�����ֶμ�
                 *
                 * @return �����ֶμ�
                 */
                buildOtherFieldList():$.java.util.List;
            }
            interface InfoClassifyPercreFieldUtil_C extends InfoClassifyPercreFieldUtil_S {
                new():InfoClassifyPercreFieldUtil;
            }
            interface InfoClassifyPercreFieldUtil$ {
            }
            type InfoClassifyPercreFieldUtil_T = InfoClassifyPercreFieldUtil_S & InfoClassifyPercreFieldUtil$;
            interface InfoClassifyPercreFieldUtil extends InfoClassifyPercreFieldUtil_T {
            }
            interface PermUtil_S {
                /**
                 * ��ѯ��ҵ����֯��Ȩ��
                 *
                 * @param userId �û�ID
                 * @param appId appId
                 * @param entityNumber ʵ��
                 * @param permItemId Ȩ����ID
                 * @return ��ѯ���
                 */
                getAllPermOrgs(userId:long,appId:string,entityNumber:string,permItemId:string):$.kd.bos.permission.api.HasPermOrgResult;
                /**
                 * ��ȡ����Ȩ��
                 *
                 * @param userId �û�ID
                 * @param appId appId
                 * @param entityNumber ʵ��
                 * @param permItemId Ȩ����ID
                 * @param customParam �Զ������
                 * @return ��ѯ����
                 */
                getDataRule(userId:long,appId:string,entityNumber:string,permItemId:string,customParam:$.java.util.Map):$.kd.bos.orm.query.QFilter;
                /**
                 * ��֤Ȩ��
                 *
                 * @param entityName ʵ����
                 * @param permItemId Ȩ��
                 * @return �Ƿ���Ȩ��
                 */
                hasPerm(entityName:string,permItemId:string):boolean;
            }
            interface PermUtil_C extends PermUtil_S {
                new():PermUtil;
            }
            interface PermUtil$ {
            }
            type PermUtil_T = PermUtil_S & PermUtil$;
            interface PermUtil extends PermUtil_T {
            }
            interface PageCacheUtils_S {
                /**
                 * ��ȡԱ������ҳ
                 *
                 *  @param formView ��ǰҳ��view
                 *  @return Ա������ҳ
                 */
                getHomePage(formView:$.kd.bos.form.IFormView):$.kd.bos.form.IFormView;
                /**
                 * ��ȡԱ������ҳcache
                 *
                 *  @param formView ��ǰҳ��view
                 *  @return Ա������ҳcache
                 */
                getHomePageCache(formView:$.kd.bos.form.IFormView):$.kd.bos.form.IPageCache;
                /**
                 * �����ֶλ���
                 *
                 *  @param collection
                 *  @param boid
                 *  @param fieldName
                 */
                removeDataIfNeedUpdate(collection:$.java.util.List,boid:long,fieldName:string,groupNumber:string):void;
                /**
                 * �ݴ�̬������ˢ��
                 *
                 * @param tempInfo   ��ǰ�ݴ����ݼ���
                 * @param resultMap  ��ǰҳ�汣����Ӧ
                 * @param field      �л������ֶ�
                 * @param newValue   �л����ֵ
                 * @param entityName ʵ��
                 * @param view       ��ǰҳ��
                 * @param helper     helper
                 */
                updateTempData(tempInfo:$.kd.bos.dataentity.entity.DynamicObject[],resultMap:$.java.util.Map,field:string,newValue:any,entityName:string,view:$.kd.bos.form.IFormView,helper:kd.hr.hbp.business.servicehelper.HRBaseServiceHelper):void;
            }
            interface PageCacheUtils_C extends PageCacheUtils_S {
                new():PageCacheUtils;
            }
            interface PageCacheUtils$ {
            }
            type PageCacheUtils_T = PageCacheUtils_S & PageCacheUtils$;
            interface PageCacheUtils extends PageCacheUtils_T {
            }
            interface ApprovalEntityUtils_S {
                /**
                 * ɾ���ݴ�����
                 *
                 * @param entryIdList ��¼id û��¼���ô� Ŀǰֻ�н���������Ҫ
                 * @param entry ����
                 * @param pkid  ������id
                 * @param isFromBill �Ƿ���ƶ��˵��ݽ������ true�ǡ�false��
                 */
                dealDataAfterDeleteEntry(entryIdList:$.java.util.List,entry:$.kd.bos.dataentity.entity.DynamicObject,pkid:long,isFromBill:boolean):void;
                /**
                 * ��ʼ����˻���
                 *
                 * @param view ҳ��
                 */
                initCacheFromEntry(view:$.kd.bos.form.IFormView,infoGroupConfig:$.java.util.Map):void;
            }
            interface ApprovalEntityUtils_C extends ApprovalEntityUtils_S {
                new():ApprovalEntityUtils;
            }
            interface ApprovalEntityUtils$ {
            }
            type ApprovalEntityUtils_T = ApprovalEntityUtils_S & ApprovalEntityUtils$;
            interface ApprovalEntityUtils extends ApprovalEntityUtils_T {
            }
            interface DynamicPropValidateUtil_S {
                /**
                 * �ж������Ƿ������
                 *
                 * @param dataEntity ����������
                 * @param dbDy ���ݿ���������
                 * @return �Ƿ�ı�
                 */
                checkChanged(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject):boolean;
                /**
                 * �ж������Ƿ������
                 *
                 * @param dataEntity ����������
                 * @param dbDy ���ݿ���������
                 * @param dynamicPropString ƥ���Ƿ���������ֶμ�
                 * @return �Ƿ�ı�
                 */
                checkChanged(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject,dynamicPropString:string):boolean;
                /**
                 * �ж������Ƿ������,�����ر仯��δ�仯��map����
                 *
                 * @param dataEntity ����������
                 * @param dbDy ���ݿ���������
                 * @return �仯��δ�仯��map����
                 */
                checkChangedPropMap(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject):$.java.util.Map;
                /**
                 * �ж������Ƿ������
                 *
                 * @param dataEntity ����������
                 * @param dbDy ���ݿ���������
                 * @param dynamicPropString ƥ���Ƿ���������ֶμ�
                 * @return �仯��δ�仯��map����
                 */
                checkChangedPropMap(dataEntity:$.kd.bos.dataentity.entity.DynamicObject,dbDy:$.kd.bos.dataentity.entity.DynamicObject,dynamicPropString:string):$.java.util.Map;
                /**
                 * ȥ����β�ո�
                 * Ŀǰȥ���ַ����Ͷ������ַ�������β�ո�
                 *
                 * @param dataEntity ���������ݼ�
                 */
                trim(dataEntity:$.kd.bos.dataentity.entity.DynamicObject):void;
            }
            interface DynamicPropValidateUtil_C extends DynamicPropValidateUtil_S {
                new():DynamicPropValidateUtil;
            }
            interface DynamicPropValidateUtil$ {
            }
            type DynamicPropValidateUtil_T = DynamicPropValidateUtil_S & DynamicPropValidateUtil$;
            interface DynamicPropValidateUtil extends DynamicPropValidateUtil_T {
            }
            interface PersonModelUtil_S {
                /**
                 * ��ȡ����
                 *
                 * @param pageNumber Ԫ���ݱ�ʶ
                 * @return ����
                 */
                getClassification(pageNumber:string):kd.sdk.hr.hspm.common.enums.PersonModelClassificationEnum;
                /**
                 * ��ȡ������˶���
                 *
                 * @param pageNumber Ԫ���ݱ�ʶ
                 * @param values ֵ
                 * @return QFilter
                 */
                getQFilter(pageNumber:string,values:$.java.util.Map):$.kd.bos.orm.query.QFilter;
                /**
                 * ��ȡ������˶���
                 *
                 * @param pageNumber Ԫ���ݱ�ʶ
                 * @param values ֵ
                 * @return QFilter
                 */
                getQFilterForHeadArea(pageNumber:string,values:$.java.util.Map):$.kd.bos.orm.query.QFilter;
                /**
                 * �����Ĳ���Ա��Ϣ
                 *
                 * @param dynamicObject dy����
                 * @param values ֵ
                 */
                setPersonModelValue(dynamicObject:$.kd.bos.dataentity.entity.DynamicObject,values:$.java.util.Map):void;
            }
            interface PersonModelUtil_C extends PersonModelUtil_S {
                new():PersonModelUtil;
            }
            interface PersonModelUtil$ {
            }
            type PersonModelUtil_T = PersonModelUtil_S & PersonModelUtil$;
            interface PersonModelUtil extends PersonModelUtil_T {
            }
        }
        namespace kd.sdk.hr.hspm.common.vo{
            interface DefineSpecialVo_S {
            }
            interface DefineSpecialVo_C extends DefineSpecialVo_S {
                new():DefineSpecialVo;
                new(timeFlag:boolean,timeEdit:string,viewContractBut:string):DefineSpecialVo;
                new(timeFlag:boolean,timeOutBut:boolean,viewContractBut:string,headEdit:string):DefineSpecialVo;
                new(timeFlag:boolean,timeEdit:string,timeDel:string,headEdit:string,headDel:string):DefineSpecialVo;
            }
            interface DefineSpecialVo$ {
                getHeadDel():string;
                getHeadEdit():string;
                getTimeDel():string;
                getTimeEdit():string;
                getTimeFlag():boolean;
                getViewContractBut():string;
                isTimeFlag():boolean;
                isTimeOutBut():boolean;
                setHeadDel(headDel:string):void;
                setHeadEdit(headEdit:string):void;
                setTimeDel(timeDel:string):void;
                setTimeEdit(timeEdit:string):void;
                setTimeFlag(timeFlag:boolean):void;
                setTimeOutBut(timeOutBut:boolean):void;
                setViewContractBut(viewContractBut:string):void;
            }
            type DefineSpecialVo_T = DefineSpecialVo_S & DefineSpecialVo$;
            interface DefineSpecialVo extends DefineSpecialVo_T {
            }
            interface CardViewCompareVo_S {
            }
            interface CardViewCompareVo_C extends CardViewCompareVo_S {
                new():CardViewCompareVo;
                new(headFields:string,textFields:string,contentFields:string):CardViewCompareVo;
                new(timeFields:string,headFields:string,textFields:string,contentFields:string):CardViewCompareVo;
                new(timeFields:string,headFields:string,textFields:string,contentFields:string,attachFields:string):CardViewCompareVo;
            }
            interface CardViewCompareVo$ {
                getAttachFields():string;
                getContentFields():string;
                getHeadFields():string;
                getTextFields():string;
                getTimeFields():string;
                setAttachFields(attachFields:string):void;
                setContentFields(contentFields:string):void;
                setHeadFields(headFields:string):void;
                setTextFields(textFields:string):void;
                setTimeFields(timeFields:string):void;
            }
            type CardViewCompareVo_T = CardViewCompareVo_S & CardViewCompareVo$;
            interface CardViewCompareVo extends CardViewCompareVo_T {
            }
            interface AfterCreatVo_S {
            }
            interface AfterCreatVo_C extends AfterCreatVo_S {
                new():AfterCreatVo;
                new(filedMap:$.java.util.Map,fieldAp:$.kd.bos.metadata.form.control.LabelAp,labType:string,dataMap:$.java.util.Map,mainAp:$.kd.bos.metadata.form.container.FlexPanelAp):AfterCreatVo;
            }
            interface AfterCreatVo$ {
                getDataMap():$.java.util.Map;
                getField():string;
                getFieldAp():$.kd.bos.metadata.form.control.LabelAp;
                getFiledMap():$.java.util.Map;
                getLabType():string;
                getMainAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                getStyle():$.kd.bos.metadata.form.Style;
                setDataMap(dataMap:$.java.util.Map):void;
                setField(field:string):void;
                setFieldAp(fieldAp:$.kd.bos.metadata.form.control.LabelAp):void;
                setFiledMap(filedMap:$.java.util.Map):void;
                setLabType(labType:string):void;
                setMainAp(mainAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                setStyle(style:$.kd.bos.metadata.form.Style):void;
            }
            type AfterCreatVo_T = AfterCreatVo_S & AfterCreatVo$;
            interface AfterCreatVo extends AfterCreatVo_T {
            }
            interface QueryDbVo_S {
            }
            interface QueryDbVo_C extends QueryDbVo_S {
                new():QueryDbVo;
                new(filters:$.kd.bos.orm.query.QFilter[],fields:$.java.util.List,entityId:string):QueryDbVo;
                new(filters:$.kd.bos.orm.query.QFilter[],fields:$.java.util.List,entityId:string,setToList:boolean):QueryDbVo;
                new(filters:$.kd.bos.orm.query.QFilter[],fields:$.java.util.List,entityId:string,orderBy:string):QueryDbVo;
            }
            interface QueryDbVo$ {
                getEntityId():string;
                getFields():$.java.util.List;
                getFilters():$.kd.bos.orm.query.QFilter[];
                getOrderBy():string;
                getSetToList():boolean;
                setEntityId(entityId:string):void;
                setFields(fields:$.java.util.List):void;
                setFilters(filters:$.kd.bos.orm.query.QFilter[]):void;
                setOrderBy(orderBy:string):void;
                setSetToList(setToList:boolean):void;
            }
            type QueryDbVo_T = QueryDbVo_S & QueryDbVo$;
            interface QueryDbVo extends QueryDbVo_T {
            }
            interface FieldTransVo_S {
            }
            interface FieldTransVo_C extends FieldTransVo_S {
                new():FieldTransVo;
                new(tabMap:$.java.util.Map,compareVo:CardViewCompareVo):FieldTransVo;
            }
            interface FieldTransVo$ {
                getCompareVo():CardViewCompareVo;
                getTabMap():$.java.util.Map;
                setCompareVo(compareVo:CardViewCompareVo):void;
                setTabMap(tabMap:$.java.util.Map):void;
            }
            type FieldTransVo_T = FieldTransVo_S & FieldTransVo$;
            interface FieldTransVo extends FieldTransVo_T {
            }
            interface TimeApVo_S {
            }
            interface TimeApVo_C extends TimeApVo_S {
                new():TimeApVo;
                new(dataMap:$.java.util.Map,contentAp:$.kd.bos.metadata.form.container.FlexPanelAp,index:number):TimeApVo;
                new(dataMap:$.java.util.Map,contentAp:$.kd.bos.metadata.form.container.FlexPanelAp,index:number,outIndex:number):TimeApVo;
            }
            interface TimeApVo$ {
                getContentAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                getDataMap():$.java.util.Map;
                getIndex():number;
                getOutIndex():number;
                setContentAp(contentAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                setDataMap(dataMap:$.java.util.Map):void;
                setIndex(index:number):void;
                setOutIndex(outIndex:number):void;
            }
            type TimeApVo_T = TimeApVo_S & TimeApVo$;
            interface TimeApVo extends TimeApVo_T {
            }
            interface PreBindDataVo_S {
            }
            interface PreBindDataVo_C extends PreBindDataVo_S {
                new():PreBindDataVo;
                new(dataMap:$.java.util.Map,view:$.kd.bos.mvc.form.FormView,formShowParameter:$.kd.bos.form.FormShowParameter):PreBindDataVo;
            }
            interface PreBindDataVo$ {
                getDataMap():$.java.util.Map;
                getFormShowParameter():$.kd.bos.form.FormShowParameter;
                getView():$.kd.bos.mvc.form.FormView;
                setDataMap(dataMap:$.java.util.Map):void;
                setFormShowParameter(formShowParameter:$.kd.bos.form.FormShowParameter):void;
                setView(view:$.kd.bos.mvc.form.FormView):void;
            }
            type PreBindDataVo_T = PreBindDataVo_S & PreBindDataVo$;
            interface PreBindDataVo extends PreBindDataVo_T {
            }
            interface CardViewVo_S {
            }
            interface CardViewVo_C extends CardViewVo_S {
                new():CardViewVo;
                new(timeFields:$.java.util.List,headFields:$.java.util.List,textFields:$.java.util.List,contentFields:$.java.util.List,attachFields:$.java.util.List):CardViewVo;
            }
            interface CardViewVo$ {
                getAttachFields():$.java.util.List;
                getContentFields():$.java.util.List;
                getHeadFields():$.java.util.List;
                getTextFields():$.java.util.List;
                getTimeFields():$.java.util.List;
                /**
                 * �����ֶ�
                 *
                 * @param attachFields �ֶ�
                 */
                setAttachFields(attachFields:$.java.util.List):void;
                /**
                 * �����ֶ�
                 *
                 * @param contentFields �ֶ�
                 */
                setContentFields(contentFields:$.java.util.List):void;
                /**
                 * �����ֶ�
                 *
                 * @param headFields �ֶ�
                 */
                setHeadFields(headFields:$.java.util.List):void;
                /**
                 * �����ֶ�
                 *
                 * @param textFields �ֶ�
                 */
                setTextFields(textFields:$.java.util.List):void;
                /**
                 * �����ֶ�
                 *
                 * @param timeFields �ֶ�
                 */
                setTimeFields(timeFields:$.java.util.List):void;
            }
            type CardViewVo_T = CardViewVo_S & CardViewVo$;
            interface CardViewVo extends CardViewVo_T {
            }
            interface TextColorVo_S {
            }
            interface TextColorVo_C extends TextColorVo_S {
                new():TextColorVo;
                new(style:$.kd.bos.metadata.form.Style,labelAp:$.kd.bos.metadata.form.control.LabelAp,forColor:string,backColor:string,radius:string):TextColorVo;
            }
            interface TextColorVo$ {
                getBackColor():string;
                getForColor():string;
                getLabelAp():$.kd.bos.metadata.form.control.LabelAp;
                getRadius():string;
                getStyle():$.kd.bos.metadata.form.Style;
                setBackColor(backColor:string):void;
                setForColor(forColor:string):void;
                setLabelAp(labelAp:$.kd.bos.metadata.form.control.LabelAp):void;
                setRadius(radius:string):void;
                setStyle(style:$.kd.bos.metadata.form.Style):void;
            }
            type TextColorVo_T = TextColorVo_S & TextColorVo$;
            interface TextColorVo extends TextColorVo_T {
            }
            interface ContentApVo_S {
            }
            interface ContentApVo_C extends ContentApVo_S {
                new():ContentApVo;
                new(dataMap:$.java.util.Map,contentAp:$.kd.bos.metadata.form.container.FlexPanelAp,index:number,dataSize:number):ContentApVo;
                new(dataMap:$.java.util.Map,contentAp:$.kd.bos.metadata.form.container.FlexPanelAp,index:number,dataSize:number,outIndex:number):ContentApVo;
            }
            interface ContentApVo$ {
                getContentAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                getDataMap():$.java.util.Map;
                getDataSize():number;
                getFieldPanelAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                getIndex():number;
                getOutIndex():number;
                getSubFieldPanelAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                setContentAp(contentAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                setDataMap(dataMap:$.java.util.Map):void;
                setDataSize(dataSize:number):void;
                setFieldPanelAp(fieldPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
                setIndex(index:number):void;
                setOutIndex(outIndex:number):void;
                setSubFieldPanelAp(subFieldPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
            }
            type ContentApVo_T = ContentApVo_S & ContentApVo$;
            interface ContentApVo extends ContentApVo_T {
            }
            interface BeforeCreatVo_S {
            }
            interface BeforeCreatVo_C extends BeforeCreatVo_S {
                new():BeforeCreatVo;
                new(labMap:$.java.util.Map,relMap:$.java.util.Map,labType:string,dataMap:$.java.util.Map,index:number):BeforeCreatVo;
                new(labMap:$.java.util.Map,relMap:$.java.util.Map,labType:string,dataMap:$.java.util.Map,index:number,topLeftMainAp:$.kd.bos.metadata.form.container.FlexPanelAp):BeforeCreatVo;
            }
            interface BeforeCreatVo$ {
                getDataMap():$.java.util.Map;
                getIndex():number;
                getLabMap():$.java.util.Map;
                getLabType():string;
                getRelMap():$.java.util.Map;
                getTopLeftMainAp():$.kd.bos.metadata.form.container.FlexPanelAp;
                setDataMap(dataMap:$.java.util.Map):void;
                setIndex(index:number):void;
                setLabMap(labMap:$.java.util.Map):void;
                setLabType(labType:string):void;
                setRelMap(relMap:$.java.util.Map):void;
                setTopLeftMainAp(topLeftMainAp:$.kd.bos.metadata.form.container.FlexPanelAp):void;
            }
            type BeforeCreatVo_T = BeforeCreatVo_S & BeforeCreatVo$;
            interface BeforeCreatVo extends BeforeCreatVo_T {
            }
        }
        namespace kd.sdk.hr.hspm.formplugin.mobile.file.base{
            interface AbstractMobileFormDrawEdit_S {
            }
            type AbstractMobileFormDrawEdit_ST = $.kd.bos.form.plugin.AbstractMobFormPlugin & kd.sdk.hr.hspm.common.constants.DynConfigConstants_S & $.kd.bos.form.field.events.AfterF7SelectListener & kd.sdk.hr.hspm.common.constants.ScheduleDrawConstants_S & $.kd.bos.form.control.events.UploadListener & AbstractMobileFormDrawEdit_S;
            interface AbstractMobileFormDrawEdit_C extends AbstractMobileFormDrawEdit_ST {
                new():AbstractMobileFormDrawEdit;
            }
            interface AbstractMobileFormDrawEdit$ {
                /**
                 * ��ʵ�屣��
                 */
                acrossEntitySaveOrUpdate():void;
                delData(entityName:string,pk:long):$.kd.bos.dataentity.Tuple;
                /**
                 * ����ͼ��������Ϣ���ֶ���װ�ɹ涨�����ݸ�ʽ
                 *
                 * @param group ��Ϣ��
                 * @return �ֶ��б�
                 */
                formatFlexFields(group:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡ�����ֶ��б�
                 * ����ע��mainType�Ͱ�control
                 *
                 * @param params �ֶ���Ϣ
                 * @return �����ֶ��б�
                 */
                getAllFieldList(params:string):$.java.util.List;
                /**
                 * �Ƿ��ǵ��б�
                 *
                 * @return
                 */
                isSingleTable():boolean;
            }
            type AbstractMobileFormDrawEdit_T = $.kd.bos.form.plugin.AbstractMobFormPlugin & $.kd.bos.form.field.events.AfterF7SelectListener & kd.sdk.hr.hspm.common.constants.DynConfigConstants & kd.sdk.hr.hspm.common.constants.ScheduleDrawConstants & $.kd.bos.form.control.events.UploadListener & AbstractMobileFormDrawEdit_S & AbstractMobileFormDrawEdit$;
            interface AbstractMobileFormDrawEdit extends AbstractMobileFormDrawEdit_T {
            }
        }
        namespace kd.sdk.hr.hspm.formplugin.web.file.ermanfile.base{
            interface AbstractEntryEntityDrawEdit_S {
                readonly GROUP_CONTANIER_SUFFIX:string;
            }
            type AbstractEntryEntityDrawEdit_ST = kd.hr.hbp.formplugin.web.HRDataBaseEdit_S & AbstractEntryEntityDrawEdit_S;
            interface AbstractEntryEntityDrawEdit_C extends AbstractEntryEntityDrawEdit_ST {
                new():AbstractEntryEntityDrawEdit;
            }
            interface AbstractEntryEntityDrawEdit$ {
            }
            type AbstractEntryEntityDrawEdit_T = kd.hr.hbp.formplugin.web.HRDataBaseEdit & AbstractEntryEntityDrawEdit_S & AbstractEntryEntityDrawEdit$;
            interface AbstractEntryEntityDrawEdit extends AbstractEntryEntityDrawEdit_T {
            }
            interface AbstractFormDrawEdit_S {
            }
            type AbstractFormDrawEdit_ST = kd.sdk.hr.hspm.common.constants.DynConfigConstants_S & $.kd.bos.form.field.events.BeforeF7SelectListener & kd.hr.hbp.formplugin.web.HRDataBaseEdit_S & $.kd.bos.form.field.events.AfterF7SelectListener & kd.sdk.hr.hspm.common.constants.ScheduleDrawConstants_S & $.kd.bos.form.control.events.UploadListener & AbstractFormDrawEdit_S;
            interface AbstractFormDrawEdit_C extends AbstractFormDrawEdit_ST {
                new():AbstractFormDrawEdit;
            }
            interface AbstractFormDrawEdit$ {
                /**
                 * ��ʵ�屣��
                 */
                acrossEntitySaveOrUpdate():void;
                /**
                 * ����ͼ��������Ϣ���ֶ���װ�ɹ涨�����ݸ�ʽ
                 *
                 * @param group   ��Ϣ��
                 * @param tabList
                 * @return �ֶ��б�
                 */
                formatFlexFields(group:$.java.util.Map,tabList:$.java.util.Map):$.java.util.List;
                /**
                 * ��ȡ�����ֶ��б�
                 * ����ע��mainType�Ͱ�control
                 *
                 * @param params �ֶ���Ϣ
                 * @return �����ֶ��б�
                 */
                getAllFieldList(params:string):$.java.util.List;
                /**
                 * ��ѯ��ʷ����
                 *
                 * @param baseEntityName ����ҳ��
                 * @param employeeId ��ҵ��id
                 * @param queryRevise �Ƿ��ѯ
                 * @return ���ض�Ӧ������
                 */
                getHisVersions(baseEntityName:string,employeeId:long,queryRevise:boolean,containsCurVersion:boolean):$.kd.bos.dataentity.entity.DynamicObject[];
            }
            type AbstractFormDrawEdit_T = kd.hr.hbp.formplugin.web.HRDataBaseEdit & $.kd.bos.form.field.events.AfterF7SelectListener & kd.sdk.hr.hspm.common.constants.DynConfigConstants & kd.sdk.hr.hspm.common.constants.ScheduleDrawConstants & $.kd.bos.form.control.events.UploadListener & $.kd.bos.form.field.events.BeforeF7SelectListener & AbstractFormDrawEdit_S & AbstractFormDrawEdit$;
            interface AbstractFormDrawEdit extends AbstractFormDrawEdit_T {
            }
            interface AbstractCardDrawEdit_S {
            }
            type AbstractCardDrawEdit_ST = kd.sdk.hr.hspm.common.constants.AttachConstants_S & $.kd.bos.form.plugin.AbstractFormPlugin & AbstractCardDrawEdit_S;
            interface AbstractCardDrawEdit_C extends AbstractCardDrawEdit_ST {
                new():AbstractCardDrawEdit;
                new(cardViewVo:kd.sdk.hr.hspm.common.vo.CardViewVo):AbstractCardDrawEdit;
            }
            interface AbstractCardDrawEdit$ {
                /**
                 * ������Ϣ
                 *
                 * @param index             index
                 * @param attachPanelAp     attachPanelAp
                 * @param attachments       attachments
                 * @param filedMap          filedMap
                 * @param idx               idx
                 * @param isImageAttachment isImageAttachment
                 * @param page              page
                 * @param dataMap           dataMap
                 */
                createAttContentAp(index:number,attachPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp,attachments:$.java.util.List,filedMap:$.java.util.Map,idx:number,isImageAttachment:boolean,page:string,dataMap:$.java.util.Map):void;
                getCardViewVo():kd.sdk.hr.hspm.common.vo.CardViewVo;
                getDataList():$.java.util.List;
                getTimeMap():$.java.util.Map;
                setCardViewVo(cardViewVo:kd.sdk.hr.hspm.common.vo.CardViewVo):void;
                /**
                 * ������
                 *
                 * @param dataList data
                 */
                setDataList(dataList:$.java.util.List):void;
                setTimeMap(timeMap:$.java.util.Map):void;
            }
            type AbstractCardDrawEdit_T = $.kd.bos.form.plugin.AbstractFormPlugin & kd.sdk.hr.hspm.common.constants.AttachConstants & AbstractCardDrawEdit_S & AbstractCardDrawEdit$;
            interface AbstractCardDrawEdit extends AbstractCardDrawEdit_T {
            }
            interface CommonSingleFormDrawEdit_S {
            }
            type CommonSingleFormDrawEdit_ST = AbstractFormDrawEdit_S & CommonSingleFormDrawEdit_S;
            interface CommonSingleFormDrawEdit_C extends CommonSingleFormDrawEdit_ST {
                new():CommonSingleFormDrawEdit;
            }
            interface CommonSingleFormDrawEdit$ {
            }
            type CommonSingleFormDrawEdit_T = AbstractFormDrawEdit & CommonSingleFormDrawEdit_S & CommonSingleFormDrawEdit$;
            interface CommonSingleFormDrawEdit extends CommonSingleFormDrawEdit_T {
            }
        }
        namespace kd.sdk.hr.hspm.formplugin.web.file.ermanfile.drawutil{
            interface ApControlService_S {
            }
            interface ApControlService_C extends ApControlService_S {
                new():ApControlService;
            }
            interface ApControlService$ {
                /**
                 * �����ֶ����ͣ�������ͬ���ֶ�control
                 *
                 * @param drawFormField �ֶζ���
                 * @return �ֶ�control
                 */
                createField(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.entity.commonfield.Field;
                /**
                 * �����ֶ����ͣ�������ͬ���ֶ�control
                 *
                 * @param drawFormField �ֶζ���
                 * @return �ֶ�control
                 */
                createMobileField(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.entity.commonfield.Field;
            }
            type ApControlService_T = ApControlService_S & ApControlService$;
            interface ApControlService extends ApControlService_T {
            }
            interface CustomDrawUtils_S {
                /**
                 * ��ȡ����
                 *
                 * @return ����
                 */
                getInstance():CustomDrawUtils;
            }
            interface CustomDrawUtils_C extends CustomDrawUtils_S {
                new():CustomDrawUtils;
            }
            interface CustomDrawUtils$ {
                /**
                 * �Ƿ��Զ�����ƿؼ�
                 *
                 * @param drawFormFieldDto drawFormFieldDto
                 * @return false :��ԭ���߼�����  true:�Զ����߼�
                 */
                customDrawField(drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.entity.commonfield.Field;
                /**
                 * �Ƿ��Զ���ע�� entitytype
                 *
                 * @param drawFormFieldDto drawFormFieldDto
                 * @param mainType mainType
                 * @return false :��ԭ���߼�����  true:�Զ����߼�
                 */
                customGetEntityTypeRegProps(drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto,mainType:$.kd.bos.entity.MainEntityType):boolean;
                /**
                 * @param args �¼�
                 * @param abstractFormDrawEdit  abstractFormDrawEdit
                 * @param drawFormFieldDto ���ö���
                 * @return false :��ԭ���߼�����  true:�Զ����߼�
                 */
                customOnGetControl(args:$.kd.bos.form.events.OnGetControlArgs,abstractFormDrawEdit:$.kd.bos.form.plugin.AbstractFormPlugin,drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):boolean;
            }
            type CustomDrawUtils_T = CustomDrawUtils_S & CustomDrawUtils$;
            interface CustomDrawUtils extends CustomDrawUtils_T {
            }
            interface TemplateEditUtils_S {
                readonly DRAWFIELD_TL:any;
                /**
                 * ���ö�ѡ�ֻ������϶���
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return ��ѡ
                 */
                MulBasedataEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.MulBasedataEdit;
                /**
                 * ����control
                 *
                 * @param key �ֶ�����
                 * @param field �ֶα�ʶ
                 * @param args �¼�
                 * @param abstractFormDrawEdit ���ҳ��
                 */
                addGetControl(key:string,field:string,args:$.kd.bos.form.events.OnGetControlArgs,abstractFormDrawEdit:$.kd.bos.form.plugin.AbstractFormPlugin):void;
                /**
                 * ����control
                 *
                 * @param key                        �ֶ�����
                 * @param field                      �ֶα�ʶ
                 * @param arg                        �¼�
                 * @param abstractMobileFormDrawEdit ���ҳ��
                 */
                addGetControlForMobile(key:string,field:string,arg:$.kd.bos.form.events.OnGetControlArgs,abstractMobileFormDrawEdit:kd.sdk.hr.hspm.formplugin.mobile.file.base.AbstractMobileFormDrawEdit):void;
                /**
                 * ���õ�ַ���Ϳؼ�
                 *
                 * @param key �ֶ���
                 * @param plugin ���
                 * @return ��������
                 */
                getAddressEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.AddressEdit;
                /**
                 * �������������ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getAdminDivisionEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.AdminDivisionEdit;
                /**
                 * ���������ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getAdminDivisionProp(displayName:string,apKey:string):$.kd.bos.entity.property.AdminDivisionProp;
                /**
                 * ���û������Ͽؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin ���
                 * @return ��������
                 */
                getBasedataEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.BasedataEdit;
                /**
                 * ���������ֶ�����
                 *
                 * @param entityProperty  ʵ������
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getBasedataProp(entityProperty:$.kd.bos.entity.property.BasedataProp,displayName:string,apKey:string):$.kd.bos.entity.property.BasedataProp;
                /**
                 * �������ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getBigIntProp(displayName:string,apKey:string):$.kd.bos.entity.property.BigIntProp;
                /**
                 * ��ѡ���ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getBooleanProp(displayName:string,apKey:string):$.kd.bos.entity.property.BooleanProp;
                /**
                 * �����ı��ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return ��ť
                 */
                getButtonAp(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.control.Button;
                /**
                 * ���������б��ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getComboEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.ComboEdit;
                /**
                 * �����б��ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getComboProp(displayName:string,apKey:string):$.kd.bos.entity.property.ComboProp;
                /**
                 * �������ؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return Container
                 */
                getContainer(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.container.Container;
                /**
                 * ���������ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getDateEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.DateEdit;
                /**
                 * �����ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getDateProp(displayName:string,apKey:string):$.kd.bos.entity.property.DateProp;
                /**
                 * ����С���ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getDecimalEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.DecimalEdit;
                /**
                 * ���ø�ѡ���ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getFieldEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.FieldEdit;
                /**
                 * �����ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getIntegerProp(displayName:string,apKey:string):$.kd.bos.entity.property.IntegerProp;
                /**
                 * ���ñ�ǩ�ؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return Label
                 */
                getLabel(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.control.Label;
                /**
                 * ���������ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getLongProp(displayName:string,apKey:string):$.kd.bos.entity.property.LongProp;
                /**
                 * �������ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getMuliLangTextProp(displayName:string,apKey:string):$.kd.bos.entity.property.MuliLangTextProp;
                /**
                 * ��֯
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return OrgEdit
                 */
                getOrgPropEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.OrgEdit;
                /**
                 * ����ͼƬ�ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return PictureEdit
                 */
                getPictureEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):kd.bos.form.field.PictureEdit;
                /**
                 * ͼƬ�ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getPictureProp(displayName:string,apKey:string):kd.bos.entity.property.PictureProp;
                /**
                 * �����ı��ֶοؼ�����
                 *
                 * @param key �ֶ���
                 * @param plugin plugin
                 * @return �ı�
                 */
                getTextEdit(key:string,plugin:$.kd.bos.form.plugin.AbstractFormPlugin):$.kd.bos.form.field.FieldEdit;
                /**
                 * �ı��ֶ�����
                 *
                 * @param displayName ��ʾ����
                 * @param apKey �ֶα�ʶkey
                 * @return �ֶ�����
                 */
                getTextProp(displayName:string,apKey:string):$.kd.bos.entity.property.TextProp;
            }
            interface TemplateEditUtils_C extends TemplateEditUtils_S {
                new():TemplateEditUtils;
            }
            interface TemplateEditUtils$ {
            }
            type TemplateEditUtils_T = TemplateEditUtils_S & TemplateEditUtils$;
            interface TemplateEditUtils extends TemplateEditUtils_T {
            }
            interface ApCreateUtils_S {
                readonly DRAW_THREAD:any;
                /**
                 * �����������¼�ֶ�ap
                 *
                 * @param drawFormField ��������
                 * @return �������¼�ֶ�ap
                 */
                createEntryFieldAp(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.form.control.EntryFieldAp;
                /**
                 * �����ֶ�ap
                 *
                 * @param drawFormField �ֶζ���
                 * @return �ֶ�ap
                 */
                createFieldAp(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.form.control.FieldAp;
                /**
                 * �����ֶμ�ap
                 *
                 * @param key ap��ʶ
                 * @return �ֶμ�ap
                 */
                createFieldPanelAp(key:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * �������ap
                 *
                 * @param key ��ʶ
                 * @param name ��ʶ
                 * @return ���ap
                 */
                createFlexAp(key:string,name:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ������ǩ
                 *
                 * @param labelKey key
                 * @param labelName name
                 * @return ��ǩ
                 */
                createLabelAp(labelKey:string,labelName:string):$.kd.bos.metadata.form.control.LabelAp;
                /**
                 * �����ֶ�ap
                 *
                 * @param drawFormField �ֶζ���
                 * @return �ֶ�ap
                 */
                createMobileFieldAp(drawFormField:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto):$.kd.bos.metadata.form.control.FieldAp;
                /**
                 * �������ap
                 *
                 * @param key ��ʶ
                 * @param name ��ʶ
                 * @return ���ap
                 */
                createNewFlexAp(key:string,name:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * �������ap
                 *
                 * @param key ��ʶ
                 * @param name ��ʶ
                 * @return ���ap
                 */
                createOriginalFlexAp(key:string,name:string):$.kd.bos.metadata.form.container.FlexPanelAp;
            }
            interface ApCreateUtils_C extends ApCreateUtils_S {
                new():ApCreateUtils;
            }
            interface ApCreateUtils$ {
            }
            type ApCreateUtils_T = ApCreateUtils_S & ApCreateUtils$;
            interface ApCreateUtils extends ApCreateUtils_T {
            }
            interface FieldContainerViewService_S {
                readonly BIG_880_FLEX:$.java.util.Set;
                readonly MIDDLE_554_FLEX:$.java.util.Set;
                readonly MIDDLE_600_FLEX:$.java.util.Set;
                readonly MIDDLE_600_SPEC_FLEX:$.java.util.Set;
            }
            interface FieldContainerViewService_C extends FieldContainerViewService_S {
                new():FieldContainerViewService;
            }
            interface FieldContainerViewService$ {
                drawAttachmentAp(drawFormFieldDto:kd.sdk.hr.hspm.common.dto.DrawFormFieldDto,source:string):$.kd.bos.metadata.form.control.AttachmentPanelAp;
                /**
                 * ��װflexҳ��
                 *
                 * @param drawFormFieldList �ֶ��б�
                 * @param key ����ʶ
                 * @param name name
                 * @param type type
                 * @param diffMap diffMap
                 * @param view ��ͼ
                 * @param fieldsetPanelAp ��ҳ�ֶ����
                 * @return ���
                 */
                redrawAdconAp(drawFormFieldList:$.java.util.List,key:string,name:string,type_arg:string,diffMap:$.java.util.Map,view:$.kd.bos.form.IFormView,fieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��װflexҳ��
                 *
                 * @param drawFormFieldList �ֶ��б�
                 * @param key ����ʶ
                 * @param name name
                 * @param type type
                 * @param diffMap diffMap
                 * @param view ��ͼ
                 * @param fieldsetPanelAp ��ҳ�ֶ����
                 * @return ���
                 */
                redrawAdconApForPic(dyArray:$.kd.bos.dataentity.entity.DynamicObject[],drawFormFieldList:$.java.util.List,key:string,name:string,type_arg:string,diffMap:$.java.util.Map,view:$.kd.bos.form.IFormView,fieldsetPanelAp:$.kd.bos.metadata.form.container.FlexPanelAp,dataid:long,groupNumber:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��װflexҳ��
                 *
                 * @param dyArray           ����
                 * @param drawFormFieldList �ֶ��б�
                 * @param key               ����ʶ
                 * @param groupNumber       ��Ϣ�����
                 * @param view              view
                 * @return ���
                 */
                redrawAdconApMobile(dyArray:$.kd.bos.dataentity.entity.DynamicObject[],view:$.kd.bos.form.IFormView,drawFormFieldList:$.java.util.List,key:string,name:string,type_arg:string,dataid:long,groupNumber:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��װflexҳ��
                 *
                 * @param dyArray ����
                 * @param drawFormFieldList �ֶ��б�
                 * @param key               ����ʶ
                 * @return ���
                 */
                redrawAdconApMobileEdit(dyArray:$.kd.bos.dataentity.entity.DynamicObject[],view:$.kd.bos.form.IFormView,drawFormFieldList:$.java.util.List,key:string,name:string,type_arg:string,dataid:long,groupNumber:string,status:string):$.kd.bos.metadata.form.container.FlexPanelAp;
                /**
                 * ��װflexҳ��
                 *
                 * @param dyArray ����
                 * @param drawFormFieldList �ֶ��б�
                 * @param key               ����ʶ
                 * @return ���
                 */
                redrawAdconApPCEdit(dyArray:$.kd.bos.dataentity.entity.DynamicObject[],view:$.kd.bos.form.IFormView,drawFormFieldList:$.java.util.List,key:string,name:string,type_arg:string,dataid:long,groupNumber:string,status:string):$.kd.bos.metadata.form.container.FlexPanelAp;
            }
            type FieldContainerViewService_T = FieldContainerViewService_S & FieldContainerViewService$;
            interface FieldContainerViewService extends FieldContainerViewService_T {
            }
            interface DynamicPanelUtils_S {
                /**
                 * ע��
                 *
                 * @param mainType mainType
                 * @param fieldList �ֶ�list
                 */
                registDynamicProps(mainType:$.kd.bos.entity.MainEntityType,fieldList:$.java.util.List):void;
                /**
                 * ע��
                 *
                 * @param mainType mainType
                 * @param fieldList �ֶ�list
                 * @param pageCache ��̬����
                 */
                registMobileDynamicProps(mainType:$.kd.bos.entity.MainEntityType,fieldList:$.java.util.List,pageCache:$.kd.bos.form.IPageCache):void;
            }
            interface DynamicPanelUtils_C extends DynamicPanelUtils_S {
                new():DynamicPanelUtils;
            }
            interface DynamicPanelUtils$ {
            }
            type DynamicPanelUtils_T = DynamicPanelUtils_S & DynamicPanelUtils$;
            interface DynamicPanelUtils extends DynamicPanelUtils_T {
            }
        }
        namespace kd.sdk.hr.hspm.formplugin.web.file.ermanfile.ext.template{
            interface ManagePCFullFormDrawEdit_S {
            }
            type ManagePCFullFormDrawEdit_ST = kd.sdk.hr.hspm.formplugin.web.file.ermanfile.base.AbstractFormDrawEdit_S & ManagePCFullFormDrawEdit_S;
            interface ManagePCFullFormDrawEdit_C extends ManagePCFullFormDrawEdit_ST {
                new():ManagePCFullFormDrawEdit;
            }
            interface ManagePCFullFormDrawEdit$ {
            }
            type ManagePCFullFormDrawEdit_T = kd.sdk.hr.hspm.formplugin.web.file.ermanfile.base.AbstractFormDrawEdit & ManagePCFullFormDrawEdit_S & ManagePCFullFormDrawEdit$;
            interface ManagePCFullFormDrawEdit extends ManagePCFullFormDrawEdit_T {
            }
        }
        namespace kd.sdk.hr.htm{
            interface SdkHRHtmModule_S {
            }
            type SdkHRHtmModule_ST = $.kd.sdk.module.Module & SdkHRHtmModule_S;
            interface SdkHRHtmModule_C extends SdkHRHtmModule_ST {
                new():SdkHRHtmModule;
            }
            interface SdkHRHtmModule$ {
            }
            type SdkHRHtmModule_T = $.kd.sdk.module.Module & SdkHRHtmModule_S & SdkHRHtmModule$;
            interface SdkHRHtmModule extends SdkHRHtmModule_T {
            }
        }
        namespace kd.sdk.hr.htm.business.mservice.helper{
            interface HTMQuitBillServiceHelper_S {
                /**
                 * ������ְ����
                 *
                 * @param quitBillObjs ��ְ����
                 * @return OperationResult
                 */
                createQuitBill(quitBillObjs:$.java.util.List):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * ͨ��id��ѯ��ְ��
                 *
                 * @param billId ����id
                 * @return ��ְ��map
                 */
                queryQuitBillById(billId:long):$.java.util.Map;
                /**
                 * �ύ����Ч��ְ����
                 *
                 * @param quitBillObjs ��ְ����
                 * @return OperationResult
                 */
                submitEffectiveQuitBill(quitBillObjs:$.java.util.List):$.kd.bos.entity.operate.result.OperationResult;
                /**
                 * �ύ��ְ����
                 *
                 * @param quitBillObjs ��ְ����
                 * @param applyType 0�������룬2Ա������
                 * @return OperationResult
                 */
                submitQuitBill(quitBillObjs:$.java.util.List,applyType:string):$.kd.bos.entity.operate.result.OperationResult;
            }
            interface HTMQuitBillServiceHelper_C extends HTMQuitBillServiceHelper_S {
                new():HTMQuitBillServiceHelper;
            }
            interface HTMQuitBillServiceHelper$ {
            }
            type HTMQuitBillServiceHelper_T = HTMQuitBillServiceHelper_S & HTMQuitBillServiceHelper$;
            interface HTMQuitBillServiceHelper extends HTMQuitBillServiceHelper_T {
            }
        }
    }
}
export {};