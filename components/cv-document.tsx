import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { CVData } from './cv-form';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Times-Roman',
    fontSize: 11,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Times-Bold',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  contactInfo: {
    textAlign: 'center',
    marginBottom: 5,
    color: '#444',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: '1 solid #000',
    paddingBottom: 2,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  itemTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
  },
  itemSubtitle: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    color: '#444',
  },
  itemDates: {
    color: '#666',
  },
  description: {
    marginTop: 3,
    lineHeight: 1.4,
    textAlign: 'justify',
    fontSize: 10,
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillCategory: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.2,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontFamily: 'Times-Bold',
  },
  languageLevel: {
    color: '#444',
  },
  complementaryContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    gap: 20,
  },
  dateLocation: {
    width: '30%',
    paddingRight: 15,
  },
  complementaryContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  complementaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  complementaryTitle: {
    fontFamily: 'Times-Bold',
  },
  complementaryType: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    color: '#666',
  },
  linkText: {
    fontSize: 10,
    color: '#0066cc',
    textDecoration: 'underline',
  },
  experienceContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dates: {
    fontSize: 9,
    color: '#666',
  },
  location: {
    fontSize: 10,
    color: '#444',
  },
  experienceContent: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
  },
  bulletPoints: {
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 15,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.2,
  },
  educationContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  educationContent: {
    flex: 1,
  },
  institution: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
    marginBottom: 2,
  },
  degree: {
    fontSize: 10,
    color: '#444',
    marginBottom: 2,
  },
  educationDescription: {
    fontSize: 10,
    color: '#666',
    lineHeight: 1.2,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillRow: {
    flexDirection: 'column',
    marginRight: 10,
  },
  skillLine: {
    marginBottom: 2,
  },
  skillName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  skillLevel: {
    fontSize: 10,
    color: '#444',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  linkSeparator: {
    fontSize: 10,
    color: '#444',
  },
});

const labels = {
  es: {
    dateLocale: 'es-ES',
    present: 'Presente',
    links: 'LINKS',
    profile: 'PERFIL PROFESIONAL',
    experience: 'EXPERIENCIA LABORAL',
    education: 'FORMACIÓN',
    skills: 'COMPETENCIAS',
    complementary: 'COMPLEMENTARIOS',
    languages: 'IDIOMAS',
  },
  en: {
    dateLocale: 'en-US',
    present: 'Present',
    links: 'LINKS',
    profile: 'PROFESSIONAL SUMMARY',
    experience: 'WORK EXPERIENCE',
    education: 'EDUCATION',
    skills: 'SKILLS',
    complementary: 'CERTIFICATIONS & COURSES',
    languages: 'LANGUAGES',
  },
};

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function CVDocument({ data }: { data: CVData }) {
  const t = labels[data.locale === 'en' ? 'en' : 'es'];

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Crear la fecha usando UTC para evitar problemas de zona horaria
    const [year, month] = dateString.split('-');
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
    
    return date.toLocaleDateString(t.dateLocale, { 
      year: 'numeric', 
      month: 'long',
      timeZone: 'UTC' // Forzar UTC
    }).replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}, {data.personalInfo.title}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.location}, {data.personalInfo.phone}, {data.personalInfo.email}
          </Text>
        </View>

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.links}</Text>
          <View style={styles.linksContainer}>
            {data.personalInfo.linkedin && (
              <Link src={data.personalInfo.linkedin}>
                <Text style={styles.linkText}>{displayUrl(data.personalInfo.linkedin)}</Text>
              </Link>
            )}
            {data.personalInfo.website && (
              <>
                <Text style={styles.linkSeparator}> • </Text>
                <Link src={data.personalInfo.website}>
                  <Text style={styles.linkText}>{displayUrl(data.personalInfo.website)}</Text>
                </Link>
              </>
            )}
          </View>
        </View>

        {/* Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
          <Text style={styles.description}>{data.profile}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.experience}</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceContainer} wrap={false}>
              <View style={styles.dateLocation}>
                <Text style={styles.dates}>
                  {formatDate(exp.startDate)} — {exp.isCurrent ? t.present : formatDate(exp.endDate || "")}
                </Text>
                <Text style={styles.location}>{exp.location}</Text>
              </View>
              <View style={styles.experienceContent}>
                <Text style={styles.jobTitle}>{exp.position}, {exp.company}</Text>
                <View style={styles.bulletPoints}>
                  {exp.description.split('\n').map((point, i) => (
                    <View key={i} style={styles.bulletPoint} wrap={false}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>
                        {point.trim().replace(/^• /, '').replace(/^• • /, '•')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationContainer}>
              <View style={styles.dateLocation}>
                <Text style={styles.dates}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </Text>
                <Text style={styles.location}>{edu.location || ""}</Text>
              </View>
              <View style={styles.educationContent}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                {edu.description && (
                  <Text style={styles.educationDescription}>{edu.description}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skillLine}>
              <Text style={styles.skillName}>{skill.category}: </Text>
              <Text style={styles.skillLevel}>{skill.items.join(", ")}</Text>
            </Text>
          ))}
        </View>

        {/* Complementary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.complementary}</Text>
          {data.complementary.map((item, index) => (
            <View key={index} style={styles.complementaryContainer} wrap={false}>
              <View style={styles.dateLocation}>
                <Text style={styles.dates}>
                  {formatDate(item.startDate)} {item.isCurrent ? `- ${t.present}` : item.endDate && item.endDate !== item.startDate ? `- ${formatDate(item.endDate)}` : ""}
                </Text>
              </View>
              <View style={styles.complementaryContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.institution}</Text>
                <Text style={styles.complementaryType}>{item.type}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.languages}</Text>
          {data.languages.map((lang, index) => (
            <View key={index} style={styles.languageRow}>
              <Text style={styles.languageName}>{lang.language}</Text>
              <Text style={styles.languageLevel}>{lang.level}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 