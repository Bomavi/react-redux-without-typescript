/* npm imports: common */
import React from 'react';

/* npm imports: material-ui/core */
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

/* root imports: view components */
import { InputButton } from 'views/elements';

/* root imports: common */
import { removeSpaces } from 'utils/helpers';

/* local imports: common */
import { styles } from './styles';

class CustomInputComponent extends React.PureComponent {
	static defaultProps = {
		isFetching: false,
		autoFocus: false,
	};

	state = {
		inputValue: '',
	};

	get trimedValue() {
		return removeSpaces(this.state.inputValue).trim();
	}

	get isEmpty() {
		const { defaultValue } = this.props;
		return !this.trimedValue || this.trimedValue === defaultValue;
	}

	changeHandler = e => {
		const { value } = e.target;

		this.setState(
			() => ({
				inputValue: value,
			}),
			() => {
				this.changeCallbackHandler();
			}
		);
	};

	actionClickHandler = () => {
		const { onClick, onCancel } = this.props;
		if (onClick) onClick(this.trimedValue);
		if (onCancel) onCancel();
		this.clearInputValue();
	};

	clearHandler = () => {
		this.clearInputValue();
	};

	clearInputValue = () => {
		this.setState(() => ({ inputValue: '' }), () => this.changeCallbackHandler());
	};

	keyPressHandler = e => {
		const { onClick, onCancel } = this.props;

		if (e.key === 'Enter' && onClick) {
			if (this.trimedValue) onClick(this.trimedValue);
			if (onCancel) onCancel();
			if (!onCancel) this.clearInputValue();
		}

		if (e.key === 'Escape' && onCancel) onCancel();
	};

	changeCallbackHandler = () => {
		const { onChange } = this.props;
		if (onChange) onChange(this.trimedValue);
	};

	render() {
		const { inputValue } = this.state;
		const {
			classes,
			icon,
			placeholder,
			defaultValue,
			isFetching,
			autoFocus,
			onClick,
			onCancel,
		} = this.props;

		const value = inputValue || defaultValue || inputValue;

		return (
			<div className={classes.root}>
				{icon && (
					<InputButton
						icon={icon}
						isFetching={isFetching}
						color={onClick ? 'primary' : 'inherit'}
						title={icon.title}
						disabled={onClick && this.isEmpty}
						onClick={onClick && this.actionClickHandler}
					/>
				)}
				{icon && <Divider className={classes.divider} />}
				<InputBase
					className={classes.input}
					placeholder={placeholder}
					value={value}
					autoFocus={autoFocus}
					onChange={this.changeHandler}
					onKeyUp={this.keyPressHandler}
				/>
				{(!this.isEmpty || onCancel) && <Divider className={classes.divider} />}
				{!this.isEmpty && !onCancel && (
					<InputButton
						icon={{ name: 'close' }}
						title="Clear"
						onClick={this.clearHandler}
					/>
				)}
				{onCancel && (
					<InputButton
						icon={{ name: 'close' }}
						title="Cancel"
						onClick={onCancel}
					/>
				)}
			</div>
		);
	}
}

const CustomInput = withStyles(styles)(CustomInputComponent);

export { CustomInput };
