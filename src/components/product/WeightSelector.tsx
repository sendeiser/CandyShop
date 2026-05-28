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
            className={`flex flex-col items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected
                ? 'text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={selected ? { backgroundColor: '#26c6da' } : undefined}
          >
            <span>{opt.label}</span>
            <span className="text-xs opacity-80">${opt.price.toFixed(2)}</span>
          </button>
        )
      })}
    </div>
  )
}
