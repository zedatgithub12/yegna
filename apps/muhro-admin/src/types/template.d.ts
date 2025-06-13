interface MessageTemplates {
  id: number;
  name: string;
  body: string;
  created_at: string;
}

interface MessageTemplatesCreateProps {
  name: string;
  body: string;
}
