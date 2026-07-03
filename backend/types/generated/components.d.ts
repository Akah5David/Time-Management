import type { Schema, Struct } from '@strapi/strapi';

export interface SocialLinksSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_social_links_social_links';
  info: {
    displayName: 'socialLinks';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

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
      'social-links.social-links': SocialLinksSocialLinks;
      'spiritual.messages': SpiritualMessages;
      'task.details': TaskDetails;
      'task.gospel': TaskGospel;
    }
  }
}
