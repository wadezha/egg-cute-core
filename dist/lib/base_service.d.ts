import { Service, Context } from 'egg';
import { BaseEntity } from './base_entity';
interface Condition {
    where?: string;
    sort?: string;
}
/**
 * 服务基类
 */
export declare abstract class BaseService extends Service {
    entity: BaseEntity;
    private mysql;
    constructor(ctx: Context);
    setEntity(entity: BaseEntity): void;
    /**
     * 单表分页查询
     * @param condition
     * @param data
     * @param entity
     */
    page(condition: Condition, data: any, entity?: BaseEntity): Promise<{
        rows: any;
        total: number;
    }>;
    /**
     * 数据列表
     */
    list(condition: Condition, data: any, entity?: BaseEntity): Promise<any>;
    /**
     * 信息
     */
    info(data: any, entity: BaseEntity): Promise<any>;
    /**
     * 新增
     */
    insert(list: any, entity: BaseEntity): Promise<any>;
    /**
     * 修改
     */
    update(data: any, entity: BaseEntity): Promise<any>;
    /**
     * 删除
     */
    delete(list: any, entity: BaseEntity): Promise<any>;
}
export {};
