export const getCategoryColor = (categoryName: string): string => {
  const colors: { [key: string]: string } = {
    "Food & Dining": "#F97A00",
    Transportation: "#82ca9d",
    Shopping: "#ffc658",
    Entertainment: "#ff7300",
    "Bills & Utilities": "#D50B8B",
    Healthcare: "#ff0000",
    Income: '#73EC8B',
    Other:'#03A791'
  };
  return colors[categoryName] || "#8884d8";
};

type MonthlyTrendItem = {
  _id: {
    year: number;
    month: number;
    type: string;
  };
  total: number;
};

export const transformMonthlyTrend = (monthlyTrend: MonthlyTrendItem[]) => {
  // Group by month and calculate income vs expenses
  const monthMap: {
    [key: string]: { month: string; income: number; expenses: number };
  } = {};

  monthlyTrend.forEach((item) => {
    const monthKey = `${item._id.year}-${item._id.month
      .toString()
      .padStart(2, "0")}`;
    const monthName = new Date(
      item._id.year,
      item._id.month - 1
    ).toLocaleString("default", { month: "short" });

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { month: monthName, income: 0, expenses: 0 };
    }

    if (item._id.type === "income") {
      monthMap[monthKey].income = item.total;
    } else {
      monthMap[monthKey].expenses = Math.abs(item.total);
    }
  });

  return Object.values(monthMap).slice(-6); // Last 6 months
};
