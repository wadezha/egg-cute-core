
import { Controller, Context } from 'egg';
import { Router } from 'egg-cute-router';
import { BaseService } from './base_service';
import { BaseEntity } from './base_entity';
import config from '../config/config.default';

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
export class BaseController extends Controller {

  private cuteService: BaseService;
  private entity: BaseEntity;
  private validator: any;

  private condition: Condition;
  private validateRule: ValidateRule;
  public configCore: any;

  protected constructor(ctx: Context) {
    super(ctx);
    this.init();
    this.validator = this.ctx.app['validator'];
    this.configCore = JSON.parse(JSON.stringify(config));
    Object.assign(this.configCore, ctx.app.config.cuteCore || {});
  }

  /**
   * 初始化
   */
  protected init(): void {

  }

  /**
   * 设置服务
   * @param service
   */
  protected setService(service: any) {
    this.cuteService = service;
    this.setEntity(this.entity);
  }

  protected setEntity(entity: any) {
    this.entity = entity;
  }

  protected setCondition(condition: Condition) {
    this.condition = condition;
  }

  protected setValidateRule(validateRule: ValidateRule) {
    this.validateRule = validateRule;
  }

  protected getQuery(): any {
    return this.ctx.request.query;
  }

  protected getBody(): any {
    return this.ctx.request.body;
  }

  protected getParam(): any {
    return Object.assign(this.getQuery(), this.getBody());
  }

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
  protected res(...args): void {
    let result = { code: this.configCore.code.success, msg: this.ctx.__(this.configCore.msg.success) || this.configCore.msg.success };
    if (args.length === 0) {
      this.ctx.body = result;
      return;
    }
    if (args.length > 0 && typeof args[0] === 'string' && args[0] === 'Fail') {
      result = { code: this.configCore.code.error, msg: this.ctx.__(this.configCore.msg.error) || this.configCore.msg.error };
      args.shift();
    }
    if (args.length === 1) {
      Object.assign(result, { data: args[0]});
    }
    if (args.length === 2) {
      Object.assign(result, { msg: args[0], data: args[1]});
    }
    if (args.length === 3) {
      Object.assign(result, { code: args[0], msg: args[1], data: args[2]});
    }
    this.ctx.body = result;
  }

  /**
   * 分页查询数据
   */
  @Router.get('/page', '分页')
  protected async page(): Promise<void> {
    if (this.validateRule && !this.validateRule.page) {
      await this.validator.validate(this.validateRule.page, this.getParam());
    }
    const data = await this.cuteService.page(this.condition, this.getParam(), this.entity);
    this.res(data);
  }

  /**
   * 数据列表
   */
  @Router.get('/list', '列表')
  protected async list(): Promise<void> {
    if (this.validateRule && !this.validateRule.list) {
      await this.validator.validate(this.validateRule.list, this.getParam());
    }
    const data = await this.cuteService.list(this.condition, this.getParam(), this.entity);
    this.res(data);
  }

  /**
   * 信息
   */
  @Router.get('/info', '信息')
  protected async info(): Promise<void> {
    if (this.validateRule && !this.validateRule.info) {
      await this.validator.validate(this.validateRule.info, this.getParam());
    }
    const data = await this.cuteService.info(this.getParam(), this.entity);
    this.res(data);
  }

  /**
   * 新增
   */
  @Router.post('/insert', '新增')
  protected async insert(): Promise<void> {
    if (this.validateRule && !this.validateRule.insert) {
      await this.validator.validate(this.validateRule.insert, this.getBody());
    }
    const data = await this.cuteService.insert(this.getBody(), this.entity);
    this.res(data);
    // this.res(data.insertId ? this.configCore.code.success : this.errorCode, this.ctx.__(this.configCore.msg.success) || 'success', data.insertId);
  }

  /**
   * 修改
   */
  @Router.post('/update', '修改')
  protected async update(): Promise<void> {
    if (this.validateRule && !this.validateRule.update) {
      await this.validator.validate(this.validateRule.update, this.getBody());
    }
    const data = await this.cuteService.update(this.getBody(), this.entity);
    this.res(data);
    // this.res(data.changedRows ? this.configCore.code.success : this.errorCode, this.ctx.__(this.configCore.msg.success) || 'success', data.changedRows);
  }

  /**
   * 删除
   */
  @Router.post('/delete', '删除')
  protected async delete(): Promise<void> {
    if (this.validateRule && !this.validateRule.delete) {
      await this.validator.validate(this.validateRule.delete, this.getBody());
    }
    const data = await this.cuteService.delete(this.getBody(), this.entity);
    this.res(data);
    // this.res(this.configCore.code.success, this.ctx.__(this.configCore.msg.success) || this.configCore.msg.success, data);
    // this.res(data.affectedRows ? this.configCore.code.success : this.errorCode, this.ctx.__(this.configCore.msg.success) || 'success', data.affectedRows);
  }
}
