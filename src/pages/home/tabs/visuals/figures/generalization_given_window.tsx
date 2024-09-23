// @ts-nocheck Does not like React 19

import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
    Scatter,
    ScatterChart,
} from 'recharts'
import { SymbolType } from 'recharts/types/util/types'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useRef } from 'react'
import { ExtractRelevantImage, FigureOutputExportNew } from '@/lib/image_saver'
import { ClipboardCopyIcon, ScatterChartIcon } from 'lucide-react'
import { CommonVisualOutput } from '@/types/CommonVisualOutput'
import { setClipboard } from '@/lib/clipboard'
import { toast } from 'sonner'

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-black p-2 rounded dark:text-black">
                <p>{`Tag: ${payload[0].payload.label}`}</p>
                <p>{`Study: ${payload[0].payload.authors}`}</p>
                <p>{`Rigor of Generalization: ${payload[0].payload.degree}`}</p>
                <p>{`Generalized Outcome Strength: ${payload[0].payload.level}`}</p>
            </div>
        )
    }

    return null
}

export function GeneralizationGivenWindow({
    Data,
    shape,
    size,
    height,
}: {
    Data: CommonVisualOutput[]
    shape: SymbolType
    size: number
    height: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    const data_published = Data.filter(
        (s: CommonVisualOutput) =>
            s.Type === 'Journal' &&
            s.Generalized >= 0 &&
            s.GeneralizationRigor >= -0.5
    ).map((record) => ({
        x: record.GeneralizationRigor,
        y: record.Generalized,
        id: record.ID,
        label: record.Tag,
        level: record.RatingGeneralization,
        degree: record.DegreeGeneralization,
        authors: record.Authors,
        z: size,
    }))

    const data_unpublished = Data.filter(
        (s) =>
            s.Type === 'Unpublished' &&
            s.Generalized >= 0 &&
            s.GeneralizationRigor >= -0.5
    ).map((record) => ({
        x: record.GeneralizationRigor,
        y: record.Outcome,
        id: record.ID,
        label: record.Tag,
        level: record.RatingGeneralization,
        degree: record.DegreeGeneralization,
        authors: record.Authors,
        z: size,
    }))

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <ResponsiveContainer width="100%" height={height} ref={ref}>
                    <ScatterChart
                        style={{ background: 'white' }}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 125,
                        }}
                    >
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="IV Indicators"
                            tick={{ fill: 'black' }}
                            tickLine={{ stroke: 'black' }}
                            tickMargin={5}
                            label={{
                                value: 'Rigor of Generalization Measurement',
                                position: 'middle',
                                dy: 25,
                                fill: 'black',
                            }}
                            domain={['dataMin-0.5', 'dataMax+0.5']}
                            axisLine={{ stroke: 'black' }}
                            ticks={[0, 1, 2, 3]}
                            tickFormatter={(value) => {
                                switch (value) {
                                    case 0:
                                        return 'Post Only'
                                    case 1:
                                        return 'Pre/Post'
                                    case 2:
                                        return 'Intermittent'
                                    case 3:
                                        return 'Single Case Data'
                                    default:
                                        return 'Post Only'
                                }
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Strength"
                            tick={{ fill: 'black' }}
                            tickLine={{ stroke: 'black' }}
                            tickMargin={5}
                            label={{
                                value: 'Generalization',
                                position: 'middle',
                                angle: -90,
                                dx: -125,
                                fill: 'black',
                            }}
                            domain={['dataMin-0.5', 'dataMax+0.5']}
                            axisLine={{ stroke: 'black' }}
                            ticks={[0, 1, 2, 3, 4]}
                            tickFormatter={(value) => {
                                switch (value) {
                                    case 0:
                                        return 'Counter-Therapeutic'
                                    case 1:
                                        return 'Null'
                                    case 2:
                                        return 'Inconsistent'
                                    case 3:
                                        return 'Weak'
                                    case 4:
                                        return 'Strong'
                                    default:
                                        return ''
                                }
                            }}
                        />
                        <ZAxis type="number" dataKey="z" range={[size, size]} />
                        <Tooltip
                            // @ts-ignore
                            content={<CustomTooltip />}
                        />
                        <Scatter
                            name="Published Literature"
                            data={data_published}
                            fill="#59ACF2"
                            shape={shape}
                            stroke="black"
                            opacity={0.8}
                        />
                        <Scatter
                            name="Gray Literature"
                            data={data_unpublished}
                            fill="#556270"
                            shape={shape}
                            stroke="black"
                            opacity={0.8}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel>Figure Export</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={() => {
                        const data_to_export_header = [
                            'Study UUID',
                            'Publication Type',
                            'Study Label',
                            'Category',
                            'X',
                            'Y',
                            'X Label',
                            'Y Label',
                        ].join('\t')

                        const table_ized_data = Data.map((record) => {
                            const temp_row = [
                                record.ID,
                                record.Type,
                                record.Tag,
                                'Generalization',
                                record.IV,
                                record.Outcome,
                                record.DegreeGeneralization,
                                record.RatingGeneralization,
                            ]

                            return temp_row.join('\t')
                        })

                        const final_data = [
                            data_to_export_header,
                            ...table_ized_data,
                        ].join('\n')

                        setClipboard(final_data).then(() => {
                            toast.success('Data copied to clipboard', {
                                description:
                                    'The data copied to your clipboard should be pasted into a spreadsheet to preserve formatting.',
                            })
                        })
                    }}
                >
                    <ClipboardCopyIcon className="w-5 h-5 mr-2" />
                    Copy Data
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                    onClick={() =>
                        FigureOutputExportNew(
                            'svg',
                            'SCARF_Generalization_Given_Duration',
                            ExtractRelevantImage(ref)
                        )
                    }
                >
                    <ScatterChartIcon className="w-5 h-5 mr-2" />
                    Save as SVG
                </ContextMenuItem>

                <ContextMenuItem
                    onClick={() =>
                        FigureOutputExportNew(
                            'webp',
                            'SCARF_Generalization_Given_Duration',
                            ExtractRelevantImage(ref)
                        )
                    }
                >
                    <ScatterChartIcon className="w-5 h-5 mr-2" />
                    Save as WebP
                </ContextMenuItem>

                <ContextMenuItem
                    onClick={() =>
                        FigureOutputExportNew(
                            'png',
                            'SCARF_Generalization_Given_Duration',
                            ExtractRelevantImage(ref)
                        )
                    }
                >
                    <ScatterChartIcon className="w-5 h-5 mr-2" />
                    Save as PNG
                </ContextMenuItem>

                <ContextMenuItem
                    onClick={() =>
                        FigureOutputExportNew(
                            'jpeg',
                            'SCARF_Generalization_Given_Duration',
                            ExtractRelevantImage(ref)
                        )
                    }
                >
                    <ScatterChartIcon className="w-5 h-5 mr-2" />
                    Save as JPEG
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
