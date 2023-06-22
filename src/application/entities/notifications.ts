import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;
  private _id: string;
  constructor(
    props: Replace<
      NotificationProps,
      {
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }
  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content() {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category() {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
