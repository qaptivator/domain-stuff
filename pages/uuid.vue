<template>
	<div class="p-4 text-xl">
		<h1>> uuid</h1>
		<p class="mb-8">
			generate MongoDB ObjectIDs, UUIDs (v1, v4, v7, null/nil/empty), Cuid2,
			NanoID, or ShortID.
		</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-[40rem]">
			<div>
				<p class="mb-1">Type</p>
				<select
					v-model="formMode"
					class="border p-2 w-full rounded-lg bg-slate-100"
				>
					<option value="objectid">MongoDB ObjectID</option>
					<option value="uuidv4">UUID v4 (Standart/Random)</option>
					<option value="uuidv7">UUID v7 (Timestamp-based)</option>
					<option value="uuidv1">UUID v1 (Time-based)</option>
					<option value="guid">GUID (Microsoft style)</option>
					<option value="null">Null/Nil/Empty UUID</option>
					<option value="cuid2">Cuid2 (Secure/Hashed)</option>
					<option value="nanoid">NanoID (URL-Safe)</option>
					<option value="shortid">ShortID (Small/Random)</option>
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
			<div class="flex flex-wrap gap-4">
				<label class="flex items-center gap-2">
					<input
						type="checkbox"
						v-model="useDashes"
					/>
					Include Dashes
				</label>
				<label class="flex items-center gap-2">
					<input
						type="checkbox"
						v-model="useBase64"
					/>
					Base64 Mode
				</label>
				<label class="flex items-center gap-2">
					<input
						type="checkbox"
						v-model="useJsonMock"
					/>
					JSON Mock
				</label>
			</div>

			<div class="flex items-center gap-4 pt-2">
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
				class="border p-2 w-full max-w-[40rem] h-64 rounded-lg bg-slate-100 font-mono text-sm"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { v1 as uuidv1, v4 as uuidv4, v7 as uuidv7, NIL as NIL_UUID } from 'uuid'
import { createId as createCuid } from '@paralleldrive/cuid2'
import { nanoid } from 'nanoid'

export default {
	name: 'MongoId',
	data() {
		return {
			formMode: 'objectid' as
				| 'objectid'
				| 'uuidv1'
				| 'uuidv4'
				| 'uuidv7'
				| 'cuid2'
				| 'nanoid'
				| 'shortid'
				| 'guid'
				| 'null',
			formCount: 1,
			useDashes: true,
			useBase64: false,
			useJsonMock: false,
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
		useBase64() {
			this.generate()
		},
		useJsonMock() {
			this.generate()
		},
		separator() {
			this.generate()
		},
	},
	methods: {
		generateObjectId() {
			const timestamp = Math.floor(Date.now() / 1000)
				.toString(16)
				.padStart(8, '0')
			const random = 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
				((Math.random() * 16) | 0).toString(16)
			)
			return timestamp + random
		},
		generateShortId() {
			// A concise, URL-safe alphabet (8 characters long)
			const alphabet =
				'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
			return Array.from(
				{ length: 8 },
				() => alphabet[Math.floor(Math.random() * alphabet.length)]
			).join('')
		},
		toBase64(hex: string) {
			try {
				const pairs = hex.match(/\w{2}/g)
				if (!pairs) return hex
				return btoa(
					pairs.map((x) => String.fromCharCode(parseInt(x, 16))).join('')
				)
			} catch {
				return hex
			}
		},
		generate() {
			const results: any[] = []
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
					case 'cuid2':
						id = createCuid()
						break
					case 'nanoid':
						id = nanoid()
						break
					case 'shortid':
						id = this.generateShortId()
						break
					case 'null':
						id = NIL_UUID
						break
					case 'guid':
						id = uuidv4().toUpperCase()
						break
				}

				// Apply formatting to hex-based IDs
				const isHexId = [
					'objectid',
					'uuidv1',
					'uuidv4',
					'uuidv7',
					'null',
					'guid',
				].includes(this.formMode)

				if (isHexId) {
					if (!this.useDashes) id = id.replace(/-/g, '')
					if (this.useBase64) id = this.toBase64(id.replace(/-/g, ''))
				}

				if (this.useJsonMock) {
					results.push({
						_id: this.formMode === 'objectid' ? { $oid: id } : id,
						index: i,
						created_at: new Date().toISOString(),
					})
				} else {
					results.push(id)
				}
			}

			this.formResult = this.useJsonMock
				? JSON.stringify(results, null, 4)
				: results.join(this.separator === 'newline' ? '\n' : ', ')
		},
	},
}
</script>
