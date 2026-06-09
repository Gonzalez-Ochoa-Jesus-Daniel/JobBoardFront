import { Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { APP_ICON_SIZE, APP_ICON_STROKE_WIDTH } from '../../../config/iconConfig'
import type { ConfigurationItem, ConfigurationListKey } from '../types/configuration.types'

type GestorListaConfiguracionProps = {
	title: string
	description: string
	iconLabel: string
	items: ConfigurationItem[]
	onCreate: (listKey: ConfigurationListKey, value: string) => Promise<unknown>
	onDelete: (listKey: ConfigurationListKey, itemId: string) => Promise<unknown>
	listKey: ConfigurationListKey
	isBusy?: boolean
}

function GestorListaConfiguracion({
	title,
	description,
	iconLabel,
	items,
	onCreate,
	onDelete,
	listKey,
	isBusy = false,
}: GestorListaConfiguracionProps) {
	const [value, setValue] = useState('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const trimmedValue = value.trim()

		if (!trimmedValue) {
			return
		}

		try {
			await onCreate(listKey, trimmedValue)
			setValue('')
		} catch {
			// El toast global ya comunica el error al usuario.
		}
	}

	return (
		<article className="configuration-panel">
			<header className="configuration-panel-head">
				<div>
					<span className="configuration-panel-badge">{iconLabel}</span>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
			</header>

			<form className="configuration-form" onSubmit={handleSubmit}>
				<input
					type="text"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder={`Agregar nuevo ${title.toLowerCase()}`}
					disabled={isBusy}
				/>
				<button type="submit" className="configuration-create-btn" disabled={isBusy}>
					<Plus size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
					Crear
				</button>
			</form>

			<ul className="configuration-list">
				{items.length > 0 ? (
					items.map((item) => (
						<li key={item.id} className="configuration-list-item">
							<span>{item.name}</span>
							<button
								type="button"
								className="configuration-delete-btn"
								aria-label={`Eliminar ${item.name}`}
								disabled={isBusy}
								onClick={() => {
									void onDelete(listKey, item.id).catch(() => undefined)
								}}
							>
								<Trash2 size={APP_ICON_SIZE} strokeWidth={APP_ICON_STROKE_WIDTH} />
							</button>
						</li>
					))
				) : (
					<li className="configuration-list-empty">Aun no hay elementos en esta lista.</li>
				)}
			</ul>
		</article>
	)
}

export default GestorListaConfiguracion
