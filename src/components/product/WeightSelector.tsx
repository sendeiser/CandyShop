import type { WeightOption } from '../../types'

interface WeightSelectorProps {
  options: WeightOption[]
  value: WeightOption | null
  onChange: (opt: WeightOption) => void
}

export default function WeightSelector({ options, value, onChange }: WeightSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value?.grams === opt.grams
        return (
          <button
            key={opt.grams}
            onClick={() => onChange(opt)}
            className={`flex flex-col items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selected
                ? 'bg-candy text-white shadow-sm'
                : 'bg-white text-chocolate border border-bubblegum hover:bg-candy/10'
            }`}
          >
            <span>{opt.label}</span>
            <span className="text-xs opacity-80">${opt.price.toFixed(2)}</span>
          </button>
        )
      })}
    </div>
  )
}
