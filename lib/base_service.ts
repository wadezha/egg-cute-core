import { Service, Context } from 'egg';
import Utils from './utils';
import { BaseEntity } from './base_entity';

interface Condition {
  where?: string;
  sort?: string;
}

/**
 * 服务基类
 */
export abstract class BaseService extends Service {

	entity: BaseEntity;
	private mysql: any;

	constructor(ctx: Context) {
		super(ctx);
		this.mysql = this.ctx.app['mysql'];
	}

  setEntity(entity: BaseEntity) {
    this.entity = entity;
	}

	/**
	 * 单表分页查询
	 * @param condition
	 * @param data
	 * @param entity
	 */
	async page(condition: Condition, data: any, entity?: BaseEntity): Promise<{
    rows: any;
    total: number;
	}> {
		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set.'); 
		}

		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error'); 
		}

		let sql = `select ${Object.keys(entity.values).map(m => Utils.toUnderLine(m)).join(',')}`;
		sql += ` from ${entity.name} `;

		if (condition && condition.where) {
			sql += ` where ${condition.where} `;
		}

		if (condition && condition.sort) {
			sql += ` order by ${condition.sort}`;
		}

		// 分页，导出
    return await this.mysql.page(sql, data);
	}

  /**
   * 数据列表
   */
  async list(condition: Condition, data: any, entity?: BaseEntity): Promise<any> {

		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set'); 
		}

		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error'); 
		}

		let sql = `select ${Object.keys(entity.values).map(m => Utils.toUnderLine(m)).join(',')}`;
		sql += ` from ${entity.name} `;

		if (condition && condition.where) {
			sql += ` where ${condition.where} `;
		}

		if (condition && condition.sort) {
			sql += ` order by ${condition.sort}`;
		}

    return await this.mysql.list(sql, data);
  }

  /**
   * 信息
   */
  async info(data: any, entity: BaseEntity): Promise<any> {

		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set'); 
		}

		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error');
		}

		const idFields = Object.keys(entity.values).filter(f => entity.values[f]['primaryKey']).map(m => `${Utils.toUnderLine(m)}=:${Utils.toUnderLine(m)}`);
		if (idFields.length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_ENTITY_ID') || 'The entity does not exist ID');
		}

		let sql = `select ${Object.keys(entity.values).map(m => Utils.toUnderLine(m)).join(',')}`;
		sql += ` from ${entity.name} `;
		sql += ` where ${idFields.join(' and ')} `;

		return await this.mysql.info(sql, data);
  }

  /**
   * 新增
   */
  async insert(list: any, entity: BaseEntity): Promise<any> {
		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set'); 
		}

		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error');
		}

		let fields = Object.keys(entity.values)
			.filter(f => entity.values[f]['fieldFill'] !== 'UPDATE' && !(entity.values[f]['primaryKey'] && entity.values[f]['autoIncrement']))
			.map(m => `${Utils.toUnderLine(m)}`);
		if (fields.length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_ENTITY_FIELDS') || 'The entity does not exist fields');
		}

		let sql = `insert into ${entity.name} (${fields.join(',')})`;
		sql += ` values (:${fields.join(',:')}) `;

		return await this.mysql.insert(sql, list);
  }

  /**
   * 修改
   */
  async update(data: any, entity: BaseEntity): Promise<any> {

		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set'); 
		}
		
		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error');
		}

		let fields = Object.keys(entity.values)
			.filter(f => entity.values[f]['fieldFill'] !== 'INSERT' && !entity.values[f]['primaryKey'])
			.map(m => `${Utils.toUnderLine(m)}=:${Utils.toUnderLine(m)}`);
		if (fields.length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_ENTITY_FIELDS') || 'The entity does not exist fields');
		}

		const idFields = Object.keys(entity.values).filter(f => entity.values[f]['primaryKey']).map(m => `${Utils.toUnderLine(m)}=:${Utils.toUnderLine(m)}`);
		if (idFields.length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_ENTITY_ID') || 'The entity does not exist ID');
		}

		let sql = `update ${entity.name} `;
		sql += ` set ${fields.join(',')} `;
		sql += ` where ${idFields.join(' and ')} `;

		return await this.mysql.update(sql, data);
  }

  /**
   * 删除
   */
  async delete(list: any, entity: BaseEntity): Promise<any> {

		entity = entity ? entity : this.entity;
    if (!entity) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_SET_ENTITY') || 'The entity is not set'); 
		}

		if (!entity.name || typeof entity.values !== 'object' || Object.keys(entity.values).length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_FORMAT') || 'The entity format is error');
		}

		const idFields = Object.keys(entity.values).filter(f => entity.values[f]['primaryKey']).map(m => `${Utils.toUnderLine(m)}=:${Utils.toUnderLine(m)}`);
		if (idFields.length === 0) {
			throw new Error(this.ctx.__('SYS_ERROR_NOT_ENTITY_ID') || 'The entity does not exist ID');
		}

		if (!list || (list instanceof Array && list.length === 0) || (typeof list !== 'object' && JSON.stringify(list) === '{}')) {
			throw new Error(this.ctx.__('SYS_ERROR_ENTITY_DATA') || 'The entity data is error');
		}

		let data = {};

		const idFieldStr = `(${idFields.join(' and ')})`;
		let sql = `delete from ${entity.name} where `;
		if (list instanceof Array && list.length > 1) {
			sql += list.map(m => {
				const idField = idFieldStr;
				Object.entries(m).forEach((k, v) => idField.replace(`:${Utils.toUnderLine(k)}`, m[v]));
				return idField;
			}).join(' or ');
		} else {
			data = list instanceof Array && list.length === 1 ? list[0] : list;
			sql += ` ${idFields.join(' and ')} `
		}

		return await this.mysql.delete(sql, data);
  }
}
