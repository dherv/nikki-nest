export class CreateWordsDto {
  readonly word: string;
  readonly translation: string;
  readonly ruby: string;
  readonly dailyId?: number;
}
