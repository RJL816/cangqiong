/// <reference types="../../@cosmic/bos-script" />
declare global {
    namespace $ {
        namespace kd.sdk.macc.aca.extpoint{
            interface IActCostCalcLvlPlugin_S {
            }
            interface IActCostCalcLvlPlugin$ {
                /**
                 * �㼶�������ǰִ��
                 *
                 * @param index �㼶
                 * @param calcJson �������ʵ��
                 * @param params ҵ�����
                 */
                levelCalcAfter(index:number,calcJson:string,params:$.java.util.Map):void;
                /**
                 * �㼶���㿪ʼǰִ��
                 *
                 * @param index �㼶
                 * @param calcJson �������ʵ��
                 * @param params ҵ�����
                 */
                levelCalcBefore(index:number,calcJson:string,params:$.java.util.Map):void;
            }
            type IActCostCalcLvlPlugin_T = IActCostCalcLvlPlugin_S & IActCostCalcLvlPlugin$;
            interface IActCostCalcLvlPlugin extends IActCostCalcLvlPlugin_T {
            }
            interface IActCostCalcPlugin_S {
            }
            interface IActCostCalcPlugin$ {
                /**
                 * �ɱ��������ʱִ��
                 *
                 * @param calcJson �������ʵ��
                 */
                costCalcAfter(calcJson:string):void;
                /**
                 * �ɱ����㿪ʼǰִ��
                 *
                 * @param calcJson �������ʵ��
                 */
                costCalcBefore(calcJson:string):void;
            }
            type IActCostCalcPlugin_T = IActCostCalcPlugin_S & IActCostCalcPlugin$;
            interface IActCostCalcPlugin extends IActCostCalcPlugin_T {
            }
        }
        namespace kd.sdk.macc.cad.extpoint{
            interface IDealMatCostInfoAfterUpdate_S {
            }
            interface IDealMatCostInfoAfterUpdate$ {
                /**
                 * �ɱ����º󣬴������ϳɱ���Ϣ
                 * @param matCostIds ���ϳɱ���ϢID����
                 * @return ����ֵΪfalseʱ����Ա��θ��µ�������лع�����չ�������ɹ�����true
                 */
                dealMatCostInfoByIds(matCostIds:$.java.util.List):boolean;
            }
            type IDealMatCostInfoAfterUpdate_T = IDealMatCostInfoAfterUpdate_S & IDealMatCostInfoAfterUpdate$;
            interface IDealMatCostInfoAfterUpdate extends IDealMatCostInfoAfterUpdate_T {
            }
        }
    }
}
export {};