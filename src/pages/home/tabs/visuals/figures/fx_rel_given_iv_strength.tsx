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
import { ExtractRelevantImage, FigureOutputExportNew } from '@/lib/image_saver'
import { useRef } from 'react'
import { ClipboardCopyIcon, ScatterChartIcon } from 'lucide-react'
import { CommonVisualOutput } from '@/types/CommonVisualOutput'
import { toast } from 'sonner'
import { setClipboard } from '@/lib/clipboard'

// @ts-ignore
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-black p-2 rounded dark:text-black">
                <p>{`Tag: ${payload[0].payload.label}`}</p>
                <p>{`Study: ${payload[0].payload.authors}`}</p>
                <p>{`Indicators of IV: ${Math.round(payload[0].payload.x)}`}</p>
                <p>{`Strength of Relation: ${payload[0].payload.level}`}</p>
            </div>
        )
    }

    return null
}

export function VisualFunctionalRelationGivenIV({
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
        (s: CommonVisualOutput) => s.Type === 'Journal' && s.Outcome >= 0
    ).map((record) => ({
        x: record.IV,
        y: record.Outcome,
        id: record.ID,
        label: record.Tag,
        level: record.RatingOutcome,
        authors: record.Authors,
        z: size,
    }))

    const data_unpublished = Data.filter(
        (s) => s.Type === 'Unpublished' && s.Outcome >= 0
    ).map((record) => ({
        x: record.IV,
        y: record.Outcome,
        id: record.ID,
        label: record.Tag,
        level: record.RatingOutcome,
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
                                value: 'Indicators of Internal Validity',
                                position: 'middle',
                                dy: 25,
                                fill: 'black',
                            }}
                            axisLine={{ stroke: 'black' }}
                            domain={['dataMin-0.5', 'dataMax+0.5']}
                            ticks={[
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                14, 15,
                            ]}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Strength"
                            tick={{ fill: 'black' }}
                            tickLine={{ stroke: 'black' }}
                            tickMargin={5}
                            label={{
                                value: 'Functional Relation',
                                position: 'middle',
                                angle: -90,
                                dx: -125,
                                fill: 'black',
                            }}
                            axisLine={{ stroke: 'black' }}
                            domain={['dataMin-0.5', 'dataMax+0.5']}
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
                            stroke="black"
                            shape={shape}
                            opacity={0.8}
                        />
                        <Scatter
                            name="Gray Literature"
                            data={data_unpublished}
                            fill="#556270"
                            stroke="black"
                            shape={shape}
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
                                'Internal Validity',
                                record.IV,
                                record.Outcome,
                                record.IV,
                                record.RatingOutcome,
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
                    onClick={() => {
                        FigureOutputExportNew(
                            'svg',
                            'SCARF_Functional_Relation_Given_IV',
                            ExtractRelevantImage(ref)
                        )
                    }}
                >
                    <ScatterChartIcon className="w-5 h-5 mr-2" />
                    Save as SVG
                </ContextMenuItem>

                <ContextMenuItem
                    onClick={() =>
                        FigureOutputExportNew(
                            'webp',
                            'SCARF_Functional_Relation_Given_IV',
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
                            'SCARF_Functional_Relation_Given_IV',
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
                            'SCARF_Functional_Relation_Given_IV',
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
