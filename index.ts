
export * from "./lib/base_entity";
export * from "./lib/base_service";
export * from "./lib/base_controller";

interface CuteCoreOptions {
  code?: {
    success: Number,
    error: Number,
  };
  msg?: {
    success: string;
    error: string;
  };
  entityPath: string;
}

declare module 'egg' {
  interface EggAppConfig {
    cuteCore: CuteCoreOptions;
  }
}
