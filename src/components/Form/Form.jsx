import styles from './Form.module.css'
import { useState, useRef, useEffect } from 'react'

export const Form = () => {
	const [value, setValue] = useState({ email: '', password: '', reenterPassword: '' })
	const [valueError, setValueError] = useState({
		emailError: null,
		passwordError: null,
		reenterPasswordError: null,
	})
	const submitBtn = useRef(null)

	useEffect(() => {
		checkCurrectInput()
	}, [value])

	const onBlurEmail = ({ target }) => {
		let error = null
		if (!/^\w+.@[a-z]+\.[a-z]+$/.test(target.value)) {
			error = 'Введите корректный email.'
		}
		setValueError({ ...valueError, emailError: error })
	}

	const onChangePassword = ({ target }) => {
		let error = []
		setValue({ ...value, password: target.value })
		if (!/(?=.*[A-Z])(?=.*\d)/.test(target.value)) {
			error.push('Пароль должен иметь хотя бы одну заглавную букву и цифру.')
		}
		if (/[^a-z\dA-Z]/.test(target.value)) {
			error.push('Пароль должен состоять только из букв и цифр.')
		}
		setValueError({ ...valueError, passwordError: error?.join('\n') })
	}

	const onBlurPassword = ({ target }) => {
		let error = []
		if (target.value.length < 6 || target.value.length > 20) {
			error.push('Пароль должен быть больше 6 символов и не больше 20 символов.')
		}
		setValueError({ ...valueError, passwordError: error?.join('\n') })
	}

	const onChangeReenterPassword = ({ target }) => {
		setValue({ ...value, reenterPassword: target.value })
		target.value === value.password
			? setValueError({ ...valueError, reenterPasswordError: null })
			: null
	}
	const checkCurrectInput = () => {
		if (
			!valueError.emailError &&
			!valueError.passwordError &&
			!valueError.reenterPasswordError &&
			value.email !== '' &&
			value.password !== '' &&
			value.reenterPassword === value.password
		) {
			submitBtn.current.focus()
		}
	}

	const onBlurReenterPassword = ({ target }) => {
		let error = null
		target.value !== value.password ? (error = 'Не верный пароль.') : null
		setValueError({ ...valueError, reenterPasswordError: error })
	}

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(value)
		setValue({ email: '', password: '', reenterPassword: '' })
    }

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<label>
				{valueError.emailError && (
					<div className={styles.error}>{valueError.emailError}</div>
				)}
				<input
					value={value.email}
					onChange={({ target }) => setValue({ ...value, email: target.value })}
					onBlur={onBlurEmail}
					placeholder="email"
					className={styles.formInput}
					name="email"
					type="email"
					required
				/>
			</label>
			<label>
				{valueError.passwordError && (
					<div className={styles.error}>{valueError.passwordError}</div>
				)}
				<input
					value={value.password}
					onChange={onChangePassword}
					onBlur={onBlurPassword}
					placeholder="password"
					className={styles.formInput}
					type="password"
					required
				/>
			</label>

			<label>
				{valueError.reenterPasswordError && (
					<div className={styles.error}>{valueError.reenterPasswordError}</div>
				)}
				<input
					value={value.reenterPassword}
					onChange={onChangeReenterPassword}
					onBlur={onBlurReenterPassword}
					placeholder="password one more time"
					className={styles.formInput}
					type="password"
					required
				/>
			</label>
			<button
				disabled={
					valueError.emailError ||
					valueError.passwordError ||
					valueError.reenterPasswordError ||
					value.email === '' ||
					value.password === '' ||
					value.reenterPassword === ''
				}
				className={styles.formBtn}
				type="submit"
				ref={submitBtn}
			>
				Sign up
			</button>
		</form>
	)
}
/*
валидация:
проверка емаил на @
пароль больше 6 символов и не больше 20 символов
пароль только буквы и цифры, минимум одна большая буква и цифра
повторный пароль такой же как и пароль
*/
