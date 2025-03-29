import { Controller, Context } from 'egg';
interface Condition {
    where?: string;
    sort?: string;
}
interface ValidateRule {
    page?: any;
    list?: any;
    info?: any;
    insert?: any;
    update?: any;
    delete?: any;
}
/**
 * 控制器基类
 */
export declare class BaseController extends Controller {
    private cuteService;
    private entity;
    private validator;
    private condition;
    private validateRule;
    configCore: any;
    protected constructor(ctx: Context);
    /**
     * 初始化
     */
    protected init(): void;
    /**
     * 设置服务
     * @param service
     */
    protected setService(service: any): void;
    protected setEntity(entity: any): void;
    protected setCondition(condition: Condition): void;
    protected setValidateRule(validateRule: ValidateRule): void;
    protected getQuery(): any;
    protected getBody(): any;
    protected getParams(): any;
    protected getAllParams(): any;
    protected getValidateParams(headerKeys?: string): any;
    /**
     * 返回数据
     * @param args[0] 返回配置
     * res('Fail', data)
     * res('Fail', 'error', data)
     * res('Fail', 1, 'error', data)
     * res(data)
     * res('success', data)
     * res(0, 'success', data)
     */
    protected res(...args: any[]): void;
    /**
     * 分页查询数据
     */
    protected page(): Promise<void>;
    /**
     * 数据列表
     */
    protected list(): Promise<void>;
    /**
     * 信息
     */
    protected info(): Promise<void>;
    /**
     * 新增
     */
    protected insert(): Promise<void>;
    /**
     * 修改
     */
    protected update(): Promise<void>;
    /**
     * 删除
     */
    protected delete(): Promise<void>;
}
export {};
