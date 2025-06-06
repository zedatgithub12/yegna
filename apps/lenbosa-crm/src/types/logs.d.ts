interface Logs {
  id: number;
  action: string;
  target: string;
  date: string;
  time: string;
}

interface getLogsProps {
  id: number;
  event: string;
  user: string;
  action: string;
  target: string;
  created_at: string;
  time: string;
}
