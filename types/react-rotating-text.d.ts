declare module 'react-rotating-text' {
  interface RotatingTextProps {
    color?: string;
    cursor?: boolean;
    deletingInterval?: number;
    emptyPause?: number;
    eraseMode?: string;
    items: string[];
    pause?: number;
    typingInterval?: number;
    random?: boolean;
  }

  export default class ReactRotatingText extends React.Component<RotatingTextProps> {
    constructor(props: RotatingTextProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    _loop(loopingFunc: func, pause: number): void;
    _type(text: string, callback: any): void;
    _erase(callback: any): void;
    _overwrite(text: string, callback: any): void;
    _animate(): void;
    render(): React.ReactNode;
  }
}
