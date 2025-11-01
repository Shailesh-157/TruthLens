import { Shield, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/StatCard";
import { QuickVerify } from "@/components/QuickVerify";
import { TrendingTopics } from "@/components/TrendingTopics";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      
      <main className="flex-1 p-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Verifications"
                value="36"
                description="36 verifications recorded"
                icon={Shield}
                iconColor="bg-blue-500/20 text-blue-400"
              />
              <StatCard
                title="Verified True"
                value="12"
                description="33% of total"
                icon={CheckCircle}
                iconColor="bg-green-500/20 text-green-400"
              />
              <StatCard
                title="Detected Fake"
                value="15"
                description="42% of total"
                icon={XCircle}
                iconColor="bg-red-500/20 text-red-400"
              />
              <StatCard
                title="Trending Topics"
                value="0"
                description="No trending topics"
                icon={TrendingUp}
                iconColor="bg-purple-500/20 text-purple-400"
              />
            </div>

            {/* Quick Verify */}
            <QuickVerify />
          </div>

          {/* Sidebar */}
          <aside className="w-80">
            <TrendingTopics />
          </aside>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Index;
