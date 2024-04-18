import './search.scss';
import { Block } from '@/base';
import type { Listener, Props } from '@/base';
import { Modal, type InputFieldProps, type ModalProps } from '@/modules';
import { Button, Link } from '@/components';
import type { ButtonProps, LinkProps } from '@/components';
import { VALIDATION_RULES } from '@/consts';
import { SearchForm } from './modules';
import type { SearchFormProps } from './modules';
import template from './search.hbs?raw';

export interface SearchProps extends Props {
  className?: string;
  controls?: InputFieldProps[];
  navLink?: LinkProps;
  button?: ButtonProps;
  searchForm?: SearchFormProps;
  addNewChatModal: ModalProps;
  visibleAddNewChatModal?: boolean;
  typeAddNewChatModal?: string;
  state?: Indexed<Indexed<unknown>>;
  keydownSearchHandler?: Listener;
  addNewChatClickHandler?: Listener;
}

export class Search extends Block {
  constructor(props: SearchProps) {
    super(props);
  }

  public submitSearchHandler: Listener<Record<string, string>[]> = (data) => {
    if (this.props.keydownSearchHandler) {
      (this.props.keydownSearchHandler as Listener)(data);
    }
  };

  public buttonClickHandler: Listener = () => {
    this.setProps({
      visibleAddNewChatModal: true
    });
  };

  public submitAddNewChatModalHandler: Listener<Record<string, string>> = (formData) => {
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const { regExp } = VALIDATION_RULES[key];
      isValid = isValid && regExp.test(value);
    });

    if (isValid) {
      this.setProps({
        visibleAddNewChatModal: false
      });

      if (this.props.addNewChatClickHandler) {
        (this.props.addNewChatClickHandler as Listener)(formData);
      }
    } else {
      console.log('Invalid form data');
    }
  };

  public closeAddNewChatModalHandler: Listener = () => {
    this.setProps({
      visibleAddNewChatModal: false
    });
  };

  public initNavLinkChild() {
    this.children.navLinkChild = new Link({
      className: 'search__link',
      href: (this.props.navLink as LinkProps)?.href as string,
      text: (this.props.navLink as LinkProps)?.text as string,
      settings: {
        withInternalID: false
      }
    });
  }

  public initSearchFormChild() {
    this.children.searchFormChild = new SearchForm({
      input: (this.props.searchForm as SearchFormProps).input,
      error: (this.props.searchForm as SearchFormProps).error,
      submitHandler: this.submitSearchHandler as Listener,
      settings: {
        withInternalID: false
      }
    });
  }

  public initButtonChild() {
    this.children.buttonChild = new Button({
      className: 'search__button',
      type: (this.props.button as ButtonProps)?.type as string,
      text: (this.props.button as ButtonProps)?.text as string,
      settings: {
        withInternalID: false
      },
      events: {
        click: this.buttonClickHandler
      }
    });
  }

  public initAddNewChatModal() {
    this.children.addNewChatModal = new Modal({
      className: '',
      type: 'image',
      header: (this.props.addNewChatModal as ModalProps)?.header,
      controls: (this.props.addNewChatModal as ModalProps)?.controls,
      buttons: (this.props.addNewChatModal as ModalProps)?.buttons,
      visible: this.props.visibleAddNewChatModalModal as boolean,
      state: (
        ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
          .search as Indexed<unknown>
      ).addNewChatModal as ModalProps,
      submitHandler: this.submitAddNewChatModalHandler as Listener,
      closeHandler: this.closeAddNewChatModalHandler,
      settings: {
        withInternalID: false
      }
    });
  }

  async componentDidMount() {
    try {
      this.initNavLinkChild();
      this.initSearchFormChild();
      this.initButtonChild();
      this.initAddNewChatModal();

      (this.children.addNewChatModal as Block).setProps({
        state: (
          ((this.props.state as Indexed<unknown>).chatsPageData as Indexed<unknown>)
            .search as Indexed<unknown>
        ).addNewChatModal as ModalProps
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(oldProps: SearchProps, newProps: SearchProps): boolean {
    if (oldProps.visibleAddNewChatModal !== newProps.visibleAddNewChatModal) {
      if (newProps.visibleAddNewChatModal === false) {
        (this.children.addNewChatModal as Modal).hide();
        document.body.classList.remove('modal-open');
      }
      if (newProps.visibleAddNewChatModal === true) {
        (this.children.addNewChatModal as Modal).show();
        document.body.classList.add('modal-open');
      }
    }

    return false;
  }

  render(): string {
    return template;
  }
}
