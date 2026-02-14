<template>
	<div class="p-4 text-xl">
		<h1>> mongoid & uuid</h1>
		<p class="mb-8">
			generate MongoDB ObjectIDs or various other UUID versions (v1, v4, v7,
			nil).
		</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-[40rem]">
			<div>
				<p class="mb-1">Type</p>
				<select
					v-model="formMode"
					class="border p-2 w-full rounded-lg bg-slate-100"
				>
					<option value="objectid">MongoDB ObjectID</option>
					<option value="uuidv4">UUID v4 (Random/Standart)</option>
					<option value="uuidv7">UUID v7 (Timestamp-based)</option>
					<option value="uuidv1">UUID v1 (Time-based)</option>
					<option value="guid">GUID (Microsoft style)</option>
					<option value="null">Null/Empty UUID</option>
				</select>
			</div>
			<div>
				<p class="mb-1">Count</p>
				<input
					v-model.number="formCount"
					type="number"
					min="1"
					max="100"
					class="border p-2 w-full rounded-lg bg-slate-100"
				/>
			</div>
		</div>

		<div class="mb-8 space-y-2 text-lg">
			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					id="dashes"
					v-model="useDashes"
				/>
				<label for="dashes">Include Dashes</label>
			</div>

			<div class="flex items-center gap-4">
				<p>Separator:</p>
				<label class="flex items-center gap-1">
					<input
						type="radio"
						value="newline"
						v-model="separator"
					/>
					Newline
				</label>
				<label class="flex items-center gap-1">
					<input
						type="radio"
						value="comma"
						v-model="separator"
					/>
					Comma
				</label>
			</div>
		</div>

		<button
			@click="generate"
			class="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
		>
			Regenerate
		</button>

		<div>
			<p class="mb-1">Result</p>
			<textarea
				readonly
				v-model="formResult"
				class="border p-2 w-full max-w-[40rem] h-48 rounded-lg bg-slate-100 font-mono text-sm"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { v1 as uuidv1, v4 as uuidv4, v7 as uuidv7, NIL as NIL_UUID } from 'uuid'

export default {
	name: 'MongoId',
	data() {
		return {
			formMode: 'objectid' as
				| 'objectid'
				| 'uuidv1'
				| 'uuidv4'
				| 'uuidv7'
				| 'guid'
				| 'null',
			formCount: 1,
			useDashes: true,
			separator: 'newline' as 'newline' | 'comma',
			formResult: '',
		}
	},
	mounted() {
		this.generate()
	},
	watch: {
		formMode() {
			this.generate()
		},
		formCount() {
			this.generate()
		},
		useDashes() {
			this.generate()
		},
		separator() {
			this.generate()
		},
	},
	methods: {
		// Simple ObjectID generator (12 bytes -> 24 hex chars)
		generateObjectId() {
			const timestamp = Math.floor(Date.now() / 1000)
				.toString(16)
				.padStart(8, '0')
			const random = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
				((Math.random() * 16) | 0).toString(16)
			)
			return timestamp + random
		},

		generate() {
			const results: string[] = []

			for (let i = 0; i < this.formCount; i++) {
				let id = ''

				switch (this.formMode) {
					case 'objectid':
						id = this.generateObjectId()
						break
					case 'uuidv1':
						id = uuidv1()
						break
					case 'uuidv4':
						id = uuidv4()
						break
					case 'uuidv7':
						id = uuidv7()
						break
					case 'null':
						id = NIL_UUID
						break
					case 'guid':
						id = uuidv4().toUpperCase()
						break
				}

				// Handle Dashes (ObjectIDs never have dashes)
				if (this.formMode !== 'objectid') {
					if (!this.useDashes) {
						id = id.replace(/-/g, '')
					}
					if (this.formMode === 'guid' && this.useDashes) {
						id = id.toUpperCase() // Ensure GUIDs stay pretty
					}
				}

				results.push(id)
			}

			const sep = this.separator === 'newline' ? '\n' : ', '
			this.formResult = results.join(sep)
		},
	},
}
</script>
