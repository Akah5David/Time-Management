import type { Schema, Struct } from '@strapi/strapi';

export interface SpiritualMessages extends Struct.ComponentSchema {
  collectionName: 'components_spiritual_messages';
  info: {
    displayName: 'Messages';
    icon: 'emotionUnhappy';
  };
  attributes: {
    preacher: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TaskDetails extends Struct.ComponentSchema {
  collectionName: 'components_task_details';
  info: {
    displayName: 'Details';
  };
  attributes: {
    age: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

export interface TaskGospel extends Struct.ComponentSchema {
  collectionName: 'components_task_gospels';
  info: {
    displayName: 'Gospel';
    icon: 'clock';
  };
  attributes: {
    titile: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'spiritual.messages': SpiritualMessages;
      'task.details': TaskDetails;
      'task.gospel': TaskGospel;
    }
  }
}
