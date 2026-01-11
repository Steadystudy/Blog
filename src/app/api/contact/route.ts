import sendEmail from '@/service/email';
import * as yup from 'yup';

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(req: Request) {
  // api에서 사용하는 req는 노드에서 사용하는 req와 동일하므로 req.body는 Readable Stream이다. 그래서 json으로 반환해줘야 함.
  const body = await req.json();

  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: '유효하지 않은 포맷' }), { status: 400 });
  }

  return sendEmail(body)
    .then(() => new Response(JSON.stringify({ message: '메일 보내기 성공!' }), { status: 200 }))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify({ message: '메일 보내기 실패!' }), { status: 500 });
    });
}
