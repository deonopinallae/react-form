import styles from './App.module.css'
import { Form } from './components/Form/Form'

export const App = () => {
	return (
		<>
			<p className={styles.title}>Registration</p>
			<Form />
		</>
	)
}
