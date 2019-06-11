export class CreateDailyDto {
  readonly title: string;
  readonly user_id: number;
  readonly language_id: number;
  readonly body: string;
}

export class UpdateDailyDto {
  readonly title?: string;
  readonly user_id?: number;
  readonly language_id?: number;
  readonly body?: string;
}
export class ListAllEntities {}
