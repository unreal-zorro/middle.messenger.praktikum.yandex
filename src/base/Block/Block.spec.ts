import { expect } from 'chai';
import Sinon from 'sinon';
import { Block } from './Block';
import type { Props } from './Block';

describe('Block tests', () => {
  type BlockConstructor = new (props: Props) => Block;

  let BlockClass: BlockConstructor;

  before(() => {
    interface ButtonProps extends Props {
      text?: string;
    }

    class Button extends Block {
      constructor(props: ButtonProps) {
        super(props);
      }

      render(): string {
        return '<button>{{ text }}</button>';
      }

      componentDidUpdate(oldProps: ButtonProps, newProps: ButtonProps): boolean {
        if (oldProps.text !== newProps.text) {
          return true;
        }

        return false;
      }
    }

    BlockClass = Button;
  });

  it('should render props', async () => {
    const textData = 'Click';
    const buttonComponent = await new BlockClass({ text: textData });
    const result = (buttonComponent.getContent() as HTMLButtonElement)?.innerHTML;

    expect(result).to.be.eq(textData);
  });

  it('should handle click', async () => {
    const textData = 'Click';
    const handler = Sinon.stub();
    const buttonComponent = await new BlockClass({ text: textData, events: { click: handler } });

    const event = new MouseEvent('click');
    (buttonComponent.element as HTMLButtonElement)?.dispatchEvent(event);

    expect(handler.calledOnce).to.be.true;
  });

  it('should invoke _render', async () => {
    const textData = 'Click';
    const buttonComponent = await new BlockClass({ text: textData });
    const spyRender = Sinon.spy(buttonComponent, '_render' as keyof Block);
    const newText = 'New text';
    buttonComponent.setProps({ text: newText });

    expect(spyRender.calledOnce).to.be.true;
  });
});
