export type BannerType = {
  state: 'success' | 'fail';
  message: string;
};

export default function Banner({ banner: { state, message } }: { banner: BannerType }) {
  const isSuccess = state === 'success';
  const emoji = isSuccess ? '👍' : '🔥';

  return <div>{`${emoji} ${message}`}</div>;
}
