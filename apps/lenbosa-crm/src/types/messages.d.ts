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
