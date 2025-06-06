interface Attachment {
  id: string;
  filename: string;
  url: string;
}

interface MessageProps {
  id: string;
  title: string;
  category: string;
  message: string;
  attachments: Attachment[];
  created_at: string;
}

interface MessageCreateProps {
  recipients: string[];
  title: string;
  sms_gateway?: string;
  category_id: string;
  template?: string;
  message: string;
  attachments?: File[];
}
