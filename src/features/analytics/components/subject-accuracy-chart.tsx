"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SubjectPerformance } from "@/features/analytics/types";

interface SubjectAccuracyChartProps {
  subjects: SubjectPerformance[];
}

export function SubjectAccuracyChart({ subjects }: SubjectAccuracyChartProps) {
  const chartData = subjects.map((subject) => ({
    name: subject.subject_title,
    accuracy: subject.accuracy_percentage,
    total: subject.total_questions,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 24, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tickLine={false}
                axisLine={false}
                width={44}
              />
              <Tooltip
                formatter={(value, name) => [
                  `${Number(value).toFixed(0)}%`,
                  name === "accuracy" ? "Accuracy" : name,
                ]}
                labelFormatter={(label) => `${label}`}
              />
              <Bar
                dataKey="accuracy"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
                maxBarSize={64}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
