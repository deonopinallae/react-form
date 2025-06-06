import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useEffect } from 'react'
import styles from './Form.module.css'

const sendFormData = (formData) => {
	console.log(formData)
}

const schema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.matches(/^\S+@\S+\.\S+$/, 'Введите корректный email.'),
	password: yup
		.string()
		.trim()
		.min(6, 'Пароль должен быть больше 6 символов.')
		.max(20, 'Пароль должен быть не больше 20 символов.')
		.matches(
			/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
			'Пароль должен состоять только из букв и цифр и иметь хотя бы одну заглавную букву и цифру.',
		),
	reenterPassword: yup
		.string()
		.trim()
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

export const Form = () => {
	const submitBtn = useRef(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			reenterPassword: '',
		},
		resolver: yupResolver(schema),
		mode: 'onChange',
	})


	useEffect(() => {
		if (isDirty && isValid) {
			submitBtn.current.focus()
		}
	}, [yup.ref('reenterPassword')])

	return (
		<form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
			<label>
				{errors.email?.message && (
					<div className={styles.error}>{errors.email?.message}</div>
				)}
				<input
					className={styles.formInput}
					placeholder="email"
					name="login"
					type="text"
					{...register('email')}
				/>
			</label>
			<label>
				{errors.password?.message && (
					<div className={styles.error}>{errors.password?.message}</div>
				)}
				<input
					className={styles.formInput}
					placeholder="password"
					name="password"
					type="password"
					{...register('password')}
				/>
			</label>
			<label>
				{errors.reenterPassword?.message && (
					<div className={styles.error}>{errors.reenterPassword?.message}</div>
				)}
				<input
					className={styles.formInput}
					placeholder="enter password one more time"
					name="reenterPassword"
					type="password"
					{...register('reenterPassword')}
				/>
			</label>
			<button
				type="submit"
				disabled={!isValid}
				className={styles.formBtn}
				ref={submitBtn}
			>
				Submit
			</button>
		</form>
	)
}
