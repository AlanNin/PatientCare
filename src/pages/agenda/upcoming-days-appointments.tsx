import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  ChevronRight,
  CloudSun,
  Grid,
  List,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  upcomingAppointments: any[];
};

export default function UpcomingDaysAppointmentsComponent({
  upcomingAppointments,
}: Props) {
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  return (
    <motion.div
      key="upcoming-appointment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="bg-accent text-accent-foreground p-6">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-2xl">
              <Stethoscope className="h-6 w-6" />
              <span>Próximas citas</span>
            </div>
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "list" | "grid")}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <Grid className="h-4 w-4 mr-2" />
                  Cuadrícula
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {upcomingAppointments.length > 0 ? (
            <>
              {viewMode === "list" ? (
                <ul className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.li
                      key={appointment.id}
                      className="bg-card rounded-lg shadow-sm hover:bg-muted/50 transition-shadow cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center p-4 space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.avatar}
                            alt={appointment.patient}
                          />
                          <AvatarFallback>
                            {appointment.patient.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium text-lg">
                            {appointment.patient}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {appointment.date} - {appointment.time}
                          </div>
                        </div>
                        <Badge
                          variant={
                            appointment.status === "Confirmado"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Ver detalles
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="cursor-pointer"
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage
                                src={appointment.avatar}
                                alt={appointment.patient}
                              />
                              <AvatarFallback>
                                {appointment.patient.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {appointment.patient}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.date} - {appointment.time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.type}
                              </p>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "Confirmado"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {appointment.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Ver detalles
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="my-10 flex items-center gap-4">
                <CloudSun className="h-8 w-8 text-primary" strokeWidth={1.2} />
                <Label className="text-center text-xl font-medium">
                  ¡Sin prisa! No hay citas en los próximos días
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}