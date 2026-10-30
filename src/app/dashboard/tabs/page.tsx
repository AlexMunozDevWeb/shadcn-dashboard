import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/components//ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/components//ui/tabs";
import { uiText } from "@/modules/data/ui-text";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">{uiText.demo.tabs.overview}</TabsTrigger>
        <TabsTrigger value="analytics">
          {uiText.demo.tabs.analytics}
        </TabsTrigger>
        <TabsTrigger value="reports">{uiText.demo.tabs.reports}</TabsTrigger>
        <TabsTrigger value="settings">{uiText.demo.tabs.settings}</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.tabs.overview}</CardTitle>
            <CardDescription>
              {uiText.demo.tabs.overviewDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {uiText.demo.tabs.overviewContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.tabs.analytics}</CardTitle>
            <CardDescription>
              {uiText.demo.tabs.analyticsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {uiText.demo.tabs.analyticsContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.tabs.reports}</CardTitle>
            <CardDescription>
              {uiText.demo.tabs.reportsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {uiText.demo.tabs.reportsContent}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>{uiText.demo.tabs.settings}</CardTitle>
            <CardDescription>
              {uiText.demo.tabs.settingsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {uiText.demo.tabs.settingsContent}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
