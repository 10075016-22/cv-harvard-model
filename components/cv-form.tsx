"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { PlusCircle, Trash2, ArrowUp } from "lucide-react";

// import Thiago from '@/components/ThiagoEn.json'
// import Thiago from '@/components/Thiago.json'

const formSchema = z.object({
  locale: z.string().optional(),
  personalInfo: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    title: z.string().min(1, "El título profesional es requerido"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(1, "El teléfono es requerido"),
    location: z.string().optional(),
    linkedin: z.string().url("URL de LinkedIn inválida").optional().or(z.literal("")),
    website: z.string().url("URL inválida").optional().or(z.literal("")),
  }),
  profile: z.string().min(1, "El perfil profesional es requerido"),
  education: z.array(z.object({
    institution: z.string().min(1, "La institución es requerida"),
    degree: z.string().min(1, "El título es requerido"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().min(1, "La fecha de fin es requerida"),
    location: z.string().optional(),
    description: z.string().optional(),
  })).min(1, "Al menos una entrada de educación es requerida"),
  experience: z.array(z.object({
    company: z.string().min(1, "La empresa es requerida"),
    position: z.string().min(1, "El cargo es requerido"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().min(1, "La descripción es requerida"),
    location: z.string().optional(),
  }).refine((data) => {
    if (!data.isCurrent && !data.endDate) {
      return false;
    }
    return true;
  }, {
    message: "La fecha de fin es requerida si no es el trabajo actual",
    path: ["endDate"],
  })).min(1, "Al menos una experiencia laboral es requerida"),
  skills: z.array(z.object({
    category: z.string().min(1, "La categoría es requerida"),
    items: z.array(z.string().min(1, "La habilidad es requerida")).min(1, "Al menos una habilidad es requerida"),
  })),
  languages: z.array(z.object({
    language: z.string().min(1, "El idioma es requerido"),
    level: z.string().min(1, "El nivel es requerido"),
  })),
  complementary: z.array(z.object({
    title: z.string().min(1, "El título es requerido"),
    institution: z.string().min(1, "La institución es requerida"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    type: z.string().min(1, "El tipo es requerido"),
  })),
});

export type CVData = z.infer<typeof formSchema>;



export function CVForm({ onSubmit, initialData }: { onSubmit: (data: CVData) => void; initialData?: CVData }) {
  const form = useForm<CVData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
      },
      profile: "",
      education: [
        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        }
      ],
      experience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
          isCurrent: false,
          location: "",
        }
      ],
      skills: [
        {
          category: "",
          items: [],
        }
      ],
      languages: [
        {
          language: "",
          level: "",
        }
      ],
      complementary: []
    },
  });

  function onFormSubmit(values: CVData) {
    onSubmit(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Información Personal</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personalInfo.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título Profesional</FormLabel>
                    <FormControl>
                      <Input placeholder="Desarrollador Full Stack" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad, País" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="personalInfo.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sitio Web (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://miportfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Perfil Profesional</h2>
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe tu perfil profesional"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Experiencia Laboral</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const experience = form.getValues("experience");
                  form.setValue("experience", [
                    ...experience,
                    {
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                      isCurrent: false,
                      location: "",
                    },
                  ]);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Agregar Experiencia
              </Button>
            </div>
            {form.watch("experience").map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Experiencia {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const experience = form.getValues("experience");
                        experience.splice(index, 1);
                        form.setValue("experience", experience);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Empresa XYZ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Desarrollador Senior"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fin</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            disabled={form.watch(`experience.${index}.isCurrent`) || false}
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe tus responsabilidades y logros"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad, País" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experience.${index}.isCurrent`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                              if (e.target.checked) {
                                form.setValue(`experience.${index}.endDate`, "", { shouldValidate: true });
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel>Trabajo Actual</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Formación</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const education = form.getValues("education");
                  form.setValue("education", [
                    ...education,
                    {
                      institution: "",
                      degree: "",
                      startDate: "",
                      endDate: "",
                      location: "",
                    },
                  ]);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Agregar Educación
              </Button>
            </div>
            {form.watch("education").map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Educación {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const education = form.getValues("education");
                        education.splice(index, 1);
                        form.setValue("education", education);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institución</FormLabel>
                        <FormControl>
                          <Input placeholder="Universidad XYZ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingeniero en Sistemas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fin</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad, País" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción (opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe detalles relevantes de tu formación"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Competencias</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const skills = form.getValues("skills");
                  form.setValue("skills", [
                    ...skills,
                    {
                      category: "",
                      items: [],
                    },
                  ]);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Agregar Categoría
              </Button>
            </div>
            {form.watch("skills").map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Categoría {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const skills = form.getValues("skills");
                        skills.splice(index, 1);
                        form.setValue("skills", skills);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                          <Input placeholder="Lenguajes de Programación" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`skills.${index}.items`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Habilidades</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="JavaScript, TypeScript, Python" 
                            value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                            onChange={(e) => {
                              const items = e.target.value ? e.target.value.split(",").map(item => item.trim()) : [];
                              field.onChange(items);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Separa las habilidades con comas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Complementarios</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const complementary = form.getValues("complementary");
                  form.setValue("complementary", [
                    ...complementary,
                    {
                      title: "",
                      institution: "",
                      startDate: "",
                      endDate: "",
                      isCurrent: false,
                      type: "",
                    },
                  ]);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Agregar Formación
              </Button>
            </div>
            {(form.watch("complementary") || []).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Formación {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const complementary = form.getValues("complementary");
                        complementary.splice(index, 1);
                        form.setValue("complementary", complementary);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Certificación en..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institución</FormLabel>
                        <FormControl>
                          <Input placeholder="Instituto XYZ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fin (opcional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            disabled={form.watch(`complementary.${index}.isCurrent`) || false}
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.isCurrent`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value || false}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                              if (e.target.checked) {
                                form.setValue(`complementary.${index}.endDate`, "", { shouldValidate: true });
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel>En curso</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`complementary.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <Input placeholder="Certificación, Curso, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Idiomas</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  const languages = form.getValues("languages");
                  form.setValue("languages", [
                    ...languages,
                    {
                      language: "",
                      level: "",
                    },
                  ]);
                }}
              >
                <PlusCircle className="w-4 h-4" /> Agregar Idioma
              </Button>
            </div>
            {form.watch("languages").map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Idioma {index + 1}
                  </h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const languages = form.getValues("languages");
                        languages.splice(index, 1);
                        form.setValue("languages", languages);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idioma</FormLabel>
                        <FormControl>
                          <Input placeholder="Español" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`languages.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nivel</FormLabel>
                        <FormControl>
                          <Input placeholder="Nativo, Básico A1/A2, Intermedio B1/B2, Avanzado C1/C2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full"
            >
              Guardar
            </Button>
          </div>
        </form>
      </Form>

      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-20 right-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </>
  );
}

